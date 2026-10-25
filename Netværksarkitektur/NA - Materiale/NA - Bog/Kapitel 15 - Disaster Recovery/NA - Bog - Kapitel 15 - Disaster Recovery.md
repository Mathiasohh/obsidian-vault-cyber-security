---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - Kapitel 15 - Disaster Recovery
  - Disaster Recovery
---

# CompTIA Network+ N10-009: Kapitel 15 – Disaster Recovery

**Sider i bogen:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 15 - Disaster Recovery.pdf]]  
**For termer og udtryk, se:** [[NA - Begrebsark]] Kap. 15

---

## Resumé

Kapitel 15 dækker **Objective 3.3 (Explain disaster recovery (DR) concepts)** i CompTIA Network+ N10-009-pensummet og gennemgår, hvordan man måler, designer, sikkerhedskopierer og tester højt tilgængelige (*High Availability*) og fejltolerante netværk samt katastrofeberedskab (*Disaster Recovery*).

Kapitlet indleder med måling af **High Availability (Uptime)** – herunder **"Five Nines" (99,999 % = maks. ~5 minutters nedetid pr. år)** og **"Six Nines" (99,9999 % = maks. ~30 sekunders nedetid pr. år)** – samt de fire centrale DR-metrikker: **MTTR (Mean Time to Repair / Recovery)**, **MTBF (Mean Time Between Failures)**, **RTO (Recovery Time Objective)** og **RPO (Recovery Point Objective)** i samspil med **SLA (Service-Level Agreement)**. Dernæst gennemgås **Fault-Tolerant Network Design** (eliminering af *Single Points of Failure* via link-, modul-, strøm- og chassis-redundans samt *Multipathing / ECMP*), **NIC Redundancy (NIC Teaming / Bonding)** i **Active-Active** og **Active-Passive** tilstande, **Computer & Device Clustering**, **Content Caching (Content Engines)** og **Load Balancing (Content Switching)**. Kapitlet sammenligner desuden de fire primære backup-typer (**Full**, **Incremental**, **Differential** og **Snapshots**), de tre klassiske Disaster Recovery-lokationer (**Cold Site**, **Warm Site** og **Hot Site** samt **Cloud Sites**) og DR-testmetoderne (**Tabletop Exercises** og **Validation Tests**), før det afsluttes med et omfattende **Real-World Case Study i netværksdesign**.

---

## 1. High Availability og Disaster Recovery Metrikker (DR Metrics)

Når moderne netværk bærer både forretningskritiske data, telefoni (VoIP) og video, er høj oppetid (**High Availability / Uptime**) et afgørende designkrav.
- **Availability (Tilgængelighed) vs. Reliability (Pålidelighed):** *Availability* måler, hvor stor en procentdel af tiden netværket er tilgængeligt (oppetid over et år), mens *Reliability* handler om kvaliteten af leveringen (f.eks. at netværket ikke taber pakker).
- **"Five Nines" (99,999 % oppetid):** Svarer til højst **ca. 5 minutters nedetid pr. år**.
- **"Six Nines" (99,9999 % oppetid):** Svarer til højst **ca. 30 sekunders nedetid pr. år**.

### 1.1 De 4 centrale DR-metrikker og SLA
| Metrik | Fuldt navn | Definition og eksamensfokus |
| :--- | :--- | :--- |
| **MTTR** | **Mean Time to Repair** *(el. Mean Time to Recovery)* | Den **gennemsnitlige tid det tager at reparere** en defekt komponent og bringe den tilbage i produktion. (Kortere MTTR = højere tilgængelighed). |
| **MTBF** | **Mean Time Between Failures** | Den **gennemsnitlige tid der går mellem hardwarefejl** på en komponent i normal drift (ekskl. reparationstid). Måler komponentens forventede pålidelighed/levetid. |
| **RTO** | **Recovery Time Objective** | **Hvor lang tid** systemet eller netværket maksimalt må være nede efter en katastrofe, før normal forretningsdrift lider alvorlig skade (tidsmål fremad i tid fra nedbrud til gendannelse). |
| **RPO** | **Recovery Point Objective** | **Hvor meget data (målt i tid tilbage)** organisationen maksimalt kan tåle at miste eller genindtaste (f.eks. tidspunktet for seneste gyldige backup før nedbruddet). Hvis RPO er 4 timer, skal der tages backup mindst hver 4. time. |
| **SLA** | **Service-Level Agreement** | En formel, juridisk bindende kontrakt mellem en serviceudbyder og en kunde, der fastsætter garanteret oppetid, svartider, kvalitet og ansvar. |

> **Vigtig eksamensskelnen (RPO vs. RTO):**  
> - **RPO (Point)** kigger **bagud i tid** mod seneste backup: *Hvor meget data tåler vi at miste?*  
> - **RTO (Time)** kigger **fremad i tid** mod genoprettelse: *Hvor hurtigt skal vi være oppe at køre igen?*

---

## 2. Fault-Tolerant Network Design og Hardware Redundans

**Fault Tolerance (Fejltolerance)** er et systems evne til at fortsætte driften uden datatab eller nedbrud, selv når en komponent fejler.

### 2.1 Single Point of Failure (SPOF) vs. No Single Point of Failure
- **Single Point of Failure (SPOF):** Hvis en fejl i én enkelt enhed, ét modul eller ét kabel gør hele netværket (eller et segment) utilgængeligt, udgør denne del et *Single Point of Failure*. I Figur 15-1 er der ganske vist redundante links mellem switchene og routerne, men hver klient-switch og adgangsrouter udgør stadig et SPOF for sine tilsluttede enheder.

![[Figure 15-1 - Redundant Network with Single Points of Failure.png]]

- **No Single Point of Failure:** Ved at duplikere både fysiske netværksenheder (switche, routere, firewalls, strømforsyninger) **og** forbinde dem med krydsende redundante links (Figur 15-2), opnås en topologi uden et Single Point of Failure.
- **Multipathing og ECMP:** Når der er flere aktive Layer 3-stier mellem routere, kan routingprotokoller udnytte båndbredden på alle links via **Equal-Cost Multipathing (ECMP)** (og *unequal-cost load sharing* i EIGRP).

![[Figure 15-2 - Redundant Network with No Single Point of Failure.png]]

### 2.2 Hardware-redundans: Moduler, NIC Teaming og Clustering
- **Module vs. Chassis Redundancy:**
  - *Module Redundancy:* Redundante komponenter *inde i* det samme chassis – f.eks. to strømforsyninger (dual power supplies) eller to **Route Processors (Supervisor Engines)** i en stor modulær switch.
  - *Chassis Redundancy:* To eller flere fysisk separate switch- eller router-chassiser, så netværket overlever, selv hvis et helt skab eller chassis mister strømmen.
- **NIC Redundancy (NIC Teaming / NIC Bonding) og Active-Active vs. Active-Passive:**
  Kritiske servere (og hele netværkslokationer/systemer) kan udstyres med flere netkort eller køre i to høj-tilgængelighedstilstande:
  1. **Active-Active:** Alle redundante komponenter (f.eks. begge NICs eller begge servere/sites) er **aktive samtidigt** og deler belastningen. Ved NIC-redundans har hvert netkort sin egen MAC-adresse, hvilket giver højere ydelse/båndbredde, men kan gøre fejlsøgning lidt mere kompleks.
  2. **Active-Passive:** Kun **én komponent er aktiv ad gangen**, mens den anden står i passiv *standby* og kun tager over ved fejl (*failover*). Ved NIC-redundans fremstår serveren med én enkelt MAC- og IP-adresse, hvilket gør konfiguration og fejlsøgning meget enkel.
- **Computer & Device Clustering:** En klynge (*cluster*) af tæt forbundne servere eller netværksenheder (f.eks. firewall-clusters eller switch-clusters), der arbejder sammen via højhastighedslinks og over for klienterne optræder som **ét enkelt logisk system** med automatisk failover og load-sharing.

### 2.3 Content Caching og Load Balancing
- **Content Caching (Content Engine):** En dedikeret netværksappliance placeret lokalt på et filialkontor (Figur 15-3), som gemmer en lokal kopi af ofte anvendt indhold (f.eks. træningsvideoer eller softwareopdateringer fra hovedkontoret). Det sparer kostbar WAN-båndbredde og giver hurtigere svartid for lokale brugere.

![[Figure 15-3 - Content Engine Sample Topology.png]]

- **Load Balancing (Content Switching):** En load balancer (*content switch*, Figur 15-4) fordeler indkommende brugerforespørgsler jævnt på tværs af en **serverfarm** med identisk indhold. Hvis én server fejler eller tages ud til vedligeholdelse, sendes trafikken blot til de øvrige servere uden nedetid for brugerne.

![[Figure 15-4 - Content-Switching Sample Topology.png]]

---

## 3. Backup-strategier, DR Sites og Testing

### 3.1 De 4 Backup-typer (Data og Konfigurationsbackups)
Udover at tage løbende backup af netværksenhedernes **software-images (OS)** og **konfigurationsfiler**, skal organisationen vælge den rette backup-strategi for infrastruktur- og brugerdata:

| Backup-type | Hvad sikkerhedskopieres? | Fordele & krav ved gendannelse (Restore) |
| :--- | :--- | :--- |
| **Full Backup** | Kopierer **hele datasættet** hver gang. | Sikreste og hurtigste at gendanne fra (kræver kun den seneste fulde backup), men tager længst tid at udføre og kræver mest lagerplads. |
| **Incremental Backup** | Kopierer kun de data, der er ændret **siden den allerseneste backup** (uanset om den var *full* eller *incremental*). | Hurtigst at tage og fylder mindst i hverdagen. **Ved gendannelse kræves:** Den seneste *Full Backup* **samt alle efterfølgende** *Incremental Backups* i rækkefølge! |
| **Differential Backup** | Kopierer alle data, der er ændret **siden den seneste Full Backup**. | Vokser sig gradvist større for hver dag siden sidste fulde backup. **Ved gendannelse kræves kun 2 sæt:** Den seneste *Full Backup* **og** den allerseneste *Differential Backup*. |
| **Snapshots** | Et øjebliksbillede (*point-in-time, read-only kopi*) af et filsystem eller en **virtuel maskine (VM)**. | Lynhurtigt at oprette og rulle tilbage til før f.eks. en opgradering eller patch. |

### 3.2 Disaster Recovery Sites (Cold, Warm, Hot og Cloud)
Hvis en naturkatastrofe, brand eller et omfattende angreb sætter hele det primære datacenter ud af spil, afhænger genoprettelseshastigheden (RTO/RPO) af typen af geografisk adskilt **DR-site**:

| DR Site-type | Udstyrs- og dataniveau | Pris | Genoprettelsestid (RTO) |
| :--- | :--- | :---: | :---: |
| **Cold Site** | Kun de fysiske rammer (lokaler, strøm, køling, toiletter/racks), men **ingen aktiv server-/netværkshardware og ingen opdaterede data**. Alt udstyr skal først indkøbes/leveres, installeres og indlæses fra backup. | **Lavest** (i faste driftsomkostninger) | **Længst** (dage eller uger) |
| **Warm Site** | **Delvist udstyret** med netværksforbindelser og (ofte nedskaleret) hardware på plads, men **kræver indlæsning af de nyeste data/backups** og ekstra konfiguration før fuld drift. | **Middel** | **Middel** (timer til få dage) |
| **Hot Site** | En **komplet, kørende kopi** af det primære datacenter med alt hardware, software, WAN/internet-forbindelser og **løbende synkroniserede data i realtid**, klar til at overtage driften øjeblikkeligt. | **Højest** | **Kortest** (sekunder til minutter – næsten nul nedetid) |
| **Cloud Site** | Virtuel DR-lokation i en public cloud (AWS, Azure, GCP), som fleksibelt og omkostningseffektivt kan drives som enten *cold*, *warm* eller *hot site* via IaC. | Fleksibel (Pay-as-you-go) | Afhænger af opsætning |

### 3.3 Testing af Disaster Recovery-planer
En DR-plan er kun værdifuld, hvis den regelmæssigt afprøves:
1. **Tabletop Exercises (Skrivebordsøvelser):** Simulerede, **diskussionsbaserede sessioner**, hvor nøgleinteressenter og IT-teams samles om et bord og mundtligt gennemgår et hypotetisk katastrofescenarie (f.eks. ransomware-angreb eller strømsvigt) trin for trin for at afklare roller, ansvar, kommunikationsveje og huller i DR-planen – uden at røre ved selve produktionsmiljøet.
2. **Validation Tests (Valideringstests):** Praktiske, tekniske tests, hvor man **systematisk afprøver og verificerer hver enkelt komponent** i DR-løsningen (f.eks. faktisk gendannelse af backups, test af failover-procedurer og verifikation af at RPO/RTO overholdes).

---

## 4. Real-World Case Study: Netværksdesign for Company ABC

Kapitlet afsluttes med et praktisk netværksdesign-scenarie for **Company ABC**, som lejer to bygninger (**Building A** og **Building B**) med **1 km** afstand gennem et rørsystem (*conduit*), et budgetfokus (pris vigtigere end maksimal ydelse), en 30 Mbps internetforbindelse ind i Building A samt et Class B-netværk **`172.16.0.0/16`**, der skal subnettes til mindst 5 lokationer og mindst 200 hosts pr. lokation.

![[Table 15-1 - Case Study Information for Buildings A and B.png]]

![[Figure 15-5 - Case Study Topology.png]]

### Gennemgang af den foreslåede løsning
1. **IP-adressering og Subnetting (`/19`):**
   - For at understøtte mindst 5 sites lånes **3 subnet-bits** ($2^3 = 8\text{ subnets}$), hvilket efterlader 13 host-bits ($2^{13} - 2 = 8.190\text{ hosts pr. subnet}$, rigeligt til 200 hosts).
   - Subnetmasken bliver **`255.255.224.0` (`/19`)** med en blokstørrelse på $256 - 224 = 32$ i tredje oktet. Building A tildeles `172.16.0.0/19`, og Building B tildeles `172.16.32.0/19`.

![[Table 15-2 - Case Study Suggested Solution - Network Addresses.png]]

2. **Layer 1 Media (Kabling):**
   - **Internt i bygningerne:** **Cat 6a UTP** til Gigabit Ethernet i dag og fremtidssikring til 10GBASE-T op til 100 meter.
   - **Mellem Building A og B (1 km):** Da 1 km overstiger 100 m-grænsen for kobber, vælges **Multimode Fiber (MMF)** på 1 Gbps.

![[Table 15-3 - Case Study Suggested Solution - Layer 1 Media.png]]

3. **Layer 2 og Layer 3 Enheder:**
   - **Building A (200 hosts fordelt på 3 etager, ~67 hosts pr. etage):** Hver etage får én 48-ports switch og én 24-ports switch (72 porte pr. etage) forbundet via 4-ports **LACP** til en central **Multilayer Switch** i Building A (som håndterer al Layer 3 routing mellem bygningerne og internettet).
   - **Building B (100 hosts på 1 etage):** To 48-ports switche og én 24-ports switch (120 porte i alt) stacket med LACP og forbundet via 1 Gbps MMF tilbage til Multilayer Switchen i Building A.

![[Table 15-4 - Case Study Suggested Solution - Layer 2 Devices.png]]

4. **Trådløst Design (Wi-Fi) og Miljøhensyn:**
   - For bred klientkompatibilitet og rækkevidde anvendes **2,4 GHz-båndet** med de tre **ikke-overlappende kanaler 1, 6 og 11** på de tre etager i Building A (og kanal 1 i Building B).
   - Da Multilayer Switchen i Building A er et kritisk knudepunkt, placeres den i et velventileret rum og beskyttes med **UPS (Uninterruptible Power Supply)** samt **PDU'er** og HVAC-overvejelse.

![[Table 15-5 - Case Study Suggested Solution - Wireless AP Selection.png]]

![[Figure 15-6 - Case Study Proposed Topology.png]]

---

## 5. Nøgleemner til Eksamen (Key Topics)

![[Table 15-6 - Key Topics for Chapter 15.png]]

### Hurtige eksamenstips (Exam Cram)
- **Five Nines (99,999 %) = maks. 5 minutters nedetid/år** | **Six Nines (99,9999 %) = maks. 30 sekunders nedetid/år**.
- **MTBF** = gennemsnitlig tid *mellem* hardwarefejl | **MTTR** = gennemsnitlig tid til at *reparere* en fejl.
- **RPO** = hvor meget *data* (bagud i tid) der mistes | **RTO** = hvor lang *tid* der går, før servicen er genoprettet.
- **Cold Site** = kun bygning/strøm (billigst, langsomst) | **Warm Site** = delvist udstyret | **Hot Site** = fuldt kørende spejl med næsten nul nedetid (dyrest).
- **Tabletop Exercise** = diskussionsbaseret simulering af DR-planen | **Validation Test** = teknisk afprøvning af backup/failover.
