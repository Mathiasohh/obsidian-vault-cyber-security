---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - "Kapitel 3 - Cloud Concepts"
  - "NA - Bog - Kapitel 3"
---

# Kapitel 3: Cloud Concepts

> **Bog-PDF:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 3 - Cloud Concepts.pdf]]
> **Relateret begrebsark:** [[NA - Begrebsark]] Kap. 3

---

## Resumé

Kapitel 3 dækker **Objective 1.3 (Summarize cloud concepts and connectivity options)** i CompTIA Network+ (N10-009)-pensummet. Kapitlet gennemgår, hvordan virtualisering af netværksfunktioner (**NFV**) gør det muligt at flytte traditionelle hardwarebaserede netværkskomponenter over på standardiseret COTS-serverhardware, samt hvordan moderne cloud-netværk opbygges med **Virtual Private Cloud (VPC)**, **Network Security Groups (SGs)**, **Network Security Lists / NACLs** og **Cloud Gateways** (herunder **Internet Gateway** og **NAT Gateway**). Derudover sammenlignes de centrale udrulningsmodeller (**Public**, **Private**, **Hybrid** og **Community Cloud**), servicemodeller (**IaaS**, **PaaS**, **SaaS**, **DaaS** og **XaaS**) samt vigtige cloud-egenskaber og forbindelsesmuligheder som **VPN**, **Direct Connect**, **Multitenancy**, **Elasticity** og **Scalability**.

---

## 1. Network Functions Virtualization (NFV)

Virtualisering startede med servere, men har i dag bredt sig til alle dele af IT-infrastrukturen. **Network Functions Virtualization (NFV)** adskiller komplekse netværksfunktioner fra proprietær, dedikeret hardware og implementerer dem i stedet som softwareapplikationer (virtuelle appliances), der kan køre på almindelige **COTS-servere** (*Commercial Off-The-Shelf*).

Typiske netværksfunktioner, der virtualiseres med NFV, omfatter:
- **Routing**
- **Switching**
- **Firewalling**
- **Load balancing**
- **Content Delivery Networking (CDN)**
- **Network monitoring**

### Fordele ved NFV
- **Mere kapacitet med færre ressourcer (*Doing more with less*):** Højere workload-kapacitet med lavere strømforbrug, mindre fysisk pladsbehov i datacentret (*footprint*) og reduceret behov for køling.
- **Mindre leverandørbinding (*Reduced vendor lock-in*):** Da NFV kan afvikles på standard COTS-servere, undgår organisationer at være låst til én enkelt hardwareleverandørs proprietære udstyr.
- **Øget fleksibilitet og agilitet (*Increased flexibility*):** Netværksinfrastrukturen kan ændres, skaleres og udrulles langt hurtigere end i traditionelle, fysiske miljøer.

---

## 2. Cloud Networking Components

Når en organisation opbygger IT-løsninger i skyen (f.eks. i Amazon Web Services (AWS), Microsoft Azure eller Google Cloud Platform (GCP)), anvendes en række virtuelle netværks- og sikkerhedskomponenter. Selvom navngivningen varierer lidt mellem udbydere (f.eks. hedder en VPC i Microsoft Azure et *Virtual Network* / VNet), er arkitekturen og principperne de samme.

### Virtual Private Cloud (VPC)
En **Virtual Private Cloud (VPC)** giver kunden mulighed for at provisionere en logisk isoleret del af den offentlige cloud, hvor virtuelle ressourcer (såsom virtuelle maskiner og databaser) kan udrulles i et kundedefineret virtuelt netværk. Kunden har fuld kontrol over det virtuelle netværksmiljø, herunder:
- Valg af eget IP-adresseområde (CIDR-blok)
- Oprettelse af offentlige og private subnets
- Konfiguration af routingtabeller og netværksgateways

![[Figure 3-1 - Some Components of an AWS VPC.png]]

### Network Security Groups (SGs)
**Network Security Groups** (i AWS blot kaldet *Security Groups* eller **SGs**) fungerer som indbyggede, **stateful** virtuelle firewalls for individuelle virtuelle maskiner (compute-instanser):
- En Security Group tilknyttes direkte til det virtuelle netværkskort (**vNIC**) på en virtuel maskine.
- Den styrer præcist, hvilken trafik der tillades ind og ud af den pågældende VM-instans (f.eks. tilladelse af HTTP/HTTPS fra kunder til en webserver-tier samt SSH/RDP fra administratorernes supportnetværk).
- Da Security Groups er *stateful*, tillades returtrafik for en allerede etableret session automatisk.

![[Figure 3-2 - A Security Group Assigned to a vNIC.png]]

### Network Security Lists (NACLs)
For at give et ekstra sikkerhedslag (Defense-in-Depth) anvender cloud-udbydere også **Network Security Lists**, som i AWS kaldes **Network Access Control Lists (NACLs)**:
- Hvor en Security Group er knyttet til en enkelt VM's **vNIC**, er en **NACL** knyttet til et helt **subnet** i en VPC og kontrollerer al trafik, der går ind og ud af subnettet.
- NACLs er **stateless** (tilstandsløse), hvilket betyder, at både indgående (*inbound*) og udgående (*outbound*) tilladelses- og afvisningsregler skal konfigureres eksplicit, og reglerne evalueres i nummerorden.

![[Figure 3-3 - A NACL in AWS.png]]

| Egenskab | Network Security Group (SG) | Network Security List (NACL) |
| :--- | :--- | :--- |
| **Tilknytningsniveau** | Virtuelt netværkskort (**vNIC** / instansniveau) | **Subnet**-niveau i VPC'en |
| **Tilstandshåndtering** | **Stateful** (returtrafik tillades automatisk) | **Stateless** (både ind- og udgående regler kræves) |
| **Regeltype** | Kun *Allow*-regler (alt andet er implicit *Deny*) | Både eksplicitte *Allow*- og *Deny*-regler |

### Cloud Gateways
En **cloud gateway** fungerer som bro eller mellemled mellem interne ressourcer i skyen og eksterne netværk (såsom det offentlige internet eller et on-premises datacenter):
- **Internet Gateway (IGW):** En horisontalt skaleret, redundant og højt tilgængelig virtuel komponent, der forbinder en VPC med det offentlige internet. Den muliggør tovejskommunikation (*bidirectional*) for ressourcer med offentlige IP-adresser.
- **Network Address Translation (NAT) Gateway:** Giver mere finkornet kontrol over adresseoversættelse. En NAT Gateway placeres typisk i et offentligt subnet og gør det muligt for virtuelle maskiner i **private subnets** (uden offentlige IP-adresser) at initiere udgående trafik til internettet (f.eks. for at hente softwareopdateringer), mens eksterne værter på internettet forhindres i at initiere indgående forbindelser direkte til de private instanser.

---

## 3. Deployment Models (Udrulningsmodeller)

Cloud-infrastruktur kan udrulles efter fire primære modeller afhængigt af organisationens behov for kontrol, økonomi, skalerbarhed og regulatoriske krav:

- **Private Cloud:** Cloud-infrastrukturen er provisioneret til eksklusiv brug for **én enkelt organisation** (som godt kan bestå af flere forretningsenheder). Den kan ejes, administreres og drives af organisationen selv, en tredjepart eller i kombination, og den kan være placeret fysisk on-premises eller hos en ekstern udbyder. Ideel til virksomheder med strenge lovgivnings- eller sikkerhedskrav (f.eks. finanssektoren eller sundhedsvæsenet), der kræver fuld kontrol over forretningskritiske data.
- **Public Cloud:** Cloud-infrastrukturen er tilgængelig for offentligheden og ejes og drives af en stor cloud-udbyder (f.eks. AWS, Microsoft Azure eller Google Cloud Platform) på udbyderens egne globale datacentre. Den er det bedste valg, når en organisation ønsker lavere infrastruktur-, vedligeholdelses- og administrationsomkostninger, hurtig implementering, høj hardwareeffektivitet, kortvarig brug efter behov (*short-term usage*) eller mangler egne specialister til at drive et komplekst datacenter.
- **Hybrid Cloud:** En sammensætning af to eller flere forskellige cloud-infrastrukturer (f.eks. en privat cloud on-premises kombineret med en offentlig cloud), der forbliver selvstændige enheder, men er bundet sammen af standardiseret eller proprietær teknologi, som muliggør portabilitet af data og applikationer. Ideel under gradvis cloud-migrering eller til virksomheder med skiftende kapacitetsbehov og forskellige vertikale markeder.
- **Community Cloud:** En cloud-infrastruktur, der deles mellem flere organisationer eller enheder med **fælles interesser, sikkerhedskrav eller compliance-mål** (f.eks. `cloud.gov`, hvor flere udbydere leverer cloud-tjenester specifikt til amerikanske statslige myndigheder).

---

## 4. Service Models ("As a Service"-modeller)

Cloud-tjenester leveres typisk efter en forbrugsafregnet model (*pay-as-you-go*, ligesom el eller vand) og inddeles i følgende hovedkategorier:

- **Infrastructure as a Service (IaaS):** Kunden lejer grundlæggende virtualiserede infrastrukturressourcer (virtuelle servere, storage og netværk) hos en cloud-udbyder og installerer selv operativsystemer og applikationer. Eksempler: *AWS EC2*, *Microsoft Azure VMs*, *Google Compute Engine*.
- **Platform as a Service (PaaS):** Leverer en færdig udviklings- og afviklingsplatform, så softwareudviklere kan fokusere 100 % på at skrive, teste og udrulle kode uden at skulle administrere de underliggende virtuelle servere, operativsystemer eller runtime-miljøer. Eksempler: *AWS Elastic Beanstalk*, *Google App Engine*.
- **Software as a Service (SaaS):** Færdige applikationer leveret over internettet (typisk via en webbrowser), hvor al underliggende serverinfrastruktur, opdatering og vedligeholdelse er skjult for slutbrugeren. Eksempler: *Gmail*, *Microsoft 365*, *Google Docs*, *Salesforce*.
- **Desktop as a Service (DaaS) & Everything as a Service (XaaS):**
  - **DaaS:** Cloud-hostede virtuelle skriveborde (VDI), der gøres tilgængelige for klienter over netværket.
  - **XaaS:** Samlebetegnelse for det enorme udvalg af specialiserede tjenester, der i dag leveres som cloud-services.

---

## 5. Key Cloud Concepts & Connectivity Options

Foruden arkitektur og servicemodeller fremhæver CompTIA Network+ fire nøglekoncepter for cloud-netværk:

### Cloud Connectivity Options (VPN vs. Direct Connect)
Når en virksomhed forbinder sit on-premises netværk med skyen, skal data in-transit sikres:
1. **VPN (Virtual Private Network over internettet):** Krypteret tunnel (typisk IPsec) over det offentlige internet ind til cloud-udbyderens VPC. Hurtig og billig at oprette, men deler båndbredde med øvrig internettrafik og kan opleve varierende latency.
2. **Direct Connect / Dedikerede privatforbindelser (f.eks. AWS Direct Connect, Azure ExpressRoute):** En dedikeret, privat lejet linje (*leased line*) direkte ind i cloud-udbyderens infrastruktur. Trafikken kommer **aldrig** ud på det offentlige internet og blandes ikke med andre kunders trafik. Dette giver både maksimal sikkerhed og forudsigelig, lav latency med høj gennemstrømning.

### Multitenancy
**Multitenancy** (flerbruger-arkitektur) beskriver det forhold, at flere forskellige kunder (*tenants*) i en offentlig cloud deler de samme underliggende fysiske servere, lagringssystemer og netværkshardware via en hypervisor. Selvom kunderne er logisk isolerede i egne VPC'er, er multitenancy ofte den primære sikkerheds- og compliance-bekymring for virksomheder, der overvejer public cloud. Hvis en organisation kræver fuld fysisk adskillelse, kan den dog leje *dedicated hosts* (dedikeret fysisk hardware i udbyderens datacenter).

### Elasticity (Elasticitet)
**Elasticity** er evnen til **automatisk og dynamisk at skalere ressourcer både op og ned (eller ud og ind)** i takt med skiftende efterspørgsel:
- **Scaling Up / Down (Vertikal skalering):** Tilføje eller fjerne ressourcer (CPU, RAM) på et eksisterende system for at gøre serveren større eller mindre.
- **Scaling Out / In (Horisontal skalering):** Tilføje eller fjerne antallet af virtuelle maskiner/instanser, der arbejder sammen i en klynge.
- *NIST SP 800-145* definerer **Rapid Elasticity** som en af de fem grundlæggende egenskaber ved cloud computing (sammen med *On-demand self-service*, *Broad network access*, *Resource pooling* og *Measured service*). Fordelen er, at virksomheden hverken behøver at overprovisionere dyrt udstyr til spidsbelastninger eller betale for ubrugte ressourcer i stille perioder.

### Scalability (Skalerbarhed)
**Scalability** betegner en løsnings evne til at **vokse** for at imødekomme stigende langsigtet behov eller belastning uden at miste ydeevne. Hvor *scalability* primært fokuserer på evnen til at udvide kapaciteten, dækker *elasticity* den dynamiske og øjeblikkelige udvidelse **og** sammentrækning efter aktuel belastning.

---

## 6. Real-World Case Study & Nøgleemner

Kapitlets case-studie (*Acme, Inc.*) illustrerer en virksomhed, der flytter global streaming af træningsvideoer ud i en **AWS VPC**, mens følsomme kundedata forbliver i det lokale datacenter — hvilket skaber en **Hybrid Cloud**-model. Her vurderes ansvarsfordelingen (**Shared Responsibility Model**), hvor cloud-udbyderen sikrer selve skyens fysiske infrastruktur, mens kunden selv er ansvarlig for at konfigurere **Security Groups**, **NACLs** og adgangskontrol omkring sine data og virtuelle maskiner.

![[Table 3-1 - Key Topics for Chapter 3.png]]
