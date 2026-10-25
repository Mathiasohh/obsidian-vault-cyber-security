---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - "Kapitel 14 - Network Monitoring"
  - "NA - Bog - Kapitel 14"
---

# Kapitel 14: Network Monitoring

> **Bog-PDF:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 14 - Network Monitoring.pdf]]
> **Relateret begrebsark:** [[NA - Begrebsark]] Kap. 14

---

## Resumé

Kapitel 14 dækker **Objective 3.2 (Given a scenario, use network monitoring technologies)** i CompTIA Network+ (N10-009)-pensummet. Kapitlet gennemgår de protokoller, målepunkter og værktøjer, der bruges til proaktiv overvågning af netværkets sundhedstilstand og sikkerhed:
1. **SNMP (*Simple Network Management Protocol*):** Arkitekturen med **SNMP Manager (NMS)**, **SNMP Agent**, **MIB (*Management Information Base*)** og **OIDs**, beskedtyperne (**Get**, **Set**, **Trap** og *SNMP walk*) samt sikkerhedsforskellene mellem **SNMPv1**, **SNMPv2c** (*Community Strings*) og **SNMPv3** (*noAuthNoPriv*, *authNoPriv*, *authPriv*).
2. **Performance Metrics, Baselining & Port Mirroring:** Overvågning af enhedssensorer (**Temperatur**, **CPU**, **Memory**) og netværksmetrics (**Bandwidth**, **Latency**, **Jitter**), **Baseline Metrics** med **Anomaly Alerting**, samt **Packet Capture** (f.eks. i **Wireshark**) via **Port Mirroring (SPAN)** på switche.
3. **Logging, Syslog, SIEM, Flow Data & API Integration:** **Syslog** (Server, Client, Collector og de **8 Syslog Severity Levels `0–7`**), **Log Aggregation** i **SIEM**-systemer (f.eks. Splunk), **NetFlow / Flow Data** (*Flow Exporter*, *Flow Collector*, *Analysis Application*), **API Integration** samt overordnede overvågningsløsninger (*Network Discovery*, *Traffic Analysis*, *Performance*, *Availability* og *Configuration Monitoring*).

---

## 1. Simple Network Management Protocol (SNMP)

**SNMP** er de facto-standarden til overvågning og styring af netværksenheder (routere, switche, firewalls, servere, UPS'er og printere).

### SNMP-komponenter og MIB / OID
En SNMP-løsning består af tre hovedkomponenter:
1. **SNMP Manager (NMS – *Network Management System*):** Den centrale overvågningsserver/applikation, der indsamler data fra netværksenhederne.
2. **SNMP Agent:** En softwareproces, der kører på selve den overvågede enhed (*managed device*, f.eks. en router eller switch) og besvarer forespørgsler fra manageren.
3. **MIB (*Management Information Base*):** En hierarkisk struktureret database på den overvågede enhed, som indeholder variabler (objekter) for enhedens status og statistik (f.eks. interface-fejl, båndbredudnyttelse, pakketab, CPU-forbrug og oppetid). Hver variabel i MIB-træet identificeres ved en unik numerisk **OID (*Object Identifier*)**, f.eks. `1.3.6.1.4.1.9`.

![[Table 14-1 - Components of an SNMPv1 and SNMPv2c Network Management Solution.png]]

![[Figure 14-1 - SNMPv1 and SNMPv2c Network Management Components and Messages.png]]

### SNMP-beskedtyper (Get, Set, Trap) og SNMP Walk
- **Get (`GetRequest` / `GetNextRequest` / `GetBulkRequest`):** Sendes fra SNMP-manageren til agenten (på **UDP port `161`**) for at **hente/aflæse** en eller flere MIB-værdier (*polling*).
  - **SNMP Walk:** Når NMS-softwaren systematisk forespørger sig gennem hele MIB-træet for at udlæse samtlige variabler fra en agent.
- **Set (`SetRequest`):** Sendes fra SNMP-manageren til agenten for at **ændre en konfigurationsværdi** eller udløse en handling på enheden.
- **Trap (`SNMP Trap` / `Inform`):** En **uanmodet alarmbesked (*unsolicited message*)**, som SNMP-agenten på eget initiativ sender til SNMP-manageren (på **UDP port `162`**), så snart en kritisk hændelse opstår på enheden (f.eks. et link går ned, eller temperaturen overstiger en grænseværdi).

### SNMP-versioner og Sikkerhedsniveauer (`v1`, `v2c` vs. `v3`)
- **SNMPv1 og SNMPv2c (*Community-Based*):**
  - Bruger simple adgangskoder kaldet **Community Strings**, som sendes i **klartekst** over netværket.
  - Standardværdierne på meget udstyr er **`public`** for *Read-Only (RO)* og **`private`** for *Read/Write (RW)* — disse **skal altid ændres**, så angribere ikke kan udlæse eller ændre enhedens konfiguration!
  - *SNMPv2c* tilføjede performanceforbedringer (bl.a. `GetBulk`), men beholdt de usikre community strings fra v1.
- **SNMPv3 (Sikker standard):**
  - Erstatter community strings med brugerbaseret autentificering og tilføjer tre centrale sikkerhedsegenskaber: **Integrity** (hashing sikrer, at beskeden ikke er ændret undervejs), **Authentication** (bekræfter afsenderens identitet via **HMAC-MD5** eller **HMAC-SHA**) og **Encryption / Privacy** (krypterer pakken med **DES / 3DES / AES**).
  - SNMPv3 organiserer desuden manager og agent i samlede **SNMPv3 Entities** og definerer tre sikkerhedsniveauer (*Security Levels*):

| Sikkerhedsmodel | Sikkerhedsniveau (Security Level) | Autentificering | Kryptering (Privacy) |
| :--- | :--- | :--- | :--- |
| **SNMPv1** | `noAuthNoPriv` | Community String (klartekst) | Ingen |
| **SNMPv2c** | `noAuthNoPriv` | Community String (klartekst) | Ingen |
| **SNMPv3** | **`noAuthNoPriv`** | Brugernavn (ingen kryptografisk hash) | Ingen |
| **SNMPv3** | **`authNoPriv`** | **HMAC-MD5** eller **HMAC-SHA** | Ingen |
| **SNMPv3** | **`authPriv`** *(Anbefalet)* | **HMAC-MD5** eller **HMAC-SHA** | **Krypteret** (CBC-DES / **AES**) |

![[Table 14-2 - Security Models and Security Levels.png]]

![[Figure 14-2 - SNMPv3 Entities.png]]

---

## 2. Performance Metrics, Baselining og Port Mirroring

### Enheds- og Netværksmetrics (Sensors & Metrics)
- **Chassis- og Enhedsmetrics:**
  - **Temperature:** Overvåger temperaturen inde i udstyrets kabinet (høj temperatur indikerer ofte defekte blæsere, blokeret luftstrøm eller svigtende HVAC).
  - **CPU Usage:** Høj CPU-belastning på en router eller switch kan skyldes et netværksangreb (f.eks. DoS/broadcast storm), routing-ustabilitet eller en softwarefejl.
  - **Memory Utilization:** Sikrer, at enheden har tilstrækkelig fri RAM til routingtabeller, pakkebuffere og kørende processer.
- **Netværksmetrics:**
  - **Bandwidth (Båndbredde):** Måler tilgængelig kapacitet vs. aktuelt forbrug for at opdage flaskehalse (*bottlenecks*).
  - **Latency (Forsinkelse / Delay):** Den tid det tager en pakke at nå fra kilde til destination (summen af *serialization*, *propagation*, *processing* og *queuing delay*).
  - **Jitter (Variation i latency):** Udsving i pakkernes forsinkelse (f.eks. når latency svinger mellem `50 ms` og `300 ms`). Jitter er særligt ødelæggende for realtidstrafik som **VoIP** og videomøder, hvor det giver hakkende lyd og billede.

### Baseline Metrics og Anomaly Alerting
- **Baseline Metrics:** En dokumenteret måling af netværkets ydeevne (båndbredde, CPU, latency, fejlrate) under **normal drift** over tid. Uden en baseline ved man ikke, hvad der er "normalt" for netværket.
- **Anomaly Alerting / Notification:** Når overvågningssystemet kender netværkets baseline (f.eks. at et link normalt ligger på `45 %` belastning), kan der sættes tærskelværdier (*thresholds*), så administratoren automatisk modtager en **notifikation/alarm** (via e-mail, SMS eller dashboard), når trafikken pludselig afviger markant (f.eks. overstiger `80 %`).

---

### Packet Capture og Port Mirroring (SPAN)
For at dybdegående fejlfinde netværksproblemer på pakkeniveau anvendes en **Packet Sniffer / Protocol Analyzer** som f.eks. **Wireshark**:

![[Figure 14-3 - Example - Wireshark Packet-Capture Software.png]]

- **Problemet på en switch:** I modsætning til en gammel hub videresender en Ethernet-switch kun unicast-rammer ud på den specifikke port, hvor modtagerens MAC-adresse befinder sig. Hvis man tilslutter en laptop med Wireshark på **Port 3**, kan den **ikke** se unicast-trafikken mellem **Port 1** og **Port 2**:

![[Figure 14-4 - Example - Network Sniffer Unable to Capture Traffic.png]]

- **Løsningen – Port Mirroring (Cisco SPAN / *Switched Port Analyzer*):** Switchen konfigureres til at **kopiere al ind- og/eller udgående trafik fra én eller flere kildeporte (f.eks. Port 1 eller Port 2) og sende kopien ud på en destinationsport (Port 3)**, hvor snifferen/IDS-sensoren er tilsluttet. *(Bemærk: Da port mirroring belaster switchens hardware, bør det kun aktiveres, når der er behov for fejlfinding eller overvågning).*

![[Figure 14-5 - Example - Network Sniffer with Port Mirroring Configured on the Switch.png]]

```ios
! Eksempel 14-1: Konfiguration af Port Mirroring (SPAN) på en Cisco Catalyst Switch
Switch(config)# monitor session 1 source interface gigabitethernet 0/1
Switch(config)# monitor session 1 destination interface gigabitethernet 0/3
```

---

## 3. Logging, Syslog, SIEM, Flow Data og API Integration

### Logtyper, Syslog og de 8 Severity Levels (`0–7`)
Ud over **Traffic Logs** og **Audit Logs** (som f.eks. sporer, hvornår administratorer logger ind og foretager ændringer — i AWS f.eks. via *AWS CloudTrail*) bruger netværksenheder standardprotokollen **Syslog (UDP port `514`)** til at sende tidsstemplede hændelsesbeskeder til en central server:
- **Syslog Clients:** Routere, switche, firewalls, AP'er og servere, der genererer logbeskeder.
- **Syslog Server & Syslog Collector:** Modtager, samler og gemmer logbeskeder fra mange enheder ét centralt sted.

![[Figure 14-6 - Sample Syslog Clients.png]]

- **De 8 Syslog Severity Levels (`0` til `7`):** Jo **lavere tal**, desto **mere kritisk** er hændelsen! (Huskeregel til eksamen: **"Every Alley Cat Eats Wet Nasty Icky Dead-fish"** eller **"Every Awesome Cisco Engineer Will Need Ice-cream Daily"**):

| Level | Severity Name | Beskrivelse |
| :---: | :--- | :--- |
| **`0`** | **Emergencies** | Den mest alvorlige tilstand: Systemet er **ubrugeligt** (*System is unusable*). |
| **`1`** | **Alerts** | Tilstande, der kræver **øjeblikkelig handling** (*Immediate action needed*). |
| **`2`** | **Critical** | Kritiske tilstande, der skal løses for at forhindre nedbrud i tjenesten. |
| **`3`** | **Errors** | Fejltilstande i systemet, som dog ikke gør hele systemet ubrugeligt. |
| **`4`** | **Warnings** | Advarsler om, at specifikke operationer fejlede eller nærmer sig en fejlgrænse. |
| **`5`** | **Notifications** | Normale, men vigtige hændelser — f.eks. tilstandsændringer (*state changes*, interface up/down). |
| **`6`** | **Informational** | Detaljerede oplysninger om normal drift. |
| **`7`** | **Debugging** | Ekstremt detaljeret diagnostisk information (f.eks. på pakkeniveau) til fejlfinding. |

![[Table 14-3 - Syslog Severity Levels.png]]

![[Figure 14-7 - Structure of a Syslog Message.png]]

### Log Aggregation og SIEM (Security Information and Event Management)
- **Log Aggregation:** Processen med at samle og konsolidere logfiler fra alle netværksenheder, servere og sikkerhedssystemer på ét centralt sted (og kombinere ensartede hændelser for at reducere støj).
- **SIEM (f.eks. Splunk Enterprise):** En central sikkerheds- og analyseplatform, der indsamler, aggregerer og korrelerer logdata og *machine data* i realtid for at opdage sikkerhedshændelser, anomalier og performanceproblemer.

### NetFlow og Flow Data
Hvor *Packet Capture* (Wireshark) gemmer hele pakkens indhold (inkl. payload), opsamler **NetFlow (Flow Data)** metadata og statistik om IP-trafikstrømme (*flows*), der passerer gennem en routers eller switchs interfaces (hvem taler med hvem, på hvilke porte, med hvilken protokol og hvor mange bytes/pakker):
1. **Flow Exporter:** Netværksenheden (router/switch), der samler pakker i flows og eksporterer flow-records.
2. **Flow Collector:** Serveren, der modtager, lagrer og forbehandler flow-data fra eksporterne.
3. **Analysis Application:** Præsenterer og analyserer flow-dataene grafisk (f.eks. *top talkers*, flaskehalse eller mistænkelige trafikmønstre).

### API Integration og Overvågningsløsninger (Monitoring Solutions)
- **API Integration (*Application Programming Interface*):** Gør det muligt for moderne overvågningsplatforme automatisk at udveksle realtidsdata med andre systemer, cloud-platforme og ticketing-systemer og samle al telemetri i ét samlet dashboard.
- **De 5 kategorier af Monitoring Solutions:**
  1. **Network Discovery:** Identificerer og kortlægger automatisk alle enheder og tjenester på netværket (enten **Ad hoc** ved fejlfinding eller **Scheduled** på faste tidspunkter for at opdage nye/uautoriserede enheder).
  2. **Traffic Analysis:** Analyserer trafikmønstre i realtid via packet capture, flow-analyse og deep packet inspection (DPI).
  3. **Performance Monitoring:** Overvåger løbende KPI'er som svartider (*response time*), *throughput* og ressourceforbrug på tværs af netværk, servere og applikationer.
  4. **Availability Monitoring:** Overvåger oppetid (*uptime*) og tilgængelighed 24/7 og alarmerer straks ved nedbrud, så organisationen kan overholde sine **SLAs**.
  5. **Configuration Monitoring:** Overvåger enhedernes konfigurationer for uautoriserede ændringer eller afvigelser fra *baseline/golden configuration*.

---

## 4. Real-World Case Study & Nøgleemner

I kapitlets case-studie forbedrer *Acme, Inc.* sin netværksobservabilitet ved at aktivere **NetFlow** på centrale routere og switche og kombinere flow-statistikken med central logopsamling og korrelation i **Splunk Enterprise (SIEM)**.

![[Table 14-4 - Key Topics for Chapter 14.png]]
