import { getCoinList } from "../service/coinService"

export const coinPrice =  getCoinList().then(res => {
    const mainPair = res.coins

    const featured = mainPair.slice(0, 3)

    return { mainPair, featured }
})