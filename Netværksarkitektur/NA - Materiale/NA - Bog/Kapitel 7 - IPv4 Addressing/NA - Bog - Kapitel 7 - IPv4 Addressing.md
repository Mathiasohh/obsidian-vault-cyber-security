---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - "Kapitel 7 - IPv4 Addressing"
  - "Kapitle 7 - IPv4 Addressing"
  - "NA - Bog - Kapitel 7"
---

# Kapitel 7: IPv4 Addressing

> **Bog-PDF:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 7 - IPv4 Addressing.pdf]]
> **Relateret begrebsark:** [[NA - Begrebsark]] Kap. 7

---

## Resumé

Kapitel 7 dækker **Objective 1.7 (Given a scenario, use appropriate IPv4 network addressing)** i CompTIA Network+ (N10-009)-pensummet. Selvom IPv6 (128-bit) vinder frem, er **IPv4 (32-bit)** fortsat det mest udbredte Layer 3-adresseringsskema i virksomhedsnetværk. Kapitlet starter med **binær talregning** (konvertering mellem 8-bit binære tal og decimaltal) og gennemgår derefter **IPv4-adressens opbygning** (opdeling i netværksdel og hostdel ved hjælp af en **subnetmaske** i både *dotted-decimal* og *prefix/CIDR-notation*), de fem **IPv4-adresseklasser** (**Class A, B, C, D og E**), **loopback/localhost (`127.0.0.1`)**, **offentlige vs. private IP-adresser (RFC 1918)** samt **APIPA (`169.254.0.0/16`)**. Endelig giver kapitlet en grundig trin-for-trin gennemgang af **Subnetting**, **VLSM (*Variable-Length Subnet Masking*)** og **CIDR (*Classless Inter-Domain Routing* / ruteaggregering)** med tilhørende beregningsformler og praktiske øvelser.

---

## Introduktion og Indholdsoversigt

Kapitlet dækker følgende hovedområder:
- [[#1. Binary Numbering (Binær Talregning)]]
- [[#2. IPv4 Address Structure (Opbygning af IPv4-adresser)]]
- [[#3. IPv4 Address Classes (Adresseklasser)]]
- [[#4. Private and Public IP Addresses (RFC 1918, NAT, APIPA & Loopback)]]
- [[#5. Assigning IPv4 Addresses (IP-komponenter & Tildelingsmetoder)]]
- [[#6. Subnetting & VLSM]]
- [[#7. Subnetmasker (Dotted-Decimal ↔ Prefix Notation)]]
- [[#8. Beregning af Subnets (Interesting Octet & Block Size)]]
- [[#9. CIDR (Classless Inter-Domain Routing)]]
- [[#10. Real-World Case Study, Opsummering & Nøgleformler]]

---

## 1. Binary Numbering (Binær Talregning)

### Grundprincipper
- En **IPv4-adresse** består af **32 bits**, som er opdelt i **4 oktetter** (*octets*) á **8 bits** (adskilt af punktummer).
- Til sammenligning består en **IPv6-adresse** af **128 bits** (fire gange så mange bits).
- Hvor vi i hverdagen bruger titalssystemet (*base 10*, cifrene `0–9`), arbejder computere og netværksudstyr i det **binære talsystem (*base 2*)**, som kun bruger to cifre: `0` og `1`.
- For at arbejde med subnetmasker og IPv4-adresser skal man hurtigt kunne konvertere en 8-bit oktet mellem binær og decimal ved hjælp af **8-bit konverteringstabellen**, hvor kolonneoverskrifterne er potenser af 2 fra højre mod venstre ($2^0 = 1$ til $2^7 = 128$):

![[Table 7-1 - Binary Conversion Table.png]]

### Binær → Decimal
- Indsæt de 8 binære cifre i tabellen under kolonneværdierne **`128  64  32  16  8  4  2  1`**.
- **Læg kolonneværdierne sammen for alle de kolonner, hvor der står et `1`-tal.**
- *Eksempel 1:* Det binære tal `10010110` har `1`-taller under `128`, `16`, `4` og `2`:
  $$128 + 16 + 4 + 2 = \mathbf{150}$$

![[Table 7-2 - Binary Conversion Example 1.png]]

### Decimal → Binær
Start fra venstre kolonne (`128`) og spørg for hver kolonne: *"Er det resterende tal større end eller lig med kolonneværdien?"*
- Hvis **Ja**: Skriv `1` i kolonnen, og træk kolonneværdien fra tallet.
- Hvis **Nej**: Skriv `0` i kolonnen, og gå videre til næste kolonne til højre.

#### Eksempel 2: Konvertering af decimaltallet `167` til binær (Trin 1–8)
1. **Kolonne `128`:** Er $167 \ge 128$? **Ja** → sæt `1`, rest: $167 - 128 = 39$.
2. **Kolonne `64`:** Er $39 \ge 64$? **Nej** → sæt `0`.
3. **Kolonne `32`:** Er $39 \ge 32$? **Ja** → sæt `1`, rest: $39 - 32 = 7$.
4. **Kolonne `16`:** Er $7 \ge 16$? **Nej** → sæt `0`.
5. **Kolonne `8`:** Er $7 \ge 8$? **Nej** → sæt `0`.
6. **Kolonne `4`:** Er $7 \ge 4$? **Ja** → sæt `1`, rest: $7 - 4 = 3$.
7. **Kolonne `2`:** Er $3 \ge 2$? **Ja** → sæt `1`, rest: $3 - 2 = 1$.
8. **Kolonne `1`:** Er $1 \ge 1$? **Ja** → sæt `1`, rest: $1 - 1 = 0$.
- Resultat: `167` i decimal svarer til **`10100111`** i binær ($128 + 32 + 4 + 2 + 1 = 167$).

![[Table 7-3 - Binary Conversion Example 2 - Step 1.png]]
![[Table 7-4 - Binary Conversion Example 2 - Step 2.png]]
![[Table 7-5 - Binary Conversion Example 2 - Step 3.png]]
![[Table 7-6 - Binary Conversion Example 2 - Step 4.png]]
![[Table 7-7 - Binary Conversion Example 2 - Step 5.png]]
![[Table 7-8 - Binary Conversion Example 2 - Step 6.png]]
![[Table 7-9 - Binary Conversion Example 2 - Step 7.png]]
![[Table 7-10 - Binary Conversion Example 2 - Step 8.png]]

### Øvelser i binær konvertering (Fra bogen)

- **Øvelse 1 (Binær → Decimal):** Konverter `01101011` til decimal:
  - Kolonner med `1`: $64 + 32 + 8 + 2 + 1 = \mathbf{107}$.

![[Table 7-11 - Binary Conversion Exercise 1 - Base Table.png]]
![[Table 7-12 - Binary Conversion Exercise 1 - Solution Table.png]]

- **Øvelse 2 (Binær → Decimal):** Konverter `10010100` til decimal:
  - Kolonner med `1`: $128 + 16 + 4 = \mathbf{148}$.

![[Table 7-13 - Binary Conversion Exercise 2 - Base Table.png]]
![[Table 7-14 - Binary Conversion Exercise 2 - Solution Table.png]]

- **Øvelse 3 (Decimal → Binær):** Konverter `49` til binær:
  - $32 + 16 + 1 = 49 \implies$ **`00110001`**.

![[Table 7-15 - Binary Conversion Exercise 3 - Base Table.png]]
![[Table 7-16 - Binary Conversion Exercise 3 - Solution Table.png]]

- **Øvelse 4 (Decimal → Binær):** Konverter `236` til binær:
  - $128 + 64 + 32 + 8 + 4 = 236 \implies$ **`11101100`**.

![[Table 7-17 - Binary Conversion Exercise 4 - Base Table.png]]
![[Table 7-18 - Binary Conversion Exercise 4 - Solution Table.png]]

---

## 2. IPv4 Address Structure (Opbygning af IPv4-adresser)

### Dotted-Decimal Notation
- En 32-bit IPv4-adresse skrives i **dotted-decimal notation** som fire decimaltal (hver mellem `0` og `255`) adskilt af punktummer — f.eks. `10.1.2.3`.
- Hvert af de fire tal repræsenterer én **8-bit oktet**.

![[Figure 7-1 - Binary Representation of a Dotted-Decimal IP Address.png]]

### Netværksdel vs. Hostdel og Subnetmasken
En IPv4-adresse er opdelt i to dele:
1. **Network Portion (Netværksdel):** De sammenhængende bits længst til venstre (*contiguous left-justified bits*), som identificerer selve netværket/subnettet.
2. **Host Portion (Hostdel):** De resterende sammenhængende bits til højre (*contiguous right-justified bits*), som identificerer den specifikke vært (enhed) på netværket.

- **Subnetmasken (Subnet Mask):** En 32-bit maske, der består af en ubrudt række af binære **`1`'er** (som markerer **netværksbits**) efterfulgt af en ubrudt række af binære **`0`'er** (som markerer **hostbits**).
- *Eksempel (`10.1.2.3` med en 8-bit maske `255.0.0.0` / `/8`):*
  - De første 8 bits er netværksdel (`10`), og de sidste 24 bits er hostdel (`1.2.3`).
  - Når alle **hostbits sættes til `0`**, får man selve **netværksadressen**: **`10.0.0.0`**.

![[Figure 7-2 - Dividing an IP Address into a Network Portion and a Host Portion.png]]

![[Figure 7-3 - Network Address Calculation.png]]

### Prefix Notation (Skråstregsnotation)
- I stedet for at skrive subnetmasken i dotted-decimal (`255.0.0.0`, `255.255.0.0`, `255.255.255.0`) kan man angive antallet af `1`-bits efter en skråstreg: **`/8`**, **`/16`**, **`/24`** osv. (f.eks. `10.1.2.3/8`).

---

## 3. IPv4 Address Classes (Adresseklasser)

Historisk er IPv4-adresser opdelt i fem klasser (**Class A–E**), som **udelukkende bestemmes ud fra værdien i den første oktet**:

| Klasse | Første oktet (Decimal) | Binært startmønster | Classful Subnetmaske (Dotted-Decimal) | Classful Prefix | Anvendelse |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Class A** | **`1 – 126`** | `0xxxxxxx` | `255.0.0.0` | **`/8`** | Unicast (meget store netværk) |
| *(Loopback)* | *`127`* | *`01111111`* | *Reserveret (`127.0.0.0/8`)* | — | *Loopback / `localhost` (`127.0.0.1`)* |
| **Class B** | **`128 – 191`** | `10xxxxxx` | `255.255.0.0` | **`/16`** | Unicast (mellemstore/store netværk) |
| **Class C** | **`192 – 223`** | `110xxxxx` | `255.255.255.0` | **`/24`** | Unicast (mindre LANs, op til 254 hosts) |
| **Class D** | **`224 – 239`** | `1110xxxx` | *Ingen classful maske* | — | **Multicast** (destinationsadresser) |
| **Class E** | **`240 – 255`** | `1111xxxx` | *Ingen classful maske* | — | **Eksperimentel / Forskning** |

![[Table 7-19 - IP Address Classes.png]]

> **Vigtig eksamensdetalje:** En adresses klasse bestemmes **altid kun af den første oktet** — uanset hvilken subnetmaske der bruges! For eksempel er `10.2.3.0/24` stadig en **Class A-adresse** (fordi første oktet er `10`), selvom den er subnetted med en `/24`-maske.

---

## 4. Private and Public IP Addresses (RFC 1918, NAT, APIPA & Loopback)

### Offentlige IP-adresser (Public IP Addresses)
- Offentlige IP-adresser er **globalt unikke** og **internet-routable**.
- De administreres på verdensplan af **ICANN (*Internet Corporation for Assigned Names and Numbers*)** og **IANA (*Internet Assigned Numbers Authority*)** (tidligere *InterNIC*), som tildeler adresseblokke til regionale internetregistre (**RIRs**, f.eks. *ARIN* i Nordamerika og *RIPE NCC* i Europa), der viderefordeler dem til internetudbydere (**ISPs**).

### Private IP-adresser (RFC 1918)
For at modvirke udtømning af IPv4-adresser definerer **RFC 1918** specifikke adresseområder i Class A, B og C til **privat brug** internt i organisationer og hjemmenetværk:

| Klasse | RFC 1918 / Specielt Adresseområde | Classful Maske | Samlet CIDR-blok |
| :--- | :--- | :--- | :--- |
| **Class A (Privat)** | **`10.0.0.0 – 10.255.255.255`** | `255.0.0.0` | `10.0.0.0/8` (1 Class A-netværk) |
| **Class B (Privat)** | **`172.16.0.0 – 172.31.255.255`** | `255.255.0.0` | `172.16.0.0/12` (16 sammenhængende Class B-netværk) |
| **APIPA (Link-Local)** | **`169.254.0.0 – 169.254.255.255`** | `255.255.0.0` | `169.254.0.0/16` *(Ikke routbar!)* |
| **Class C (Privat)** | **`192.168.0.0 – 192.168.255.255`** | `255.255.255.0` | `192.168.0.0/16` (256 sammenhængende Class C-netværk) |

![[Table 7-20 - Private IP Networks.png]]

- **Hvorfor bruge private IP-adresser?**
  1. **Sparer på offentlige IPv4-adresser:** De samme private adresser kan genbruges i millioner af virksomheder og hjem verden over.
  2. **Sikkerhed:** Private IP-adresser rutes **ikke** på det offentlige internet og er ikke direkte tilgængelige udefra.
  3. **Fleksibelt netværksdesign:** Fri intern adressering i LAN/VLAN/WAN uden at skulle købe store offentlige IP-blokke.
- **NAT (*Network Address Translation*):** For at enheder med private IP-adresser kan kommunikere på internettet, oversætter en router eller firewall de interne private IP-adresser til én eller flere offentlige IP-adresser via **NAT / PAT**.

### Loopback / `localhost` (`127.0.0.0/8`)
- Hele området `127.0.0.0 – 127.255.255.255` (typisk **`127.0.0.1`**, som automatisk navngives **`localhost`**) er reserveret som **loopback-adresse**.
- Ved at køre `ping 127.0.0.1` eller `ping localhost` tester man, at enhedens egen **TCP/IP-protokolstak** er korrekt installeret og fungerer i operativsystemet.

### Sammenligning: Offentlig vs. Privat IP vs. APIPA

| Egenskab | Offentlig IP | Privat IP (RFC 1918) | APIPA (`169.254.x.x`) |
| :--- | :--- | :--- | :--- |
| **Rutes på internettet?** | Ja | Nej | Nej |
| **Rutes internt mellem VLANs/Subnets?** | Ja | Ja | **Nej** (kun lokalt subnet / link-local) |
| **Kræver NAT til internet?** | Nej | Ja | Kan ikke nå internettet |
| **Globalt unik?** | Ja | Nej (genbruges) | Nej |

---

## 5. Assigning IPv4 Addresses (IP-komponenter & Tildelingsmetoder)

### IP Addressing Components
En netværksenhed (f.eks. en klient-PC) har typisk brug for fire parametre for at kommunikere fuldt ud på tværs af netværk:
1. **IP Address:** Enhedens unikke 32-bit logiske adresse på subnettet.
2. **Subnet Mask:** Afgør hvilken del af IP-adressen der er netværksdel vs. hostdel (og dermed om en destination ligger på samme lokale subnet eller skal sendes til default gateway).
3. **Default Gateway:** Routerens IP-adresse på det lokale subnet, hvortil pakker sendes, når destinationen ligger på et **andet** subnet.
4. **DNS Server Address (evt. historisk WINS):** Oversætter *Fully Qualified Domain Names (FQDNs)* (f.eks. `www.ajsnetworking.com`) til IP-adresser (historisk blev Microsoft **WINS** brugt til NetBIOS-navneopslag på interne Windows-netværk).

### 1. Statisk konfiguration (Static Configuration)
Administratoren indtaster manuelt IP-adresse, subnetmaske, default gateway og DNS-servere på enheden. Bruges typisk til **servere, routere, switche, firewalls og netværksprintere**, hvis IP-adresse ikke må ændre sig. Bogen illustrerer trin-for-trin konfigurationen i Windows via *Control Panel* → *Network and Internet* → *Network and Sharing Center* → *Change adapter settings* → *Local Area Connection Properties* → *Internet Protocol Version 4 (TCP/IPv4) Properties*:

![[Figure 7-4 - Windows Control Panel.png]]
![[Figure 7-5 - Network and Internet Control Panel.png]]
![[Figure 7-6 - Network and Sharing Center.png]]
![[Figure 7-7 - Network Connections Window.png]]
![[Figure 7-8 - Local Area Connection Status Window.png]]
![[Figure 7-9 - Local Area Connection Properties.png]]
![[Figure 7-10 - Internet Protocol Version 4 (TCP-IPv4) Properties.png]]
![[Figure 7-11 - Advanced TCP-IP Settings - DNS Tab.png]]

### 2. Dynamisk konfiguration (Dynamic Configuration – BOOTP & DHCP)
Manuel konfiguration af hundredvis af klienter er tidskrævende og fejlbehæftet. Derfor anvendes **DHCP (*Dynamic Host Configuration Protocol*)** (en videreudvikling af den ældre **BOOTP**-protokol) til automatisk at tildele IP-adresse, subnetmaske, default gateway og DNS-servere fra en central pulje.

### 3. APIPA (Automatic Private IP Addressing)
Hvis en klient er sat til at hente IP-adresse automatisk via DHCP, men **ikke kan kontakte nogen DHCP-server**, tildeler operativsystemet automatisk sig selv en **APIPA-adresse** i intervallet **`169.254.0.0/16`** (`169.254.0.1 – 169.254.255.254` med masken `255.255.0.0`).
- Enheden kan kun kommunikere med andre enheder på **samme lokale kabelsegment/VLAN**, men har **ingen default gateway** og kan **ikke rutes** ud af subnettet.

![[Figure 7-12 - APIPA Configuration Enabled by Default.png]]

---

## 6. Subnetting & VLSM

### Formålet med Subnetting
Et standard Class A- eller Class B-netværk rummer henholdsvis `16.777.214` og `65.534` hosts. At placere så mange enheder i ét enkelt broadcast-domæne ville kvæle netværket i broadcast-trafik. **Subnetting** løser dette ved at "låne" hostbits (*borrowed bits*) og føje dem til netværksdelen af subnetmasken for at:
- Opdele et stort netværk i mindre, isolerede **broadcast-domæner** (subnets/VLANs)
- Udnytte IPv4-adressepladsen langt mere effektivt
- Understøtte **VLSM (*Variable-Length Subnet Masking*)**, hvor forskellige subnets i samme netværk tildeles forskellige maskelængder efter deres præcise behov (f.eks. `/30` med 2 brugbare adresser til point-to-point WAN-links, og `/24` med 254 brugbare adresser til et bruger-VLAN).

![[Table 7-21 - Assignable IP Addresses.png]]

---

## 7. Subnetmasker (Dotted-Decimal ↔ Prefix Notation)

Enhver gyldig subnetmaske består af sammenhængende `1`-taller fra venstre efterfulgt af `0`-taller. Derfor kan en oktet i en subnetmaske kun antage **9 mulige decimalværdier**:

| Antal `1`-bits i oktetten | Binær værdi | Decimal oktetværdi | Block Size ($256 - \text{værdi}$) |
| :--- | :--- | :--- | :--- |
| `0` bits | `00000000` | **`0`** | — |
| `1` bit | `10000000` | **`128`** | `128` |
| `2` bits | `11000000` | **`192`** | `64` |
| `3` bits | `11100000` | **`224`** | `32` |
| `4` bits | `11110000` | **`240`** | `16` |
| `5` bits | `11111000` | **`248`** | `8` |
| `6` bits | `11111100` | **`252`** | `4` |
| `7` bits | `11111110` | **`254`** | `2` |
| `8` bits | `11111111` | **`255`** | `1` |

![[Table 7-22 - Dotted-Decimal and Prefix-Notation Representations for IPv4 Subnets.png]]

![[Table 7-23 - Subnet Octet Values.png]]

- *Øvelse 1 fra bogen:* Hvad er prefix-notationen for `255.255.255.248`?
  - Tre oktetter med `255` ($3 \times 8 = 24$ bits) + `248` i 4. oktet ($5$ bits) = **`/29`**.
- *Øvelse 2 fra bogen:* Hvad er dotted-decimal notationen for `/17`?
  - $8 + 8 + 1$ bits $\implies$ to oktetter med `255` og én `1`-bit i 3. oktet (`128`) = **`255.255.128.0`**.

---

## 8. Beregning af Subnets (Interesting Octet & Block Size)

### Formler for antal Subnets og antal Brugbare Hosts
1. **Antal lånte bits ($s$, *borrowed bits*):**
   $$s = \text{Bits i ny subnetmaske} - \text{Bits i classful maske}$$
2. **Antal oprettede subnets:**
   $$\text{Antal subnets} = 2^s$$
3. **Antal hostbits ($h$):**
   $$h = 32 - \text{Bits i subnetmaske}$$
4. **Antal brugbare (assignable) host-adresser pr. subnet:**
   $$\text{Antal brugbare hosts} = 2^h - 2$$
   *(De 2 adresser, der trækkes fra, er **netværksadressen** (alle hostbits = `0`) og **directed broadcast-adressen** (alle hostbits = `1`)).*

![[Table 7-24 - Number of Subnets Created by a Specified Number of Borrowed Bits.png]]

![[Table 7-25 - Number of Supported Hosts, Given a Specified Number of Host Bits.png]]

- **Basic Subnetting Exercise 1:** Netværket `172.20.0.0/16` (Class B) skal opdeles i mindst **47 subnets** med flest mulige hosts pr. subnet.
  - $2^5 = 32$ (for lidt), $2^6 = 64$ subnets (nok!) $\implies 6$ lånte bits: $/16 + 6 =$ **`/22` (`255.255.252.0`)**.
- **Basic Subnetting Exercise 2:** Netværket `172.20.0.0/16` skal rumme mindst **100 hosts pr. subnet** med flest mulige subnets.
  - $2^6 - 2 = 62$ hosts (for lidt), $2^7 - 2 = 126$ hosts (nok!) $\implies 7$ hostbits: $32 - 7 =$ **`/25` (`255.255.255.128`)**.

---

### 4-trins metoden til at finde alle Subnet-intervaller
1. **Trin 1 – Find "Interesting Octet":** Den oktet i subnetmasken, som indeholder det **sidste `1`-tal** (dvs. den oktet, hvor grænsen mellem netværksbits og hostbits ligger).
2. **Trin 2 – Beregn "Block Size" (Springet):**
   $$\text{Block Size} = 256 - (\text{Subnetmaskens decimalværdi i interesting octet})$$
3. **Trin 3 – Find det første subnet:** Sæt alle lånte bits til `0` (giver originalnetværkets adresse med den nye maske).
4. **Trin 4 – Optæl de øvrige subnets:** Tæl op med **Block Size** i *interesting octet*.
   - **Broadcast-adresse** for et subnet = **(Næste subnets adresse minus 1)**.
   - **Brugbare (usable) host-adresser** = fra **(Subnet-adresse + 1)** til **(Broadcast-adresse – 1)**.

#### Eksempel: `192.168.10.0/27` (`255.255.255.224`)
- **Interesting octet:** 4. oktet (`224`).
- **Block size:** $256 - 224 = \mathbf{32}$.
- **Subnets:** `192.168.10.0`, `.32`, `.64`, `.96`, `.128`, `.160`, `.192`, `.224`.

![[Table 7-26 - Usable IP Address Ranges for the 192.168.10.0-27 Subnets.png]]

#### Advanced Subnetting Exercise 1: `192.168.0.0/26` (`255.255.255.192`)
- **Interesting octet:** 4. oktet (`192`).
- **Block size:** $256 - 192 = \mathbf{64}$.
- **4 Subnets:** `192.168.0.0/26`, `192.168.0.64/26`, `192.168.0.128/26` og `192.168.0.192/26`.

![[Table 7-27 - Usable IP Address Ranges for the 192.168.0.0-26 Subnets.png]]

#### Advanced Subnetting Exercise 2: Fejlfinding af forkert klient-IP i `172.16.0.0/20`
I topologien i **Figure 7-13** anvendes en `/20`-maske (`255.255.240.0`):
- **Interesting octet:** 3. oktet (`240`).
- **Block size:** $256 - 240 = \mathbf{16}$ i 3. oktet (`172.16.0.0/20`, `172.16.16.0/20` ... `172.16.80.0/20`, `172.16.96.0/20` ... `172.16.208.0/20`, `172.16.224.0/20`).
- **VLAN A** tilhører subnettet `172.16.80.0/20` (brugbare adresser: `172.16.80.1 – 172.16.95.254`). Både Client 1 (`172.16.80.2`) og Client 2 (`172.16.95.7`) ligger korrekt i dette interval.
- **VLAN B** tilhører subnettet `172.16.208.0/20` (brugbare adresser: `172.16.208.1 – 172.16.223.254`). Her har **Client 3 (`172.16.206.5`)** en **forkert IP-adresse**, som ligger uden for VLAN B's subnet!

![[Figure 7-13 - Topology for Advanced Subnetting Practice - Exercise 2.png]]

![[Table 7-28 - IP Address Comparison for Advanced Subnetting Practice - Exercise 2.png]]

![[Figure 7-14 - Free Advanced Subnet Calculator.png]]

---

## 9. CIDR (Classless Inter-Domain Routing)

Hvor subnetting **forlænger** en classful maske ved at tilføje `1`-bits, gør **CIDR (*Classless Inter-Domain Routing* / Supernetting / Route Aggregation)** det modsatte: **forkorter** subnetmasken ved at fjerne `1`-bits, så flere sammenhængende netværk kan opsummeres til én enkelt ruteannoncering (*route summarization*).

### Eksempel på CIDR-aggregering
En internetudbyder ønsker at samle fire sammenhængende `/24`-netværk i én rute:
- `192.168.32.0/24`
- `192.168.33.0/24`
- `192.168.34.0/24`
- `192.168.35.0/24`

Ved at omskrive 3. oktet (`32`, `33`, `34`, `35`) til binær ses det, at alle fire netværk har de **første 22 bits til fælles** (`11000000.10101000.001000xx.00000000`). De fire netværk kan derfor opsummeres som **`192.168.32.0/22`**.

![[Figure 7-15 - CIDR Calculation Example.png]]

---

## 10. Real-World Case Study, Opsummering & Nøgleformler

I kapitlets case-studie benytter *Acme, Inc.* den private Class A-blok **`10.0.0.0/8`** internt med **VLSM**: De opdeler netværket med `/12`-masker til virksomhedens 9 bruger-VLANs, mens point-to-point WAN-forbindelserne mellem hovedkontoret og filialerne benytter **`/30`-masker** ($2^2 - 2 = 2$ brugbare IP-adresser pr. link, så ingen adresser spildes). Ud mod internettet anvendes **NAT** hos udbyderen.

### Nøgleformler til eksamen
- $\text{Antal brugbare hosts pr. subnet} = 2^h - 2$ *(hvor $h = 32 - \text{maskbits}$, dvs. antal `0`-bits i masken)*
- $\text{Antal oprettede subnets} = 2^s$ *(hvor $s = \text{maskbits} - \text{classful maskbits}$, dvs. lånte bits)*
- $\text{Block Size} = 256 - \text{subnetmaskens decimalværdi i interesting octet}$

![[Table 7-29 - Key Topics for Chapter 7.png]]
