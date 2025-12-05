import * as cheerio from "cheerio";

async function parseExchangeRates(url) {
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    const results = [];
    $("td[data-th='Kod waluty:']").each((i, el) => {
        const currency = $(el).text().trim();
        const buy = $(el).next("td").text().trim();
        const sell = $(el).next("td").next("td").text().trim();
        results.push({ currency, buy, sell });
    });
    console.log(results);
    return results;
}

parseExchangeRates("https://www.redar.net/s/waluty");