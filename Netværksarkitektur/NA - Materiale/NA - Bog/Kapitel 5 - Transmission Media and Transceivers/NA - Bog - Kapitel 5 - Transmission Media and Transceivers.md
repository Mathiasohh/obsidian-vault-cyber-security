---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - "Kapitel 5 - Transmission Media and Transceivers"
  - "NA - Bog - Kapitel 5"
---

# Kapitel 5: Transmission Media and Transceivers

> **Bog-PDF:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 5 - Transmission Media and Transceivers.pdf]]
> **Relateret begrebsark:** [[NA - Begrebsark]] Kap. 5

---

## Resumé

Kapitel 5 dækker **Objective 1.5 (Compare and contrast transmission media and transceivers)** i CompTIA Network+ (N10-009)-pensummet. Kapitlet gennemgår både trådløse og kablede transmissionsmedier på OSI-modellens fysiske lag (Layer 1):
- **Trådløse medier:** Frekvensbånd (`2.4 GHz`, `5 GHz` og `6 GHz`), ikke-overlappende kanaler, modulerings- og spredningsteknikker (**DSSS**, **FHSS**, **OFDM**, **OFDMA**), **IEEE 802.11**-standarderne (`802.11a/b/g/n/ac/ax/be`), **Cellular** (`2G`–`5G`, `LTE`, `CDMA`, `GSM/TDMA`) og **Satellite WAN**.
- **Kablede kobber- og fibermedier:** Coaxial-kabler (`RG-59`, `RG-6`, `RG-58`), Twinaxial / **DAC**-kabler, Twisted-Pair (**STP** og **UTP** i kategorierne `Cat 5` til `Cat 8`, **TIA/EIA-568A/B**, straight-through/crossover/rollover, **MDI/MDIX**, **Plenum vs. Non-plenum**) samt **Fiberoptiske kabler** (**Multimode Fiber / MMF** vs. **Single-Mode Fiber / SMF**).
- **Stiktyper, Ethernet-standarder og Transceivere:** Kobberstik (**BNC**, **F-type**, **RJ45**, **RJ11**, **DB-9**), fiberstik (**ST**, **SC**, **LC**, **MTRJ**, **MPO**) og poleringstyper (**PC**, **UPC**, **APC**), **IEEE 802.3 Ethernet-standarder** (`10BASE5` til `100GBASE-ER4`), **Transceivere** (**GBIC**, **SFP**, **SFP+**, **QSFP**, **QSFP+** til Ethernet og **Fibre Channel**), optisk multiplexing (**WDM**, **CWDM**, **DWDM**) samt **Media Converters**.

---

## 1. Trådløs transmission (Wireless Media)

Trådløse lokalnetværk (**WLANs**) anvender radiofrekvenser (RF) som transmissionsmedie og er standardiseret under **IEEE 802.11**.

### Frekvensbånd og ikke-overlappende kanaler
WLANs opererer primært i tre frekvensbånd:
1. **`2.4 GHz`-båndet (`2.4 GHz–2.5 GHz`):** Længere rækkevidde og bedre evne til at trænge gennem faste forhindringer, men færre kanaler og højere risiko for interferens.
   - Hver kanal har en centerfrekvens med **5 MHz** afstand til nabokanalen (undtagen kanal 14), men selve signalet breder sig over **22 MHz**.
   - For at undgå kanaloverlap kræves mindst 5 kanalers afstand ($5 \times 5\text{ MHz} = 25\text{ MHz} > 22\text{ MHz}$). I Nordamerika og store dele af verden anvendes derfor de tre **ikke-overlappende kanaler: `1`, `6` og `11`** (kanal `14` er kun tilladt i få lande og understøttes ikke i USA).

![[Figure 5-1 - Non-overlapping Channels in the 2.4GHz Band.png]]

![[Table 5-1 - Channel Frequencies in the 2.4GHz Band.png]]

2. **`5 GHz`-båndet (`5.180 GHz–5.825 GHz`):** Kortere rækkevidde end `2.4 GHz`, men langt flere ikke-overlappende kanaler og højere datakapacitet. Visse kanaler (f.eks. kanal `52–64`) kræver **DFS (*Dynamic Frequency Selection*)** for at undgå interferens med vejrradar og militærradar.

![[Table 5-2 - Non-overlapping Channels in the 5GHz Band Recommended for Use in the United States.png]]

3. **`6 GHz`-båndet:** Introduceret med **Wi-Fi 6E / 802.11ax** (og videreført i Wi-Fi 7). Tilføjer op til 14 ekstra `80 MHz`-kanaler eller 7 super-brede `160 MHz`-kanaler, hvilket gør det ideelt til high-definition videostreaming og VR med minimal interferens.

### Trådløse transmissionsmetoder (Spread-Spectrum)
En trådløs kanal benytter ikke kun én enkelt frekvens, men spreder signalet over et frekvensspektrum (*spread-spectrum*) for at modstå støj og interferens:
- **DSSS (Direct-Sequence Spread Spectrum):** Modulerer data over et helt frekvensområde ved hjælp af korte symboler kaldet *chips*, der sendes med højere hastighed end selve databit-raten og koder både data og tilsyneladende tilfældige bits (anvendt i `802.11` og `802.11b`).
- **FHSS (Frequency-Hopping Spread Spectrum):** Afsender og modtager hopper synkront mellem forudbestemte frekvenser efter et aftalt mønster. Giver øget sikkerhed og modstandsdygtighed mod smalbåndsinterferens (anvendt i den originale `802.11`-standard og Bluetooth).
- **OFDM (Orthogonal Frequency-Division Multiplexing):** Opdeler en kanal i mange (f.eks. 52) parallelle underkanaler (*subcarriers*) med en relativt lav symbol-moduleringsrate. Det giver meget høje samlede datahastigheder og reducerer *multipath*-interferens markant (anvendt i `802.11a`, `802.11g`, `802.11n` og `802.11ac`).
- **OFDMA (Orthogonal Frequency-Division Multiple Access):** En videreudvikling af OFDM introduceret i **802.11ax (Wi-Fi 6)**. OFDMA opdeler kanalen i mindre *Resource Units (RUs)* og anvender avanceret tidsplanlægning (*scheduling*), så et AP kan sende og modtage data til **flere klienter samtidigt** inden for samme frekvenskanal — hvilket sænker latency og øger effektiviteten i tætpakkede miljøer.

### IEEE 802.11 WLAN-standarder
- **802.11 (Legacy, 1997):** `2.4 GHz`, `1` eller `2 Mbps`, DSSS eller FHSS.
- **802.11a (1999):** `5 GHz`, op til **`54 Mbps`** (`6, 9, 12, 18, 24, 36, 48, 54 Mbps`), OFDM.
- **802.11b (1999):** `2.4 GHz`, op til **`11 Mbps`** (samt `5.5 Mbps`), DSSS.
- **802.11g (2003):** `2.4 GHz`, op til **`54 Mbps`**, OFDM (bagudkompatibel med `802.11b` via DSSS).
- **802.11n (Wi-Fi 4, 2009):** `2.4 GHz` og/eller `5 GHz`, OFDM, hastigheder over **`300 Mbps`** (op til `600 Mbps`). Introducerede:
  - **MIMO (*Multiple Input, Multiple Output*):** Bruger flere antenner til både afsendelse og modtagelse via *spatial multiplexing* uden indbyrdes interferens.
  - **Channel Bonding (`40 MHz mode`):** Binder to tilstødende `20 MHz`-kanaler logisk sammen til én `40 MHz`-kanal med dobbelt båndbredde.
- **802.11ac (Wi-Fi 5):** Kun **`5 GHz`**, OFDM, hastigheder over **`3 Gbps`**. Introducerede **MU-MIMO (*Multi-User MIMO*)** (downstream), så et AP kan kommunikere med flere klienter samtidigt via flere antenner.
- **802.11ax (Wi-Fi 6 / Wi-Fi 6E):** Opererer i **`2.4 GHz`, `5 GHz` og `6 GHz`**, op til **`9.6 Gbps`**, benytter **OFDMA** samt **MU-MIMO i både downstream og upstream**, lavere latency og forbedret strømbesparelse.
- **802.11be (Wi-Fi 7):** Næste generation af Wi-Fi på tværs af `2.4 GHz`, `5 GHz` og `6 GHz` med endnu højere hastighed, lavere latency og højere pålidelighed.

![[Table 5-3 - Characteristics of 802.11 Standards.png]]

### Cellular (Mobilnetværk)
Mobilnetværk giver trådløs WAN- og internetforbindelse til smartphones, laptops (via **tethering** eller dedikerede **mobile hotspots**, der typisk deler forbindelsen med op til 5 Wi-Fi-enheder) og IoT/branch-routere:
- **Generationer:** Fra ældre `2G (EDGE)` og `3G` til `4G`, **LTE (*Long-Term Evolution*)** (op til `100 Mbps` for mobile enheder og `1 Gbps` for stationære enheder), `HSPA+` og **5G**.
- **Radiosystemer:** De to historiske hovedfamilier er **CDMA (*Code-Division Multiple Access*)** og **GSM (*Global System for Mobile Communications*)**, hvor GSM benytter **TDMA (*Time-Division Multiple Access*)** i sin drift.

### Satellite WAN
I landdistrikter, på skibe eller fjerntliggende lokationer uden adgang til fiber, DSL eller kabel-tv-net kan **satellit-WAN** anvendes. De fleste traditionelle kommunikationssatellitter befinder sig i geostationær bane ca. **22.300 miles (ca. 35.800 km)** over ækvator og kræver frit udsyn (*line-of-sight*) til himlen.

![[Figure 5-2 - Satellite WAN Sample Topology.png]]

- **Vigtige designudfordringer ved satellit:**
  1. **Høj forsinkelse (*Propagation Delay / Latency*):** Selvom radiobølger bevæger sig med lysets hastighed ($186.000\text{ miles/s}$ eller $3 \times 10^8\text{ m/s}$), giver den lange rejse fra kunden op til satellitten og ned til jordstationen (og retur) en betydelig *propagation delay* på omkring **240–250 ms** pr. vej (ca. 500 ms round-trip), hvilket påvirker realtidsapplikationer som VoIP.
  2. **Vejrfølsomhed (*Weather Sensitivity* / *Rain Fade*):** Kraftig regn, sne og tordenvejr i atmosfæren kan svække eller midlertidigt afbryde satellitsignalet.

---

## 2. Kobbermedier og Stiktyper (Copper Media and Connectors)

### Coaxial Cable (Koaksialkabel) og Twinax / DAC
Et **coaxial-kabel (coax)** består af en indre isoleret kobberleder omgivet af et isolerende lag og en ydre skærm af metalfolie eller flettet metaltråd, der beskytter mod **EMI (*Electromagnetic Interference*)** / **RFI (*Radio Frequency Interference*)**.

![[Figure 5-3 - Coaxial Cable.png]]

- **Almindelige typer af coax-kabler:**
  - **RG-59 (`75 Ohm`):** Bruges til korte afstande, f.eks. composite video eller ældre CCTV; har for stort signaltab til lange kabeltræk.
  - **RG-6 (`75 Ohm`):** Tykkere leder og bedre skærmning end RG-59; standardkablet til **kabel-tv (CATV)** og bredbånds-**kabelmodemmer**.
  - **RG-58 (`50 Ohm`):** Brugt i tidlige **10BASE2 ("thinnet")** Ethernet-netværk.
- **Coax-stiktyper:**
  - **BNC (*Bayonet Neill–Concelman*):** Bajonetstik med drejelås, brugt i 10BASE2 Ethernet og professionelt RF-/videoudstyr.
  - **F-type Connector (*F-connector*):** Skruestik, der anvendes på RG-6/RG-59 til kabelmodemmer og tv-forbindelser.

![[Figure 5-4 - Coaxial Cable Connectors.png]]

- **Twinaxial (Twinax) og Direct Attach Copper (DAC):**
  - **Twinax** minder om coax, men har **to** indre kobberledere i stedet for én.
  - **DAC (*Direct Attach Copper*)** er et færdigtermineret twinax-kobberkabel med fastmonterede transceiver-stik (f.eks. SFP+ eller QSFP+) i begge ender. Det bruges i **datacentre** til meget korte forbindelser (typisk `1–2 meter`, op til ca. `5–10 meter`) mellem switche og servere som et billigt og strømbesparende alternativ til fiberoptiske transceivere.

---

### Twisted-Pair Cable (Snoet parkabel: STP vs. UTP)
**Twisted-pair** er det mest udbredte LAN-medie og består af parvist snoede, isolerede kobberledere. Snoningen (*twisting*) gør, at de to ledere i et par ophæver elektromagnetisk udstråling og støj udefra (**EMI**) samt overhør mellem parrene (**crosstalk**). Jo tættere snoning (flere snoninger pr. centimeter), desto højere frekvenser og hastigheder understøttes.

- **STP (*Shielded Twisted Pair*):** Har en ekstra metalfolie- eller flettet skærm omkring hvert trådpar og/eller hele kablet for maksimal beskyttelse mod EMI, men er dyrere og stivere at arbejde med.

![[Figure 5-5 - Shielded Twisted Pair.png]]

- **UTP (*Unshielded Twisted Pair*):** Har ingen metalskærm, men beror udelukkende på tæt og varieret snoning af parrene for at modvirke EMI og crosstalk. UTP er billigere og lettere at installere og er standardvalget i de fleste kontor-LANs.

![[Figure 5-6 - Unshielded Twisted Pair.png]]

#### UTP-kabelkategorier (Cable Speeds)
| Kategori | Standard / Anvendelse | Maks. båndbredde | Maks. afstand | Bemærkninger |
| :--- | :--- | :--- | :--- | :--- |
| **Cat 5** | `100BASE-TX` (Fast Ethernet) | `100 Mbps` (op til `155 Mbps` ATM) | `100 m` | Ældre standard, afløst af Cat 5e |
| **Cat 5e** | `1000BASE-T` (Gigabit Ethernet) | `1 Gbps` | `100 m` | Forbedret Cat 5 med reduceret *crosstalk* |
| **Cat 6** | `1000BASE-T` / `10GBASE-T` | `1 Gbps` (`10 Gbps` på kort afstand, `55 m`) | `100 m` (`1 Gbps`) | Tykkere isolering (ofte 22/23 AWG) og mindre crosstalk |
| **Cat 6a** | `10GBASE-T` (10-Gigabit Ethernet) | `10 Gbps` | `100 m` | *Augmented Cat 6*; dobbelt frekvenskapacitet ift. Cat 6 |
| **Cat 7** | Proprietær / ISO-specifikation | `10 Gbps` | `100 m` | Ikke en IEEE-standard; fuldt skærmet, sjældent brugt |
| **Cat 8** | `40GBASE-T` (Datacenter) | **`40 Gbps`** | **`30–36 m`** | Ideel til korte højhastighedslinks mellem multilayer-switche i datacentre |

#### TIA/EIA-568A og 568B, Kabeltyper og MDI/MDIX
- **TIA/EIA-568A og TIA/EIA-568B:** Definerer farvekodning og pinout for de 8 ledere i et RJ45-stik (`568B` er den mest udbredte i USA og mange erhvervsinstallationer).
- **Straight-Through Cable:** Samme pinout i begge ender (`568B` til `568B`, eller `568A` til `568A`). Bruges til at forbinde **forskellige** enhedstyper, f.eks. en PC (**MDI** – *Media-Dependent Interface*, der sender på pin `1, 2` og modtager på pin `3, 6`) til en switchport (**MDIX** – *Media-Dependent Interface Crossover*, der modtager på pin `1, 2` og sender på pin `3, 6`).
- **Crossover Cable:** Bytter om på sende- og modtageparrene (`Pin 1 ↔ 3` og `Pin 2 ↔ 6`, dvs. `568A` i den ene ende og `568B` i den anden). Bruges traditionelt til at forbinde **ens** enheder direkte (PC-til-PC eller switch-til-switch). *(Bemærk: En **T1 crossover** bytter `1 ↔ 4` og `2 ↔ 5`).*
  - **Auto-MDI/MDIX:** De fleste moderne switche registrerer automatisk porttypen og tilpasser sende-/modtageparrene, så både straight-through og crossover kabler virker.
- **Rollover Cable (Console Cable):** Spejlvender alle 8 pins (`Pin 1 ↔ 8, 2 ↔ 7, 3 ↔ 6, 4 ↔ 5`). Bruges til at forbinde en PC's serielle port til konsolporten på en router eller switch.

#### Stiktyper til Twisted-Pair og Seriel
- **RJ45 (Registered Jack 45):** 8-pins stik (8P8C), der anvendes som standard i Ethernet-netværk.
- **RJ11 (Registered Jack 11):** 6-positions stik (typisk med 2 eller 4 aktive ledere), der anvendes til traditionel analog telefoni (POTS) og DSL.
- **DB-9 (RS-232):** 9-pins D-subminiature serielt stik, brugt til asynkron seriel kommunikation (f.eks. konsolforbindelse til netværksudstyr).

![[Figure 5-7 - Twisted-Pair Cable Connectors.png]]

#### Plenum vs. Non-plenum (Riser/PVC) Cable
- **Plenum-kabel:** Hvis kabler trækkes i *plenum-rum* (hulrum over sænkede lofter eller under hævede gulve, der fungerer som åbne luftkanaler for bygningens **HVAC**/ventilationssystem), kræver bygnings- og brandregulativer **plenum-rated** kabel. Kappen er lavet af brandhæmmende materiale (f.eks. **FEP** eller *low-smoke PVC*), der udvikler langt mindre røg og ingen giftige gasser ved brand.
- **Non-plenum (PVC / Riser) kabel:** Har en almindelig PVC-kappe, som er billigere, men afgiver giftig røg ved brand og derfor ikke må installeres i ventilationskanaler/plenum-rum.

---

## 3. Fiberoptiske Medier, Stik og Ethernet-standarder

**Fiberoptiske kabler** transmitterer data som **lysimpulser** (genereret af en **laser** eller **LED**) gennem en tynd glaskerne (*core*) omgivet af et glaslag med et andet brydningsindeks (*cladding*). Fordi lyset brydes og reflekteres totalt inde i kernen (**Total Internal Reflection** baseret på forskellen i *refractive index*), bliver lyset inde i fiberen.
- **Fordele ved fiber:** 100 % immun over for **EMI/RFI** og elektrisk støj, umulig at aflytte elektromagnetisk, meget høj båndbredde og langt større rækkevidde end kobber.

![[Figure 5-8 - Example - Refractive Index.png]]

### Multimode Fiber (MMF) vs. Single-Mode Fiber (SMF)
1. **Multimode Fiber (MMF):**
   - Har en **større kernediameter** (typisk `50 µm` eller `62.5 µm`) og bruger ofte billigere **LED**- eller VCSEL-lyskilder ved bølgelængder på **`850 nm` eller `1300 nm`**.
   - Fordi kernen er bred, kan lysstråler bevæge sig ad flere forskellige vinkler/veje (*multiple modes of propagation*). Det medfører **multimode delay distortion (modal dispersion)** over længere afstande, hvilket begrænser rækkevidden til typisk **300–550 meter** (op til 2 km ved lavere hastigheder).

![[Figure 5-9 - Light Propagation in Multimode Fiber.png]]

2. **Single-Mode Fiber (SMF):**
   - Har en **meget lille kernediameter** (ca. `8–10 µm`), der kun tillader **én enkelt lysbane (*single mode*)**, og anvender kraftige **lasere** ved bølgelængder på **`1310 nm` eller `1550 nm`**.
   - Eliminerer modal dispersion og kan derfor transmittere data over **mange kilometer** (`5 km`, `10 km`, `40 km`, `70+ km`), men både kabel og laser-transceivere er dyrere end MMF.

![[Figure 5-10 - Light Propagation in Single-Mode Fiber.png]]

### Fiberoptiske Stiktyper (Fiber Connectors) og Polering
- **ST (*Straight Tip*):** Rundt bajonetstik med lang spids, der skubbes ind og drejes på plads (*twist-lock*); ses ofte på ældre MMF-installationer.
- **SC (*Subscriber Connector* / *Square Connector* / *Standard Connector*):** Firkantet *push-pull*-stik, der klikker på plads.
- **LC (*Local Connector* / *Lucent Connector*):** Kompakt *push-pull*-stik med låsetap (halv størrelse af SC), som er standardstikket på moderne **SFP/SFP+**-transceivere.
- **MTRJ (*Mechanical Transfer Registered Jack*):** Kompakt stik, der samler **både sende- og modtagefiberen (2 fibre)** i én samlet ferrule med låsemekanisme som et RJ45-stik.
- **MPO (*Multi-fiber Push On*):** High-density datacenterstik, der samler **12, 24 eller flere fibre** i ét enkelt stik til `40G`/`100G`/`400G`-forbindelser.

![[Figure 5-11 - Common Fiber-Optic Connectors.png]]

- **Fiber Connector Polishing Styles (Slibning af ferrulen):** Påvirker mængden af tilbagekastet lys (*return loss* / *back reflection*):
  - **PC (*Physical Contact*):** Let buet overflade (basis-kvalitet).
  - **UPC (*Ultra Physical Contact*):** Finere polering med meget lavt signaltab (typisk blå stik).
  - **APC (*Angled Physical Contact*):** Ferrulen er slebet i en **8-graders vinkel** (typisk grønne stik), så eventuelt reflekteret lys kastes ud i claddingen i stedet for tilbage mod laserkilden.

---

### IEEE 802.3 Ethernet-standarder
Navngivningen i Ethernet følger mønstret: **`<Hastighed>BASE-<Medie/Signaleringskode>`**, hvor `BASE` står for *Baseband* (hele kablets båndbredde bruges til ét digitalt signal):
- **10BASE5 ("Thicknet"):** `10 Mbps` over tykt coax-kabel, maks. **`500 meter`**.
- **10BASE2 ("Thinnet" / "Cheapernet"):** `10 Mbps` over RG-58 coax med BNC-stik, maks. **`185 meter`**.
- **10BASE-T:** `10 Mbps` over UTP (Cat 3+), maks. **`100 meter`**.

![[Figure 5-12 - 10BASE5 Cable.png]]

![[Figure 5-13 - Coaxial Cable Used for 10BASE2.png]]

![[Figure 5-14 - UTP Cable Used for 10BASE-T.png]]

![[Table 5-4 - Ethernet Bandwidth Capacities.png]]

![[Table 5-5 - Types of Ethernet.png]]

> **Huskeregel til eksamen for fiber-betegnelser:**
> - **`S` (*Short wavelength*, `850 nm`):** Bruger **MMF** over kortere afstande (`1000BASE-SX` = 550 m, `10GBASE-SR` = op til 400 m).
> - **`L` (*Long wavelength*, `1310 nm`):** Bruger **SMF** over mellemlange afstande (`1000BASE-LX` = 5 km, `10GBASE-LR` = 10–25 km).
> - **`E` / `Z` (*Extended*, `1550 nm`):** Bruger **SMF** over lange afstande (`10GBASE-ER` = 40 km, `1000BASE-ZX` = 70 km).
> - **`T` (*Twisted-pair*):** Kobber UTP/STP, maks. **100 meter** (undtagen `40GBASE-T` på Cat 8, som er maks. **30 meter**).

---

## 4. Transceivere, Optisk Multiplexing og Media Converters

### Transceivere (Transmitter + Receiver)
En **transceiver** er et modulært stikmodul, der kombinerer både en sender (*transmitter*) og en modtager (*receiver*) og indsættes i en port på en switch, router eller server for at tilpasse porten til enten kobber eller fiber (SMF/MMF) og til enten **Ethernet** eller **Fibre Channel (FC)** i SAN-miljøer:
- **GBIC (*Gigabit Interface Converter*):** Ældre, større modul til `1 Gbps`.
- **SFP (*Small Form-Factor Pluggable* / "mini-GBIC"):** Kompakt modul til **`1 Gbps`** (bruger typisk LC-stik til fiber eller RJ45 til kobber).
- **SFP+ (*Enhanced SFP*):** Samme fysiske størrelse som SFP, men understøtter op til **`10 Gbps`** (eller `16 Gbps` Fibre Channel).
- **QSFP (*Quad SFP*) & QSFP+:** Samler **4 kanaler** i ét modul ($4 \times 1\text{ Gbps} = 4\text{ Gbps}$ for QSFP, eller $4 \times 10\text{ Gbps} = \mathbf{40\text{ Gbps}}$ for **QSFP+**, og op til `100 Gbps+` i nyere varianter som QSFP28).

### Multiplexing i Fiberoptiske Netværk (WDM)
For at udnytte ét enkelt fiberkabel maksimalt kan flere uafhængige datastrømme sendes samtidigt ved hjælp af **forskellige lysbølgelængder (farver af lys)**:
- **Bidirectional WDM (*Wavelength-Division Multiplexing*):** Sender og modtager på to forskellige bølgelængder over **én enkelt fibertråd** (fuld duplex på én fiber).
- **CWDM (*Coarse Wavelength-Division Multiplexing*):** Benytter **færre end 8 aktive bølgelængder** pr. fiber med bredere afstand mellem kanalerne (billigere udstyr, kortere afstande).
- **DWDM (*Dense Wavelength-Division Multiplexing*):** Pakker bølgelængderne ekstremt tæt (flere end 8 aktive bølgelængder — typisk op til **32, 64 eller 160 samtidige transmissioner** på én enkelt fiber) til langdistance-backbone-netværk.

### Media Converters
En **Media Converter** er en Layer 1-enhed, der oversætter signalet mellem to forskellige fysiske medietyper, så de kan kobles sammen:
- **MMF til Ethernet (UTP)**
- **SMF til Ethernet (UTP)**
- **Fiber til Coaxial**
- **SMF til MMF**

---

## 5. Real-World Case Study & Nøgleemner

I kapitlets case-studie gennemgår netværksingeniørerne hos *Acme, Inc.* deres fysiske kabling: De bevarer eksisterende **Cat 5e** (`1 Gbps`) til almindelige kontorarbejdspladser, men udruller **Cat 8** (`40 Gbps` over op til `30–36 m`) mellem højhastigheds multilayer-switche i distributions- og kernelaget samt opgraderer det trådløse netværk til **Wi-Fi 6 (802.11ax)** for bedre kapacitet i tætbefolkede kontorområder.

![[Table 5-6 - Key Topics for Chapter 5.png]]
