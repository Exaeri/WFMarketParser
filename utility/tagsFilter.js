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
 * // Exclude specific types
 * const warframesSets = filterByTags(items, ['warframe'], ['set']);
 * // → []
 */
export function filterByTags(itemList, includeArr = [], excludeArr = []) {
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