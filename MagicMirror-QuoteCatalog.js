/* global Module */

/* MagicMirror²
 * Module: QuoteCatalog
 *
 * Author: Sally Park
 * Version: v1.0 - February 2018
 * MIT Licensed.
 */
Module.register("MMM-GitQuotes",{

    // Module config defaults.
    defaults: {
        updateInterval: 30,    // How often a new quote gets displayed.
        fadeSpeed: 30,           // How fast to fade out and back in when changing quotes.
        github_raw_url: "https://raw.githubusercontent.com/OscarVsp/MMM-GitQuotes/main/quotes.json"
    },

    getJSON: function(url, callback){
        //Get the json file from the github raw url
        var xmlhttprequest = new XMLHttpRequest();
        xmlhttprequest.open('GET', url, true);
        xmlhttprequest.responseType = 'json';
        xmlhttprequest.onload = function() {
            var status = xmlhttprequest.status;
            if (status == 200) {
                callback(null, xmlhttprequest.response);
            } else {
                callback(status, xmlhttprequest.response);
            }
        };
        xmlhttprequest.send();
    },

    getData: function(){
        //Load the data
        var self = this
        self.getJSON(self.config.github_raw_url,  function(err, data) {
            if (err != null) {
                Log.error(err);
                self.error = true;
                self.loaded = true;
            } else {
                Log.info(data);
                self.quotes = data;
                self.error = false;
                self.loaded = true;
            }
            self.updateDom(self.config.fadeSpeed * 1000);
        });
    }, 
    // Define start sequence.
    start: function() {
        this.quotes = [];
        this.loaded = false;
        this.error = false
        Log.info("Starting module: " + this.name);
        this.getData();

        this.lastQuoteIndex = -1;

        // Schedule update timer.
        var self = this;
        setInterval(function() {
            self.updateDom(self.config.fadeSpeed * 1000);
        }, this.config.updateInterval * 1000);
    },


    /* randomIndex(quotes)
     * Generate a random index for a list of quotes.
     *
     * argument quotes Array<String> - Array with quotes.
     *
     * return Number - Random index.
     */
    randomIndex: function(quotes) {
        if (quotes.length === 1) {
            return 0;
        }

        var generate = function() {
            return Math.floor(Math.random() * quotes.length);
        };

        var quoteIndex = generate();

        while (quoteIndex === this.lastQuoteIndex) {
            quoteIndex = generate();
        }

        this.lastQuoteIndex = quoteIndex;

        return quoteIndex;
    },

    /* quoteArray()
     * Retrieve an array of quotes from the catalog.
     *
     * return quotes Array<String> - Array with quotes from the catalog.
     */
    quoteArray: function() {
        return this.quotes[Object.keys(this.quotes)[Math.floor(Math.random() * Object.keys(this.quotes).length)]];
    },

    /* randomQuote()
     * Retrieve a random quote.
     *
     * return quote string - A quote.
     */
    randomQuote: function() {
        var quotes = this.quoteArray();
        var index = this.randomIndex(quotes);
        return quotes[index].split(" ~ ");
    },

    // Override dom generator.
    getDom: function() {
        if (this.loaded == false){
            var wrapper = document.createElement("div");

            var quote = document.createElement("div");
            quote.className = "bright small light";
            quote.style.textAlign = 'justify';
            quote.style.margin = '0 auto';
            quote.style.maxWidth = '400px';
            quote.innerHTML = "Loading quotes from github...";

            wrapper.appendChild(quote);

            return wrapper;
        } else if (this.error == true){
            var wrapper = document.createElement("div");

            var quote = document.createElement("div");
            quote.className = "bright small light";
            quote.style.textAlign = 'justify';
            quote.style.margin = '0 auto';
            quote.style.maxWidth = '400px';
            quote.innerHTML = "Error loading quotes. Check 'github_raw_url' value.";

            wrapper.appendChild(quote);

            return wrapper;
        } else {
            var quoteText = this.randomQuote();

            var qMsg = quoteText[0];
            var qAuthor = quoteText[1];

            var wrapper = document.createElement("div");

            var quote = document.createElement("div");
            quote.className = "bright small light";
            quote.style.textAlign = 'justify';
            quote.style.margin = '0 auto';
            quote.style.maxWidth = '400px';
            quote.innerHTML = qMsg;

            wrapper.appendChild(quote);

            var author = document.createElement("div");
            author.className = "light small dimmed";
            author.innerHTML = "~ " + qAuthor;

            wrapper.appendChild(author);

            return wrapper;
        }
    }

});