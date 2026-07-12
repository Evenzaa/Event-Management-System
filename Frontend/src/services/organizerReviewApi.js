import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OrganizerReviewApi=createApi(
    {
        reducerPath:"Review",
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
               getReviewById:builder.query({
                    query:(eventId)=>`/reviews/event/${eventId}`,     
               }),
              
            }
        )
            
    }
)
export const {
   useGetReviewByIdQuery

}=OrganizerReviewApi