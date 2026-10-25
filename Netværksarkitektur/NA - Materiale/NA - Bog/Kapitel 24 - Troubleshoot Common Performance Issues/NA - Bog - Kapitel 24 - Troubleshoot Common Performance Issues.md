---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - "Kapitel 24 - Troubleshoot Common Performance Issues"
  - "NA - Bog - Kapitel 24"
---

# Kapitel 24: Troubleshoot Common Performance Issues

> **Bog-PDF:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 24 - Troubleshoot Common Performance Issues.pdf]]
> **Relateret begrebsark:** [[NA - Begrebsark]] Kap. 24

---

## Resumé

Kapitel 24 dækker **Objective 5.4 (Given a scenario, troubleshoot common performance issues)** i CompTIA Network+ (N10-009)-pensummet. Kapitlet fokuserer på identifikation og fejlfinding af de faktorer, der forringer ydeevnen i både kablede og trådløse netværk:
1. **Generelle netværksperformance-faktorer:** Forskellen på **Bandwidth** (teoretisk maks. kapacitet) og **Throughput Capacity** (faktisk opnået overførsel), **Congestion** (overbelastning) vs. **Contention** (konkurrence om samme ressource), **Bottlenecks** (flaskehalse), **Latency** (forsinkelse), **Packet Loss** (pakketab) og **Jitter** (variation i latency).
2. **Trådløs performance og RF-målepunkter:** Teoretisk *Speed* vs. reel *Throughput*, afstand og dæmpning (**Attenuation / Signal Degradation**), **RSSI (*Received Signal Strength Indication*)**, **EIRP (*Effective Isotropic Radiated Power*)**, antennevalg og polarisering, frekvensbånd (`2.4 GHz`, `5 GHz`, `6 GHz`) samt **AP Association Time** og **Site Surveys / Heat Maps**.
3. **Almindelige trådløse fejlscenarier:** **Interference (RFI)**, **Channel Overlap** (f.eks. brug af overlappende kanaler som kanal `1` og `5` i `2.4 GHz`-båndet), **Insufficient Wireless Coverage**, **Multipath Propagation**, **Captive Portal Issues**, **Client Disassociation Issues** (inkl. *deauth*-angreb) og **Roaming Misconfiguration**.

---

## 1. Generelle Netværksperformance-faktorer (Network Performance Considerations)

Når brugere klager over et "langsomt netværk", skyldes det næsten altid en eller flere af følgende seks performancefaktorer:

- **Bandwidth vs. Throughput Capacity:**
  - **Bandwidth (Båndbredde):** Den **teoretisk maksimale datamængde**, der kan sendes over et netværkslink pr. tidsenhed (målt i **bps / Mbps / Gbps**) — svarende til bredden af en motorvej (antal vognbaner).
  - **Throughput / Throughput Capacity (Gennemstrømning):** Den **faktiske mængde data**, der reelt overføres succesfuldt gennem netværket pr. sekund, efter at congestion, protokol-overhead, latency, CSMA/CA og pakketab har reduceret hastigheden. *(F.eks. kan en `802.11n`-forbindelse med en oplyst båndbredde på `300 Mbps` i praksis have en reel throughput på `225 Mbps`).*
- **Congestion vs. Contention:**
  - **Congestion (Overbelastning / Trafikprop):** Opstår, når der sendes **mere trafik ind i et netværkssegment eller en switch/router, end linket eller kø-bufferne kan nå at behandle**, hvilket fører til kø-forsinkelse (*queuing delay*) og pakketab.
  - **Contention (Ressourcekonkurrence):** Opstår, når **flere enheder eller applikationer samtidigt kæmper om adgang til det samme delte medie eller den samme netværksressource** (f.eks. mange Wi-Fi-klienter på samme radiokanal, der må vente på hinanden via **CSMA/CA**).
- **Bottlenecking (Flaskehalse):** Et specifikt punkt i netværksstien (f.eks. et langsomt uplink, en overbelastet firewall eller en ældre switch), hvor datastrømmen bremses ned og begrænser den samlede *end-to-end* throughput, uanset hvor hurtige resten af netværkets links er.
- **Latency (Forsinkelse / Delay):** Den tid (målt i millisekunder, `ms`), det tager en datapakke at rejse fra afsender til modtager. Trådløse netværk oplever ofte højere latency end kablede netværk, bl.a. fordi Wi-Fi benytter **CSMA/CA (*Carrier-Sense Multiple Access with Collision Avoidance*)**.
- **Packet Loss (Pakketab):** Når én eller flere pakker aldrig når frem til destinationen (typisk pga. fulde kø-buffere ved *congestion*, defekte kabler/stik eller dårligt RF-signal). Ved TCP-trafik tvinger pakketab afsenderen til at genfremsende (*retransmit*) segmenter, hvilket sænker hastigheden markant; ved UDP/VoIP/video giver det udfald i lyd og billede.
- **Jitter (Variation i Latency):** Ujævnheder i tidsintervallet mellem ankommende pakker. Hvis pakker ankommer med svingende forsinkelse, ødelægger det realtidsstrømme som **VoIP-opkald, videomøder og online gaming**.

---

## 2. Trådløse Performance- og Designfaktorer

Ved fejlfinding på trådløse netværk (WLANs) skal man ud over *Speed* vs. *Throughput* være særligt opmærksom på følgende fysiske og tekniske parametre:

### Afstand, Signalstyrke (RSSI) og Udstrålet Effekt (EIRP)
- **Distance & Attenuation (Signal Degradation or Loss):** Jo længere væk en klient bevæger sig fra AP'ets antenne, desto mere svækkes radiosignalet (*attenuation*). Bemærk, at signaltab ikke kun sker gennem luften og gennem vægge, men også i **lange antennekabler** mellem AP og eksterne antenner. Når signalstyrken falder, sænker Wi-Fi automatisk sin moduleringshastighed (*Dynamic Rate Shifting*).
- **RSSI (*Received Signal Strength Indication*):** Måler styrken af det modtagne trådløse signal hos klienten eller AP'et (typisk angivet i negative **dBm**, f.eks. `-50 dBm` for et stærkt signal vs. `-85 dBm` for et meget svagt signal).
- **EIRP (*Effective Isotropic Radiated Power*):** Måler den samlede maksimale effekt, der udstråles fra antennen (kombinerer radioens sendeeffekt + antennens *gain* i **dBi** minus kabel-/stiktab).

### Antenner, Kanaler, AP Association Time og Site Survey
- **Antenner og Polarisering (Insufficient Wireless Coverage):** Utilstrækkelig dækning (*dead zones*) løses ved at kontrollere afstande, vælge den rette antennetype (**Omnidirectional** til $360^\circ$ rumdækning vs. **Unidirectional / Directional** til fokuseret dækning over længere afstande) og sikre ensartet **polarisering** (retning af antennerne).
- **Frekvenser og Channel Overlap:**
  - I `2.4 GHz`-båndet er kanalerne kun adskilt med **`5 MHz`**, mens selve kanalen fylder **`22 MHz`**. Derfor overlapper 5 nabokanaler hinanden, og kun kanalerne **`1`, `6` og `11`** er ikke-overlappende.
  - `5 GHz`- og `6 GHz`-båndene (Wi-Fi 6 / `802.11ax`) giver langt flere ikke-overlappende kanaler og højere kapacitet.
- **AP Association Time:** Tiden det tager for en klient at associere med et AP, eller for et Lightweight AP (LWAP) at associere med sin **WLC (*Wireless LAN Controller*)** — et vigtigt målepunkt for latency og potentiel fejlfinding.
- **Site Survey & Heat Map:** Et grundigt *Wireless Site Survey* med en Wi-Fi-analyzer og et visuelt **Heat Map** afslører dækningshuller, kanaloverlap og støjkilder.

---

## 3. Fejlfinding af Almindelige Trådløse Problemer (Common Wireless Issues)

1. **Interference (RFI – *Radio Frequency Interference*):** Eksterne støjkilder i især `2.4 GHz`-båndet — herunder **mikrobølgeovne, `2.4 GHz` trådløse telefoner, babyalarmer, spillekonsoller og Bluetooth-enheder** — forstyrrer Wi-Fi-signalet og sænker *Signal-to-Noise Ratio (SNR)*.
2. **Signal Strength & Multipath Propagation (Refleksion/Spredning):**
   - Når radiobølger rammer stærkt ledende overflader som **metalarkivskabe, elevatorskakter eller metalkonstruktioner**, reflekteres og spredes (*scattering*) signalet ad flere forskellige veje (**Multiple Paths of Propagation / Multipath**), så kopier af signalet ankommer forskudt til modtageren og forvrænger hinanden. (Moderne standarder med **MIMO** og **OFDM/OFDMA** er langt bedre til at håndtere multipath).
3. **Misconfiguration of Wireless Parameters:** Klient og AP skal være enige om SSID, sikkerhedsstandard (f.eks. WPA2 vs. WPA3), autentificeringsmetode/PSK og understøttet 802.11-standard/frekvensbånd.
4. **Incorrect AP Placement & Channel Overlap:**
   - Naboceller skal have **`10 %–15 %` fysisk dækningsoverlap**, men **skal bruge ikke-overlappende kanaler**!
   - I bogens fejlfindingsscenarie (**Figure 24-1**) har to nærliggende AP'er samme SSID (`corporate`), standard (`802.11n`) og kryptering (`WPA2`), men er konfigureret på **kanal `1` og kanal `5`**. Da kanal `1` og `5` overlapper i `2.4 GHz`-båndet, skaber de kraftig **adjacent-channel interference** (løsning: skift kanal `5` til **kanal `6` eller `11`**).

![[Figure 24-1 - Wireless Network Troubleshooting - Sample Topology.png]]

5. **Captive Portal Issues:** Fejl på den webportal (AUP/login-side), der møder gæstebrugere — f.eks. DNS-fejl, udløbne SSL/TLS-certifikater på portalen eller firewallregler, der blokerer omdirigeringen til login-siden.
6. **Client Disassociation Issues:** Klienter smides uventet af det trådløse netværk. Kan skyldes svagt signal, for stramme *idle timeouts*, overbelastede AP'er, driverfejl eller et aktivt **Deauthentication-angreb** (ofte kombineret med et **Evil Twin / Rogue AP**).
7. **Roaming Misconfiguration:** Opstår, når mobile enheder (laptops, smartphones, VoIP-håndsæt) bevæger sig fra ét AP til et andet, men enten hænger fast på det gamle AP med elendigt signal (*sticky client*) eller mister forbindelsen kortvarigt under skiftet pga. forkert sendeeffekt, manglende celleoverlap eller manglende hurtig roaming på WLC'en.

---

## 4. Real-World Case Study & Nøgleemner

I kapitlets case-studie løser *Acme, Inc.* omfattende Wi-Fi-performanceproblemer på hovedkontoret ved at gennemføre et nyt **Wireless Site Survey** med opdaterede **Heat Maps**, udskifte ældre AP'er, implementere en ny **Wireless LAN Controller (WLC)** og efteruddanne netværksteamet i håndtering af *channel overlap*, *signal degradation* og *roaming*.

![[Table 24-1 - Key Topics for Chapter 24.png]]
