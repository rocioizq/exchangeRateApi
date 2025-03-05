const apiUrl = "https://api.frankfurter.app";

export async function fetchCurrencies() {
    try {
        const response = await fetch(`${apiUrl}/latest?from=EUR`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        return Object.keys(data.rates).concat("EUR");
    
    } catch (error) {
        throw new Error("Error fetching available currencies");
    }
}

export async function fetchExchangeRates(baseCurrency, date = "latest") {
    try {
        const response = await fetch(`${apiUrl}/${date}?from=${baseCurrency}&to=USD,GBP,JPY,CAD,BRL,MXN,AUD,CHF,CNY,INR,ZAR,SGD`);
        if (!response.ok) throw new Error("Error fetching exchange rates");
        const data = await response.json();
        if (!data.rates) throw new Error("No exchange rates found");
        return data.rates;
    
    } catch (error) {
        throw new Error("Error fetching exchange rates");
    }
}
