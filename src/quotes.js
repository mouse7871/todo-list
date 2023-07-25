const quote = document.querySelector("#quote");
const quotes = resource.quotes;

const quoteIndex = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerHTML = `
<div class="quote-kor">
    <span>${quoteIndex.text}</span>
    <span> - </span>
    <span>${quoteIndex.author}<span>
</div>
    <div class="quote-eng">
    <span>${quoteIndex.texteng}</span>
    <span> - </span>
    <span>${quoteIndex.authoreng}<span>
</div>`;
