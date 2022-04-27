# MMM-GitQuotes

A Module for [MagicMirror](https://github.com/MichMich/MagicMirror) designed to
display the quotes from a json file on a github repository.

## Sample

![alt text](https://github.com/OscarVsp/MMM-GitQuotes/raw/main/example.png "Example")

## Module installation

**Clone the repository into MagicMirror/modules directory**
```bash
cd ~/MagicMirror/modules
git clone https://github.com/OscarVsp/MMM-GitQuotes.git
```

**Install the dependencies**
```
cd /MMM-GitQuotes
npm install
```

### Configuration

**Basic Example:**

```jsonc
{
  module: 'MMM-GitQuotes',
  position: 'bottom_left',
  config: {
    github_raw_url: 'https://raw.githubusercontent.com/OscarVsp/MMM-GitQuotes/main/quotes.json'
},
```

## Parameters

 
| Option           | Type  | Description
|----------------- |----------- |-----------
| `github_raw_url` | *Required* | The url of the json file on github (must be the raw url). <br /> **Type:** raw url <br /> **Default:** `https://raw.githubusercontent.com/OscarVsp/MMM-GitQuotes/main/quotes.json`
| `updateInterval` | *Optional* | The interval of time for the update (in second). <br /> **Type:** int <br /> **Default:** `60` ==> 1 min.
| `fadeSpeed` | *Optional* | The duration of the fade animation bewteen two quotes (in second). <br /> **Type:** int <br /> **Default:** `5` ==> 5 seconds.


## Attribution

Based on [MagicMirror-QuotesCatalog](https://github.com/salpar/MagicMirror-QuoteCatalog/) from Salpar.
