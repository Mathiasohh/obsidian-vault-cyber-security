---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - Kapitel 2 - Networking Appliances, Applications, and Functions
  - Networking Appliances, Applications, and Functions
---

# CompTIA Network+ N10-009: Kapitel 2 – Networking Appliances, Applications, and Functions

**Sider i bogen:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 2 - Networking Appliances, Aplications, and Funktions.pdf]]  
**For termer og udtryk, se:** [[NA - Begrebsark]] Kap. 2

---

## Resumé

Kapitel 2 dækker **Objective 1.2 (Compare and contrast networking appliances, applications, and functions)** i CompTIA Network+ N10-009-pensummet og giver et dybdegående overblik over de fysiske og virtuelle netværksenheder, lagringsteknologier og netværksfunktioner, der udgør en moderne IT-infrastruktur.

Kapitlet indleder med en grundig gennemgang af **Routere (Lag 3)** og **Switches (Lag 2 og Multilayer/Lag 3)** med særligt fokus på forskellen mellem **Collision Domains (kollisionsdomæner)** og **Broadcast Domains (broadcast-domæner)** samt en komplet trin-for-trin gennemgang (Figur 2-2 til 2-11) af, hvordan switche dynamisk opbygger deres **MAC-adressetabel** ud fra *Source MAC*, mens en endnu ukendt modtager findes via **ARP Request (Broadcast)** og **ARP Reply (Unicast)**. Dernæst gennemgås sikkerhedsappliances: **Firewalls** (*stateful* vs. *stateless*), **IDS (Intrusion Detection System – passivt/out-of-band)** vs. **IPS (Intrusion Prevention System – aktivt/inline)** samt deres tre detektionsmetoder (*Signature-based*, *Policy-based* og *Anomaly-based*), **Load Balancers**, **Proxy Servere** (og *Reverse Proxies*), **NAS (Network-Attached Storage)** vs. **SAN (Storage Area Network)** (med *Fibre Channel*, *iSCSI* og *FCoE*), samt **Wireless Access Points (AP)** og **Wireless LAN Controllers (WLC)**. Afslutningsvis gennemgås netværksapplikationer og -funktioner: **CDN (Content Delivery Network)**, **VPN (Virtual Private Network)**, **QoS (Quality of Service)** til håndtering af *Delay*, *Jitter* og *Drops* på konvergerede netværk, samt **TTL (Time to Live)**.

---

## 1. Routere og Switches: Broadcast- og Kollisionsdomæner

### 1.1 Routere (Lag 3)
En **router** opererer på **OSI Lag 3 (Network Layer)** og træffer sine forwarding-beslutninger ud fra pakkens **logiske destinations-IP-adresse** (Destination IP).
- **Adskiller Broadcast-domæner:** Routere videresender **ikke** broadcast-pakker som standard. Derfor udgør **hver enkelt port (interface) på en router sit eget separate broadcast-domæne** (f.eks. har en router med 12 aktive porte 12 broadcast-domæner).
- **Adskiller Kollisionsdomæner:** Hver port på en router udgør desuden sit eget separate kollisionsdomæne (Figur 2-1).

![[Figure 2-1 - Router Broadcast and Collision Domains.png]]

### 1.2 Layer 2 Switches og MAC-adressetabellens opbygning (Trin for Trin)
En **Layer 2 Ethernet-switch** opererer på **OSI Lag 2 (Data Link Layer)** og videresender frames baseret på **48-bit MAC-adresser**:
- **Lærer ud fra Source MAC:** Når en frame kommer ind på en switchport, kigger switchen på **Source MAC-adressen** og registrerer i sin **MAC-adressetabel (CAM-tabel)**, hvilken port denne afsender-MAC sidder på.
- **Flooder ved ukendt Destination MAC eller Broadcast:** Hvis Destination MAC-adressen endnu ikke findes i MAC-adressetabellen (*unknown unicast*), eller hvis det er en broadcast-frame (`FFFF.FFFF.FFFF`), **flooder** switchen framen ud af *alle* andre porte (undtagen den port, framen kom ind ad).
- **Forwarder målrettet ved kendt Destination MAC:** Når Destination MAC findes i tabellen, sendes framen *kun* ud af den ene specifikke port, hvor modtageren befinder sig.

#### Trin-for-trin eksempel: PC1 opretter SSH-forbindelse til Server over to switche (SW1 og SW2)
Antag, at både SW1 og SW2 starter med helt tomme MAC-adressetabeller, og at **PC1 (`AAAA.AAAA.AAAA`)** vil oprette en SSH-forbindelse til **Server (`BBBB.BBBB.BBBB`)** på samme subnet:

1. **PC1 sender ARP Request (Figur 2-2):** PC1 kender serverens IP-adresse, men mangler dens MAC-adresse. PC1 sender derfor et **ARP Request** som broadcast (Source MAC: `AAAA.AAAA.AAAA`, Destination MAC: `FFFF.FFFF.FFFF`).

![[Figure 2-2 - Endpoint Sending an ARP Request.png]]

2. **SW1 lærer PC1's MAC og flooder ARP Request (Figur 2-3):** SW1 modtager framen på port `Gi0/1`, tilføjer **`AAAA.AAAA.AAAA` $\rightarrow$ `Gi0/1`** til sin MAC-tabel, og flooder broadcast-framen ud på trunk-porten `Gi0/2` mod SW2.

![[Figure 2-3 - Switch SW1 Flooding the ARP Request.png]]

3. **SW2 lærer PC1's MAC og flooder ARP Request (Figur 2-4):** SW2 modtager framen på `Gi0/1`, tilføjer **`AAAA.AAAA.AAAA` $\rightarrow$ `Gi0/1`** til sin MAC-tabel, og flooder broadcast-framen ud på `Gi0/2` til Serveren.

![[Figure 2-4 - Switch SW2 Flooding the ARP Request.png]]

4. **Serveren sender ARP Reply som Unicast (Figur 2-5):** Serveren modtager forespørgslen og svarer med et **ARP Reply** direkte til PC1 (Source MAC: `BBBB.BBBB.BBBB`, Destination MAC: `AAAA.AAAA.AAAA` – bemærk at ARP Reply er **unicast**!).

![[Figure 2-5 - ARP Reply Sent from a Server.png]]

5. **SW2 lærer Serverens MAC og forwarder ARP Reply (Figur 2-6):** SW2 modtager ARP Reply på `Gi0/2` og tilføjer **`BBBB.BBBB.BBBB` $\rightarrow$ `Gi0/2`** til sin MAC-tabel. Da SW2 allerede kender `AAAA.AAAA.AAAA` på `Gi0/1`, forwardes svaret målrettet ud på `Gi0/1`.

![[Figure 2-6 - Switch SW2 Forwarding the ARP Reply.png]]

6. **SW1 lærer Serverens MAC og forwarder ARP Reply til PC1 (Figur 2-7):** SW1 modtager svaret på `Gi0/2`, tilføjer **`BBBB.BBBB.BBBB` $\rightarrow$ `Gi0/2`** til sin MAC-tabel og forwarder svaret ud på `Gi0/1` til PC1.

![[Figure 2-7 - Switch SW1 Forwarding the ARP Reply.png]]

7. **Målrettet SSH-kommunikation i begge retninger (Figur 2-8 til 2-11):** Nu kender PC1 serverens MAC-adresse (gemt i PC1's ARP-cache), og begge switche har både PC1 og Serveren i deres MAC-adressetabeller. PC1 sender sit SSH-segment (Figur 2-8), som SW1 (Figur 2-9) og SW2 (Figur 2-10) videresender direkte uden flooding, hvorefter en tovejs SSH-session er etableret (Figur 2-11).

![[Figure 2-8 - PC1 Sending an SSH Segment.png]]

![[Figure 2-9 - Switch SW1 Forwarding the SSH Segment.png]]

![[Figure 2-10 - Switch SW2 Forwarding the SSH Segment.png]]

![[Figure 2-11 - Bidirectional SSH Session Between PC1 and the Server.png]]

### 1.3 Switch Collision & Broadcast Domains og Multilayer Switches
- **Layer 2 Switch (Figur 2-12):** **Hver port på en switch er sit eget separate kollisionsdomæne** (en switch med 12 porte har 12 kollisionsdomæner). Som standard tilhører alle porte på en Layer 2-switch dog **det samme enkelte broadcast-domæne** – medmindre switchen opdeles i **VLANs** (hvor hvert VLAN udgør sit eget broadcast-domæne).

![[Figure 2-12 - Switch Collision and Broadcast Domains.png]]

- **Multilayer Switch (Lag 3-switch, Figur 2-13):** Kombinerer funktionerne fra en Layer 2-switch og en Layer 3-router i én enhed. Den kan både switche frames inden for samme VLAN på Lag 2 og **rute pakker mellem forskellige VLANs/subnets på Lag 3** (og dermed agere grænse for broadcast-domæner).

![[Figure 2-13 - Multilayer Ethernet Switch.png]]

---

## 2. Sikkerheds-, Trafik-, Lagrings- og Trådløse Appliances

### 2.1 Firewalls
En **Firewall** (hardware-appliance eller host-baseret OS-software) placeres som sikkerhedsgrænse mellem et **betroet netværk (Inside/Trusted)** og et **ubetroet netværk (Outside/Untrusted, f.eks. internettet)** (Figur 2-14).
- **Stateful Firewall:** Overvåger aktive forbindelsestilstande (*connection state table*). Når en intern bruger starter en tilladt udgående forbindelse til internettet, tillader en stateful firewall **automatisk og dynamisk den tilhørende returtrafik** tilbage ind gennem firewallen, mens uanmodet trafik udefra blokeres.
- **Stateless Firewall:** Inspicerer hver enkelt pakke isoleret ud fra statiske regler (ACL'er) uden at huske tidligere pakker i sessionen.

![[Figure 2-14 - Firewall.png]]

### 2.2 IDS (Intrusion Detection System) vs. IPS (Intrusion Prevention System)
Både IDS og IPS analyserer netværkstrafik (NIDS/NIPS) eller host-aktivitet (HIDS/HIPS) for at genkende angreb, men de adskiller sig afgørende i deres **placering og reaktionsevne** (Figur 2-15):
- **IDS (Intrusion Detection System – Passiv / Out-of-Band):** Sidder *ved siden af* trafikstrømmen og modtager kun en **kopi af trafikken** (via en switch *SPAN/mirror port* eller *network tap*). Et IDS kan **detektere og sende alarmer** til et managementsystem, men kan *ikke* selv stoppe selve angrebspakken på vej gennem netværket.
- **IPS (Intrusion Prevention System – Aktiv / Inline):** Sidder **direkte inline i trafikstrømmen**, så alle pakker fysisk skal igennem IPS-enheden. Et IPS kan derfor både detektere angreb og **aktivt blokere/droppe ondsindede pakker i realtid**.

![[Figure 2-15 - IDS and IPS Network Placement.png]]

#### De 3 metoder til detektion af ondsindet trafik i IDS/IPS:
1. **Signature-Based Detection (Signaturbaseret):** Sammenligner trafik med en database over kendte angrebsmønstre/byte-strenge (*signatures*, f.eks. i URL'er eller e-mail-headers). Meget præcis mod kendte angreb, men kræver løbende signaturopdateringer og kan ikke fange helt nye *zero-day*-angreb.
2. **Policy-Based Detection (Politikbaseret):** Kræver at administratoren definerer eksplicitte sikkerhedspolitikker (f.eks. hvilke netværk og protokoller der må tale sammen) og reagerer på enhver overtrædelse af politikken.
3. **Anomaly-Based / Behavior-Based Detection (Anomalibaseret):** Sammenligner aktuel trafik med en **Baseline (normalbillede)** – enten opbygget dynamisk over tid (*Statistical anomaly detection*) eller defineret manuelt (*Nonstatistical anomaly detection*). Kan opdage nye/ukendte angreb, men giver lettere **False Positives** (falske alarmer, f.eks. hvis hundredvis af PC'er samtidig downloader en stor Windows-opdatering om morgenen).

### 2.3 Load Balancer og Proxy Server
- **Load Balancer:** En fysisk eller virtuel enhed (opererer ofte på Lag 4 og Lag 7), der fordeler indkommende klientforespørgsler jævnt på tværs af en pulje af backend-servere (*server farm*). Sikrer høj oppetid (*high availability*), skalerbarhed og optimal ressourceudnyttelse.
- **Proxy Server (Forward Proxy, Figur 2-16):** Modtager internetforespørgsler fra interne klienter og henter ressourcen på internettet **på vegne af klienten**. Giver tre store fordele:
  1. **Sikkerhed/Anonymitet:** Skjuler de interne klienters IP-adresser for omverdenen.
  2. **Content Caching (Båndbreddebesparelse):** Gemmer lokalt kopier af ofte besøgte websider/billeder, så de ikke skal hentes over WAN-forbindelsen igen og igen.
  3. **Content / URL Filtering:** Blokerer adgang til uønskede eller farlige kategorier af websites.
- **Reverse Proxy:** Placeres foran virksomhedens egne webservere og modtager forespørgsler udefra *på vegne af serverne* (bruges til sikkerhed, SSL-offloading, caching og load balancing).

![[Figure 2-16 - Proxy Server Operation.png]]

### 2.4 Netværkslagring: NAS vs. SAN
| Egenskab | NAS (Network-Attached Storage) | SAN (Storage Area Network) |
| :--- | :--- | :--- |
| **Arkitektur** | En dedikeret lagringsenhed tilsluttet det eksisterende LAN for centraliseret **fildeling** (**File-level storage**). | Et dedikeret højhastighedsnetværk med lav latens, der forbinder servere med store diskkabinetter (**Block-level storage**). |
| **Protokoller** | **SMB** (Server Message Block) og **NFS** (Network File System). | **Fibre Channel (FC)**, **iSCSI** (IP-baseret med *Initiator* og *Target*), **FCoE** (Fibre Channel over Ethernet – kræver typisk mindst 10 Gbps Ethernet) samt **InfiniBand**. |

### 2.5 Wireless Access Points (APs) og Controllers (WLC)
- **Wireless Access Point (AP):** Forbinder trådløse klienter (via radiobølger/RF) til det kablede LAN (Figur 2-17). Da alle trådløse klienter på samme AP/kanal deler luften som transmissionsmedie, arbejder WLAN i **Half-Duplex**.
- **Autonomous AP vs. Lightweight AP + Controller (WLC):**
  - *Autonomous AP:* Har sit eget kontrolplan indbygget og skal konfigureres enkeltvis.
  - *Lightweight AP:* Styres centralt af en **Wireless LAN Controller (WLC)**, hvorfra administratoren kan rulle konfigurationer, kanaler og sikkerhedspolitikker ud til hundredvis af AP'er på én gang.

![[Figure 2-17 - A Wireless Access Point in a Network.png]]

### 2.6 Samlet oversigt over Netværksenheder
![[Table 2-1 - Networking Device Summary.png]]

---

## 3. Netværksapplikationer og Funktioner (CDN, VPN, QoS og TTL)

### 3.1 Content Delivery Network (CDN)
Et **CDN** er et globalt distribueret netværk af servere placeret i geografisk spredte datacentre. Når en bruger anmoder om webindhold, billeder, software eller streaming-video, leveres indholdet automatisk fra den CDN-server, der er **geografisk tættest på brugeren**, hvilket reducerer latens, sparer backbone-båndbredde og aflaster hovedserveren under spidsbelastning.

### 3.2 Virtual Private Network (VPN)
En **VPN** opretter en **krypteret, sikker tunnel hen over et ubetroet offentligt netværk (internettet)**. Bruges både som *Site-to-Site VPN* (et økonomisk alternativ til dyre dedikerede WAN-linjer mellem filialer) og *Remote Access VPN* (til hjemmearbejdspladser og rejsende medarbejdere).

### 3.3 Quality of Service (QoS) og de 3 Kvalitetsproblemer
I et moderne **konvergeret netværk** (*converged network*), hvor data, VoIP-telefoni og videokonferencer deler de samme kabler, er den **effektive båndbredde** på en sti altid begrænset af det **langsomste link (flaskehalsen)** på ruten (i Figur 2-18 er den effektive båndbredde 256 Kbps, selvom de øvrige links er hurtigere).

![[Figure 2-18 - Effective Bandwidth of 256 Kbps.png]]

Når båndbredden er utilstrækkelig, opstår tre kategorier af kvalitetsproblemer (Tabel 2-2):
1. **Delay (Latency / Forsinkelse):** Den tid det tager en pakke at rejse fra kilde til destination (høj forsinkelse gør f.eks. samtaler unaturlige).
2. **Jitter (Varierende forsinkelse):** **Ujævn ankomsttid mellem pakker** i en datastrøm (f.eks. ankommer pakke 2 efter 20 ms, pakke 3 efter 70 ms og pakke 4 efter 20 ms). Giver hakkende lyd og billede i VoIP og videomøder.
3. **Drops (Pakketab):** Når et link er overbelastet, og en routers interface-kø (*buffer*) løber fuld, smides pakker væk. For realtids-UDP-trafik (som VoIP) gensendes tabte pakker ikke.

![[Table 2-2 - Three Categories of Quality Issues.png]]

**QoS (Quality of Service)** løser dette uden nødvendigvis at købe dyrere linjer ved at **identificere, markere og prioritere tidsfølsom trafik (som VoIP og video)** – ligesom en reserveret bus-/samkørselsbane på en motorvej i myldretiden – og garantere en minimums-båndbredde til kritisk trafik.

### 3.4 Time to Live (TTL)
**TTL (Time to Live)** er et felt i Lag 3 IP-headeren, der forhindrer pakker i at cirkulere uendeligt på netværket, hvis der opstår en routing-løkke. Hver router på vejen **trækker 1 fra TTL-værdien**; hvis TTL når **0**, kasserer routeren pakken.

---

## 4. Nøgleemner til Eksamen (Key Topics)

![[Table 2-3 - Key Topics for Chapter 2.png]]

### Hurtige eksamenstips (Exam Cram)
- **Router med $N$ porte:** Har **$N$ broadcast-domæner** og **$N$ kollisionsdomæner**.
- **Switch med $N$ porte (uden VLANs):** Har **1 broadcast-domæne** og **$N$ kollisionsdomæner**.
- **Ukendt Destination MAC på en switch:** Switchen **flooder** framen ud på alle porte undtagen indgangsporten.
- **IDS vs. IPS:** **IDS** = Passiv (kopi af trafik), kun detektion/alarm. **IPS** = Aktiv (inline), stopper og blokerer angreb i realtid.
- **NAS vs. SAN:** **NAS** = Fil-baseret lagring på LAN (SMB/NFS). **SAN** = Blok-baseret højhastighedslagring (Fibre Channel, iSCSI, FCoE).
