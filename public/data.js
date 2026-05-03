/* ═══════════════════════════════════════════════════════ */
/*  CHUNAV SAHAYAK — INDIAN ELECTION DATA                 */
/* ═══════════════════════════════════════════════════════ */

/* ── ELECTION TIMELINE — 8 PHASES ── */
const TIMELINE_PHASES = [
  {
    id: "announcement",
    icon: "📢",
    phase: "Phase 1",
    title: "ECI Announcement",
    subtitle: "Election Commission Notification",
    body: "The Election Commission of India (ECI) announces the election schedule. The Model Code of Conduct (MCC) comes into effect immediately upon this announcement, binding all political parties and candidates.",
    details: [
      "ECI issues a press conference announcing dates for nominations, polling, and counting",
      "Model Code of Conduct (MCC) takes effect from the date of announcement",
      "All government advertising and welfare announcements are halted",
      "The ECI appoints observers for each constituency",
      "Transfer of officers with political affiliations is initiated"
    ]
  },
  {
    id: "nomination",
    icon: "📝",
    phase: "Phase 2",
    title: "Nomination Filing",
    subtitle: "Candidates File Their Papers",
    body: "Candidates file their nomination papers with the Returning Officer. Each candidate must submit personal and financial details, including criminal records and assets, ensuring transparency.",
    details: [
      "Candidates file Form 26 with affidavits on criminal cases, assets, liabilities, and education",
      "A security deposit of ₹25,000 (₹12,500 for SC/ST) must be submitted",
      "Candidates need a proposer from the same constituency",
      "Independent candidates must collect signatures from at least 10 registered electors",
      "Last date for filing nominations is typically 7 days after notification"
    ]
  },
  {
    id: "scrutiny",
    icon: "🔍",
    phase: "Phase 3",
    title: "Scrutiny of Nominations",
    subtitle: "Returning Officer Reviews Papers",
    body: "The Returning Officer examines all nomination papers. Invalid or incomplete nominations are rejected. Candidates can also withdraw their nominations before the deadline.",
    details: [
      "Scrutiny happens the day after the last date of filing nominations",
      "Returning Officer checks for valid signatures, correct deposits, and qualifying affidavits",
      "Rejected candidates can appeal to the Election Commission",
      "Withdrawal of candidature is allowed up to 2 days after scrutiny",
      "Final list of contesting candidates is published after withdrawals"
    ]
  },
  {
    id: "campaign",
    icon: "🎤",
    phase: "Phase 4",
    title: "Election Campaign",
    subtitle: "Parties Campaign Across India",
    body: "Political parties and candidates campaign across constituencies — through rallies, advertisements, door-to-door canvassing, social media, and public debates. Campaigning must stop 48 hours before polling.",
    details: [
      "Campaign expenditure limit: ₹95 lakh for Lok Sabha, ₹40 lakh for Vidhan Sabha",
      "No campaigning allowed 48 hours before polling day ('silence period')",
      "ECI monitors campaign spending through expenditure observers",
      "Political parties submit details of their election manifesto",
      "Use of religion, caste, or communal feelings for votes is prohibited",
      "Paid news and fake content are monitored by the Media Certification Committee"
    ]
  },
  {
    id: "polling",
    icon: "🗳️",
    phase: "Phase 5",
    title: "Polling Day",
    subtitle: "Voters Cast Their Votes",
    body: "Voters go to their assigned polling stations and cast their vote using Electronic Voting Machines (EVMs). The VVPAT machine provides a paper trail for verification. Polling typically happens in multiple phases across states.",
    details: [
      "Polling hours are generally 7:00 AM to 6:00 PM (may vary by region)",
      "Voters must carry valid photo ID (EPIC card, Aadhaar, passport, etc.)",
      "Indelible ink is applied on the left index finger to prevent double voting",
      "EVMs are sealed and tamper-proof, tested thoroughly before use",
      "VVPAT slip is displayed for 7 seconds for voter verification",
      "Booth-level officers assist voters with disabilities and senior citizens"
    ]
  },
  {
    id: "counting",
    icon: "📊",
    phase: "Phase 6",
    title: "Vote Counting",
    subtitle: "EVM Votes Are Counted",
    body: "Counting of votes happens on the designated counting day. EVMs are stored securely in strong rooms under CCTV surveillance. Results are declared constituency-by-constituency as counting progresses.",
    details: [
      "Counting begins with postal ballots, followed by EVM counts round-by-round",
      "Each counting table handles one EVM at a time with agents from parties present",
      "VVPAT paper slips of 5 randomly selected booths per constituency are verified",
      "Results are uploaded in real-time on the ECI Results portal",
      "Returning Officer declares the winning candidate for each constituency",
      "Any disputes can be filed as Election Petitions in the High Court"
    ]
  },
  {
    id: "results",
    icon: "🏆",
    phase: "Phase 7",
    title: "Results Declaration",
    subtitle: "Winners Are Announced",
    body: "The Election Commission declares official results. The party or coalition with a majority (272+ seats in Lok Sabha) is invited by the President to form the government.",
    details: [
      "A party needs 272 out of 543 Lok Sabha seats for a simple majority",
      "If no party gets a majority, the largest party/coalition is invited to form government",
      "The President appoints the Prime Minister based on majority support",
      "State results determine the Chief Minister in each state",
      "ECI publishes complete statistical reports after elections",
      "Election petitions challenging results must be filed within 45 days"
    ]
  },
  {
    id: "government",
    icon: "🏛️",
    phase: "Phase 8",
    title: "Government Formation",
    subtitle: "New Government Takes Office",
    body: "The winning party's leader is sworn in as Prime Minister (or Chief Minister for state elections). The Council of Ministers is formed and the government begins its term.",
    details: [
      "The Prime Minister and Council of Ministers take oath at Rashtrapati Bhavan",
      "The new Lok Sabha must convene its first session within 30 days",
      "A vote of confidence may be required if the majority is not clear",
      "The Speaker of Lok Sabha is elected in the first session",
      "The new government presents its policy agenda",
      "Model Code of Conduct is lifted after government formation"
    ]
  }
];

/* ── HOW TO VOTE — 8 STEPS ── */
const HOW_TO_VOTE_STEPS = [
  {
    step: 1,
    icon: "📋",
    title: "Check the Voter Roll",
    description: "Verify your name in the electoral roll to ensure you are registered to vote.",
    details: "Visit the National Voter Services Portal (NVSP) at voters.eci.gov.in or download the Voter Helpline App.",
    tags: ["Online", "NVSP Portal", "Voter Helpline App"],
    color: "#6366f1"
  },
  {
    step: 2,
    icon: "📝",
    title: "Register as a Voter",
    description: "If not registered, apply for a new Voter ID card (EPIC) by submitting Form 6.",
    details: "Submit Form 6 online through NVSP or offline at the nearest Electoral Registration Office. You need proof of age, address, and a passport-size photo.",
    tags: ["Form 6", "NVSP", "ERO Office", "Documents"],
    color: "#8b5cf6"
  },
  {
    step: 3,
    icon: "💳",
    title: "Get Your Voter ID (EPIC)",
    description: "Receive your Electors Photo Identity Card — your primary voting document.",
    details: "After verification by the Booth Level Officer (BLO), your EPIC card is issued. You can also download the e-EPIC from the NVSP portal.",
    tags: ["EPIC Card", "e-EPIC", "BLO Visit"],
    color: "#a78bfa"
  },
  {
    step: 4,
    icon: "📍",
    title: "Find Your Polling Station",
    description: "Know your assigned polling station before election day.",
    details: "Check your polling station location on the Voter Helpline App, NVSP portal, or your voter slip sent by the BLO.",
    tags: ["Voter Helpline App", "Voter Slip", "NVSP"],
    color: "#38bdf8"
  },
  {
    step: 5,
    icon: "📄",
    title: "Carry Valid ID Proof",
    description: "Bring an approved photo ID when you go to vote.",
    details: "Accepted IDs include: EPIC/Voter ID, Aadhaar, Passport, Driving License, PAN Card, Government Employee ID, or any ID authorized by ECI.",
    tags: ["EPIC", "Aadhaar", "Passport", "PAN Card"],
    color: "#06b6d4"
  },
  {
    step: 6,
    icon: "✋",
    title: "Get Inked & Verified",
    description: "At the polling station, your identity is verified and indelible ink is applied.",
    details: "Show your ID to the polling officer. Your name is checked against the voter list. Indelible ink is applied to your left index finger to prevent repeat voting.",
    tags: ["Identity Check", "Indelible Ink"],
    color: "#10b981"
  },
  {
    step: 7,
    icon: "🗳️",
    title: "Cast Your Vote on EVM",
    description: "Enter the voting compartment and press the button next to your chosen candidate on the EVM.",
    details: "The EVM displays candidate names with party symbols. Press the blue button next to your choice. A beep confirms your vote. The VVPAT slip is displayed for 7 seconds for verification.",
    tags: ["EVM", "VVPAT", "Secret Ballot"],
    color: "#f59e0b"
  },
  {
    step: 8,
    icon: "✅",
    title: "Verify & Exit",
    description: "Verify your VVPAT slip, collect your ink-marked finger, and exit the booth proudly!",
    details: "Check the VVPAT paper slip to ensure it shows the correct candidate and symbol. Your vote is now counted. Exit the booth and encourage others to vote!",
    tags: ["VVPAT Verification", "Civic Duty"],
    color: "#ef4444"
  }
];

/* ── QUIZ QUESTIONS ── */
const QUIZ_QUESTIONS = [
  {
    id: 1,
    q: "What is the minimum age to vote in India?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correct: 1,
    explanation: "As per the 61st Amendment to the Constitution (1988), the minimum voting age in India is 18 years. You must be 18 on or before January 1 of the year of the electoral roll revision."
  },
  {
    id: 2,
    q: "What does NOTA stand for?",
    options: [
      "None Of The Above",
      "National Organization for Transparent Auditing",
      "No Obligation To Accept",
      "New Order of Transparent Alliance"
    ],
    correct: 0,
    explanation: "NOTA stands for 'None Of The Above'. Introduced in 2013 after a Supreme Court verdict, it allows voters to reject all candidates. However, even if NOTA gets the highest votes, the candidate with the most votes among contestants wins."
  },
  {
    id: 3,
    q: "How many seats are there in the Lok Sabha?",
    options: ["435 seats", "500 seats", "543 seats", "552 seats"],
    correct: 2,
    explanation: "The Lok Sabha has 543 elected seats. Members are directly elected by the people through single-member constituencies. The maximum strength can be 552 (including 2 nominated Anglo-Indian members, though this provision ended in 2020)."
  },
  {
    id: 4,
    q: "What does EVM stand for?",
    options: [
      "Electronic Verification Machine",
      "Electronic Voting Machine",
      "Election Verification Module",
      "Electoral Voting Mechanism"
    ],
    correct: 1,
    explanation: "EVM stands for Electronic Voting Machine. India has been using EVMs since 1982 (first used in the Paravur constituency of Kerala). They are manufactured by BEL and ECIL under strict security protocols and run on battery power."
  },
  {
    id: 5,
    q: "What is the Model Code of Conduct (MCC)?",
    options: [
      "A set of traffic rules during elections",
      "Guidelines for fair campaigning issued by ECI",
      "A law passed by Parliament for elections",
      "Rules for counting votes"
    ],
    correct: 1,
    explanation: "The Model Code of Conduct (MCC) is a set of guidelines issued by the Election Commission of India for political parties and candidates during elections. It ensures free and fair elections. It is not a law but is enforced by ECI's moral authority."
  },
  {
    id: 6,
    q: "Who is the constitutional head responsible for conducting elections in India?",
    options: [
      "The President of India",
      "The Prime Minister",
      "The Election Commission of India",
      "The Supreme Court of India"
    ],
    correct: 2,
    explanation: "The Election Commission of India (ECI), established under Article 324 of the Constitution, is the constitutional body responsible for administering elections in India. It is headed by the Chief Election Commissioner (CEC) and up to two Election Commissioners."
  },
  {
    id: 7,
    q: "What is VVPAT?",
    options: [
      "Voter Verification and Public Audit Trail",
      "Voter Verifiable Paper Audit Trail",
      "Visual Verification of Paper And Tallying",
      "Verified Voting Process Audit Technology"
    ],
    correct: 1,
    explanation: "VVPAT stands for Voter Verifiable Paper Audit Trail. Attached to EVMs, it prints a slip showing the candidate's name and symbol, displayed for 7 seconds. This allows voters to verify that their vote was correctly recorded."
  },
  {
    id: 8,
    q: "How many Rajya Sabha seats are there?",
    options: ["200 seats", "233 seats", "245 seats", "250 seats"],
    correct: 2,
    explanation: "The Rajya Sabha (Council of States) has a maximum of 245 seats — 233 elected by state and UT legislative assemblies, and 12 nominated by the President for their expertise in literature, science, art, and social service."
  },
  {
    id: 9,
    q: "Which is the first state to have used EVMs in an election?",
    options: ["Tamil Nadu", "Delhi", "Kerala", "Maharashtra"],
    correct: 2,
    explanation: "Kerala was the first state where EVMs were used — in the 1982 bye-election in the Paravur Assembly constituency in Ernakulam district. After a legal challenge, EVMs were fully adopted nationwide from 2004."
  },
  {
    id: 10,
    q: "What is the 'indelible ink' used for during elections?",
    options: [
      "To mark the ballot paper",
      "To mark the voter's finger to prevent repeat voting",
      "To seal the EVM",
      "To authenticate the voter ID"
    ],
    correct: 1,
    explanation: "Indelible ink (containing silver nitrate) is applied on the left index finger of voters after they cast their vote. It prevents double voting and remains visible for about 4 weeks. It is manufactured by Mysore Paints and Varnish Ltd."
  }
];

/* ── KEY FACTS ── */
const KEY_FACTS = [
  {
    icon: "👥",
    value: "97 Crore+",
    label: "Registered Voters",
    description: "India has the largest electorate in the world with over 97 crore registered voters.",
    color: "#6366f1"
  },
  {
    icon: "🏛️",
    value: "543",
    label: "Lok Sabha Seats",
    description: "Members are directly elected from single-member constituencies across India.",
    color: "#8b5cf6"
  },
  {
    icon: "📍",
    value: "10.5 Lakh+",
    label: "Polling Stations",
    description: "Polling stations set up across the country to ensure every voter has access.",
    color: "#a78bfa"
  },
  {
    icon: "🗳️",
    value: "55 Lakh+",
    label: "EVMs Used",
    description: "Electronic Voting Machines deployed across constituencies in every election.",
    color: "#38bdf8"
  },
  {
    icon: "🇮🇳",
    value: "28 + 8",
    label: "States & UTs",
    description: "India has 28 states and 8 Union Territories, each with its own electoral processes.",
    color: "#06b6d4"
  },
  {
    icon: "📅",
    value: "1952",
    label: "First General Election",
    description: "India held its first-ever general election in 1951-52, the world's largest democratic exercise at the time.",
    color: "#10b981"
  },
  {
    icon: "🚫",
    value: "2013",
    label: "NOTA Introduced",
    description: "NOTA (None Of The Above) was introduced after a Supreme Court ruling, giving voters the right to reject all candidates.",
    color: "#f59e0b"
  },
  {
    icon: "⚖️",
    value: "Article 324",
    label: "Constitutional Basis",
    description: "The Election Commission of India draws its authority from Article 324 of the Constitution of India.",
    color: "#ef4444"
  }
];

const EXTRA_FACTS = [
  "India's 2024 Lok Sabha election was conducted in 7 phases over 44 days.",
  "The Election Commission of India was established on 25th January 1950 — celebrated as National Voters' Day.",
  "Indelible ink used in Indian elections is manufactured by Mysore Paints and Varnish Limited, a government company in Karnataka.",
  "VVPAT was first used in the 2014 Lok Sabha elections in the Nagaland constituency of Noksen.",
  "The ECI sends mobile polling booths to remote areas including Gir Forest (for one voter!) and Ladakh.",
  "Women voter turnout has consistently increased, exceeding male turnout in several recent elections.",
  "India exports EVMs and indelible ink to other democracies around the world.",
  "Every registered voter within 2 km of a polling station is guaranteed access."
];

/* ── QA KNOWLEDGE BASE (for offline/fallback) ── */
const QA_KNOWLEDGE = {
  "evm": {
    keywords: ["evm", "electronic voting machine", "voting machine"],
    answer: "**Electronic Voting Machine (EVM)**\n\nAn EVM is an electronic device used for recording votes in Indian elections.\n\n**Key Facts:**\n- Introduced in 1982 (first used in Kerala's Paravur constituency)\n- Manufactured by BEL (Bharat Electronics Ltd.) and ECIL\n- Runs on a 7.5V alkaline battery — no external power needed\n- Each EVM can record up to 64 candidates\n- Contains a Control Unit (with polling officer) and a Ballot Unit (in voting compartment)\n- Paired with VVPAT since 2014 for paper audit trail\n\n**Security Features:**\n- One-time programmable chips — cannot be reprogrammed\n- Tamper-evident seals\n- Randomized distribution to constituencies\n- Mock polls conducted on polling day before voting begins\n\n*EVMs have been upheld by the Supreme Court and are considered reliable by international observers.*",
    source: "Source: Election Commission of India"
  },
  "nota": {
    keywords: ["nota", "none of the above", "reject all"],
    answer: "**NOTA — None Of The Above**\n\nNOTA is an option on the EVM ballot that allows voters to officially reject all candidates.\n\n**Key Facts:**\n- Introduced in 2013 after the Supreme Court ruling in *PUCL vs Union of India*\n- NOTA has its own ballot symbol (a crossed box)\n- Even if NOTA gets the highest votes, the candidate with the most votes still wins\n- NOTA votes are counted and published in election results\n\n**Why NOTA Matters:**\n- It empowers voters to express dissatisfaction\n- It maintains ballot secrecy (no forced voting for unwanted candidates)\n- It encourages parties to field better candidates\n\n*As of 2024, NOTA does not invalidate the election even if it gets a majority — this is a subject of ongoing legal debate.*",
    source: "Source: Supreme Court of India, ECI"
  },
  "register": {
    keywords: ["register", "registration", "voter id", "epic", "form 6", "voter card", "enroll"],
    answer: "**How to Register as a Voter in India**\n\n**Eligibility:**\n- Indian citizen\n- 18 years or older (as of January 1 of the revision year)\n- Resident of the constituency\n- Not disqualified under any law\n\n**Steps:**\n1. Visit **voters.eci.gov.in** (NVSP Portal)\n2. Fill **Form 6** (Application for new voter registration)\n3. Upload documents: Proof of age, address, and a passport photo\n4. Submit the form online or at the nearest ERO office\n5. A Booth Level Officer (BLO) may visit for verification\n6. Once approved, your **EPIC (Voter ID) Card** is issued\n\n**You can also:**\n- Use the **Voter Helpline App** (Android/iOS)\n- Call **1950** (Voter Helpline Number)\n- Visit your local Electoral Registration Office\n\n*Registration is free of charge!*",
    source: "Source: NVSP, Election Commission of India"
  },
  "mcc": {
    keywords: ["model code", "mcc", "code of conduct", "campaign rules"],
    answer: "**Model Code of Conduct (MCC)**\n\nThe MCC is a set of guidelines issued by the Election Commission for parties and candidates during elections.\n\n**When does it apply?**\n- From the date of election announcement until results are declared\n\n**Key Rules:**\n- No announcements of new government schemes/projects\n- No use of official machinery for campaigning\n- No appeals to caste, religion, or communal sentiments\n- Campaign must stop 48 hours before polling (silence period)\n- No distribution of alcohol, money, or gifts to voters\n- No defamation of opponents\n- Equal access to government media for all parties\n\n**Enforcement:**\n- ECI can issue warnings, register FIRs, and bar candidates\n- Though not a law, the MCC is enforced through executive orders and ECI's authority\n\n*Violation of MCC is taken very seriously and can lead to disqualification.*",
    source: "Source: Election Commission of India"
  },
  "eci": {
    keywords: ["eci", "election commission", "chief election commissioner", "article 324"],
    answer: "**Election Commission of India (ECI)**\n\nThe ECI is the constitutional body responsible for conducting free and fair elections in India.\n\n**Constitutional Basis:** Article 324\n\n**Composition:**\n- Chief Election Commissioner (CEC)\n- Up to 2 Election Commissioners\n- Appointed by the President of India\n\n**Functions:**\n- Conduct elections to Lok Sabha, Rajya Sabha, State Assemblies, and offices of President & Vice-President\n- Prepare and maintain electoral rolls\n- Recognize political parties and allot symbols\n- Enforce the Model Code of Conduct\n- Monitor election expenditure\n- Resolve election disputes\n\n**Key Facts:**\n- Established: 25 January 1950\n- First CEC: Sukumar Sen\n- Headquarters: Nirvachan Sadan, New Delhi\n- 25 January is celebrated as **National Voters' Day**\n\n*The CEC can only be removed by impeachment (like a Supreme Court judge).*",
    source: "Source: Constitution of India, ECI"
  },
  "loksabha": {
    keywords: ["lok sabha", "lower house", "543", "parliament", "mp", "member of parliament"],
    answer: "**Lok Sabha — House of the People**\n\nThe Lok Sabha is the lower house of India's bicameral Parliament.\n\n**Key Facts:**\n- **543 elected seats** from single-member constituencies\n- Members are directly elected by the people\n- Maximum term: **5 years** (can be dissolved earlier)\n- Quorum: 1/10th of total members\n- Speaker presides over the house\n- A party/coalition needs **272 seats** for a simple majority\n\n**Representation:**\n- Uttar Pradesh has the highest seats: **80**\n- States with lowest: Mizoram, Nagaland, Sikkim — **1 each**\n- Seats are based on population (as per delimitation)\n\n**Functions:**\n- Passes laws (including Money Bills)\n- Controls government through confidence motions\n- Approves the Union Budget\n- Represents the will of the people\n\n*The 18th Lok Sabha was constituted in 2024.*",
    source: "Source: Parliament of India"
  },
  "documents": {
    keywords: ["documents", "id proof", "voter slip", "what to bring", "polling booth", "required"],
    answer: "**Documents Needed at the Polling Booth**\n\nYou need one approved photo ID to vote. Accepted documents include:\n\n1. **EPIC** — Elector's Photo Identity Card (Voter ID)\n2. **Aadhaar Card**\n3. **Passport**\n4. **Driving License**\n5. **PAN Card**\n6. **Government Employee ID**\n7. **Bank/Post Office Passbook with Photo**\n8. **MNREGA Job Card**\n9. **Health Insurance Smart Card (RSBY)**\n10. **Pension Document with Photo**\n11. **Student ID (for student voters)**\n\n**Important:**\n- You need ONLY ONE of the above\n- The voter slip alone is NOT sufficient — you need a photo ID\n- Your name must be in the electoral roll of that polling station\n\n*If you face issues, contact the Presiding Officer at the booth or call 1950.*",
    source: "Source: Election Commission of India"
  },
  "default": {
    answer: "I can help you understand Indian elections! Here are topics I can explain:\n\n• **EVM** — Electronic Voting Machines and how they work\n• **NOTA** — None Of The Above option\n• **Voter Registration** — How to register and get your Voter ID\n• **Model Code of Conduct** — Campaign rules during elections\n• **Election Commission of India** — The constitutional body\n• **Lok Sabha** — House of the People\n• **Required Documents** — What to bring to the polling booth\n\nAsk me anything about Indian elections and I'll provide factual, nonpartisan information!",
    source: ""
  }
};

const PARTISAN_KEYWORDS = [
  "which party", "who should i vote for", "best party", "worst party",
  "bjp", "congress", "aap", "better party", "support which",
  "modi", "rahul", "kejriwal", "who to support", "endorse",
  "who will win", "prediction"
];

const PARTISAN_RESPONSE = "🛡️ **Nonpartisan Notice**\n\nChunav Sahayak is designed to provide **factual, nonpartisan** education about how Indian elections work — not to recommend candidates or parties.\n\nTo research candidates, I recommend:\n• **ECI Official Website** — eci.gov.in\n• **MyNeta.info** — Candidate criminal records, assets, and education\n• **ADR (Association for Democratic Reforms)** — Election analysis and reports\n\nWould you like to learn about the election process instead?";
