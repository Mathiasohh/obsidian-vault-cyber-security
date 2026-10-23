---
tags:
  - studieplan
  - audhd
  - cybersikkerhed
  - python
  - sql
oprettet: 2026-09-08
forfatter: Mathias
institution: Erhvervsakademi Aarhus (EAAA)
---

# 🛡️ Cybersikkerhed: Studieplan & Obsidian Struktur (AuDHD Edition)

> [!tip] AuDHD Grundprincip: Friktionsløs Læring
> * **Korte feedback-loops:** Koden skal køre og give svar med det samme (undgå lange passive forelæsninger).
> * **5-minutters reglen:** Ved igangsætningsbesvær, aftal kun at åbne editoren og skrive 3 linjer.
> * **Cyber-kontekst:** Forbind altid syntaks med konkrete sikkerhedsmæssige use-cases (logs, exploits, netværk).

---

## 🗂️ 1. Obsidian Vault Struktur

Hold strukturen flad og minimalistisk for at undgå overvældelse og "mappe-lammelse":

```text
📁 Dit Obsidian Vault
├── 📂 00 Inbox                  # Lynnoter under undervisning (sorteres senere)
├── 📂 01 Fag                    # Modulnoter på EAAA (Netværk, Systemudvikling, Sikkerhed)
├── 📂 02 Værktøjer & Cheats     # Korte opslag: Python, SQL, Nmap, Wireshark osv.
├── 📂 03 Koncepter              # Sikkerhedsbegreber: SQLi, Hashing, CIA-triaden
└── 📂 99 Skabeloner             # Faste templates til nye noter
```

---

## 🚀 2. Læringsplan: SQL & Python

### Fase 1: SQL – Det Hurtige Dopamin-Kick (Uge 1–3)
> [!info] Hvorfor SQL først?
> SQL er deklarativt, ekstremt logisk og giver hurtige succesoplevelser, der appellerer til den autistiske sans for orden.

- [ ] **Uge 1: Grundlæggende forespørgsler**
  - [ ] Gennemfør lektion 1-5 på [SQLBolt](https://sqlbolt.com/) (`SELECT`, `WHERE`)
  - [ ] Gennemfør lektion 6-12 på [SQLBolt](https://sqlbolt.com/) (`JOIN`, `ORDER BY`, `GROUP BY`)
  - [ ] Opret noten `[[SQL Cheatsheet]]` med de 5 vigtigste kommandoer
- [ ] **Uge 2: Gamification & Logik**
  - [ ] Løs mysteriet i [SQL Murder Mystery](https://mystery.knightlab.com/)
  - [ ] Notér nyttige forespørgselsmønstre i `[[SQL Cheatsheet]]`
- [ ] **Uge 3: Sikkerhedsvinklen (SQL Injection)**
  - [ ] Læs om SQL Injections på [PortSwigger Web Security Academy](https://portswigger.net/web-security/sql-injection)
  - [ ] Løs lab: *SQL injection vulnerability in WHERE clause allowing retrieval of hidden data*
  - [ ] Opret konceptnoten `[[SQL Injection]]`

---

### Fase 2: Python – Værktøjet til Automatisering (Uge 4–9)
> [!info] Fokusér på de 5 grundlæggende byggesten
> Undgå dyb objektorientering i starten. Lær det, der bruges til at bygge hurtige sikkerhedsværktøjer.

- [ ] **Uge 4-5: Byggestenene**
  - [ ] Variabler & Datatyper (strenge, tal, booleans)
  - [ ] Lister og Dictionaries (uundværlige til JSON og logfiler)
  - [ ] Loops (`for`, `while`) og betingelser (`if`/`elif`/`else`)
  - [ ] Funktioner (genbrug af kode)
  - [ ] Løs 5 opgaver på [Exercism.org](https://exercism.org/tracks/python)
- [ ] **Uge 6: Projekt – Hash Generator & Checker**
  - [ ] Lær `hashlib`-modulet
  - [ ] Skriv et script der hasher et ord til SHA-256
  - [ ] Tjek hashet mod en liste af kendte hashes (f.eks. top 100 adgangskoder)
- [ ] **Uge 7: Projekt – Logfil-parser**
  - [ ] Lær at åbne og læse filer med `with open(...)`
  - [ ] Lav et script der scanner en logfil for fejl (HTTP 404 / 403) eller fejlede logins
- [ ] **Uge 8: Projekt – Simpel Port Scanner**
  - [ ] Lær `socket`-biblioteket
  - [ ] Forbind en port på localhost og tjek om den svarer
  - [ ] Forbind noten med dit netværkspensum: `[[Netværksporte og Protokoller]]`
- [ ] **Uge 9: API Opslag**
  - [ ] Lær modulet `requests`
  - [ ] Hent data fra et åbent API (f.eks. IP-opslag mod AbuseIPDB eller VirusTotal)

---

### Fase 3: Forening (SQL + Python + Cyber) (Uge 10+)
- [ ] **Uge 10: Gem data med SQLite**
  - [ ] Brug Pythons indbyggede `sqlite3`-modul
  - [ ] Gem parsed logdata fra Python direkte i en SQLite-database
  - [ ] Træk rapporter ud via SQL:
    ```sql
    SELECT ip, COUNT(*) AS attempts 
    FROM failed_logins 
    GROUP BY ip 
    HAVING attempts > 5 
    ORDER BY attempts DESC;
    ```

---

## 📋 3. Skabeloner til Obsidian (Templates)

Kopier disse skabeloner ind som separate noter i mappen `99 Skabeloner/`.

### Skabelon A: Værktøj / Sprog (`99 Skabeloner/Tpl - Værktøj.md`)
````markdown
# Værktøj: {{title}}

### Formål / Hvad løser det?
- 

### Top 3-5 Kommandoer / Syntaks
```text
# Eksempel 1:
kommando -flag parameter
```

### Typiske fejl & Gotchas (Hvad driller?)
- 

### Links & Ressourcer
- 
````

### Skabelon B: Sikkerhedskoncept (`99 Skabeloner/Tpl - Koncept.md`)
```markdown
# Koncept: {{title}}

### Hvad er det? (Kort forklaring)
- 

### Hvordan fungerer angrebet / sårbarheden?
- 

### Hvordan beskytter man sig (Mitigation)?
- 

### Praktisk afprøvning / Labs
- [[Lab Noter]] eller eksternt link
```

---

## 🛠️ 4. Taktikker mod AuDHD-Fælder

| Fælde | Taktik |
| :--- | :--- |
| **Overspringshandlinger (Executive dysfunction)** | Start stopur på **10 minutter**. Aftal med dig selv, at du må stoppe efter 10 minutter, hvis du ikke er kommet i flow. |
| **Rabbit Holes / Plugin-mani** | Ingen nye Obsidian-plugins de første 3 uger. Brug kun standard Markdown. |
| **Fejlbesked-paralyse** | Kopier fejlbeskeden ind i AI: *"Forklar denne fejl kort, og hvad der mangler."* |
| **Glemte noter** | Brug søgefeltet (`Ctrl + O` eller `Omnisearch`) i stedet for at lede rundt i mapperne. |
