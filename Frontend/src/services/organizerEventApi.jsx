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
         tagTypes: ["Events"],
        endpoints:(builder)=>(
            {
                getEvents:builder.query({
                    query:()=>"/organizer-events",
                    providesTags: ["Events"],
               }),
               getEventsbyId:builder.query({
                    query:(id)=>`/organizer-events/${id}`,     
               }),
               getEventSearch: builder.query({
                    query: ({ search = "", status = "" }) => ({
                        url: "/events",
                        params: {
                        search,
                        status,
                        },
                    }),
                }),
                createEvents:builder.mutation({
                    query:(payload)=>({
                        url:"/organizer-events",
                        method:"Post",
                        body:payload
                    }),
                    invalidatesTags: ["Events"],
                }),
                updateEvents:builder.mutation({
                    query:({payload,id})=>({
                        url:`/organizer-events/${id}`,
                        method:"PUT",
                        body:payload
                    }),
                    invalidatesTags: ["Events"],
                }),
                deleteEvent:builder.mutation({
                    query:({payload,id})=>({
                        url:`/organizer-events/${id}`,
                        method:"DELETE",
                        body:payload
                    }),
                    invalidatesTags: ["Events"],
                }),
            }
        )
            
    }
)
export const {
    useGetEventsQuery,
    useLazyGetEventsbyIdQuery,
    useUpdateEventsMutation,
    useCreateEventsMutation,
    useDeleteEventMutation,
    useGetEventSearchQuery,
    useLazyGetEventSearchQuery

}=OrganizerEventApi