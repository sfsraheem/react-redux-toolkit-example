import { configureStore } from "@reduxjs/toolkit";

import cardReducer from "./features/card/cardSlice";
import modalReducer from "./features/Modal/modalSlice";

export const store = configureStore({
  reducer: {
    card: cardReducer,
    modal: modalReducer,
  },
});
