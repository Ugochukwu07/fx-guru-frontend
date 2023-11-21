import useSWR from "swr";
import { request } from "../service/base";

export const useProfile = (token) => {
    const fetchProfile = async () => {
        try {
            const response = await request.get("/v1/user/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (err) {
            throw new Error("Failed to get user profile");
        }
    };

    const { data, error, mutate } = useSWR("profile", fetchProfile);
    console.log("Data:", data);
    console.log("Error:", error);

    return {
        user: data,
        isLoading: !error && !data,
        isError: error || !data?.success,
        profile: () => fetchProfile().then(mutate),
    };
};
