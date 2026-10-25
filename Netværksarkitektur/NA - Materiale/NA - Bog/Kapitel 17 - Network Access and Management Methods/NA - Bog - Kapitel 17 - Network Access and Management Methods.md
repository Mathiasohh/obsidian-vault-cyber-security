---
Up: "[[NA - Bog]]"
tags:
  - networking
  - comptia-network-plus
  - cert-guide
aliases:
  - "Kapitel 17 - Network Access and Management Methods"
  - "NA - Bog - Kapitel 17"
---

# Kapitel 17: Network Access and Management Methods

> **Bog-PDF:** [[CompTIA Network+ N10-009 Cert Guide - Kapitel 17 - Network Access and Management Methods.pdf]]
> **Relateret begrebsark:** [[NA - Begrebsark]] Kap. 17

---

## Resumé

Kapitel 17 dækker **Objective 3.5 (Compare and contrast network access and management methods)** i CompTIA Network+ (N10-009)-pensummet. Kapitlet gennemgår teknologier til sikker fjernadgang og administration af netværksenheder:
1. **Virtual Private Networks (VPNs):** Forskellen mellem **Site-to-Site VPN**, **Client-to-Site (Remote Access) VPN** og **Clientless VPN** (HTML5/SSL/TLS via browser), samt **Full Tunnel vs. Split Tunnel**-konfigurationer.
2. **IPsec og VPN-protokoller:** Dybdegående gennemgang af **IPsec** (CIA-beskyttelse, **IKEv1** med *Main Mode*, *Aggressive Mode* og *Quick Mode* i Phase 1 og Phase 2, **IKEv2**), **AH (*Authentication Header*)** vs. **ESP (*Encapsulating Security Payload*)**, **Transport Mode vs. Tunnel Mode**, de 5 trin i en IPsec Site-to-Site VPN samt øvrige VPN-protokoller (**TLS/SSL**, **L2TP**, **L2F**, **PPTP**, **SSTP** og **OpenVPN**).
3. **Forbindelses- og Administrationsmetoder:** **SSH**, **GUI**, **API**, **Console**, **Jump Box / Jump Host**, **Virtual Desktop**, **AAA (RADIUS & TACACS+)**, **NAC / IEEE 802.1X / EAP**, **MFA / 2FA / SSO**, **DLP (*Data Loss Prevention* — Data in use, in transit, at rest)** samt **In-Band vs. Out-of-Band Management**.

---

## 1. Virtual Private Networks (VPNs)

En **VPN (*Virtual Private Network*)** etablerer en krypteret, logisk tunnel mellem lokationer eller fjernbrugere hen over et usikkert netværk som det offentlige internet. Selvom tunnelen fysisk passerer gennem mange ISP-routere undervejs, fremstår den logisk som **ét enkelt router-hop** for endepunkterne.

### Site-to-Site VPN vs. Client-to-Site VPN vs. Clientless VPN
- **Site-to-Site VPN:** Forbinder to eller flere faste netværkslokationer (f.eks. hovedkontor og filial) permanent over internettet som et prisbilligt alternativ til en dedikeret *leased line*. VPN-tunnelen termineres på VPN-gateways/routere/firewalls i hver ende, så de enkelte PC'er på lokationerne **ikke** behøver særlig VPN-klientsoftware installeret.

![[Figure 17-1 - Site-to-Site VPN.png]]

- **Client-to-Site VPN (Remote Access VPN):** Forbinder en individuel fjernarbejder (f.eks. fra hjemmekontor eller hotel) sikkert ind til virksomhedens centrale VPN-koncentrator/firewall ved hjælp af **VPN-klientsoftware** på brugerens laptop eller smartphone.

![[Figure 17-2 - Client-to-Site VPN.png]]

- **Clientless VPN:** En populær variant af Client-to-Site VPN, hvor brugeren **ikke** skal installere dedikeret VPN-klientsoftware. I stedet fungerer brugerens **HTML5-webbrowser** som klient over en **SSL/TLS-forbindelse** (`HTTPS / TCP port 443`) mod en webportal, der giver sikker adgang til specifikke interne webapplikationer, fildeling eller fjernstyring.

### Full Tunnel vs. Split Tunnel
Når en Client-to-Site VPN konfigureres, skal administratoren vælge, hvordan klientens trafik rutes:
- **Full Tunnel:** **Al** netværkstrafik fra brugerens enhed (både trafik til det interne virksomhedsnetværk **og** almindelig internettrafik til f.eks. Microsoft 365 eller websidebesøg) sendes gennem den krypterede VPN-tunnel ind forbi virksomhedens hovedkontor og ud gennem hovedkontorets sikkerheds-stack/firewall.
  - *Fordel:* Maksimal sikkerhed og fuld trafikinspektion.
  - *Ulempe:* Høj belastning på VPN-koncentratoren og hovedkontorets internetforbindelse samt øget latency til cloud-tjenester.
- **Split Tunnel:** **Kun trafik, der er adresseret til virksomhedens interne private netværk**, sendes gennem VPN-tunnelen, mens al øvrig internettrafik (f.eks. videomøder og Office 365) går direkte ud via brugerens egen lokale internetforbindelse uden om VPN-tunnelen.
  - *Fordel:* Sparer båndbredde på hovedkontoret og giver langt bedre hastighed på cloud-applikationer.
  - *Ulempe:* Brugerens maskine er direkte eksponeret mod internettet uden om hovedkontorets centrale firewall.

---

## 2. IPsec og Andre VPN-protokoller

### IPsec (Internet Protocol Security)
**IPsec** opererer på **Layer 3 (Network Layer)** i OSI-modellen, hvilket gør den transparent for alle overliggende applikationer. IPsec leverer fuld beskyttelse ud fra **CIA-triaden**:
- **Confidentiality (Fortrolighed):** Kryptering af pakker, så tredjeparter ikke kan læse indholdet.
- **Integrity (Integritet):** Kryptografiske hashes/checksums sikrer, at pakker ikke er blevet ændret under transport.
- **Authentication (Autentificering):** Verificerer modpartens identitet via pre-shared keys eller digitale certifikater.

### IKE (Internet Key Exchange – IKEv1, IKEv2 & Modes)
**IKE** forhandler automatisk kryptografiske nøgler og sikkerhedsparametre — kaldet **Security Associations (SAs)** og *transform sets* — mellem de to IPsec-peers:
- **IKE Phase 1 (ISAKMP-tunnel):** Etablerer en sikker, tovejs administrationskanal mellem de to VPN-endepunkter ved hjælp af **Diffie-Hellman (DH)** nøgleudveksling (evt. med *Perfect Forward Secrecy / PFS*). Kan afvikles i to tilstande:
  1. **Main Mode:** Bruger **6 pakker (3 udvekslinger)** og beskytter parternes identiteter ved at kryptere dem.
  2. **Aggressive Mode:** Hurtigere, da den kun bruger **3 pakker**, men sender identitetsoplysninger ukrypteret i de første pakker (mindre sikkert).
- *(Valgfri **IKE Phase 1.5 / XAuth**):* Udvidet brugerautentificering inden for Phase 1-tunnelen.
- **IKE Phase 2 (IPsec-tunnel):** Forhandler de **envejs (unidirectional) IPsec SAs**, der bruges til selve datatrafikken, via **Quick Mode** inde under beskyttelsen af Phase 1-tunnelen.
- **IKEv2 (og IKEv3):** En nyere og mere effektiv version, der bruger færre pakker til at etablere *IKEv2 SA* og *Child SAs*, og som har **indbygget understøttelse af EAP**, **NAT Traversal (NAT-T)** og *Dead Peer Detection* / tunnelvalidering.

![[Table 17-1 - IKE Modes.png]]

### AH vs. ESP og Transport Mode vs. Tunnel Mode
- **AH (*Authentication Header*, IP-protokol `51`):** Leverer kildeautentificering og dataintegritet for hele pakken, men **ingen kryptering**.
- **ESP (*Encapsulating Security Payload*, IP-protokol `50`):** Leverer både **kryptering** (fortrolighed) samt autentificering og integritet — og er derfor langt den mest anvendte i praksis.
- **Transport Mode vs. Tunnel Mode:**
  - **Transport Mode:** Krypterer kun IP-pakkens **payload** og genbruger den **originale IP-header**. Mindre pakke-overhead; bruges ofte til *Client-to-Site VPN* eller sammen med en **GRE-tunnel** (*GRE over IPsec*, som samtidig gør det muligt at sende **multicast- og broadcasttrafik** som dynamiske routingprotokoller gennem IPsec).
  - **Tunnel Mode:** Indkapsler og krypterer **hele den originale IP-pakke** (inkl. den originale IP-header) og sætter en **helt ny ydre IP-header** på med VPN-gatewayernes offentlige IP-adresser som kilde og destination. Standardvalget til **Site-to-Site VPNs**.

![[Figure 17-3 - Transport Mode Versus Tunnel Mode.png]]

### De 5 trin i en IPsec Site-to-Site VPN (IKEv1)
1. **Trin 1:** `PC1` sender trafik mod `PC2`. `Router1` matcher trafikken mod en ACL og klassificerer den som **"interesting traffic"**, hvilket starter VPN-opkaldet.
2. **Trin 2:** `Router1` og `Router2` forhandler en **IKE Phase 1 (ISAKMP) tunnel**.
3. **Trin 3:** Inde i den beskyttede Phase 1-tunnel forhandles og oprettes **IKE Phase 2 (IPsec) tunnelen**.
4. **Trin 4:** Den klassificerede *interesting traffic* udveksles krypteret gennem IPsec-tunnelen.
5. **Trin 5:** Når der ikke har været *interesting traffic* i et fastsat tidsinterval (*idle timeout*), rives IPsec-tunnelen ned, og SA'erne slettes.

![[Figure 17-4 - IPsec VPN Steps.png]]

### Øvrige VPN-protokoller

![[Table 17-2 - Examples of VPN Protocols.png]]

- **TLS / SSL:** Krypterer trafik på de øvre OSI-lag (Layers 5–7); grundlaget for HTTPS og moderne *Clientless / SSL VPNs*.
- **L2TP (*Layer 2 Tunneling Protocol*), L2F (*Layer 2 Forwarding*) & PPTP (*Point-to-Point Tunneling Protocol*):** Ældre Layer 2-tunnelprotokoller, der **ikke har indbygget stærk kryptering** i sig selv; L2TP kombineres derfor næsten altid med IPsec som **L2TP/IPsec**.
- **SSTP (*Secure Socket Tunneling Protocol*):** Transporterer PPP-trafik gennem en **SSL/TLS-kanal over TCP port `443`**, så den let passerer gennem næsten alle firewalls og web-proxies.
- **OpenVPN:** Populær open-source VPN-løsning baseret på TLS/SSL til både client-to-site og site-to-site forbindelser.

---

## 3. Netværksadgangs- og Administrationsmetoder

### Forbindelsesmetoder til Enhedsadministration (Connection Methods)
- **SSH (*Secure Shell*, TCP port `22`):** Krypteret kommandolinjeadgang (CLI) via en terminalemulator; standardmetoden til sikker fjernstyring af switche, routere, firewalls og Linux-servere.
- **GUI (*Graphical User Interface*):** Grafisk administration via webbrowser (`HTTPS`) eller dedikeret management-klient/RDP/VNC. Kræver mere båndbredde end CLI.
- **API (*Application Programming Interface*):** Programmatisk adgang (f.eks. REST APIs med JSON/XML), der gør det muligt for scripts, SDN-controllere og automatiseringsværktøjer (Ansible, Terraform) at konfigurere og overvåge netværksenheder i stor skala.
- **Console Port:** Fysisk lokal port (RJ45 seriel / RS-232 eller USB) direkte på selve switchen eller routeren til lokal konfiguration og fejlfinding; skal beskyttes med både fysisk adgangskontrol (låst serverrum/rack) og login-adgangskode.
- **Jump Box / Jump Host (Bastion Host):** En særligt sikkerhedshærdet og nøje overvåget mellemserver (*intermediary server*), som administratorer først skal logge ind på (f.eks. via VPN + MFA), før de derfra kan oprette SSH- eller RDP-forbindelse videre til kritiske netværksenheder og servere i beskyttede netværkszoner.
- **Virtual Desktop (VDI / DaaS):** Brugeren tilgår et fuldt skrivebordsmiljø, der afvikles centralt på en server i datacentret eller skyen, frem for at lagre følsomme data på den lokale klientenhed.

![[Table 17-3 - Network Access Technologies.png]]

### AAA, NAC, MFA og Data Loss Prevention (DLP)
- **AAA (*Authentication, Authorization, and Accounting*):** Centraliserer adgangskontrol på en **RADIUS**-server (UDP-baseret; krypterer kun adgangskoden i pakken; stærk til netværksadgang/802.1X og *accounting*) eller en **TACACS+**-server (Cisco-udviklet, TCP port `49`; krypterer **hele pakken** og adskiller Authentication, Authorization og Accounting; foretrukket til *device administration*). **Local authentication** (lokal brugerdatabase på selve enheden) bruges som *fallback*, hvis AAA-serveren er utilgængelig.
- **NAC (*Network Access Control*) & IEEE 802.1X / EAP:** Kontrollerer både brugerens identitet og enhedens sundhedstilstand (*posture*: OS-version, antivirus) før der åbnes for netværksadgang på en switchport eller et AP.
- **2FA / MFA & Single Sign-On (SSO):** Kræver to eller flere autentificeringsfaktorer (MFA), mens **SSO** lader brugeren logge ind én gang for at tilgå flere applikationer.
- **DLP (*Data Loss Prevention*):** Overvåger og forhindrer uautoriseret kopiering eller lækage af følsomme data i alle **dataenes tre tilstande (*Three States of Data*)**:
  1. **Data in use:** Data, der aktuelt behandles i RAM/CPU eller vises på en brugers skærm.
  2. **Data in motion / Data in transit:** Data, der bevæger sig over netværkskabler, trådløse links eller internettet.
  3. **Data at rest:** Data, der ligger lagret på en harddisk, SSD, SAN/NAS, USB-nøgle eller båndbackup.

---

## 4. In-Band vs. Out-of-Band (OOB) Management

- **In-Band Management:** Netværksenheder administreres og overvåges via **den samme netværksinfrastruktur og de samme kabler/links, som transporterer den almindelige brugertrafik** (f.eks. når en administrator forbinder med **SSH**, **HTTPS GUI** eller **SNMP** over produktionsnetværket/et management-VLAN).
  - *Ulempe:* Hvis produktionsnetværket går ned eller rammes af en fejlkonfiguration, mister administratoren muligvis også forbindelsen til udstyret.
- **Out-of-Band (OOB) Management:** Administrations- og overvågningstrafikken sendes over et **fuldstændig separat, dedikeret fysisk management-netværk eller via en direkte seriel Console-port / Terminal Server / cellulær backup-forbindelse**, så den **aldrig blandes med brugertrafikken**.
  - *Fordel:* Giver både højere sikkerhed og garanterer, at administratorer stadig kan tilgå, fejlfinde og genkonfigurere routere, switche og servere, selv hvis hele produktionsnetværket er nede.

---

## 5. Real-World Case Study & Nøgleemner

I kapitlets case-studie opretter *Acme, Inc.* en **IPsec Site-to-Site VPN** mellem hovedkontoret og en ny filial for at beskytte store mængder følsomme virksomhedsdata uden udgiften til en dedikeret leased line, og omlægger samtidig størstedelen af sin netværksadministration til **Out-of-Band Management** (med en kontrolleret undtagelse for krypteret **SSH** til udvalgte systemer).

![[Table 17-4 - Key Topics for Chapter 17.png]]
