---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - Kapitel 22 - Troubleshoot Common Cabling Problems
  - Troubleshoot Common Cabling Problems
---

# CompTIA Network+ N10-009: Kapitel 22 – Troubleshoot Common Cabling Problems

**Sider i bogen:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 22 - Troubleshoot Common Cabling Problems.pdf]]  
**For termer og udtryk, se:** [[NA - Begrebsark]] Kap. 22

---

## Resumé

Kapitel 22 dækker **Objective 5.2 (Given a scenario, troubleshoot common cabling and physical interface issues)** i CompTIA Network+ N10-009-pensummet og fokuserer på fejlsøgning af problemer på det fysiske lag (Lag 1) og datalink-laget (Lag 2) samt de fysiske måle- og installationsværktøjer, man anvender i praksis.

Kapitlet indleder med de tre grundlæggende specifikationer og begrænsninger for ethvert transmissionsmedie: **Throughput**, **Speed** og **Distance**. Herefter gennemgås **Common Cable Issues**: valg af korrekt fiber (*Single-mode vs. Multimode*) og kobberkabel (*STP vs. UTP* samt *Category 5/5e/6/6a/7/8*), brandsikkerhedskrav (*Plenum-rated vs. Riser-rated*), signalforringelse (**Attenuation / dB loss**, **Interference / EMI** og **Crosstalk**), fysiske kabelfejl (*Open/Short*, *Incorrect pinouts*, *Improper termination*, *Dirty optical cables*) samt **Speed/Duplex mismatch** og ombyttede **TX/RX-ledere (Transmitter/Receiver transposed)** (og hvordan *Auto-MDI/MDIX* løser dette). Dernæst behandles **Common Interface Issues** – herunder stigende interface-fejl-tællere (**CRC errors**, **Runts < 64 bytes**, **Giants > 1518 bytes** og **Drops**) samt portstatusserne (**Error disabled**, **Administratively down** og **Suspended**). Under **Common Hardware Issues** gennemgås **PoE-problemer** (*Power budget exceeded*, forkert PoE-standard eller kabel under Cat 5e) og **Transceiver-problemer** (*Mismatch* og signalstyrke). Kapitlet afsluttes med en gennemgang af de vigtigste fysiske værktøjer: **Cable Crimper**, **Punchdown Tool**, **Loopback Plug**, **TDR / OTDR**, **Multimeter**, **Wire Map Tester**, **Fusion Splicer**, **Spectrum Analyzer**, **Snips/Cutters**, **Cable Stripper** og **Fiber Light Meter**.

---

## 1. Specifikationer og Begrænsninger for Fysiske Medier

Når man vurderer og fejlsøger kabler på Lag 1, skal man altid holde øje med tre grundlæggende parametre:
1. **Throughput (Gennemstrømning):** Den faktiske mængde data, der transporteres over mediet i løbet af en given tidsperiode.
2. **Speed (Hastighed):** Den maksimale datatransmissionsrate, som kablingen er certificeret til (f.eks. understøtter Cat 6 op til 10 Gbps på kortere afstande).
3. **Distance (Afstand):** Når et signal bevæger sig længere hen ad et kabel (eller gennem luften), svækkes det gradvist (**Attenuation**). Overskrides mediets maksimale afstand (f.eks. 100 meter for standard twisted-pair Ethernet), opstår der pakketab og forbindelsesfejl.

---

## 2. Almindelige Kablingsproblemer (Common Cable Issues)

### 2.1 Forkert kabeltype og Brandklassificering
- **Single-Mode Fiber (SMF) vs. Multimode Fiber (MMF):**
  - **Single-Mode (SMF):** Meget lille kerne, der kun tillader én lysstråle (*single mode*) fra en laser. Bruges til **lange afstande** (flere kilometer) og høj båndbredde.
  - **Multimode (MMF):** Større kerne, der tillader flere lysstråler (*multiple modes*, typisk LED/VCSEL). Ideel til **kortere afstande** (f.eks. inden for et datacenter eller mellem bygninger på en campus), men lider af *modal dispersion* over lange afstande.
- **STP (Shielded Twisted Pair) vs. UTP (Unshielded Twisted Pair):**
  - **STP:** Indeholder en metallisk folie- eller flet-skærm omkring trådparrene, som beskytter mod kraftig **EMI (Electromagnetic Interference)** (f.eks. i fabrikker med store elmotorer), men er dyrere og stivere at arbejde med.
  - **UTP:** Har ingen metalskærm, men bruger i stedet **tættere snoning (twists)** af trådparrene til at modvirke EMI og crosstalk til en langt lavere pris.
- **Kabelkategorier (Category 5 / 5e / 6 / 6a / 7 / 8):** Brug af en for lav kabelkategori (f.eks. et gammelt Cat 5-kabel på et 1 Gbps eller 10 Gbps link, eller under Cat 5e til PoE) fører til ustabil forbindelse, lav hastighed eller manglende strømforsyning. Cat 6/6a er i dag minimumstandarden ved nyinstallationer.
- **Plenum-rated vs. Riser-rated Kabler (Brandsikkerhed):**
  - **Plenum-rated:** Skal anvendes i **plenum-områder** (hulrum over nedhængte lofter eller under hævede gulve, der fungerer som luftkanaler for bygningens **HVAC**-ventilationsanlæg). Plenum-kabler har en brandhæmmende kappe (f.eks. FEP eller low-smoke PVC), der **ikke udvikler giftig røg**, hvis det brænder.
  - **Riser-rated:** Bruges i lodrette skakter (*risers*) mellem etager. Er brandhæmmende for at forhindre ild i at sprede sig fra etage til etage, men har mindre strenge røgkrav end plenum-kabler (derfor kan *plenum* altid erstatte *riser*, men *riser* må aldrig bruges i et *plenum*-rum!).

### 2.2 Signalforringelse (Signal Degradation)
| Problem | Beskrivelse og årsag |
| :--- | :--- |
| **Attenuation & Decibel (dB) Loss** | **Svækkelse (tab af signalstyrke)** efterhånden som det elektriske eller optiske signal bevæger sig over for lang afstand, eller gennem for mange *splits*, konnektorer og samlinger (*splices*), målt som **dB loss**. |
| **Interference (EMI / RFI)** | Udefrakommende elektromagnetisk støj (fra lysstofrør, elmotorer, højspændingskabler eller radiokilder), der forvrænger signalet i kobberkabler. *(Fiberoptiske kabler er 100 % immune over for EMI!).* |
| **Crosstalk (Krydstale)** | Uønsket overførsel/afsmitning af elektriske signaler **fra ét trådpar til et nabotrådpar** inde i det samme kabel (f.eks. *Near-End Crosstalk – NEXT* eller *Far-End Crosstalk – FEXT*), ofte forårsaget af at trådparrene er snoet for meget op ved terminering. |

### 2.3 Fysiske fejl, Terminering og TX/RX-problemer
- **Open / Short (Åben / Kortslutning):**
  - **Open:** En knækket kobberleder inde i kablet, så strømmen slet ikke kan løbe igennem kredsløbet.
  - **Short:** To blottede kobberledere rører ved hinanden, så strømmen kortslutter mellem dem.
- **Improper Termination, Incorrect Pinouts & Bent Pins:** Hvis RJ-45-stikket eller patchpanelet er monteret sjusket, hvis lederne er sat i forkert rækkefølge (f.eks. uforvarende blandet TIA/EIA-568A og 568B), eller hvis benene i stikket er bøjede, opstår der periodiske udfald, lav ydelse eller totalt link-tab.
- **Dirty Optical Cables (Snavsede fiberstik):** Støv eller fedtfingre på endefladen (*end face*) af et fiberstik kan dæmpe eller helt blokere lyssignalet. Renses med specialdesignede optiske våd-/tør-rensesæt.
- **Transmitter (TX) / Receiver (RX) Transposed (Ombyttet TX og RX):**
  - For at to enheder kan tale sammen, skal afsenderens **TX (Transmit)** ramme modtagerens **RX (Receive)**.
  - På kobber-Ethernet løser **Auto-MDI/MDIX** normalt dette automatisk, men hvis Auto-MDIX ikke understøttes (eller er slået fra) mellem to ens enheder med et *straight-through* kabel, kolliderer TX mod TX.
  - På **duplex fiberkabler** sker det ofte ved en fejl, at de to fiberstrenges stik byttes om i den ene ende (så TX peger ind i TX, og link-LED forbliver slukket). Løses hurtigt ved at bytte (*roll*) de to fiberstik i den ene ende!
- **Speed and Duplex Mismatch:** Hvis den ene ende af et link f.eks. er sat manuelt til **Full-Duplex**, mens den anden ende falder tilbage til **Half-Duplex**, forbliver linket oppe, men forbindelsen bliver ekstremt langsom og ustabil pga. konstante *late collisions* og **CRC-fejl**.

---

## 3. Almindelige Interface- og Hardwareproblemer

### 3.1 Increasing Interface Counters (Stigende fejltællere på interfaces)
Når man inspicerer en switch- eller routerport (f.eks. med `show interfaces`), afslører tællerne hurtigt, hvilken type fejl der er tale om:
- **CRC (Cyclic Redundancy Check) Errors:** Viser at modtagne frames er blevet **beskadiget/korrumperet under transmissionen**, så den beregnede CRC-checksum ikke stemmer. Skyldes typisk EMI/interferens, defekte kabler, dårlig terminering eller **Duplex Mismatch**.
- **Runts:** Ethernet-frames, der er **mindre end minimumsgrænsen på 64 bytes**. Skyldes næsten altid **kollisioner** (f.eks. pga. half-duplex/duplex mismatch) eller et defekt netkort.
- **Giants:** Ethernet-frames, der **overskrider maksimumsgrænsen på 1.518 bytes** (1.500 bytes MTU + 18 bytes L2 header/FCS), uden at Jumbo Frames er aktiveret på interfacet.
- **Drops:** Pakker som interfacet må **kassere (droppe)** pga. overbelastning (*congestion*), fulde interface-buffere eller utilstrækkelig båndbredde.

### 3.2 Port Status (Fejltilstande på switch-/routerporte)
| Port Status | Årsag og løsning |
| :--- | :--- |
| **Error Disabled (`err-disabled`)** | Switchen har **automatisk lukket porten ned pga. en sikkerhedsovertrædelse** – f.eks. hvis en port med **BPDU Guard** modtager en BPDU fra en uautoriseret switch, eller hvis **Port Security** registrerer en uautoriseret MAC-adresse. Kræver at årsagen fjernes, og at porten genaktiveres (`shutdown` / `no shutdown`). |
| **Administratively Down** | En administrator har **manuelt deaktiveret porten** (eller en routerport er i sin standard-slukkede tilstand). Aktiveres med kommandoen **`no shutdown`**. |
| **Suspended** | Porten er suspenderet og videresender ingen trafik – ses typisk ved **fejlkonfiguration af Link Aggregation (LACP)** eller VLANs, eller ved en hardwarefejl. |

### 3.3 Common Hardware Issues (PoE og Transceivere)
- **Power over Ethernet (PoE) problemer:**
  - *Forkert kabel:* PoE kræver **Cat 5e eller bedre** kobberkabel.
  - *Incorrect Standard:* Hvis en strømkrævende enhed (f.eks. et PTZ-kamera eller Wi-Fi 6 AP, der kræver **PoE+ / 802.3at** op til 32,4 W) tilsluttes en ældre switch, der kun leverer standard **PoE (802.3af – 15,4 W)**, kan enheden ikke starte op.
  - *Power Budget Exceeded:* Hver PoE-switch har et samlet strømbudget (f.eks. 370 W i alt). Hvis man tilslutter for mange PoE-enheder, overskrides switchens **PoE Power Budget**, og de sidst tilsluttede porte nægtes strøm.
- **Transceiver-problemer (SFP / SFP+ / QSFP):**
  - *Transceiver Mismatch:* Transceiveren i begge ender af et fiberlink skal passe til både kabeltypen (SMF vs. MMF), hastigheden og **bølgelængden (wavelength)**. En mismatch gør, at linket ikke kan komme op.
  - *Signal Strength:* For svagt optisk signal (højt tab) eller for kraftigt signal (manglende optisk dæmper på et meget kort single-mode link) forhindrer modtageren i at aflæse signalet.

---

## 4. Fysiske Fejlsøgnings- og Installationsværktøjer (Common Tools)

Kapitlet gennemgår de vigtigste fysiske værktøjer i en netværksteknikers værktøjstaske:

1. **Cable Crimper (Kabeltang, Figur 22-1):** Bruges til at klemme (*crimpe*) et stik (f.eks. et **RJ-45-stik**) fast for enden af et UTP-patchkabel, så metalbenene presses ind i lederne. Har ofte en indbygget **Cable Stripper / Cutter**.

![[Figure 22-1 - Crimper.png]]

2. **Punchdown Tool (Kronetang / Indslagsværktøj):** Bruges til at presse og terminere individuelle kobberledere ned i knivkontakterne på en **punchdown block (f.eks. 110-block)** eller bag på et **patchpanel / keystone-jack**, mens overskydende tråd automatisk klippes af.
3. **Loopback Plug (Kobber eller Fiber, Figur 22-2):** Et lille teststik, der forbinder portens **Transmit (TX)-ben direkte tilbage til dens egne Receive (RX)-ben**. Bruges sammen med diagnostisk software til at verificere, at selve den fysiske port/transceiver på en switch, router eller server fungerer og kan sende og modtage til sig selv.

![[Figure 22-2 - Fiber-Optic Loopback Plug.png]]

4. **TDR (Time-Domain Reflectometer) og OTDR (Optical Time-Domain Reflectometer, Figur 22-3):**
   - **TDR (til kobberkabler)** sender en elektrisk impuls ned gennem kablet, mens **OTDR (til lyslederkabler/fiber)** sender en lysimpuls ned gennem fiberen.
   - Ud fra refleksionen og lysets/strømmens hastighed måler instrumentet ikke blot, *om* der er et brud, en bøjning eller en dårlig samling, men beregner **præcis hvor mange meter ude ad kablet fejlen befinder sig**!

![[Figure 22-3 - Optical Time-Domain Reflectometer.png]]

5. **Multimeter (Figur 22-4):** Måler elektriske egenskaber i kobberkabler og strømkredsløb: **modstand ($\Omega$ – ohm)** til kontinuitetstest (ca. $0\ \Omega$ = ubrudt forbindelse; $\infty\ \Omega$ = *open*/brud), **spænding (V – volt)** (f.eks. til at tjekke PoE DC-spænding) og **strømstyrke (A – ampere)**.

![[Figure 22-4 - Multimeter.png]]

6. **Wire Map Tester (Kabeltester):** Tester et 4-par UTP-kabel fra ende til ende for at sikre, at alle 8 ledere har gennemgang og sidder på de rigtige ben. Afslører **Opens**, **Shorts**, **Reversed pairs**, **Crossed pairs** og **Split pairs**.
7. **Fusion Splicer (Fibersvejser):** Svejser to optiske fiberender permanent og præcist sammen ved hjælp af elektrisk varme/lysbue med minimalt signaltab (dB loss) og refleksion.
8. **Fiber Light Meter (Optical Power Meter):** Måler den faktiske **optiske lysstyrke/effekt** (i dBm/mW) for enden af et fiberkabel for at verificere, at signaltabet ligger inden for det tilladte *optical link budget*.
9. **Spectrum Analyzer (Spektrumanalysator):** Måler signalstyrke (amplitude) over for frekvens på tværs af hele frekvensspektret for at finde både kendte signaler og skjulte RF-interferenskilder.
10. **Snips / Cutters og Cable Stripper:** Skæreværktøj til præcis afklipning af kabler samt afisoleringsværktøj til at fjerne yderkappen på UTP/koaksialkabler uden at beskadige de indre ledere.

---

## 5. Nøgleemner til Eksamen (Key Topics)

![[Table 22-1 - Key Topics for Chapter 22.png]]

### Hurtige eksamenstips (Exam Cram)
- **Plenum vs. Riser:** **Plenum-rated** kabel er lovpligtigt i ventilationshulrum (HVAC) for at undgå giftig røg ved brand.
- **Runts vs. Giants vs. CRC vs. Drops:** **Runts** (< 64 bytes, skyldes kollisioner) | **Giants** (> 1518 bytes) | **CRC** (beskadigede frames, ofte EMI eller **Duplex Mismatch**) | **Drops** (fulde buffere / congestion).
- **Port Status ved BPDU Guard / Port Security violation:** **`Error disabled` (`err-disabled`)**.
- **Loopback Plug:** Gør det muligt for et netværksinterface at kommunikere med sig selv (TX $\rightarrow$ RX) for at teste selve porten.
- **TDR / OTDR:** Finder den **præcise afstand** hen til et kabelbrud på hhv. kobber og fiber.
