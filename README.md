# SIGNAL — AI Content Studio
### Deploy in 4 steps. Live in 30 minutes.

---

## STEP 1 — Get your free Anthropic API key (2 min)
1. Go to https://console.anthropic.com
2. Sign up (free — comes with $5 credit, ~500 generations)
3. Go to **API Keys** → **Create Key**
4. Copy the key — you'll need it in Step 4

---

## STEP 2 — Put this project on GitHub (5 min)
1. Go to https://github.com and create a free account
2. Click **New Repository** → name it `signal-studio` → **Create**
3. On your computer, open a terminal in this folder and run:

```bash
npm install
git init
git add .
git commit -m "🚀 Initial deploy"
git remote add origin https://github.com/YOUR_USERNAME/signal-studio.git
git push -u origin main
```

---

## STEP 3 — Deploy on Vercel (3 min)
1. Go to https://vercel.com → sign up free with your GitHub account
2. Click **Add New Project**
3. Find and select `signal-studio` → click **Import**
4. Leave all settings as default → click **Deploy**
5. Wait ~60 seconds — Vercel builds and deploys automatically

---

## STEP 4 — Add your API key (1 min)
1. In your Vercel project, go to **Settings → Environment Variables**
2. Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** (paste your key from Step 1)
3. Click **Save**
4. Go to **Deployments** → click the 3 dots → **Redeploy**

✅ **You're live.** Your URL is: `https://signal-studio.vercel.app`

---

## Local Development
```bash
npm install
# Add your API key to a .env.local file:
echo "ANTHROPIC_API_KEY=your_key_here" > .env.local
npm run dev
# Visit http://localhost:5173
```

---

## Cost Estimate
| Usage | Monthly API Cost |
|-------|-----------------|
| 50 generations/day | ~$3–5 |
| 200 generations/day | ~$15–20 |
| 500 generations/day | ~$40–60 |

Vercel hosting: **$0/month** (free tier covers this easily)

Set a spend limit at https://console.anthropic.com to control costs.

---

## Custom Domain (optional, free)
1. Go to Vercel → your project → **Settings → Domains**
2. Add your domain (e.g. `signalstudio.io`)
3. Follow the DNS instructions — takes ~5 min to propagate

Free domain option: https://is-a.dev (for `yourname.is-a.dev`)
Cheap domain: https://namecheap.com (~$10/year)
