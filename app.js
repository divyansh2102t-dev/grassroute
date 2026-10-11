// app.js - GrassRoute Engine: Offline WebLLM, Pocket Mode, Audio Pacer & Field Guide
import * as webllm from "https://esm.run/@mlc-ai/web-llm";
import { 
  FOLIAGE_DATA, 
  BIRDCALL_DATA, 
  FROST_GARDEN_DATA, 
  TRAIL_MISSIONS, 
  searchFieldGuide, 
  estimateFrostStatus 
} from "./fieldguide.js";

const $ = (id) => document.getElementById(id);
const STORAGE_KEY = "grassroute.sessions.v1";

// ----------------- State -----------------
let engine = null;
let currentSession = null;
let timerInterval = null;
let sessionSecondsRemaining = 0;
let totalSessionSeconds = 0;
let screenActiveSeconds = 0;
let screenTimerInterval = null;
let savedSessions = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

// Track screen-on seconds to compute Grass-to-Screen Ratio
screenTimerInterval = setInterval(() => {
  if (document.visibilityState === "visible") {
    screenActiveSeconds++;
  }
}, 1000);

// ----------------- Web Audio Chime Generator -----------------
// Plays gentle pentatonic nature chimes without external audio assets (100% offline)
function playNatureChime(frequencies = [528, 660, 792]) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.18);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.18);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + idx * 0.18 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.18 + 1.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.18);
      osc.stop(ctx.currentTime + idx * 0.18 + 1.5);
    });
  } catch (err) {
    console.warn("Audio chime error:", err);
  }
}

// ----------------- Speech Synthesis (Screen-Free Voice Cues) -----------------
function speakPrompt(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
}

// ----------------- WebLLM Engine Setup -----------------
$("loadModelBtn")?.addEventListener("click", async () => {
  const modelSelect = $("modelSelect").value;
  const statusEl = $("modelStatus");
  const barEl = $("modelProgress");
  const loadBtn = $("loadModelBtn");

  if (!navigator.gpu) {
    statusEl.innerHTML = "⚠️ WebGPU is not supported in this browser. Try Chrome, Edge, or recent Android Chrome. <br><strong>Good news:</strong> The offline deterministic Field Guide, Frost Planner, Audio Pacer, and Curated Quests still work 100%!";
    return;
  }

  loadBtn.disabled = true;
  statusEl.textContent = "Initializing WebGPU pipeline...";

  try {
    engine = await webllm.CreateMLCEngine(modelSelect, {
      initProgressCallback: (p) => {
        const percent = Math.round((p.progress || 0) * 100);
        barEl.style.width = `${percent}%`;
        statusEl.textContent = `${p.text} (${percent}%)`;
      }
    });

    barEl.style.width = "100%";
    statusEl.innerHTML = `🌿 <strong>${modelSelect} loaded & ready!</strong> Inference is running locally on your device GPU. Turn on Airplane Mode—everything runs offline.`;
    loadBtn.textContent = "Model Ready (Offline)";
    $("modelBadge").textContent = "Local GPU Active";
    $("modelBadge").className = "badge badge-active";
  } catch (err) {
    console.error("WebLLM load error:", err);
    statusEl.textContent = `Error loading model: ${err.message}. Check browser WebGPU flags.`;
    loadBtn.disabled = false;
  }
});

// ----------------- Quest Generation -----------------
$("generateQuestBtn")?.addEventListener("click", async () => {
  const activity = $("questActivity").value;
  const duration = parseInt($("questDuration").value, 10) || 30;
  const companion = $("questCompanion").value;
  const customNotes = $("questNotes").value.trim();
  const outputBox = $("questOutput");
  const startBtn = $("startPocketBtn");

  outputBox.classList.remove("hidden");
  outputBox.innerHTML = "<div class='pulsing-spinner'></div> Crafting your sensory outdoor mission...";

  // 1. Try local WebLLM if loaded
  if (engine) {
    try {
      const prompt = `You are GrassRoute, an inspiring, grounded outdoor naturalist and trail companion.
The user wants to get OFF their screen and spend ${duration} minutes outdoors doing: ${activity} (${companion}).
Notes: ${customNotes || "none"}. Current season: Autumn / October.
Generate a concise, 3-part sensory mission:
1. SIGHT / FOLIAGE: 1 specific tree, leaf color transition, or wildlife detail to spot.
2. SOUND or SMELL: 1 distinct acoustic or olfactory clue (bird call, rustle, or soil/leaf scent).
3. MINDFUL GROUNDING: 1 tactile or quiet check to do with phone in pocket.
Be vivid, brief, and encourage putting the phone away immediately. Finish with exactly:
"POCKET READY: Put your phone in your pocket, listen for the chime, and touch grass."`;

      outputBox.innerHTML = "";
      const stream = await engine.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        stream: true,
        temperature: 0.7,
        max_tokens: 300
      });

      let fullText = "";
      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content || "";
        fullText += delta;
        outputBox.innerHTML = fullText.replace(/\n/g, "<br>");
      }

      currentSession = {
        title: `${activity.toUpperCase()} (${duration}m)`,
        activity,
        durationMinutes: duration,
        companion,
        missionText: fullText,
        startedAt: new Date().toISOString()
      };
      startBtn.classList.remove("hidden");
      return;
    } catch (err) {
      console.warn("LLM stream failed, falling back to curated quest:", err);
    }
  }

  // 2. Deterministic Fallback Quest from Curated Knowledge Base
  const missionPool = TRAIL_MISSIONS[activity] || TRAIL_MISSIONS.hike;
  const selected = missionPool[Math.floor(Math.random() * missionPool.length)];
  const autumnBonus = FOLIAGE_DATA[Math.floor(Math.random() * FOLIAGE_DATA.length)];

  const curatedText = `
    <strong>MISSION: ${selected.title}</strong><br>
    <em>${selected.sense}</em>: ${selected.task}<br>
    <div class='tip-box'><strong>Naturalist Clue:</strong> ${selected.clue}</div>
    <div class='tip-box'><strong>Autumn Focus:</strong> Keep an eye out for <em>${autumnBonus.name}</em> (${autumnBonus.colors.join(", ")}). ${autumnBonus.trailClue}</div>
    <br>
    <strong>POCKET READY:</strong> Put your phone away, look up, and touch grass!
  `;

  outputBox.innerHTML = curatedText;
  currentSession = {
    title: `${activity.toUpperCase()} (${duration}m)`,
    activity,
    durationMinutes: duration,
    companion,
    missionText: curatedText,
    startedAt: new Date().toISOString()
  };
  startBtn.classList.remove("hidden");
});

// ----------------- Pocket Mode & Audio Pacer -----------------
$("startPocketBtn")?.addEventListener("click", () => {
  if (!currentSession) return;

  const durationMin = currentSession.durationMinutes || 30;
  totalSessionSeconds = durationMin * 60;
  sessionSecondsRemaining = totalSessionSeconds;

  // Speak initial prompt if enabled
  if ($("voiceCuesToggle")?.checked) {
    speakPrompt(`Mission started. ${durationMin} minutes outdoors. Put your phone in your pocket and touch grass.`);
  }

  // Play opening chime
  playNatureChime([440, 554, 659]);

  // Switch to Pocket Mode screen
  $("mainContainer").classList.add("hidden");
  $("pocketModeScreen").classList.remove("hidden");
  $("pocketMissionSummary").innerHTML = currentSession.missionText;

  updatePocketDisplay();

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    sessionSecondsRemaining--;
    updatePocketDisplay();

    // Halfway chime
    if (sessionSecondsRemaining === Math.floor(totalSessionSeconds / 2)) {
      playNatureChime([528, 660, 792]);
      if ($("voiceCuesToggle")?.checked) {
        speakPrompt("Halfway point. Take a deep breath and observe the canopy.");
      }
    }

    // 5 minutes remaining
    if (sessionSecondsRemaining === 300) {
      playNatureChime([660, 880]);
      if ($("voiceCuesToggle")?.checked) {
        speakPrompt("Five minutes remaining. Begin your return stroll.");
      }
    }

    // Finished
    if (sessionSecondsRemaining <= 0) {
      clearInterval(timerInterval);
      playNatureChime([528, 660, 792, 1056]);
      if ($("voiceCuesToggle")?.checked) {
        speakPrompt("Mission complete. Welcome back. Log your trail findings.");
      }
      alert("🌿 Quest Complete! You touched grass! Time to log your field observations.");
      exitPocketMode();
    }
  }, 1000);
});

function updatePocketDisplay() {
  const m = Math.floor(sessionSecondsRemaining / 60);
  const s = sessionSecondsRemaining % 60;
  const timeStr = `${m}:${s < 10 ? "0" : ""}${s}`;
  $("pocketTimeRemaining").textContent = timeStr;

  // Calculate Grass Ratio
  const outdoorSeconds = totalSessionSeconds - sessionSecondsRemaining;
  const ratio = outdoorSeconds > 0 
    ? Math.min(100, Math.round(((outdoorSeconds - (screenActiveSeconds % 60)) / outdoorSeconds) * 100))
    : 100;
  $("pocketGrassRatio").textContent = `${Math.max(85, ratio)}% Green Time`;
}

$("exitPocketBtn")?.addEventListener("click", () => {
  if (confirm("End your outdoor session early and return to journal?")) {
    clearInterval(timerInterval);
    exitPocketMode();
  }
});

function exitPocketMode() {
  $("pocketModeScreen").classList.add("hidden");
  $("mainContainer").classList.remove("hidden");

  // Save session to local journal
  if (currentSession) {
    currentSession.completedAt = new Date().toISOString();
    currentSession.actualMinutes = Math.round((totalSessionSeconds - sessionSecondsRemaining) / 60);
    savedSessions.unshift(currentSession);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSessions));
    renderJournal();
    showTab("journalTab");
  }
}

// ----------------- Deterministic Field Guide & Search -----------------
function renderFieldGuideCatalog() {
  const foliageList = $("foliageList");
  const birdList = $("birdList");
  const gardenList = $("gardenList");

  if (foliageList) {
    foliageList.innerHTML = FOLIAGE_DATA.map(item => `
      <div class="card tree-card">
        <div class="card-header">
          <strong>${item.name}</strong>
          <span class="badge ${item.safety.includes('DANGER') ? 'badge-danger' : 'badge-safe'}">${item.safety}</span>
        </div>
        <div class="card-sub">${item.scientific}</div>
        <p><strong>Colors:</strong> ${item.colors.join(", ")}</p>
        <p><strong>Pigment Science:</strong> ${item.pigment}</p>
        <p><strong>Leaf Form:</strong> ${item.leaves}</p>
        <p><strong>Bark:</strong> ${item.bark}</p>
        <div class="clue-tag">🧭 <strong>Trail Clue:</strong> ${item.trailClue}</div>
      </div>
    `).join("");
  }

  if (birdList) {
    birdList.innerHTML = BIRDCALL_DATA.map(item => `
      <div class="card bird-card">
        <div class="card-header">
          <strong>${item.name}</strong>
          <span class="badge badge-bird">Songbird</span>
        </div>
        <div class="card-sub">${item.scientific}</div>
        <div class="mnemonic-box">🎵 Call Mnemonic: <em>"${item.mnemonic}"</em></div>
        <p>${item.description}</p>
        <div class="clue-tag">🌲 <strong>Habitat Context:</strong> ${item.trailContext}</div>
      </div>
    `).join("");
  }

  if (gardenList) {
    gardenList.innerHTML = FROST_GARDEN_DATA.map(item => `
      <div class="card garden-card">
        <div class="card-header">
          <strong>${item.crop}</strong>
          <span class="badge badge-garden">${item.category}</span>
        </div>
        <p><strong>Optimal October Timing:</strong> ${item.timing}</p>
        <p><strong>Action Checklist:</strong> ${item.action}</p>
        <p><strong>Frost Resilience:</strong> ${item.frostTolerance}</p>
      </div>
    `).join("");
  }
}

$("fieldSearchInput")?.addEventListener("input", (e) => {
  const query = e.target.value.trim();
  const resultsBox = $("searchResultsBox");
  if (!query) {
    resultsBox.classList.add("hidden");
    return;
  }

  const matches = searchFieldGuide(query);
  resultsBox.classList.remove("hidden");

  if (!matches || matches.total === 0) {
    resultsBox.innerHTML = `<div class="search-empty">No exact keyword hits for "${query}". Try "maple", "chickadee", "garlic", "poison", "yellow", or ask the offline AI naturalist below!</div>`;
    return;
  }

  let html = `<div class="search-summary">Found ${matches.total} zero-signal field entries for "${query}":</div>`;
  
  if (matches.foliage.length) {
    html += `<h4>🍂 Trees & Foliage (${matches.foliage.length})</h4>`;
    html += matches.foliage.map(f => `
      <div class="quick-hit">
        <strong>${f.name}</strong> (${f.scientific}): ${f.colors.join(", ")}. <em>${f.trailClue}</em>
      </div>
    `).join("");
  }

  if (matches.birds.length) {
    html += `<h4>🦜 Birds & Calls (${matches.birds.length})</h4>`;
    html += matches.birds.map(b => `
      <div class="quick-hit">
        <strong>${b.name}</strong>: 🎵 <em>"${b.mnemonic}"</em> — ${b.trailContext}
      </div>
    `).join("");
  }

  if (matches.garden.length) {
    html += `<h4>🌱 Frost Garden (${matches.garden.length})</h4>`;
    html += matches.garden.map(g => `
      <div class="quick-hit">
        <strong>${g.crop}</strong>: ${g.action}
      </div>
    `).join("");
  }

  resultsBox.innerHTML = html;
});

// ----------------- Naturalist Q&A (Local Offline AI) -----------------
$("askNaturalistBtn")?.addEventListener("click", async () => {
  const question = $("naturalistQuestion").value.trim();
  const replyBox = $("naturalistReply");
  if (!question) return;

  replyBox.classList.remove("hidden");
  replyBox.innerHTML = "<div class='pulsing-spinner'></div> Consulting on-device naturalist...";

  // 1. If WebLLM is loaded, do full GPU reasoning offline
  if (engine) {
    try {
      const prompt = `You are GrassRoute Naturalist, a friendly, scientifically accurate outdoor guide and botanist.
User question: "${question}".
Answer directly, concisely, and practically for someone walking in an autumn trail or working in their garden.
If safety or wild plant toxicity is involved, give cautious guidance. Keep answer under 160 words.`;

      replyBox.innerHTML = "";
      const stream = await engine.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        stream: true,
        temperature: 0.6,
        max_tokens: 250
      });

      let fullText = "";
      for await (const chunk of stream) {
        fullText += chunk.choices[0]?.delta?.content || "";
        replyBox.innerHTML = fullText.replace(/\n/g, "<br>");
      }
      return;
    } catch (err) {
      console.warn("LLM naturalist error:", err);
    }
  }

  // 2. Deterministic Knowledge Answer Fallback
  const searchResults = searchFieldGuide(question);
  if (searchResults && searchResults.total > 0) {
    let out = `<strong>Field Guide Insights:</strong><br>`;
    if (searchResults.foliage[0]) {
      const f = searchResults.foliage[0];
      out += `• <strong>${f.name}</strong> (${f.scientific}): Features ${f.colors.join(", ")}. Pigment science: ${f.pigment}. Clue: ${f.trailClue}<br>`;
    }
    if (searchResults.birds[0]) {
      const b = searchResults.birds[0];
      out += `• <strong>${b.name}</strong>: Mnemonic call "${b.mnemonic}". ${b.trailContext}<br>`;
    }
    if (searchResults.garden[0]) {
      const g = searchResults.garden[0];
      out += `• <strong>${g.crop}</strong>: ${g.action}<br>`;
    }
    out += `<br><em>Tip: Load the WebGPU model above to ask free-form conversational questions offline!</em>`;
    replyBox.innerHTML = out;
  } else {
    replyBox.innerHTML = `
      <strong>Offline Field Guide:</strong> No direct keyword match found for "${question}".<br>
      Try common terms like <em>maple, oak, chickadee, hawk, garlic, frost, sumac, poison ivy</em> or click <strong>Load Local AI Engine</strong> above to ask anything with full open-weight LLM reasoning!
    `;
  }
});

// Quick question chip buttons
document.querySelectorAll(".quick-q-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    $("naturalistQuestion").value = chip.textContent;
    $("askNaturalistBtn").click();
  });
});

// ----------------- Frost Calculator -----------------
$("calcFrostBtn")?.addEventListener("click", () => {
  const zone = $("frostZoneSelect").value;
  const result = estimateFrostStatus(zone);
  const outBox = $("frostResultBox");
  outBox.classList.remove("hidden");

  outBox.innerHTML = `
    <div class="card frost-card">
      <div class="card-header">
        <strong>USDA Climate Zone ${result.zone}</strong>
        <span class="badge badge-active">Target: ${result.expectedDateName}</span>
      </div>
      <p class="frost-advice">${result.advice}</p>
      <div class="checklist">
        <strong>✅ This Week's Checklist:</strong>
        <ul>
          <li>Plant hardneck & softneck garlic cloves 2-3 inches deep with thick leaf mulch.</li>
          <li>Broadcast winter rye or crimson clover cover crop on harvested beds.</li>
          <li>Plant spring flowering bulbs (tulips, daffodils, alliums) before ground freezes.</li>
          <li>Harvest remaining cold-tender crops (peppers, squash) ahead of overnight lows &lt;32°F (0°C).</li>
        </ul>
      </div>
    </div>
  `;
});

// ----------------- Journal / History -----------------
function renderJournal() {
  const box = $("journalEntries");
  if (!box) return;

  if (savedSessions.length === 0) {
    box.innerHTML = "<div class='empty-state'>No outdoor sessions recorded yet. Start a quest above to touch grass!</div>";
    return;
  }

  const totalMin = savedSessions.reduce((acc, s) => acc + (s.actualMinutes || s.durationMinutes || 0), 0);
  $("totalGrassMinutes").textContent = `${totalMin} mins`;
  $("totalSessionCount").textContent = `${savedSessions.length} sessions`;

  box.innerHTML = savedSessions.map((s, idx) => `
    <div class="journal-entry">
      <div class="entry-header">
        <strong>${s.title}</strong>
        <span class="entry-date">${new Date(s.startedAt).toLocaleDateString()}</span>
      </div>
      <p class="entry-meta">Activity: ${s.activity} | Companions: ${s.companion} | Duration: ${s.actualMinutes || s.durationMinutes} mins</p>
      <div class="entry-notes">${s.missionText}</div>
    </div>
  `).join("");
}

$("exportJournalBtn")?.addEventListener("click", () => {
  if (savedSessions.length === 0) {
    alert("No sessions to export yet.");
    return;
  }
  let md = "# 🌿 GrassRoute - Outdoor Field Journal\n\n";
  savedSessions.forEach(s => {
    md += `### ${s.title} - ${new Date(s.startedAt).toLocaleDateString()}\n`;
    md += `- **Activity**: ${s.activity}\n`;
    md += `- **Companion**: ${s.companion}\n`;
    md += `- **Duration**: ${s.actualMinutes || s.durationMinutes} minutes\n`;
    md += `- **Mission**:\n${s.missionText.replace(/<[^>]+>/g, '')}\n\n---\n\n`;
  });

  const blob = new Blob([md], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `grassroute-journal-${new Date().toISOString().split("T")[0]}.md`;
  a.click();
});

$("clearJournalBtn")?.addEventListener("click", () => {
  if (confirm("Clear your local outdoor journal history?")) {
    savedSessions = [];
    localStorage.removeItem(STORAGE_KEY);
    renderJournal();
  }
});

// ----------------- Tab Navigation -----------------
function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));
  document.querySelectorAll(".nav-tab").forEach(el => el.classList.remove("active"));

  const target = $(tabId);
  const btn = $(`${tabId}Btn`);
  if (target) target.classList.remove("hidden");
  if (btn) btn.classList.add("active");
}

document.querySelectorAll(".nav-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    const targetId = tab.id.replace("Btn", "");
    showTab(targetId);
  });
});

// ----------------- Initial Boot -----------------
renderFieldGuideCatalog();
renderJournal();
// Default to zone 6 frost calc on load
$("calcFrostBtn")?.click();
