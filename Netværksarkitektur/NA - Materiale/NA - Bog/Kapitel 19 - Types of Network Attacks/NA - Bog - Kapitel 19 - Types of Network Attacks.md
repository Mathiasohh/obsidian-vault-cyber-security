---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - "Kapitel 19 - Types of Network Attacks"
  - "NA - Bog - Kapitel 19"
---

# Kapitel 19: Types of Network Attacks

> **Bog-PDF:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 19 - Types of Network Attacks.pdf]]
> **Relateret begrebsark:** [[NA - Begrebsark]] Kap. 19

---

## Resumé

Kapitel 19 dækker **Objective 4.2 (Summarize various types of attacks and their impact to the network)** i CompTIA Network+ (N10-009)-pensummet. Kapitlet gennemgår de væsentligste angrebstyper mod moderne netværk, opdelt i tre hovedkategorier:
1. **Teknologibaserede netværksangreb:** **DoS** (*Reflective* og *Amplified*) og **DDoS** (via *botnets/zombies* og C2-servere), **On-Path Attack** (tidl. *Man-in-the-Middle*), **DNS Poisoning / Spoofing**, **VLAN Hopping** (*Double Tagging / Q-in-Q* & *Switch Spoofing*), **ARP Poisoning / Spoofing**, **MAC Spoofing & MAC Flooding**, **IP Spoofing**, **Rogue Devices & Services** (**Rogue DHCP**, **Rogue AP**, **Evil Twin**), **Deauthentication Attack**, **Password Attacks** (*Brute-Force*, *Dictionary*, *Password Spraying*) samt **Malware** og **Ransomware**.
2. **Social Engineering-angreb (Menneskebaserede angreb):** **Phishing**, **Tailgating**, **Piggybacking**, **Shoulder Surfing** og **Dumpster Diving**.
3. **Øvrige angrebstyper (Table 19-1):** Bl.a. *Packet Capture*, *Ping Sweep / Port Scan*, *EMI/Tempest Interception*, *Wiretapping*, *Overt & Covert Channels (Steganography)*, *FTP Bounce*, *Session Hijacking*, *Salami Attack*, *Data Diddling*, *Trust Relationship Exploitation*, *Logic Bomb*, *TCP SYN Flood*, *Buffer Overflow*, *Ping of Death*, *Supply Chain Attack*, *Cryptojacking*, *Keylogger*, *APT*, *Fileless Malware*, *Birthday Attack*, *Downgrade Attack*, *Skimming*, *USB Drop*, *SQL / LDAP Injection*, *Privilege Escalation*, *Bluejacking* og *Bluesnarfing*.

---

## 1. Teknologibaserede Angreb (Technology-Based Attacks)

### DoS (Denial-of-Service) og DDoS (Distributed Denial-of-Service)
- **DoS (*Denial-of-Service*):** Et angreb fra én kilde, der har til formål at gøre et system eller netværk utilgængeligt for legitime brugere — enten ved at sende specialformaterede pakker, der får et OS/program til at crashe, eller ved at oversvømme (*floode*) målet med trafik, så CPU, RAM eller båndbredde udtømmes.

![[Figure 19-1 - DoS Attack.png]]

  - **Reflective DoS:** Angriberen sender forespørgsler med **offerets IP-adresse som forfalsket kilde-IP (*spoofed source IP*)** til en uskyldig tredjepartsserver (*reflector*), som derefter sender sine svar direkte mod offeret.
  - **Amplified DoS:** En variant af et refleksivt angreb, hvor en lille forespørgsel til f.eks. en offentlig **DNS-server** udløser et **meget stort svar**, som mangedobler trafikmængden mod offeret.
- **DDoS (*Distributed Denial-of-Service*):** Et koordineret DoS-angreb, der udføres samtidigt fra **tusindvis af kompromitterede maskiner (*bots* / *zombies*)** samlet i et **Botnet**, som fjernstyres af angriberen via én eller flere **Command and Control (C2)-servere**. Et pludseligt, voldsomt udsving i trafik sammenlignet med netværkets *baseline* er ofte det første tegn på et DDoS-angreb.

### On-Path Attack (tidl. Man-in-the-Middle / MitM)
I et **On-Path-angreb** placerer angriberen sig aktivt i kommunikationsvejen mellem en klient og en server (eller mellem to netværksenheder) for at aflytte, opsnappe eller ændre trafikken i realtid uden parternes viden. På et lokalt netværk opnås en on-path-position ofte ved hjælp af **ARP Poisoning**, **DHCP Spoofing**, **DNS Poisoning** eller et **Evil Twin AP**.

### Layer 2-angreb: VLAN Hopping, ARP Poisoning/Spoofing & MAC Flooding/Spoofing
- **VLAN Hopping:** Gør det muligt for en angriber på ét VLAN at sende trafik ind på et andet VLAN uden om en router/firewall:
  - Udnytter bl.a. **802.1Q Native VLAN** og **Q-in-Q (Double Tagging)** (hvor angriberen sætter to 802.1Q-tags på rammen, så første switch fjerner det yderste Native VLAN-tag og videresender rammen med det inderste tag ind i mål-VLAN'et) eller *Switch Spoofing* (DTP).
  - *Modforanstaltning:* Ændr altid **Native VLAN** til et dedikeret, ubrugt VLAN-ID, deaktiver auto-trunking (DTP) på brugerporte, og tving evt. tagging på native VLAN.
- **ARP Poisoning & ARP Spoofing:**
  - **ARP Spoofing:** Angriberen udsender falske ARP-beskeder, hvor angriberen udgiver sig for at have en anden enheds (f.eks. default gatewayens) IP-/MAC-adresse.
  - **ARP Poisoning (ARP Cache Poisoning):** Resultatet af falske ARP-svar, hvor ARP-tabellerne på klienter og routere "forgiftes" med forkerte IP-til-MAC-mappings, så al trafik omdirigeres gennem angriberens maskine (*On-Path Attack*).
  - *Modforanstaltning:* **Dynamic ARP Inspection (DAI)** kombineret med **DHCP Snooping**.
- **MAC Spoofing:** Angriberen ændrer sin netværksadapters MAC-adresse til at matche en allerede godkendt enhed for at omgå **MAC-filtrering** eller simpel **Port Security**.
- **MAC Flooding (CAM Table Overflow):** Angriberen oversvømmer en switch med tusindvis af Ethernet-rammer med tilfældige, falske kilde-MAC-adresser. Når switchens **MAC-adressetabel (CAM-tabel) løber fuld**, tvinges mange switche i *fail-open*-tilstand og begynder at **floode al trafik ud på samtlige porte ligesom en gammel hub** — hvorefter angriberen kan opsnappe trafikken med en packet sniffer.
  - *Modforanstaltning:* **Port Security** (begrænser antal tilladte MAC-adresser pr. switchport).

### DNS Poisoning / Spoofing og IP Spoofing
- **DNS Poisoning / DNS Spoofing:** Angriberen indsætter falske DNS-records i en DNS-servers cache (eller svarer med et forfalsket DNS-svar), så et legitimt domænenavn (f.eks. `www.dinbank.dk`) oversættes til angriberens egen ondsindede IP-adresse.
- **IP Spoofing:** Angriberen forfalsker kilde-IP-adressen i IP-headeren for at omgå IP-baserede adgangslister (ACLs), skjule sin identitet under et DoS-angreb eller udgive sig for en betroet vært.
  - *Modforanstaltning:* **IP Source Guard** (baseret på DHCP Snooping) samt ind- og udgående anti-spoofing ACLs.

### Rogue Devices & Services (Rogue DHCP, Rogue AP, Evil Twin) og Deauthentication
- **Rogue DHCP Server:** En uautoriseret DHCP-server på netværket, der uddeler forkerte IP-konfigurationer til klienter — enten ved et uheld eller ondsindet med **angriberens egen maskine som Default Gateway og DNS-server**, så al klienttrafik ledes gennem angriberen.
  - *Modforanstaltning:* **DHCP Snooping** på switchen (tillader kun `DHCPOFFER`/`DHCPACK` på betroede *trusted* porte).
- **Rogue Access Point (Rogue AP):** Et uautoriseret trådløst AP koblet til det kablede virksomhedsnetværk (f.eks. af en medarbejder eller angriber), som åbner en usikret bagdør ind i LAN'et.
- **Evil Twin:** En ondsindet type Rogue AP, som angriberen konfigurerer med **præcis samme SSID (netværksnavn)** som virksomhedens legitime Wi-Fi og med kraftigere signalstyrke for at narre brugere til at oprette forbindelse og stjæle deres loginoplysninger.
- **Deauthentication Attack:** Angriberen sender forfalskede `802.11 Deauthentication`-managementrammer til en trådløs klient, så klienten tvinges af det legitime AP — enten som et renlivet DoS-angreb eller for at få klienten til automatisk at genforbinde til angriberens **Evil Twin AP** (eller for at opsnappe WPA2 4-way handshake til password-cracking).

### Password Attacks, Malware og Ransomware
- **Password Attacks:**
  - **Brute-Force Attack:** Afprøver systematisk samtlige mulige tegnkombinationer (`a`–`z`, `aa`–`zz` osv.), indtil adgangskoden er gættet. Imødegås med lange, komplekse adgangskoder, **konto-spærring (*account lockout*)** og **MFA**.
  - **Dictionary Attack:** Afprøver en ordliste med tusindvis af almindelige ord og kendte lækkede adgangskoder.
  - **Password Spraying:** Afprøver **ganske få meget almindelige adgangskoder** (f.eks. `Sommer2026!`) mod **et stort antal forskellige brugerkonti** for at undgå at udløse *account lockout* på den enkelte konto.
- **Malware & Ransomware:**
  - **Malware:** Samlebetegnelse for ondsindet software, herunder *virus*, *orme (worms)*, *trojanske heste (Trojans)*, *spyware* og *keyloggers*.
  - **Ransomware:** Malware, der **krypterer eller låser brugerens/virksomhedens filer og systemer** og kræver en løsesum (*ransom*, typisk i kryptovaluta som Bitcoin) for at udlevere dekrypteringsnøglen.

---

## 2. Social Engineering Attacks (Menneskebaserede Angreb)

**Social Engineering** udnytter menneskelig tillid, hjælpsomhed, frygt eller uopmærksomhed og er ofte det første skridt i et større cyberangreb:
- **Phishing:** Bedrageriske e-mails (eller SMS'er / *Smishing* og telefonopkald / *Vishing*), der udgiver sig for at komme fra en betroet afsender (f.eks. banken, IT-afdelingen eller et fragtfirma) for at lokke modtageren til at klikke på et link til en falsk login-side og indtaste sine adgangskoder eller åbne en inficeret vedhæftning.
- **Tailgating:** En uautoriseret person følger fysisk lige i hælene på en autoriseret medarbejder ind gennem en låst sikkerhedsdør **uden medarbejderens samtykke/viden** (inden døren når at smække i lås).
- **Piggybacking:** Ligner tailgating, men her **ved den autoriserede medarbejder det og hjælper/holder døren** for den uautoriserede person (f.eks. af høflighed over for en person med hænderne fulde af papkasser). *(Betegnelsen bruges også elektronisk om at koble sig på en allerede godkendt brugers åbne session).*
- **Shoulder Surfing:** Angriberen kigger fysisk over skulderen på en medarbejder (f.eks. i toget, i en lufthavn eller på kontoret) for at aflæse adgangskoder, PIN-koder eller fortrolige skærmbilleder. Imødegås med **privacy screen filters** (privatlivsfiltre på skærmen).
- **Dumpster Diving:** Gennemsøgning af virksomhedens skraldespande og papiraffald for at finde udsmidte dokumenter med adgangskoder, netværksdiagrammer, kundelister eller kasserede harddiske/USB-stik. Imødegås med makulering (*shredding*) og sikker bortskaffelse af medier.

---

## 3. Øvrige Angrebstyper (Miscellaneous Attacks – Table 19-1)

Bogen samler i **Table 19-1** en bred vifte af supplerende angrebsbegreber, som man bør kunne genkende:

![[Table 19-1 - Miscellaneous Attacks.png]]

- **Packet Capture / Wiretapping / EMI Interception (Tempest):** Aflytning af ukrypteret trafik med en sniffer i *promiscuous mode*, fysisk aflytning af kabler i krydsfeltet (*wiretapping*) eller opsnapning af elektromagnetisk udstråling fra kobberkabler (*EMI interception*).
- **Ping Sweep & Port Scan:** Rekognosceringsangreb, der finder aktive IP-adresser (*ping sweep*) og åbne TCP/UDP-porte (*port scan*) på målene.
- **Overt vs. Covert Channels & Steganography:** Eksfiltrering af data ved at pakke en protokol ind i en tilladt protokol eller gemme hemmelige data inde i en billedfil (**Steganography** = *overt channel*) vs. at kode binære beskeder via f.eks. tidsintervaller mellem ICMP-pings (*covert channel*).
- **TCP SYN Flood, Session Hijacking & Ping of Death:**
  - **TCP SYN Flood:** Sender tusindvis af `SYN`-pakker med falske kilde-IP'er uden nogensinde at sende det afsluttende `ACK`, så serverens kø af halvåbne forbindelser løber fuld.
  - **Session Hijacking:** Overtager en allerede etableret og autentificeret TCP-session.
  - **Ping of Death:** Sender manipulerede/for store ICMP-pakker, der overstiger den maksimale IP-pakkestørrelse og får ældre systemer til at crashe.
- **Buffer Overflow, SQL Injection & LDAP Injection:** Udnytter manglende inputvalidering til at overskrive hukommelsesbuffere (*buffer overflow*) eller indsprøjte ondsindede kommandoer direkte i en SQL-database (**SQLi**) eller en LDAP-katalogserver (**LDAP injection**).
- **APT, Supply Chain Attack, Logic Bomb & Fileless Malware:**
  - **APT (*Advanced Persistent Threat*):** Et sofistikeret *"low and slow"*-angreb, hvor angriberen infiltrerer netværket og forbliver skjult over lang tid.
  - **Supply Chain Attack:** Kompromitterer et produkt eller en softwareopdatering hos en underleverandør før levering til kunden.
  - **Logic Bomb:** Ondsindet kode skjult i et system, der aktiveres på en bestemt dato eller ved en bestemt hændelse (f.eks. hvis en utilfreds programmør fyres).
  - **Fileless Malware:** Afvikles udelukkende i computerens flygtige hukommelse (**RAM**) uden at skrive filer til harddisken.
- **Cryptojacking, Salami Attack & Data Diddling:** Misbrug af offerets CPU/GPU til at mine kryptovaluta (*cryptojacking*), mange bittesmå ulovlige transaktioner der tilsammen giver et stort beløb (*salami attack*), eller ændring af data lige inden de gemmes i systemet (*data diddling*).
- **Birthday Attack & Downgrade Attack:** Kryptografisk kollisionsangreb mod hashfunktioner baseret på fødselsdagsparadokset (*birthday attack*) samt angreb, der tvinger en forbindelse ned på en ældre, sårbar protokolversion (*downgrade attack*).
- **Skimming, USB Drop, Bluejacking & Bluesnarfing:**
  - **Skimming:** Kopiering af magnetstribe/kortdata på en betalings- eller hæveautomat.
  - **USB Drop Attack:** Efterladelse af inficerede USB-stik på parkeringspladser eller i receptioner i håb om, at en nysgerrig medarbejder sætter dem i sin PC.
  - **Bluejacking vs. Bluesnarfing:** **Bluejacking** sender uønskede beskeder/billeder til Bluetooth-enheder i nærheden (ufarligt/irriterende), mens **Bluesnarfing** er et mere alvorligt angreb, der **stjæler kontakter, beskeder og filer** fra offerets enhed via Bluetooth uden brugerens viden.

---

## 4. Real-World Case Study & Nøgleemner

I kapitlets case-studie indfører *Acme, Inc.* et todelt sikkerhedstræningsprogram: Alle slutbrugere trænes løbende i at genkende og afværge **Social Engineering og Phishing**, mens IT-personalet modtager teknisk efteruddannelse i detektion og afbødning af avancerede netværksangreb som **DDoS, On-Path Attacks og Ransomware**.

![[Table 19-2 - Key Topics for Chapter 19.png]]
