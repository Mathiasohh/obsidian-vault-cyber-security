<div align="center">

# 🛡️ Obsidian Vault: Cybersikkerhed (EAAA)

**The Second Brain of a Cybersecurity Student**  
*Where packets are inspected, threats are modeled, and Windows 260-character path limits go to die.*

![Confidentiality](https://img.shields.io/badge/Confidentiality-Public_Repo_(Oops)-orange?style=for-the-badge)
![Integrity](https://img.shields.io/badge/Integrity-LF_Enforced-success?style=for-the-badge)
![Availability](https://img.shields.io/badge/Availability-99.9%25_(Except_Exam_Week)-blue?style=for-the-badge)
![Layer 8](https://img.shields.io/badge/OSI_Layer_8-Caffeinated-critical?style=for-the-badge)

</div>

---

## 🧠 What Is This?

Welcome to my **Obsidian Vault** for the **Cybersecurity program at Erhvervsakademi Aarhus (EAAA)**.  
Because human RAM is volatile (and gets wiped right after a Friday lecture), everything gets written to non-volatile Markdown storage here.

If you are a fellow student, an instructor, a recruiter, or an automated bot scraping GitHub for accidentally committed API keys *(spoiler: there aren't any, nice try)*—welcome aboard.

---

## 🗂️ Vault Architecture (The 4 Pillars)

```text
Cybersikkerhed-eaaa/
├── 🌐 Netværksarkitektur/      # OSI layers, subnetting math, and CompTIA Network+ (N10-009)
├── 💻 Computerarkitektur/      # From silicon logic gates to operating systems & virtualization
├── 🐍 Programmering/           # Python scripts, algorithms, and debugging existential dread
├── 📊 Forretningsforståelse/   # CIA triad, risk management, GDPR, NIS2, NIST & ENISA
├── 🤖 AI Brain/                # Meta-notes, Git wizardry, and technical battle scars
└── 📎 Attachments/             # Diagrams that explain in 1 image what takes 4,000 words
```

### 1. 🌐 Netværksarkitektur (`NA`)
Everything that happens between clicking *"Send"* and the packet getting dropped by a misconfigured firewall:
- **The OSI Model (Layers 1–7):** Plus the unofficial **Layer 8** *(the user)* and **Layer 9** *(budget/politics)*.
- **CompTIA Network+ (N10-009):** Chapter-by-chapter study notes, PDFs, and extracted figures/tables.
- **Protocols & Routing:** TCP/IP, UDP *(I'd tell you a UDP joke, but you might not get it)*, VLANs, STP, OSPF, NAT, and DNS (*it's always DNS*).

### 2. 💻 Computerarkitektur (`CA`)
Understanding the machine before trying to defend it:
- CPU internals, memory hierarchies, number systems (binary/hex without crying), OS internals, and Linux/Windows administration.

### 3. 🐍 Programmering (`PR`)
Turning caffeine into working code:
- Python fundamentals, scripting for security automation, data structures, and learning why off-by-one errors are a lifestyle.

### 4. 📊 Forretningsforståelse (`FF`)
Because screaming *"SHUT DOWN ALL PORTS"* at the CEO is apparently "bad for business":
- **The CIA Triad:** Confidentiality, Integrity, Availability.
- **Frameworks & Governance:** NIST, ISO 27001, CIS Controls, ENISA, and Danish digital security standards (*Sikkerdigital / Digst*).
- Threat modeling, risk assessment, and translating `CVE-2026-XXXX` into *"Here is how much money we lose if we don't patch this."*

---

## 🛠️ How to Clone & Use This Vault

If you're cloning this repository on **Windows**, run this **first** before cloning—otherwise Windows will see our delightfully descriptive CompTIA PDF filenames and faint at character 260:

```powershell
# 1. Tell Git on Windows that it's no longer 1995 (enables paths > 260 chars)
git config --global core.longpaths true

# 2. Clone the vault
git clone https://github.com/Mathiasohh/obsidian-vault-cyber-security.git

# 3. Open the folder as a Vault in Obsidian
```

### Line Endings Peace Treaty (`.gitattributes`)
Obsidian speaks `LF`. Windows speaks `CRLF`. Left unsupervised, they fight in every commit diff.  
This repo uses [`.gitattributes`](.gitattributes) to enforce `LF` across all text and Markdown files while protecting binary assets (`.png`, `.jpg`, `.pdf`) from byte mangling.

---

## 🔒 Security Policy

- **Zero-Trust Note Taking:** Never trust a note written past 02:00 AM without verifying it against the textbook.
- **Backups:** Version-controlled via Git, synced to the cloud, and protected against accidental `rm -rf` incidents.

---

<div align="center">
<i>"There are 10 types of people in cybersecurity: those who understand binary, and those who reuse their passwords."</i>
</div>
