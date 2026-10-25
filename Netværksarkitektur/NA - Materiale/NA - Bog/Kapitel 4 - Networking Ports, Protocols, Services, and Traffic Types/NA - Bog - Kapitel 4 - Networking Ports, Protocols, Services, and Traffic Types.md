---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - "Kapitel 4 - Networking Ports, Protocols, Services, and Traffic Types"
  - "NA - Bog - Kapitel 4"
---

# Kapitel 4: Networking Ports, Protocols, Services, and Traffic Types

> **Bog-PDF:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 4 - Networking Ports, Protocols, Services, and Traffic Types.pdf]]
> **Relateret begrebsark:** [[NA - Begrebsark]] Kap. 4

---

## Resumé

Kapitel 4 dækker **Objective 1.4 (Explain common networking ports, protocols, services, and traffic types)** i CompTIA Network+ (N10-009)-pensummet. Kapitlet gennemgår de vigtigste netværksprotokoller og deres tilhørende portnumre på transportlaget (bl.a. FTP, SFTP, SSH, Telnet, SMTP/SMTPS, DNS, DHCP, TFTP, HTTP/HTTPS, NTP, SNMP, LDAP/LDAPS, SMB, Syslog, SQL Server, RDP og SIP), de grundlæggende IP-protokoltyper i TCP/IP-stakken (**ICMP**, **TCP**, **UDP**, **GRE** og **IPsec** med **AH**, **ESP** og **IKE**) samt de fire fundamentale trafiktyper i moderne netværk: **Unicast**, **Broadcast**, **Multicast** og **Anycast**.

---

## 1. Porte og Protokoller (Ports and Protocols)

Transportlagsporte (TCP og UDP) bruges til at identificere specifikke applikationer og tjenester på en vært. Portnumre (16-bit heltal fra `0` til `65535`) er opdelt i tre hovedkategorier:
- **Well-Known Ports (`0–1023`):** Standardiserede porte tildelt de mest udbredte netværkstjenester (f.eks. HTTP, HTTPS, SSH, DNS).
- **Registered Ports (`1024–49151`):** Porte registreret hos IANA til specifikke applikationer og databaseservere (f.eks. Microsoft SQL Server på port `1433` og RDP på port `3389`).
- **Dynamic / Private / Ephemeral Ports (`49152–65535`):** Midlertidige kildeporte, som klientoperativsystemer tildeler dynamisk, når de opretter udgående forbindelser.

### Gennemgang af pensummets protokoller og porte

- **FTP (File Transfer Protocol) – TCP port `20` og `21`:** Bruges til filoverførsel mellem klient og server. Port `21` anvendes til kontrolforbindelsen (kommandoer), mens port `20` anvendes til selve dataoverførslen (i aktiv tilstand). FTP sender brugernavne, adgangskoder og data i **klartekst** (*cleartext*) og er derfor usikker.
- **SFTP (Secure File Transfer Protocol) – TCP port `22`:** Leverer sikker, krypteret filoverførsel som et undersystem over en **SSH**-forbindelse på TCP port `22`.
- **SSH (Secure Shell) – TCP port `22`:** De facto-standarden for sikker, krypteret fjernadministration via kommandolinje (CLI / terminalemulator) på netværksenheder og servere. Erstatter Telnet i produktionsmiljøer.
- **Telnet – TCP port `23`:** Ældre protokol til fjernadgang via terminalemulator. Da al kommunikation (inkl. loginoplysninger) sendes ukrypteret i klartekst, bør Telnet kun anvendes i lukkede laboratoriemiljøer.
- **SMTP (Simple Mail Transfer Protocol) – TCP port `25`:** Standardprotokollen til afsendelse og videresendelse (*relaying*) af e-mail mellem mailservere og fra e-mailklienter.
- **SMTPS (Simple Mail Transfer Protocol Secure) – TCP port `587`:** Den sikre udgave af SMTP, som anvender **TLS** (*Transport Layer Security*) til at autentificere parterne og kryptere e-mailtrafikken under transport (bemærk også, at implicit TLS for SMTP historisk bruger port `465`, men CompTIA N10-009 fokuserer på TCP port `587`).
- **DNS (Domain Name System) – TCP/UDP port `53`:** Oversætter brugervenlige domænenavne (f.eks. `www.pearsonitcertification.com`) til IP-adresser via et globalt, hierarkisk navnerum.
  - **UDP port `53`** anvendes til almindelige navneopslag (*queries*), da det giver lavt overhead og hurtig svartid.
  - **TCP port `53`** anvendes til **zone transfers** mellem DNS-servere samt til DNS-svar, der overstiger grænsen for en enkelt UDP-pakke.
- **DHCP (Dynamic Host Configuration Protocol) – UDP port `67` og `68`:** Tildeler automatisk IP-konfiguration (IP-adresse, subnetmaske, default gateway og DNS-server) til klienter på netværket. DHCP-serveren lytter på **UDP port `67`**, mens DHCP-klienten modtager på **UDP port `68`**.
- **TFTP (Trivial File Transfer Protocol) – UDP port `69`:** En meget simpel, forbindelsesløs filoverførselsprotokol uden indbygget autentificering eller kryptering. Bruges ofte i lokale netværk til at hente opstartsfiler (PXE-boot), konfigurationsfiler eller firmware-images til routere, switche og IP-telefoner.
- **HTTP (Hypertext Transfer Protocol) – TCP port `80` (alternativt `8080`):** Henter webindhold fra en webserver i klartekst uden kryptering.
- **HTTPS (Hypertext Transfer Protocol Secure) – TCP port `443`:** Sikker webkommunikation, hvor HTTP-trafikken indkapsles og krypteres med **TLS** (tidligere **SSL**).
- **NTP (Network Time Protocol) – UDP port `123`:** Synkroniserer ure på netværksenheder og servere med en central tidsserver (*NTP server*). Præcis tidsstempling er afgørende for korrekt korrelation af logfiler (Syslog/SIEM) og validering af digitale certifikater.
- **SNMP (Simple Network Management Protocol) – UDP port `161` og `162`:** Bruges til overvågning og styring af netværksenheder. SNMP-agenter på netværksenheder lytter efter forespørgsler (*polling*) på **UDP port `161`**, mens SNMP-manageren (NMS) modtager uanmodede alarmer (*SNMP Traps* / *Informs*) på **UDP port `162`**. **SNMPv3** er den sikre version, der tilføjer autentificering (HMAC-SHA/MD5) og kryptering (AES).
- **LDAP (Lightweight Directory Access Protocol) – TCP port `389`:** Bruges til at forespørge og opdatere katalogtjenester (*directory services*) som f.eks. Microsoft Active Directory (brugere, grupper, e-mail, telefonnumre).
- **LDAPS (LDAP over SSL/TLS) – TCP port `636`:** Den krypterede og sikre udgave af LDAP.
- **SMB (Server Message Block) – TCP port `445`:** Protokol til deling af filer, printere og andre netværksressourcer (oprindeligt i Microsoft Windows-miljøer, men understøttes også på Linux/UNIX via Samba).
- **Syslog – UDP port `514`:** Standardprotokol, hvormed routere, switche, firewalls og servere sender hændelses- og statuslogfiler (*machine data*) til en central Syslog-server.
- **SQL Server (Structured Query Language) – TCP/UDP port `1433`:** Standardporten for Microsoft SQL Server til forespørgsler, opdateringer og administration af relationelle databaser.
- **RDP (Remote Desktop Protocol) – TCP/UDP port `3389`:** Microsoft-protokol (på præsentationslaget), der giver en bruger grafisk fjernadgang til skrivebordet på en fjerncomputer via *Remote Desktop Connection (RDC)*.
- **SIP (Session Initiation Protocol) – TCP/UDP port `5060` og `5061`:** Signaleringsprotokol, der bruges til at oprette, modificere og afslutte mediesessioner såsom **VoIP-opkald** og videokonferencer. Port `5060` bruges til ukrypteret SIP, mens port `5061` bruges til TLS-krypteret SIP.

![[Table 4-1 - Port Assignments for Commonly Used Protocols.png]]

---

## 2. Internet Protocol (IP) Types

Ud over applikationsprotokoller og deres transportlagsporte indeholder TCP/IP-stakken en række centrale protokoller på netværks- og transportlaget. Selve **IP (Internet Protocol, RFC 791)** er en forbindelsesløs (*connectionless*) Layer 3-protokol, der håndterer logisk adressering, pakkefragmentering/-gensamling og best-effort levering.

### ICMP (Internet Control Message Protocol)
**ICMP (RFC 792)** er en netværkslagsprotokol, der bruges til at rapportere fejl ved pakkelevering (f.eks. *Destination Unreachable* eller *Time Exceeded*) og udveksle drifts- og diagnostikinformation. ICMP transporterer ikke brugerdata, men udgør fundamentet for uundværlige fejlfindingsværktøjer som **`ping`** (Echo Request / Echo Reply) og **`traceroute` / `tracert`**.

### TCP (Transmission Control Protocol)
**TCP** er en **forbindelsesorienteret (*connection-oriented*)** og **pålidelig (*reliable*)** transportlagsprotokol (Layer 4). Den kan sammenlignes med et telefonopkald, hvor forbindelsen etableres formelt (via et *Three-Way Handshake*: `SYN` → `SYN-ACK` → `ACK`), vedligeholdes og afsluttes kontrolleret.
- **Nøglefunktioner i TCP:** Sekvensnummerering (*sequencing*), kvitteringer (*acknowledgments*), genfremsendelse af tabte segmenter (*retransmission*) samt *flow control* (windowing).

### UDP (User Datagram Protocol)
**UDP** er en **forbindelsesløs (*connectionless*)** og **upålidelig (*unreliable* / *best-effort*)** transportlagsprotokol (Layer 4). Den fungerer som et postkort: afsenderen sender datagrammet afsted uden forudgående handshake og uden at modtage bekræftelse på, om pakken når frem.
- **Fordel:** Meget lavt header-overhead og minimal forsinkelse (*latency*), hvilket gør UDP ideel til realtidstrafik (VoIP, videostreaming, online gaming) samt hurtige forespørgselsprotokoller som DNS, DHCP, SNMP og TFTP.

### GRE (Generic Routing Encapsulation)
**GRE** er en simpel, fleksibel tunnelprotokol udviklet af Cisco, der kan indkapsle en bred vifte af netværkslagsprotokoller (inkl. **multicast**- og broadcasttrafik samt dynamiske routingprotokoller) inde i virtuelle point-to-point- eller point-to-multipoint-links over et IP-netværk.
- **Vigtigt til eksamen:** GRE **krypterer ikke** trafikken i sig selv! Fordi IPsec til gengæld ikke direkte kan transportere multicast-trafik, kombineres de ofte som **GRE over IPsec**, hvor GRE indkapsler multicast-/routingtrafikken i en unicast-tunnel, som derefter krypteres og beskyttes af IPsec.

### IPsec (Internet Protocol Security)
**IPsec** er en protokolsuite på netværkslaget (Layer 3), der bruges til at oprette autentificerede og krypterede forbindelser (især Site-to-Site og Remote Access VPNs) over usikre IP-netværk. IPsec består af tre hovedkomponenter:
1. **IKE (Internet Key Exchange):** Forhandler kryptografiske nøgler, algoritmer og sikkerhedsparametre (*Security Associations* / SAs) mellem de to endepunkter før dataoverførslen.
2. **AH (Authentication Header):** Leverer **dataintegritet**, **kildeautentificering** og beskyttelse mod *replay*-angreb for hele IP-pakken, men tilbyder **ingen kryptering** (data kan stadig læses i klartekst).
3. **ESP (Encapsulating Security Payload):** Leverer **kryptering** (fortrolighed / *confidentiality*) og kan derudover også levere autentificering og integritetskontrol af payloaden.

![[Table 4-2 - Internet Protocol (IP) Types Summary.png]]

---

## 3. Traffic Types (Trafiktyper)

I IP-netværk bevæger pakker sig fra afsender til modtager efter fire forskellige trafikmønstre:

### 1. Unicast (One-to-One)
**Unicast** er den mest almindelige trafiktype i både IPv4- og IPv6-netværk. Her sendes trafikken fra **én enkelt kilde til én enkelt destination** (f.eks. når en klient henter en webside fra en webserver). Hvis den samme store videofil skulle sendes til 100 brugere via unicast, skulle serveren sende 100 separate datastrømme, hvilket ville belaste netværksbåndbredden voldsomt.

![[Figure 4-1 - Sample Unicast Transmission.png]]

### 2. Broadcast (One-to-All)
**Broadcast** sender trafik fra **én enkelt kilde til samtlige enheder på det lokale netværkssegment** (broadcast-domænet).
- **IPv4 Limited Broadcast:** Adressen `255.255.255.255` rammer alle værter på det lokale subnet og videresendes **ikke** af routere.
- **IPv4 Directed Broadcast:** F.eks. `192.168.1.255` på et `/24`-netværk, som rammer alle værter på et specifikt subnet.
- **Layer 2 Broadcast:** MAC-adressen `FF:FF:FF:FF:FF:FF`, som en switch videresender (*flooder*) ud på alle porte i samme VLAN (undtagen den port, rammen kom ind på).
- **Ulempe:** Alle enheder på subnettet tvinges til at afbryde deres arbejde og behandle broadcast-pakken, selv hvis den ikke er relevant for dem. **Bemærk:** I **IPv6** er broadcast-trafik fuldstændig afskaffet og erstattet af målrettet multicast (f.eks. *all-nodes multicast*).

![[Figure 4-2 - Sample Broadcast Transmission.png]]

### 3. Multicast (One-to-Many)
**Multicast** er en effektiv mellemvej mellem unicast og broadcast, hvor **én kilde sender én enkelt datastrøm, som kun leveres til en specifik gruppe af interesserede modtagere**, der har tilmeldt sig multicast-gruppen.
- I **IPv4** benyttes **Class D-adresser** (`224.0.0.0` til `239.255.255.255`) til multicast.
- Ideelt til f.eks. live videostreaming til 20 ud af 100 brugere på et netværk: serveren sender kun videostrømmen én gang, og kun de 20 tilmeldte klienter modtager og behandler pakkerne.

![[Figure 4-3 - Sample Multicast Transmission.png]]

### 4. Anycast (One-to-Nearest)
Med **Anycast** tildeles **den samme IP-adresse til flere forskellige servere** på forskellige fysiske lokationer. Når en klient sender en pakke til anycast-adressen, bruger routerne i netværket deres routing-metrics (f.eks. korteste rute / laveste antal hops eller laveste latency) til at sende pakken til **den nærmeste (eller bedste) server** (*one-to-nearest*).
- Anycast anvendes især i **IPv6** samt globalt i både IPv4 og IPv6 til **DNS Root Servers** og **Content Delivery Networks (CDNs)**.

![[Figure 4-4 - An IPv6 Anycast Example.png]]

### Sammenligning af trafiktyper

![[Table 4-3 - Traffic Types Summary.png]]

---

## 4. Eksamenstræning og Nøgleemner

Til CompTIA Network+ eksamenen er det afgørende at kunne koble hver protokol sammen med dens portnummer, transportprotokol (TCP vs. UDP) og sikkerhedsegenskaber (f.eks. Telnet vs. SSH, FTP vs. SFTP/TFTP, HTTP vs. HTTPS, LDAP vs. LDAPS, SMTP vs. SMTPS) samt at kunne skelne præcist mellem Unicast, Broadcast, Multicast og Anycast.

![[Table 4-4 - Key Topics for Chapter 4.png]]
