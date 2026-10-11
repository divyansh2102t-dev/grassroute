*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 1: Touch Grass](https://dev.to/challenges/hacktoberfest-week1-2026-10-05)*

---

# 🌿 GrassRoute: The Zero-Signal Outdoor Companion & Trail Naturalist

## What I Built

Most outdoor mobile apps suffer from a tragic irony: they claim to help you connect with nature, yet they keep your eyes glued to a glowing 6-inch rectangle of glass. You end up staring at turn-by-turn navigation arrows, scrolling through social feed leaderboards, or squinting at push notifications while walking past blazing red sugar maples and listening to chickadees calling in the canopy.

**GrassRoute** flips this dynamic entirely. Its foundational design philosophy is simple: **spend 30 seconds on your screen, and the next 60 minutes in the woods.**

GrassRoute is an offline-first, open-source AI trail companion and naturalist built around three core pillars:

1. **Sensory Micro-Quest Generator:** Instead of generic GPS tracks, GrassRoute prompts you for your activity (*forest hike, fall foliage jog, backyard gardening, birding stroll, or mindful grounding*), your time budget (15 to 60+ minutes), and your companions (*solo, dog walk, kids exploration, or run club*). An on-device open-weight model synthesizes a 3-part sensory mission: one distinct foliage or bark observation, one acoustic or olfactory cue to listen/smell for, and one grounding challenge.
2. **Pocket Mode & Audio Pacer (Screen Minimizer):** The moment you tap **"Touch Grass"**, the app enters a dimmed, battery-saving Pocket Sleep Mode. Synthesized Web Audio nature chimes (and optional offline voice cues) sound at milestone intervals—halfway mark, 5 minutes remaining, and completion. You put your phone deep inside your backpack or pocket and **do not look at it while outdoors**. It calculates your **Grass-to-Screen Ratio** (e.g. *96% Green Time*), incentivizing minimum screen interaction.
3. **Zero-Signal Offline Field Naturalist & Frost Planner:**
   - **Autumn Foliage Pigment Radar:** Explains the science of fall colors (anthocyanins trapped by cooling nights vs carotenoids revealed by chlorophyll breakdown), bark textures, and critical safety lookalikes (harmless Staghorn Sumac with upright velvet berries vs hazardous Poison Sumac/Poison Ivy with drooping white berries).
   - **Trail Bird Call Identifier:** Teaches bird identification using phonetic mnemonics (*"fee-bee"*, *"chick-a-dee-dee"*, *"Who cooks for you?"*) without needing mega-byte audio downloads.
   - **October Frost Date & Planting Radar:** Calculates weeks until the first seasonal frost by climate zone and provides a concrete checklist for what to plant *this week*—from hardneck garlic cloves and cover crops to spring-flowering bulbs.
   - **Local AI Naturalist Q&A:** When you're 5 miles deep into a canyon or wooded ridgeline with zero cellular bars, you can consult an on-device open-weight LLM running in GPU memory with zero network requests.

GrassRoute is built for hikers, runners, gardeners, dog walkers, and anyone experiencing digital burnout who needs a nudge to step outside and breathe crisp autumn air.

---

## Demo

- **Live Web Application:** [https://divyansh2102t-dev.github.io/grassroute/](https://divyansh2102t-dev.github.io/grassroute/)
- **Render Live Service:** Ready for 1-click deployment via the included [render.yaml Blueprint](https://render.com).

Try this to experience the zero-signal magic:
1. Open the app in Chrome, Edge, or Android Chrome.
2. Click **Load Local AI** to load **Qwen 2.5 (1.5B)** into your browser's WebGPU cache.
3. **Turn on Airplane Mode** (disconnect Wi-Fi and mobile data).
4. Generate an outdoor quest, ask the field naturalist questions, search the foliage catalog, or start Pocket Mode. It runs with zero network packets!

---

## Code

The complete source code is open source under the MIT License:

👉 **GitHub Repository:** [https://github.com/divyansh2102t-dev/grassroute](https://github.com/divyansh2102t-dev/grassroute)

```
grassroute/
├── index.html        # Responsive UI, Pocket Mode overlay, multi-tab layout
├── app.js           # WebLLM engine, quest generation, audio synthesizer, timer
├── fieldguide.js    # Zero-signal botanical, bird call, and frost database
├── style.css        # Sunlight-readable outdoor theme with breathing animations
├── render.yaml      # Render Blueprint specification (Static Site & Node Service)
├── server.js        # Zero-dependency Node.js HTTP server for Render runtime
├── package.json     # Project scripts and metadata
├── CONTRIBUTING.md  # Hacktoberfest contributor guide
└── README.md        # Comprehensive documentation and local run instructions
```

---

## How I Built It

GrassRoute was intentionally engineered as an **offline-first hybrid architecture**:

### 1. In-Browser Local Inference via WebLLM & WebGPU
Rather than relying on remote cloud APIs that fail in the wild, GrassRoute uses [`@mlc-ai/web-llm`](https://github.com/mlc-ai/web-llm) to run open-weight models directly in client-side WebGPU memory:
- **Models Supported:** `Qwen2.5-0.5B-Instruct`, `Qwen2.5-1.5B-Instruct`, `Llama-3.2-1B-Instruct`, and `SmolLM-360M-Instruct`.
- **Zero Cloud Latency:** The model is compiled to WebAssembly (WASM) and runs shader execution on the user's native GPU. Once cached by the browser's CacheStorage API, inference works completely offline with zero server roundtrips.

### 2. Deterministic Fallback & Knowledge Base (`fieldguide.js`)
Real outdoor utility requires instant reliability. If a user is on an older mobile device without WebGPU support, or needs an instant answer in 0 milliseconds, the app includes a deterministic JavaScript knowledge engine:
- Instant multi-field keyword matcher indexing Latin binomials, leaf serration types, pigment chemistry, and safety warnings.
- USDA climate zone frost date estimator calculating exact days until the first hard frost.
- Curated sensory trail missions for hiking, running, gardening, birding, and mindfulness.

### 3. Screen-Free Web Audio & Speech Synthesis
To solve the "screen addiction" dilemma, GrassRoute implements a pure Web Audio API synthesizer. Without downloading external audio files, it mathematically generates pure sine-wave harmonic pentatonic chimes (*528 Hz, 660 Hz, 792 Hz*) to gently signal milestones while the phone is tucked in a jacket pocket. When enabled, the browser's native `SpeechSynthesis` speaks the mission prompts aloud before you step out the door.

---

## Why Does Open Innovation Matter?

Building for the outdoors brings the reality of proprietary cloud AI into sharp focus. Here is why open innovation and open-weight models were essential to make GrassRoute work:

1. **Canyons and Ridge Trails Have No 5G:**
   Closed APIs (OpenAI, Anthropic, Google Cloud) presuppose high-bandwidth, continuous connectivity. But nature doesn't have Wi-Fi. 5 miles into a national forest or valley trail, a closed AI app turns into an unresponsive error screen. Open-weight models (Qwen, Llama, SmolLM) running locally via WebGPU work in deep wilderness, airplane mode, and basement mudrooms.
2. **Absolute Privacy of Location and Health Habits:**
   Closed fitness and outdoor platforms collect GPS coordinates, trail timestamps, routines, and biometric patterns to build commercial advertising profiles. GrassRoute sends **zero bytes** to any cloud server. Your field journal, frost zone, and walking habits live exclusively in your local `localStorage`.
3. **Zero Marginal Operating Cost:**
   With open weights, running an outdoor assistant for thousands of hikers costs exactly \$0.00 in API inference bills. The computation happens on the device already in the hiker's pocket. Anyone in the open-source community can fork, self-host, and customize the tool without entering a credit card.
4. **Community Extensibility for Regional Nature:**
   Closed models often suffer from geographical bias. An open-source codebase allows contributors from across the globe to PR regional native plant guides, indigenous botanical names, and local bird mnemonics directly into `fieldguide.js` during Hacktoberfest.

---

## My Agent Session

This project was paired and designed using Google Antigravity and DevRelay:

{% agent_session 90de5857-0638-4e29-af78-d41ec9b97fb6 %}

---

## Prize Categories

### Best Use of Render
GrassRoute is built and configured for deployment on **Render**:
- Includes a complete **`render.yaml` Blueprint specification** defining both a global Static Site (with custom security headers for WebGPU SharedArrayBuffer support) and a Node.js Web Service runtime.
- Includes a containerized `server.js` ready to spin up on Render's global application runtime with 1-click blueprint synchronization.
