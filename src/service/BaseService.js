import axios from "axios";
import { baseURL } from "#/config/env";

const ApiClient = (others) => {
        const token = others.getState().auth.token
        //axiosInstance
        const axiosInstance = axios.create({
            //todo prod
            //baseURL: appConfig.prod.baseURL,
            //todo dev
            baseURL:  baseURL(),
            withCredentials: false,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })

        //interceptors request
        axiosInstance.interceptors.request.use(function (config) {
            config.headers.Authorization =  `${token}`
            console.log("Headers ===> ", config.headers)
            console.log("Url ===> ", config.baseURL + config.url)
            console.log("Request ===> ", config.data)
            return config;
        }, function (error) {
            console.log("Request Error ===> ",error.response.data)
            return Promise.reject(error);
        });

        //interceptors response
        axiosInstance.interceptors.response.use((response)=>{
            console.log("Response ===> ",response.data)
            return response
        },(error)=>{
            console.log("Response Error ===> ",error.response.data)
            return Promise.reject(error)
        })
        return axiosInstance
}

export const BaseService = {
    appClient: ApiClient,
}