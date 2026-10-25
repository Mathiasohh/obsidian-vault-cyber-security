---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - "Kapitel 6 - Network Topologies, Architectures, and Types"
  - "NA - Bog - Kapitel 6"
---

# Kapitel 6: Network Topologies, Architectures, and Types

> **Bog-PDF:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 6 - Network Topologies, Architectures, and Types.pdf]]
> **Relateret begrebsark:** [[NA - Begrebsark]] Kap. 6

---

## Resumé

Kapitel 6 dækker **Objective 1.6 (Compare and contrast network topologies, architectures, and types)** i CompTIA Network+ (N10-009)-pensummet. Kapitlet introducerer formålet med moderne konvergerede netværk og klassificerer netværk ud fra tre centrale perspektiver:
1. **Geografisk udbredelse og formål:** LAN, WAN, WLAN, SAN, CAN, MAN og PAN.
2. **Ressourceplacering:** Client/Server-netværk over for Peer-to-Peer (P2P)-netværk samt Cloud Networking.
3. **Fysiske og logiske topologier samt netværksarkitekturer:** Point-to-Point, Star, Hub-and-Spoke, Full-Mesh, Partial-Mesh (Hybrid), den klassiske **Three-Tier Hierarchical Model** (*Access*, *Distribution*, *Core* samt *Collapsed Core*) og datacenterarkitekturen **Spine and Leaf** med fokus på **North-South** og **East-West** trafikflows.

---

## 1. Hvad er et netværk? (Defining a Network)

Et computernetværk forbinder ikke længere kun traditionelle computere, men et bredt udvalg af enheder (servere, smartphones, tablets, IoT-sensorer, IP-telefoner og sikkerhedskameraer). Værdien af et netværk opstår gennem den trafik og de tjenester, det muliggør — herunder fildeling, webbrowsing, videokonferencer, instant messaging, e-mail og **VoIP** (*Voice over IP*).

- **Converged Network (Konvergeret netværk):** Et netværk, der transporterer flere forskellige trafiktyper — såsom **data, tale (voice) og video** — over den samme fælles fysiske og logiske netværksinfrastruktur. Det giver store besparelser på udstyr og kabling, men stiller højere krav til båndbredde, tilgængelighed og **Quality of Service (QoS)**.

---

## 2. Netværkstyper og geografisk udbredelse (Network Types and Characteristics)

Netværk kategoriseres ofte efter deres fysiske/geografiske udstrækning og specifikke anvendelsesområde:

- **LAN (Local Area Network):** Forbinder netværkskomponenter inden for et begrænset geografisk område, såsom et kontor, en etage eller en enkelt bygning. De mest udbredte LAN-teknologier er **Ethernet (IEEE 802.3)** og trådløse netværk (**IEEE 802.11**).

![[Figure 6-1 - Sample LAN Topology.png]]

- **WAN (Wide Area Network):** Forbinder netværk, der er adskilt over store geografiske afstande (mellem byer, lande eller kontinenter), f.eks. mellem et hovedkontor og flere filialer. Eksempler på WAN-teknologier omfatter **MPLS** (*Multiprotocol Label Switching*), leased lines, fiberforbindelser og ældre ATM-netværk.

![[Figure 6-2 - Sample WAN Topology.png]]

- **WLAN (Wireless Local Area Network):** Et lokalt netværk (LAN), hvor enhederne kommunikerer trådløst via radiobølger (Wi-Fi / IEEE 802.11) gennem et eller flere Wireless Access Points (APs).
- **SAN (Storage Area Network):** Et dedikeret, ekstremt hurtigt og fejltolerant netværk konstrueret specifikt til blokbaseret dataopbevaring mellem servere og store disk-arrays (benytter teknologier som *Fibre Channel (FC)*, *FCoE* eller *iSCSI*).
- **CAN (Campus Area Network):** Forbinder flere individuelle bygningers LANs inden for et sammenhængende geografisk område på nogle få kvadratkilometer — f.eks. et universitetscampus, en militærbase eller et stort virksomhedshovedkvarter med mange bygninger.
- **MAN (Metropolitan Area Network):** Dækker et større område end et CAN, men mindre end et WAN — typisk en hel by eller forstad (f.eks. et kommunalt fibernet, der forbinder kontorer på tværs af en storby).
- **PAN (Personal Area Network):** Det mindste netværksformat med en rækkevidde på få meter omkring en enkelt person. Eksempler inkluderer **Bluetooth**-forbindelser (headset, smartwatch, tastatur), **USB**- eller **Thunderbolt**-forbindelser til eksterne enheder.

---

## 3. Netværk defineret efter ressourceplacering (Resource Location)

Netværk kan også opdeles efter, hvor ressourcerne (filer, printere, databaser) er placeret, og hvordan adgangen administreres:

### Client/Server Networks
I et **Client/Server-netværk** tilgår klientenheder (PC'er, laptops) fælles ressourcer, der ligger på én eller flere dedikerede, centraliserede servere med et netværksoperativsystem (NOS) som Windows Server eller Linux Server — eller på en **NAS** (*Network-Attached Storage*) via f.eks. SMB eller NFS.

![[Figure 6-3 - Client-Server Network Example.png]]

![[Table 6-1 - Characteristics, Benefits, and Drawbacks of Client-Server Networks.png]]

- **Fordele:** Høj ydeevne, nem skalerbarhed, centraliseret backup og enkel sikkerhedsadministration (rettigheder og politikker styres centralt på serveren).
- **Ulemper:** Dyrere i indkøb og drift (kræver dedikeret serverhardware og licenser), og en enkelt server kan udgøre et **Single Point of Failure (SPOF)**, hvis den ikke er opbygget redundant.

### Peer-to-Peer (P2P) Networks
I et **Peer-to-Peer-netværk** deler de forbundne klientmaskiner direkte deres egne lokale ressourcer (f.eks. mapper på egen harddisk eller en lokalt tilsluttet printer) med hinanden uden en central server.

![[Figure 6-4 - Peer-to-Peer Network Example.png]]

![[Table 6-2 - Characteristics, Benefits, and Drawbacks of a Peer-to-Peer Network.png]]

- **Fordele:** Billigt og hurtigt at sætte op i hjemmenetværk eller meget små virksomheder; kræver hverken dedikeret serverhardware eller specialistviden om server-OS.
- **Ulemper:** Skalerer dårligt, fordi administrationen (brugere, adgangskoder og tilladelser) skal vedligeholdes individuelt på hver eneste PC, og ydeevnen på en PC falder, når andre brugere samtidig henter filer fra den.

---

## 4. Netværk defineret efter topologi (Network Topologies)

En netværkstopologi beskriver netværkets opbygning. Det er afgørende at skelne mellem:
- **Fysisk topologi (Physical Topology):** Hvordan kabler og netværksenheder rent fysisk er forbundet med hinanden.
- **Logisk topologi (Logical Topology):** Hvordan data rent faktisk bevæger sig gennem netværket fra enhed til enhed.
  - *Klassisk eksempel:* I et ældre **Token Ring**-netværk er computerne fysisk forbundet i en **stjerne (Physical Star)** ind til en central *Media Access Unit (MAU)*, men trafikken sendes logisk rundt i en cirkel fra maskine til maskine som en **ring (Logical Ring)**.

![[Figure 6-5 - Physical Star Topology.png]]

![[Figure 6-6 - Logical Ring Topology.png]]

### Point-to-Point Topology
Den simpleste topologi, hvor en direkte fysisk eller logisk forbindelse forbinder præcis **to** netværksnoder eksklusivt (f.eks. to bygninger forbundet med et dedikeret fiberlink eller en punkt-til-punkt trådløs bro). Giver høj hastighed, pålidelighed og sikkerhed, men skalerer ikke til mange lokationer uden mange separate links.

### Star Topology (Stjernetopologi)
I en **Star-topologi** er alle slutenheder forbundet med hver sit individuelle kabel ind til én central netværksenhed (i dag næsten altid en **Ethernet-switch**, tidligere en *hub*). Det er den altdominerende fysiske LAN-topologi i moderne netværk.

![[Figure 6-7 - Star Topology.png]]

![[Table 6-3 - Characteristics, Benefits, and Drawbacks of a Star Topology.png]]

- **Fordele:** Et kabelbrud påvirker kun den ene enhed, der sidder for enden af kablet, og fejlfinding er nem via det centrale aggregeringspunkt.
- **Ulemper:** Kræver mere kabel og længere installationstid end en bustopologi, og hvis selve den centrale switch fejler, mister alle tilsluttede enheder forbindelsen.

### Hub-and-Spoke Topology
Når flere geografiske lokationer (WAN-sites) skal forbindes, svarer **Hub-and-Spoke** til en stjernetopologi på WAN-niveau: Hvert fjernkontor (**spoke**) har én WAN-forbindelse ind til hovedkontoret (**hub**).

![[Figure 6-8 - Hub-and-Spoke Topology.png]]

![[Table 6-4 - Characteristics, Benefits, and Drawbacks of a Hub-and-Spoke WAN Topology.png]]

- **Fordele:** Minimerer de løbende udgifter til dyre WAN-forbindelser, og det er nemt at tilføje en ny filial (kræver kun ét nyt link ind til hubben).
- **Ulemper:** Mangel på redundans (kun ét link pr. spoke), hub-sitet er et *Single Point of Failure*, og trafik mellem to fjernkontorer skal tage en suboptimal omvej gennem hovedkontoret.

### Full-Mesh Topology
I en **Full-Mesh-topologi** har **hver eneste lokation en direkte forbindelse til samtlige andre lokationer** i netværket.
- Antallet af nødvendige links ($w$) for $n$ lokationer beregnes med formlen:
  $$w = \frac{n \times (n - 1)}{2}$$
  *(F.eks. kræver $4$ sites $\frac{4 \times 3}{2} = 6$ links, mens $10$ sites kræver $\frac{10 \times 9}{2} = 45$ links).*

![[Figure 6-9 - Full-Mesh Topology.png]]

![[Table 6-5 - Characteristics, Benefits, and Drawbacks of a Full-Mesh WAN Topology.png]]

- **Fordele:** Maksimal fejltolerance/redundans (flere links kan fejle uden tab af forbindelse) og altid den mest optimale, direkte rute mellem enhver kombination af lokationer.
- **Ulemper:** Meget dyrt og komplekst at skalere, når antallet af lokationer stiger.

### Partial-Mesh (Hybrid) Topology
En **Partial-Mesh-topologi** er en praktisk hybrid mellem Hub-and-Spoke og Full-Mesh: Lokationer med stor indbyrdes trafik får direkte forbindelser til hinanden og til kritiske sites, mens mindre kontorer nøjes med færre forbindelser og ruter trafik via andre sites.

![[Figure 6-10 - Partial-Mesh Topology.png]]

![[Table 6-6 - Characteristics, Benefits, and Drawbacks of a Partial-Mesh Topology.png]]

---

## 5. Netværksarkitekturer og Trafikflows

For at designe skalerbare og overskuelige netværk opdeler netværksarkitekter infrastrukturen i funktionelle lag (*tiers*).

### The Three-Tier Hierarchical Model (Den klassiske 3-lagsmodel)
Den klassiske enterprise-arkitektur (ofte brugt i campus-netværk) opdeler netværket i tre hierarkiske lag:

![[Figure 6-11 - The “Classic” Three-Tier Network Architecture.png]]

1. **Access / Edge Layer (Adgangslaget):**
   - **Formål:** Giver slutbrugere og slutenheder adgang til netværket.
   - **Udstyr:** Slutenheder (PC'er, laptops, printere), Layer 2 access-switche og Wireless Access Points (APs).
   - **Teknologier:** Layer 2 switching, VLANs (inkl. Voice VLANs), **Spanning Tree Protocol (STP)**, **Power over Ethernet (PoE)**, **Port Security**, QoS-markering og VACLs.
2. **Distribution / Aggregation Layer (Distributionslaget):**
   - **Formål:** Samler (*aggregerer*) trafikken fra adgangslagets mange switche, håndhæver sikkerhedspolitikker og ruter trafikken videre mod kernen eller WAN/cloud.
   - **Udstyr:** Hurtige Layer 3 **multilayer switches**, routere, firewalls, IPS-enheder og proxyservere.
   - **Teknologier:** Inter-VLAN routing, adgangslister (ACLs / sikkerhedspolitikker), rute-opsummering (*route summarization*), load balancing og høj redundans (f.eks. FHRP).
3. **Core / Backbone Layer (Kernelaget):**
   - **Formål:** Netværkets højhastighedsrygrad, hvor ét krav overtrumfer alt andet: **hastighed, hastighed og hastighed**. Kernelaget skal flytte enorme datamængder mellem forskellige distributionsblokke med minimal forsinkelse og uden tung pakkeinspektion.
   - **Udstyr:** Ultra-hurtige enterprise-routere og high-end multilayer switches.
   - **Teknologier:** Fuld redundans, båndbreddeaggregering (link aggregation) og trafik-policing/shaping.

#### Collapsed Core Design (2-lagsmodel)
Mindre og mellemstore organisationer har sjældent behov for et separat Core- og Distribution-lag. De anvender i stedet et **Collapsed Core-design**, hvor **Core- og Distribution-laget smeltes sammen til ét kombineret lag** over Access-laget for at reducere omkostninger og kompleksitet.

---

### Spine and Leaf Architecture (Datacenter-arkitektur)
I moderne datacentre — hvor kommunikationen primært foregår på tværs mellem virtuelle maskiner, containere og storage-noder (f.eks. i Software-Defined Networking som **Cisco ACI**) — er den klassiske 3-lagsmodel erstattet af en flad **2-lags Spine and Leaf-topologi**:

![[Figure 6-12 - The Cisco ACI Spine and Leaf Design.png]]

- **Opbygning og forbindelsesregler:**
  - Arkitekturen består af et **Spine-lag** (backbone-switche) og et **Leaf-lag** (Top-of-Rack / adgangs-switche, hvortil servere og VM-hosts forbindes).
  - **Hver eneste Leaf-switch er forbundet direkte til hver eneste Spine-switch.**
  - Spine-switche må **aldrig** forbindes direkte med hinanden, og Leaf-switche må **aldrig** forbindes direkte med hinanden.
- **Fordele ved Spine and Leaf:**
  - **Forudsigelig vej og lav, ensartet latency:** Trafik mellem to servere på forskellige Leaf-switche krydser altid præcis én Spine-switch (samme antal hops hver gang).
  - **Nem og lineær skalering:** Mangler man flere serverporte, tilføjer man blot en ekstra *Leaf*-switch; mangler man mere samlet båndbredde/kapacitet på tværs af datacentret, tilføjer man blot en ekstra *Spine*-switch.

---

### Traffic Flows: North–South vs. East–West
Når netværksingeniører dimensionerer båndbredde og sikkerhed, skelnes der mellem to overordnede trafikretninger:
- **North–South Traffic (Nord–Syd-trafik):** Trafik, der bevæger sig vertikalt ind og ud af netværket/datacentret — f.eks. mellem klienter på Access-laget og eksterne systemer gennem Distribution- og Core-laget (eller mellem en ekstern bruger på internettet og en webserver i datacentret). Dette trafikmønster dominerer i den klassiske **Three-Tier-model**.
- **East–West Traffic (Øst–Vest-trafik):** Trafik, der bevæger sig horisontalt på tværs mellem servere, virtuelle maskiner (VMs) og containere internt i datacentret (f.eks. mellem en webserver, en applikationsserver og en databaseserver). Dette trafikmønster dominerer i moderne datacentre og er hovedårsagen til, at **Spine and Leaf**-arkitekturen foretrækkes her.

---

## 6. Real-World Case Study & Nøgleemner

Kapitlets case-studie (*Acme, Inc.*) viser, hvordan en virksomhed kombinerer flere topologier i praksis: Hovedkontorets lokale netværk opbygges som en fysisk **Star-topologi** med Cat 6a UTP-kabling ind til en central switch, mens hovedkontoret (HQ) og to filialer (Branch1 og Branch2) i første omgang forbindes via en udbyders WAN som en **Hub-and-Spoke-topologi** (bestående af logiske point-to-point-forbindelser). Når budgettet tillader et ekstra direkte link mellem Branch1 og Branch2, opgraderes WAN-topologien til en **Full-Mesh-topologi** for at opnå fuld redundans og direkte kommunikation mellem filialerne.

![[Table 6-7 - Key Topics for Chapter 6.png]]
