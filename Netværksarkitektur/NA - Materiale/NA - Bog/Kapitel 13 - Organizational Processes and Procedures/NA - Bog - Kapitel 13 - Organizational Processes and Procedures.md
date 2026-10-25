---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - "Kapitel 13 - Organizational Processes and Procedures"
  - "NA - Bog - Kapitel 13"
---

# Kapitel 13: Organizational Processes and Procedures

> **Bog-PDF:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 13 - Organizational Processes and Procedures.pdf]]
> **Relateret begrebsark:** [[NA - Begrebsark]] Kap. 13

---

## Resumé

Kapitel 13 dækker **Objective 3.1 (Explain the purpose of organizational processes and procedures)** i CompTIA Network+ (N10-009)-pensummet. Kapitlet fokuserer på den dokumentation og de administrative processer, der holder komplekse virksomhedsnetværk stabile, sikre og reviderbare:
1. **Netværksdokumentation (Documentation):** Forskellen mellem **fysiske og logiske diagrammer**, **Layer 1 / Layer 2 / Layer 3 netværksdiagrammer**, **Rack Diagrams**, **Cable Maps**, **Asset Inventory** (*Hardware*, *Software*, *Licensing*, *Warranty Support*), **IPAM (*IP Address Management*)**, **SLA (*Service-Level Agreement*)** samt **Wireless Survey / Heat Map**.
2. **Life-Cycle Management:** Systemets livscyklusfaser (fra konceptuelt design til **Decommissioning** og **Disposal**), leverandørmilepæle (**EOL – *End-of-Life*** og **EOS – *End-of-Support***) samt **Software Management** (*Patches*, *Bug fixes*, *OS updates* og *Firmware updates*).
3. **Change Management & Configuration Management:** Struktureret håndtering af ændringer (*Service Requests*, *Request Process Tracking*, *Approval*, *Maintenance Window*) samt styring af netværkskonfigurationer (**Production Configuration**, **Backup Configuration** og **Baseline / Golden Configuration**).

---

## 1. Netværksdokumentation (Documentation)

Opdateret og præcis dokumentation er afgørende for hurtig fejlfinding, kapacitetsplanlægning, onboarding af nye medarbejdere og sikkerhedsrespons.

### Fysiske vs. Logiske Diagrammer & OSI-lagsdiagrammer
- **Physical Diagram (Fysisk diagram / Layer 1 Diagram):** Viser de konkrete fysiske hardwarekomponenter (servere, switche, routere, kabler, patchpaneler), deres præcise fysiske placering i bygninger/racks og hvilke fysiske porte der er forbundet med hinanden.
- **Logical Diagram (Logisk diagram):** Viser det abstrakte, funktionelle design af netværket og hvordan data flyder logisk gennem infrastrukturen. Inddeles ofte efter OSI-lag:
  - **Layer 1 Network Diagram:** Fysisk kabling, medietyper, portnumre og patchpaneler.
  - **Layer 2 Network Diagram:** Fokuserer på data link-laget — dvs. switching-topologi, **VLAN-inddeling**, **Spanning Tree Protocol (STP)**, trunk-porte og link aggregation (EtherChannel/LACP).
  - **Layer 3 Network Diagram:** Fokuserer på netværkslaget — dvs. **IP-adresser og subnets**, **routere**, **dynamiske routingprotokoller** (OSPF, BGP), virtuelle interfaces og firewalls/zoner.

### Rack Diagrams og Cable Maps
- **Rack Diagram:** En grafisk repræsentation af hvert enkelt 19"-rack i datacentret eller krydsfeltet, der viser præcis hvilken rack-enhed (`U`-position) hver server, switch, router, UPS og patchpanel optager. Gør det hurtigt at finde en specifik enhed fysisk og planlægge plads til nyt udstyr.

![[Figure 13-1 - A Rack Diagram.png]]

- **Cable Maps and Diagrams (Kabelkort):** Dokumenterer og sporer hvert enkelt kabeltræk fra en specifik port på en switch over patchpanelet i krydsfeltet (IDF/MDF) og helt ud til det nummererede vægstik (*wall jack*) på brugerens kontor eller til et Wireless Access Point.

### Asset Inventory (Aktiv-inventarliste)
Et **Asset Inventory** er et samlet katalog (ofte i et CMDB / Asset Management-system) over organisationens teknologiske aktiver, opdelt i fire hovedområder:
1. **Hardware Asset Inventory:** Fortegnelse over alt fysisk udstyr (servere, switche, routere, laptops, AP'er) inkl. serienumre, modelnumre, fysisk placering og ansvarlig afdeling.
2. **Software Asset Inventory:** Oversigt over installerede applikationer og operativsystemer, versioner og brugsstatistik.
3. **Licensing (Licensstyring):** Sporer software- og funktionslicenser (type, antal brugte vs. købte licenser, udløbsdatoer og fornyelseskrav) for at sikre *compliance* med leverandøraftaler.
4. **Warranty Support (Garanti- og supportaftaler):** Dokumenterer aktive producentgarantier og supportkontrakter (f.eks. Cisco Smart Net), dækningsgrad og udløbsdatoer, så defekt hardware hurtigt kan ombyttes.

### IPAM, SLA og Wireless Survey / Heat Map
- **IPAM (*IP Address Management*):** Et dedikeret system til at planlægge, spore og administrere hele organisationens IP-adresserum (IPv4 og IPv6 subnets, ledige/optagne adresser og reservationer). IPAM integrerer tæt med **DHCP** og **DNS** (ofte kaldet **DDI**: *DNS, DHCP, and IPAM*), så IP-konflikter undgås, og dokumentationen opdateres automatisk.
- **SLA (*Service-Level Agreement*):** En formel kontrakt mellem en tjenesteudbyder (f.eks. en ISP, cloud-udbyder eller en intern IT-afdeling) og kunden, som definerer de aftalte kvalitets- og performancemål — herunder **oppetid/tilgængelighed** (f.eks. `99,99 %`), **svartider (*response times*)**, **udbedringstider (*resolution times* / MTTR)** og båndbredde/latency-garantier.
- **Wireless Survey & Heat Map:**
  - Et **Wireless Site Survey** kortlægger det fysiske miljø for at finde den optimale placering af AP'er, identificere støjkilder og måle reel dækning.
  - Resultatet dokumenteres som et **Heat Map**, der med farvegradienter (f.eks. grøn for stærkt signal, gul/rød for svagt signal eller *dead zones*) visuelt viser Wi-Fi-dækningen på over etageplanen.

---

## 2. Life-Cycle Management og Software Management

### Systemets Livscyklus (System Life Cycle)
God **Life-Cycle Management** styrer netværksudstyr og software gennem hele dets levetid:
1. **Conceptual Design** (Konceptuelt design)
2. **Preliminary System Design** (Indledende systemdesign)
3. **Detail Design and Development** (Detaljeret design og udvikling)
4. **Production and Construction** (Udrulning og idriftsættelse)
5. **Utilization and Support** (Løbende drift og vedligeholdelse)
6. **Phase-out / Decommissioning** (Kontrolleret udfasning af ældre udstyr fra produktionsnetværket)
7. **Disposal** (Sikker bortskaffelse, herunder sletning af følsomme konfigurationer/data og miljørigtig skrotning)

### End-of-Life (EOL) vs. End-of-Support (EOS)
- **EOL (*End-of-Life*):** Producentens annoncering af, at et produkt udfases. Indeholder typisk en tidslinje med ophør af nysalg (*End of Sale*) og ophør af nyudvikling af funktioner.
- **EOS (*End-of-Support* / *End-of-Service-Life*):** Den dato, hvor producenten **helt stopper med at levere teknisk support, fejlsøgning, bug fixes og sikkerhedsopdateringer** til produktet. At beholde EOS-udstyr i produktion udgør en alvorlig sikkerheds- og driftsrisiko.

### Software Management
- **Patches and Bug Fixes:** Målrettede rettelser, der lukker nyopdagede sikkerhedssårbarheder (*security patches*), retter specifikke softwarefejl (*bug fixes*) eller forbedrer stabiliteten.
- **Operating System (OS) Updates:** Opdateringer til operativsystemet på servere, klienter og netværksenheder (f.eks. Windows, Linux eller Cisco IOS), der leverer sikkerhedsforbedringer og nye funktioner.

![[Figure 13-2 - Operating System (OS) Updates.png]]

- **Firmware Updates:** Opdatering af den lavniveau-kode, der ligger lagret i ikke-flygtig hukommelse (flash/ROM/EEPROM) direkte på hardwarekomponenter såsom routere, switche, firewalls, AP'er og netværkskort.

![[Figure 13-3 - Firmware Updates.png]]

---

## 3. Change Management & Configuration Management

### Change Management (Ændringsstyring)
Selv en lille ændring på en switch eller firewall kan ved en fejl lægge hele virksomhedens netværk ned. **Change Management** sikrer, at alle ændringer gennemgår en struktureret og godkendt proces (ofte vurderet af et *Change Control Board / CAB*):
- **Service Requests & Request Process Tracking:** Sporer enhver anmodning fra oprettelse (ticket) til implementering og lukning.
- **De 5 kerneelementer i en Change Management-proces:**
  1. **Dokumenteret årsag til ændringen** (*Documented reason for a change* / forretningsmæssig eller teknisk begrundelse)
  2. **Selve ændringsanmodningen** (*The actual change request*, inkl. teknisk plan og *rollback*-plan)
  3. **Godkendelsesproces** (*The approval process*)
  4. **Fastlagt vedligeholdelsesvindue** (*The required maintenance window* — det tidsrum uden for spidsbelastning, hvor ændringen må udføres)
  5. **Notifikationsproces** (*The change notification process* — orientering af berørte brugere og interessenter før og efter ændringen samt opdatering af dokumentationen)

### Configuration Management (Konfigurationsstyring)
**Configuration Management** er den systematiske styring, overvågning og versionskontrol af konfigurationerne på alle netværksenheder (routere, switche, firewalls, servere). Man arbejder med tre centrale konfigurationstyper:

| Konfigurationstype | Beskrivelse og Formål |
| :--- | :--- |
| **Production Configuration** (*Running/Active Config*) | Den aktuelle, kørende konfiguration på en netværksenhed, som aktivt betjener trafik i produktionsmiljøet netop nu. |
| **Backup Configuration** | En sikkerhedskopi af produktionskonfigurationen, som gemmes regelmæssigt og sikkert (off-device), så man hurtigt kan gendanne (*restore* / *rollback*) enheden ved hardwarefejl eller fejlagtige ændringer. |
| **Baseline / Golden Configuration** | En **foruddefineret, standardiseret og sikkerhedshærdet skabelon (*ideal state*)**, som repræsenterer virksomhedens *best practice* for en bestemt enhedstype. Bruges både til hurtig udrulning af nye enheder og som referencepunkt (*benchmark*) til at opdage uautoriserede afvigelser (*configuration drift*). |

- **Nøgleprocesser i Configuration Management:** Automatiseret *Configuration Deployment*, løbende *Configuration Monitoring*, *Change Management*, *Version Control* (versionshistorik med mulighed for rollback) samt *Auditing and Compliance*.

---

## 4. Real-World Case Study & Nøgleemner

I kapitlets case-studie moderniserer *Acme, Inc.* sine IT-processer ved at indføre et centralt **IPAM**-værktøj (koblet til DNS og DHCP) for at eliminere IP-konflikter, etablere formelle **SLAs** med klare krav til oppetid og svartider, udføre **Wireless Surveys med Heat Maps** samt indføre fast **Life-Cycle Management** (proaktiv udskiftning af udstyr før **EOL/EOS**).

![[Table 13-1 - Key Topics for Chapter 13.png]]
