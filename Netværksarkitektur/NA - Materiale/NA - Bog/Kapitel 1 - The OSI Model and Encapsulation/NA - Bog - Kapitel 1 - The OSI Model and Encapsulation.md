---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - Kapitel 1 - The OSI Model and Encapsulation
  - Kapitel 1 -The OSI Model and Encapsulation
  - The OSI Model and Encapsulation
---

# CompTIA Network+ N10-009: Kapitel 1 – The OSI Model and Encapsulation

**Sider i bogen:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 1 -The OSI Model and Encapsulation.pdf]]  
**For termer og udtryk, se:** [[NA - Begrebsark]] Kap. 1

---

## Resumé

Kapitel 1 dækker **Objective 1.1 (Explain concepts related to the Open Systems Interconnection [OSI] reference model)** i CompTIA Network+ N10-009-pensummet og danner det teoretiske fundament for hele bogen.

Kapitlet forklarer først **formålet med referencemodeller**: at skabe en fælles, leverandøruafhængig referenceramme (analogt til en bogreol med hylder, hvor beslægtede teknologier organiseres) og en struktureret metode til netværksfejlsøgning. Herefter gennemgås **OSI-modellens 7 lag** fra Lag 1 (*Physical*) til Lag 7 (*Application*) sammen med deres respektive **Protocol Data Units (PDUs)**: **Bits** (Lag 1), **Frames** (Lag 2), **Packets** (Lag 3), **Segments** (Lag 4) og **Data** (Lag 5–7). For hvert lag gennemgås de konkrete tekniske mekanismer: på Lag 1 behandles bit-repræsentation (*Current State Modulation* vs. *Transition Modulation*), kabling/stik (*TIA/EIA-568-B*), fysisk topologi, bit-synkronisering (*Asynchronous* vs. *Synchronous*), båndbreddeudnyttelse (*Baseband* vs. *Broadband*) og multipleksing (*TDM*, *StatTDM*, *FDM*, *OFDM*, *OFDMA*). På Lag 2 gennemgås **MTU (Maximum Transmission Unit)** samt opdelingen i underlagene **MAC** (48-bit fysiske MAC-adresser med 24-bit OUI, logisk topologi, medieadgang) og **LLC** (flow control, error control med *parity bits* og **CRC**, samt *Isochronous*, *Asynchronous* og *Synchronous* synkronisering). På Lag 3 dækkes logisk adressering (IP), *Packet/Circuit/Message switching*, routingtabeller og *packet reordering*. På Lag 4 sammenlignes **TCP** (forbindelsesorienteret, sekvensnumre, acknowledgments, **Sliding Window**) og **UDP** (forbindelsesløs, lavt overhead) samt *Buffering*. Lag 5–7 gennemgår sessionsstyring (f.eks. SIP), dataformatering/kryptering (ASCII/EBCDIC, TLS) og applikationstjenester. Endelig sammenlignes de 7 OSI-lag med den praktiske **4-lags TCP/IP-stak** (*Network Interface*, *Internet*, *Transport* og *Application*), header-formaterne for **IPv4**, **TCP** og **UDP**, **indkapsling (encapsulation) og udpakning (decapsulation)** samt brugen af **portnumre** (*Well-known ports* `0–1023` og *Ephemeral ports* `> 1023`).

---

## 1. Formålet med Referencemodeller

I 1977 nedsatte **ISO (International Organization for Standardization)** en komité for at skabe en åben standard, der gjorde det muligt for netværksudstyr fra forskellige producenter at kommunikere sammen (*interoperability*). Resultatet blev **OSI-referencemodellen (Open Systems Interconnection)**.

- **Fælles referenceramme og sprog:** Gør det muligt at beskrive og sammenligne netværksprotokoller og -enheder ud fra hvilket lag (eller hvilke lag), de opererer på.
- **Struktureret fejlsøgning (Troubleshooting):** Gør det muligt at isolere netværksfejl systematisk lag for lag (se også Kapitel 21).
- **Bogreol-metaforen (*Reference, not Reverence*):** Forfatteren sammenligner OSI-modellen med en bogreol (Figur 1-1), hvor hver hylde organiserer en bestemt kategori af protokoller og funktioner. Modellen er en konceptuel rettesnor – ikke en ufravigelig naturlov – og nogle protokoller spænder over flere lag.

![[Figure 1-1 - A Bookcase Is Analogous to the OSI Model.png]]

---

## 2. Overblik over OSI-modellen og PDUs (Protocol Data Units)

OSI-modellen består af **7 lag**, hvor **Lag 1 (Physical)** ligger nederst tættest på det fysiske kabel/medie, og **Lag 7 (Application)** ligger øverst tættest på slutbrugeren (Figur 1-2).

![[Figure 1-2 - The OSI Stack.png]]

### 2.1 Huskeregler (Mnemonics) og PDU-navne
- **Fra bund til top (Lag 1 $\rightarrow$ Lag 7):** **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way (*Physical, Data Link, Network, Transport, Session, Presentation, Application*).
- **Fra top til bund (Lag 7 $\rightarrow$ Lag 1):** **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing.
- **PDU-huskeregel (Lag 4 $\rightarrow$ Lag 1):** **S**ome **P**eople **F**ear **B**irthdays (**S**egment, **P**acket, **F**rame, **B**its).

| OSI Lag # | Lagets navn | PDU (Protocol Data Unit) | Primært ansvar | Typiske enheder / protokoller |
| :---: | :--- | :--- | :--- | :--- |
| **Lag 7** | **Application** | Data | Netværkstjenester til applikationer, service-annoncering | HTTP/HTTPS, DNS, SMTP, IMAP, SSH |
| **Lag 6** | **Presentation** | Data | Dataformatering (kodning) og kryptering | ASCII, EBCDIC, TLS/SSL-kryptering |
| **Lag 5** | **Session** | Data | Oprettelse, vedligeholdelse og nedlukning af sessioner | SIP, NetBIOS |
| **Lag 4** | **Transport** | **Segment** *(TCP) / Datagram (UDP)* | Pålidelig/upålidelig transport, portnumre, flow control (windowing/buffering) | TCP, UDP |
| **Lag 3** | **Network** | **Packet** (Pakke) | Logisk adressering og routing mellem netværk | Router, Multilayer Switch, IPv4, IPv6, ICMP |
| **Lag 2** | **Data Link** | **Frame** (Ramme) | Fysisk adressering (MAC), MTU, fejlcheck (CRC), MAC/LLC-underlag | Switch, Bridge, NIC, Ethernet (802.3), PPP, HDLC |
| **Lag 1** | **Physical** | **Bits** (`1` og `0`) | Elektrisk/optisk/RF bit-transmission, stik, fysisk topologi, multipleksing | Hub, Access Point (RF), Kabler, RJ-45 |

![[Figure 1-3 - PDU Names.png]]

---

## 3. Gennemgang af OSI-modellens 7 Lag

### 3.1 Layer 1: The Physical Layer (Det fysiske lag)
Det fysiske lag (Figur 1-4) definerer de elektriske, optiske, mekaniske og fysiske specifikationer for at sende rå **bits (`1` og `0`)** over et netværksmedie.

![[Figure 1-4 - Layer 1 - The Physical Layer.png]]

1. **Repræsentation af bits på mediet (Modulation):**
   - **Current State Modulation (Tilstandsmodulation):** En bestemt elektrisk spænding (på kobber) eller tilstedeværelse af lys (på fiber) repræsenterer et binært `1`, mens fravær af spænding/lys repræsenterer et `0` (Figur 1-5).
   - **State Transition Modulation (Overgangsmodulation):** Det er selve *skiftet (overgangen)* mellem spændingsniveauer eller lys i en klokperiode, der repræsenterer en binær værdi (Figur 1-6). *(Andre kendte modulationsformer fra radio/RF er Amplitude Modulation (AM) og Frequency Modulation (FM)).*

![[Figure 1-5 - Current State Modulation.png]]

![[Figure 1-6 - Transition Modulation.png]]

2. **Kabel- og stikstandarder (Wiring Standards):** Definerer pinouts og fysiske konnektorer – f.eks. **TIA/EIA-568-B**-standarden for benforbindelser i et **RJ-45-stik** til twisted-pair Ethernet (Figur 1-7).

![[Figure 1-7 - TIA-EIA-568-B Wiring Standard for an RJ-45 Connector.png]]

3. **Physical Topology (Fysisk topologi):** Hvordan kabler og enheder rent fysisk er forbundet (f.eks. stjerne-, bus- eller hub-and-spoke-topologi).
4. **Bit-synkronisering (Synchronizing Bits):**
   - **Asynchronous (Asynkron):** Afsenderen indleder med en **start-bit**, hvorefter modtageren bruger sit eget interne ur til at aflæse de efterfølgende bits, indtil afsenderen afslutter med en **stop-bit**.
   - **Synchronous (Synkron):** Afsender og modtager synkroniserer deres interne ure (ofte via en fælles ekstern klokke fra f.eks. en udbyder) for at være helt enige om, hvornår hver bit starter og slutter.
5. **Båndbreddeudnyttelse (Baseband vs. Broadband):**
   - **Baseband:** Bruger **hele mediets tilgængelige frekvensspektrum** til én digital datakanal (f.eks. **Ethernet**).
   - **Broadband:** Opdeler mediets båndbredde i **flere separate frekvenskanaler**, så forskellige kommunikationsstrømme (f.eks. kabel-TV og bredbåndsinternet) kan sendes samtidigt over samme koaksialkabel.
6. **Multipleksingsstrategier (Multiplexing):**
   - **TDM (Time-Division Multiplexing):** Flere sessioner deles om samme fysiske medie ved at skiftes til at sende i faste tidsintervaller (*time slots*). Ulempe: Et time slot er reserveret, selvom en session ikke har data at sende.
   - **StatTDM (Statistical Time-Division Multiplexing):** Tildeler dynamisk *time slots* efter behov (*on-demand*) til de sessioner, der faktisk har data at sende, hvilket udnytter båndbredden langt bedre.
   - **FDM (Frequency-Division Multiplexing):** Opdeler mediets frekvensområde i separate frekvenskanaler (bruges i *broadband*).
   - **OFDM (Orthogonal Frequency-Division Multiplexing):** Indkoder digitale data på tværs af mange tætliggende ortogonale bærefrekvenser (*subcarriers*). Anvendes bredt i Wi-Fi, DSL, digitalt TV og 4G/5G.
   - **OFDMA (Orthogonal Frequency-Division Multiple Access):** Multi-bruger-version af OFDM (brugt i bl.a. Wi-Fi 6 / 802.11ax), der opdeler en trådløs kanal i mindre underkanaler (*Resource Units*), så flere brugere kan sende og modtage samtidigt med lavere latens.
- **Typiske Lag 1-enheder:** Legacy **Ethernet-hubs** (der blot gentager indkommende bits ud på alle andre porte uden at kende MAC-adresser), netværkskabler og RF-delen af trådløse access points.

---

### 3.2 Layer 2: The Data Link Layer (Datalink-laget)
Lag 2 (Figur 1-8) pakker data i **Frames**, sikrer at frames overholder mediets **MTU (Maximum Transmission Unit)** (standard 1.500 bytes for Ethernet; for store frames kaldes *giants*, for små kaldes *runts*), udfører fejldetektion, styrer flow control og finder enheder på det lokale netværk vha. fysiske adresser.

![[Figure 1-8 - Layer 2 - The Data Link Layer.png]]

Data Link-laget er unikt ved at være opdelt i **to underlag (sublayers)**:

#### 1. MAC-underlaget (Media Access Control)
- **Physical Addressing (MAC-adresser):** En **48-bit (6-byte)** fysisk adresse indbrændt på netkortet (NIC), skrevet som 12 heksadecimale cifre (f.eks. `58:55:ca:eb:27:83`). De første **24 bits** er **OUI / Vendor Code** (tildelt producenten af IEEE), og de sidste **24 bits** er et unikt serienummer tildelt af producenten.
- **Logical Topology:** Hvordan data logisk flyder mellem noder på Lag 2.
- **Medieadgangsstyring:** Afgør hvornår en enhed må sende på mediet (f.eks. CSMA/CD på Ethernet eller CSMA/CA på WLAN).

#### 2. LLC-underlaget (Logical Link Control)
- **Connection Services (Flow Control & Error Control):** Forhindrer at afsenderen overvælder modtageren (*flow control*) og kontrollerer for transmissionsfejl (*error control*).
- **Synkronisering og fejldetektion af frames:**
  - **Isochronous:** Enheder bruger en fælles klokke på netværket, der skaber faste *time slots* med garanteret båndbredde (velegnet til realtids-streaming).
  - **Asynchronous:** Bruger start- og stop-bits omkring hver byte/frame og anvender en **Parity Bit (paritetsbit)** (*even parity* eller *odd parity*) til simpel fejldetektion. *(Svaghed: Hvis to bits i samme byte vender forkert, opdager paritetsbitten ikke fejlen).*
  - **Synchronous:** Bruger aftalt klokkesignal/kontroltegn og anvender en matematisk **CRC (Cyclic Redundancy Check)** (placeret i Ethernet-framens trailer/FCS) til robust fejldetektion.
- **Typiske Lag 2-enheder:** **Layer 2 Switches**, **Bridges** og **NICs (Network Interface Cards)**.

---

### 3.3 Layer 3: The Network Layer (Netværkslaget)
Lag 3 (Figur 1-9) håndterer **logisk adressering (IPv4 og IPv6)** og **routing (videresendelse af pakker på tværs af forskellige netværk)**.

![[Figure 1-9 - Layer 3 - The Network Layer.png]]

Nøglefunktioner på Lag 3:
1. **Logical Addressing:** Globalt/hierarkisk opbyggede logiske adresser (IP-adresser), i modsætning til flade Lag 2 MAC-adresser.
2. **Switching-teknikker på Lag 3:**
   - **Packet Switching (Routing):** Datastrømmen opdeles i diskrete **pakker** (*packets*), der hver har kilde- og destinations-IP i headeren og rutes uafhængigt gennem netværket.
   - **Circuit Switching (Kredsløbskobling):** Etablerer en dedikeret ende-til-ende kommunikationsforbindelse mellem to parter for hele samtalens varighed (ligesom et klassisk fastnet-telefonopkald).
   - **Message Switching:** Hele beskeder gemmes og videresendes (*store-and-forward*) fra hop til hop (f.eks. e-mail-udveksling; ikke egnet til realtidstrafik).
3. **Route Discovery and Selection:** Routere vedligeholder en **routingtabel** via direkte forbundne netværk, statiske ruter eller dynamiske routingprotokoller (OSPF, EIGRP, BGP).
4. **Connection Services på Lag 3:** Flow/congestion control samt **Packet Reordering** (gensamling af pakker i rigtig rækkefølge, hvis de er sendt ad forskellige ruter via load balancing).
- **Typiske Lag 3-enheder og protokoller:** **Routere**, **Multilayer Switches**, **IPv4**, **IPv6**.

---

### 3.4 Layer 4: The Transport Layer (Transportlaget)
Lag 4 (Figur 1-10) fungerer som bindeleddet mellem de øvre applikationsorienterede lag (Lag 5–7) og de nedre netværks-/medielag (Lag 1–3). Det segmenterer data i **Segments** (TCP) eller **Datagrams** (UDP).

![[Figure 1-10 - Layer 4 - The Transport Layer.png]]

1. **TCP (Transmission Control Protocol) vs. UDP (User Datagram Protocol):**
   - **TCP:** **Forbindelsesorienteret (*Connection-oriented*) og pålidelig (*reliable*)** protokol. Bruger sekvensnumre (*sequence numbers*), bekræftelser (*acknowledgments – ACK*) og genudsendelse (*retransmission*) af tabte segmenter. Velegnet til web (HTTPS), e-mail (SMTP/IMAP), filoverførsel og SSH.
   - **UDP:** **Forbindelsesløs (*Connectionless*) og upålidelig (*unreliable / best-effort*)** protokol uden sekvensnumre, windowing eller ACKs. Har en meget lille header og lavt overhead, hvilket gør den ideel til realtidstrafik (VoIP, videostreaming) og hurtige opslag (DNS, DHCP, NTP).
2. **Flow Control på Lag 4 (Windowing og Buffering):**
   - **Windowing (TCP Sliding Window):** Tillader afsenderen at sende flere segmenter i træk, før der kræves en enkelt samlet ACK fra modtageren. Med **Sliding Window** (Figur 1-11) kan vinduesstørrelsen dynamisk vokse (f.eks. fra 1 til 2 til 4 segmenter), så længe modtageren bekræfter pakkerne fejlfrit, og skrumpe igen ved pakketab.
   - **Buffering:** En netværksenhed gemmer midlertidigt segmenter/pakker i en hukommelseskø (*buffer/queue*), hvis udgående båndbredde er optaget. Hvis køen løber fuld under vedvarende overbelastning, droppes pakkerne.

![[Figure 1-11 - TCP Sliding Window.png]]

---

### 3.5 Layer 5: The Session Layer (Sessionslaget)
Lag 5 (Figur 1-12) holder styr på adskilte samtaler (**sessioner**) mellem applikationer gennem tre faser:
1. **Setting up a session (Etablering):** Verificerer brugerlegitimation, tildeler sessions-ID'er og forhandler hvilke tjenester og hvilken part der sender først.
2. **Maintaining a session (Vedligeholdelse):** Overfører data, holder forbindelsen i live og genopretter sessionen ved kortvarige udfald.
3. **Tearing down a session (Nedlukning):** Lukker sessionen kontrolleret ned efter aftale eller ved fejl/timeout.
- **Eksempel på protokol:** **SIP (Session Initiation Protocol)** til opsætning og nedlukning af VoIP- og videosamtaler.

![[Figure 1-12 - Layer 5 - The Session Layer.png]]

---

### 3.6 Layer 6: The Presentation Layer (Præsentationslaget)
Lag 6 (Figur 1-13) sørger for, at data fra applikationslaget præsenteres i et format, som modtagersystemet kan forstå, og sikrer data:
1. **Data Formatting (Dataformatering og oversættelse):** Sikrer kompatibilitet mellem forskellige tegnsæt og dataformater (f.eks. konvertering mellem **ASCII** og **EBCDIC**).
2. **Encryption / Decryption (Kryptering):** Krypterer følsomme data (f.eks. kreditkortoplysninger eller adgangskoder) hos afsenderen og dekrypterer dem hos modtageren.

![[Figure 1-13 - Layer 6 - The Presentation Layer.png]]

---

### 3.7 Layer 7: The Application Layer (Applikationslaget)
Lag 7 (Figur 1-14) leverer **netværkstjenester til slutbruger-applikationer**.
> **Vigtig pointe:** Selve slutbrugerprogrammet (f.eks. Microsoft Word eller et regneark) bor *ikke* i OSI-modellens Lag 7! Lag 7 består derimod af de *netværksprotokoller* (f.eks. HTTP/HTTPS, SMTP, FTP, SMB, DNS), som applikationerne kalder, når de har brug for at kommunikere over netværket.

Lag 7 håndterer:
- **Application Services:** Fildeling, e-mail, webadgang osv.
- **Service Advertisement:** Annoncering af tilgængelige netværkstjenester (f.eks. netværksprintere eller registrering i en central katalogtjeneste som **Microsoft Active Directory**).

![[Figure 1-14 - Layer 7 - The Application Layer.png]]

---

## 4. TCP/IP-stakken, Pakkeformater og Indkapsling (Encapsulation)

Mens OSI-modellen har 7 lag, er den praktiske **TCP/IP-stak (DoD-modellen)** bygget op af **4 lag** (Figur 1-15):
1. **Network Interface Layer** (også kaldet *Network Access Layer*): Svarer til **OSI Lag 1 (Physical) + Lag 2 (Data Link)**.
2. **Internet Layer:** Svarer til **OSI Lag 3 (Network)** med fokus på IP (IPv4/IPv6).
3. **Transport Layer:** Svarer direkte til **OSI Lag 4 (Transport)** (TCP og UDP).
4. **Application Layer:** Samler funktionerne fra **OSI Lag 5 (Session), Lag 6 (Presentation) og Lag 7 (Application)** i ét samlet lag.

![[Figure 1-15 - TCP-IP Stack.png]]

### 4.1 IPv4-, TCP- og UDP-headerformater
- **IPv4 Packet Format (Figur 1-16):** Indeholder bl.a. **Source IP address**, **Destination IP address**, **Protocol** (angiver hvilken Lag 4-protokol der bæres indeni, f.eks. TCP eller UDP), **IP Flags** (3 bits til styring af fragmentering) samt **TTL (Time-to-Live)**, som **dekrementeres med 1 for hvert router-hop** for at forhindre at pakker cirkulerer evigt i en routing-løkke.

![[Figure 1-16 - IPv4 Packet Format.png]]

- **TCP Segment Format (Figur 1-17):** Indeholder **Source Port**, **Destination Port**, **Sequence Number** (til korrekt rækkefølge), **Acknowledgment Number** (angiver næste forventede sekvensnummer), **TCP Flags** (til forbindelsesstyring, f.eks. SYN, ACK, FIN, RST) og **Window Size** (flow control).

![[Figure 1-17 - TCP Segment Format.png]]

- **UDP Segment Format (Figur 1-18):** Meget kompakt header (kun 8 bytes), der blot indeholder **Source Port**, **Destination Port**, **UDP Length** og **UDP Checksum** samt payload.

![[Figure 1-18 - UDP Segment Format.png]]

### 4.2 Encapsulation, Decapsulation og Portnumre
- **Encapsulation (Indkapsling):** Når en host sender data ned gennem OSI-stakken (fra Lag 7 til Lag 1), tilføjer hvert lag sin egen **Header** (og på Lag 2 også en **Trailer/FCS**) omkring dataene fra det ovenliggende lag.
- **Decapsulation (Udpakning):** Når modtageren læser data op gennem OSI-stakken (fra Lag 1 til Lag 7), fjerner og aflæser hvert lag sin tilhørende header/trailer.
- **Portnumre (0–65535):** På Lag 4 bruges portnumre til at identificere, hvilken applikationsprotokol på Lag 7 trafikken hører til:
  - **Well-Known Ports (`0–1023`):** Faste standardporte tildelt almindelige server-tjenester (f.eks. **HTTP = TCP 80**, **HTTPS = TCP 443**, **SSH = TCP 22**, **DNS = UDP/TCP 53**).
  - **Ephemeral Ports (`1024–65535`):** Midlertidige kildeporte (*source ports*), som klienten vælger dynamisk ved oprettelse af en udgående forbindelse.
  - I Figur 1-19 sender klienten (`192.168.1.1`) fra en ephemeral source port (`1050`) til webserverens (`172.16.1.2`) well-known destination port (`80`). Når webserveren svarer, byttes kilde- og destinationsadresser samt kilde- og destinationsporte om.

![[Figure 1-19 - Example - Port Numbers and IP Addresses.png]]

---

## 5. Nøgleemner til Eksamen (Key Topics)

![[Table 1-1 - Key Topics for Chapter 1.png]]

### Hurtige eksamenstips (Exam Cram)
- **MAC- og LLC-underlagene:** Findes begge på **Lag 2 (Data Link Layer)**.
- **Baseband vs. Broadband:** **Baseband** (f.eks. Ethernet) bruger alle frekvenser på mediet til én datastrøm; **Broadband** opdeler mediet i flere frekvenskanaler (FDM).
- **Windowing (Sliding Window):** Er en **Lag 4 (Transport Layer)** flow control-mekanisme, der anvendes af **TCP** (aldrig UDP).
- **Well-known ports:** Portnumre **under 1024 (`0–1023`)**. Ephemeral ports er over `1023` (`1024–65535`).
- **TTL (Time-to-Live):** Dekrementeres med **1 for hvert router-hop** på Lag 3.
