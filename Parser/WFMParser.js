import WFMApi from '../WFMarketApiJS/WFMApi.js';
import { consColor, fileOutput, sortByValues } from './Utils.js'; 
export default class WFMParser {
    static #pricesCache = new Map();
    static #baseOutputFolder = './output';

    /**
     * Extracts and returns a list of unique market tags from items.
     *
     * @param {{ tags: string[] }[]} itemList - Array of market item objects.
     * @returns {string[]} Array of unique tags.
     *
     * @throws {Error} If itemList is empty or contains items without a tags array.
     */
    static parseTags(itemList) {
        if (!Array.isArray(itemList) || itemList.length === 0)
            throw new Error('itemList must be a non-empty array');
        if (!itemList.every(item => item.tags && Array.isArray(item.tags)))
            throw new Error('Every item in itemList must have a tags array');

        const unique = new Set(itemList.flatMap(item => item.tags));
        return [...unique];
    }

    /**
     * Filters items by required and excluded tags, returning their slugs.
     *
     * @param {Array<Object>} itemList - Array of item objects.
     * @param {string[]} includeArr - List of tags that each item must include. Cannot be empty.
     * @param {string[]} [excludeArr=[]] - List of tags that items must NOT include. Optional.
     *
     * @returns {string[]} Array of item slugs that match the filtering rules.
     *
     * @throws {Error} If includeArr is not an array.
     * @throws {Error} If excludeArr is not an array.
     * @throws {Error} If includeArr is empty.
     *
     * @example
     * // Get all warframes sets
     * const warframes = filterByTags(items, ['warframe', 'set']);
     */
    static filterByTags(itemList, includeArr = [], excludeArr = []) {
        if (!Array.isArray(itemList) || itemList.length === 0)
            throw new Error('itemList must be a non-empty array');

        if (!Array.isArray(includeArr) || includeArr.length === 0)
            throw new Error('includeArr must be a non-empty array');

        if (!Array.isArray(excludeArr))
            throw new Error('excludeArr must be an array');

        if (!itemList.every(item => item.tags && Array.isArray(item.tags)))
            throw new Error('Every item in itemList must have a tags array');

        const filtered = itemList
        .filter(item =>
            includeArr.every(tag => item.tags.includes(tag)) &&
            excludeArr.every(tag => !item.tags.includes(tag))
        )
        .map(item => item.slug);

        return filtered;
    }

    /**
     * Gets the average platinum price based on top sell orders from Warframe Market.
     *
     * If the item's price is already cached, it returns the cached value.
     * Otherwise, it fetches the top sell orders of the item using WFMApi.getTopItemOrders,
     * calculates the average price and caches it.
     *
     * @param {string} itemSlug - Item Slug name.
     * @returns {Promise<number>} The average price of the item.
     * @throws {Error} If itemSlug is empty or if WFMApi.getTopItemOrders throws an error.
     */
    static async getAvgPrice(itemSlug) {
        if (!itemSlug || typeof itemSlug !== 'string') {
            throw new Error('itemSlug must be a non-empty string');
        }
        if (this.#pricesCache.has(itemSlug)) {
            return this.#pricesCache.get(itemSlug);
        }

        const topOrders = await WFMApi.getTopItemOrders(itemSlug);
        const topSellOrders = topOrders.sell;

        if (!topSellOrders || topSellOrders.length === 0) {
            this.#pricesCache.set(itemSlug, 0);
            return 0;
        }

        const sum = topSellOrders.reduce((acc, order) => acc + order.platinum, 0);
        const avg = Math.round(sum / topSellOrders.length);
        this.#pricesCache.set(itemSlug, avg);
        return avg;
    }

    /**
     * Parses the average price of each item in itemList.
     *
     * @param {string[]} itemList - Array of item slugs.
     * @returns {Promise<Record<string, number>>} An object where the keys are item slugs and the values are their average prices.
     * @throws {Error} If itemList is empty or if WFMApi.getTopItemOrders throws an error.
     */
    static async parsePrices(itemList) {
        if (!Array.isArray(itemList) || itemList.length === 0) {
            throw new Error('itemList must be a non-empty array');
        }

        const result = {};
        let index = 0;
        for (const item of itemList) {
            index++;
            process.stdout.write(`Progress: ${consColor.FgMagenta}${index}/${itemList.length}\r${consColor.Reset}`);
            const avgPrice = await this.getAvgPrice(item);
            if(avgPrice===0)
                continue;
            result[item] = avgPrice;
            if(index===itemList.length)
                process.stdout.write(`${consColor.FgGreen}[+]${consColor.Reset} Success: ${consColor.FgMagenta}${index}/${itemList.length}\r${consColor.Reset}`);
        }
        console.log(``);
        return result;
    }

    /**
     * Parses object templates and writes result to the json files.
     *
     * @param {Object<string, {
     *   parse: boolean,
     *   parsePrices?: boolean,
     *   tags: {
     *     include: string[],
     *     exclude: string[]
     *   }
     * }>} object - Templates configuration object.
     *
     * @param {boolean} [summaryFile=false] - Whether to generate a combined prices summary.
     *
     * @throws {Error} If the templates object is empty.
     */
    static async parseTemplates(object, summaryFile = false) {
        if(Object.keys(object).length === 0) throw new Error('Empty object');

        console.log(`Staring templates parsing. Got next templates: ${consColor.FgCyan}${Object.keys(object).join(', ')}${consColor.Reset}\n`);

        console.log('Getting all tradable items from API...');
        let allItems = [];
        try {
            allItems = await WFMApi.getAllItems();
        }
        catch (error) {
            console.error('Error while getting items:', error);
            return;
        }
        console.log(`${consColor.FgGreen}[+]${consColor.Reset} Success. Total tradable items: ${consColor.FgGreen}${allItems.length}${consColor.Reset}`);

        const marketTags = this.parseTags(allItems);
        console.log(`Found ${consColor.FgGreen}${marketTags.length}${consColor.Reset} unique market tags`);
        await fileOutput(marketTags, `${this.#baseOutputFolder}/lists`, 'list_tags');

        let summaryPrices = {};

        for (const [key, value] of Object.entries(object)) {
            if(!value.parse) continue;

            console.log(`\nProcessing ${consColor.FgCyan}${key}${consColor.Reset}`);
            let parsedList = this.filterByTags(allItems, value.tags.include, value.tags.exclude);
            console.log(`Total items found: ${consColor.FgGreen}${parsedList.length}${consColor.Reset}`);
            await fileOutput(parsedList, `${this.#baseOutputFolder}/lists`, `list_${key}`);

            if(value.parsePrices) {
                console.log(`Parsing prices...`);
                let parsedPrices = [];
                try {
                    parsedPrices = await this.parsePrices(parsedList);
                }
                catch (error) {
                    console.log(error);
                    return;
                }
                const sortedResult = sortByValues(parsedPrices);
                await fileOutput(sortedResult, `${this.#baseOutputFolder}/prices`, `prices_${key}`);

                if(summaryFile) {
                    Object.assign(summaryPrices, parsedPrices);
                }
            }
        }

        if(summaryFile) {
            const sortedSummary = sortByValues(summaryPrices);
            await fileOutput(sortedSummary, `${this.#baseOutputFolder}/prices`, `prices_summary`);
        }
    }
}