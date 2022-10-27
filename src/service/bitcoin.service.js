import axios from "axios"

export const bitcoinService = {
    getRate,
    // getMarketPriceHistory,
    // getAvgBlockSize,
}

async function getRate(currCoin) {
    try {
        const coinsValue = await axios.get('https://blockchain.info/ticker')
        const typeOfCoins=[]
        for (let coin in coinsValue.data) {
            typeOfCoins.push(coin)
        }
        return { bitCoinVal: coinsValue.data[currCoin], coinsTypes: typeOfCoins }

    } catch (err) {
        console.log(err);
    }
}