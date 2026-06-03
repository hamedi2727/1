
    // ============================
    // Helper Functions
    // ============================

    function fillCards(id, data) {
        document.getElementById(id).innerHTML = Object.keys(data).map(k => `
            <div class="card">
                <div class="card-title">${k}</div>
                <div class="card-value">${data[k]} m³</div>
            </div>
        `).join("");
    }

    function barChart(id, data, color) {
        document.getElementById(id).innerHTML = Object.keys(data).map(k => `
            <div style="margin:6px 0;">
                <div>${k} — ${data[k]} m³</div>
                <div style="height:14px; background:#1e293b;">
                    <div style="width:${(data[k] / total) * 100}%; height:100%; background:${color};"></div>
                </div>
            </div>
        `).join("");
    }

    window.toggleSection = id => {
        document.getElementById(id).classList.toggle("open");
    };

    // ============================
    // Overview Tab (NO PIE CHARTS)
    // ============================

    document.getElementById("overviewTab").innerHTML = `
        <div id="sectionMixtures" class="section open">
            <div class="section-header" onclick="toggleSection('sectionMixtures')">Mixtures <span>▼</span></div>
            <div class="section-content">
                <div id="mixturesCards" class="card-grid"></div>
                <h4>Bar Chart</h4>
                <div id="mixturesChart"></div>
            </div>
        </div>

        <div id="sectionPumps" class="section">
            <div class="section-header" onclick="toggleSection('sectionPumps')">Concrete Pumps (SP) <span>▼</span></div>
            <div class="section-content">
                <div id="pumpsCards" class="card-grid"></div>
                <h4>Bar Chart</h4>
                <div id="pumpsChart"></div>
            </div>
        </div>

        <div id="sectionLines" class="section">
            <div class="section-header" onclick="toggleSection('sectionLines')">ID Lines <span>▼</span></div>
            <div class="section-content">
                <div id="linesCards" class="card-grid"></div>
                <h4>Bar Chart</h4>
                <div id="linesChart"></div>
            </div>
        </div>

        <div id="sectionElements" class="section">
            <div class="section-header" onclick="toggleSection('sectionElements')">Elements <span>▼</span></div>
            <div class="section-content">
                <div id="elementsCards" class="card-grid"></div>
                <h4>Bar Chart</h4>
                <div id="elementsChart"></div>
            </div>
        </div>

        <div id="sectionSPB" class="section">
            <div class="section-header" onclick="toggleSection('sectionSPB')">Placing Boom (SPB) <span>▼</span></div>
            <div class="section-content">
                <div id="spbCards" class="card-grid"></div>
                <h4>Bar Chart</h4>
                <div id="spbChart"></div>
            </div>
        </div>
    `;

    fillCards("mixturesCards", mixtures);
    fillCards("pumpsCards", pumps);
    fillCards("linesCards", lines);
    fillCards("elementsCards", elements);
    fillCards("spbCards", spb);

    barChart("mixturesChart", mixtures, "#3b82f6");
    barChart("pumpsChart", pumps, "#22c55e");
    barChart("linesChart", lines, "#f97316");
    barChart("elementsChart", elements, "#eab308");
    barChart("spbChart", spb, "#8b5cf6");

    // ============================
    // Mixtures Tab
    // ============================

    document.getElementById("mixturesTab").innerHTML = `
        <h3>Mixtures Details</h3>
        <table class="pdf-table">
            <thead><tr><th>Mixture</th><th>Quantity</th><th>Percentage</th></tr></thead>
            <tbody>
                ${Object.keys(mixtures).map(t => `
                    <tr>
                        <td>${t}</td>
                        <td>${mixtures[t]}</td>
                        <td>${((mixtures[t] / total) * 100).toFixed(2)}%</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
        <div id="mixturesDetailChart"></div>
    `;
    barChart("mixturesDetailChart", mixtures, "#3b82f6");

    // ============================
    // Pumps Tab
    // ============================

    document.getElementById("pumpsTab").innerHTML = `
        <h3>Concrete Pumps (SP)</h3>
        <table class="pdf-table">
            <thead><tr><th>Pump</th><th>Quantity</th><th>Percentage</th></tr></thead>
            <tbody>
                ${Object.keys(pumps).map(p => `
                    <tr>
                        <td>${p}</td>
                        <td>${pumps[p]}</td>
                        <td>${((pumps[p] / total) * 100).toFixed(2)}%</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
        <div id="pumpsDetailChart"></div>
    `;
    barChart("pumpsDetailChart", pumps, "#22c55e");

    // ============================
    // Lines Tab
    // ============================

    document.getElementById("linesTab").innerHTML = `
        <h3>ID Lines</h3>
        <table class="pdf-table">
            <thead><tr><th>Line</th><th>Quantity</th><th>Percentage</th></tr></thead>
            <tbody>
                ${Object.keys(lines).map(l => `
                    <tr>
                        <td>${l}</td>
                        <td>${lines[l]}</td>
                        <td>${((lines[l] / total) * 100).toFixed(2)}%</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
        <div id="linesDetailChart"></div>
    `;
    barChart("linesDetailChart", lines, "#f97316");

    // ============================
    // Elements Tab
    // ============================

    document.getElementById("elementsTab").innerHTML = `
        <h3>Elements</h3>
        <table class="pdf-table">
            <thead><tr><th>Element</th><th>Quantity</th><th>Percentage</th></tr></thead>
            <tbody>
                ${Object.keys(elements).map(e => `
                    <tr>
                        <td>${e}</td>
                        <td>${elements[e]}</td>
                        <td>${((elements[e] / total) * 100).toFixed(2)}%</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
        <div id="elementsDetailChart"></div>
    `;
    barChart("elementsDetailChart", elements, "#eab308");

    // ============================
    // SPB Tab
    // ============================

    document.getElementById("spbTab").innerHTML = `
        <h3>Placing Boom (SPB)</h3>
        <table class="pdf-table">
            <thead><tr><th>SPB</th><th>Quantity</th><th>Percentage</th></tr></thead>
            <tbody>
                ${Object.keys(spb).map(s => `
                    <tr>
                        <td>${s}</td>
                        <td>${spb[s]}</td>
                        <td>${((spb[s] / total) * 100).toFixed(2)}%</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
        <div id="spbDetailChart"></div>
    `;
    barChart("spbDetailChart", spb, "#8b5cf6");

    // ============================
    // Daily Pours Tab
    // ============================

    document.getElementById("dailyTab").innerHTML = `
        <h3>Daily Pours</h3>

        <table class="pdf-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Quantity</th>
                    <th>Mixture</th>
                    <th>Pump</th>
                    <th>Line</th>
                    <th>Element</th>
                    <th>SPB</th>
                </tr>
            </thead>
            <tbody>
                ${dailyPours.map(p => `
                    <tr>
                        <td>${p.date}</td>
                        <td>${p.qty}</td>
                        <td>${p.mixture}</td>
                        <td>${p.pump}</td>
                        <td>${p.line}</td>
                        <td>${p.element}</td>
                        <td>${p.spb}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>

        <h4>Timeline Chart</h4>
        <div id="dailyChart"></div>
    `;

    let dailyHTML = "";
    dailyPours.forEach(p => {
        dailyHTML += `
            <div style="margin:6px 0;">
                <div>${p.date} — ${p.qty} m³</div>
                <div style="height:14px; background:#1e293b;">
                    <div style="width:${(p.qty / 600) * 100}%; height:100%; background:#0ea5e9;"></div>
                </div>
            </div>
        `;
    });
    document.getElementById("dailyChart").innerHTML = dailyHTML;
}

