import axios from "axios";

export const sampCoinPriceService =()=>{
    const options = {
        method: 'GET',
        url: 'https://coinranking1.p.rapidapi.com/coins',
        params: {
            referenceCurrencyUuid: 'yhjMzLPhuIDl',
            timePeriod: '24h',
            'tiers[0]': '1',
            orderBy: 'marketCap',
            orderDirection: 'desc',
            limit: '50',
            offset: '0'
        },
        headers: {
            'X-RapidAPI-Key': 'b4733c54f9msh0b12923951e0488p183fabjsn975a2d42ce6d',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };

    return axios.request(options);

}