---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - Kapitel 23 - Troubleshoot Common Issues with Network Services
  - Kapitel 23 - Troubleshoot Common Network Service Issues
  - Troubleshoot Common Issues with Network Services
---

# CompTIA Network+ N10-009: Kapitel 23 – Troubleshoot Common Issues with Network Services

**Sider i bogen:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 23 - Troubleshoot Common Issues with Network Services.pdf]]  
**For termer og udtryk, se:** [[NA - Begrebsark]] Kap. 23

---

## Resumé

Kapitel 23 dækker **Objective 5.3 (Given a scenario, troubleshoot common issues with network services)** i CompTIA Network+ N10-009-pensummet og bevæger sig fra det fysiske lag i Kapitel 22 op til fejlsøgning af Lag 2 switching, Lag 3 routing, IP-adressering og øvre netværkstjenester.

Kapitlet indleder med seks overordnede fokusområder ved generel netværksfejlsøgning: **Device configuration** (undgå *configuration drift*), **Routing tables** (verificer *route selection* og *default routes*), **Interface status** (f.eks. *administratively down* vs. `UP/UP`), **Incorrect network layer settings** (forkert IP, subnetmaske eller default gateway), **VLAN assignment** og **Network performance baselines**. Herefter gennemgås **24 konkrete, eksamensrelevante netværks- og serviceproblemer** med deres årsager, symptomer og løsninger:
- **IP- og DHCP-problemer:** *Duplicate IP address*, *Duplicate MAC address*, *Expired IP address*, *DHCP scope / address pool exhaustion*, *Rogue DHCP server*, *Incorrect default gateway*, *Incorrect IP address* og *Incorrect subnet mask*.
- **Switching- og STP-problemer (Lag 2):** *Collisions*, *Broadcast storms*, *Switching loops*, *STP misconfigurations* (*Root bridge selection*, *Port roles*, *Port states*, *Root Guard / BPDU Guard*), *Incorrect VLAN assignment* og *Multicast / BUM flooding*.
- **Routing-problemer (Lag 3):** *Routing loops* (og TTL), *Missing routes*, *Default routes* og *Asymmetrical routing*.
- **Sikkerheds-, Tids- og Infrastrukturproblemer:** *Blocked TCP/UDP ports, services, or addresses*, *Incorrect firewall settings*, *Incorrect ACL settings*, *Untrusted SSL certificate*, *Incorrect time (NTP)*, *Unresponsive service*, *Hardware failure*, *Low optical link budget*, *BYOD challenges (MDM)*, *Licensed feature issues* og *Network performance issues*.

---

## 1. Overordnede Fokusområder ved Netværksfejlsøgning

Når du har sikret dig, at det fysiske lag (kabler og link-lys) fungerer, peger kapitlet på seks centrale steder, du altid bør kontrollere:

1. **Device Configuration (Enhedskonfiguration og Configuration Drift):** Gennemgå løbende enhedernes konfigurationer for at sikre, at manuelle *ad hoc*-ændringer ikke har skabt **Configuration Drift** væk fra den dokumenterede standard (værktøjer som **Ansible** kan automatisere dette).
2. **Routing Tables (Routingtabeller, Route Selection og Default Routes):** Inspicer Lag 3-enhedernes routingtabeller for at bekræfte, at pakker videresendes ad den forventede sti, og at **Default Route (`0.0.0.0/0`)** peger korrekt mod næste hop/ISP.
3. **Interface Status:** Undgå den klassiske fælde, hvor et interface blot er **Administratively Down** (fordi man glemte at skrive `no shutdown`). Brug CLI-kommandoer eller GUI til at bekræfte, at interfacet er **UP/UP** (både fysisk Lag 1 og datalink Lag 2 er aktive).
4. **Incorrect Network Layer Settings (Forkerte IP-indstillinger på klienten):** Selv når et interface er `UP/UP` på Lag 1 og Lag 2, vil forkerte Lag 3-indstillinger lamme kommunikationen:
   - **Incorrect Default Gateway:** Klienten kan kommunikere fint med andre enheder på sit **lokale subnet** (f.eks. en lokal printer eller naboens PC), men kan **ikke nå nogen fjerne netværk eller internettet (f.eks. en fjern webserver)**!
   - **Incorrect Subnet Mask:** Får klienten til at beregne sit lokale netværksinterval forkert, så den enten forsøger at ARP'e direkte efter fjerne værter eller sender lokal trafik unødigt til default gateway.
   - **Incorrect IP Address:** Hvis klientens IP-adresse ligger i et helt forkert subnet (eller er en `169.254.x.x` APIPA-adresse), kan den hverken nå sin default gateway eller andre subnets.
5. **VLAN Assignment (Forkert VLAN-tildeling):** Da hvert VLAN er et isoleret broadcast-domæne og IP-subnet, vil en switchport, der ved en fejl er sat i det forkerte VLAN, afskære den tilsluttede klient fra både dens rigtige DHCP-scope og dens default gateway.
6. **Network Performance Baselines:** Du kan kun vurdere, om netværket præsterer unormalt langsomt, hvis du på forhånd har målt og dokumenteret en **Baseline** for normal hastighed, throughput og udnyttelse.

---

## 2. Fejlsøgning af Almindelige Netværksservice-problemer

### 2.1 IP-adresserings- og DHCP-problemer

| Problem | Symptomer og Årsag | Løsning / Forebyggelse |
| :--- | :--- | :--- |
| **Duplicate IP Address** | To hosts på samme subnet har samme IP-adresse, hvilket giver ustabil eller afbrudt forbindelse for begge. Skyldes ofte, at en DHCP-server har udlejet en IP-adresse, som en administrator allerede har tildelt statisk til en server. | Konfigurer **DHCP Exclusions (Exclusion Range)** på DHCP-serveren for alle statisk tildelte IP-adresser. |
| **Duplicate MAC Address** | Sjældnere end duplikeret IP, men kan opstå ved manuel *MAC spoofing* eller klonede virtuelle maskiner på samme L2-segment, hvilket får switchens MAC-tabel til konstant at "flappe" mellem to porte. | Gendan den indbrændte OUI/BIA MAC-adresse eller generer unikke virtuelle MAC-adresser i hypervisoren. |
| **Expired IP Address** | En klients DHCP-lease er udløbet uden at kunne fornyes (f.eks. hvis *lease time* er sat meget lavt, og DHCP-serveren er utilgængelig). | Forny lejemålet (`ipconfig /renew`), verificer forbindelse til DHCP-server/Relay og juster *lease duration*. |
| **Address Pool / DHCP Scope Exhaustion** | DHCP-serveren er **løbet helt tør for ledige IP-adresser** i sit scope (ofte fordi antallet af klienter/mobilenheder på netværket er vokset). Nye klienter får ingen IP (falder tilbage til APIPA `169.254.x.x`). | Udvid subnetværket/scopet (redesign med kortere præfiks) eller forkort *lease time* på gæste-Wi-Fi. |
| **Rogue DHCP Server** | En uautoriseret DHCP-server (f.eks. en hjemmerouter, en medarbejder har sat i et vægstik, eller en angriber) deler forkerte IP-adresser og en falsk default gateway ud til klienterne. | Aktiver **DHCP Snooping** på switchene (så kun *trusted* uplinks må sende `DHCPOFFER`/`DHCPACK`) og fjern den uautoriserede enhed. |

### 2.2 Switching- og Spanning Tree Protocol (STP)-problemer (Lag 2)
- **Collisions:** På et moderne full-duplex switch-netværk med mikrosegmentering (én enhed pr. switchport) bør der **aldrig** være kollisioner. Hvis du ser kollisioner, skyldes det enten en **Duplex Mismatch** (den ene side kører half-duplex) eller en gammel Lag 1-hub.
- **Switching Loops, Broadcast Storms og MAC Address Table Corruption:**
  - Hvis **STP (Spanning Tree Protocol)** er slået fra eller fejler på et netværk med redundante kabler mellem switche, cirkulerer Layer 2-frames uendeligt (da Lag 2 ikke har noget TTL-felt!).
  - Dette resulterer øjeblikkeligt i **Broadcast Storms** (100 % CPU- og båndbreddemætning) og **MAC Address Table Corruption** (switchene ser samme Source MAC ankomme på flere porte og overskriver konstant deres MAC-tabel).
- **STP Misconfigurations (Forkert Root Bridge, Port Roles & Port States):**
  - Valget af **Root Bridge** (switchen med det **laveste Bridge ID = Priority + MAC**) styrer alle **Port Roles** (*Root Port*, *Designated Port*, *Nondesignated/Blocking Port*) og **Port States** i hele Lag 2-topologien.
  - Hvis man lader alle switche stå på standardprioriteten (`32768`), risikerer man, at den ældste og svageste access-switch i et hjørne af bygningen (med den laveste MAC-adresse) vinder valget som Root Bridge, så al trafik i virksomheden tvinges gennem en suboptimal flaskehals!
  - **Løsning:** Konfigurer altid bevidst din stærkeste core/distribution-switch med laveste Bridge Priority, og beskyt topologien med **Root Guard** og **BPDU Guard**.
- **Multicast Flooding / BUM Traffic:** Switche er tvunget til at floode **BUM-trafik (Broadcast, Unknown Unicast, Multicast)** ud på alle porte i VLAN'et. Overdreven multicast-flooding kan begrænses med **IGMP Snooping**, så multicast-streams kun sendes til porte med tilmeldte modtagere.

### 2.3 Routing-problemer (Lag 3)
- **Missing Routes (Manglende ruter i routingtabellen):** Hvis en bruger melder, at et fjernt subnet eller en server er nede, skyldes det ofte blot, at der mangler en statisk rute på routeren, eller at et netværk ikke er blevet annonceret i den dynamiske routingprotokol (OSPF/EIGRP/BGP).
- **Routing Loops:** Selvom dynamiske routingprotokoller har loop-beskyttelse, kan Lag 3 routing-løkker opstå ved fejl i statiske ruter eller ved *route redistribution* mellem to forskellige routingprotokoller. På Lag 3 forhindrer **TTL-feltet (Time-to-Live)** heldigvis, at pakker cirkulerer for evigt (afsløres tydeligt med `traceroute` / `tracert`, hvor de samme router-IP'er gentages igen og igen, indtil TTL udløber).
- **Asymmetrical Routing (Asymmetrisk routing):** Opstår når pakker tager én vej fra kilde til destination, men en **anden vej tilbage** fra destination til kilde. Det er ikke altid en fejl i sig selv, men det skaber ofte alvorlige problemer, hvis udgående trafik passerer gennem en **stateful firewall** (eller NAT-enhed), og returtrafikken kommer tilbage ad en anden vej uden om firewallen – eller rammer en anden firewall, der dropper pakkerne, fordi den aldrig så den udgående session blive oprettet!

### 2.4 DNS-, Sikkerheds-, Tids- og Øvrige Serviceproblemer
- **DNS-fejl (Kan nå server via IP-adresse, men IKKE via domænenavn):**
  > **Klassisk eksamensscenarie:** Hvis du godt kan pinge eller tilgå en webserver ved at indtaste dens **IP-adresse** (f.eks. `http://172.16.1.10`), men det fejler, når du bruger dens **navn/FQDN** (`http://www.firma.dk`), fungerer Lag 1–3 perfekt – problemet ligger i **DNS** (enten forkert DNS-server IP på klienten, manglende A/AAAA-record, eller at DNS-servicen/UDP port 53 er nede/blokeret).
- **Blocked TCP/UDP Ports, Incorrect Firewall Settings & Incorrect ACLs:**
  - En fejlkonfigureret **ACL (Access Control List)** på en router eller en regel i en **host-/netværksfirewall** kan utilsigtet blokere nødvendige porte (hvis f.eks. **TCP port 443** blokeres i en ACL, afbrydes næsten al HTTPS-internettrafik, selvom `ping`/ICMP måske stadig virker!).
- **Untrusted SSL/TLS Certificate & Incorrect Time (NTP):**
  - Sikkerhedstjenester og HTTPS fejler, hvis et **SSL/TLS-certifikat** er udløbet, tilbagekaldt (*revoked*) eller udstedt af en ukendt CA (*Untrusted*).
  - Hvis uret på en klient, server eller netværksenhed går forkert (**Incorrect Time**), vil selv gyldige certifikater, Kerberos-logins og log-korrelation fejle. Løses ved at synkronisere alle enheder med **NTP**.
- **Low Optical Link Budget:** Hvis det samlede optiske signaltab (i dB) gennem fiberkabler, *splices* og stik overstiger linkets **Optical Loss Budget**, kan modtageren ikke længere aflæse lyssignalet pålideligt.
- **BYOD Challenges & Licensed Feature Issues:**
  - Medarbejderes private enheder (**BYOD**) kan skabe kompatibilitets- og sikkerhedsproblemer og bør styres via en **MDM (Mobile Device Management)**-løsning.
  - Avancerede router-/switchfunktioner eller højere gennemstrømning kan pludselig holde op med at virke, hvis en **softwarelicens** mangler eller er udløbet (**Licensed feature issues**).

---

## 3. Praktisk Subnet-tjek ved Fejlsøgning (Fra Kapitlets Review Questions)

Ved fejlsøgning af IP-adresser og VLANs/subnets skal man hurtigt kunne afgøre, hvilket subnet en given host tilhører:
- **Eksempel:** Hvilket subnet tilhører en host med IP-adressen **`172.16.155.10/18`**?
  1. En `/18`-maske svarer til `255.255.192.0` (2 lånte bits i 3. oktet).
  2. Blokstørrelsen (*block size*) i 3. oktet er $256 - 192 = \mathbf{64}$.
  3. Subnettene stiger med 64 i 3. oktet: `172.16.0.0/18`, `172.16.64.0/18`, **`172.16.128.0/18`**, `172.16.192.0/18`.
  4. Da `155` ligger mellem `128` og `191`, tilhører hosten subnettet **`172.16.128.0/18`**!

---

## 4. Nøgleemner til Eksamen (Key Topics)

![[Table 23-1 - Key Topics for Chapter 23.png]]

### Hurtige eksamenstips (Exam Cram)
- **Kan nå server på IP, men ikke på navn:** Undersøg **DNS**.
- **Forkert Default Gateway på klienten:** Klienten kan nå lokale enheder på sit eget subnet (lokal printer, naboens laptop), men kan **ikke nå en fjern webserver (remote network)**.
- **Succesfuldt `ping` fra Host A til Host B:** Beviser at **OSI Lag 1, Lag 2 og Lag 3 (Layers 1–3)** er funktionelle.
- **Manglende/defekt STP på et netværk med redundante links:** Resulterer i **Switching Loops**, **Broadcast Storms** og **MAC Address Table Corruption**.
- **Hvorfor ekskluderer man statiske IP-adresser fra et DHCP-scope?** For at undgå **Duplicate IP Addresses**.
