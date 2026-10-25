---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - Kapitel 21 - A Network Troubleshooting Methodology
  - Kapitel 21 - Troubleshooting Methodology
  - A Network Troubleshooting Methodology
---

# CompTIA Network+ N10-009: Kapitel 21 – A Network Troubleshooting Methodology

**Sider i bogen:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 21 - A Network Troubleshooting Methodology.pdf]]  
**For termer og udtryk, se:** [[NA - Begrebsark]] Kap. 21

---

## Resumé

Kapitel 21 dækker **Objective 5.1 (Explain the troubleshooting methodology)** i CompTIA Network+ N10-009-pensummet og præsenterer den officielle, strukturerede **7-trins CompTIA fejlsøgningsmetodik**, som er et af de mest centrale emner til eksamen.

Kapitlet indleder med de grundlæggende principper for fejlsøgning (*Troubleshooting Fundamentals*) og den forsimplede 3-trins model (**Problem report** $\rightarrow$ **Problem diagnosis** $\rightarrow$ **Problem resolution**), inklusiv brugen af midlertidige *workarounds* i kritiske situationer. Herefter gennemgås i fuld detalje alle **7 trin i CompTIA's strukturerede fejlsøgningsmetodik**:
1. **Identify the problem** (indsaml information, udspørg brugere, identificer symptomer, tjek om noget er ændret, genskab problemet om muligt, og håndter flere problemer enkeltvis).
2. **Establish a theory of probable cause** (stil spørgsmålstegn ved det åbenlyse, og overvej *Top-to-bottom*, *Bottom-to-top* eller *Divide-and-conquer* i OSI-modellen).
3. **Test the theory to determine the cause** (hvis teorien bekræftes, gå til næste trin; hvis den afkræftes, opstil en ny teori eller eskaler).
4. **Establish a plan of action to resolve the problem and identify potential effects** (udarbejd en handlings- og rollback-plan og vurder påvirkning på andre brugere/systemer).
5. **Implement the solution or escalate as necessary** (udrul løsningen i et passende servicevindue eller eskaler ved manglende rettigheder/kompetencer).
6. **Verify full system functionality and implement preventive measures if applicable** (bekræft med brugeren at problemet er løst, tjek at løsningen ikke har skabt nye fejl, og indfør forebyggende tiltag).
7. **Document findings, actions, outcomes, and lessons learned throughout the process** (dokumentér løbende og udarbejd evt. en *postmortem-rapport*).

---

## 1. Grundlæggende Fejlsøgning (Troubleshooting Fundamentals)

Netværksproblemer kan opstå som følge af menneskelige fejl (fejlkonfigurationer), hardwarefejl, software-bugs, kapacitetsmangel eller sikkerhedsangreb. Selvom erfaring og intuition spiller en stor rolle, sikrer en **struktureret fejlsøgningsmetodik**, at man ikke springer tilfældigt rundt mellem gæt eller glemmer, hvilke tests der allerede er udført.

### 1.1 Den forsimplede 3-trins fejlsøgningsmodel
På det helt overordnede niveau består enhver fejlsøgning af tre faser (Figur 21-1):
1. **Step 1: Problem Report (Fejlmelding):** Processen starter ved en brugerhenvendelse (trouble ticket) eller en proaktiv alarm fra et netværksovervågningssystem.
2. **Step 2: Problem Diagnosis (Problemdiagnosticering):** Her bruges størstedelen af teknikerens tid på at indsamle data, isolere symptomer og finde den underliggende rodårsag (*root cause*).
3. **Step 3: Problem Resolution (Problemløsning):** Implementering af den permanente løsning – eller i akutte situationer først en **midlertidig løsning (workaround)** for hurtigt at genoprette driften (f.eks. midlertidigt at trække et redundant switchkabel ud for at stoppe et STP-loop midt i spidsbelastningen, indtil et defekt modul kan udskiftes i et planlagt servicevindue).

![[Figure 21-1 - Simplified Troubleshooting Flow.png]]

Tabellen herunder (Tabel 21-1) opsummerer de seks kerneaktiviteter under diagnosticeringsfasen:

![[Table 21-1 - Steps to Diagnose a Problem.png]]

---

## 2. CompTIA's 7-trins Strukturerede Fejlsøgningsmetodik

Til CompTIA Network+ N10-009-eksamenen er det **afgørende at kunne rækkefølgen og indholdet af disse 7 trin udenad** (Figur 21-2):

![[Figure 21-2 - Structured Troubleshooting Approach.png]]

---

### Trin 1: Identify the Problem (Identificer problemet)
Effektiv fejlsøgning begynder altid med en præcis problemformulering og systematisk informationsindsamling – *før* man begynder at gætte på årsager eller ændre konfigurationer:
- **Gather information (Indsaml information):**Da en indledende fejlmelding ("nettet virker ikke") sjældent indeholder nok tekniske detaljer, skal du indsamle supplerende data fra overvågningsværktøjer, logs og tests.
- **Question users (Udspørg berørte brugere):** Interview brugerne om, hvad de præcis oplever, hvilke fejlbeskeder de ser, og hvad de foretog sig lige op til fejlen.
- **Identify symptoms (Identificer symptomer):** Afgræns omfanget (*scope*): Er det kun én bruger, ét VLAN eller hele bygningen? Virker forbindelse til andre servere? (F.eks.: *"Bruger A kan ikke pinge Server 1, men kan godt nå alle andre servere, og alle andre brugere kan godt nå Server 1"*).
- **Determine if anything has changed (Undersøg om noget er ændret):** Spørg og tjek change-logs for, om der nyligt er lavet konfigurationsændringer, opdateringer, kabelarbejde eller nyinstallationer. Nylige ændringer er meget ofte årsagen til nye fejl!
- **Duplicate the problem, if possible (Genskab problemet om muligt):** Forsøg selv at reproducere fejlen for at observere symptomerne direkte.
- **Approach multiple problems individually (Håndter flere problemer enkeltvis):** Hvis du opdager flere uafhængige fejl på samme tid, skal de isoleres og løses én ad gangen.

---

### Trin 2: Establish a Theory of Probable Cause (Opstil en teori om sandsynlig årsag)
Når symptomerne er kortlagt, brainstormer du på mulige tekniske årsager og udvælger den mest sandsynlige:
- **Question the obvious (Stil spørgsmålstegn ved det åbenlyse):** Oversé aldrig de helt basale årsager (Er kablet sat i? Er porten *administratively down*? Har PC'en en gyldig IP-adresse og subnetmaske?).
- **Consider multiple approaches (Vælg en systematisk OSI-tilgang):**
  1. **Bottom-to-Top OSI Model (Nedefra og op):** Start på **Lag 1 (Physical)** (kabler, link-LEDs) og arbejd dig op gennem Lag 2 (VLAN/STP/MAC), Lag 3 (IP/routing) osv. Velegnet ved totalt forbindelsestab.
  2. **Top-to-Bottom OSI Model (Ovenfra og ned):** Start på **Lag 7 (Application)** og arbejd dig nedad. Velegnet når netværksforbindelsen generelt virker, men én bestemt applikation eller tjeneste fejler.
  3. **Divide and Conquer (Del og hersk):** Start i midten af OSI-stakken – typisk på **Lag 3/4** ved at køre en **`ping`**-test. Hvis `ping` til en fjern-IP virker, ved du med det samme, at **Lag 1, 2 og 3 fungerer**, og du kan fokusere din søgning på Lag 4–7 (f.eks. DNS, portblokering eller applikationen). Hvis `ping` fejler, undersøger du Lag 1–3.

---

### Trin 3: Test the Theory to Determine the Cause (Test teorien for at fastslå årsagen)
Før du foretager indgribende ændringer, skal du **teste din hypotese** (f.eks. ved at køre `ipconfig /all`, `show ip route` eller inspicere konfigurationen):
- **If theory is confirmed (Hvis teorien bekræftes):** Du har fundet rodårsagen (f.eks. at Bruger A har fået subnetmasken `255.255.0.0` i stedet for `255.255.255.0`, så PC'en fejlagtigt tror, at Server 1 ligger på det lokale subnet og derfor ikke sender pakkerne til sin Default Gateway). Du går nu videre til **Trin 4**.
- **If theory is NOT confirmed (Hvis teorien IKKE bekræftes):** Hvis testen modbeviser din teori, skal du **gå tilbage til Trin 2 og opstille en ny teori** – eller **eskalere (escalate)** problemet til en mere erfaren specialist.

---

### Trin 4: Establish a Plan of Action to Resolve the Problem and Identify Potential Effects (Udarbejd en handlingsplan og identificer mulige konsekvenser)
Når årsagen er bekræftet, må du ikke bare kaste dig ud i tilfældige rettelser på et produktionsnetværk:
- **Udarbejd en handlingsplan (Plan of Action):** Beskriv præcis, hvilken ændring der skal foretages (f.eks. *"Ændr subnetmasken på Bruger A's PC fra `255.255.0.0` til `255.255.255.0`"*), og hav en **Rollback / Back-out plan** klar, så du hurtigt kan gendanne den oprindelige tilstand, hvis noget går galt.
- **Identify potential effects (Vurder konsekvenser/sideeffekter):** Vurder hvordan ændringen vil påvirke andre brugere, servere og forretningskritiske tjenester. At ændre subnetmasken på én enkelt PC påvirker ingen andre; men at genstarte en kernerouter eller ændre en firewall-ACL midt i arbejdstiden kan afbryde hele virksomheden!

---

### Trin 5: Implement the Solution or Escalate as Necessary (Implementer løsningen eller eskaler efter behov)
- **Implement the solution:** Udfør handlingsplanen på et passende tidspunkt (afvej problemets alvorlighed over for påvirkningen af øvrige brugere; større infrastrukturændringer lægges i et godkendt *maintenance window*).
- **Escalate as necessary:** Hvis du undervejs opdager, at du ikke har de nødvendige administrative rettigheder (privilegier) eller adgang til det pågældende udstyr, eskalerer du opgaven til det relevante niveau (f.eks. Tier 2/3 eller sikkerhedsteamet).

---

### Trin 6: Verify Full System Functionality and Implement Preventive Measures if Applicable (Verificer fuld systemfunktionalitet og indfør forebyggende tiltag)
Efter at løsningen er rullet ud, er arbejdet ikke færdigt endnu:
- **Verify full system functionality:**
  1. Test at det oprindelige problem er væk (f.eks. at `ping` og adgang fra Bruger A til Server 1 nu virker).
  2. Tjek at din ændring **ikke har introduceret nye fejl** andre steder i systemet.
  3. **Bekræft med slutbrugeren:** Lev efter reglen: *"Et problem er ikke løst, før brugeren, der indrapporterede det, bekræfter, at det er løst!"*
- **Implement preventive measures (Forebyggelse):** Overvej hvad der kan gøres for, at fejlen ikke sker igen (f.eks. skifte fra manuel IP-konfiguration til DHCP eller tilføje overvågning).

---

### Trin 7: Document Findings, Actions, Outcomes, and Lessons Learned Throughout the Process (Dokumentér fund, handlinger, resultater og erfaringer)
Afslut fejlsøgningen med grundig dokumentation (og husk at notere undervejs i hele forløbet):
- Opdater *trouble ticket*-systemet, netværksdiagrammer og konfigurationsdokumentation.
- Udarbejd eventuelt en **Postmortem Report** (hændelsesrapport), der beskriver det indrapporterede problem, rodårsagen, hvordan det blev løst, og *lessons learned* – så kolleger hurtigt kan løse lignende problemer i fremtiden.

---

## 3. Nøgleemner til Eksamen (Key Topics)

![[Table 21-2 - Key Topics for Chapter 21.png]]

### Hurtige eksamenstips (Exam Cram)
- **Rækkefølgen af de 7 trin:** 1) *Identify the problem* $\rightarrow$ 2) *Establish a theory of probable cause* $\rightarrow$ 3) *Test the theory* $\rightarrow$ 4) *Establish a plan of action & identify potential effects* $\rightarrow$ 5) *Implement the solution or escalate* $\rightarrow$ 6) *Verify full system functionality & preventive measures* $\rightarrow$ 7) *Document findings, actions, outcomes, and lessons learned*.
- **Hvor hører OSI Top-to-Bottom, Bottom-to-Top og Divide-and-Conquer hjemme?** I **Trin 2 (Establish a theory of probable cause)**.
- **Hvad gør man, hvis teorien IKKE bekræftes?** I **Trin 3 (Test the theory)** opstiller man en ny teori eller eskalerer.
- **Hvad gør man lige efter, at man har verificeret fuld funktionalitet og forebyggende tiltag (Trin 6)?** Man går til **Trin 7: Document findings, actions, outcomes, and lessons learned**.
