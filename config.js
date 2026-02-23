export const APP_CONFIG = {
  title: "AI-Native SDLC",
  subtitle: "Analyser Project",
  activePhase: "Discovery",
};

export const PHASE_AI_ITEMS = {
  Discovery: [
    "Analyse Amplitude data",
    "Technical risks flagged",
    "Prototyping",
    "Market research",
  ],
  Planning: [
    "Validate requirements",
    "Break down work w/ sequencing",
    "Estimate",
    "Write AC",
    "SPIKEs & ADRs",
  ],
  Build: ["Agent picks up", "Consumes planning artifacts", "Raises PR"],
  Measure: ["Analyse Amplitude data", "Cleanup (e.g remove FF)", "Capture learnings"],
  Deploy: ["Self-healing"],
  Verification: ["First-pass review"],
};

export const PHASE_ITEM_COPY = {
  Discovery: {
    "Test & validate new ideas": "Run low-cost experiments to prove value before investing in full delivery.",
    "User interviews": "Capture qualitative pain points and language that shapes the epic narrative.",
    "Analyse Amplitude data": "Use product telemetry to identify drop-offs, high-friction paths, and opportunity size.",
    "Technical risks flagged": "Surface architecture and dependency risks early so planning starts from reality.",
    "Prototyping": "Quickly validate interaction patterns and technical feasibility with minimal commitment.",
    "Market research": "Cross-check trends and competitor moves to ensure the brief is strategically grounded.",
  },
  Planning: {
    "Validate requirements": "Turn the brief into implementation-ready requirements with explicit assumptions.",
    "Break down work w/ sequencing": "Split delivery into right-sized tickets with clear dependency order.",
    "Estimate": "Attach effort and confidence ranges so delivery plans remain transparent.",
    "Write AC": "Define acceptance criteria so engineering and product share one definition of done.",
    "SPIKEs & ADRs": "Use spikes and architecture records to de-risk uncertain technical paths.",
    "Human iteration → DoR": "Refine drafts through human review until the team agrees the work is ready.",
  },
  Build: {
    "Agent picks up": "Automation starts from approved plan artifacts and ticket intent.",
    "Consumes planning artifacts": "Implementation stays traceable to briefs, criteria, and sequencing.",
    "Raises PR": "Output is a reviewable pull request with context for verification.",
  },
  Measure: {
    "Analyse Amplitude data": "Compare expected vs real outcomes using behavioral signals.",
    "A/B testing": "Validate impact with statistically meaningful experiments.",
    "Roll out or iterate?": "Decide scale-up, rollback, or further iteration from evidence.",
    "Cleanup (e.g remove FF)": "Remove temporary release scaffolding once confidence is achieved.",
    "Capture learnings": "Convert outcomes into reusable knowledge for the next cycle.",
  },
  Deploy: {
    "CI/CD pipeline runs": "Promotion follows standard, repeatable deployment controls.",
    "Blue/Green": "Reduce blast radius by switching traffic between parallel environments.",
    "Feature flags": "Gate exposure and support progressive rollout by segment.",
    "Self-healing": "Automated safeguards recover or isolate failures quickly.",
  },
  Verification: {
    "PR submitted": "A complete change set is available for technical and product review.",
    "Automated tests run": "Regression and behavior checks execute before merge approval.",
    "Quality gates": "Static analysis and standards checks enforce baseline quality.",
    "Engineer reviews PR": "Human judgment validates maintainability and architecture alignment.",
    "First-pass review": "AI-assisted review highlights likely issues for faster human evaluation.",
  },
};

export const TOOL_LOGOS = {
  "Confluence": "https://cdn.worldvectorlogo.com/logos/confluence-1.svg",
  "Figma": "https://cdn.worldvectorlogo.com/logos/figma-icon.svg",
  "JIRA": "https://cdn.worldvectorlogo.com/logos/jira-1.svg",
  "Azure DevOps": "https://oneplan.ai/wp-content/uploads/2019/07/azure-devops-svgrepo-com.svg",
  "Amplitude": "https://cdn.prod.website-files.com/64da81538e9bdebe7ae2fa11/64dbedc008270c0be55dc3dc_Favicon%20Marketo%20logo%2032x32.png",
  "Productboard": "https://avatars.githubusercontent.com/u/11894429?s=200&v=4",
};

export const PHASES = [
  {
    name: "Discovery",
    className: "phase-discovery",
    x: 38,
    y: 50,
    summary: "Explore problems and validate opportunity before committing build effort.",
    items: [
      "Test & validate new ideas",
      "User interviews",
      "Analyse Amplitude data",
      "Technical risks flagged",
      "Prototyping",
      "Market research",
    ],
    tools: ["Confluence", "Figma", "Amplitude", "Productboard"],
    zoom: {
      focus: true,
      inputs: ["Product", "Engineering", "Productboard", "Amplitude"],
      outputs: ["Fleshed out epic brief"],
      flow: [
        "Use quant + qual signals to define the opportunity.",
        "Draft and iterate the epic brief with risk callouts.",
      ],
    },
  },
  {
    name: "Planning",
    className: "phase-planning",
    x: 425,
    y: 50,
    summary: "Translate findings into scoped delivery plans and shared implementation intent.",
    items: [
      "Validate requirements",
      "Break down work w/ sequencing",
      "Estimate",
      "Write AC",
      "SPIKEs & ADRs",
      "Human iteration → DoR",
    ],
    tools: ["JIRA", "Confluence", "Azure DevOps", "Figma"],
    zoom: {
      focus: true,
      inputs: ["Epic brief", "Engineer", "Codebase"],
      outputs: ["Estimated JIRA tickets", "Sequencing plan"],
      flow: [
        "Convert epic into implementation slices and acceptance criteria.",
        "Sequence tickets with dependencies and delivery confidence.",
      ],
    },
  },
  {
    name: "Build",
    className: "phase-build",
    x: 812,
    y: 50,
    summary: "Agents and engineers collaborate to convert plans into reviewed code changes.",
    items: ["Agent picks up", "Consumes planning artifacts", "Raises PR"],
    tools: ["Azure DevOps", "Figma"],
    zoom: {
      inputs: ["JIRA tickets"],
      outputs: ["PR"],
      flow: ["Implement and open PR with traceable changes."],
    },
  },
  {
    name: "Measure",
    className: "phase-measure",
    x: 38,
    y: 392,
    summary: "Quantify impact and feed learnings into the next discovery cycle.",
    items: [
      "Analyse Amplitude data",
      "A/B testing",
      "Roll out or iterate?",
      "Cleanup (e.g remove FF)",
      "Capture learnings",
    ],
    tools: ["Amplitude"],
    zoom: {
      inputs: ["Production telemetry", "Experiment outcomes"],
      outputs: ["Learning backlog", "Rollout decision"],
      flow: ["Feed measured outcomes back into Discovery."],
    },
  },
  {
    name: "Deploy",
    className: "phase-deploy",
    x: 425,
    y: 392,
    summary: "Release safely through existing operational controls and progressive exposure.",
    items: ["CI/CD pipeline runs", "Blue/Green", "Feature flags", "Self-healing"],
    tools: ["Azure DevOps", "Amplitude"],
    zoom: {
      inputs: ["Verified PR"],
      outputs: ["Safe production release"],
      flow: ["Use blue/green + flags for controlled rollout."],
    },
  },
  {
    name: "Verification",
    className: "phase-verify",
    x: 812,
    y: 392,
    summary: "Confirm quality with both automated checks and accountable human review.",
    items: [
      "PR submitted",
      "Automated tests run",
      "Quality gates",
      "Engineer reviews PR",
      "First-pass review",
    ],
    tools: ["Azure DevOps"],
    zoom: {
      inputs: ["PR"],
      outputs: ["Deploy-ready change"],
      flow: ["Pass tests + gates before release approval."],
    },
  },
];

export const PRINCIPLES = [
  {
    title: "Humans retain ultimate accountability",
    description: "AI can contribute and recommend, but people own outcomes, sign-off, and risk.",
  },
  {
    title: "AI raises the skills bar",
    description: "Engineers operate at higher abstraction: intent, review, and failure modes.",
  },
  {
    title: "Auditable and observable by design",
    description: "If decisions and evidence cannot be reconstructed, they do not belong.",
  },
  {
    title: "Portability over point optimization",
    description: "Avoid lock-in and keep the SDLC adaptable to change.",
  },
  {
    title: "Stability over novelty",
    description: "Prefer predictable behavior, controlled change, and confidence at scale.",
  },
];
