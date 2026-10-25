---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - "Kapitel 11 - Configure Wireless Devices and Technologies"
  - "NA - Bog - Kapitel 11"
---

# Kapitel 11: Configure Wireless Devices and Technologies

> **Bog-PDF:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 11 - Configure Wireless Devices and Technologies.pdf]]
> **Relateret begrebsark:** [[NA - Begrebsark]] Kap. 11

---

## Resumé

Kapitel 11 dækker **Objective 2.3 (Given a scenario, select and configure wireless devices and technologies)** i CompTIA Network+ (N10-009)-pensummet. Kapitlet gennemgår opbygningen af trådløse lokalnetværk (**WLANs**), herunder forskellen på en trådløs router og et **Wireless Access Point (AP)**, styringsarkitekturer (**Autonomous AP** vs. **Lightweight AP / LWAP** med en **WLC**), **Guest Networks** med **Captive Portals**, antennetyper (**Omnidirectional** vs. **Unidirectional/Directional** og *gain* målt i **dBi**), kanal- og frekvensvalg (`2.4 GHz`, `5 GHz`, `6 GHz`, **Channel Width**, **802.11h / DFS / TPC** og **Band Steering**), WLAN-topologier (**IBSS / Ad hoc**, **BSS**, **ESS**, **Mesh** og **Point-to-Point**), interferenskilder og celleoverlap (`10 %–15 %`) samt trådløs sikkerhed (**War Driving / War Chalking / War Flying**, **Rogue APs**, **WPA2**, **WPA3 / SAE**, **PSK / Personal** vs. **Enterprise / IEEE 802.1X / RADIUS / EAP** og **Geofencing**).

---

## 1. Grundlæggende WLAN-koncepter og Komponenter

### Wireless Routers vs. Wireless Access Points (APs)
- **Wireless Router (SOHO-enhed):** Kombinerer typisk flere funktioner i én fysisk boks: en **router** (med NAT/PAT og DHCP-server mod ISP'ens kabel-/fibermodem), en **Ethernet-switch** og et **trådløst access point**. Når en trådløs klient tilslutter sig, kaldes processen **association** (associering).

![[Figure 11-1 - Basic WLAN Topology with a Wireless Router.png]]

- **Wireless Access Point (AP):** I virksomhedsnetværk fungerer et AP som en **trådløs bro (Layer 2 bridge)** mellem det trådløse netværk (WLAN) og det kablede netværk (LAN). AP'et udfører hverken NAT eller PAT, og de trådløse klienter befinder sig på det samme subnet/VLAN, som AP'et formidler fra det kablede netværk.

![[Figure 11-2 - Basic WLAN Topology with a Wireless AP.png]]

### Autonomous vs. Lightweight Access Points (LWAPs)
Når en organisation administrerer sine access points, vælges der mellem to arkitekturer:
1. **Autonomous Access Points:** Selvstændige (*standalone*) enheder, hvor al konfiguration (SSID'er, sikkerhedspolitikker, VLAN-mapping, autentificering og RF-indstillinger) ligger lokalt på hvert enkelt AP. Velegnet til små miljøer med kun et par AP'er, men tidskrævende at administrere i store netværk.
2. **Lightweight Access Points (LWAPs):** Arbejder sammen med en central **Wireless LAN Controller (WLC)** (f.eks. Cisco Catalyst CW9800M) via styreprotokoller som **LWAPP (*Lightweight Access Point Protocol*)** eller **CAPWAP (*Control and Provisioning of Wireless Access Points*)**. LWAP'erne håndterer selve den fysiske radiotransmission, mens al central intelligens, konfiguration, firmwareopdatering, sikkerhed og roaming styres fra WLC'en. Ideelt til store enterprise- og campus-miljøer.

### Guest Networks og Captive Portals
- **Guest Networks (Gæstenetværk):** Giver besøgende internetadgang via et separat SSID/VLAN, der er fuldstændig **isoleret fra virksomhedens interne netværk** og følsomme data. Gæstenetværk har ofte båndbreddebegrænsninger og indholdsfiltrering.
- **Captive Portal:** En webside, som en ny bruger på et gæste- eller offentligt Wi-Fi automatisk omdirigeres til i sin browser, før internetadgang åbnes. Her skal brugeren typisk acceptere brugsbetingelser (*Terms of Service*), indtaste en gæstekode/voucher eller logge ind.

---

## 2. Antenner, Kanaler og Frekvensvalg

### Antennetyper og Gain (dBi)
Valget af antenne afhænger af ønsket rækkevidde, dækningsmønster, indendørs vs. udendørs miljø og behovet for at undgå interferens:
- **Gain (Forstærkning i `dBi`):** Måler hvor effektivt en antenne koncentrerer og udstråler energi i en bestemt retning sammenlignet med en teoretisk **isotropisk antenne** (som udstråler lige meget i alle retninger i en perfekt kugleform).
  $$G_{\text{dBi}} = 10 \times \log_{10}(G)$$
  - *Tommelfingerregel:* En forøgelse på **`+3 dB`** svarer til en **fordobling** af signalstyrken (udstrålet effekt).
- **Omnidirectional Antenna (Rundstrålende antenne):** Udstråler signalet med nogenlunde samme styrke $360^\circ$ horisontalt omkring antennen. Standardvalget til kontorer, hjem og SOHO, hvor AP'et placeres centralt i lokalet.

![[Figure 11-3 - Omnidirectional Antenna Coverage.png]]

- **Unidirectional / Directional Antenna (Retningsbestemt antenne):** Fokuserer radiobølgerne i én bestemt retning (f.eks. en **Yagi-antenne**, *patch*-antenne eller parabolantenne). Dette giver langt større rækkevidde i den valgte retning og reducerer interferens i andre retninger — ideelt til lange korridorer eller trådløse punkt-til-punkt forbindelser mellem bygninger.
- **Polarisering (Polarity):** To AP'er eller antenner, der kommunikerer med hinanden, bør have samme fysiske orientering (enten begge vertikale eller begge horisontale) for optimal signaloverførsel.

![[Figure 11-4 - Unidirectional Antenna Coverage.png]]

### Kanalbredde, Regulative Krav (802.11h) og Band Steering
- **Channel Width (Kanalbredde):** Angiver bredden af det frekvensbånd, der bruges til datatransmission — typisk **`20 MHz`, `40 MHz`, `80 MHz` eller `160 MHz`**. Bredere kanaler (via *channel bonding*) giver højere tophastighed, men reducerer antallet af tilgængelige ikke-overlappende kanaler og øger risikoen for interferens i tætbefolkede områder.
- **Non-overlapping Channels:** I `2.4 GHz`-båndet er kun kanalerne **`1`, `6` og `11`** ikke-overlappende i Nordamerika/Europa, mens `5 GHz`- og `6 GHz`-båndene tilbyder langt flere ikke-overlappende kanaler.
- **IEEE 802.11h (DFS & TPC):** Et tillæg til 802.11-standarden, der sikrer overholdelse af lovgivningsmæssige krav i **`5 GHz`-båndet** (særligt i Europa og USA), så Wi-Fi ikke forstyrrer militær-, vejr- og satellitradar:
  - **DFS (*Dynamic Frequency Selection*):** AP'et lytter efter radarsignaler og skifter automatisk til en anden kanal, hvis radar registreres.
  - **TPC (*Transmit Power Control*):** Justerer automatisk sendeeffekten ned til det nødvendige niveau for at begrænse interferens og strømforbrug.
- **Band Steering:** En funktion, hvor et dual-/tri-band AP automatisk registrerer klienter, der understøtter både `2.4 GHz` og `5 GHz` (eller `6 GHz`), og "styrer" dem over på **`5 GHz`-båndet** for at aflaste det overbelastede `2.4 GHz`-bånd og give klienten højere båndbredde.

---

## 3. WLAN-topologier, Interferens og AP-placering

### WLAN-netværkstyper og Service Sets (SSID, BSSID, ESSID)
- **SSID (*Service Set Identifier*):** Det menneskeligt læsbare navn på det trådløse netværk.
- **IBSS (*Independent Basic Service Set* / Ad hoc mode):** Trådløst peer-to-peer-netværk direkte mellem to eller flere klientenheder **uden brug af et AP** (f.eks. midlertidig fildeling mellem to laptops).

![[Figure 11-5 - Independent Basic Service Set (IBSS) WLAN.png]]

- **BSS (*Basic Service Set* – Infrastructure mode):** Et WLAN med **ét enkelt AP**, der forbinder trådløse klienter til det kablede netværk. Her identificeres AP'ets radio unikt ved sin **BSSID (*Basic Service Set Identifier*)**, som er **AP-radioens hardware MAC-adresse**.

![[Figure 11-6 - Basic Service Set (BSS) WLAN.png]]

- **ESS (*Extended Service Set* – Infrastructure mode):** Et større WLAN bestående af **to eller flere AP'er**, der deler det samme netværksnavn — kaldet et **ESSID (*Extended Service Set Identifier*)** — så brugere kan bevæge sig frit (*seamless roaming*) gennem en hel bygning eller campus uden at miste forbindelsen.

![[Figure 11-7 - Extended Service Set (ESS) WLAN.png]]

- **Wireless Mesh Network:** Flere trådløse mesh-noder/AP'er videresender trafik for hinanden til og fra internettet uden at hvert AP behøver eget Ethernet-kabeltræk; har desuden *self-healing*-egenskaber, hvis en node fejler.
- **Point-to-Point Wireless (Wireless Bridge):** En dedikeret trådløs forbindelse mellem to faste lokationer (f.eks. to bygninger på hver sin side af en vej) ved hjælp af **retningsbestemte antenner**.

### Kilder til Interferens (Sources of Interference)
Trådløse signaler (især i `2.4 GHz`-båndet) påvirkes af både **RFI (*Radio Frequency Interference*)** og fysiske forhindringer:
- **Andre WLAN-enheder:** AP'er i nærheden, der bruger samme eller overlappende kanaler.
- **Trådløse telefoner (*Cordless phones*):** Ældre trådløse telefoner i `2.4 GHz`-båndet (løsning: brug **DECT**-telefoner, som typisk bruger `1.9 GHz`).
- **Mikrobølgeovne:** Udsender kraftig elektromagnetisk støj i `2.4 GHz`-båndet.
- **Trådløse overvågningskameraer og babyalarmer:** Opererer ofte i `2.4 GHz`-båndet.
- **Fysiske forhindringer:** Metalarkivskabe, elevatorer, armeret beton og store ventilationsanlæg reflekterer, spreder (*scattering*) eller absorberer radiobølger.

### AP-placering og Celleoverlap (`10 %–15 %`)
Når man designer et **ESS-netværk** med flere AP'er, skal naboceller konfigureres på **ikke-overlappende kanaler** (f.eks. `1`, `6` og `11` i en bikubestruktur / *honeycomb*-mønster for `2.4 GHz`), mens deres fysiske dækningsområder bør have et **overlap på `10 % til 15 %`**, så klienter kan roame uden tab af pakker.

![[Figure 11-8 - Coverage Overlap in Coverage Areas for Non-overlapping Channels.png]]

![[Figure 11-9 - Non-overlapping Coverage Cells for the 2.4GHz Band.png]]

---

## 4. Trådløs Sikkerhed (Securing Wireless LANs)

### Trådløse Sikkerhedstrusler
- **War Driving / War Flying:** Angribere kører rundt i bil (*war driving*) eller bruger droner (*war flying*) med Wi-Fi-scanningsudstyr for at kortlægge åbne eller svagt sikrede trådløse netværk.
- **War Chalking:** At tegne kridtsymboler på mure eller fortove i det offentlige rum for at vise andre, at der findes et åbent eller sårbart Wi-Fi-netværk samt dets SSID og sikkerhedstype.

![[Figure 11-10 - War-Chalking Symbols.png]]

- **WEP og WPA Cracking:** De ældre standarder **WEP (*Wired Equivalent Privacy*)** og **WPA** (med TKIP/RC4) er sårbare over for kendte nøgle-crackingværktøjer og må ikke bruges i moderne netværk.
- **Rogue Access Point & Evil Twin:** En uautoriseret person tilslutter et **Rogue AP** til netværket, eller en angriber opstiller et AP med samme SSID som virksomhedens legitime Wi-Fi (**Evil Twin**) og kraftigere signalstyrke for at lokke klienter til at forbinde og opsnappe deres trafik med en *packet sniffer*.

### Sikkerhedsmetoder, Autentificering og Kryptering
- **Svage tiltag (ikke tilstrækkelige alene):**
  - *Open Authentication:* Ingen adgangskode eller kryptering (kun egnet til offentlige hotspots, evt. med Captive Portal).
  - *MAC Address Filtering (Allowlist/Blocklist):* Kræver stor manuel vedligeholdelse og kan let omgås med **MAC spoofing**.
  - *Disabling SSID Broadcast:* Skjuler kun navnet i almindelige netværkslister; SSID'et kan stadig aflæses i klartekst i management frames med en netværkssniffer.
- **Personal Mode (PSK / SAE) vs. Enterprise Mode (IEEE 802.1X):**
  - **Personal Mode (Pre-Shared Key / PSK):** Alle brugere deler den samme adgangskode (*passphrase*) på AP'et. Nemt i hjemmet og SOHO, men skalerer dårligt i virksomheder (hvis én medarbejder stopper, skal koden ændres på samtlige enheder).
  - **Enterprise Mode (IEEE 802.1X + RADIUS):** Hver bruger logger ind med sine egne individuelle brugeroplysninger eller digitale certifikater via **IEEE 802.1X** og **EAP (*Extensible Authentication Protocol* — f.eks. EAP-TLS, EAP-TTLS, PEAP-MSCHAPv2, EAP-FAST)**. Arkitekturen består af tre roller:
    1. **Supplicant:** Den trådløse klient (f.eks. laptop eller smartphone).
    2. **Authenticator:** Det trådløse Access Point (eller WLC), som blokerer adgang indtil godkendelse.
    3. **Authentication Server:** En **RADIUS-server** (ofte integreret med Microsoft Active Directory), der verificerer brugerens identitet.

![[Figure 11-11 - IEEE 802.1X Security for a WLAN.png]]

### WPA2 vs. WPA3
| Sikkerhedsstandard | IEEE-grundlag | Personal Mode Autentificering | Enterprise Mode Autentificering | Kryptering & Beskyttelse |
| :--- | :--- | :--- | :--- | :--- |
| **WPA2** | `IEEE 802.11i` | **PSK** (Pre-Shared Key; sårbar over for offline dictionary-angreb på 4-way handshake) | `IEEE 802.1X` / EAP / RADIUS | **AES-CCMP** (`128-bit`) |
| **WPA3** | Wi-Fi Alliance (2018+) | **SAE (*Simultaneous Authentication of Equals*)** — forhindrer offline dictionary-angreb og giver *Forward Secrecy* | `IEEE 802.1X` / EAP / RADIUS | **AES-GCMP** (op til **`192-bit` kryptografisk styrke** i WPA3-Enterprise) |

---

## 5. Øvrige Trådløse Teknologier & Geofencing

- **PAN- og nærfeltsteknologier:** **Bluetooth**, **Infrared (IR)** og **NFC (*Near Field Communication*)** anvendes til korte afstande, kontaktløs betaling, adgangskort og IoT-enheder.
- **Geofencing:** Bruger **GPS**, **RFID**, **Wi-Fi** eller **mobilnetværk** til at definere en virtuel geografisk grænse omkring et fysisk område (f.eks. et hospital eller en bygning). Hvis en virksomhedstablet krydser grænsen, kan systemet udløse en alarm eller låse enheden.
  - **Active Geofencing:** Kræver at brugeren har givet tilladelse til lokationstjenester (GPS/RFID), og at en mobilapp er åben.
  - **Passive Geofencing:** Altid aktiv i baggrunden baseret på Wi-Fi og mobildata uden brug af GPS.

---

## 6. Real-World Case Study & Nøgleemner

I kapitlets case-studie får *Acme, Inc.* udført et professionelt **Wireless Site Survey** (med udarbejdelse af et **Heat Map** før og efter installationen). På grund af kraftig støj i `2.4 GHz`-båndet fra nabovirksomheder i bygningen vælger de **802.11ax (Wi-Fi 6)** på **`5 GHz`-båndet**, sikret med **WPA3-Enterprise (IEEE 802.1X)** op mod en **RADIUS-server** koblet til Active Directory, samt et isoleret **Guest SSID** til besøgende.

![[Table 11-1 - Key Topics for Chapter 11.png]]
