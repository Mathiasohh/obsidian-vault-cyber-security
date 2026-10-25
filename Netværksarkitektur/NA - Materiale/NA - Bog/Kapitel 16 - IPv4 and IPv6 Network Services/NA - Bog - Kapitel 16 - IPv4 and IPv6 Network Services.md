---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - Kapitel 16 - IPv4 and IPv6 Network Services
  - Kapitel 16 - Network Services
  - IPv4 and IPv6 Network Services
---

# CompTIA Network+ N10-009: Kapitel 16 – IPv4 and IPv6 Network Services

**Sider i bogen:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 16 - IPv4 and IPv6 Network Services.pdf]]  
**For termer og udtryk, se:** [[NA - Begrebsark]] Kap. 16

---

## Resumé

Kapitel 16 dækker **Objective 3.4 (Given a scenario, implement IPv4 and IPv6 network services)** i CompTIA Network+ N10-009-pensummet og gennemgår de tre mest fundamentale netværkstjenester i ethvert moderne netværk: **Dynamisk adressering (DHCP og SLAAC)**, **Navneopløsning (DNS og Hosts-filen)** og **Tidssynkronisering (NTP, PTP og NTS)**.

Kapitlet starter med **DHCP (Dynamic Host Configuration Protocol)** og den 4-trins **DORA-proces** (*Discover*, *Offer*, *Request*, *Acknowledge*), efterfulgt af de centrale DHCP-komponenter: **Scope**, **Lease Time**, **Scope Options** (default gateway, DNS-servere, TFTP m.m.), **Reservations** (MAC-baseret fast IP), **Exclusion Ranges** (udelukkelse af statiske server-IP'er) og **DHCP Relay / IP Helper** (videresendelse af DHCP-broadcasts på tværs af routere) samt IPv6's **SLAAC (Stateless Address Autoconfiguration)**. Herefter gennemgås **DNS (Domain Name System)**: den globale hierarkiske domænestruktur (FQDN, Top-Level Domains, Root/Authoritative/Non-authoritative/Internal/External DNS-servere), alle vigtige **DNS Record Types** (**A**, **AAAA**, **CNAME**, **MX**, **NS**, **PTR**, **SOA**, **SRV**, **TXT**), **DDNS**, **IPAM**, **EDNS**, **Zone Transfers**, **DNS TTL**, **Primary vs. Secondary Zones**, **Forward vs. Reverse Lookup Zones**, **Recursive vs. Iterative Lookups**, DNS-sikkerhedsprotokollerne (**DNSSEC**, **DoH – DNS over HTTPS** og **DoT – DNS over TLS**) samt den lokale **Hosts-fil**. Kapitlet afsluttes med tidsprotokollerne **NTP (Network Time Protocol – UDP port 123 og Stratum-niveauer)**, **PTP (Precision Time Protocol)** og **NTS (Network Time Security)**.

---

## 1. Dynamisk Adressering: DHCP og SLAAC

Manuel (statisk) konfiguration af IP-adresser på hundredvis af klienter er tidskrævende og fører let til tastefejl og IP-konflikter. Mens det ældre **BOOTP (Bootstrap Protocol)** krævede en statisk tabel over MAC-til-IP-mappings til diskløse arbejdsstationer, automatiserer **DHCP (Dynamic Host Configuration Protocol)** hele processen dynamisk.

### 1.1 DHCP's 4-trins proces: DORA
Når en DHCP-klient starter op på netværket uden en IP-adresse, gennemfører den en 4-trins udveksling med DHCP-serveren, som huskes med akronymet **DORA** (Figur 16-1):
1. **D – DHCPDISCOVER (Broadcast):** Klienten har endnu ingen IP-adresse og udsender derfor en Layer 2/Layer 3 **broadcast** (til `255.255.255.255`) for at finde en tilgængelig DHCP-server på netværket.
2. **O – DHCPOFFER (Unicast/Broadcast):** En eller flere DHCP-servere modtager *Discover*-beskeden og svarer med en **DHCPOFFER**, der indeholder et tilbud om en ledig IP-adresse og tilhørende konfiguration. Klienten vælger typisk det første tilbud, den modtager.
3. **R – DHCPREQUEST:** Klienten svarer den valgte DHCP-server med en **DHCPREQUEST**-besked for formelt at anmode om at leje den tilbudte IP-adresse.
4. **A – DHCPACK (Acknowledge):** DHCP-serveren bekræfter lejemålet med en **DHCPACK**-besked, der indeholder IP-adressen, subnetmasken, *lease time* og alle konfigurerede *Scope Options*.

![[Figure 16-1 - Obtaining IP Address Information from a DHCP Server.png]]

På en klient (f.eks. Microsoft Windows 11, Figur 16-2) aktiveres DHCP ved at vælge *"Obtain an IP address automatically"* og *"Obtain DNS server address automatically"* i egenskaberne for TCP/IPv4.

![[Figure 16-2 - Configuring Microsoft Windows 11 to Obtain IP Address Information via DHCP.png]]

### 1.2 Centrale DHCP-komponenter og Begreber
- **DHCP Scope:** Det sammenhængende interval (pulje) af IP-adresser og tilhørende konfigurationsparametre, som en DHCP-server administrerer og uddeler til klienter på et givent subnet.
- **Lease Time (Lejetid):** Den tidsperiode (f.eks. 24 timer eller 8 dage), hvori en klient har ret til at bruge den tildelte IP-adresse, før lejemålet skal fornyes.
- **Scope Options:** Ekstra netværksparametre, som DHCP-serveren sender med ud til klienterne sammen med IP-adressen og subnetmasken – herunder **Default Gateway**, **DNS-serveradresser**, domænenavn, NTP-server og evt. **TFTP-serveradresse** (vigtigt til VoIP-telefoner, der skal hente deres opstartskonfiguration).
- **DHCP Reservation:** En konfiguration på DHCP-serveren, der binder én bestemt IP-adresse fast til en enheds specifikke **MAC-adresse**. Sikrer, at f.eks. en netværksprinter eller server altid får præcis den samme IP-adresse via DHCP.
- **DHCP Exclusions (Exclusion Range):** Et interval af IP-adresser inden for scopet (f.eks. `192.168.1.1` – `192.168.1.10`), som DHCP-serveren **aldrig må udleje** til dynamiske klienter, fordi disse adresser er tildelt statisk til servere, routere eller switche. Forebygger *Duplicate IP Address*-konflikter.
- **DHCP Relay / IP Helper:** Da `DHCPDISCOVER` er en broadcast-besked, blokeres den som standard af routere. For at undgå at skulle placere en separat DHCP-server på hvert eneste subnet/VLAN, konfigurerer man klienternes lokal-router med en **DHCP Relay Agent (IP Helper Address)**. Routeren opfanger klientens DHCP-broadcast og videresender den som en **unicast-pakke** på tværs af netværket til en centraliseret DHCP-server.

### 1.3 IPv6 SLAAC (Stateless Address Autoconfiguration)
I **IPv6** kan enheder automatisk konfigurere deres egen IPv6-adresse helt **uden brug af en DHCP-server** ved hjælp af **SLAAC**:
1. Enheden genererer først sin egen **Link-Local-adresse** (`FE80::/10`) og bruger den til at opdage lokale routere på linket.
2. Routerne udsender **Router Advertisement (RA)**-beskeder (evt. efter en *Router Solicitation* fra klienten), som indeholder det lokale **64-bit IPv6-netværkspræfiks**.
3. Enheden kombinerer dette 64-bit netværkspræfiks med sit eget unikke 64-bit Interface ID (ofte udledt af MAC-adressen via EUI-64 eller tilfældigt genereret) og danner dermed sin egen globalt rutbare **Global Unicast Address (GUA)**. SLAAC understøtter desuden automatisk omnummerering (*address renumbering*), hvis netværkspræfikset ændres.

![[Table 16-1 - DHCP Components.png]]

---

## 2. Navneopløsning (Name Resolution): DNS og Hosts-filen

Mennesker foretrækker at huske sigende navne (som `www.ciscopress.com`), mens routere og computere kommunikerer via IP-adresser (som `159.182.74.49`). **Name Resolution** oversætter mellem navne og IP-adresser.

### 2.1 Domain Name System (DNS) og Hierarkiet
Når en bruger indtaster et **FQDN (Fully Qualified Domain Name)** – f.eks. `www.ciscopress.com` – i sin browser (eller som del af en **URL** som `https://www.ajsnetworking.com`, der også angiver protokollen), spørger computeren først en **DNS-server** om den tilhørende IP-adresse (Figur 16-3).

![[Figure 16-3 - DNS Server.png]]

DNS er opbygget som et globalt, omvendt træ-hierarki (Figur 16-4):
- Øverst ligger **Root-zonen (`.`)**, betjent af globale **Root DNS Servers**.
- Herunder ligger **Top-Level Domains (TLD)** – f.eks. generiske TLD'er som `.com`, `.org`, `.edu`, `.mil`, `.gov`, `.net` samt landekode-TLD'er som `.dk` eller `.in`.
- Herunder ligger *Second-Level Domains* (f.eks. `ciscopress` eller `cisco`) og *Subdomains / Hostnames* (f.eks. `www`).

![[Figure 16-4 - Hierarchical Domain Name Structure.png]]

#### Typer af DNS-servere:
- **Root DNS Servers:** Autoritative servere øverst i DNS-hierarkiet, der henviser til de rette Top-Level Domain (TLD)-servere.
- **Internal vs. External DNS Servers:** *Internal DNS* opløser navne på virksomhedens interne ressourcer og videresender eksterne forespørgsler; *External DNS* ligger på det offentlige internet.
- **Authoritative Name Server:** Den endelige, autoritative kilde til DNS-oplysninger for et bestemt domæne (indeholder de originale zonefiler og records for domænet).
- **Non-Authoritative (Caching) Name Server:** Besvarer DNS-forespørgsler ud fra **tidligere cachede svar** i stedet for selv at eje domænets autoritative zonefil. Reducerer svartid og netværkstrafik markant.

### 2.2 DNS Record Types (Ressource-records)
En DNS-zonefil indeholder forskellige typer af records afhængigt af formålet (Tabel 16-2):

![[Table 16-2 - Common DNS Record Types.png]]

| DNS Record | Navn | Funktion og eksamensfokus |
| :--- | :--- | :--- |
| **A** | **Address Record** | Mapper et **hostname til en 32-bit IPv4-adresse**. |
| **AAAA** | **Quad-A Record** | Mapper et **hostname til en 128-bit IPv6-adresse**. |
| **CNAME** | **Canonical Name** | Opretter et **alias** (kaldenavn) for et eksisterende domænenavn, så flere navne peger på samme kanoniske navn/IP. |
| **MX** | **Mail Exchange** | Angiver hvilken **e-mailserver (MTA)** der modtager e-mails for domænet. |
| **NS** | **Nameserver** | Udpeger de **autoritative navneservere** for en DNS-zone. |
| **PTR** | **Pointer Record** | Bruges til **Reverse DNS Lookup**: oversætter en kendt **IP-adresse tilbage til et domænenavn**. |
| **SOA** | **Start of Authority** | Indeholder autoritativ metadata om zonen (primær navneserver, administrator-kontakt, serienummer og refresh/retry-timere til zoneoverførsler). |
| **SRV** | **Service Location** | Angiver host og portnummer for specifikke netværkstjenester (f.eks. VoIP/SIP og Active Directory/LDAP). |
| **TXT** | **Text Record** | Indeholder fritekst og maskinlæsbare sikkerheds-/verifikationsdata, især til e-mailsikkerhed som **SPF (Sender Policy Framework)** og **DKIM (DomainKeys Identified Mail)**. |

### 2.3 DNS Zoner, Opslagstyper og Udvidelser
- **Primary Zone vs. Secondary Zone & Zone Transfers:**
  - **Primary Zone:** Den primære, **skrivbare (read-write)** database med original-records på den primære DNS-server. Alle ændringer foretages her.
  - **Secondary Zone:** En **skrivebeskyttet (read-only)** kopi af zonen på en sekundær DNS-server, der giver redundans og load balancing. Opdateres fra den primære server via **DNS Zone Transfers**.
- **Forward Lookup Zone vs. Reverse Lookup Zone:**
  - **Forward Lookup:** Oversætter **Navn $\rightarrow$ IP-adresse** (vha. A/AAAA records).
  - **Reverse Lookup:** Oversætter **IP-adresse $\rightarrow$ Navn** (vha. **PTR** records).
- **Recursive Lookup vs. Iterative Lookup:**
  - **Recursive Query:** Klienten kræver et **færdigt svar** (enten IP-adressen eller en fejl) fra sin lokale DNS-server og vil *ikke* spises af med en henvisning til en anden server.
  - **Iterative Query:** DNS-serveren svarer enten med selve svaret (hvis den har det) eller med en **henvisning (referral)** til den næste DNS-server i hierarkiet, som kan spørges.
- **DNS TTL (Time to Live):** Angiver hvor mange sekunder en DNS-server eller klient må **cache** et DNS-svar lokalt, før det udløber. *(Må ikke forveksles med IP-headerens TTL-hop-tæller!).* Det er pga. DNS TTL-caching, at globale DNS-ændringer kan tage timer eller dage om at slå fuldt igennem.
- **DDNS (Dynamic DNS):** Opdaterer automatisk DNS-records, når en enhed (f.eks. en hjemmerouter med dynamisk offentlig IP fra ISP'en) skifter IP-adresse.
- **IPAM (IP Address Management):** Administrationsværktøj til planlægning, sporing og integration af **DNS og DHCP** i netværket.
- **EDNS (Extension Mechanisms for DNS):** Udvider det oprindelige DNS-format til at håndtere større pakker og nye sikkerhedsfunktioner med bagudkompatibilitet.

### 2.4 DNS-sikkerhed: DNSSEC, DoH og DoT
Traditionel DNS sendes i klartekst (typisk over UDP port 53) uden autentificering, hvilket gør den sårbar over for aflytning og *DNS spoofing / cache poisoning*. Tre teknologier løser dette:
1. **DNSSEC (Domain Name Security Extensions):** Beskytter mod **forfalskede DNS-svar (DNS spoofing)** ved at tilføje **digitale kryptografiske signaturer** til DNS-records. Sikrer *dataintegritet og autenticitet* (at svaret faktisk kommer fra den rette autoritative server og ikke er manipuleret), men krypterer *ikke* selve forespørgslen.
2. **DoH (DNS over HTTPS):** **Krypterer DNS-forespørgsler og -svar** ved at sende dem indkapslet i **HTTPS (TCP port 443)**. Forhindrer ISP'er og angribere i at aflytte, hvilke websites brugeren besøger.
3. **DoT (DNS over TLS):** **Krypterer DNS-forespørgsler og -svar** direkte med **TLS** på en dedikeret port (**TCP port 853**) med samme privatlivs- og krypteringsformål som DoH.

### 2.5 Hosts File (Lokal navneopløsning)
En **hosts-fil** er en simpel lokal tekstfil på operativsystemet, der mapper IP-adresser til hostnames (f.eks. `127.0.0.1 localhost`) og tjekkes *før* computeren spørger en DNS-server:
- **Placering på Windows:** `C:\Windows\System32\drivers\etc\hosts`
- **Placering på Linux / macOS:** `/etc/hosts`
- Bruges ofte af udviklere og administratorer til at teste nye websites eller servere lokalt uden at ændre i offentlig DNS.

---

## 3. Time Protocols: NTP, PTP og NTS

Nøjagtig og ensartet tid på tværs af alle switche, routere, firewalls og servere er kritisk af to grunde:
1. **Korrelation af Syslog og sikkerhedshændelser:** Ved efterforskning af et sikkerhedsbrud eller et netværksnedbrud er det umuligt at sammenkæde logfiler fra forskellige enheder, hvis deres ure går forskelligt.
2. **Kryptografi, certifikater og autentificering:** Protokoller som Kerberos, TLS-certifikater og 2FA/TOTP fejler, hvis urene mellem klient og server afviger ud over en stram tærskel.

### 3.1 NTP (Network Time Protocol)
**NTP** synkroniserer ure over netværket via **UDP port 123** og består af tre nøglebegreber:
- **NTP Client:** Netværksenheden (switch, router, PC), der henter tiden.
- **NTP Server:** Tidsserveren, der leverer den præcise tid.
- **Stratum:** Et tal (`1–15`), der ligesom et *hop count* måler, **hvor mange led (hops) en NTP-server eller klient er væk fra den autoritative atomur-/GPS-tidskilde (Stratum 0)**. En Stratum 1-server er direkte forbundet til atomuret; en Stratum 2-server henter tid fra en Stratum 1-server osv. Jo lavere Stratum-tal, desto mere nøjagtig er tidskilden.

### 3.2 PTP (Precision Time Protocol)
**PTP (IEEE 1588)** leverer ekstremt præcis tidssynkronisering (ned på sub-mikrosekund/nanosekund-niveau) ved aktivt at måle og kompensere for netværksforsinkelsen mellem et **Primary Clock (Grandmaster)** og **Member Clocks**. Bruges i finansiel højfrekvenshandel, telekommunikation og industriel automatisering.

### 3.3 NTS (Network Time Security)
Standard NTP mangler kryptering og stærk autentificering, hvilket gør det muligt for en angriber at manipulere enheders tid (*time spoofing*). **NTS (Network Time Security)** sikrer NTP ved at etablere en **TLS-forbindelse** til udveksling af kryptografiske nøgler, som derefter bruges til at verificere ægtheden og integriteten af alle efterfølgende NTP-tidsopdateringer.

---

## 4. Nøgleemner til Eksamen (Key Topics)

![[Table 16-3 - Key Topics for Chapter 16.png]]

### Hurtige eksamenstips (Exam Cram)
- **DHCP DORA:** 1) **DHCPDISCOVER** (første besked sendt af klienten som broadcast) $\rightarrow$ 2) **DHCPOFFER** $\rightarrow$ 3) **DHCPREQUEST** $\rightarrow$ 4) **DHCPACK**.
- **DHCP Scope Options:** Her konfigureres bl.a. *lease duration*, default gateway, DNS-server og TFTP-server.
- **SLAAC:** IPv6-funktion, hvor klienter autokonfigurerer deres egen IPv6-adresse ud fra Router Advertisements uden en DHCP-server.
- **DNS Records:** **A** = IPv4 | **AAAA** = IPv6 | **PTR** = Reverse lookup (IP $\rightarrow$ navn) | **MX** = Mailserver | **CNAME** = Alias | **TXT** = SPF/DKIM.
- **DNSSEC vs. DoH vs. DoT:** **DNSSEC** = digital signering (autenticitet). **DoH** = kryptering over HTTPS. **DoT** = kryptering over TLS.
- **NTP:** Bruger **UDP port 123** og måler afstand til tidskilden i **Stratum**.
