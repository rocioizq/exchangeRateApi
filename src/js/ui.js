export function showCurrencies(currencies) {
    const selectElement = document.getElementById("base-currency");
    selectElement.innerHTML = ""; 

    currencies.forEach(currency => {
        const option = document.createElement("option");
        option.value = currency;
        option.textContent = currency;
        selectElement.appendChild(option);
    });
}

export function showExchangeRates(rates, baseCurrency, date) {
    const resultContainer = document.getElementById("result");
    let table = resultContainer.querySelector("table.exchange-table");
    if (!table) {
        resultContainer.innerHTML = `
          <div class="result-container">
            <table class="exchange-table">
              <tbody></tbody>
            </table>
          </div>
        `;
        table = resultContainer.querySelector("table.exchange-table");
    }

    const tableBody = table.querySelector("tbody");
    tableBody.innerHTML = "";

    const baseRow = document.createElement("tr");
    const baseCellCurrency = document.createElement("td");
    const baseCellRate = document.createElement("td");

    baseCellCurrency.textContent = `${baseCurrency} (Base)`;
    baseCellRate.textContent = "1";
    baseRow.appendChild(baseCellCurrency);
    baseRow.appendChild(baseCellRate);
    tableBody.appendChild(baseRow);

    Object.keys(rates).forEach(currency => {
        const row = document.createElement("tr");
        const cellCurrency = document.createElement("td");
        const cellRate = document.createElement("td");

        cellCurrency.textContent = currency;
        cellRate.textContent = rates[currency];

        row.appendChild(cellCurrency);
        row.appendChild(cellRate);
        tableBody.appendChild(row);
    });

    if (date !== "latest") {
        const dateRow = document.createElement("tr");
        const dateCell = document.createElement("td");
        dateCell.textContent = `Date: ${date}`;
        dateCell.colSpan = 2;
        dateRow.appendChild(dateCell);
        tableBody.appendChild(dateRow);
    }
}

export function showError(message) {
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = `<p class="error" style="color: red; text-align: center;">${message}</p>`;
}

export function showLoader() {
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = '<div class="loader">Loading...</div>';
}

export function hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.remove();
    }
}
