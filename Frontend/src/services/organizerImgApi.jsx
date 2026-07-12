import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OrganizerImgApi=createApi(
    {
        reducerPath:"Event-img",
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
                
                uploadImg:builder.mutation({
                    query:({payload})=>({
                        url:`/upload`,
                        method:"POST",
                        body:payload
                    }),
                }),
            }
        )
            
    }
)
export const {
   useUploadImgMutation

}=OrganizerImgApi