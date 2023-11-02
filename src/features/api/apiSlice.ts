import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const baseUrl = "http://localhost:8080/api";

export const apiSlice = createApi({
    reducerPath: "api",
    tagTypes: [ "Categories"],
    endpoints: (builder) => ({}),
    baseQuery: fetchBaseQuery({ 
        baseUrl: baseUrl ,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            headers.set('Access-Control-Allow-Origin', '*');
            return headers
        }
    })
});