import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OrganizerBookingApi=createApi(
    {
        reducerPath:"Booking",
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
               getBookingById:builder.query({
                    query:(eventId)=>`/organizer-events/${eventId}/bookings`,     
               }),
              
            }
        )
            
    }
)
export const {
   useGetBookingByIdQuery

}=OrganizerBookingApi