---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - "Kapitel 18 - Network Security Concepts"
  - "NA - Bog - Kapitel 18"
---

# Kapitel 18: Network Security Concepts

> **Bog-PDF:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 18 - Network Security Concepts.pdf]]
> **Relateret begrebsark:** [[NA - Begrebsark]] Kap. 18

---

## Resumé

Kapitel 18 dækker **Objective 4.1 (Explain the importance of basic network security concepts)** i CompTIA Network+ (N10-009)-pensummet. Kapitlet gennemgår fundamentet for moderne cybersikkerhed og *Defense in Depth*:
1. **CIA-triaden og Kryptografi:** **Confidentiality** (Symmetrisk kryptering med **DES, 3DES, AES** vs. Asymmetrisk kryptering med **RSA, PKI, CA og Self-Signed Certificates** for *Data in transit* og *Data at rest*), **Integrity** (**MD5, SHA-1, SHA-2** og **HMAC**) og **Availability** (fem ni-taller `99.999 %` og beskyttelse mod DoS).
2. **Sikkerhedsterminologi, Autorisation & Deception:** Forskellen på **Threat**, **Vulnerability** (**CVE**, **CVSS**, **OWASP Top 10**, **Zero-Day**), **Risk** og **Exploit**, principperne om **Least Privilege**, **Role-Based Access Control (RBAC)** og **Separation of Duties**, **Screened Subnet (DMZ)** samt deception-teknologier (**Honeypot** og **Honeynet**).
3. **Netværkssegmentering & IAM (Identity and Access Management):** Segmentering af **IoT**, **IIoT**, **SCADA / ICS / OT**, **Guest Networks** og **BYOD / CYOD / MDM**, samt autentificeringsmetoder (**MFA**, **SSO**, **RADIUS**, **TACACS+**, **LDAP/LDAPS**, **Kerberos**, **SAML**, **Time-based Authentication / TOTP** og **Local Authentication**).
4. **Risk Management, SIEM, Fysisk Sikkerhed & Compliance:** Risikovurderinger (*Threat, Vulnerability, Penetration Testing, Posture, Business/Process/Vendor Assessment*), **SIEM (SIM + SEM)**, fysiske detektions- og præventionsmetoder (**Cameras**, **Motion/Tamper Detection**, **RFID**, **Locks**, **Smart Lockers**, **Access Control Vestibule / Mantrap**, **Badges/Biometrics/Smart Cards/Key Fobs**, **Geofencing**) samt **Audits & Compliance** (**Data Locality**, **PCI DSS** og **GDPR**).

---

## 1. CIA-triaden og Logisk Sikkerhed (Encryption, PKI & Hashing)

### Confidentiality, Integrity, and Availability (CIA Triad)
Enhver sikkerhedsløsning har til formål at beskytte et eller flere af de tre hovedmål i **CIA-triaden**:

#### 1. Confidentiality (Fortrolighed)
Sikrer, at følsomme data kun kan tilgås af autoriserede parter — både gennem adgangskontrol (firewalls, ACLs, login) og ved at **kryptere** data i hvile (**Data at rest** på diske/databaser) og under transport (**Data in transit** over netværket). Kryptering opdeles i to hovedtyper:

- **Symmetrisk Kryptering (Symmetric Encryption):**
  - Både afsender og modtager bruger **præcis den samme delte nøgle (*shared / session key*)** til både at kryptere og dekryptere data.
  - Meget **hurtig** og lavt CPU-overhead; bruges derfor til *bulk*-kryptering af store datamængder (f.eks. i VPN-tunneler, Wi-Fi og disk-kryptering).
  - *Algoritmer:* **DES** (`56-bit`, forældet/usikker), **3DES** (`168-bit`, langsommere og udfaset) og **AES (*Advanced Encryption Standard*)** (`128-bit`, `192-bit` eller `256-bit` — moderne industristandard). *(Til e-mail bruges ofte **PGP / GPG**, som kombinerer symmetrisk og asymmetrisk kryptering).*

![[Figure 18-1 - Symmetric Encryption Example.png]]

- **Asymmetrisk Kryptering (Asymmetric Encryption) & PKI:**
  - Bruger et matematisk forbundet **nøglepar**: en **Public Key (offentlig nøgle)**, som deles frit med alle, og en **Private Key (privat nøgle)**, som holdes strengt hemmelig af ejeren. Data krypteret med en offentlig nøgle kan **kun** dekrypteres med den tilhørende private nøgle.
  - Langsommere end symmetrisk kryptering, men mere sikker til **initial autentificering og sikker udveksling af en symmetrisk sessionsnøgle** (f.eks. med **RSA**-algoritmen i TLS/HTTPS).
  - **PKI (*Public Key Infrastructure*):** Bruger **digitale certifikater** udstedt og signeret af en betroet tredjepart kaldet en **Certificate Authority (CA)** til at garantere, at en servers offentlige nøgle er ægte:
    1. `Client A` anmoder om `Server 1`'s digitale certifikat.
    2. `Server 1` sender sit certifikat, som `Client A` validerer via CA'ens digitale signatur.
    3. `Client A` udtrækker `Server 1`'s **offentlige nøgle** fra certifikatet.
    4. `Client A` genererer en tilfældig symmetrisk **sessionsnøgle**.
    5. Sessionsnøglen krypteres med `Server 1`'s offentlige nøgle og sendes til serveren.
    6. `Server 1` dekrypterer sessionsnøglen med sin **private nøgle** — hvorefter begge parter bruger den hurtige symmetriske sessionsnøgle til resten af samtalen.
  - **Self-Signed Certificates:** Digitale certifikater signeret af organisationen selv uden en ekstern kommerciel CA. Gratis og udbredt til **interne virksomhedssystemer**, men giver advarsler i offentlige webbrowsere.

![[Figure 18-2 - Asymmetric Encryption Example.png]]

#### 2. Integrity (Integritet)
Sikrer, at data **ikke er blevet ændret eller manipuleret** uautoriseret under transport eller opbevaring:
- **Hashing:** Kører data gennem en envejs matematisk algoritme, der producerer et fastlængde fingeraftryk kaldet en **hash** eller **hash digest** (f.eks. **MD5** på `128-bit`, **SHA-1** på `160-bit` eller **SHA-2** på `224/256/384/512-bit`).
- **HMAC (*Hashed Message Authentication Code*):** Ren hashing alene forhindrer ikke en *on-path*-angriber i både at ændre data og genberegne en ny hash. **HMAC** løser dette ved at kombinere dataene med en **delt hemmelig nøgle (*secret key*)**, før hashen beregnes — hvilket sikrer både dataintegritet og kildeautentificering.

#### 3. Availability (Tilgængelighed)
Sikrer, at netværket, systemerne og dataene er tilgængelige for autoriserede brugere, når der er brug for dem (f.eks. *Five Nines* = `99,999 %` oppetid, svarende til maks. ~5 minutters nedetid om året). Angreb mod tilgængeligheden omfatter bl.a. **DoS / DDoS-angreb** og pakker, der får systemer til at crashe.

---

## 2. Sikkerhedsterminologi, Autorisation & Deception

### Threat, Vulnerability, Risk og Exploit
- **Threat (Trussel):** En potentiel begivenhed eller aktør (ekstern hacker, insider, naturkatastrofe), der *kan* forårsage skade på netværket.
- **Vulnerability (Sårbarhed):** En konkret **svaghed eller fejl** i softwarekode, konfiguration eller design, som kan udnyttes af en trussel.
  - **CVE (*Common Vulnerabilities and Exposures*):** Offentligt katalog med unikke ID-numre og beskrivelser af kendte sårbarheder.
  - **CVSS (*Common Vulnerability Scoring System*):** Vurderer alvorligheden af en sårbarhed på en skala fra **`0` til `10`** (hvor `10` er mest kritisk).
  - **OWASP Top 10:** Årlig oversigt over de 10 mest kritiske sikkerhedsrisici i webapplikationer.
  - **Zero-Day Attack:** Et angreb, der udnytter en hidtil **ukendt sårbarhed**, før producenten har opdaget den eller frigivet en patch (imødegås bl.a. med adfærds- og *Machine Learning*-baseret anomalidetektion).
- **Risk (Risiko):** Sandsynligheden for og konsekvensen af, at en trussel udnytter en sårbarhed og kompromitterer CIA.
- **Exploit (Udnyttelse):** Den faktiske kode, metode eller handling, hvormed en angriber aktivt udnytter en sårbarhed.

### Autorisation: Least Privilege, RBAC & Separation of Duties
- **Least Privilege (Mindste privilegiums princip):** Enhver brugerkonto, proces og administrator skal **kun tildeles det absolutte minimum af rettigheder**, der er nødvendigt for at udføre deres arbejdsopgave (f.eks. må en administrator ikke bruge en global `root`-/AWS root-konto til daglige rutineopgaver).
- **RBAC (*Role-Based Access Control*):** Rettigheder tildeles til **roller / grupper** baseret på jobfunktion (f.eks. *Helpdesk*, *Netværksingeniør*, *Gæst*) frem for individuelt til enkelte brugere; brugerne arver rettighederne gennem deres gruppemedlemskab.
- **Separation of Duties (Funktionsadskillelse):** Kritiske opgaver og privilegier fordeles mellem flere personer (og evt. med jobrotation), så én enkelt person ikke har ubegrænset magt til både at gennemføre og skjule svindel eller fejl.

### Defense in Depth, Screened Subnet og Honeypot / Honeynet
- **Defense in Depth (Dybdeforsvar):** Flere uafhængige sikkerhedslag (fysisk sikkerhed, firewall, IDS/IPS, NAC, segmentering, kryptering, endpoint-beskyttelse), så hvis ét lag brydes, standser det næste lag angriberen.
- **Screened Subnet (tidligere kaldet DMZ – *Demilitarized Zone*):** En isoleret perimeter-zone mellem det offentlige internet og virksomhedens interne LAN, hvor offentligt tilgængelige servere (webservere, mailservere) placeres, så eksterne brugere kan tilgå dem uden at få direkte adgang til det interne netværk.
- **Deception Technologies – Honeypot & Honeynet:**
  - En **Honeypot** er et lokkesystem (*decoy*), der er sat op til at ligne et attraktivt, sårbart mål for at tiltrække angribere, holde dem væk fra de rigtige produktionssystemer og overvåge/logge deres angrebsteknikker.
  - Flere honeypots samlet i et netværkssegment kaldes et **Honeynet**.

---

## 3. Netværkssegmentering & Identity and Access Management (IAM)

### Network Segmentation Enforcement
Ved at opdele netværket logisk med **VLANs**, **ACLs** og på Layer 3 med **VRF (*Virtual Routing and Forwarding*)**-tabeller begrænses broadcast-domæner og *lateral movement* ved et sikkerhedsbrud. Følgende funktionsområder skal **altid segmenteres** i egne isolerede netværkszoner:
- **IoT (*Internet of Things*) & IIoT (*Industrial IoT*):** Smarte forbruger- og industrienheder (termostater, kameraer, sensorer, produktionsmaskiner), som ofte har svag indbygget sikkerhed og sjældent patches.
- **SCADA (*Supervisory Control and Data Acquisition*), ICS (*Industrial Control Systems*) & OT (*Operational Technology*):** Systemer, der styrer og overvåger fysiske, kritiske industriprocesser (kraftværker, vandværker, fabrikker), hvor et angreb kan få alvorlige fysiske konsekvenser.
- **Guest Networks:** Isolerer gæsters internettrafik fra interne virksomhedsressourcer.
- **BYOD (*Bring Your Own Device*) vs. CYOD (*Choose Your Own Device*):**
  - **BYOD** lader medarbejdere bruge deres egne private enheder på arbejdet.
  - **CYOD** lader medarbejderen vælge fra et katalog af virksomhedsgodkendte og prækonfigurerede enheder, som styres stramt med **MDM (*Mobile Device Management*)**-software.

### IAM & Autentificeringsmetoder (Authentication Methods)
- **Multifactor Authentication (MFA):** Kræver kombination af to eller flere faktorer fra forskellige kategorier:
  1. **Something you know** (Noget du ved: adgangskode, PIN-kode)
  2. **Something you have** (Noget du har: smart card, betalingskort, hardware token, smartphone med OTP-app)
  3. **Something you are** (Noget du er: biometri som fingeraftryk, ansigtsgenkendelse, retinaskanning)
  4. **Something you do** (Noget du gør: swipe-mønster, tastaturrytme)
  5. **Somewhere you are** (Hvor du befinder dig: geolokation, IP-adresse)
- **Time-based Authentication (TOTP / OTP):** Bruger en midlertidig, tidsfølsom engangskode (f.eks. fra en Authenticator-app), der automatisk skifter hvert **30. til 60. sekund**.
- **Single Sign-On (SSO):** Brugeren logger ind én gang og får adgang til flere systemer uden at skulle indtaste adgangskode igen:
  - **Kerberos:** Billetbaseret (*ticket-based*) SSO-protokol (brugt i bl.a. Microsoft Active Directory), hvor et betroet **Key Distribution Center (KDC)** udsteder tidsstemplede *Ticket-Granting Tickets (TGT)* og *Service Tickets* (standardlevetid 8 timer) til gensidig autentificering (*mutual authentication*) mellem klient og server.
  - **SAML (*Security Assertion Markup Language*):** XML-baseret åben standard til *Federated Identity* og **webbaseret SSO** på tværs af forskellige domæner og cloud-applikationer, hvor en *Identity Provider (IdP)* udsteder sikkerheds-*assertions* til en *Service Provider (SP)*.
- **RADIUS vs. TACACS+ vs. LDAP / LDAPS:**
  - **RADIUS:** UDP-baseret AAA-protokol (`1812/1813` eller `1645/1646`); krypterer kun adgangskoden; kombinerer AuthN og AuthZ; udbredt til 802.1X og VPN-adgang.
  - **TACACS+:** Cisco-udviklet TCP-baseret AAA-protokol (`port 49`); krypterer **hele pakken** og adskiller Authentication, Authorization og Accounting; ideel til router/switch CLI-administration.
  - **LDAP (`TCP 389`) & LDAPS (`TCP 636`):** Protokol til opslag i katalogtjenester som Active Directory (`LDAPS` krypterer trafikken med SSL/TLS).

---

## 4. Risk Management, SIEM, Fysisk Sikkerhed og Compliance

### Sikkerheds- og Risikovurderinger (Security Risk Assessments)
- **Threat Assessment:** Vurderer sandsynligheden for og alvoren af potentielle trusler.
- **Vulnerability Assessment:** Scanner, identificerer og prioriterer sårbarheder i systemerne (uden nødvendigvis at udnytte dem).
- **Penetration Testing (Pentest):** Autoriseret, simuleret cyberangreb, der aktivt forsøger at udnytte sårbarheder for at teste forsvarets reelle styrke.
- **Posture Assessment:** Undersøger sikkerhedstilstanden på netværkets noder og fastlægger regler til håndhævelse via AAA/NAC.
- **Business, Process & Vendor Risk Assessment:** Gennemgår forretningsprocesser samt tredjepartsleverandørers (*vendors*) adgang til virksomhedens data og deres sikkerhedspraksis.

### SIEM (Security Information and Event Management)
Et **SIEM**-system kombinerer **SIM (*Security Information Management* — langsigtet logopbevaring, analyse og compliance-rapportering)** og **SEM (*Security Event Management* — realtidsovervågning, hændelseskorrelation og alarmering)**. Kan drives internt, som en **MSSP (*Managed Security Service Provider*)** eller som **SECaaS (*Security as a Service*)**.

### Fysisk Sikkerhed (Physical Security: Detection vs. Prevention)
Hvis en angriber får fysisk adgang til et serverrum, er al logisk sikkerhed i fare:
- **Fysiske Detektionsmetoder (Detection):**
  - **Motion Detection:** Bevægelsessensorer i kritiske rum.
  - **Cameras (Videoovervågning / CCTV / IP-kameraer):** Optager og overvåger indgange og serverrum.
  - **Asset Tracking Tags (RFID):** Sporer fysisk placering af udstyr og personale via radiofrekvens-tags.
  - **Tamper Detection:** Synlige kabelrør (*conduits*), glasinddækninger og sensorer på kabinetter, der alarmerer ved fysisk indgreb.
- **Fysiske Præventionsmetoder (Prevention):**
  - **Employee Security & Safety Training:** Den vigtigste forsvarslinje mod *social engineering* (adgangskodehygiejne, aldrig oplyse koder, ikke åbne ukendte vedhæftninger) samt kendskab til nødprocedurer (flugtveje, *fail-open* vs. *fail-closed* døre, HVAC/nødstop, ESD-beskyttelse og **MSDS / *Material Safety Data Sheet***).
  - **Access Control Hardware:** **Badge Readers** (adgangskort), **Biometrics** (fingeraftryk, ansigts-/retinaskanning), **Smart Cards** og **Key Fobs**.
  - **Locks & Smart Lockers:** Fysiske låse på døre og **Locking Racks/Cabinets**, samt netværksforbundne **Smart Lockers**, der logger præcist, hvem der har taget eller afleveret udstyr.
  - **Access Control Vestibule (tidligere kaldet Mantrap / Sluse):** En lille indgangssluse med **to sammenkoblede døre (*interlocking doors*)**, hvor dør nr. 1 skal være lukket og låst, før dør nr. 2 kan åbnes — forhindrer effektivt **tailgating** og **piggybacking**.
  - **Geofencing:** Virtuel geografisk grænse (GPS/RFID/Wi-Fi), der udløser alarmer eller blokerer adgang, hvis udstyr forlader det tilladte område.

### Audits og Regulatory Compliance
- **Data Locality (Datasuveærenitet / Geografisk placering):** Forskellige lande har strenge lovkrav om, inden for hvilke landegrænser borgeres og virksomheders data fysisk må lagres og behandles (særligt vigtigt ved brug af globale public clouds).
- **PCI DSS (*Payment Card Industry Data Security Standard*):** Sikkerhedsstandard, der er obligatorisk for alle virksomheder, som modtager, behandler, lagrer eller transmitterer **betalings- og kreditkortoplysninger**.
- **GDPR (*General Data Protection Regulation*):** EU's databeskyttelsesforordning, der beskytter EU-borgeres persondata og privatliv og gælder for **enhver virksomhed i verden**, som behandler data om personer i EU.

---

## 5. Real-World Case Study & Nøgleemner

I kapitlets case-studie styrker *Acme, Inc.* sin sikkerhedsprofil gennem målrettet træning af IT-teamet i **CIA-triaden, Least Privilege og RBAC**, kombineret med udrulning af et centralt **SIEM**-system til realtidskorrelation af sikkerhedshændelser og compliance-rapportering.

![[Table 18-1 - Key Topics for Chapter 18.png]]
