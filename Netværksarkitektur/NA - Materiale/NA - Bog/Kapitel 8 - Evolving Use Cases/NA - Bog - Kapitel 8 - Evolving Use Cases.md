---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - Kapitel 8 - Evolving Use Cases
  - Evolving Use Cases
---

# CompTIA Network+ N10-009: Kapitel 8 – Evolving Use Cases

**Sider i bogen:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 8 - Evolving Use Cases.pdf]]  
**For termer og udtryk, se:** [[NA - Begrebsark]] Kap. 8

---

## Resumé

Kapitel 8 dækker **Objective 1.8 (Summarize evolving use cases for modern network environments)** i CompTIA Network+ N10-009-pensummet og gennemgår de nyeste teknologier og arkitekturmønstre, som former moderne erhvervs-, datacenter- og cloud-netværk.

Kapitlet indleder med **Software-Defined Networking (SDN)**, hvor netværket opdeles i fire adskilte planer (*Application plane*, *Control plane*, *Data/Infrastructure plane* og *Management plane*), styret via en central **SDN-controller** og API-kald ("single pane of glass"). Herefter gennemgås **SD-WAN (Software-Defined Wide Area Network)** og dets fire nøgleegenskaber: *Application awareness*, *Zero-touch provisioning (ZTP)*, *Transport agnostic* forbindelser (bredbånd, MPLS, LTE/5G, satellit) og *Central policy management*. Dernæst forklares **VXLAN (Virtual Extensible LAN)**, som løser skaleringsbegrænsningen på 4.096 VLANs (12-bit VLAN ID) ved at anvende en 24-bit **VNI (VXLAN Network Identifier)** (~16 millioner segmenter) og indkapsle Layer 2 Ethernet-frames i Layer 3 UDP-pakker via **VTEPs (Virtual Tunnel Endpoints)** til bl.a. **Data Center Interconnect (DCI)**.

På sikkerhedsfronten gennemgår kapitlet **Zero Trust Architecture (ZTA)** med fokus på princippet *"never trust, always verify"*, **Policy-based authentication**, **Policy-based authorization** og **Least privilege access**, efterfulgt af cloud-native sikkerheds- og netværksrammeværker: **SASE (Secure Access Service Edge)** og **SSE (Security Service Edge)** (herunder SWG, CASB, FWaaS og ZTNA). Herefter behandles **Infrastructure as Code (IaC)**, forskellen på *automation* og *orchestration*, centrale komponenter (*Playbooks*, *Templates*, *Reusable tasks*, *Configuration drift*, *Compliance*, *Upgrades*, *Dynamic inventories*) samt **Source Control / Git-principper** (*Version control*, *Central repository*, *Conflict identification*, *Branching*). Kapitlet afsluttes med en grundig introduktion til **IPv6-adressering** (128-bit heksadecimal struktur, forkortelsesregler, *Global Unicast*, *Link-Local*, *Multicast*, *EUI-64*, *SLAAC*, *DHCPv6*, **NDP** med dets 5 ICMPv6-beskedtyper, samt overgangsteknologierne *Dual stack*, *Tunneling/Teredo* og *NAT64*) og de tre IPv6-dataflows (**Unicast**, **Multicast** og **Anycast** – idet broadcast er afskaffet i IPv6).

---

## 1. Software-Defined Networking (SDN) og SD-WAN

Moderne netværk bevæger sig væk fra manuel CLI-konfiguration (Command-Line Interface) på hver enkelt switch og router over mod centraliseret, softwarebaseret styring og automatisering.

### 1.1 Software-Defined Networking (SDN)
I et traditionelt netværk har hver enkelt router og switch både sit eget kontrolplan og sit eget dataplan indbygget. I **SDN** abstraheres og centraliseres intelligensen i en **SDN-controller**, så administratoren kan konfigurere og orkestrere hele netværket fra ét centralt brugerinterface (*"single pane of glass"*) ved hjælp af **API-kald** (Application Programming Interfaces).

SDN opdeler netværksarkitekturen i fire diskrete lag (planer):
1. **Application Plane (Applikationsplanet):** Her afvikles netværksapplikationer, sikkerhedstjenester, analyseværktøjer, load balancere eller moderne microservices/containere, der kommunikerer deres krav til controlleren via *Northbound APIs*.
2. **Control Plane (Kontrolplanet):** Netværkets "hjerne", hvor **SDN-controlleren** befinder sig. Controlleren modtager overordnede politikker og API-kald og oversætter dem til konkrete routing- og forwarding-instruktioner til netværksenhederne nedenunder (via *Southbound APIs*). Protokoller som BGP og OSPF hører konceptuelt til kontrolplanet.
3. **Data Plane / Infrastructure Plane (Dataplanet / Infrastrukturplanet):** Består af de fysiske eller virtuelle netværksenheder (switche, routere, access points), som videresender (forwarder) selve datapakkerne og frames i henhold til instruktionerne fra kontrolplanet.
4. **Management Plane (Administrationsplanet):** Bruges til løbende drift, overvågning af trafikflows, vedligeholdelse og automatiserede konfigurationsopgaver (f.eks. dynamisk allokering af ekstra båndbredde eller udrulning af opdateringer).

![[Figure 8-1 - Software-Defined Networking.png]]

### 1.2 Software-Defined Wide Area Network (SD-WAN)
Mens LAN-teknologier i årtier har udviklet sig hurtigt, var traditionelle WAN-forbindelser ofte bundet til dyre, ufleksible MPLS-kredsløb og proprietær hardware. **SD-WAN** anvender SDN-principper på WAN-infrastrukturen og tilbyder fire centrale egenskaber, som CompTIA Network+ N10-009 tester:

| SD-WAN Egenskab | Beskrivelse og funktion |
| :--- | :--- |
| **Application Awareness** | Netværket kan identificere og klassificere trafik på applikationsniveau (Lag 7) og dynamisk prioritere missionskritiske eller latensfølsomme applikationer (f.eks. VoIP og videokonferencer) over den bedste tilgængelige forbindelse. |
| **Zero-Touch Provisioning (ZTP)** | Nye WAN-enheder kan sendes direkte ud til en filial uden forudgående manuel CLI-konfiguration. Når enheden tilsluttes strøm og internet, kontakter den automatisk den centrale controller og henter sin konfiguration, sikkerhedspolitik og firmware. |
| **Transport Agnostic** | SD-WAN er uafhængigt af det underliggende transportmedie. Det kan kombinere og rute trafik sømløst på tværs af **MPLS**, almindeligt **bredbånd (fiber/kabel)**, **4G/LTE/5G** og **satellitforbindelser** og automatisk skifte vej ved udfald eller pakketab. |
| **Central Policy Management** | En centraliseret administrationskonsol gør det muligt at definere og håndhæve ensartede sikkerheds-, QoS- og trafikstyringspolitikker på tværs af samtlige lokationer og WAN-enheder på én gang. |

---

## 2. Virtual Extensible Local Area Network (VXLAN)

Traditionelle VLANs (IEEE 802.1Q) benytter et **12-bit VLAN ID-felt**, hvilket begrænser antallet af mulige segmenter til maksimalt **$2^{12} = 4.096$ VLANs**. I store multi-tenant cloud-miljøer og moderne datacentre er 4.096 segmenter langt fra tilstrækkeligt.

### 2.1 VXLAN-arkitektur og Layer 2-indkapsling
**VXLAN** er en netværksvirtualiseringsteknologi (et *Layer 2 overlay-netværk* oven på et *Layer 3 underlay-netværk*), der løser denne begrænsning:
- **24-bit VNI (VXLAN Network Identifier):** VXLAN erstatter det 12-bit VLAN ID med en 24-bit VNI, hvilket understøtter op til **$2^{24} \approx 16\text{ millioner}$** unikke, isolerede virtuelle netværkssegmenter.
- **Layer 2 Encapsulation i UDP (MAC-in-UDP):** VXLAN tager en hel **Layer 2 Ethernet-frame** (fra en virtuel maskine eller host) og indkapsler den i en **VXLAN-header** (med VNI), en **ydre UDP-header** og en **ydre IP-header**. Derved kan den indkapslede Layer 2-frame rutes som en helt almindelig IP/UDP-pakke på tværs af et eksisterende Layer 3-netværk.
- **VTEP (Virtual Tunnel Endpoint):** VXLAN-gateways – kaldet **VTEPs** – står for indkapsling (encapsulation) hos afsenderen og udpakning (decapsulation) hos modtageren. VTEPs kan være implementeret i enten fysiske datacenter-switche eller virtuelt i hypervisorer.

![[Figure 8-2 - VXLAN Encapsulation.png]]

### 2.2 Data Center Interconnect (DCI)
En af de vigtigste use cases for VXLAN er **Data Center Interconnect (DCI)**, hvor flere geografisk adskilte datacentre forbindes over en Layer 3 WAN/IP-forbindelse. Med VXLAN kan et Layer 2-subnet strække sig sømløst på tværs af flere datacentre, hvilket muliggør:
- **Live-migrering af virtuelle maskiner (Workload Mobility):** En VM kan flyttes fra ét datacenter til et andet uden at skulle ændre IP-adresse eller MAC-adresse.
- **Ressourcedeling og Disaster Recovery (DR):** Hurtig failover og sammenkoblet infrastruktur mellem primære og sekundære datacentre.

---

## 3. Zero Trust Architecture (ZTA)

Traditionel netværkssikkerhed byggede på en "slot-og-voldgrav"-model (*perimeter-based security*), hvor alt på indersiden af virksomhedens firewall automatisk blev betragtet som betroet. **Zero Trust Architecture (ZTA)** forkaster denne antagelse ud fra grundprincippet: **"Stol aldrig automatisk på nogen – verificer altid"** (*Never trust, always verify*), uanset om brugeren eller enheden befinder sig på det interne LAN eller uden for netværket.

ZTA hviler på tre centrale søjler:
1. **Policy-Based Authentication (Politikbaseret autentificering):** Enhver adgangsanmodning autentificeres dynamisk ud fra foruddefinerede sikkerhedspolitikker, der vurderer kontekstuelle faktorer: brugerens identitet, enhedens sikkerhedstilstand (*posture*), geografisk placering, tidspunkt på døgnet samt multifaktor-autentificering (MFA).
2. **Policy-Based Authorization (Politikbaseret autorisation):** Når identiteten er verificeret, afgør finkornede autorisationspolitikker præcis *hvilke* specifikke applikationer eller dataressourcer brugeren må tilgå i den pågældende session (mikrosegmentering frem for bred netværksadgang).
3. **Least Privilege Access (Mindste privilegiums princip):** Brugere, tjenester og enheder tildeles kun det absolut minimale adgangsniveau, der er nødvendigt for at udføre deres arbejdsopgave – og kun så længe det er nødvendigt. Dette begrænser *lateral movement* (sideværts bevægelse) og minimerer skaden (*blast radius*), hvis en konto eller enhed kompromitteres.

---

## 4. SASE (Secure Access Service Edge) og SSE (Security Service Edge)

I takt med at brugere arbejder hjemmefra (hybrid/remote work), og applikationer er flyttet i skyen (SaaS/IaaS), giver det ikke længere mening at tvinge al trafik tilbage gennem et fysisk hovedkontors datacenter (*backhauling*) via traditionel VPN.

### 4.1 SASE (Secure Access Service Edge)
**SASE** er et cloud-native arkitekturrammeværk, der **konvergerer WAN-netværksfunktioner (SD-WAN) med omfattende netværkssikkerhedstjenester** leveret direkte fra skyen (via globale Points of Presence, PoPs):
- **Netværksdel:** SD-WAN, trafikoptimering, lav latens og global routing.
- **Sikkerhedsdel:**
  - **SWG (Secure Web Gateway):** Filtrerer webtrafik og blokerer ondsindede websites.
  - **CASB (Cloud Access Security Broker):** Overvåger og håndhæver sikkerhedspolitikker mellem brugere og cloud-tjenester (SaaS).
  - **FWaaS (Firewall as a Service):** Cloud-baseret næste-generations firewall-beskyttelse.
  - **ZTNA (Zero Trust Network Access):** Giver sikker, identitets- og kontekstbaseret adgang til specifikke applikationer baseret på Zero Trust-principper (afløser traditionel bred VPN-adgang).
  - **DLP (Data Loss Prevention):** Forhindrer uautoriseret lækage af følsomme data.

### 4.2 SSE (Security Service Edge)
**SSE** (defineret af Gartner) udgør **sikkerhedsdelen af SASE** uden SD-WAN-netværksdelen. SSE samler SWG, CASB, ZTNA, FWaaS og DLP i én samlet cloud-sikkerhedsplatform til organisationer, der ønsker cloud-baseret sikkerhed til deres hybride medarbejdere og cloud-data uden nødvendigvis at udskifte deres WAN-infrastruktur på samme tid.

---

## 5. Infrastructure as Code (IaC)

**Infrastructure as Code (IaC)** (også kaldet *programmable infrastructure*) er en metode til at provisionere, konfigurere og administrere netværks- og serverinfrastruktur gennem maskinlæsbare konfigurationsfiler (kode/scripts) frem for manuel opsætning i en GUI eller CLI.

### 5.1 Automation vs. Orchestration
- **Automation (Automatisering):** Automatiseret udførelse af en enkeltstående, gentagelig opgave (f.eks. et script, der opretter en VLAN-konfiguration på en switch).
- **Orchestration (Orkestrering):** Planlægning, koordinering og overvågning af *mange forskellige automatiseringer* på tværs af hele systemer (at "automatisere automatiseringen", f.eks. at udrulle servere, konfigurere netværk, oprette firewall-regler og registrere load balancere i én samlet arbejdsgang).

### 5.2 Nøglekomponenter i IaC og Automation
| IaC-begreb | Beskrivelse |
| :--- | :--- |
| **Playbooks** | Strukturerede filer (typisk skrevet i **YAML** til værktøjer som **Ansible**), der deklarativt beskriver den ønskede tilstand (*desired state*) og definerer en serie af opgaver til provisionering og konfigurationsstyring. |
| **Templates** | Genbrugelige skabeloner (brugt i f.eks. **Terraform** og **AWS CloudFormation**), der definerer infrastrukturressourcer og deres indbyrdes relationer. Kan parametriseres med variabler, så samme skabelon kan bruges til *dev*, *test* og *prod*. |
| **Reusable Tasks (Roller)** | Moduler eller samlinger af opgaver, variabler og skabeloner (f.eks. *Ansible Roles*), der kan genbruges på tværs af mange playbooks og projekter for at sikre ensartethed og vedligeholdelsesvenlighed. |
| **Configuration Drift** | Opstår, når infrastrukturens *faktiske tilstand* på et tidspunkt afviger fra den *ønskede tilstand* defineret i IaC-koden (f.eks. fordi en administrator har lavet en manuel *ad hoc* CLI-ændring). IaC-værktøjer opdager og retter automatisk dette ved at genanvende den definerede tilstand. |
| **Compliance** | Overholdelse af lovkrav og sikkerhedsstandarder ved at indlejre sikkerhedspolitikker, adgangskontrol og krypteringskrav direkte i IaC-koden (*Policy as Code*), så enhver ny ressource fødes compliant. |
| **Upgrades** | Forenkler opgraderinger af OS, firmware og konfigurationer ved at opdatere versionsnummeret i koden, teste det i et *staging*-miljø og udrulle det ensartet til produktion. |
| **Dynamic Inventories** | Mekanisme (f.eks. i Ansible), der automatisk opdager og opdaterer listen over aktive hosts/netværksenheder ved at forespørge cloud-udbyderens API eller virtualiseringsplatformen i realtid, i stedet for at vedligeholde en statisk tekstfil med IP-adresser. |

### 5.3 Source Control (Versionsstyring af IaC)
Da infrastrukturen i IaC er beskrevet som kode, opbevares og styres den i et **Source Control System** (f.eks. Git):
- **Version Control (Versionsstyring):** Sporer enhver ændring (*commit*) over tid med unikt ID, forfatter, tidsstempel og commit-besked. Gør det muligt at rulle tilbage (*rollback*) til en tidligere fungerende konfiguration ved fejl.
- **Central Repository:** Ét centralt arkiv (*Single Source of Truth*), hvor master-kopien af al infrastrukturkode ligger, og hvor hele teamet samarbejder.
- **Conflict Identification:** Opdager og markerer konflikter (*merge conflicts*), hvis to administratorer samtidig har redigeret de samme linjer i en konfigurationsfil, så ændringer ikke overskrives utilsigtet.
- **Branching:** Gør det muligt at oprette en isoleret gren (*branch*) af kodebasen til at udvikle og teste nye netværksændringer uden at påvirke hovedgrenen (*main/production*), før koden er gennemgået (*peer review*) og klar til *merge*.

---

## 6. IP Version 6 (IPv6)

Da det 32-bit IPv4-adresseområde ($2^{32} \approx 4,29\text{ milliarder}$ adresser) er udtømt globalt, blev **IPv6** udviklet med et **128-bit adresseområde**, hvilket giver $2^{128} \approx 3,4 \times 10^{38}$ (340 sekstillioner) adresser.

### 6.1 Fordele ved IPv6 og Overgangsteknologier (Coexistence)
Ud over det enorme adresserum tilbyder IPv6:
- **Forenklet header:** IPv6-headeren bruger kun **5 hovedfelter** (fast længde på 40 bytes) mod IPv4-headerens 12 felter, hvilket gør pakkebehandlingen i routere hurtigere.
- **Ingen Broadcasts:** IPv6 har fuldstændig afskaffet broadcast-trafik (erstattet af målrettet multicast).
- **Ingen fragmentering i routere:** IPv6-routere fragmenterer ikke pakker undervejs; i stedet udføres **Path MTU Discovery (PMTUD)** mellem afsender og modtager for hver session.
- **Overgangs- og sameksistensmekanismer mellem IPv4 og IPv6:**
  - **Dual Stack:** Netværksenheder og interfaces kører både en IPv4-stak og en IPv6-stak samtidigt og kan kommunikere nativt med begge protokoller.
  - **Tunneling (IPv6 over IPv4 / Teredo):** Indkapsler IPv6-pakker inde i IPv4-pakker, så IPv6-trafik kan transporteres gennem et eksisterende IPv4-netværk. **Teredo** giver endda IPv6-forbindelse til hosts, der befinder sig bag IPv4 NAT-enheder.
  - **NAT64:** Oversætter mellem IPv6-pakker og IPv4-pakker ved hjælp af et foruddefineret præfiks, så **IPv6-only klienter kan kommunikere med IPv4-only servere** (og omvendt).

### 6.2 IPv6-adressestruktur og Forkortelsesregler (Shorthand Notation)
En IPv6-adresse er på **128 bit** og skrives som **8 grupper (hextets/felter) adskilt af kolon (`:`)**, hvor hvert felt består af **4 heksadecimale cifre** (0–9, A–F). Da hvert heksadecimalt ciffer repræsenterer 4 bit, gælder:
$$\text{4 bits pr. ciffer} \times \text{4 cifre pr. felt} \times \text{8 felter} = 128\text{ bits}$$

For at gøre lange IPv6-adresser lettere at læse og skrive anvendes to forkortelsesregler:
1. **Fjern foranstillede nuller (Leading 0s):** Foranstillede nuller i hvert 16-bit felt kan udelades (f.eks. bliver `0123` til `123`, og `000A` bliver til `A`. Et felt med `0000` kan reduceres til et enkelt `0`, men bagvedliggende nuller som i `4040` må *aldrig* fjernes!).
2. **Erstat sammenhængende nul-felter med dobbeltkolon (`::`):** Én sammenhængende sekvens af felter, der kun indeholder nuller (`0000`), kan erstattes af et dobbeltkolon `::`.
   > **Vigtig eksamensregel:** Dobbeltkolon (`::`) må **kun bruges én enkelt gang** i en IPv6-adresse! Hvis det blev brugt to gange, ville man ikke kunne beregne, hvor mange felter af nuller hver `::` repræsenterede.

**Eksempel på forkortelse:**
- Uforkortet: `ABCD:0123:4040:0000:0000:0000:000A:000B`
- Trin 1 (fjern foranstillede nuller): `ABCD:123:4040:0:0:0:A:B`
- Trin 2 (erstat nul-sekvens med `::`): `ABCD:123:4040::A:B`

### 6.3 IPv6-adressetyper, Autokonfiguration og NDP
- **Global Unicast Address (GUA):** Offentligt rutbare IPv6-adresser på internettet. Starter med første hextet i området **`2000::/3` (`2000` til `3999` / `3FFF`)**.
- **Link-Local Address:** Kræves på ethvert IPv6-aktiveret interface og bruges til lokal kommunikation på samme link/subnet (rutes *aldrig* af en router). Starter altid med **`FE80::/10`**.
- **Multicast Address:** Repræsenterer en gruppe af interfaces. Starter altid med **`FF`** (`FF00::/8`). Alle IPv6-noder på det lokale link lytter f.eks. på *All-Nodes*-multicastadressen (`FF01::1` interface-local / `FF02::1` link-local).
- **EUI-64 og SLAAC (Stateless Address Autoconfiguration):** Med SLAAC kan en IPv6-host automatisk konfigurere sin egen globalt unikke IPv6-adresse uden en DHCP-server. Host'en lærer det 64-bit netværkspræfiks fra routerens *Router Advertisement* og genererer selv de nederste 64 bit (Interface ID) enten tilfældigt eller via **EUI-64**, som tager netkortets 48-bit MAC-adresse, indsætter `FFFE` i midten og inverterer 7. bit (Universal/Local-bitten).
- **DHCPv6:** IPv6-versionen af DHCP, der bruges til *stateful* adresseuddeling eller *stateless* uddeling af ekstra parametre som DNS-servere.
- **Neighbor Discovery Protocol (NDP):** Erstatter IPv4's ARP og sørger for netværksopdagelse, præfiksopdagelse, Duplicate Address Detection (DAD) og Layer 2 MAC-adresseopslag. NDP benytter **fem ICMPv6-pakketyper**:
  1. **Router Solicitation (RS):** Sendes af en host, der netop er kommet på netværket, for at finde lokale routere med det samme.
  2. **Router Advertisement (RA):** Sendes af routere (periodisk eller som svar på en RS) for at annoncere deres tilstedeværelse, netværkspræfiks og linkparametre.
  3. **Neighbor Solicitation (NS):** Sendes af en node for at finde en nabos Layer 2 MAC-adresse (ligesom ARP Request i IPv4) eller verificere, at en nabo stadig er tilgængelig.
  4. **Neighbor Advertisement (NA):** Sendes af en node som svar på en Neighbor Solicitation (ligesom ARP Reply i IPv4).
  5. **Redirect:** Sendes af en router for at informere en host om en bedre first-hop router til en bestemt destination.

### 6.4 IPv6 Data Flows (Unicast, Multicast og Anycast)
Mens IPv4 bruger fire trafiktyper (Unicast, Broadcast, Multicast, Anycast), bruger IPv6 kun **tre**:

#### 1. Unicast (En-til-en)
En enkelt IPv6-adresse er tildelt ét enkelt interface. En kilde (`AAAA::1`) sender trafik direkte til én specifik modtager (`AAAA::2`).

![[Figure 8-3 - IPv6 Unicast Example.png]]

#### 2. Multicast (En-til-mange)
En kilde (`AAAA::1`) sender trafik til en multicast-gruppeadresse (f.eks. `FF00::A`). Kun de klienter, der har tilmeldt sig gruppen (`AAAA::2` og `AAAA::3`), modtager og behandler trafikken, mens uinteresserede klienter (`AAAA::4`) ignorerer den. Multicast erstatter desuden broadcast i IPv6 via *all-nodes*-multicastgruppen (`FF01::1` / `FF02::1`).

![[Figure 8-4 - IPv6 Multicast Example.png]]

#### 3. Anycast (En-til-nærmeste)
Den **samme IPv6-adresse** (f.eks. `AAAA::2`) tildeles flere fysiske servere på forskellige netværkslokationer (Server A og Server B). Når en klient (`AAAA::1`) sender en pakke til `AAAA::2`, videresender routerne automatisk pakken til den server, der er **tættest på i henhold til routingtabellens metrik** (i eksemplet Server A via router R2).

![[Figure 8-5 - IPv6 Anycast Example.png]]

---

## 7. Nøgleemner til Eksamen (Key Topics)

Tabellen herunder opsummerer kapitlets centrale eksamensemner:

![[Table 8-1 - Key Topics for Chapter 8.png]]

### Hurtige eksamenstips (Exam Cram)
- **BGP, OSPF og EIGRP i SDN:** Tilhører **Control Plane** (kontrolplanet).
- **SD-WAN Transport Agnostic:** Gør det muligt at rute trafik uafhængigt af det fysiske transportmedie (MPLS, bredbånd, LTE/5G, satellit).
- **VXLAN:** Indkapsler Layer 2 Ethernet-frames i **UDP**-pakker med en 24-bit VNI (~16 mio. segmenter) og bruges hyppigt til **DCI (Data Center Interconnect)**.
- **SASE vs. SSE:** **SASE** = SD-WAN + Sikkerhed (SWG, CASB, FWaaS, ZTNA). **SSE** = kun sikkerhedsdelen (uden SD-WAN).
- **Configuration Drift:** Afvigelsen mellem infrastrukturens *faktiske tilstand* og den *ønskede tilstand* defineret i IaC.
- **NAT64:** Gør det muligt for IPv6-only klienter at kommunikere med IPv4-only servere.
