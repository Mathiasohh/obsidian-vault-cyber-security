---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - "Kapitel 25 - Network Troubleshooting Tools"
  - "NA - Bog - Kapitel 25"
---

# Kapitel 25: Network Troubleshooting Tools

> **Bog-PDF:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 25 - Network Troubleshooting Tools.pdf]]
> **Relateret begrebsark:** [[NA - Begrebsark]] Kap. 25

---

## Resumé

Kapitel 25 dækker **Objective 5.5 (Given a scenario, use the appropriate tool or protocol to solve networking issues)** i CompTIA Network+ (N10-009)-pensummet. Kapitlet samler de vigtigste værktøjer og kommandoer til praktisk netværksfejlfinding i fire kategorier:
1. **Softwareværktøjer & Opdagelsesprotokoller:** **Protocol Analyzer** (**Wireshark**), **Bandwidth Speed Tester**, **Port Scanner** & **IP Scanner**, **`iperf`**, **NetFlow Analyzers**, **TFTP Server**, **Terminal Emulator** samt Layer 2-naboopdagelsesprotokollerne **LLDP (*Link Layer Discovery Protocol*)** og **CDP (*Cisco Discovery Protocol*)**.
2. **Kommandolinjeværktøjer (CLI Tools på Windows, Linux & macOS):** **`ping`**, **`ipconfig`** / **`ifconfig`** / **`ip`**, **`nslookup`** og **`dig`**, **`traceroute`** / **`tracert`**, **`arp`**, **`netstat`**, **`hostname`**, **`route`**, **`telnet`**, **`tcpdump`** og **`nmap`**.
3. **Basis-kommandoer på Netværksenheder (Router/Switch CLI):** **`show interface`**, **`show config`** (`show running-config` / `show startup-config`), **`show route`** (`show ip route`), **`show mac-address-table`**, **`show arp`**, **`show vlan`** og **`show power`**.
4. **Hardwareværktøjer:** **Wi-Fi Analyzer**, **Tone Generator & Probe (Toner)**, **Cable Tester**, **Network Tap (*Test Access Point*)** og **Visual Fault Locator (VFL)**.

---

## 1. Softwareværktøjer og Opdagelsesprotokoller (Software Tools)

- **Protocol Analyzer / Packet Capture (f.eks. Wireshark):** Opsnapper og dekoder netværkspakker i realtid, så man kan inspicere samtlige lag-headere og payloads, finde *top talkers*, analysere håndtryksfejl og identificere fejlkonfigurerede protokoller.

![[Figure 25-1 - Wireshark Protocol Analyzer Software.png]]

- **Bandwidth Speed Tester (f.eks. `speedtest.net`):** Måler upload-/download-throughput og ping-latency fra en klient mod en server på internettet for hurtigt at afgøre, om hele internetforbindelsen er langsom, eller om problemet kun gælder en enkelt applikation.
- **Port Scanner & IP Scanner:**
  - En **Port Scanner** undersøger en vært (eller et helt subnet via et *port sweep*) for at se, hvilke TCP- og UDP-porte der er **åbne, lukkede eller filtrerede**.
  - En **IP Scanner** scanner et adresseinterval hurtigt for at kortlægge aktive IP-adresser, MAC-adresser og hostnames.
- **`iperf`:** Et aktivt kommandolinjeværktøj (på tværs af Linux og Windows), der tester den **maksimale opnåelige båndbredde/throughput**, pakketab og jitter mellem to endepunkter i et IP-netværk ved at generere testtrafik med **TCP, UDP eller SCTP**.
- **NetFlow Analyzers:** Indsamler og visualiserer flow-statistik fra routere og switche (hvem kommunikerer med hvem, hvilke protokoller bruger mest båndbredde, og hvor opstår flaskehalse).
- **TFTP Server & Terminal Emulator:**
  - **TFTP Server:** Lav-overhead server til opbevaring og udrulning af router/switch-konfigurationsfiler (backups/golden configs) og OS/firmware-images.
  - **Terminal Emulator (f.eks. PuTTY, SecureCRT):** Bruges til at oprette CLI-forbindelse til netværksudstyr via **SSH**, seriel **Console** eller Telnet.
- **LLDP (*Link Layer Discovery Protocol*) & CDP (*Cisco Discovery Protocol*):**
  - Begge er **Layer 2 (Data Link Layer) naboopdagelsesprotokoller**, hvormed direkte forbundne netværksenheder (switche, routere, AP'er, IP-telefoner) periodisk udveksler oplysninger om sig selv (enhedsnavn, port-ID, VLAN, IP-adresse, OS-version og PoE-krav), hvilket gør det let at kortlægge og fejlfinde fysiske forbindelser:
  - **LLDP (`IEEE 802.1AB`):** Leverandøruafhængig (**åben standard**).
  - **CDP:** **Cisco-proprietær** protokol (understøttes dog også af mange tredjeparts IP-telefoner).

---

## 2. Kommandolinjeværktøjer (Command-Line Tools)

### `ping` (Test af IP-forbindelse og RTT)
Bruger **ICMP (`Echo Request` og `Echo Reply`)** til at teste Layer 3 IP-forbindelse (både IPv4 og IPv6 med `ping -6` / `ping6`) og måle **Round-Trip Time (RTT)**.

![[Table 25-1 - Parameters for the Windows ping Command.png]]

- **Vigtige Windows `ping`-parametre:**
  - `-t`: Pinger kontinuerligt indtil brugeren trykker `Ctrl+C`.
  - `-n <count>`: Angiver antallet af echo requests, der skal sendes (standard i Windows er `4`).
  - `-l <size>`: Angiver størrelsen på payloaden i bytes (standard er `32 bytes`).
  - `-f`: Sætter **"Don't Fragment" (DF)-bitten** i IP-headeren (nyttigt til at fejlfinde **MTU / fragmentation**-problemer).
  - `-i <TTL>`: Sætter *Time to Live (TTL)*-værdien.
  - `-S <srcaddr>`: Angiver kilde-IP-adressen.

---

### `ipconfig`, `ifconfig` og `ip` (Visning og administration af IP-konfiguration)
- **`ipconfig` (Windows):** Viser netværkskortenes IPv4/IPv6-adresse, subnetmaske og default gateway.
  - `ipconfig /all`: Viser fuld konfiguration inkl. **MAC-adresse (*Physical Address*)**, **DNS-servere**, **DHCP-server** og lease-tider.
  - `ipconfig /release` & `ipconfig /renew` (samt `/release6` og `/renew6`): Frigiver og fornyer en **DHCP-lease** ved IP-fejlfinding *(og `ipconfig /flushdns` tømmer den lokale DNS-resolver cache)*.

![[Table 25-2 - Parameters for the Windows ipconfig Command.png]]

- **`ifconfig` og `ip` (Linux / UNIX / macOS):**
  - `ifconfig`: Klassisk UNIX/Linux-kommando til at se og konfigurere netværksinterfaces (IP-adresse, netmaske, MAC-adresse og pakketællere).
  - `ip` (f.eks. `ip addr` / `ip address` / `ip route` / `ip link`): Den moderne erstatning for `ifconfig` på nyere Linux-distributioner.

---

### `nslookup` og `dig` (DNS-fejlfinding)
- **`nslookup` (*Name Server Lookup* – Windows, Linux, macOS):** Forespørger en DNS-server for at oversætte et domænenavn (**FQDN**) til en IP-adresse (eller omvendt). Kan køres direkte som en enkelt kommando (*noninteractive*: `nslookup ajsnetworking.com`) eller i **interaktiv tilstand** (`nslookup` → `>` prompt).
- **`dig` (*Domain Information Groper* – Linux / UNIX / macOS):** Kommandolinjeværktøj (kun *noninteractive*) til DNS-opslag, som leverer **langt mere detaljeret output** end `nslookup` — herunder specifikke sektioner (`QUESTION SECTION`, `ANSWER SECTION`), præcis **DNS-recordtype** (f.eks. `A`, `AAAA`, `MX`, `TXT`), **TTL-værdi** og svartid i millisekunder.

---

### `traceroute` og `tracert` (Sporing af router-hops)
Viser **hvert enkelt router-hop** på vejen fra kilde til destination samt tre *round-trip* svartider pr. hop, så man præcist kan se, **hvor på ruten pakker droppes eller forsinkes**:
- **`tracert`** (Windows — bruger ICMP Echo Requests med stigende TTL fra `1`, `2`, `3`...).
- **`traceroute`** (Linux / UNIX / macOS / Cisco IOS — samt `traceroute6` / `tracert -6` til IPv6).

---

### `arp` (Inspektion og redigering af ARP-cachen)
Viser og administrerer værtens lokale **ARP-tabel (IP-adresse ↔ MAC-adresse mappings)**:
- `arp -a` (eller `arp -g`): Viser alle aktuelle dynamiske og statiske opslag i ARP-tabellen.
- `arp -d <IP>` (eller `arp -d *`): Sletter en specifik eller alle ARP-indtastninger.
- `arp -s <IP> <MAC>`: Tilføjer en statisk ARP-mapping.

![[Table 25-3 - Parameters for the Windows arp Command.png]]

---

### `netstat` (Aktive netværksforbindelser og lyttende porte)
Viser aktive TCP/UDP-sessioner, lyttende porte og protokolstatistik på den lokale maskine:
- `netstat -a`: Viser **alle** aktive forbindelser og lyttende TCP/UDP-porte.
- `netstat -b`: Viser **navnet på den eksekverbare fil/applikation** (f.eks. `firefox.exe`, `OUTLOOK.exe` eller ukendt malware), der har åbnet hver enkelt port/forbindelse.
- `netstat -n`: Viser adresser og portnumre numerisk (hurtigere uden DNS-opslag).
- `netstat -r`: Viser værtens lokale IP-routingtabel (samme som `route print`).
- `netstat -e` / `netstat -s`: Viser Ethernet- og protokolstatistik (IPv4/IPv6/TCP/UDP/ICMP).

![[Table 25-4 - Parameters for the Windows netstat Command.png]]

---

### `hostname`, `route`, `telnet`, `tcpdump` og `nmap`
- **`hostname`:** Viser computerens eget værtsnavn på både Windows og Linux (på Linux kan kommandoen også bruges til at ændre værtsnavnet).
- **`route` (Windows / Linux):** Viser og redigerer maskinens lokale IP-routingtabel (`route print`, `route add`, `route delete`, `route change`; flaget `-p` gør en tilføjet rute **persistent** hen over genstart, og `-f` rydder gateway-tabellen).

![[Table 25-5 - Parameters for the Windows route Command.png]]

- **`telnet`:** Ældre, ukrypteret CLI-fjernadgang (`TCP port 23`); bruges i dag kun i laboratorier eller til hurtigt at teste, om en specifik TCP-port svarer.
- **`tcpdump`:** Hurtig, kommandolinjebaseret **packet sniffer** til Linux/UNIX/macOS. Udskriver pakke-headere direkte i terminalen eller gemmer rå trafik til en `.pcap`-fil med **`-w <filnavn>`** (som bagefter kan læses med **`-r <filnavn>`** eller åbnes grafisk i **Wireshark**).
- **`nmap` (*Network Mapper*):**Alsidigt open-source værktøj til **netværksopdagelse (*host discovery*), portscanning, service-/versionsdetektion og OS-fingerprinting** samt sikkerhedsaudits.

---

## 3. Basis-kommandoer på Netværksenheder (Router & Switch CLI)

Til CompTIA Network+ eksamenen skal man kende formålet med disse syv centrale `show`-kommandoer på switche og routere:

| Kommando (Generisk / Cisco IOS) | Formål og hvad outputtet viser |
| :--- | :--- |
| **`show interface`** (`show interfaces`) | Viser fysisk og logisk status (`up/up`, `down/down`, `administratively down`), hastighed, **duplex**, **MTU**, båndbredde samt tællere for **CRC-fejl, input/output errors, runts, giants og collisions**. |
| **`show config`** (`show running-config` / `show startup-config`) | Viser enhedens konfiguration: `show running-config` viser den aktive konfiguration i **RAM**, mens `show startup-config` viser opstartskonfigurationen gemt i **NVRAM**. |
| **`show route`** (`show ip route`) | Viser routerens eller L3-switchens **IP-routingtabel** (direkte forbundne netværk `C`, statiske ruter `S`, default gateway of last resort `*` samt dynamiske ruter som OSPF `O` og BGP `B`). |
| **`show mac-address-table`** | Viser switchens **Layer 2 MAC-adressetabel (CAM-tabel)**, der kobler lærte MAC-adresser sammen med specifikke fysiske switchporte og VLANs. |
| **`show arp`** (`show ip arp`) | Viser enhedens **ARP-tabel** med mappings mellem IPv4-adresser og deres tilhørende Layer 2 MAC-adresser. |
| **`show vlan`** (`show vlan brief`) | Viser switchens **VLAN-database** (oprettede VLAN-ID'er, navne, status og hvilke switchporte der er tildelt hvert VLAN). |
| **`show power`** (`show power inline`) | Viser strømforsyningsstatus samt **Power over Ethernet (PoE)**-forbrug og tilgængeligt PoE-budget pr. switchport. |

---

## 4. Hardwareværktøjer (Hardware Tools)

- **Wi-Fi Analyzer:** Dedikeret håndholdt måleenhed eller laptop/mobil-værktøj, der scanner det trådløse frekvensspektrum for at måle **signalstyrke (RSSI), kanaludnyttelse, kanaloverlap, støj/SNR og Rogue APs** samt generere **Heat Maps** under et *Wireless Site Survey*.
- **Tone Generator and Probe ("Toner" / "Fox and Hound"):** Bruges til at finde og følge et specifikt kobberkabel i et uoverskueligt bundt eller på en punchdown-blok/patchpanel: **Tonegeneratoren** sættes i vægstikket på kontoret og sender et elektrisk lydsignal ind i kablet, mens **proben (sonden)** føres hen over kablerne i krydsfeltet og bipper højest ved det rigtige kabel.
- **Cable Tester (Kabeltester / Certifier):** Sættes i begge ender af et kobberkabel for at teste **kontinuitet (*continuity*)** og afsløre fysiske kabelfejl som **kabelbrud (*opens*), kortslutninger (*shorts*), ombyttede par (*crossed/reversed pairs*) og *split pairs***. Avancerede testere måler også kabellængde, dæmpning (*attenuation*) og *crosstalk*.
- **Network Tap (*Test Access Point*):** En fysisk hardwareenhed, der indsættes *inline* på et kobber- eller fiberkabel mellem to netværksenheder og sender en 100 % nøjagtig, passiv kopi af al trafik i begge retninger videre til en **packet sniffer / IDS-sensor** (uden at belaste en switchs CPU som *Port Mirroring/SPAN* gør).
- **Visual Fault Locator (VFL):** En kompakt, håndholdt **rød lasertester** til **fiberoptiske kabler**. Den sender synligt rødt laserlys ind i fiberen; hvis der er et brud, en dårlig splejsning eller et for skarpt knæk (*macrobend*), lyser det røde lys tydeligt ud gennem fiberkappen på fejlstedet.

---

## 5. Real-World Case Study & Nøgleemner

I kapitlets case-studie opgraderer *Acme, Inc.* sin fejlfindingskapacitet ved at kombinere enterprise **Protocol Analyzers** og **Port Scanners** med målrettet CLI-træning af junior-teknikere i både OS-kommandoer (`ping`, `ipconfig`, `tracert`, `dig`, `netstat`) og router/switch `show`-kommandoer samt udlevering af fysiske værktøjskits med **Cable Testers, Toners, VFLs og Wi-Fi Analyzers**.

![[Table 25-6 - Key Topics for Chapter 25.png]]
