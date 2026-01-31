📦 WFMarketParser — Get actual item's lists and prices from Warframe.Market

WFMarketParser is a Node.js tool for parsing data from the Warframe Market API. The project is written in ESM and is designed for automated parsing.<br>

<img width="976" height="439" alt="image" src="https://github.com/user-attachments/assets/2fea3e0c-3936-4af6-9bea-0c1065987f35" />

<h3>🚀Features</h3>
✔ Template-based parsing system<br>
✔ Fetch all tradable items from Warframe Market<br>
✔ Filter items by tags (include / exclude)<br>
✔ Calculate average prices<br>
✔ Sort by prices<br>
✔ Export result to JSON files<br>

<h3>Requirements</h3>
Node.js 18+<br>
Internet access (Warframe Market API)

<h3>📦Installation</h3>
<code>git clone https://github.com/Exaeri/WFMarketParser.git</code><br>
Install WFMarketApi submodule:<br>
<code>cd .\WFMarketParser\</code><br>
<code>git submodule update --init --recursive</code><br>
Install WFMarketApi dependencies:<br>
<code>cd .\WFMarketApiJS\</code><br>
<code>npm install</code><br>

<h3>Project Structure</h3>
WFMarketParser/<br>
 ├─ Parser/<br>
 │   ├─ WFMParser.js<br>
 │   └─ Utils.js<br>
 ├─ WFMarketApiJS/<br>
 │   └─ WFMApi.js<br>
 ├─ templates/<br>
 ├─ output/<br>
 │   ├─ lists/<br>
 │   └─ prices/<br>
 └─ index.js<br>

<h3>Usage</h3>
There are 3 ways to parse:
<ul>
  <li>Using/editing template file, i prepared some of them</li>
  <li>Write your own template in the code</li>
  <li>Write your own parsing by using core methods</li>
</ul>
All examples in main file (index.js).<br>
By default its parsing template file named "custom.json" which include: primed warframes, weapons, sentinels, lenses. <br>
Change template file name in main file: <br>
<code>const templateFileName = 'custom'</code> <br>
or edit this file for your needs.<br>
<br>
Template example for write manually in code:<br>
<code>const templates = {
    warframes: {
        parse: true,
        parsePrices: true,
        tags: {
            include: ['warframe', 'set'],
            exclude: []
        }
    },
    primedWeapons: {
        parse: true,
        parsePrices: true,
        tags: {
            include: ['weapon', 'prime', 'set'],
            exclude: []
        }
    }
};</code><br>
then parse it by using parseTemplate method:<br>
<code>WFMParser.parseTemplates(templates, true);</code><br>
If the second argument (true) is provided, a summary file will be generated<br><br>

Core Methods if you want to write your own parsing:<br>
<code>parseTags(itemList)</code>
Returns an array of unique market tags.<br>

<code>filterByTags(itemList, include, exclude)</code>
Filters items by tags and returns an array of item slugs.<br>

<code>parsePrices(itemList)</code>
Parses average prices for a list of items.<br>

<code>getAvgPrice(itemSlug)</code>
Returns the average price of an item
(includes in-memory caching).<br>

<code>parseTemplates(templates, summaryFile)</code>
Main entry point for template-based parsing.<br>

Utility Methods:<br>
<code>sortByValues(obj, desc = true)</code>
Sorts an object by its numeric values.<br>

<code>fileOutput(data, path, fileName)</code>
Writes data to a formatted JSON file.
