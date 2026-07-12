import { configureStore } from "@reduxjs/toolkit";
import { OrganizerDashApiSlice } from "../services/organizerDashApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { OrganizerEventApi } from "../services/organizerEventApi";
import { OrganizerImgApi } from "../services/organizerImgApi";

export const store=configureStore(
    {
        reducer:{
           [OrganizerDashApiSlice.reducerPath]:OrganizerDashApiSlice.reducer,
           [OrganizerEventApi.reducerPath]:OrganizerEventApi.reducer,
           [OrganizerImgApi.reducerPath]:OrganizerImgApi.reducer,


        },
        middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(
                    OrganizerDashApiSlice.middleware,
                    OrganizerEventApi.middleware,
                    OrganizerImgApi.middleware

                )
    }
    

)

setupListeners(store.dispatch)
