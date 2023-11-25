import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sampCoinPriceService } from "../service/sampCoinPriceService";
import axios from "axios";

const action = {
    getCoinList: createAsyncThunk(
        'prices/action/getCoinList', 
        async (data, {rejectWithValue}) => {
            try {
                const response = async () => {
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
                const {data} = await response();
                return data.data
            }catch (error) {
                console.error(error);
                return rejectWithValue(error.response.data);
            }
    })
}

const initialState = {
    prices: [],
    isLoading: false,
    error: null,
    success: false,
}

const pricesSlice = createSlice({
    name: "prices",
    initialState,
    reducers: {
        pricesStart: (state) => {
            state.isLoading = true;
            state.error = null;
            state.success = false;
        },
        pricesSuccess: (state, { payload }) => {
            state.prices = payload;
            state.isLoading = false;
            state.success = true;
        },
        pricesFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(action.getCoinList.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(action.getCoinList.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.success = true;
        });
        builder.addCase(action.getCoinList.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});

// export const { pricesStart, pricesSuccess, pricesFailure } = ;

export const prices = {
    mutations: pricesSlice.actions,
    reducer: pricesSlice.reducer,
    actions: action,
}