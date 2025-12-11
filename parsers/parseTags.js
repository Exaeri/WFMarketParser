export function parseTags(itemList) {
    if (!Array.isArray(itemList) || itemList.length === 0)
        throw new Error('itemList must be a non-empty array');
    if (!itemList.every(item => item.tags && Array.isArray(item.tags)))
        throw new Error('Every item in itemList must have a tags array');

    const unique = new Set(itemList.flatMap(item => item.tags));
    
    return [...unique];
}