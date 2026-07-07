import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OrganizerEventApi=createApi(
    {
        reducerPath:"Event",
        baseQuery:fetchBaseQuery({
            baseUrl:import.meta.env.VITE_API_BASE_URL,
            prepareHeaders:(headers)=>{
                const token=localStorage.getItem('authToken')
                if(token){
                    headers.set("Authorization",`Bearer ${token}`)
                }
                const lang='en'
                headers.set("Accept-Language",lang)
                return headers
            }
        }),
        endpoints:(builder)=>(
            {
               getEvents:builder.query({
                    query:()=>"/events/events"
               })
            }
        )
    }
)
export const {
    useGetEventsQuery
}=OrganizerEventApi