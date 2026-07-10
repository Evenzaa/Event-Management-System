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
                    query:()=>"/organizer-events"
               }),
               getEventsbyId:builder.query({
                    query:(id)=>`/organizer-events/${id}`,     
               }),
                createEvents:builder.mutation({
                    query:(payload)=>({
                        url:"/organizer-events",
                        method:"Post",
                        body:payload
                    })
                }),
                updateEvents:builder.mutation({
                    query:({payload,id})=>({
                        url:`/organizer-events/${id}`,
                        method:"PUT",
                        body:payload
                    })
                }),
                deleteEvent:builder.mutation({
                    query:({payload,id})=>({
                        url:`/organizer-events/${id}`,
                        method:"DELETE",
                        body:payload
                    })
                }),
            })
            
    }
)
export const {
    useGetEventsQuery,
    useLazyGetEventsbyIdQuery,
    useUpdateEventsMutation,
    useCreateEventsMutation,
    useDeleteEventMutation,

}=OrganizerEventApi