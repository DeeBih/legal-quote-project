// Quote Data (can be expanded with tags/metadata)
const quotes = [
  {
    text: "Law is a solemn expression of the will of the supreme power of the State.",
    author: "California Civil Code § 22",
    tags: ["law", "authority"]
  },
  {
    text: "No man is above the law, and no man is below it; nor do we ask any man’s permission when we require him to obey it.",
    author: "President Theodore Roosevelt",
    tags: ["justice", "law"]
  },
  {
    text: "Only man has law. Law must be built, do you understand me? You must build the law.",
    author: "Raphael Lemkin",
    tags: ["philosophy", "law"]
  },
  {
    text: "Let every man remember that to violate the law is to trample on the blood of his father, and to tear the charter of his own and his children’s liberty...",
    author: "President Abraham Lincoln",
    tags: ["liberty", "responsibility"]
  },
  {
    text: "We should stop looking to law to provide the final answer… Law cannot save us from ourselves…",
    author: "Philip K. Howard",
    tags: ["reflection", "society"]
  },
  {
    text: "Revolt and terror pay a price. Order and law have a cost.",
    author: "Carl Sandburg",
    tags: ["order", "law"]
  },
  {
    text: "Freedom isn’t free.",
    author: "Anonymous",
    tags: ["freedom"]
  },
  {
    text: "The purpose of the law is to prevent the strong from always having their way.",
    author: "Ovid",
    tags: ["justice", "power"]
  },
  {
    text: "The good of the people is the greatest law.",
    author: "Cicero",
    tags: ["justice", "people"]
  },
  {
    text: "All that makes existence valuable to any one depends on the enforcement of restraints upon the actions of other people.",
    author: "John Stuart Mill",
    tags: ["ethics", "law"]
  }
];

// Encapsulated Widget Class
class QuoteWidget {
  constructor({ quotes, interval = 12000 }) {
    this.quotes = quotes;
    this.currentIndex = 0;
    this.interval = interval;

    this.quoteBox = document.getElementById('quote-box');
    this.quoteText = document.getElementById('quote-text');
    this.quoteAuthor = document.getElementById('quote-author');
    this.newQuoteBtn = document.getElementById('new-quote-btn');

    // Dynamically read transition duration from CSS
    this.transitionDuration = parseFloat(
      getComputedStyle(this.quoteBox).transitionDuration
    ) * 1000;

    this.init();
  }

  init() {
    this.displayQuote(this.currentIndex, false);
    this.newQuoteBtn.addEventListener('click', () => {
      this.nextQuote();
      this.quoteBox.scrollIntoView({ behavior: 'smooth' });
    });
    setInterval(() => this.nextQuote(), this.interval);
  }

  displayQuote(index, animate = true) {
    if (animate) this.quoteBox.classList.add('fade-out');

    setTimeout(() => {
      const { text, author } = this.quotes[index];
      this.quoteText.innerHTML = `<span class="quote-icon">❝</span> "${text}"`;
      this.quoteAuthor.textContent = `- ${author}`;

      // Example compliance logging (extendable)
      this.logQuoteView(this.quotes[index]);

      this.quoteBox.classList.remove('fade-out');
    }, animate ? this.transitionDuration : 0);
  }

  nextQuote() {
    this.currentIndex = (this.currentIndex + 1) % this.quotes.length;
    this.displayQuote(this.currentIndex);
  }

  // Optional: log/track displayed quotes for compliance or analytics
  logQuoteView(quote) {
    console.log(`Displayed: "${quote.text}" by ${quote.author}`);
    // Future: send data to API, localStorage, etc.
  }

  // Optional: filter quotes by tag
  filterByTag(tag) {
    this.quotes = quotes.filter(q => q.tags.includes(tag));
    this.currentIndex = 0;
    this.displayQuote(this.currentIndex, false);
  }
}

// Initialize widget
new QuoteWidget({ quotes });
