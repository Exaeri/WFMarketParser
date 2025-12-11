import WFMApi from "./WFMarketApiJS/WFMApi.js"
import { txtOutput } from "./utility/txtoutput.js";
import { filterByTags } from "./utility/tagsFilter.js";
import { parseTags } from "./parsers/parseTags.js"
import {getAvgPrice} from "./parsers/parsePrices.js"

const folderName = 'output';

const items = await WFMApi.getAllItems();
const tags = parseTags(items);
txtOutput(tags, folderName, 'list_tags');

const warframes = filterByTags(items, ['warframe', 'set']);
txtOutput(warframes, folderName, 'list_warframe');
console.log(warframes[1]);
getAvgPrice(warframes[1]);

const syndicateWeapons = filterByTags(items, ['syndicate', 'weapon'], []);
txtOutput(syndicateWeapons, folderName, 'list_syndicateWeapons');

const etcWeapons = filterByTags(
    items,
    ['weapon'],
    ['component', 'prime', 'syndicate', 'blueprint', 'necramech']
);
txtOutput(etcWeapons, folderName, 'list_etcWeapons');

const primedWeapons = filterByTags(items, ['weapon', 'prime', 'set'], []);
txtOutput(primedWeapons, folderName, 'list_primedWeapons');

const allWeapons = filterByTags(
    items,
    ['weapon'],
    ['component', 'blueprint', 'necramech']
);
txtOutput(allWeapons, folderName, 'list_allWeapons');

const primaryWeapons = filterByTags(
    items,
    ['weapon', 'primary'],
    ['component', 'blueprint']
);
txtOutput(primaryWeapons, folderName, 'list_primaryWeapons');

const secondaryWeapons = filterByTags(
    items,
    ['weapon', 'secondary'],
    ['component', 'blueprint']
);
txtOutput(secondaryWeapons, folderName, 'list_secondaryWeapons');

const meleeWeapons = filterByTags(
    items,
    ['weapon', 'melee'],
    ['component', 'blueprint']
);
txtOutput(meleeWeapons, folderName, 'list_meleeWeapons');

const meleePrimed = filterByTags(
    items,
    ['weapon', 'melee', 'prime'],
    ['component', 'blueprint']
);
txtOutput(meleePrimed, folderName, 'list_meleePrimed');

const secondaryPrimed = filterByTags(
    items,
    ['weapon', 'secondary', 'prime'],
    ['component', 'blueprint']
);
txtOutput(secondaryPrimed, folderName, 'list_secondaryPrimed');

const primaryPrimed = filterByTags(
    items,
    ['weapon', 'primary', 'prime'],
    ['component', 'blueprint']
);
txtOutput(primaryPrimed, folderName, 'list_primaryPrimed');

const meleeSyndicate = filterByTags(
    items,
    ['weapon', 'melee', 'syndicate'],
    ['component', 'blueprint']
);
txtOutput(meleeSyndicate, folderName, 'list_meleeSyndicate');

const secondarySyndicate = filterByTags(
    items,
    ['weapon', 'secondary', 'syndicate'],
    ['component', 'blueprint']
);
txtOutput(secondarySyndicate, folderName, 'list_secondarySyndicate');

const primarySyndicate = filterByTags(
    items,
    ['weapon', 'primary', 'syndicate'],
    ['component', 'blueprint']
);
txtOutput(primarySyndicate, folderName, 'list_primarySyndicate');

const meleeEtcWeapons = filterByTags(
    items,
    ['weapon', 'melee'],
    ['component', 'prime', 'syndicate', 'blueprint', 'necramech']
);
txtOutput(meleeEtcWeapons, folderName, 'list_meleeEtcWeapons');

const secondaryEtcWeapons = filterByTags(
    items,
    ['weapon', 'secondary'],
    ['component', 'prime', 'syndicate', 'blueprint', 'necramech']
);
txtOutput(secondaryEtcWeapons, folderName, 'list_secondaryEtcWeapons');

const primaryEtcWeapons = filterByTags(
    items,
    ['weapon', 'primary'],
    ['component', 'prime', 'syndicate', 'blueprint', 'necramech']
);
txtOutput(primaryEtcWeapons, folderName, 'list_primaryEtcWeapons');

const augments = filterByTags(items, ['augment'], []);
txtOutput(augments, folderName, 'list_augments');

const mods = filterByTags(items, ['mod'], []);
txtOutput(mods, folderName, 'list_mods');

const arcanes = filterByTags(
    items,
    ['arcane_enhancement'],
    ['peculiar']
);
txtOutput(arcanes, folderName, 'list_arcanes');

const sentinels = filterByTags(items, ['sentinel', 'set']);
txtOutput(sentinels, folderName, 'list_sentinels');

const lens = filterByTags(items, ['lens'], []);
txtOutput(lens, folderName, 'list_lens');

const stances = filterByTags(items, ['stance'], []);
txtOutput(stances, folderName, 'list_stances');

const auras = filterByTags(items, ['aura'], []);
txtOutput(auras, folderName, 'list_auras');

const relics = filterByTags(items, ['relic'], []);
txtOutput(relics, folderName, 'list_relics');
