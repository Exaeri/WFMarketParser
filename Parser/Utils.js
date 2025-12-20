import { promises as fs } from 'fs';

/**
 * Saves data to a JSON file.
 *
 * @param {Object|Array} dataToSave - Data to save (object or array).
 * @param {string} path - Directory where the file should be saved.
 * @param {string} fileName - File name.
 * @returns {Promise<void>}
 *
 * @throws {Error} If arguments have invalid types.
 */
export async function fileOutput(dataToSave, path, fileName) {
    if (typeof dataToSave !== 'object' || dataToSave === null)
        throw new Error('Data to save must be an object');

    if (typeof path !== 'string')
        throw new Error('Path must be string');

    if (typeof fileName !== 'string')
        throw new Error('File name must be string');

    const jsonString = JSON.stringify(dataToSave, null,2);

    try {
        await fs.mkdir(path, { recursive: true });
        await fs.writeFile(`${path}/${fileName}.json`, jsonString);
        console.log(`Output file created: ${fileName}.json `);
    } catch (err) {
        console.error('Error writing to the file:', err);
    }
}

/**
 * Sorts an object by its values.
 *
 * @param {Record<string, number>} obj - Object with numeric values.
 * @param {boolean} [desc=true] - Sort descending if true.
 * @returns {Record<string, number>} New sorted object.
 */
export function sortByValues(obj, desc = true) {
    return Object.fromEntries(
        Object.entries(obj).sort((a, b) => desc ? b[1] - a[1] : a[1] - b[1])
    );
}

export const consColor = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
  
    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",
  
    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m"
  }


/**
 * Reads and parses a JSON file.
 *
 * @param {string} filePath - Path to the JSON file.
 * @returns {Promise<Object>} Parsed JSON object.
 *
 * @throws {Error} If file cannot be read or JSON is invalid.
 */
export async function readJSON(filePath) {
    if (typeof filePath !== 'string')
        throw new Error('filePath must be a string');

    const data = await fs.readFile(filePath, 'utf-8');

    try {
        return JSON.parse(data);
    } catch (err) {
        throw new Error(`Invalid JSON in file ${filePath}`);
    }
}
