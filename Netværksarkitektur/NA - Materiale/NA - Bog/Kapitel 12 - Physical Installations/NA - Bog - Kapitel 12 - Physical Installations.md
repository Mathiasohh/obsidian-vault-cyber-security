---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - "Kapitel 12 - Physical Installations"
  - "NA - Bog - Kapitel 12"
---

# Kapitel 12: Physical Installations

> **Bog-PDF:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 12 - Physical Installations.pdf]]
> **Relateret begrebsark:** [[NA - Begrebsark]] Kap. 12

---

## Resumé

Kapitel 12 dækker **Objective 2.4 (Explain important factors of physical installations)** i CompTIA Network+ (N10-009)-pensummet. Kapitlet gennemgår de fysiske rammer omkring en professionel netværksinstallation i serverrum, krydsfelter og datacentre:
1. **Lokationer, Kabeldistribution og Racks:** Opbygning af struktureret kabling med **MDF (*Main Distribution Frame*)** og **IDF (*Intermediate Distribution Frame*)**, terminering i **Patch Panels**, **Fiber Distribution Panels** og punchdown-blokke (**66 block**, **110 block**, **Krone** og **BIX**) samt valg af udstyrsracks (**Rack Size** i **Rack Units / `U`**, **Port-side intake/exhaust** luftstrøm og **låsbare racks**).
2. **Strømforsyning (Power):** Strømfordeling via **PDU (*Power Distribution Unit* — Basic, Metered, Intelligent)**, beregning af **Power Load** og **Voltage** (herunder `110–120V` vs. `208–240V` og **PoE**) samt nødstrøm og spændingsbeskyttelse med **UPS (*Uninterruptible Power Supply*)** og backup-generatorer.
3. **Miljøfaktorer (Environmental Factors):** Styring af **temperatur** (`18°C–27°C` / *Hot & Cold Aisle*), **luftfugtighed / Humidity** (`40 %–60 %`) og **brandslukning (*Fire Suppression*)** med vandfri, gasbaserede *clean agent*-systemer (f.eks. **FM-200**).

---

## 1. Lokationer, Struktureret Kabling og Udstyrsracks

### Struktureret Kabeldistribution: MDF og IDF
I større bygninger samles netværkskabler fra kontorer og arbejdsstationer i dedikerede teknikrum (*wiring closets*) som en del af et organiseret kabeldistributionssystem:

![[Figure 12-1 - Example - Cable Distribution System.png]]

- **IDF (*Intermediate Distribution Frame*):** Lokale krydsfelter/teknikskabe (f.eks. ét på hver etage i en bygning), hvor de horisontale kabeltræk fra etagens kontorstik (*wall jacks*) termineres og kobles til etagens access-switche.
- **MDF (*Main Distribution Frame*):** Bygningens primære, centrale krydsfelt og serverrum, hvor alle bygningens IDFs løber sammen (ofte via højhastigheds fiberoptiske uplinks), og hvor kerneudstyr (core/distribution-switche, routere, firewalls, servere og forbindelsen til internetudbyderens *demarc*) er placeret.

### Patch Panels, Fiber Distribution Panels og Punchdown Blocks
- **Patch Panel (Kobber):** Fastmonteret panel i racket, hvor de stive installationskabler fra væggene termineres på bagsiden, mens korte, fleksible patchkabler på forsiden forbinder portene til switchen.
- **Fiber Distribution Panel (Fiber-Optic Patch Panel):** Bruges til at terminere, beskytte og patche fiberoptiske kabler i krydsfeltet. Findes både som **rack-monterede** og **væg-monterede** enheder.
- **Cross-Connect / Punchdown Blocks:**
  - **66 Block:** Ældre krydsfeltblok oprindeligt brugt til telefoni (POTS/PBX) og tidlige `10 Mbps` Cat 3 LANs. På grund af høj **crosstalk** egner en 66-blok sig **ikke** til hurtigere netværk (`100 Mbps+`).

![[Figure 12-2 - 66 Block.png]]

  - **110 Block:** Moderne punchdown-blok designet til at minimere crosstalk ved højhastigheds datanetværk (**Cat 5e, Cat 6 og Cat 6a**). Findes også på bagsiden af moderne RJ45-patchpaneler.

![[Figure 12-3 - 110 Block.png]]

  - **Krone (Krone LSA-PLUS):** Europæisk proprietært alternativ til 110-blokken (udbredt i både data- og broadcastmiljøer), hvor lederne presses ned i klemmerne i en $45^\circ$ vinkel.
  - **BIX (*Building Industry Cross-Connect*):** Kompakt krydsfeltblok, der terminerer op til 25 trådpar (50 ledere) på en "wafer"-indsats.

---

### Udstyrsracks (Rack Size, Airflow & Physical Security)
- **Rack Size (Rack-størrelse og Rack Units `U`):**
  - Standardbredden for professionelle udstyrsracks er **19 tommer (`19 inches`)**.
  - Højden i et rack måles i **Rack Units (`U` eller `RU`)**, hvor **`1U = 1,75 tommer` (ca. `44,45 mm`)**.
  - Et fuldhøjde gulvrack i et datacenter er typisk **`42U` til `48U`** højt.
  - Ved begrænset plads anvendes *half-height racks* (**`18U`–`22U`**) eller vægmonterede racks (**`6U`–`12U`**) i mindre IDFs.
- **Port-side Exhaust / Intake (Luftstrøm og Køling):**
  - **Front-to-Back Airflow:** Den mest udbredte standard i serverracks, hvor kold luft suges ind på forsiden (*intake*) og varm luft blæses ud på bagsiden (*exhaust*).
  - **Port-side Intake vs. Port-side Exhaust ( samt Side-to-Side Airflow):** Da netværksswitche ofte monteres sammen med servere, skal man vælge blæsermoduler på switchen (*port-side intake* eller *port-side exhaust*), så switchens luftstrøm vender i **præcis samme retning** som resten af udstyret i racket (og passer med datacentrets *Hot Aisle / Cold Aisle*-design).
- **Lockable Racks (Fysisk sikkerhed):**
  - Udstyrsracks bør have **låsbare for- og bagdøre** (med nøgle, adgangskort/RFID eller biometrisk lås) og perforerede gitterdøre, så uautoriserede personer ikke kan trække kabler ud eller tilgå udstyret fysisk, samtidig med at køleluften frit kan passere.

---

## 2. Strømforsyning og Redundans (Power)

### Power Distribution Units (PDUs)
En **PDU (*Power Distribution Unit*)** er en professionel strømskinne monteret i racket, der fordeler elektrisk strøm til servere, switche og routere. For høj tilgængelighed monteres ofte **redundante PDUs** (forbundet til separate strømkredse) i hvert rack. PDUs inddeles i tre typer:
1. **Basic PDU:** Fordeler blot strøm til udtagene uden måling eller fjernstyring.
2. **Metered PDU:** Måler og viser strømforbruget lokalt (ofte ned på det enkelte udtag), så teknikere kan overvåge belastningen og undgå overbelastning af strømkredsen.
3. **Intelligent (Switched / Monitored) PDU:** Tilbyder **fjernovervågning og fjernstyring** over netværket (via IP/SNMP/webinterface), så administratorer kan aflæse strømforbrug i realtid og tænde/slukke individuelle strømudtag (*power cycling*) fra en central konsol.

### Power Load og Voltage
- **Power Load (Samlet strømbelastning):** Summen af det elektriske effektforbrug (målt i **Watt (`W`)** eller **Volt-Ampere (`VA`)**) for alt udstyr i et rack eller serverrum. Man skal altid beregne den samlede *power load* (inkl. ekstra kapacitet til fremtidig udvidelse og redundans), så hverken kabler, sikringer, PDUs eller UPS overbelastes.
- **Voltage (Spænding):** Netværksudstyr kræver stabil spænding uden udsving:
  - Standard kontorudtag leverer typisk **`110–120V`** (i Nordamerika), mens højtydende enterprise-servere og datacenterracks ofte anvender **`208–240V`** for højere energieffektivitet.
  - Hvis udstyret bruger **PoE (*Power over Ethernet*)** til at forsyne IP-kameraer, VoIP-telefoner og AP'er gennem netværkskablet, øger dette switchens eget strømforbrug (*power load*) betydeligt og kræver korrekt spændingslevering.

### Uninterruptible Power Supply (UPS)
En **UPS (*Uninterruptible Power Supply*)** er kernen i strømredundans:
- Indeholder genopladelige batterier, der øjeblikkeligt tager over ved strømsvigt (*blackouts*), så kritisk netværksudstyr holdes kørende uden genstart.
- Beskytter samtidig følsom elektronik mod **spændingsdyk (*brownouts* / *sags*)** og **overspænding (*power surges* / *spikes*)** ved at levere ren, reguleret strøm.
- Ved længerevarende strømafbrydelser holder UPS'en udstyret i live i de sekunder eller minutter, det tager for en **backup-generator** (diesel/gas) at starte op — eller giver systemerne tid til en kontrolleret nedlukning (*graceful shutdown*).

---

## 3. Miljøfaktorer (Environmental Factors)

For at sikre maksimal levetid og oppetid på netværksudstyr skal tre fysiske miljøfaktorer i serverrummet overvåges og styres nøje (jf. bl.a. **ASHRAE**- og **OSHA**-retningslinjer):

### 1. Temperatur (Temperature & Hot/Cold Aisle)
- For høj varme fører til termisk nedlukning, ustabilitet og permanent skade på komponenter.
- Det anbefalede temperaturområde i et serverrum/datacenter er typisk **`18°C til 27°C` (`64°F til 80°F`)** (i case-studiet styret præcist mellem `18°C` og `24°C`).
- Ud over præcisionsklimaanlæg (**HVAC / CRAC**) arrangeres racks i **Hot Aisle / Cold Aisle containment** (kolde og varme gange), så udstyrets kolde indblæsningsluft aldrig blandes med den varme udblæsningsluft.

### 2. Luftfugtighed (Humidity)
- Den anbefalede relative luftfugtighed i et datacenter ligger mellem **`40 % og 60 %`**.
  - **For høj luftfugtighed (`> 60 %`):** Skaber **kondens**, som forårsager kortslutninger og korrosion/rust på printplader og stik.
  - **For lav luftfugtighed (`< 40 %`):** Øger risikoen for **statisk elektricitet (ESD – *Electrostatic Discharge*)**, der kan ødelægge mikrochips ved berøring.

### 3. Brandslukning (Fire Suppression)
- Traditionelle **vandbaserede sprinklere** er uegnede i serverrum, fordi vand ødelægger alt strømførende elektronisk udstyr og forårsager kortslutninger.
- I stedet anvendes **gasbaserede "Clean Agent"-brandslukningssystemer** (f.eks. **FM-200** eller **Novec 1230**), som slukker ilden ved kemisk varmeabsorbering eller iltfortrængning **uden at efterlade vand eller skadelige rester** på servere og switche.

---

## 4. Real-World Case Study & Nøgleemner

I kapitlets case-studie designer *Acme, Inc.* et nyt datacenter med skærmet **Cat 6a (`10 Gbps`)** kabling, modulære **låsbare 19"-racks** med nøglekortadgang, **redundante intelligente PDUs**, **UPS + backup-generator**, **Hot/Cold Aisle**-køling (`18°C–24°C`), fugtighedsstyring (`40 %–60 %`) og et **FM-200 clean-agent brandslukningsanlæg**.

![[Table 12-1 - Key Topics for Chapter 12.png]]
