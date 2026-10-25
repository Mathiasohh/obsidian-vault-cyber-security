---
Up: "[[NA - Bog]]"
aliases:
  - Kapitle 7 - IPv4 Addressing
---
**Resume**

Sider i bogen  
[[CompTIA Network+ N10-009 Cert Guide - Kapitel 7 - IPv4 Addressing.pdf]]

For termer og udtryk, se [[NA - Begrebsark]] Kap. 7

---

## Introduktion
IPv4 er stadig den mest udbredte Layer 3‑adresseringsmetode.
Kapitlet dækker:
- [[#Binary Numbering]]
- [[#IPv4 Address Structure]]
- [[#IPv4 Address Classes]]
- [[#Private and public IP‑adresses (RFC1918)]]
- [[#IP Addressing Components]]
- [[#Subnetting]]
- [[#Subnetmasker (dotted-decimal ↔ prefix)]]
- [[#Beregning af subnets]]
- [[#CIDR (Classless Inter‑Domain Routing)]]
- [[#Opsummering]]
- [[#Nøgleformler]]

---

# Binary Numbering

## Grundprincipper
- IPv4 = **32 bits**, opdelt i **4 oktetter** á 8 bits.
- Binært talsystem = base 2 (0 og 1).
- Konvertering mellem decimal og binær er nødvendig for subnetmasker.

## Binær → Decimal
- Brug 8‑bit tabellen: **128 64 32 16 8 4 2 1**
- Læg værdierne sammen hvor bit = 1.

## Decimal → Binær
- Start fra venstre (128) og spørg:  
  *“Er tallet ≥ kolonneværdi?”*  
  → Sæt 1 eller 0, og træk værdien fra.

---

# IPv4 Address Structure

## Dotted‑decimal notation
- Eksempel: `10.1.2.3`
- Hver oktet = 8 bits → 0–255.

## Netværksdel vs. hostdel
- Bestemmes af **subnetmasken**.
- Subnetmaske = række af 1’er (netværk) efterfulgt af 0’er (hosts).

Eksempel (10.1.2.3 /8):
- Netværksdel: første 8 bits
- Hostdel: resterende 24 bits
- Netværksadresse: `10.0.0.0`

## Prefix notation
- `/8`, `/16`, `/24` osv.
- Angiver antal 1’er i subnetmasken.

---

# IPv4 Address Classes

| Klasse | Første oktet | Classful maske |
|-------|--------------|----------------|
| A     | 1–126        | 255.0.0.0 (/8) |
| B     | 128–191      | 255.255.0.0 (/16) |
| C     | 192–223      | 255.255.255.0 (/24) |
| D     | 224–239      | Multicast |
| E     | 240–255      | Eksperimentel |

**127.x.x.x** = loopback (localhost).

---

# Private and public IP‑adresses (RFC1918)

| Klasse | Range | Maske |
|--------|--------|--------|
| A | 10.0.0.0 – 10.255.255.255 | /8 |
| B | 172.16.0.0 – 172.31.255.255 | /12 |
| APIPA | 169.254.0.0 – 169.254.255.255 | /16 |
| C | 192.168.0.0 – 192.168.255.255 | /16 |

Private adresser er **routable internt**, men **ikke på internettet**. NAT bruges til at oversætte private adresser til en offentlig IP.

## Offentlige IP-adresser
Offentlige IP-adresser er **globale, unikke** og **internet-routable**. De tildeles af ISP’er eller regionale internetregistre (RIR). Bruges af servere, routere og WAN-forbindelser.

## Private IP-adresser (RFC1918)
Private IP-adresser bruges i LAN/VLAN/WAN og **kan ikke rutes på internettet**. De er designet til at blive genbrugt i interne netværk og kræver NAT for internetadgang.


## Hvorfor private IP-adresser?
- IPv4-mangel → adresser skal genbruges  
- Sikkerhed → ikke direkte synlige på internettet  
- Netværksdesign → fri intern adressering uden køb af offentlige IP-blokke  

## NAT (Network Address Translation)
NAT oversætter private IP’er til en offentlig IP, så interne enheder kan nå internettet.


## APIPA (Automatic Private IP Addressing)
Bruges når DHCP fejler. Giver kun mulighed for lokal subnetkommunikation.

## Loopback
Testadresse for egen TCP/IP-stack:

## Sammenligning

| Egenskab          | Offentlig IP | Privat IP    |
| ----------------- | ------------ | ------------ |
| Internet-routable | Ja           | Nej          |
| Kræver NAT        | Nej          | Ja           |
| Globalt unik      | Ja           | Nej          |
| Bruges til        | WAN/Internet | LAN/VLAN/WAN |



---

# IP Addressing Components

En enhed kan få tildelt:
- IP‑adresse
- Subnetmaske
- Default gateway
- DNS‑servere
- (Historisk: WINS)

## Statisk konfiguration
- Manuelt indtastet i OS (fx Windows).

## Dynamisk konfiguration
- DHCP (mest udbredt)
- BOOTP (ældre)

## APIPA
- Bruges hvis DHCP ikke svarer.
- Range: **169.254.0.0/16**
- Kun lokal subnetkommunikation.

---

# Subnetting

### Formål
- Reducere broadcastdomæner
- Udnytte adresseplads effektivt
- Skabe logiske netværkssegmenter
- Understøtte VLSM (Variable Length Subnet Masking)

### Antal hosts
Formel:
$\text{Antal hosts} = 2^h - 2$ 
(h = antal hostbits)

Eksempler:
- /24 → 8 hostbits → 254 hosts
- /28 → 4 hostbits → 14 hosts

### Antal subnets
Formel:
$\text{Antal subnets} = 2^s$
(s = borrowed bits)

### Borrowed bits
- Bits tilføjet til classful masken.
- Klasse ændres **ikke** — kun masken.

---

# Subnetmasker (dotted-decimal ↔ prefix)

| Dotted-decimal | Prefix |
|----------------|--------|
| 255.255.255.0 | /24 |
| 255.255.255.128 | /25 |
| 255.255.255.192 | /26 |
| 255.255.255.224 | /27 |
| 255.255.255.240 | /28 |
| 255.255.255.248 | /29 |
| 255.255.255.252 | /30 |

## Subnet octet values
- 128 → 1 bit  
- 192 → 2 bits  
- 224 → 3 bits  
- 240 → 4 bits  
- 248 → 5 bits  
- 252 → 6 bits  
- 254 → 7 bits  
- 255 → 8 bits  

---

# Beregning af subnets

## “Interesting octet”
- Oktetten hvor subnetmaskens sidste 1 findes.

## Block size
$\text{Block size} = 256 - \text{subnetmaskens værdi i interesting octet}$


### Eksempel: 192.168.10.0/27
- Interesting octet = 4
- Mask = 224 → block size = 32
- Subnets:
  - 192.168.10.0
  - 192.168.10.32
  - 192.168.10.64
  - …
  - 192.168.10.224

### Usable addresses
- Fra subnet+1 til broadcast–1

---

# CIDR (Classless Inter‑Domain Routing)

- Modsætning til subnetting: **forkorter** masken.
- Bruges til **route aggregation**.
- Eksempel:
  - 192.168.32.0/24  
  - 192.168.33.0/24  
  - 192.168.34.0/24  
  - 192.168.35.0/24  
→ **192.168.32.0/22**

---

# Opsummering
- Binær konvertering er grundlaget for subnetting.
- IPv4‑struktur: netværksdel + hostdel.
- Adresseklasser og private ranges.
- APIPA til fallback.
- Subnetting, VLSM og CIDR giver fleksibel netværksdesign.
- Kapitlet indeholder mange øvelser til subnetberegning.

---

# Nøgleformler

$\text{Hosts} = 2^h – 2$
$\text{Subnets} = 2^s$
$\text{Hostbits} = 32 – \text{maskbits}$
$\text{Borrowed bits} = \text{maskbits} – \text{classful maskbits}$
$\text{Block size} = 256 – \text{interesting octet value}$
