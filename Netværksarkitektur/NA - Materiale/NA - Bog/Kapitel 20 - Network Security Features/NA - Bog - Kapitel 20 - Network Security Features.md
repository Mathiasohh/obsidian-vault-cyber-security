---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - "Kapitel 20 - Network Security Features"
  - "NA - Bog - Kapitel 20"
---

# Kapitel 20: Network Security Features

> **Bog-PDF:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 20 - Network Security Features.pdf]]
> **Relateret begrebsark:** [[NA - Begrebsark]] Kap. 20

---

## Resumé

Kapitel 20 dækker **Objective 4.3 (Given a scenario, apply network security features, defense techniques, and solutions)** i CompTIA Network+ (N10-009)-pensummet. Hvor Kapitel 19 gennemgik angrebstyperne, fokuserer Kapitel 20 på de konkrete forsvarsmekanismer og tekniske sikkerhedsfunktioner, der beskytter netværket:
1. **Device Hardening (Hærdning af netværksenheder):** Ændring af standardadgangskoder (*default passwords*), opgradering af firmware og OS-patches, deaktivering af ubrugte tjenester og switchporte, brug af sikre protokoller (**SSH** og **SNMPv3**), **STP-beskyttelse** (*Root Guard*, *BPDU Guard*, *Flood Guard*), **DHCP Snooping**, **RA Guard**, **Dynamic ARP Inspection (DAI)**, **Control Plane Policing (CoPP)**, **Private VLANs**, ændring af **Default VLAN (VLAN 1)**, **ACLs**, **RBAC** og **Firewall-regler** (*Implicit Deny*).
2. **Network Access Control (NAC):** **Port Security**, **MAC Filtering**, **Wireless Client Isolation**, **Guest Network Isolation**, rotation af **PSKs**, **IEEE 802.1X / EAP**, **Geofencing**, **Captive Portals** og **IoT-segmentering**.
3. **Key Management, Security Rules & Zones:** Håndtering og rotation af kryptografiske nøgler (**Key Management**), **URL Filtering** og **Content Filtering**, samt opdeling af netværket i sikkerhedszoner (**Trusted Zone**, **Untrusted Zone** og **Screened Subnet / DMZ**).

---

## 1. Device Hardening (Hærdning af Netværksenheder)

Netværksenheder leveres ofte fra fabrikken med åbne tjenester og velkendte standardindstillinger for at gøre opsætningen nem — men det gør dem samtidig ekstremt sårbare. **Device Hardening** handler om systematisk at reducere enhedens angrebsoverflade (*attack surface*).

### Best Practices for Netværks- og Enhedshærdning
- **Change Default Passwords & Avoid Common Credentials:** Det allerførste skridt ved enhver ny installation! Angribere slår altid standard-brugernavne og -adgangskoder (`admin` / `password123`) op i offentlige lister på internettet. Håndhæv stærke adgangskodepolitikker (mindst 8–12+ tegn med store/små bogstaver, tal og specialtegn jf. *NIST SP 800-63B*).
- **Upgrade Firmware & Patch/Update OS:** Opdater løbende både enhedens **firmware** og operativsystem/apps for at lukke kendte sikkerhedshuller (*CVEs*).

![[Figure 20-1 - Upgrading the Firmware on a SOHO Wireless Router.png]]

- **Disable Unneeded Network Services:** Slå alle unødvendige netværkstjenester fra på routere, switche og servere (f.eks. indbyggede HTTP-webservere, Bluetooth, CDP på eksterne porte eller ubenyttet fjernskrivebord) for at minimere angrebsoverfladen.
- **Disable Unused Switch Ports:** Alle ubrugte fysiske porte på switche skal administrativt lukkes ned (`shutdown`) og flyttes væk fra produktions-VLANs, så en uvedkommende ikke blot kan sætte et kabel i et vægstik eller en switch og få adgang til netværket.
- **Use Secure Protocols & Secure SNMP (SNMPv3):**
  - Erstat altid usikre klartekstprotokoller som **Telnet, HTTP, FTP, TFTP, SLIP og SNMPv1/v2c** med deres krypterede modstykker: **SSH, HTTPS, SFTP/SCP og SNMPv3** (med `authPriv` kryptering).
- **Generate and Rotate Keys/Credentials:** Udskift og roter jævnligt kryptografiske nøgler, certifikater og adgangskoder.

---

### Layer 2- og Control Plane-beskyttelsesmekanismer
- **Spanning Tree Protections:** Forhindrer en angriber i at tilslutte en switch med lav prioritet og overtage rollen som *Root Bridge* eller skabe ustabilitet i STP-topologien:
  - **BPDU Guard:** Lukker øjeblikkeligt en access-port ned (*err-disable*), hvis der modtages en uventet BPDU-ramme på porten.
  - **Root Guard:** Forhindrer en port i at blive *Root Port* og sikrer dermed, at en uautoriseret switch ikke kan blive *Root Bridge*.
  - **Flood Guard:** Beskytter mod oversvømmelse af kontroltrafik.
- **Enable DHCP Snooping:** Opdeler switchporte i **Trusted** (forbundet til legitime DHCP-servere/uplinks) og **Untrusted** (slutbrugerporte). Blokerer falske `DHCPOFFER`/`DHCPACK`-beskeder fra **Rogue DHCP-servere** og opbygger en *DHCP Snooping Binding Database* (MAC + IP + Port + VLAN).
- **Use Router Advertisement (RA) Guard:** IPv6-modstykket til DHCP Snooping; blokerer uautoriserede *ICMPv6 Router Advertisement*-beskeder på brugerporte, så angribere ikke kan udføre **IPv6 Rogue Router / SLAAC Man-in-the-Middle-angreb**.
- **Use Dynamic ARP Inspection (DAI):** Bruger *DHCP Snooping Binding*-databasen til at validere ARP-pakker på switchen og smider forfalskede ARP-svar væk — beskytter direkte mod **ARP Poisoning / ARP Spoofing**.
- **Use Control Plane Policing (CoPP):** Begrænser (*rate-limiter*) og filtrerer mængden af trafik, der sendes direkte til selve routerens eller switchens **CPU / Control Plane** (f.eks. falske BGP/OSPF-routingopdateringer eller ICMP-floods), så enheden ikke går ned under et DoS-angreb.
- **VLAN Segmentation, Change Default VLAN & Private VLANs (PVLANs):**
  - **Change Default VLAN:** Flyt altid alle porte væk fra **VLAN 1** (standard-VLAN på bl.a. Cisco-switche), da mange Layer 2-protokoller og angreb målretter VLAN 1.
  - **Private VLANs (PVLANs):** Gør det muligt at isolere porte inden for det **samme IP-subnet/VLAN**, så de ikke kan kommunikere direkte med hinanden (f.eks. forskellige butikker i et indkøbscenter eller forskellige kunder i et hostingmiljø), men stadig kan nå den fælles default gateway til internettet.
- **ACLs, RBAC & Firewall Rules (Implicit vs. Explicit Deny):**
  - **ACLs (*Access Control Lists*) & Firewall Rules:** Evalueres oppefra og ned (*top-down*) og stopper ved det første match. I bunden af næsten alle ACLs og firewall-politikker ligger en usynlig **Implicit Deny All** (hvis trafik ikke er eksplicit tilladt med en *Permit/Allow*-regel, bliver den automatisk afvist).

---

## 2. Network Access Control (NAC)

**NAC (*Network Access Control*)** styrer og håndhæver, hvilke enheder og brugere der får lov at tilslutte sig det kablede eller trådløse netværk:
- **Port Security (Kablede switche):** Låser en switchport til én eller et bestemt antal tilladte **MAC-adresser** (statisk eller dynamisk *sticky* læring). Forhindrer uautoriserede enheder og **MAC Flooding**-angreb.
- **MAC Filtering (Trådløse netværk):** Tillader (*allowlist*) eller blokerer (*blocklist*) bestemte MAC-adresser på et trådløst AP.
- **Wireless Client Isolation (AP Isolation):** Forhindrer trådløse klienter, der er forbundet til samme AP/SSID, i at kommunikere direkte med hinanden (peer-to-peer). Særligt vigtigt på **Guest**- og **BYOD**-netværk, så én inficeret gæsteenhed ikke kan angribe andre gæster.
- **Guest Network Isolation:** Isolerer hele gæste-Wi-Fi-netværket fra virksomhedens interne LAN/servere, så gæster kun har adgang til det offentlige internet.
- **IEEE 802.1X & EAP (*Extensible Authentication Protocol*):** Portbaseret adgangskontrol, hvor **Supplicant** (klienten) sender sine loginoplysninger indkapslet i **EAP** til **Authenticator** (switch eller AP/WLC), som videresender dem i en **RADIUS**-pakke til en **Authentication Server**.
- **Captive Portals, Geofencing & IoT Access Control:**
  - **Captive Portals:** Kræver godkendelse af *Acceptable Use Policy (AUP)* eller login på en webside før netværksadgang.
  - **Geofencing:** Udløser alarmer eller blokerer adgang baseret på GPS/RFID/Wi-Fi-grænser.
  - **IoT Access Control:** Hold IoT-firmware opdateret og isoler altid IoT-trafik i egne dedikerede VLANs.

---

## 3. Øvrige Sikkerhedsfunktioner: Key Management, Security Rules & Zones

### Key Management (Nøglestyring)
**Key Management** dækker hele livscyklussen for kryptografiske nøgler og certifikater: sikker generering, distribution, opbevaring (f.eks. i et HSM eller cloud key vault), **automatisk nøglerotation** og sikker destruktion, når nøglerne udløber eller kompromitteres.

### Security Rules: URL Filtering vs. Content Filtering
Ud over netværksbaserede ACLs anvender organisationer indholdsbaserede sikkerhedsregler:
- **URL Filtering:** Tillader eller blokerer adgang til specifikke websider eller hele webkategorier baseret på selve **webadressen (URL'en)** (f.eks. blokering af kendte phishing-/malwaresider, gambling eller sociale medier).
- **Content Filtering:** Inspicerer og blokerer adgang baseret på **selve indholdet** i trafikken (f.eks. bestemte nøgleord, filtyper, scripts eller upassende/skadeligt materiale i websider og e-mails) for at beskytte mod malware, håndhæve virksomhedspolitikker og øge produktiviteten.

### Sikkerhedszoner (Zones: Trusted, Untrusted & Screened Subnet)
Netværk og firewalls opdeles i logiske sikkerhedszoner med forskellige tillidsniveauer:
1. **Trusted Zone (Inside / Betroet zone):** Det interne virksomhedsnetværk (LAN/datacenter), hvor kritiske servere, følsomme data og interne arbejdsstationer befinder sig under streng adgangskontrol.
2. **Untrusted Zone (Outside / Ubetroet zone):** Netværk uden for organisationens kontrol — primært det **offentlige internet** — hvor trusler og angreb må forventes konstant (højeste risikoniveau).
3. **Screened Subnet (DMZ – *Demilitarized Zone*):** En mellemliggende bufferzone beskyttet af én eller to firewalls, hvor offentligt tilgængelige servere (webservere, mailservere, DNS-servere) er placeret. Trafik fra *Untrusted Zone* (internettet) kan få lov at kontakte serverne i *Screened Subnet*, men blokeres fra at fortsætte ind i *Trusted Zone*.

![[Figure 20-2 - An Example of a Screened Subnet.png]]

---

## 4. Real-World Case Study & Nøgleemner

I kapitlets case-studie gennemfører *Acme, Inc.* et sikkerhedsaudit, som fører til konkret **Device Hardening**: Deaktivering af ubrugte tjenester og switchporte, strammere håndhævelse af adgangskodepolitikken samt flytning af ukrypteret netværksadministration over på en dedikeret **Out-of-Band Management**-forbindelse.

![[Table 20-1 - Key Topics for Chapter 20.png]]
