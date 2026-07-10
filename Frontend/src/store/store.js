import { configureStore } from "@reduxjs/toolkit";
import { OrganizerDashApiSlice } from "../services/organizerDashApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { OrganizerEventApi } from "../services/organizerEventApi";

export const store=configureStore(
    {
        reducer:{
           [OrganizerDashApiSlice.reducerPath]:OrganizerDashApiSlice.reducer,
           [OrganizerEventApi.reducerPath]:OrganizerEventApi.reducer,

        },
        middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(
                    OrganizerDashApiSlice.middleware,
                    OrganizerEventApi.middleware

                )
    }
    

)

setupListeners(store.dispatch)
