# 🌿 GrassRoute

**The Zero-Signal Outdoor Quest & Trail Naturalist powered by Open-Weight AI.**

GrassRoute is built with a singular premise: **AI should get you off the screen and into the woods.** Most outdoor apps keep your eyes glued to 6-inch glass following turn-by-turn breadcrumbs. GrassRoute flips this: spend **30 seconds on screen** to generate a sensory micro-mission, tap **Touch Grass**, and let your phone sleep in your pocket while gentle acoustic chimes pace your outdoor immersion.

Built for the **[Hacktoberfest Open-Source AI Challenge Week 1: Touch Grass](https://dev.to/challenges/hacktoberfest-week1-2026-10-05)**.

👉 **Live Demo:** https://divyansh2102t-dev.github.io/grassroute/ (also deployable with 1-click on [Render](render.yaml))

---

## 🍂 Why It's Different

- **100% Open-Weight AI, Running Locally:** Powered by [WebLLM](https://github.com/mlc-ai/web-llm) (MLC). Runs models like **Qwen 2.5 (0.5B/1.5B)**, **Llama 3.2 (1B)**, and **SmolLM (360M)** directly inside your browser using WebGPU. No API keys, no cloud server, zero token fees.
- **Zero-Signal Offline Field Operation:** Works 5 miles deep into mountain ridges, state parks, and tree canopies where cellular reception drops to zero. Once cached, turn on **Airplane Mode** and the entire engine continues running seamlessly.
- **Screen Minimizer ("Pocket Mode"):** The best outdoor tech makes the screen the shortest part of the experience. Once your quest starts, GrassRoute dims into a battery-saving dark interface and uses Web Audio harmonic chimes (and optional voice cues) at halfway and finish milestones. You literally do not look at your phone while walking or running.
- **Deterministic Field Guide + Frost Planner:** Includes a zero-latency knowledge base of autumn foliage pigments (anthocyanins vs carotenoids), bird calls with phonetic mnemonics ("fee-bee", "chick-a-dee-dee"), poisonous lookalikes (Staghorn Sumac vs Poison Sumac, Poison Ivy), and an October frost date garden planner.
- **Grass-to-Screen Ratio:** Tracks your active screen time vs outdoor immersion, scoring your session (e.g. 96% Green Time) and storing your field journal strictly in `localStorage`. Zero telemetry, zero tracking.

---

## 🚀 Run Locally

GrassRoute is completely static and client-side — any local web server works:

### Option 1: Python
```bash
cd grassroute
python -m http.server 8000
# open http://localhost:8000 in Chrome / Edge / Android Chrome
```

### Option 2: Node.js
```bash
cd grassroute
npm start
# open http://localhost:3000
```

---

## ☁️ Deploy on Render

GrassRoute comes pre-configured with a Render Blueprint (`render.yaml`):

1. Fork or push this repository to GitHub.
2. In the [Render Dashboard](https://dashboard.render.com), click **New +** -> **Blueprint**.
3. Select this repository. Render will automatically detect `render.yaml` and spin up your choice of a free global Static Site or Node Web Service.

---

## 📂 Project Structure

| File | What it does |
|---|---|
| `index.html` | Semantic responsive UI, Pocket Mode overlay, multi-tab layout |
| `app.js` | WebLLM MLC engine, quest generator, Web Audio chimes, timer, journal |
| `fieldguide.js` | Deterministic foliage, bird call, frost planting database & instant search |
| `style.css` | Sunlight-readable outdoor theme, high-contrast cards, breathing animations |
| `render.yaml` | 1-click Render Blueprint specification (Static Site + Node Web Service) |
| `server.js` | Lightweight zero-dependency Node HTTP server |
| `package.json` | Project scripts and metadata |

---

## 🎃 Contributing to Hacktoberfest

This repository is tagged `hacktoberfest`! Community contributions are welcome:
- Add regional native tree species and autumn foliage guides for your state/country.
- Add local bird species and phonetic call mnemonics.
- Translate trail quest sensory prompts into other languages.
- Add regional frost date tables for the Southern Hemisphere.

See [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

---

## 📄 License

MIT © 2026 divyansh2102t-dev
