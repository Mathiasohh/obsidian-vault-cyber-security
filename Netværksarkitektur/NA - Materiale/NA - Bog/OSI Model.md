---
Up: "[[NA - Bog]]"
---
# OSI Modellen (Open Systems Interconnection)

En teoretisk 7-lags referencemodel udviklet af ISO til at forstå netværkskommunikation og dataindkapsling (*encapsulation*).

Data indkapsles i forskellige enheder gennem lagene, kaldet [[Protocol data unit (PDU)]].

---

# Indholdsfortegnelse
- [[#Layer 1 The Physical Layer]]
- [[#Layer 2 The Data Link Layer]]
- [[#Layer 3 The Network Layer]]
- [[#Layer 4 The Transport Layer]]
- [[#Layer 5 The Session Layer]]
- [[#Layer 6 The Presentation Layer]]
- [[#Layer 7 The Application Layer]]
- [[#Sammenligning OSI vs TCP IP Stakken]]
![[NA - OSI Model.png|123]]

---

# Layer 1: The Physical Layer
Det fysiske lag beskæftiger sig med selve transmissionen af rå bits ($0$ og $1$) på netværket sammen med de fysiske og elektriske specifikationer.

Laget definerer:
- [[#Hvordan bits repræsenteres på et medium]]
- [[#Kabel og stikstandarder]]
- [[#Fysisk topologi]]
- [[#Synkronisering af bits på lag 1]]
- [[#Båndbreddeforbrug]]
- [[#Multiplexing strategier]]
![[NA - Layer 1 - The Physical Layer.png|458]]
## Hvordan bits repræsenteres på et medium
Data overføres som binære værdier via elektrisk spænding (kobberkabler) eller lysglimt (fiberoptik).
Dette gennemgås i mere detalje i [[Kapitle 7 - IPv4 Addressing]]

### Current state modulation (tilstandsmodulation):
Bitværdien aflæses direkte af tilstedeværelsen eller fraværet af spænding/lys.
Hvis spænding/lys er til stede = binært $1$ og hvis ingen spænding er til stede, der er mørkt = binært $0$.
![[NA - Figur 1-5 - Current State Modulation.png|358]]

### State transition modulation (overgangsmodulation):
Bitværdien afgøres af selve *skiftet* i spænding eller lysstyrke.
En overgang kan indikere et binært $1$, mens en uændret tilstand repræsenterer et binært $0$.
![[NA - Figure 1-6 - Transition Modulation.png|425]]

### Andre modulationsformer:
*Amplitude Modulation* (**AM**): Varierer signalets styrke (amplitude).
*Frequency Modulation* (**FM**): Varierer signalets frekvens.



## Kabel- og stikstandarder
Definerer den fysiske opbygning af ledninger og netværksstik.
Der beskrives en række standarder for netværksforbinderer i [[Kapitel 5 -]]
- **TIA/EIA-568-B:** Standard for rækkefølgen af ledere i et RJ-45-stik på et twisted-pair Ethernet-kabel.



## Fysisk topologi
Ved 1'ste lags enheder ses netværket som en fysisk topologi (Den faktiske, synlige placering af kabler, netværksstik og hardware. Det svarer til vejnettet på et fysisk kort).
Dette forklares yderligere i [[Kapitel 6 - Network Topologies, Architectures, and Types]].



## Synkronisering af bits på lag 1
Afsender og modtager skal være enige om, hvor en bit starter og stopper. Det kan gøres på to måder:
- [[#Asynchronous (Asynkron)]]
- [[#Synchronous (Synkron)]]

### Asynchronous (Asynkron)
Afsender sender en *start bit*, hvilket starter modtagerens interne ur til at aflæse de næste bits. Afsluttes med en *stop bit.

### Synchronous (Synkron)
Afsender og modtager synkroniserer deres interne ure mod en fælles ekstern reference/ur (*clock source*).



## Båndbreddeforbrug
Der er to måder at gøre det på:
- [[#Broadband (Bredbånd)]]
- [[#Baseband (Basebånd)]]

### Broadband (Bredbånd)
Deler mediets samlede frekvensbånd op i separate kanaler, så der kan sendes flere uafhængige datastrømme samtidigt (f.eks. kabel-tv/kabelmodem).

### Baseband (Basebånd)
Bruger alle tilgængelige frekvenser på mediet til kun én samlet transmissionskanal ad gangen (f.eks. almindeligt Ethernet).



## Multiplexing strategier
Multiplexing tillader flere kommunikationssessioner at dele det samme fysiske medie. Her er nogle af de måde det gøres på:
- [[#Time-division multiplexing (TDM)]]
- [[# Statistical time-division multiplexing (StatTDM)]]
- [[#Frequency-division multiplexing (FDM)]]
- [[#Orthogonal frequency-division multiplexing (OFDM)]]
- [[#Orthogonal frequency-division multiple access (OFDMA)]]

### Time-Division Multiplexing (TDM)
Opdeler tiden i faste *time slots*. Hver session får tildelt en fast plads i rækkefølgen, uanset om der er data at sende eller ej.

### Statistical Time-Division Multiplexing (StatTDM)
Dynamisk udgave af TDM. Tildeler kun *time slots* efter behov, så tomme slots undgås.

### Frequency-Division Multiplexing (FDM)
Opdeler mediets samlede frekvensområde i separate kanaler (bredbånd).

### Orthogonal Frequency-Division Multiplexing (OFDM)
Koder digitale data over mange tætte underbærefrekvenser (bruges i Wi-Fi, DSL og 4G/5G).

### Orthogonal Frequency-Division Multiple Access (OFDMA)
En flerbruger-udgave af OFDM, som lader flere klienter sende/modtage samtidigt på underkanaler for lavere forsinkelse (*latency*).


---

# Layer 2: The Data Link Layer
Datalinklaget samler bits i *frames* (rammer) og håndterer lokal transmission mellem enheder på samme fysiske segment. Det sikrer, at frames overholder mediets maksimale transmissionsstørrelse - *Maximum Transmission Unit* (MTU).

Processerne kaldes samlet for *Data Link Control* (DLC). Laget er unikt opdelt i to underlag:
- [[#MAC (Media Access Control)]]
- [[#LLC (Logical Link Control)]]
![[NA - Layer  2 - The Data Link Layer.png|593]]


## MAC (Media Access Control)
Det nederste underlag, som håndterer hardwareadressering og adgang til mediet.

### Fysisk adressering (MAC-adresse)
En 48-bit globalt unik adresse brændt ind i netværkskortet - Network interface Card ([[NIC]]), noteret i hexadecimal (f.eks. `58:55:ca:eb:27:83`).
De første 24 bits er *Organizationally Unique Identifier* (OUI) / Vendor Code tildelt af IEEE, som identificerer producenten.
De sidste 24 bits er producentens interne serienummer for chippen.

### Logisk topologi
Hvordan data reelt flyder mellem noderne (modsat den synlige, fysiske kabelføring).

### Transmission på mediet
Regler der koordinerer, hvem der må sende hvornår, for at afværge at data kolliderer på mediet.



## LLC (Logical Link Control)
Det øverste underlag, der danner bindeled til lag 3 og håndterer kontrolfunktioner.

### Forbindelsestjenester (*Connection Services*)
Modtageren kan sende feedback til afsenderen via en bekræftelsesbesked (_acknowledgment_), som primært tjener to funktioner:
- [[#Flow control (Flowstyring)]]
- [[#Error control (Fejlstyring)]]

#### Flow control (Flowstyring)
Afstemmer hastighed og datamængde via kvitteringer (*acknowledgments* / **ACK**), så modtageren ikke oversvømmes.

#### Error control (Fejlstyring)
Tjekker rammens integritet via en matematisk *checksum*. Afviger resultatet, bedes om en genudsendelse.

### Synkronisering af transmissioner
Afsender og modtager skal koordinere afsendelse og modtagelse af _data frames_ via en af følgende tre synkroniseringsmetoder:
- [[#Isochronous (Isokron)]]
- [[#Asynchronous (Asynkron)]]
- [[#Synchronous (Synkron)]]

#### Isochronous (Isokron)
En fælles master-clock i netværket danner faste tidsintervaller (*time slots*). Enheder undersøger ledig kapacitet og placerer frames heri. Kræver minimal overhead.

#### Asynchronous (Asynkron)
Enheder bruger egne interne ure. Hver frame indrammes af *start bits* og *stop bits*. Kan tilføje en *parity bit* per byte (lige/ulige paritet) til basal fejlfinding; metoden opdager dog ikke fejl, hvis mere end én bit ændres.

#### Synchronous (Synkron)
Enheder synkroniserer via en aftalt metode (f.eks. en dedikeret kontrolkanal eller faste start/stop-bitmønstre). Fejl findes ved udregning af en **CRC** (*Cyclic Redundancy Check*), som er markant mere præcis end paritet.


---

# Layer 3: The Network Layer
Netværkslaget tager sig af logisk adressering og videresendelse (*forwarding*) af pakker på tværs af forskellige netværk.

Laget dækker over:
- [[#Logisk adressering]]
- [[#Switching-teknikker på lag 3]]
- [[#Route discovery and selection (Ruteudvælgelse)]]
- [[#Forbindelsestjenester på lag 3]]
![[NA - Layer 3 - The Network Layer.png|431]]

### Logisk adressering
Bruger logiske netværksadresser uafhængigt af det fysiske udstyr. Mest udbredt er **IP** (*Internet Protocol*) i form af IPv4 og IPv6.

### Switching-teknikker på lag 3
Henviser til måden, data dirigeres gennem infrastrukturen og omfatter tre gængse teknikker:
- [[#Packet switching (Pakkeskift/Routing)]]
- [[#Circuit switching (Kredsløbsskift)]]
- [[#Message switching (Beskedskift)]]

#### Packet switching (Pakkeskift/Routing)
Datastrømmen brydes op i selvstændige pakker med modtager- og afsender-IP i L3-headeren. Pakkerne kan vælge forskellige ruter frem til målet.

#### Circuit switching (Kredsløbsskift)
Etablerer en fast, dedikeret fysisk kanal mellem to parter under hele samtalen (f.eks. klassisk fastnettelefoni).

#### Message switching (Beskedskift)
Hele beskeden sendes samlet fra knudepunkt til knudepunkt under princippet *store-and-forward* (mellemlagres før videresendelse, ligesom e-mail-servere). Uegnet til realtidstrafik pga. forsinkelse.


### Route discovery and selection (Ruteudvælgelse)
Routere læser destinationens IP-adresse og slår op i deres interne *routing table* (routingtabel). Tabellen opbygges via:
- Direkte forbundne netværk (*Directly connected*)
- Manuelt konfigurerede faste ruter (*Static routes*)
- Dynamiske routingprotokoller som Open Shortest Path First (OSPF), eller Enhanced Interior Gateway Routing Protocol (EIGRP)

### Forbindelsestjenester på lag 3
Ligesom Layer 2 tilbyder kontroltjenester, kan Layer 3 også levere forbindelsestjenester (_connection services_). De træder til for at forbedre netværkets pålidelighed, hvis Data Link-lagets LLC-underlag ikke udfører disse opgaver, og de varetager følgende funktioner:
- [[#Flow control / Congestion contro]]l
- [[#Packet reordering]]

#### Flow control / Congestion control
Dæmper overbelastning i transmissionsnettet.

#### Packet reordering
Pakker kan ankomme hulter til bulter pga. forskellige transmissionsstier (*load balancing*). Laget genskaber den oprindelige rækkefølge.


---

# Layer 4: The Transport Layer
Fungerer som skillelinje og oversætter mellem de øvre softwarelag (lag 5–7) og de nedre netværkslag (lag 1–3). Den modtager beskeder fra de øvre lag (lag 5–7) og indkapsler dem i _segments_ til transmission i de nedre lag (lag 1–3). På samme måde bliver datastrømme, der ankommer fra de nedre lag, afkapslet og sendt op til lag 5 (sessionslaget) eller et andet øvre lag, afhængigt af den anvendte protokol.

Laget dækker over:
- [[#Transportprotokoller]]
- [[#Flow control på lag 4]]
![[NA - Layer 4 - The Transport Layer.png|311]]

## Transportprotokoller
Her er de meste brugte protokoller følgende:
- [[#Transmission Control Protocol (TCP)]]
- [[#User Datagram Protocol (UDP)]]

###  Transmission Control Protocol (TCP)
Connection-oriented (forbindelsesorienteret).
Når sender afsender segmenter og modtager modtager dem og sender en bekræftelse tilbage. Kan afsender aflæse bekræftelsen og beslutte om et segment nåede frem eller ej og om det skal sendes på ny.

### User Datagram Protocol (UDP)
*Connectionless* (forbindelsesløs).
Her er Hastigheden højere, men der tjekkes ikke for om et segment mangler.

### Flow control på lag 4
Ligesom lag 2 og 3, har lag 4 også flowkontrol. To almindelige flowkontrolmetoder på lag 4 er følgende:
- [[#Windowing (Vinduesstyring)]]
- [[# Buffering]]

#### Windowing (Vinduesstyring)
Modtageren behøver ikke kvittere for hvert enkelt segment, men kvitterer for en hel gruppe data i ét "vindue" med en enkelt bekræftelsesbesked.
*Sliding window:* Størrelsen justeres løbende. Den kan fordobles (f.eks. 1 -> 2 -> 4 segmenter), så længe modtagelsen bekræftes inden for svarfristen (**RTT** - *Round-Trip Time*).

#### Buffering
Mellemlagring af modtagne segmenter i en hukommelseskø (*buffer*), hvis processoren har travlt. Bliver bufferen helt fuld pga. vedvarende kø, smides overskydende segmenter væk (*packet drops*).

---

# Layer 5: The Session Layer
Styrer dialogen mellem to enheder. Sørger for, at samtaler (*sessions*) holdes adskilt, så data fra parallelle applikationer ikke blandes sammen.

## Session setup (Etablering)
Validerer legitimationsoplysninger (brugernavn/adgangskode), forhandler funktioner og tildeler identifikatorer til datastrømmen.
## Session maintenance (Vedligeholdelse)
Overvåger samtalen, håndterer kvitteringer og genskaber automatisk forbindelsen ved korte udfald.

## Session teardown (Afslutning)
Lukker forbindelsen pænt ned efter fælles accept, eller reagerer hvis den ene part uventet taber forbindelsen.

## Protokoleksempel
 *Session Initiation Protocol* (SIP) til opsætning og styring af IP-telefoni og videokonferencer.


---

# Layer 6: The Presentation Layer
Fungerer som oversætter for data. Sikrer, at data leveres i et standardiseret og læsbart format til modtagerens applikation, samt varetager kryptering.

## Data formatting (Formatering)
Konverterer mellem modstridende systemstandarder, f.eks. tekstkodning i **ASCII** (*American Standard Code for Information Interchange*) vs. **EBCDIC** (*Extended Binary Coded Decimal Interchange Code*).
Strukturerer formater for multimedie, grafik og lyd.

## Encryption (Kryptering)
Omdanner klartekst til ulæselig chiffertekst for at sikre følsomme oplysninger under transporten. Kun modtageren med den korrekte dekrypteringsnøgle kan åbne indholdet.


---

# Layer 7: The Application Layer
Laget tættest på brugeren. Leverer netværksservices, som programmer trækker på.

> [!important] Slutbrugerprogrammer vs. Applikationstjenester
> Selve slutbrugerprogrammerne (f.eks. Microsoft Word, Outlook eller Google Chrome) befinder sig **ikke** på lag 7. Lag 7 udgøres af de underliggende netværksservices, som programmerne benytter (f.eks. e-mail-protokoller, HTTP eller fildeling).

## Application services (Netværkstjenester)
Standardiserede protokoller for fildeling, browser-adgang og e-mail-overførsel.

## Service advertisement (Annoncering)
Tjenester gør deres eksistens kendt på netværket:
  - *Periodiske udsendelser:* Enheden (f.eks. en netværksprinter) broadcaster regelmæssigt sin tilstedeværelse.
  - *Centralt kartotek:* Enheder indmelder sig i en samlet fortegnelse (f.eks. Microsoft Active Directory), hvor klienter kan slå dem op.

---

# Sammenligning: OSI vs. TCP/IP Stakken
Hvor OSI-modellen er en teoretisk referenceramme med 7 lag, arbejder virkelighedens netværk ud fra den praktiske **TCP/IP-stak** (også kaldet **DoD-modellen**, udviklet af det amerikanske forsvarsministerium), som er opdelt i 4 lag:

```
OSI Model (7 Lag)         TCP/IP Stak (4 Lag)
┌──────────────────┐      ┌─────────────────────────┐
│ 7. Application   │      │                         │
├──────────────────┤      │  Application            │
│ 6. Presentation  │ ───> │  (Lag 5, 6 og 7 samlet) │
├──────────────────┤      │                         │
│ 5. Session       │      │                         │
├──────────────────┤      ├─────────────────────────┤
│ 4. Transport     │ ───> │  Transport (Lag 4)      │
├──────────────────┤      ├─────────────────────────┤
│ 3. Network       │ ───> │  Internet (Lag 3)       │
├──────────────────┤      ├─────────────────────────┤
│ 2. Data Link     │      │  Network Interface      │
├──────────────────┤ ───> │  / Network Access       │
│ 1. Physical      │      │  (Lag 1 og 2 samlet)    │
└──────────────────┘      └─────────────────────────┘
```
