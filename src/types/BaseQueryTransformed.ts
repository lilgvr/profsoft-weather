import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "../utils/constants";

type BaseQueryType = BaseQueryFn<string | FetchArgs,
    unknown,
    FetchBaseQueryError>

/*export const baseQueryTransformed: BaseQueryType = async (
    args, api, extraOptions
) => {
    let res = await fetchBaseQuery({
        baseUrl: API_URL
    })
}*/
