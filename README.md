# Settle Loan Expert — Official Web Platform

Professional, fully responsive, secure web platform for **Settle Loan Expert**, an independent debt advisory and loan settlement consultancy in India.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma ORM**, **Zod**, and **PostgreSQL / SQLite**.

---

## 🎨 1. Brand Identity & Design System

The platform is designed around the official **Settle Loan Expert** brand tokens:

- **Deep Navy:** `#173447` (Primary brand color, headers, accents)
- **Emerald Green:** `#168963` (Primary CTA buttons, active indicators, trust badges)
- **Dark Navy:** `#102B3C` (High-contrast typography and top navigation bar)
- **Light Mint Background:** `#F0F8F5` (Accent card backgrounds and badge pills)
- **Light Grey Surface:** `#F7F9FA` (Clean body background)
- **Body Text:** `#465562` (Legible, accessible typography)
- **Border Color:** `#DFE7E9` (Subtle dividers and card outlines)

---

## 🌐 2. Complete Public Page Architecture

1. **Home (`/`)**: High-converting hero section with authentic Indian consultation photography, interactive service cards, 4-step methodology, trust commitments, educational settlement realities, FAQ accordion, and lead capture.
2. **About Us (`/about`)**: Company background, ethical philosophy, borrower rights advocacy under RBI Fair Practices Code, and team photography.
3. **Loan Settlement Assistance (`/services/loan-settlement`)**: Comprehensive One-Time Settlement (OTS) guide for unsecured debts.
4. **Credit Card Debt Settlement (`/services/credit-card-debt-settlement`)**: Overcoming 42%–48% APR compounding charges and negotiating closures.
5. **Personal Loan Settlement (`/services/personal-loan-settlement`)**: Guidance for salaried and self-employed personal loan defaults.
6. **Business Loan Assistance (`/services/business-loan-assistance`)**: MSME working capital restructuring and director guarantee analysis.
7. **Debt Counselling & Repayment Guidance (`/services/debt-counselling-repayment-guidance`)**: Household budgeting, prioritization, and debt avalanche/snowball planning.
8. **How It Works (`/how-it-works`)**: Full 4-step process walkthrough (Intake, Assessment, Options, Execution).
9. **Free Consultation (`/free-consultation`)**: Includes the **Zoho CRM Consultation Form** integration (from DebtsFree) embedded seamlessly with direct fallback options.
10. **Frequently Asked Questions (`/faqs`)**: Complete categorized FAQ bank with search and accordion interactions.
11. **Financial Guides & Blog (`/blog` and `/blog/[slug]`)**: Educational articles on Indian banking regulations, recovery rules, and credit score rehabilitation.
12. **Contact Us (`/contact`)**: Verified office address in Gurugram, helpline phone, direct email, and enquiry form.
13. **Privacy Policy (`/privacy-policy`)**: DPDP Act 2023 & IT Act compliant privacy terms.
14. **Terms and Conditions (`/terms-and-conditions`)**: Transparent terms with no false outcome claims.
15. **Legal & Regulatory Disclaimer (`/disclaimer`)**: Clear statutory disclosures.
16. **Grievance Redressal (`/grievance-redressal`)**: Designated Grievance Officer details and RBI Ombudsman escalation procedures.

---

## 🔒 3. Secure Admin Portal (`/admin`)

- **Secure Login (`/admin/login`)**: Rate-limited against brute-force attacks, protected by bcrypt hashing and HTTP-only JWT cookies.
- **First Admin Setup (`/admin/setup`)**: Initial master admin setup protected by master setup key (`SETUP_KEY`).
- **Dashboard Overview (`/admin`)**: Live metrics (Total Enquiries, New, In Progress, Converted), enquiry distribution by debt type, and recent leads.
- **Lead Management (`/admin/leads`)**: Search, status filters (`NEW`, `CONTACTED`, `FOLLOW_UP`, `IN_PROGRESS`, `CONVERTED`, `CLOSED`), pagination, lead detail slide-over drawer, internal case notes, and follow-up scheduling.
- **Blog CMS (`/admin/blogs`)**: Create, edit, draft, publish, and delete educational financial articles.
- **FAQ Manager (`/admin/faqs`)**: Add, edit, reorder, and remove FAQs.
- **Platform Settings (`/admin/settings`)**: Live configuration of telephone helpline, office address, operating hours, and Zoho form URL.
- **Security Audit Logs (`/admin/audit-logs`)**: Immutable event logging of administrative actions and lead updates.

### Default Administrator Credentials (Initial Seed):
- **Email:** `admin@settleloanexpert.in`
- **Password:** `AdminPassword@2026`
*(Please log in and rotate credentials or use `/admin/setup` to configure your own master account)*

---

## 🚀 4. Local Development & Testing

1. Clone or open the repository:
   ```bash
   cd "c:\Users\DELL\Desktop\loan settel"
   ```
2. Ensure dependencies are installed:
   ```bash
   npm install
   ```
3. Sync database & generate Prisma client:
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🖥 5. VPS Hosting & Production Deployment Guide

The platform is fully optimized for hosting on an **Ubuntu / Debian / AlmaLinux VPS** (Hostinger, DigitalOcean, AWS EC2, Linode, Hetzner, etc.).

### Option A: Deployment with Docker & Docker Compose (Recommended)

1. Connect to your VPS via SSH:
   ```bash
   ssh root@your-vps-ip
   ```
2. Install Docker and Docker Compose if not already present:
   ```bash
   apt update && apt install -y docker.io docker-compose
   ```
3. Copy the project files to `/var/www/settle-loan-expert` on your VPS.
4. Launch the application:
   ```bash
   docker-compose up -d --build
   ```
5. Both the Next.js application and the PostgreSQL database will start automatically and restart on reboot.

### Option B: Native Deployment with Node.js & PM2

1. Install Node.js 20+ and PM2:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs
   sudo npm install -g pm2
   ```
2. Build and start:
   ```bash
   npm install --production=false
   npx prisma generate
   npx prisma db push
   node prisma/seed.js
   npm run build
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

### Option C: Nginx Reverse Proxy & Free SSL with Let's Encrypt

1. Install Nginx and Certbot:
   ```bash
   sudo apt install -y nginx certbot python3-certbot-nginx
   ```
2. Copy `nginx.conf` to `/etc/nginx/sites-available/settleloanexpert.in`:
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/settleloanexpert.in
   sudo ln -s /etc/nginx/sites-available/settleloanexpert.in /etc/nginx/sites-enabled/
   ```
3. Issue an SSL certificate:
   ```bash
   sudo certbot --nginx -d settleloanexpert.in -d www.settleloanexpert.in
   ```
4. Test and reload Nginx:
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

---

## 🛡 6. Security Hardening Checklist

- [x] **Rate Limiting:** In-memory sliding window rate limits on `/api/leads` and `/api/auth/login`.
- [x] **Strict Input Validation:** Zod schemas validating Indian 10-digit mobile numbers, string bounds, and enum whitelists.
- [x] **Security Headers:** Strict Transport Security (HSTS), X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy configured in `next.config.mjs` and `nginx.conf`.
- [x] **Credential Protection:** Passwords securely hashed with bcrypt (salt rounds = 10). Session tokens signed via HS256 JWT in `HttpOnly`, `SameSite=Lax`, `Secure` cookies.
- [x] **Spam & Duplicate Prevention:** Automated 15-minute duplicate check preventing accidental or malicious double submissions with identical mobile numbers.
- [x] **No Confidential Data Leakage:** Bank account passwords, OTPs, and card PINs are explicitly rejected.
