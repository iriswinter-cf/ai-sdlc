import { APP_CONFIG, PHASES, PHASE_AI_ITEMS, PHASE_ITEM_COPY, PRINCIPLES, TOOL_LOGOS } from "./config.js";

const app = document.getElementById("app");

const getPhaseByName = (name) => PHASES.find((phase) => phase.name === name) ?? PHASES[0];

let activePhaseName = APP_CONFIG.activePhase;

function renderToolBadge(toolName) {
  const logo = TOOL_LOGOS[toolName] ?? "";
  return `
    <div class="tool-badge" title="${toolName}">
      <img src="${logo}" alt="${toolName} logo" />
    </div>
  `;
}

function getItemType(phaseName, itemText) {
  return (PHASE_AI_ITEMS[phaseName] ?? []).includes(itemText) ? "ai" : "established";
}

function getItemCopy(phaseName, itemText) {
  return PHASE_ITEM_COPY[phaseName]?.[itemText] ?? itemText;
}

function renderSticky(phaseName, itemText) {
  const itemType = getItemType(phaseName, itemText);
  const itemCopy = getItemCopy(phaseName, itemText);

  return `
    <div class="sticky ${itemType}" tabindex="0">
      <div class="sticky-label">${itemText}</div>
      <div class="item-popover ${itemType}" role="tooltip">
        ${itemCopy}
      </div>
    </div>
  `;
}

function renderPhaseCard(phase) {
  const isActive = phase.name === activePhaseName;

  return `
    <button
      class="phase-box ${phase.className} ${isActive ? "is-active" : ""}"
      data-phase-name="${phase.name}"
      style="left:${phase.x}px; top:${phase.y}px;"
      type="button"
      aria-label="Open ${phase.name} details"
      aria-pressed="${isActive}"
    >
      <div class="phase-title">${phase.name}</div>
      <div class="phase-grid">${phase.items.map((itemText) => renderSticky(phase.name, itemText)).join("")}</div>
      <div class="phase-tools">${phase.tools.map(renderToolBadge).join("")}</div>
    </button>
  `;
}

function renderDetailsPanel(phase) {
  const zoom = phase.zoom ?? {};
  const inputs = zoom.inputs ?? [];
  const outputs = zoom.outputs ?? [];
  const flow = zoom.flow ?? [];

  return `
    <aside class="details-panel" id="phase-details" aria-live="polite">
      <div class="details-eyebrow">Zoomed View</div>
      <h2 class="details-title">${phase.name}</h2>
      <p class="details-summary">${phase.summary}</p>
      ${zoom.focus ? '<div class="details-focus">Focus phase</div>' : ""}

      <div class="details-block">
        <h3 class="details-block-title">Inputs</h3>
        <ul class="details-bullets">
          ${inputs.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>

      <div class="details-block">
        <h3 class="details-block-title">Outputs</h3>
        <ul class="details-bullets">
          ${outputs.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>

      <div class="details-block">
        <h3 class="details-block-title">Flow</h3>
        <ul class="details-bullets">
          ${flow.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>

      <div class="details-list">
        ${phase.items
          .map(
            (itemText) => `
          <div class="details-item ${getItemType(phase.name, itemText)}">
            <span class="details-dot"></span>
            <span>${itemText}</span>
          </div>
        `,
          )
          .join("")}
      </div>
      <div class="details-tools">
        <div class="details-tools-title">Tools in this phase</div>
        <div class="phase-tools">${phase.tools.map(renderToolBadge).join("")}</div>
      </div>
    </aside>
  `;
}

function render() {
  const activePhase = getPhaseByName(activePhaseName);

  app.innerHTML = `
    <div class="app">
      <header class="header">
        <div>
          <h1 class="title">${APP_CONFIG.title}</h1>
          <p class="subtitle">${APP_CONFIG.subtitle}</p>
        </div>
        <div class="legend">
          <div class="legend-item">
            <div class="legend-swatch legend-established"></div>
            <span>Established Practice</span>
          </div>
          <div class="legend-item">
            <div class="legend-swatch legend-ai"></div>
            <span>AI</span>
          </div>
        </div>
      </header>

      <section class="layout">
        <div class="chart-wrap">
          <div class="diagram">
            <svg width="1120" height="680" viewBox="0 0 1120 680">
              <defs>
                <marker id="arrowhead" class="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7"></polygon>
                </marker>
                <marker id="arrowhead-dashed" class="arrowhead-dashed" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7"></polygon>
                </marker>
              </defs>
              <line x1="308" y1="180" x2="425" y2="180" class="arrow" marker-end="url(#arrowhead)"></line>
              <line x1="695" y1="180" x2="812" y2="180" class="arrow" marker-end="url(#arrowhead)"></line>
              <line x1="812" y1="195" x2="695" y2="195" class="arrow-dashed" marker-end="url(#arrowhead-dashed)"></line>
              <text x="753" y="212" class="svg-label">Ambiguity</text>
              <path d="M 947 310 L 947 392" class="arrow" marker-end="url(#arrowhead)"></path>
              <line x1="812" y1="522" x2="695" y2="522" class="arrow" marker-end="url(#arrowhead)"></line>
              <path d="M 985 392 L 985 310" class="arrow-dashed" marker-end="url(#arrowhead-dashed)"></path>
              <text x="999" y="351" class="svg-label">Fixes</text>
              <line x1="425" y1="522" x2="308" y2="522" class="arrow" marker-end="url(#arrowhead)"></line>
              <path d="M 38 522 L 15 522 L 15 180 L 38 180" class="arrow-dashed" marker-end="url(#arrowhead-dashed)"></path>
              <text x="8" y="351" class="svg-label" transform="rotate(-90, 8, 351)">Learnings feed back</text>
            </svg>
            ${PHASES.map(renderPhaseCard).join("")}
          </div>
        </div>
        ${renderDetailsPanel(activePhase)}
      </section>

      <section class="principles-section">
        <h2 class="principles-header">Key Principles</h2>
        <div class="principles">
          ${PRINCIPLES.map(
            (principle) => `
            <article class="principle-card">
              <h3 class="principle-title">${principle.title}</h3>
              <p class="principle-desc">${principle.description}</p>
            </article>
          `,
          ).join("")}
        </div>
      </section>

      <footer class="footer">Click any stage to zoom into details. Discovery and Planning are fully detailed.</footer>
    </div>
  `;

  bindInteractions();
}

function bindInteractions() {
  const phaseButtons = app.querySelectorAll("[data-phase-name]");

  phaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextPhaseName = button.getAttribute("data-phase-name");
      if (!nextPhaseName || nextPhaseName === activePhaseName) return;
      activePhaseName = nextPhaseName;
      render();
    });
  });
}

render();
