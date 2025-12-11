import WFMApi from "../WFMarketApiJS/WFMApi.js";

export async function getAvgPrice(itemSlug){
    const topOrders = await WFMApi.getTopItemOrders(itemSlug);
    const topSellOrders = topOrders.sell;

    if (!topSellOrders ||topSellOrders.length === 0) 
        return 0;

    const sum = topSellOrders.reduce((acc, order) => acc + order.platinum, 0);
    return Math.round(sum / topSellOrders.length);
}