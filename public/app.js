/* ═══════════════════════════════════════════════════════ */
/*  CHUNAV SAHAYAK — APP LOGIC                            */
/*  Indian Election Awareness Assistant                   */
/* ═══════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── CONFIG ── */
  // Gemini API is now handled securely on the backend

  /* ── STATE ── */
  let currentQuestionIdx = 0;
  let quizScore = 0;
  let quizAnswered = [];
  let chatHistory = [];

  /* ── DOM REFS ── */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const splashScreen = $("#splash-screen");
  const appShell = $("#app-shell");

  const chatMessages = $("#chat-messages");
  const chatForm = $("#chat-form");
  const chatInput = $("#chat-input");
  const chatSuggestions = $("#chat-suggestions");

  const timelineContainer = $("#timeline-container");

  const voteStepsGrid = $("#vote-steps-grid");

  const quizContainer = $("#quiz-container");
  const quizStartCard = $("#quiz-start-card");
  const quizStartBtn = $("#quiz-start-btn");
  const quizPlayArea = $("#quiz-play-area");
  const quizCard = $("#quiz-card");
  const quizProgressFill = $("#quiz-progress-fill");
  const quizScoreDisplay = $("#quiz-score-display");
  const quizResultArea = $("#quiz-result-area");
  const quizTotalCount = $("#quiz-total-count");

  const factsGrid = $("#facts-grid");
  const factsExtra = $("#facts-extra");

  const topbarMenuBtn = $("#topbar-menu-btn");
  const navDrawer = $("#nav-drawer");
  const navDrawerBackdrop = $("#nav-drawer-backdrop");
  const navDrawerClose = $("#nav-drawer-close");

  /* ═══════════════════════════════════════════════ */
  /*  APP INITIALIZATION                            */
  /* ═══════════════════════════════════════════════ */
  document.addEventListener('userAuthenticated', () => {
    initApp();
  });

  function initApp() {
    addBotMessage("🙏 **नमस्ते! Welcome to Chunav Sahayak!**\n\nI'm your AI-powered Indian Election Awareness Assistant. I can help you understand:\n\n• 🗳️ How EVMs and VVPAT work\n• 📋 Voter registration process\n• 🚫 What NOTA means\n• ⚖️ Model Code of Conduct\n• 🏛️ Lok Sabha & Rajya Sabha\n• 📄 Documents needed to vote\n\nAsk me anything, or tap a quick question below!");
    buildTimeline();
    buildHowToVote();
    buildKeyFacts();
    quizTotalCount.textContent = QUIZ_QUESTIONS.length;
  }

  /* ═══════════════════════════════════════════════ */
  /*  NAVIGATION                                    */
  /* ═══════════════════════════════════════════════ */
  function switchPanel(panelId) {
    $$(".panel").forEach((p) => p.classList.remove("active"));
    $(`#panel-${panelId}`).classList.add("active");
    $$(".nav-item").forEach((n) => {
      n.classList.toggle("active", n.dataset.panel === panelId);
    });
  }

  $$(".nav-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      switchPanel(btn.dataset.panel);
      closeDrawer();
    });
  });

  topbarMenuBtn.addEventListener("click", openDrawer);
  navDrawerClose.addEventListener("click", closeDrawer);
  navDrawerBackdrop.addEventListener("click", closeDrawer);

  function openDrawer() {
    navDrawer.classList.remove("hidden");
    navDrawerBackdrop.classList.remove("hidden");
    requestAnimationFrame(() => navDrawer.classList.add("open"));
  }
  function closeDrawer() {
    navDrawer.classList.remove("open");
    setTimeout(() => {
      navDrawer.classList.add("hidden");
      navDrawerBackdrop.classList.add("hidden");
    }, 300);
  }

  /* ═══════════════════════════════════════════════ */
  /*  CHAT — ASK ANYTHING (Gemini AI)               */
  /* ═══════════════════════════════════════════════ */
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    sendUserMessage(text);
    chatInput.value = "";
  });

  $$(".suggestion-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      sendUserMessage(chip.dataset.q);
    });
  });

  async function sendUserMessage(text) {
    addUserMessage(text);
    chatSuggestions.classList.add("hidden");
    showTyping();

    // Check partisan guardrail first
    const q = text.toLowerCase();
    if (PARTISAN_KEYWORDS.some((kw) => q.includes(kw))) {
      removeTyping();
      addBotMessage(PARTISAN_RESPONSE);
      return;
    }

    // Try Gemini AI first
    try {
      const aiReply = await callGeminiAPI(text);
      removeTyping();
      addBotMessage(aiReply, "Powered by Gemini AI");
    } catch (err) {
      console.warn("Gemini API error, falling back to local knowledge:", err);
      removeTyping();
      const reply = generateLocalReply(text);
      addBotMessage(reply.answer, reply.source || "Offline Knowledge Base");
    }
  }

  async function callGeminiAPI(userQuery) {
    // Build conversation history for context
    const contents = [];
    
    // Add recent chat history for context (last 4 exchanges)
    const recentHistory = chatHistory.slice(-8);
    for (const msg of recentHistory) {
      contents.push({
        role: msg.role,
        parts: [{ text: msg.text }]
      });
    }

    const token = localStorage.getItem('token');
    const response = await fetch('/api/ask', {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        query: userQuery,
        history: contents
      })
    });

    if (!response.ok) {
      if(response.status === 401 || response.status === 403) {
        alert("Session expired. Please login again.");
        localStorage.removeItem('token');
        window.location.reload();
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const aiText = data.answer;

    if (!aiText) throw new Error("Empty API response");

    // Store in chat history
    chatHistory.push({ role: "user", text: userQuery });
    chatHistory.push({ role: "model", text: aiText });

    return aiText;
  }

  function generateLocalReply(query) {
    const q = query.toLowerCase();
    for (const [, entry] of Object.entries(QA_KNOWLEDGE)) {
      if (entry.keywords && entry.keywords.some((kw) => q.includes(kw))) {
        return { answer: entry.answer, source: entry.source };
      }
    }
    return { answer: QA_KNOWLEDGE.default.answer, source: "" };
  }

  function addUserMessage(text) {
    const div = document.createElement("div");
    div.className = "msg msg-user";
    div.textContent = text;
    chatMessages.appendChild(div);
    scrollChat();
  }

  function addBotMessage(md, source) {
    const div = document.createElement("div");
    div.className = "msg msg-bot";
    div.innerHTML = simpleMarkdown(md);
    if (source) {
      const src = document.createElement("span");
      src.className = "msg-source";
      src.textContent = source;
      div.appendChild(src);
    }
    chatMessages.appendChild(div);
    scrollChat();
  }

  function showTyping() {
    const div = document.createElement("div");
    div.className = "msg-typing";
    div.id = "typing-indicator";
    div.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    chatMessages.appendChild(div);
    scrollChat();
  }

  function removeTyping() {
    const el = $("#typing-indicator");
    if (el) el.remove();
  }

  function scrollChat() {
    requestAnimationFrame(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }

  /* Simple markdown → HTML */
  function simpleMarkdown(text) {
    let html = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/^### (.+)$/gm, "<h4>$1</h4>")
      .replace(/^## (.+)$/gm, "<h3>$1</h3>")
      .replace(/^# (.+)$/gm, "<h2>$1</h2>");

    const lines = html.split("\n");
    let inList = false;
    let result = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (/^[•\-\*]\s/.test(trimmed)) {
        if (!inList) { result.push("<ul>"); inList = true; }
        result.push(`<li>${trimmed.replace(/^[•\-\*]\s*/, "")}</li>`);
      } else if (/^\d+\.\s/.test(trimmed)) {
        if (!inList) { result.push("<ol>"); inList = true; }
        result.push(`<li>${trimmed.replace(/^\d+\.\s*/, "")}</li>`);
      } else {
        if (inList) { result.push(inList === true ? "</ul>" : "</ol>"); inList = false; }
        if (trimmed === "") {
          result.push("<br/>");
        } else if (!trimmed.startsWith("<h")) {
          result.push(`<p>${trimmed}</p>`);
        } else {
          result.push(trimmed);
        }
      }
    }
    if (inList) result.push("</ul>");
    return result.join("");
  }

  /* ═══════════════════════════════════════════════ */
  /*  ELECTION TIMELINE (8 Phases)                  */
  /* ═══════════════════════════════════════════════ */
  function buildTimeline() {
    timelineContainer.innerHTML = "";
    TIMELINE_PHASES.forEach((phase, i) => {
      const item = document.createElement("div");
      item.className = "timeline-item";
      item.innerHTML = `
        <div class="timeline-marker">
          <div class="timeline-dot ${i === 0 ? 'active' : ''}">${phase.icon}</div>
          ${i < TIMELINE_PHASES.length - 1 ? '<div class="timeline-line"></div>' : ''}
        </div>
        <div class="timeline-card glass-card" data-idx="${i}">
          <div class="timeline-card-header">
            <span class="phase-badge">${phase.phase}</span>
            <h3>${phase.title}</h3>
            <p class="timeline-subtitle">${phase.subtitle}</p>
            <span class="expand-icon">▼</span>
          </div>
          <div class="timeline-card-body collapsed">
            <p>${phase.body}</p>
            <ul>${phase.details.map(d => `<li>${d}</li>`).join("")}</ul>
          </div>
        </div>
      `;
      timelineContainer.appendChild(item);

      // Toggle expand/collapse
      const card = item.querySelector(".timeline-card");
      const header = item.querySelector(".timeline-card-header");
      const body = item.querySelector(".timeline-card-body");
      const expandIcon = item.querySelector(".expand-icon");

      header.addEventListener("click", () => {
        const isOpen = !body.classList.contains("collapsed");
        // Close all others
        $$(".timeline-card-body").forEach(b => b.classList.add("collapsed"));
        $$(".timeline-card").forEach(c => c.classList.remove("expanded"));
        $$(".expand-icon").forEach(e => e.textContent = "▼");
        $$(".timeline-dot").forEach(d => d.classList.remove("active"));

        if (!isOpen) {
          body.classList.remove("collapsed");
          card.classList.add("expanded");
          expandIcon.textContent = "▲";
          item.querySelector(".timeline-dot").classList.add("active");
        }
      });
    });
  }

  /* ═══════════════════════════════════════════════ */
  /*  HOW TO VOTE (8 Steps)                         */
  /* ═══════════════════════════════════════════════ */
  function buildHowToVote() {
    voteStepsGrid.innerHTML = "";
    HOW_TO_VOTE_STEPS.forEach((step) => {
      const card = document.createElement("div");
      card.className = "vote-step-card";
      card.innerHTML = `
        <div class="vote-step-number" style="background: ${step.color}">${step.step}</div>
        <div class="vote-step-icon">${step.icon}</div>
        <h3>${step.title}</h3>
        <p class="vote-step-desc">${step.description}</p>
        <div class="vote-step-detail hidden">
          <p>${step.details}</p>
        </div>
        <div class="vote-step-tags">
          ${step.tags.map(t => `<span class="vote-tag">${t}</span>`).join("")}
        </div>
        <button class="vote-step-toggle">Show Details ▼</button>
      `;
      voteStepsGrid.appendChild(card);

      const detail = card.querySelector(".vote-step-detail");
      const toggleBtn = card.querySelector(".vote-step-toggle");
      toggleBtn.addEventListener("click", () => {
        const isHidden = detail.classList.contains("hidden");
        detail.classList.toggle("hidden");
        toggleBtn.textContent = isHidden ? "Hide Details ▲" : "Show Details ▼";
      });
    });
  }

  /* ═══════════════════════════════════════════════ */
  /*  QUIZ — TEST YOURSELF                          */
  /* ═══════════════════════════════════════════════ */
  quizStartBtn.addEventListener("click", startQuiz);

  function startQuiz() {
    currentQuestionIdx = 0;
    quizScore = 0;
    quizAnswered = new Array(QUIZ_QUESTIONS.length).fill(null);
    quizStartCard.classList.add("hidden");
    quizResultArea.classList.add("hidden");
    quizPlayArea.classList.remove("hidden");
    updateScoreDisplay();
    renderQuestion();
  }

  function renderQuestion() {
    const total = QUIZ_QUESTIONS.length;
    const qObj = QUIZ_QUESTIONS[currentQuestionIdx];
    quizProgressFill.style.width = `${((currentQuestionIdx) / total) * 100}%`;

    quizCard.innerHTML = `
      <div class="quiz-question-number">Question ${currentQuestionIdx + 1} of ${total}</div>
      <h3>${qObj.q}</h3>
      <div class="quiz-options">
        ${qObj.options.map((opt, i) => `<button class="quiz-option" data-idx="${i}">${opt}</button>`).join("")}
      </div>
    `;

    quizCard.querySelectorAll(".quiz-option").forEach((btn) => {
      btn.addEventListener("click", () => handleAnswer(parseInt(btn.dataset.idx)));
    });
  }

  function handleAnswer(selected) {
    const qObj = QUIZ_QUESTIONS[currentQuestionIdx];
    const isCorrect = selected === qObj.correct;
    if (isCorrect) quizScore++;
    quizAnswered[currentQuestionIdx] = selected;

    quizCard.querySelectorAll(".quiz-option").forEach((btn) => {
      const idx = parseInt(btn.dataset.idx);
      btn.classList.add("answered");
      if (idx === qObj.correct) btn.classList.add("correct");
      if (idx === selected && !isCorrect) btn.classList.add("wrong");
      btn.disabled = true;
    });

    // Feedback
    const fb = document.createElement("div");
    fb.className = `quiz-feedback ${isCorrect ? "correct-fb" : "wrong-fb"}`;
    fb.innerHTML = `<strong>${isCorrect ? "✅ Correct!" : "❌ Incorrect"}</strong><br/>${qObj.explanation}`;
    quizCard.appendChild(fb);

    updateScoreDisplay();

    // Next / Results button
    const total = QUIZ_QUESTIONS.length;
    const nextBtn = document.createElement("button");
    nextBtn.className = "quiz-next-btn";
    nextBtn.textContent = currentQuestionIdx + 1 < total ? "Next Question →" : "See Results 🎉";
    nextBtn.addEventListener("click", () => {
      currentQuestionIdx++;
      if (currentQuestionIdx < total) {
        renderQuestion();
      } else {
        showQuizResults();
      }
    });
    quizCard.appendChild(nextBtn);
  }

  function updateScoreDisplay() {
    quizScoreDisplay.textContent = `Score: ${quizScore} / ${QUIZ_QUESTIONS.length}`;
  }

  function showQuizResults() {
    const total = QUIZ_QUESTIONS.length;
    const pct = Math.round((quizScore / total) * 100);
    quizPlayArea.classList.add("hidden");
    quizProgressFill.style.width = "100%";

    let emoji, message, color;
    if (pct >= 80) { emoji = "🏆"; message = "Excellent! You're an election expert!"; color = "#34d399"; }
    else if (pct >= 60) { emoji = "🎉"; message = "Great job! You know your elections well!"; color = "#fbbf24"; }
    else if (pct >= 40) { emoji = "📚"; message = "Good effort! Keep learning about elections."; color = "#38bdf8"; }
    else { emoji = "💪"; message = "Don't worry! Explore the other sections to learn more."; color = "#f87171"; }

    quizResultArea.classList.remove("hidden");
    quizResultArea.innerHTML = `
      <div class="quiz-result glass-card">
        <div class="result-emoji">${emoji}</div>
        <h2 style="color: ${color};">${pct}% Score</h2>
        <p class="result-score">${quizScore} out of ${total} correct</p>
        <p class="result-message">${message}</p>
        <div class="result-review">
          <h4>Review Your Answers:</h4>
          ${QUIZ_QUESTIONS.map((q, i) => {
            const userAns = quizAnswered[i];
            const isRight = userAns === q.correct;
            return `
              <div class="review-item ${isRight ? 'review-correct' : 'review-wrong'}">
                <span class="review-icon">${isRight ? '✅' : '❌'}</span>
                <div class="review-content">
                  <strong>Q${i+1}:</strong> ${q.q}<br/>
                  <span class="review-answer">Your answer: ${q.options[userAns]} ${!isRight ? `| Correct: ${q.options[q.correct]}` : ''}</span>
                </div>
              </div>
            `;
          }).join("")}
        </div>
        <div class="result-actions">
          <button class="btn-primary" id="quiz-retry-btn">🔄 Try Again</button>
          <button class="btn-secondary" id="quiz-back-btn">← Back to Start</button>
        </div>
      </div>
    `;

    $("#quiz-retry-btn").addEventListener("click", startQuiz);
    $("#quiz-back-btn").addEventListener("click", () => {
      quizResultArea.classList.add("hidden");
      quizStartCard.classList.remove("hidden");
    });
  }

  /* ═══════════════════════════════════════════════ */
  /*  KEY FACTS                                     */
  /* ═══════════════════════════════════════════════ */
  function buildKeyFacts() {
    factsGrid.innerHTML = "";
    KEY_FACTS.forEach((fact, i) => {
      const card = document.createElement("div");
      card.className = "fact-card";
      card.style.animationDelay = `${i * 0.08}s`;
      card.innerHTML = `
        <div class="fact-icon" style="background: ${fact.color}20; color: ${fact.color}">${fact.icon}</div>
        <div class="fact-value">${fact.value}</div>
        <div class="fact-label">${fact.label}</div>
        <div class="fact-description">${fact.description}</div>
      `;
      factsGrid.appendChild(card);
    });

    factsExtra.innerHTML = `
      <h3>📌 Did You Know?</h3>
      <div class="extra-facts-list">
        ${EXTRA_FACTS.map(f => `<div class="extra-fact-item"><span class="extra-fact-bullet">▸</span>${f}</div>`).join("")}
      </div>
    `;
  }

})();
