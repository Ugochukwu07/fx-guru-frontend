import useSWR from "swr";
import { request } from "../service/base";

export const useCurrencies = (token) => {
    const currency = async () => {
        try {
            return await request.get("/v1/currencies", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                return res
            });
      } catch (err) {
        throw new Error("Failed to get user currencies");
      }
    }   

    const { data, error, mutate } = useSWR("currencies", currency);

    return {
        data: data,
        isLoading: !error && !data,
        isError: error || !data?.success,
        currencies: (data) => currency(data).then(mutate),
    };
};