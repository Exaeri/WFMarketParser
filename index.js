import WFMParser from "./Parser/WFMParser.js";

////////////////Parsing from templates file/////////////////
const templateFileName = 'custom'; //Change file name here

import { readJSON } from "./Parser/Utils.js";
const templateFilePath = `./templates/${templateFileName}.json`;
const custom = await readJSON(templateFilePath);
WFMParser.parseTemplates(custom, true);
///////////////////////////////////////////////////////////


////////////////Parsing your own templates/////////////////
/*
//write your templates object
const myTemp = {
    "warframes": {
        "parse": true,
        "parsePrices": true,
        "tags": {
            "include": [
                "warframe",
                "set"
            ],
            "exclude": []
        }
    },
    "sentinels": {
        "parse": true,
        "parsePrices": true,
        "tags": {
            "include": ["sentinel", "set"],
            "exclude": []
        }
    }
}

WFMParser.parseTemplates(myTemp, true);
*/
//////////////////////////////////////////////////////////


////////////////Write parse manually///////////////////////
/*
import WFMApi from "./WFMarketApiJS/WFMApi.js"
import { fileOutput, sortByValues} from "./Parser/Utils.js";
const outputFolder = './output';

//getting all items from api
let marketItems = [];
try {
    marketItems = await WFMApi.getAllItems();
}
catch(error) {
    console.error('Error while getting items from api:', error);
}

//parse tags for tags file if needed
const tags = WFMParser.parseTags(marketItems);
await fileOutput(tags, outputFolder, 'list_tags');

//filter received items list by your tags
const syndicateWeapons = WFMParser.filterByTags(marketItems, ['syndicate', 'weapon']);
await fileOutput(syndicateWeapons, outputFolder, 'list_syndicateWeapons');

//parse prices for your filtered items list
console.log('\nParsing prices for syndicate weapons');
let receivedPrices = [];
try {
    receivedPrices = await WFMParser.parsePrices(syndicateWeapons)
}
catch (error) {
    console.error('Error while parsing prices:', error);
}
console.log(`Parsed prices for ${Object.keys(receivedPrices).length} items.`);

//sort received prices
const sortedDesc = sortByValues(receivedPrices); 
fileOutput(sortedDesc, outputFolder, 'prices_syndicateWeapons');
*/
///////////////////////////////////////////////////////////////
