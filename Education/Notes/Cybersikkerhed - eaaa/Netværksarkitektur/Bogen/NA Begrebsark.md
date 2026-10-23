---
Up: "[[NA Bogen]]"
---
# Kap. 1
## Begreber:

* [[OSI Model]]/OSI Stack - Står for Open Systems Interconnection Reference model og består af syv lag
* TCP/[[IP stack]] - Står for Transmission Control Protocol/Internet Protocol. Også kendt som Department of Defense (DoD) modellen der fokuserer på Internet Protocol (IP) Kommunikation 
* Payload - Giver en simpel generisk måde at beskrive den data der er sendt
* Bit - Der er to binære udtryk dannet gennem bits. En bit kan være et enkelt 1 eller et enkelt 0.
* Protocol data unit ([[Protocol data unit (PDU)]])/Data service unit - En gruppering af bits, omtalt forskelligt alt efter laget i [[OSI Model]] laget
* [[NIC - Network interface Card or Controller]] - 
* 


# Kap. 6

## Begreber:

* [[PAN - Personal Area Network]] - Nære personlige netværk
* [[LAN - Local Area Network]] - Lokal område og lokal administration
* [[WAN - Wide Area Network]] - Forbinder netværk over afstand
* [[WLAN - Wireless Local Area Network]] - Trådløs adgang til et [[LAN - Local Area Network]]
* [[SAN - Storage Area Network]] - Dedikeret netværk der  forbinder servere med datalageringsenheder
* [[CAN - Campus Area Network]] -
* [[MAN - Metrolpolitan Area Network]] -
* [[VPN - Virtual Private Network]] -


# Kap. 7

## Begreber:

* IPv4 - Internet Protocol version 4. Et 32-bit logisk adresseringssystem opdelt i fire 8-bit oktetter skrevet i dotted-decimal notation.
* Octet - En 8-bit sektion af en IPv4-adresse (i alt 4 oktetter i en 32-bit adresse).
* [[Subnet Mask]] - En 32-bit maske af sammenhængende 1-taller efterfulgt af 0-taller, som opdeler en IP-adresse i en netværksdel (network portion) og en værtsdel (host portion).
* ***Prefix Notation/Slash Notation*** - En kompakt notation (f.eks. `/24`), der angiver antallet af netværksbits (1-taller) i subnet masken.
* ***Classful Mask*** - Standard subnet masken tilknyttet de oprindelige IP-adresseklasser (Class A: `/8`, Class B: `/16`, Class C: `/24`).
* ***Class A*** - IP-adresser med 1–126 i første oktet; designet til meget store netværk med standardmasken `255.0.0.0` (`/8`).
* ***Class B*** - IP-adresser med 128–191 i første oktet; designet til mellemstore netværk med standardmasken `255.255.0.0` (`/16`).
* ***Class C*** - IP-adresser med 192–223 i første oktet; designet til mindre netværk med standardmasken `255.255.255.0` (`/24`).
* ***Class D*** - IP-adresser med 224–239 i første oktet; reserveret udelukkende som destinationsadresser til multicast-trafik.
* ***Class E*** - IP-adresser med 240–255 i første oktet; reserveret til eksperimentelt og forskningsmæssigt brug.
* ***Loopback/Localhost*** - Området `127.0.0.0/8` (typisk `127.0.0.1`), der repræsenterer den lokale enhed selv og bruges til at teste enhedens TCP/IP-stak.
* [[RFC 1918 - Private IP Addressing]] - Standarden, der definerer private, ikke-routbare adresseområder på det offentlige internet (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`).
* [[Public IP Addressing]] - Globalt unikke IP-adresser administreret af IANA/ICANN, som kan routes på det åbne internet.
* [[NAT - Network Address Translation]] - En routerfunktion, der oversætter interne private (RFC 1918) IP-adresser til en eller flere offentlige adresser.
* [[ICANN - Internet Corporation for Assigned Names and Numbers]] - Den overordnede non-profit organisation, der administrerer tildelingen af globale IP-adresser og domænenavne.
* [[IANA - Internet Assigned Numbers Authority]] - Underorganisation af ICANN med ansvar for den globale allokering af IP-adresseblokke til regionale registre.
* [[Default Gateway]] - IP-adressen på router-interfacet på det lokale subnet, hvortil en vært videresender pakker rettet mod eksterne subnets.
* [[FQDN - Fully Qualified Domain Name]] - Et komplet, entydigt domænenavn (f.eks. `www.eksempel.dk`), som identificerer en specifik host på netværket.
* [[DNS - Domain Name System]] - Netværkstjeneste, der oversætter brugervenlige værtsnavne/FQDN'er til numeriske IP-adresser.
* [[WINS - Windows Internet Name Service]] - En ældre Microsoft NetBIOS-navneopløsningstjeneste, som mappede computernavne til IP-adresser (i dag erstattet af DNS).
* [[UNC - Universal Naming Convention]] - En standard for sti-angivelse til delte netværksressourcer (f.eks. `\\server\ressource`).
* [[BOOTP - Bootstrap Protocol]] - En tidlig netværksprotokol brugt til automatisk tildeling af IP-adresser til klienter ved opstart (forgængeren til DHCP).
* [[DHCP - Dynamic Host Configuration Protocol]] - Protokol til dynamisk og centraliseret tildeling af IP-adresser, subnet masks, default gateways og DNS-indstillinger.
* [[APIPA - Automatic Private IP Addressing]] En funktion (i bl.a. Windows), hvor en enhed selv tildeler en ikke-routbar adresse i området `169.254.0.0/16`, hvis en DHCP-server ikke kan kontaktes.
* [[Directed Broadcast]] - En broadcast-adresse for et specifikt subnet, hvor samtlige host-bits er sat til `1` (kan ikke tildeles en individuel netværksenhed).
* [[Subnetting]] - Processen med at forlænge en classful subnet maske ved at tilføje 1-taller (låne host-bits), hvilket opdeler et overordnet netværk i flere mindre subnets.
* [[Borrowed Bits]] - De ekstra bits, der tages fra værtsdelen og tilføjes netværksdelen i en subnet maske for at skabe subnets.
* [[Interesting Octet]] - Den specifikke oktet i subnet masken, hvor det sidste `1`-tal optræder; den oktet, hvori subnet-intervallerne tæller op.
* [[Block Size]] - Intervallet/inkrementet mellem subnet-adresser, beregnet som $256 - \text{værdien i the interesting octet}$.
* [[VLSM - Variable-Length Subnet Masking]] - Designmetode, hvor subnets inden for samme netværksrum kan opdeles yderligere med masker af forskellig længde for at minimere spild af IP-adresser.
* [[CIDR - Classless Inter-Domain Routing]] - Metoden til at forkorte en subnet maske (fjerne 1-taller) for at aggregere/opsummere flere sammenhængende classful netværk til én fælles rute (supernetting).


# Kap. 10

## Begreber:

- [[FDDI]] - Fiber Distributed Data Interface