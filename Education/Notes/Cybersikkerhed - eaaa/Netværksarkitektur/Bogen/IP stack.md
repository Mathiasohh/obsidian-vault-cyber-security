# TCP/IP Stakken (DoD Modellen)

TCP/IP-stakken, også kendt som DoD-modellen (*Department of Defense*), er en 4-lags netværksmodel. Hvor OSI-modellen er generisk, er størstedelen af nutidens internettrafik og virksomhedsnetværk bygget direkte på TCP/IP-protokolsuiten.

---

# Indholdsfortegnelse
- [[#Network Interface (Netværksgrænseflade)]]
- [[#Internet]]
- [[#Transport]]
- [[#Application (Applikation)]]
- [[#Porte og Tovejskommunikation]]
- [[#Sammenligning OSI vs TCP IP Stakken]]
![[Pasted image 20260906135818.png|344]]

---
# Network Interface (Netværksgrænseflade)
Dette lag omfatter teknologierne fra OSI-modellens lag 1 (Physical) og lag 2 (Data Link). I noget litteratur refereres dette lag også til som *Network Access layer*.

---

# Internet
Internet-laget i TCP/IP-stakken svarer til lag 3 (Network) i OSI-modellen. Selvom OSI-modellen tillader flere forskellige routede protokoller, fokuserer dette lag specifikt på IP (*Internet Protocol*) som den protokol, der routes gennem netværket.

Laget definerer blandt andet:
- [[#IPv4 Packet Header]]

## IPv4 Packet Header
En IPv4-pakke indeholder flere vigtige felter til routing.
![[Pasted image 20260906140346.png|466]]

### Source Address & Destination Address
Kilde- og destinations-IP-adresser.

### Protocol
Angiver hvilken transportlagsprotokol pakken tilhører.

### TTL (Time-to-Live)
En værdi der falder med 1, hver gang pakken sendes gennem en router (fra ét IP-netværk til et andet). Hvis TTL når 0, kasseres pakken for at forhindre uendelige routing-loops.

> [!note] Nomenklatur i praksis
> Selvom TCP/IP-stakken slår de nederste lag sammen, bruger netværksadministratorer stadig ofte OSI-betegnelserne "Lag 1", "Lag 2" og "Lag 3" i daglig tale.

---

# Transport
Svarer til lag 4 i OSI-modellen.

De primære protokoller på dette lag er:
- [[#Transmission Control Protocol (TCP)]]
- [[#User Datagram Protocol (UDP)]]

## Transmission Control Protocol (TCP)
En forbindelsesorienteret (*connection-oriented*) protokol, der sikrer pålidelig overførsel.
![[Pasted image 20260906140444.png|445]]

### Source Port & Destination Port
Kilde- og destinationsporte.

### Sequence Number
Gør det muligt for modtageren at samle segmenter i den korrekte rækkefølge, hvis de ankommer ude af trit.

### Acknowledgment Number
Viser det næste sekvensnummer, modtageren forventer. Dette bekræfter over for afsenderen, at alt op til dette punkt er modtaget.

### Window
Bestemmer hvor mange bytes en enhed kan modtage, før der kræves en bekræftelsesbesked, hvilket fungerer som flow control.

### TCP Flags
Bruges til at indikere forbindelsestilstande eller give yderligere kontrolinformation (f.eks. til fejlfinding).

## User Datagram Protocol (UDP)
En forbindelsesløs (*connectionless*) og upålidelig protokol.
Headeren er meget mindre og indeholder primært Source Port, Destination Port, UDP Length og en valgfri UDP Checksum til fejldetektion.
Den mangler sekvensnumre, window size og acknowledgments, hvilket gør den ideel til applikationer, hvor båndbredden skal maksimeres uden behov for bekræftelser (f.eks. lyd- eller videostreaming).
![[Pasted image 20260906140530.png|515]]

---

# Application (Applikation)
Den største forskel mellem de to modeller findes her. TCP/IP-stakkens applikationslag håndterer alle koncepter fra OSI-modellens lag 5 (Session), lag 6 (Presentation) og lag 7 (Application).
Den reducerede kompleksitet gør det nemmere at kategorisere højere-niveau protokoller (som f.eks. SIP), da de blot kapsles ind i TCP og placeres i applikationslaget.

---

# Porte og Tovejskommunikation
Applikationslagets protokoller identificeres i TCP/IP-stakken via unikke portnumre.

Dette omfatter:
- [[#Portkategorier]]
- [[#Sådan fungerer tovejskommunikation]]

## Portkategorier
Den maksimale portværdi er 65535.

### Well-known ports (Velkendte porte)
Port 1023 og nedefter. For eksempel bruger HTTP som standard TCP port 80, mens den sikre afløser HTTPS bruger TCP port 443.

### Ephemeral ports (Flygtige porte)
Porte over 1023, som typisk tildeles dynamisk til klientenheder.

## Sådan fungerer tovejskommunikation
Når en klient sender data til en server, indkapsles dataen i et segment med en destinationsport (f.eks. 80 for web) og en tilfældig kildeport over 1023 (f.eks. 1248). Segmentet indkapsles derefter i en pakke med kilde- og destinations-IP.
Når serveren svarer, byttes der rundt på IP-adresser og porte, så webserveren nu er kilden (port 80) og klienten er destinationen (port 1248), hvilket muliggør tovejskommunikation.
![[Pasted image 20260906140617.png|450]]

---

# Sammenligning: OSI vs. TCP/IP Stakken
TCP/IP-stakken reducerer kompleksiteten fra OSI-modellens 7 lag til 4 definerede lag:

```
OSI Model (7 Lag)         TCP/IP Stak (4 Lag)
┌──────────────────┐      ┌─────────────────────────┐
│ 7. Application   │      │                         │
├──────────────────┤      │  Application            │
│ 6. Presentation  │ ───> │  (Lag 5, 6 og 7 samlet) │
├──────────────────┤      │                         │
│ 5. Session       │      │                         │
├──────────────────┤      ├─────────────────────────┤
│ 4. Transport     │ ───> │  Transport (Lag 4)      │
├──────────────────┤      ├─────────────────────────┤
│ 3. Network       │ ───> │  Internet (Lag 3)       │
├──────────────────┤      ├─────────────────────────┤
│ 2. Data Link     │      │  Network Interface      │
├──────────────────┤ ───> │  / Network Access       │
│ 1. Physical      │      │  (Lag 1 og 2 samlet)    │
└──────────────────┘      └─────────────────────────┘
```