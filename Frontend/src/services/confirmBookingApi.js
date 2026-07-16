import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ConfirmBookingApi=createApi(
    {
        reducerPath:"confirmbooking",
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
               confirmbooking:builder.query({
                    query:()=>"/bookings/my"
               })
            }
        )
    }
)
export const {
    useConfirmbookingQuery
}=ConfirmBookingApi