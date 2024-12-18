import { configureStore } from "@reduxjs/toolkit";
import { cmsSlice } from "./cmsSlice";

export const store = configureStore({
    reducer: {
        // Auth: authSlice.reducer,
        Cms:  cmsSlice.reducer,
    }
})