import { fetchCurrencies, fetchExchangeRates } from "./api.js";
import { showCurrencies, showExchangeRates, showError, showLoader, hideLoader } from "./ui.js";

async function initialize() {
    const dateInput = document.getElementById("date");
    dateInput.max = new Date().toISOString().split("T")[0];

    try {
        const currencies = await fetchCurrencies();
        showCurrencies(currencies);
    } catch (error) {
        showError("Error fetching available currencies");
    }

    const formBtn = document.querySelector(".convert-btn");
    formBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const baseCurrency = document.getElementById("base-currency").value;
        const selectedDate = dateInput.value || "latest";

        showLoader();
        try {
            const rates = await fetchExchangeRates(baseCurrency, selectedDate);
            hideLoader();
            showExchangeRates(rates, baseCurrency, selectedDate);
        } catch (error) {
            hideLoader();
            showError("Error fetching exchange rates");
        }
    });
}

initialize();
