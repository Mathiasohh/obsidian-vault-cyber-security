---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - Kapitel 9 - Routing Technologies
  - Routing Technologies
---

# CompTIA Network+ N10-009: Kapitel 9 – Routing Technologies

**Sider i bogen:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 9 - Routing Technologies.pdf]]  
**For termer og udtryk, se:** [[NA - Begrebsark]] Kap. 9

---

## Resumé

Kapitel 9 dækker **Objective 2.1 (Explain characteristics of routing technologies)** i CompTIA Network+ N10-009-pensummet og forklarer i detaljer, hvordan routere (og Layer 3/multilayer-switche) videresender pakker mellem forskellige IP-subnets og broadcast-domæner.

Kapitlet gennemgår først den basale **pakke-forwarding-proces trin for trin** – herunder hvordan Layer 3 IP-adresser (Source/Destination IP) forbliver uændrede fra kilde til destination (med mindre NAT anvendes), mens Layer 2 MAC-adresser udskiftes ved hvert router-hop ved hjælp af **ARP (Address Resolution Protocol)**, og hvordan **TTL (Time-to-Live)** dekrementeres med 1 ved hver router. Dernæst gennemgås de tre primære kilder til ruter i en routingtabel: **Directly Connected routes**, **Static routes** (inkl. *default route* `0.0.0.0/0`) og **Dynamic routing protocols**. Kapitlet forklarer de tre afgørende kriterier for **Route Selection** (*Longest Prefix Match*, laveste *Administrative Distance (AD)* og laveste/bedste *Metric*), forskellen på **IGP (Interior Gateway Protocol)** og **EGP (Exterior Gateway Protocol)** samt forskellen på **Distance-Vector** (med *Routing Loops*, *Split Horizon*, *Poison Reverse* og *Hold-down timers*), **Link-State** (LSA'er og Dijkstras SPF-algoritme), **Hybrid** og **Path-Vector** protokoller med fokus på **OSPF**, **EIGRP**, **IS-IS**, **RIP** og **BGP**. Endelig behandles **Network Address Translation (NAT)** – herunder *Inside Local*, *Inside Global*, *Outside Local*, *Outside Global*, *SNAT*, *DNAT* og **PAT (Port Address Translation / NAT Overload)** – samt **First Hop Redundancy Protocols (FHRP)** (**HSRP**, **VRRP**, **CARP** og **GLBP**), **Virtual IP (VIP)**, **LACP** og **Subinterfaces**.

---

## 1. Grundlæggende Routing-proces (Trin for Trin)

En router (eller multilayer switch) adskiller **broadcast-domæner (subnets)**. For at trafik kan bevæge sig fra ét subnet til et andet, skal den rutes på Lag 3.

Betragt topologien i Figur 9-1, hvor **PC1 (`192.168.1.2/24`)** vil sende en pakke til **Server1 (`192.168.3.2/24`)**:

![[Figure 9-1 - Basic Routing Topology.png]]

### Trin 1: PC1 sender pakken til sin Default Gateway (Router R1)
1. PC1 sammenligner sin egen IP-adresse og subnetmaske (`192.168.1.2/24` $\rightarrow$ netværk `192.168.1.0`) med destinationens IP-adresse (`192.168.3.2/24` $\rightarrow$ netværk `192.168.3.0`) og konstaterer, at Server1 ligger på et **fjernt subnet**.
2. PC1 skal derfor sende pakken til sin **Default Gateway** (`192.168.1.1`, som er Router R1's `Fa0/0`-interface).
3. For at opbygge Layer 2 Ethernet-framen skal PC1 kende R1's MAC-adresse. Hvis den ikke allerede ligger i PC1's ARP-cache, sender PC1 et **ARP Request** (broadcast, som ikke krydser routeren) efter `192.168.1.1`. R1 svarer med et **ARP Reply** med sin MAC-adresse (`1111.1111.1111`).
4. PC1 sender framen med:
   - **Source IP:** `192.168.1.2` | **Destination IP:** `192.168.3.2` (den endelige modtager!)
   - **Source MAC:** `AAAA.AAAA.AAAA` (PC1) | **Destination MAC:** `1111.1111.1111` (Default Gateway R1).

![[Figure 9-2 - Basic Routing - Step 1.png]]

### Trin 2: Router R1 videresender pakken til Router R2
1. Router R1 modtager framen, fjerner Layer 2-headeren og inspicerer IP-headeren.
2. R1 dekrementerer pakkens **TTL (Time-to-Live)** med 1. (Hvis TTL når `0`, droppes pakken, og R1 sender en ICMP *Time Exceeded*-besked tilbage til PC1).
3. R1 slår destinationsnetværket `192.168.3.0/24` op i sin **IP routingtabel** og ser, at ruten peger ud af interfacet `Serial 1/1` mod R2. (Bemærk: Punkt-til-punkt serielle interfaces bruger ikke Ethernet MAC-adresser og behøver derfor ikke ARP).
4. R1 indkapsler pakken i en ny Layer 2-frame og sender den ud på `Serial 1/1` til R2.

![[Figure 9-3 - Basic Routing - Step 2.png]]

### Trin 3: Router R2 leverer pakken til Server1
1. Router R2 modtager framen på sit serielle interface, dekrementerer **TTL** med 1 og slår `192.168.3.2` op i sin routingtabel.
2. R2 ser, at netværket `192.168.3.0/24` er **direkte forbundet (Directly Connected)** på interfacet `FastEthernet 0/0`.
3. R2 sender et **ARP Request** på `192.168.3.0/24`-subnetværket for at finde MAC-adressen på `192.168.3.2` (Server1). Server1 svarer med sin MAC-adresse (`2222.2222.2222`), som R2 gemmer i sin ARP-cache.
4. R2 bygger en ny Ethernet-frame med R2's udgående MAC som Source MAC og Server1's MAC (`2222.2222.2222`) som Destination MAC og afleverer pakken til Server1.

![[Figure 9-4 - Basic Routing - Step 3.png]]

> **Vigtig eksamensregel:** Under hele rejsen fra PC1 til Server1 forbliver **Source IP og Destination IP uændrede** (medmindre der udføres NAT), mens **Source MAC og Destination MAC omskrives ved hvert eneste router-hop**!

---

## 2. Kilder til Routing-information (Sources of Routing Information)

En router opbygger sin routingtabel ud fra tre primære kilder:

### 2.1 Directly Connected Routes (Direkte forbundne ruter)
Når et router-interface konfigureres med en IP-adresse og subnetmaske og aktiveres (`no shutdown`), tilføjer routeren automatisk det pågældende netværk som en **Directly Connected** rute i sin routingtabel. I Figur 9-5 kender R1 automatisk `192.168.1.0/24` og `192.168.2.0/30`, fordi den selv har fysiske interfaces i begge netværk.

![[Figure 9-5 - Directly Connected Routes.png]]

### 2.2 Static Routes (Statiske ruter og Default Routes)
En administrator kan manuelt indtaste ruter i routingtabellen (**Static Routing**). En statisk rute angiver enten en **Next-Hop IP-adresse** (IP-adressen på næste routers interface) eller et lokalt **Exit Interface**.
- **Default Route (`0.0.0.0/0`):** En speciel statisk (eller dynamisk annonceret) rute med netværksadressen `0.0.0.0` og subnetmasken `0.0.0.0` (`/0`), der matcher *enhver* destination, som ikke har et mere specifikt match i routingtabellen. Bruges typisk til at pege al internet- eller ukendt trafik mod en ISP-router eller en hovedkontors-router.
- **Fordele ved statiske ruter:** Ingen CPU- eller båndbredde-overhead fra routingprotokol-opdateringer, høj sikkerhed og fuld forudsigelighed i små netværk.
- **Ulemper:** Skalerer dårligt i store netværk og kan ikke automatisk rute uden om en defekt forbindelse (medmindre man konfigurerer en *floating static route* med højere AD).

![[Figure 9-6 - Static Routes.png]]

### 2.3 Dynamic Routing Protocols (Dynamiske routingprotokoller)
I større og mere komplekse netværk (Figur 9-7) udveksler routere automatisk netværksinformation via en **dynamisk routingprotokol** (f.eks. OSPF, EIGRP eller BGP). Hvis et link fejler (Figur 9-8), opdager routerne automatisk ændringen og konvergerer mod en alternativ rute (**Route Redundancy**).

![[Figure 9-7 - Dynamic Routes.png]]

![[Figure 9-8 - Route Redundancy.png]]

---

## 3. Route Selection og Karakteristika for Routingprotokoller

Først skelnes der skarpt mellem to grundbegreber:
- **Routed Protocol (Rutet protokol):** En Lag 3-protokol med et adresseringsskema, hvis datapakker transporteres gennem netværket (f.eks. **IPv4** og **IPv6**).
- **Routing Protocol (Routingprotokol):** En protokol, som routere bruger til at udveksle ruteoplysninger med hinanden for at opbygge og vedligeholde routingtabellen (f.eks. **OSPF**, **EIGRP**, **BGP**, **RIP**).

### 3.1 De 3 kriterier for Route Selection (Rutevalg)
Når en router skal vælge, hvilken rute en pakke skal følge (eller hvilken rute der skal indsættes i routingtabellen), anvender den disse tre kriterier i prioriteret rækkefølge:
1. **Longest Matching Prefix Length (Længste præfiksmatch):** Routeren vælger **altid** den rute i routingtabellen, der har det længste og mest specifikke subnet-præfiks, som matcher destinations-IP'en. Hvis en pakke til `10.1.2.5` matcher både `10.0.0.0/8`, `10.1.0.0/16` og `10.1.2.0/24`, vinder `/24`-ruten altid – uanset hvilken routingprotokol eller AD den kommer fra!
2. **Lowest Administrative Distance (AD – Troværdighed):** Hvis en router lærer **præcis det samme præfiks** (f.eks. `10.1.2.0/24`) fra to *forskellige* routingkilder (f.eks. både OSPF og EIGRP), vælger routeren den kilde, der har den **laveste Administrative Distance (AD)**. AD måler, hvor *troværdig* (*believable*) en routingkilde er (lavere tal = mere troværdig).
3. **Best (Lowest) Metric (Bedste metrik):** Hvis en router lærer flere veje til det samme præfiks fra **den samme routingprotokol**, vælger den ruten med den **laveste metrik** (f.eks. laveste *cost* i OSPF eller laveste *hop count* i RIP). Hvis flere ruter i samme protokol har præcis samme metrik, kan routeren udføre **Equal-Cost Multipathing (ECMP)** (load balancing). EIGRP understøtter endda *unequal-cost load balancing*.

![[Table 9-1 - Administrative Distance.png]]

| Kilde til rute (Routing Source) | Administrative Distance (AD) |
| :--- | :---: |
| **Directly Connected** (Direkte forbundet) | **0** |
| **Static Route** (Statisk rute) | **1** |
| **Internal EIGRP** | **90** |
| **OSPF** | **110** |
| **RIP** | **120** |
| **External EIGRP** | **170** |
| **Ukendt / Uopnåelig (Unreachable)** | **255** |

### 3.2 IGP (Interior Gateway Protocols) vs. EGP (Exterior Gateway Protocols)
- **IGP (Interior Gateway Protocol):** Opererer **inden for ét enkelt Autonomous System (AS)** – dvs. et netværk under én enkelt organisation eller administrativ kontrol (f.eks. **OSPF**, **EIGRP**, **RIP**, **IS-IS**).
- **EGP (Exterior Gateway Protocol):** Opererer **mellem forskellige Autonomous Systems (AS)**, f.eks. mellem virksomheder og internetudbydere (ISP'er) eller på tværs af selve internettet. **BGP (Border Gateway Protocol)** er den eneste EGP i udbredt brug i dag.

![[Figure 9-9 - IGPs Versus EGPs.png]]

### 3.3 Distance-Vector vs. Link-State Routingprotokoller

#### 1. Distance-Vector ("Routing by Rumor")
En distance-vector-protokol (som **RIP**) sender med faste intervaller en kopi af hele sin routingtabel til sine direkte forbundne naboer. Den kender kun retningen (*vector*/interface) og afstanden (*distance*, f.eks. hop count) til et netværk, men har ikke et samlet kort over topologien.
- **Ulemper:** Langsom konvergens, spild af båndbredde ved periodiske opdateringer og risiko for **Routing Loops** (*Count-to-Infinity*).
- **Hvordan en Routing Loop opstår (Figur 9-10 til 9-12):** Før linkfejlen (Figur 9-10) er netværket `10.1.4.0/24` direkte forbundet til R3 (metrik 0), som har annonceret det til R2 (metrik 1), der har annonceret det til R1 (metrik 2). Når R3's interface mod `10.1.4.0/24` går ned (Figur 9-11), når R2 måske at sende sin periodiske opdatering til R3, hvor R2 fortæller, at R2 kan nå `10.1.4.0/24` med en metrik på 1. R3 tror fejlagtigt på R2 og opdaterer sin tabel til at pege tilbage på R2 med metrik 2. Derefter opdaterer R2 sin tabel til metrik 3 via R3 osv. (**Count-to-Infinity**, Figur 9-12), indtil metrikken når uendelig (16 hops i RIP).

![[Figure 9-10 - Routing Loop - Before Link Failure.png]]

![[Figure 9-11 - Routing Loop - After Link Failure.png]]

![[Figure 9-12 - Routing Loop - Routers R2 and R3 Incrementing the Metric for 10.1.4.0-24.png]]

- **Forebyggelse af Routing Loops i Distance-Vector:**
  - **Split Horizon:** Forhindrer en router i at annoncere en rute tilbage ud af det selvsamme interface, som den oprindeligt lærte ruten igennem.
  - **Poison Reverse:** Når en router lærer en rute på et interface (eller et link går ned), annoncerer den ruten tilbage med en uendelig metrik (*infinite metric*, f.eks. 16 i RIP) for aktivt at "forgifte" den ugyldige rute hos naboen.
  - **Hold-down Timers:** Fryser ændringer til en nedfaldet rute i en kort periode, så fejlagtige rygter om ruten ikke accepteres.

#### 2. Link-State
I en link-state-protokol (som **OSPF** og **IS-IS**) sender routere **Link-State Advertisements (LSAs)**, så samtlige routere i området opbygger et fuldstændigt, identisk **topologisk kort (Link-State Database)** over netværket. Hver router kører derefter **Dijkstras Shortest Path First (SPF)-algoritme** for at beregne det korteste, loop-frie træ til alle destinationer. Fuld udveksling sker kun ved oprettelse af naboskab (*adjacency*), hvorefter opdateringer kun sendes ved faktiske topologiændringer (*event-driven*), hvilket giver meget hurtig konvergens.

### 3.4 Gennemgang af Dynamiske Routingprotokoller
- **OSPF (Open Shortest Path First):** Åben standard **Link-State IGP**. Bruger **Cost** (baseret på linkets båndbredde) som metrik og kører Dijkstras SPF-algoritme. Meget populær i enterprise-netværk pga. hurtig konvergens, hierarkisk opdeling i *Areas* og fuld understøttelse på tværs af producenter. (AD = 110).
- **IS-IS (Intermediate System-to-Intermediate System):** Åben standard **Link-State IGP**, der minder om OSPF, men bruger en konfigurerbar, dimensionsløs metrik. Meget udbredt hos store internetudbydere (ISP'er).
- **EIGRP (Enhanced Interior Gateway Routing Protocol):** Oprindeligt Cisco-proprietær **Hybrid / Advanced Distance-Vector IGP**. Kombinerer egenskaber fra distance-vector og link-state (danner naboskaber og sender kun inkrementelle opdateringer ved ændringer). Bruger en **Composite Metric**, som standardmæssigt beregnes ud fra **Bandwidth (båndbredde) og Delay (forsinkelse)** (og valgfrit *Load*, *Reliability* og *MTU*). (AD = 90 internt / 170 eksternt).
- **RIP (Routing Information Protocol):** Ældre **Distance-Vector IGP**, der bruger **Hop Count** som metrik med et maksimum på **15 hops** (16 = unreachable). Tager ikke højde for linkets båndbredde. (AD = 120).
- **BGP (Border Gateway Protocol):** Den eneste **EGP**, som binder hele internettet sammen mellem forskellige Autonomous Systems (AS). Klassificeres som en **Path-Vector** protokol og træffer routingbeslutninger baseret på en lang række **Path Attributes** (herunder AS-Path, politikker m.m.).
- **Route Redistribution:** En router, der grænser op til to forskellige routingdomæner (f.eks. OSPF på den ene side og EIGRP på den anden), kan konfigureres til at oversætte og videresende ruter mellem de to protokoller.

![[Table 9-2 - Comparing Dynamic Routing Protocols.png]]

---

## 4. Address Translation (NAT og PAT)

Private IPv4-adresser defineret i **RFC 1918** (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) kan ikke rutes på det offentlige internet. **NAT (Network Address Translation)** oversætter mellem private og offentlige IP-adresser i kanten af netværket.

### 4.1 Grundlæggende NAT og de 4 NAT-adressetyper
I Figur 9-13 oversætter Router R1 klienternes private IP-adresser (`10.1.1.1` og `10.1.1.2`) til offentlige IP-adresser (`172.16.1.101` og `172.16.1.102`), når de kommunikerer med webserveren (`192.168.1.1`).

![[Figure 9-13 - Basic NAT Topology.png]]

CompTIA og Cisco benytter fire specifikke termer til at beskrive adresserne i NAT:
- **Inside Local:** Den **private** IP-adresse tildelt en enhed på det **interne** netværk (før oversættelse, f.eks. `10.1.1.1`).
- **Inside Global:** Den **offentlige (globalt rutbare)** IP-adresse, som repræsenterer den **interne** enhed over for omverdenen (efter oversættelse, f.eks. `172.16.1.101`).
- **Outside Local:** En privat IP-adresse, som en ekstern enhed eventuelt fremstår med set fra det interne netværk.
- **Outside Global:** Den **offentlige** IP-adresse tildelt en enhed på det **eksterne** netværk/internettet (f.eks. webserverens `192.168.1.1` i eksemplet).

> **Huskeregel:** *Inside* = vores egen interne enhed; *Outside* = den eksterne modpart. *Local* = privat adresse på LAN-siden; *Global* = offentlig adresse på WAN/internet-siden.

![[Table 9-3 - Names of NAT IP Addresses.png]]

![[Table 9-4 - Classifying the NAT IP Addresses in Figure 9-13.png]]

### 4.2 SNAT vs. DNAT
- **SNAT (Static NAT – En-til-en):** En fast, statisk 1:1-mapping mellem én bestemt *Inside Local*-adresse og én bestemt *Inside Global*-adresse. Bruges når en intern server (f.eks. en mailserver eller webserver) skal kunne tilgås udefra på en fast offentlig IP-adresse.
- **DNAT (Dynamic NAT – Mange-til-mange):** Interne enheder (*Inside Local*) tildeles dynamisk en ledig offentlig IP-adresse fra en pulje (*NAT Pool*) af *Inside Global*-adresser efter først-til-mølle-princippet.

### 4.3 PAT (Port Address Translation / NAT Overload)
Da basale SNAT- og DNAT-løsninger kræver én offentlig IP-adresse for hver intern enhed, der er på nettet samtidig, bruges i praksis næsten altid **PAT (Port Address Translation)** (også kaldet **NAT Overload** eller *mange-til-én NAT*).

Med PAT kan hundredvis af interne klienter (**Inside Local**) dele **én enkelt offentlig IP-adresse (Inside Global)** (typisk IP-adressen på routerens udvendige WAN-interface):
- Routeren holder styr på de enkelte sessioner ved at omskrive og registrere klienternes **TCP/UDP kildeportnumre (ephemeral source ports)** i sin NAT-tabel.
- I Figur 9-14 bliver Klient 1 (`10.1.1.1:1025`) oversat til `172.16.1.100:2025`, mens Klient 2 (`10.1.1.2:1050`) bliver oversat til `172.16.1.100:2050`. Når webserveren sender svar tilbage til `172.16.1.100`, kigger Router R1 på destinationsporten (`2025` vs. `2050`) og ved præcis, om pakken skal sendes til Klient 1 eller Klient 2.

![[Figure 9-14 - PAT Topology.png]]

---

## 5. First Hop Redundancy Protocols (FHRP), LACP og Subinterfaces

### 5.1 First Hop Redundancy Protocol (FHRP) og Virtual IP (VIP)
Slutbruger-enheder (PC'er, printere, servere) er normalt konfigureret med én enkelt **Default Gateway IP-adresse**. Hvis den fysiske router, der har denne IP-adresse, går ned, mister alle klienter på subnetværket forbindelsen til omverdenen – selvom der står en ekstra router på samme subnet!

En **First Hop Redundancy Protocol (FHRP)** løser dette ved at lade to eller flere fysiske routere samarbejde i en gruppe og dele en **Virtual IP (VIP)** og en **virtuel MAC-adresse**:
- Klienterne konfigureres med den **virtuelle IP-adresse (VIP)** som deres Default Gateway (i Figur 9-15 er VIP `172.16.1.3`, mens R1 har `172.16.1.1` og R2 har `172.16.1.2`).
- Hvis den aktive router (R1) fejler, overtager standby-routeren (R2) øjeblikkeligt ansvaret for både VIP (`172.16.1.3`) og den virtuelle MAC-adresse – helt transparent for klienterne!

![[Figure 9-15 - HSRP Sample Topology.png]]

De fire FHRP-protokoller i kapitlet er:
1. **HSRP (Hot Standby Router Protocol):** **Cisco-proprietær** FHRP (Active/Standby).
2. **VRRP (Virtual Router Redundancy Protocol):** **IETF åben standard** FHRP, der fungerer næsten identisk med HSRP (kan bruges på tværs af producenter).
3. **CARP (Common Address Redundancy Protocol):** Åben og fri standard-variant af HSRP/VRRP.
4. **GLBP (Gateway Load Balancing Protocol):** **Cisco-proprietær** FHRP, der udover failover også giver aktiv **load balancing** på tværs af flere routere i gruppen.

### 5.2 Link Aggregation (LACP) vs. Subinterfaces
- **LACP (Link Aggregation Control Protocol):** Bundter flere fysiske kabler/interfaces mellem to enheder til ét enkelt **logisk interface** (Figur 9-16), hvilket giver både øget samlet båndbredde og link-redundans.
- **Subinterfaces:** Flere **logiske interfaces** oprettet under ét enkelt *fysisk* router-interface (f.eks. `Gi0/0.10` og `Gi0/0.20` i en *Router-on-a-Stick* konfiguration) for at betjene flere VLANs/subnets over en enkelt fysisk trunk-forbindelse. **Bemærk:** Subinterfaces giver *ikke* fysisk redundans – hvis det fysiske interface går ned, går alle dets subinterfaces også ned!

![[Figure 9-16 - LACP Sample Topology.png]]

---

## 6. Nøgleemner til Eksamen (Key Topics)

![[Table 9-5 - Key Topics for Chapter 9.png]]

### Hurtige eksamenstips (Exam Cram)
- **Pakke-headers ved routing:** Når en PC sender til en host på et *andet* subnet, er **Destination IP = fjern-hostens IP**, mens **Destination MAC = Default Gateways MAC-adresse**.
- **Route Selection-rækkefølge:** 1) **Longest Prefix Match** (f.eks. `/26` slår `/24`) $\rightarrow$ 2) **Laveste Administrative Distance (AD)** (Connected `0`, Static `1`, EIGRP `90`, OSPF `110`, RIP `120`) $\rightarrow$ 3) **Bedste (laveste) Metric**.
- **Loop-forebyggelse i Distance-Vector:** **Split Horizon** og **Poison Reverse**.
- **PAT (NAT Overload):** Mange interne *Inside Local* RFC 1918-adresser deler én offentlig *Inside Global* IP-adresse (typisk routerens fysiske outside-interface) vha. unikke portnumre.
