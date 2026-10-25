---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - Kapitel 10 - Ethernet Switching Technologies
  - Ethernet Switching Technologies
---

# CompTIA Network+ N10-009: Kapitel 10 – Ethernet Switching Technologies

**Sider i bogen:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 10 - Ethernet Switching Technologies.pdf]]  
**For termer og udtryk, se:** [[NA - Begrebsark]] Kap. 10

---

## Resumé

Kapitel 10 dækker **Objective 2.2 (Given a scenario, configure switching technologies and features)** i CompTIA Network+ N10-009-pensummet og gennemgår både de grundlæggende principper i Ethernet (IEEE 802.3) og de vigtigste funktioner i moderne Layer 2/Layer 3 Ethernet-switche.

Kapitlet indleder med Ethernets medieadgangsmetode **CSMA/CD (Carrier-Sense Multiple Access with Collision Detection)**, forskellen på **kollisionsdomæner** (hvor en legacy hub udgør ét enkelt kollisionsdomæne i *half-duplex*, mens en Ethernet-switch giver ét separat kollisionsdomæne pr. port og muliggør *full-duplex* uden kollisioner), samt Ethernets båndbreddekapaciteter (fra 10 Mbps til 100 Gbps), **MTU (1.500 bytes)** og **Jumbo Frames (> 1.500 bytes)**. Herefter gennemgås **VLANs (Virtual LANs)**, der opdeler en fysisk switch i flere logiske **broadcast-domæner** (med brug af *VLAN database*, **SVI (Switch Virtual Interface)** til inter-VLAN routing/management, **Voice VLAN** og **802.1Q trunking** med 4-byte VLAN-tags og u-taggede frames på **Native VLAN**). Dernæst behandles **Spanning Tree Protocol (STP – IEEE 802.1D)** samt **RSTP (802.1w)** og **MSTP (802.1s)** i dybden: hvorfor Layer 2-loops uden TTL fører til **MAC address table corruption** og **Broadcast storms**, hvordan **Root Bridge** vælges ud fra laveste **Bridge ID (Priority + MAC)**, portrollerne (**Root Port**, **Designated Port**, **Nondesignated Port**), STP port costs og porttilstandene (*Blocking*, *Listening*, *Learning*, *Forwarding*). Endelig dækkes **Link Aggregation (IEEE 802.3ad / LACP)** og **Power over Ethernet (PoE – 802.3af op til 15,4 W og PoE+ – 802.3at op til 32,4 W)**.

---

## 1. Grundprincipper i Ethernet (IEEE 802.3)

Ethernet blev oprindeligt udviklet hos Xerox i 1973 og er standardiseret af IEEE under **IEEE 802.3**.

### 1.1 CSMA/CD og Kollisionsdomæner
I ældre Ethernet-netværk med delt bus-topologi (f.eks. 10BASE5/10BASE2 koaksialkabel, Figur 10-1) eller en Layer 1 **Ethernet-hub** (Figur 10-4) delte alle tilsluttede enheder det samme fysiske transmissionsmedie. Kun én enhed kunne sende ad gangen (**Half-Duplex**). Hvis to enheder sendte samtidigt, opstod en **kollision** (Figur 10-2), som ødelagde datagrammerne.

![[Figure 10-1 - Ethernet Network Using a Shared Bus Topology.png]]

![[Figure 10-2 - Collision on an Ethernet Segment.png]]

For at håndtere dette på delte kablede segmenter benytter Ethernet **CSMA/CD (Carrier-Sense Multiple Access with Collision Detection)**:
1. **Carrier Sense (Lyt før du sender):** Enheden lytter på kablet for at sikre, at der ikke allerede sendes en frame.
2. **Multiple Access (Fælles adgang):** Alle enheder på segmentet har lige adgang til mediet (i modsætning til deterministisk token-passing i Token Ring).
3. **Collision Detection (Kollisionsdetektion og Random Back-off):** Hvis to enheder lytter samtidigt, konkluderer at linjen er fri, og sender på samme tid, registrerer de kollisionen. Begge enheder stopper transmissionen og starter hver sin **tilfældige back-off-timer** (*random back-off timer*, Figur 10-3). Den enhed, hvis timer udløber først, forsøger at gensende sine data. *(Bemærk: Trådløse 802.11-netværk bruger i stedet **CSMA/CA – Collision Avoidance**).*

![[Figure 10-3 - Recovering from a Collision with Random Back-off Timers.png]]

### 1.2 Hubs vs. Ethernet-switche (Half-Duplex vs. Full-Duplex)
- **Shared Ethernet Hub (Lag 1):** En hub videresender blindt modtagne bits ud på alle andre porte. Derfor befinder **alle enheder på en hub sig i ét enkelt fælles kollisionsdomæne** (Figur 10-4). Enhederne er tvunget til at køre **Half-Duplex** (kan kun enten sende *eller* modtage ad gangen), og CSMA/CD skal være aktivt.
- **Ethernet Switch (Lag 2):** En switch træffer intelligente forwarding-beslutninger ud fra sin MAC-adressetabel og **opretter ét separat kollisionsdomæne for hver enkelt switchport** (*mikrosegmentering*, Figur 10-5). Når der kun sidder én enhed på hver switchport, kan der **aldrig opstå kollisioner**, CSMA/CD er ikke nødvendigt, og forbindelsen kan køre **Full-Duplex** (sende og modtage samtidigt med dobbelt effektiv kapacitet).
- **Flow Control:** En mekanisme i Ethernet til midlertidigt at bede afsenderen om at holde pause i datatransmissionen for at undgå pakketab ved buffer-overbelastning (*congestion*).

![[Figure 10-4 - Shared Ethernet Hub - One Collision Domain.png]]

![[Figure 10-5 - Ethernet Switch - One Collision Domain per Port.png]]

### 1.3 Båndbreddekapaciteter, MTU og Jumbo Frames
Valget af fysisk kabling (f.eks. UTP Cat 5e/6/6a vs. multimode/singlemode fiber) bestemmer både maksimal hastighed (**Speed**) og maksimal rækkevidde (**Distance**, f.eks. **100 meter** for twisted-pair Ethernet som 1000BASE-T).

![[Table 10-1 - Ethernet Bandwidth Capacities.png]]

- **MTU (Maximum Transmission Unit):** Den maksimale størrelse på Lag 3-nyttelasten (payload) i en standard IEEE 802.3 Ethernet-frame er **1.500 bytes**.
- **Jumbo Frames:** Ethernet-frames, der er konfigureret til at bære **mere end 1.500 bytes payload** (typisk op til 9.000 bytes). Bruges ofte i datacentre, SAN/iSCSI-lagring og high-performance netværk for at reducere header-overhead og CPU-belastning.

---

## 2. Virtual Local Area Networks (VLANs) og Trunking

### 2.1 Hvorfor bruge VLANs?
I en standardkonfiguration tilhører alle porte på en switch det samme **broadcast-domæne** (VLAN 1) og det samme IP-subnet (Figur 10-6). Hvis man uden VLANs ønskede at adskille f.eks. *Salg* og *Regnskab* på tværs af tre etager i en bygning af hensyn til sikkerhed og begrænsning af broadcast-trafik (såsom ARP), ville man være nødt til at trække separate kabler og købe separate fysiske switche til hver afdeling på hver etage!

![[Figure 10-6 - Example - All Ports on a Switch Belonging to the Same Subnet.png]]

Med **VLANs (Virtual LANs)** kan man **logisk opdele én fysisk switch i flere separate broadcast-domæner** (Figur 10-7):
- **Ét VLAN = ét broadcast-domæne = ét IP-subnet.**
- Enheder i forskellige VLANs tilsluttet den samme fysiske switch kan **ikke** kommunikere direkte med hinanden på Lag 2; **al trafik mellem to forskellige VLANs skal rutes (Lag 3)** via en router eller en multilayer switch.

![[Figure 10-7 - Example - Ports on a Switch Belonging to Different VLANs.png]]

### 2.2 Centrale VLAN-begreber
- **VLAN Database:** Den interne database på switchen, hvor de oprettede VLAN-numre, navne og porttilknytninger gemmes.
- **SVI (Switch Virtual Interface):** Et logisk Layer 3-interface (f.eks. `interface Vlan10`) på en multilayer switch (eller til management på en Layer 2-switch), der repræsenterer alle fysiske porte i det pågældende VLAN og fungerer som default gateway til **inter-VLAN routing**. Et SVI er *up*, så længe mindst én fysisk port i det pågældende VLAN er aktiv og *up*.
- **Voice VLAN:** Et dedikeret VLAN konfigureret på en access-port, som bærer **VoIP-telefontrafik** adskilt fra PC'ens datatrafik. Dette gør det muligt at prioritere stemmetrafik med **QoS (Quality of Service)** og beskytte telefoni mod broadcast-trafik fra data-VLAN'et.
- **VTP (VLAN Trunking Protocol):** En Cisco-proprietær protokol, der automatisk synkroniserer VLAN-databasen på tværs af switche i et netværk.
- **Access Port og Port Security:** En switchport, der kun tilhører ét data-VLAN (og evt. ét Voice VLAN), kaldes en **Access Port**. Med **Port Security** kan man begrænse, hvor mange (og hvilke) MAC-adresser porten må lære (f.eks. maks. 2 MAC-adresser til en IP-telefon og den PC, der er tilsluttet gennem telefonen).

### 2.3 IEEE 802.1Q Trunking og Native VLAN
Når flere switche skal forbindes med hinanden, ville det være spild af porte at trække ét fysisk kabel pr. VLAN. I stedet konfigureres forbindelsen mellem switchene som en **Trunk Port**, der transporterer trafik for **flere VLANs over ét enkelt fysisk link** (Figur 10-8).

![[Figure 10-8 - Example - Trunking Between Switches.png]]

Standardprotokollen for trunking er **IEEE 802.1Q** (ofte kaldet **dot1q** eller **802.1Q tagging**):
- **802.1Q Header Tag (4 bytes):** Når en frame sendes ud over et 802.1Q trunk-link, indsætter afsender-switchen et **4-byte (32-bit) tag** inde i Ethernet-headeren (Figur 10-9). Dette tag indeholder bl.a. et **12-bit VLAN ID-felt**, så modtager-switchen ved præcis, hvilket VLAN framen tilhører, før den fjerner tagget igen ved videresendelse til en access-port.
- **Native VLAN:** Ét bestemt VLAN på en 802.1Q-trunk udpeges som **Native VLAN** (standard VLAN 1). Frames, der tilhører Native VLAN, sendes **untagged (uden 4-byte VLAN-tag)** hen over trunk-linket. *Vigtigt: Begge ender af et trunk-link skal være konfigureret med præcis det samme Native VLAN!*
- **Auto-MDI/MDI-X:** Moderne switche registrerer automatisk, om der bruges et *straight-through* eller *crossover* Ethernet-kabel på et link, og tilpasser selv TX- og RX-benene.

![[Figure 10-9 - IEEE 802.1Q Header.png]]

---

## 3. Spanning Tree Protocol (STP)

For at opnå høj oppetid (*High Availability*) designer man netværk med redundante kabler og switche. Men i modsætning til Lag 3 IP-pakker har **Lag 2 Ethernet-frames intet TTL-felt (Time-to-Live)**! Hvis der er en fysisk løkke (loop) mellem switche på Lag 2, og der ikke kører en loop-forebyggelsesprotokol, opstår der to katastrofale problemer:

### 3.1 Konsekvenser af Layer 2 Loops uden STP
1. **MAC Address Table Corruption (Korruption af MAC-adressetabellen):** Når PC1 i Figur 10-10 sender en frame på Segment A, lærer både SW1 og SW2 på port `Gi0/1`, at PC1's MAC-adresse (`AAAA.AAAA.AAAA`) ligger på `Gi0/1`. Da de ikke kender destinationen endnu, flooder begge switche framen ud på Segment B via `Gi0/2`. Nu modtager SW1 pludselig SW2's kopi af framen ind på sin egen `Gi0/2`-port og overskriver derfor fejlagtigt sin MAC-tabel til at tro, at PC1 ligger på `Gi0/2`!

![[Figure 10-10 - MAC Address Table Corruption.png]]

2. **Broadcast Storms:** Når PC1 sender en broadcast-frame (`FFFF.FFFF.FFFF`, Figur 10-11), flooder begge switche framen ud på alle andre porte. Framen cirkulerer og multipliceres uendeligt i løkken i begge retninger på brøkdele af et sekund, indtil al båndbredde og switch-CPU er 100 % mættet, og hele netværket bryder sammen.

![[Figure 10-11 - Broadcast Storm.png]]

### 3.2 Hvordan STP (IEEE 802.1D) fungerer
**Spanning Tree Protocol (STP – IEEE 802.1D)** forhindrer Layer 2-loops ved at switchene udveksler **BPDUs (Bridge Protocol Data Units)** og logisk blokerer udvalgte redundante porte, så der kun er én aktiv, loop-fri sti mellem enhver to punkter – mens de blokerede links står klar som backup, hvis et aktivt link fejler.

#### 1. Valg af Root Bridge (Root Bridge Election)
Alle switche i STP-topologien vælger én fælles **Root Bridge**, som fungerer som referencepunktet (roden) i træet:
- Switchen med det **laveste Bridge ID (BID)** vinder valget som Root Bridge.
- **Bridge ID (BID)** består af: **Bridge Priority** (standard `32768`) + **Switchens MAC-adresse**.
- Hvis alle switche har standardprioriteten `32768` (som i Figur 10-12), vinder switchen med den **laveste MAC-adresse** (her SW1 med `1111.1111.1111`). Alle andre switche bliver **Nonroot Bridges**.

![[Figure 10-12 - Root Bridge Election.png]]

#### 2. STP Port Roles (Portroller) og Port Costs
Når Root Bridge er valgt, tildeles switchportene en af tre roller (Tabel 10-2):
- **Root Port (RP):** Hver *Nonroot Bridge* vælger **nøjagtigt én Root Port** – nemlig den port på switchen, der har den **laveste samlede sti-omkostning (Root Path Cost)** ind til Root Bridge.
- **Designated Port (DP):** Hvert netværkssegment (link) har **nøjagtigt én Designated Port** – den port på segmentet, der er tættest på Root Bridge i cost, og som videresender trafik på segmentet. *(Alle porte på selve Root Bridge er altid Designated Ports!)*
- **Nondesignated Port (Blocking Port):** Enhver port, der hverken er valgt som Root Port eller Designated Port, bliver en **Nondesignated Port** og sættes i **Blocking-tilstand** for at bryde løkken.

![[Table 10-2 - STP Port Types.png]]

Hvis to parallelle links har samme hastighed/cost (Figur 10-13, hvor begge links har cost 19), bruges det laveste Port ID som tie-breaker. Hvis linkene har forskellig hastighed (Figur 10-14, hvor øverste link er 10 Mbps med cost `100` og nederste link er 100 Mbps med cost `19`), vælger SW2 port `Gi0/2` (cost 19) som sin **Root Port** og blokerer `Gi0/1`.

![[Figure 10-13 - Identifying STP Port Roles.png]]

![[Figure 10-14 - STP with Different Port Costs.png]]

![[Table 10-3 - STP Port Cost.png]]

| Linkhastighed | Klassisk IEEE STP Port Cost |
| :--- | :---: |
| **10 Mbps** (Ethernet) | **100** |
| **100 Mbps** (Fast Ethernet) | **19** |
| **1 Gbps** (Gigabit Ethernet) | **4** |
| **10 Gbps** (10-Gigabit Ethernet) | **2** |
| **40 Gbps** (40-Gigabit Ethernet) | **2** |

#### 3. De 4 klassiske STP Port States (Porttilstande)
I klassisk 802.1D STP går en port gennem fire tilstande (op til 50 sekunders konvergenstid), før den videresender datatrafik:
1. **Blocking (20 sek. max age):** Videresender ikke brugertrafik og lærer ikke MAC-adresser; lytter kun efter BPDUs.
2. **Listening (15 sek. forward delay):** Sender og modtager BPDUs for at deltage i STP-valg, men videresender endnu ikke brugertrafik og lærer ikke MAC-adresser.
3. **Learning (15 sek. forward delay):** Videresender stadig ikke brugertrafik, men begynder nu at **lære MAC-adresser** og føje dem til MAC-adressetabellen.
4. **Forwarding:** Porten er fuldt aktiv, videresender brugertrafik og lærer MAC-adresser.

### 3.3 Moderne udvidelser til STP (RSTP, MSTP og SPB)
- **RSTP (Rapid Spanning Tree Protocol – IEEE 802.1w):** Moderne videreudvikling af STP, der reducerer konvergenstiden fra 30–50 sekunder til få sekunder. RSTP introducerer **Edge Ports** (porte forbundet direkte til slutbruger-enheder, som straks går i *Forwarding* uden at vente på *Listening/Learning*) samt **Alternate** og **Backup** portroller.
- **MSTP (Multiple Spanning Tree Protocol – IEEE 802.1s):** Bygger oven på RSTP og gør det muligt at gruppere og mappe flere VLANs til et mindre antal Spanning Tree-instanser for bedre skalering og belastningsfordeling i store netværk.
- **SPB (Shortest Path Bridging – IEEE 802.1aq):** Et skalerbart alternativ til STP i meget store netværk med hundredvis af switche, hvor alle links kan være aktive samtidigt.

---

## 4. Link Aggregation (IEEE 802.3ad / LACP)

Når mange klienter på 1 Gbps access-porte sender trafik gennem et enkelt 1 Gbps uplink mellem to switche, opstår der en flaskehals (**Uplink Congestion**, Figur 10-15). Hvis man blot sætter ekstra kabler mellem switchene, vil STP blokere dem for at undgå loops!

![[Figure 10-15 - Uplink Congestion.png]]

Løsningen er **Link Aggregation (Port Aggregation / EtherChannel)** (Figur 10-16), som bundter flere fysiske links mellem to switche til **én enkelt logisk forbindelse (Port Channel)**:
- **IEEE 802.3ad / LACP (Link Aggregation Control Protocol):** Den åbne IEEE-standard for dynamisk forhandling og bundtning af fysiske porte.
- **Fordele ved LACP:**
  1. **Øget samlet båndbredde:** Trafikken load-balances på tværs af alle fysiske links i bundtet.
  2. **Indbygget redundans (Ingen Single Point of Failure):** Hvis ét fysisk kabel i LACP-bundtet klippes over, fortsætter trafikken øjeblikkeligt på de resterende links uden STP-genberegning.
  3. **STP ser hele bundtet som ét enkelt logisk link** og blokerer derfor ikke de parallelle kabler i gruppen.

![[Figure 10-16 - Link Aggregation.png]]

---

## 5. Power over Ethernet (PoE og PoE+)

**Power over Ethernet (PoE)** gør det muligt for en switch at levere **jævnstrøm (DC-strøm) sammen med netværksdata over det samme twisted-pair UTP-kabel** (kræver Cat 5e eller bedre) til enheder som trådløse Access Points (AP'er), VoIP-telefoner og IP-overvågningskameraer.

### 5.1 Hvordan PoE detekterer og klassificerer enheder
For ikke at beskadige almindelige enheder (f.eks. en bærbar PC), der ikke bruger PoE, udfører switchen en sikker detektionsproces (Figur 10-17):
1. **Modstandstjek (25 k$\Omega$):** Switchen sender først en lille spænding på **2,7 V – 10,1 V DC** ud på kablet for at måle, om den tilsluttede enhed (Powered Device, PD) har en karakteristisk modstand på **25.000 ohm (25 k$\Omega$)**.
2. **Strømklassificering:** Hvis modstanden er til stede, påfører switchen kortvarigt (< 0,1 sekund) **15,5 V – 20,5 V DC** (begrænset til maks. 100 mA) for at måle strømforbruget og aflæse, hvilken effektklasse enheden har brug for.

![[Figure 10-17 - PoE.png]]

### 5.2 PoE-standarder (IEEE 802.3af vs. 802.3at)
| Standard | Kaldenavn | Maksimal effekt pr. port | Typiske anvendelser |
| :--- | :--- | :---: | :--- |
| **IEEE 802.3af** | **PoE** | **15,4 W** | VoIP-telefoner, simple sensorer, basale trådløse AP'er |
| **IEEE 802.3at** | **PoE+** | **32,4 W** (ofte angivet som ~30 W) | Pan-Tilt-Zoom (PTZ) IP-videokameraer, multi-radio Wi-Fi AP'er |

---

## 6. Nøgleemner til Eksamen (Key Topics)

![[Table 10-4 - Key Topics for Chapter 10.png]]

### Hurtige eksamenstips (Exam Cram)
- **VLANs:** Ét VLAN = ét broadcast-domæne. Trafik *mellem* VLANs kræver altid **routing** (f.eks. via en **SVI** på en Layer 3-switch eller en router).
- **802.1Q Native VLAN:** Det eneste VLAN på en trunk, hvis frames sendes **untagged**.
- **STP Root Bridge:** Vælges ud fra det **laveste Bridge ID (Priority + MAC)**. Alle porte på Root Bridge er **Designated Ports**. Hver Nonroot Bridge har én **Root Port** (tættest på Root Bridge i cost).
- **LACP (IEEE 802.3ad):** Bundter flere fysiske interfaces til ét logisk interface for øget båndbredde og redundans.
- **PoE (802.3af) = 15,4 W** | **PoE+ (802.3at) = 32,4 W**.
