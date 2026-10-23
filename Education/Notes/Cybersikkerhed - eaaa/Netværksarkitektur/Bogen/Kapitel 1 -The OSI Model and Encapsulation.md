Resume

Sider i bogen
[[CompTIA Network+ N10-009 Cert Guide - Kapitel 1 -The OSI Model and Encapsulation.pdf]]

For termer og udtryk, se [[NA Begrebsark]] Kap. 1

---
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - OSI Model and Encapsulation
---

# CompTIA Network+ N10-009: Kapitel 1 – The OSI Model and Encapsulation

## 1. Referencemodellers formål
- **Fælles referenceramme:** Gør det muligt at sammenligne og integrere teknologier på tværs af forskellige producenter.
- **Fejlsøgning:** Strukturerer fejlfinding ved at isolere netværksproblemer til specifikke lag.
- **Reference vs. Reverence:** Modellen er en konceptuel opdeling; protokoller passer ikke altid 100 % ind i ét specifikt lag.

---

## 2. OSI-modellen (7 lag)

| Lag # | Navn | PDU | Primære funktioner & protokoller |
| :--- | :--- | :--- | :--- |
| **7** | **Application** | Data | Tjenester til brugerapplikationer (ikke selve programmerne som Word/Outlook). Fildeling, e-mail (SMTP, IMAP), service advertisements (Active Directory). |
| **6** | **Presentation** | Data | Dataformatering (f.eks. ASCII, EBCDIC), komprimering samt kryptering/dekryptering. |
| **5** | **Session** | Data | Opsætning, vedligeholdelse og nedlukning af sessioner mellem enheder. Eksempel: Session Initiation Protocol (SIP). |
| **4** | **Transport** | Segment | End-to-end levering og flow control (**windowing** og **buffering**). Protokoller: TCP, UDP, ICMP. |
| **3** | **Network** | Packet | Logisk adressering (IPv4, IPv6), routing (path selection) og packet switching. |
| **2** | **Data Link** | Frame | Fysisk adressering, adgang til mediet samt fejl- og flowkontrol. Opdelt i MAC- og LLC-sublayers. |
| **1** | **Physical** | Bit | Fysisk og elektrisk transmission over mediet. Kabler, stik (RJ-45), spænding/lys, topologier, modulations- og multiplexingmetoder. |

> [!tip] Mnemonics til lagene
> - **Top-down (7 → 1):** *All People Seem To Need Data Processing*
> - **Bottom-up (1 → 7):** *Please Do Not Throw Sausage Pizza Away*
> - **PDU'er (4 → 1):** *Some People Fear Birthdays* (Segments, Packets, Frames, Bits)

---

## 3. Detaljer om centrale lag

### Lag 2: Data Link Layer
Opdelt i to sublayers:
- **MAC (Media Access Control):**
  - Fysisk adressering: 48-bit MAC-adresse i hex (første 24 bit = OUI/producentkode, sidste 24 bit = unikt serienummer).
  - Styrer metoden til at sende på det fysiske medie samt logisk topologi.
- **LLC (Logical Link Control):**
  - **Connection services:** Flow control og fejlkontrol via checksum / Cyclic Redundancy Check (CRC).
  - **Synkronisering:** Isochronous (fælles eksternt ur), Asynchronous (start/stop-bits, paritetsbits), Synchronous (delt clock-signal eller synkroniseringskarakterer).
  - Håndhæver **Maximum Transmission Unit (MTU)**.

### Lag 3: Network Layer
- **Adresser:** Logiske adresser (IPv4 / IPv6).
- **IP-header nøglefelter:**
  - `Source Address` og `Destination Address`.
  - `Protocol`: Angiver L4-protokol (f.eks. TCP = 6, UDP = 17).
  - `TTL (Time-to-Live)`: Dekrementeres med 1 for hvert router-hop; kasserer pakken ved TTL = 0 for at forhindre routing loops.

### Lag 4: Transport Layer
- **TCP (Transmission Control Protocol):**
  - Connection-oriented og pålidelig.
  - Bruger **sequence numbers**, **acknowledgments (ACK)** og **sliding window** (dynamisk flow control baseret på Round-Trip Time / RTT).
- **UDP (User Datagram Protocol):**
  - Connectionless og upålidelig (best-effort).
  - Meget lav overhead; velegnet til realtidstrafik (stemme, video) og simple forespørgsler (DNS).

---

## 4. TCP/IP-stakken vs. OSI-modellen

| TCP/IP Lag | Tilsvarende OSI-lag | Protokoleksempler |
| :--- | :--- | :--- |
| **Application** | Lag 7, 6, 5 | HTTP, HTTPS, SSH, DNS, DHCP, SIP |
| **Transport** | Lag 4 | TCP, UDP |
| **Internet** | Lag 3 | IPv4, IPv6, ICMP |
| **Network Interface** | Lag 2, 1 | Ethernet, Wi-Fi, PPP |

---

## 5. Portnumre og Indkapsling

> [!info] Port-klassifikation
> - **Well-known ports (0 – 1023):** Reserveret til standardtjenester (f.eks. HTTP: 80, HTTPS: 443, DNS: 53, SSH: 22).
> - **Ephemeral / Dynamic ports (1024 – 65535):** Allokeres midlertidigt af klienter som kildeport for at adskille parallelle forbindelser.

### Indkapslingsprocessen (Data Flow)
1. **Application:** Genererer ren payload (data).
2. **Transport:** Tilføjer L4-header (porte, sekvensnumre) $\rightarrow$ **Segment**.
3. **Network:** Tilføjer L3-header (kilde- og destinations-IP, TTL) $\rightarrow$ **Packet**.
4. **Data Link:** Tilføjer L2-header (MAC-adresser) og trailer (FCS/CRC) $\rightarrow$ **Frame**.
5. **Physical:** Konverterer framen til fysiske signaler $\rightarrow$ **Bits**.
*(Ved modtagelse vendes processen om via **decapsulation**).*