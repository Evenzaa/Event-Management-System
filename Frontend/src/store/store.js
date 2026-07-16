import { configureStore } from "@reduxjs/toolkit";
import { OrganizerDashApiSlice } from "../services/organizerDashApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { OrganizerEventApi } from "../services/organizerEventApi";
import { OrganizerImgApi } from "../services/organizerImgApi";
import { OrganizerReviewApi } from "../services/organizerReviewApi";
import { OrganizerBookingApi } from "../services/organizerBookingApi";
import checkoutReducer from "./checkoutSlice"; // NEW

import { ConfirmBookingApi } from "../services/confirmBookingApi";

export const store=configureStore(
    {
        reducer:{
           [OrganizerDashApiSlice.reducerPath]:OrganizerDashApiSlice.reducer,
           [OrganizerEventApi.reducerPath]:OrganizerEventApi.reducer,
           [OrganizerImgApi.reducerPath]:OrganizerImgApi.reducer,
           [OrganizerReviewApi.reducerPath]:OrganizerReviewApi.reducer,
           [OrganizerBookingApi.reducerPath]:OrganizerBookingApi.reducer,
           checkout: checkoutReducer, // NEW
           [ConfirmBookingApi.reducerPath]:ConfirmBookingApi.reducer,





        },
        middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(
                    OrganizerDashApiSlice.middleware,
                    OrganizerEventApi.middleware,
                    OrganizerImgApi.middleware,
                    OrganizerReviewApi.middleware,
                    OrganizerBookingApi.middleware,
                    ConfirmBookingApi.middleware,




                )
    }
    

)

setupListeners(store.dispatch)
