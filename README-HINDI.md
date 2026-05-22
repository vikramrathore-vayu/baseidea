# DOCAI MVP - Run, Download, GitHub Upload aur Friends Testing Guide

Ye project React + Vite + Tailwind CSS app hai. Isme ye pages/routes ready hain:

- `/` Landing page + hero + features
- `/login` Login page
- `/signup` Signup page
- `/dashboard` Patient dashboard
- `/consultation` AI/Doctor consultation flow
- `/pricing` Pricing page
- `/admin` Admin dashboard UI
- WhatsApp lead capture system
- Language option: English, हिन्दी, Hinglish, मराठी

> Note: Ye MVP abhi backend ke bina hai. Data browser ke `localStorage` me save hota hai. Real app ke liye baad me Firebase/Supabase connect karna hoga.

---

## 1. Local computer par run kaise karein

### Step 1: Node.js install karein
Node.js LTS install karein: https://nodejs.org

### Step 2: Project folder open karein
Terminal / CMD me:

```bash
cd docai-app
npm install
npm run dev
```

Browser me app open hoga, usually:

```txt
http://localhost:5173
```

---

## 2. WhatsApp number kaise change karein

File open karein:

```txt
src/App.jsx
```

Ye line dhundhein:

```js
const WHATSAPP_NUMBER = "91XXXXXXXXXX";
```

Apna WhatsApp number international format me daalein, without `+`:

```js
const WHATSAPP_NUMBER = "919876543210";
```

---

## 3. Production build kaise banayein

```bash
npm run build
```

Build files `dist/` folder me aa jayengi. Ye files hosting par upload hoti hain.

---

## 4. GitHub par upload kaise karein

### Option A: GitHub website se

1. GitHub.com par account banayein/login karein.
2. New repository banayein: `docai-app`
3. Apne project ki files upload karein:
   - `src/`
   - `index.html`
   - `package.json`
   - `tailwind.config.js`
   - `postcss.config.js`
   - `README-HINDI.md`
4. Commit changes.

### Option B: Command line se

```bash
cd docai-app
git init
git add .
git commit -m "Initial DOCAI MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/docai-app.git
git push -u origin main
```

---

## 5. Friends ko testing link kaise bhejein

Best free option: **Vercel** ya **Netlify**.

### Vercel deploy

1. https://vercel.com par login karein.
2. “Add New Project” click karein.
3. GitHub repo select karein.
4. Framework: Vite auto-detect hoga.
5. Build command: `npm run build`
6. Output directory: `dist`
7. Deploy click karein.
8. Vercel aapko live URL dega. Wo link friends ko WhatsApp par send kar dein.

### Netlify deploy

1. https://netlify.com par login karein.
2. “Add new site” → “Import from Git”.
3. GitHub repo select karein.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy.

---

## 6. Google AI Studio / Google AI App Builder ke saath kaise use karein

Google AI Studio generally code generate/edit karne ke liye useful hai, hosting ke liye nahi. Is app ko run/deploy karne ke liye Vercel/Netlify/Firebase Hosting better hai.

Agar aap Google AI Studio me code improve karwana chahte ho:

1. `src/App.jsx` ka code copy karo.
2. Google AI Studio me prompt do: “Improve this React app / add Firebase backend / add voice input.”
3. Jo updated code mile, project me replace karo.
4. Local test: `npm run dev`
5. Deploy: Vercel/Netlify.

Agar Google ka hosting chahiye to **Firebase Hosting** use kar sakte ho:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

Firebase setup me:

- Public directory: `dist`
- Single-page app rewrite: `Yes`

---

## 7. App ko mobile par APK ki tarah kaise test karein

Ye abhi web app hai. Friends ko link bhej kar test karwa sakte ho.

Android me user Chrome menu se:

```txt
Add to Home Screen
```

kar sakta hai, jisse app icon jaisa experience milega.

Real APK ke liye future me Capacitor use karein:

```bash
npm install @capacitor/core @capacitor/cli
npx cap init DOCAI com.docai.app
npm run build
npx cap add android
npx cap open android
```

---

## 8. MVP testing checklist

Friends se ye test karwao:

- Language selector change ho raha hai ya nahi
- Signup/login flow
- Patient dashboard open ho raha hai ya nahi
- Consultation form fill karne ke baad record save ho raha hai ya nahi
- WhatsApp button correct number par open ho raha hai ya nahi
- Pricing plan WhatsApp par message bhej raha hai ya nahi
- Admin page par leads show ho rahi hain ya nahi

Admin page:

```txt
/admin
```

---

## 9. Next real-business steps

MVP ke baad ye add karna hoga:

1. Firebase/Supabase authentication
2. Real database
3. Doctor panel
4. Payment gateway: Razorpay
5. Voice input for rural users
6. AI backend with medical safety rules
7. Consent and privacy policy
8. Emergency warning system

---

## 10. Important health disclaimer

DOCAI emergency care ya doctor diagnosis ka replacement nahi hai. High-risk symptoms me patient ko nearest hospital/emergency care advise karna zaroori hai.
