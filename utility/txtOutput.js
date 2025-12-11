import { promises as fs } from 'fs';
import { type } from 'os';

/**
 * Creates a folder if it does not exist.
 * @param {string} folderName - Folder name to create.
 * @returns {Promise<number>} - A promise resolving to 0 if the folder was created successfully, or an error if there was an issue creating the folder.
 */
async function checkFolder(folderName) {
    if(typeof folderName !== 'string') throw new Error('Folder name must be string');
    
    try {
        await fs.mkdir(folderName, { recursive: true });
        return 0;
    } catch (err) {
        console.error('Error creating the folder:', err);
    }
}

/**
 * Saves an array of strings to a text file.
 * @param {Array<string>} dataToSave - The data to save to the file.
 * @param {string} path - The path to the folder where the file should be saved.
 * @param {string} fileName - File name to save.
 * @returns {Promise<void>} - A promise resolving when the file has been written successfully, or an error if there was an issue writing the file.
 */

export async function txtOutput(dataToSave, path, fileName) {
    if(!Array.isArray(dataToSave)) throw new Error('Data to save must be an array');
    if(typeof path !== 'string') throw new Error('Path must be string');
    if(typeof fileName !== 'string') throw new Error('File name must be string');

    const dataString = dataToSave.join('\n');
    checkFolder(path);
    try {
        await fs.writeFile(`${path}/${fileName}.txt`, dataString);
        console.log(`Output ${fileName}.txt file created`);
    } catch (err) {
        console.error('Error writing to the file:', err);
    }
}