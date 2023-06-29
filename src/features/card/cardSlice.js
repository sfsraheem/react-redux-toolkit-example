import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
import axios from "axios";
import { openModal } from "../Modal/modalSlice";

const url = "https://www.course-api.com/react-useReducer-cart-project";

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (obj, thunkAPI) => {
    try {
      //****  if we pass any data we can get that in the first parameter of the callback function ****
      // console.log(obj);

      //**** */ we can get entire store state from thunk API getState function ****
      // console.log(thunkAPI.getState());

      //**** */ we can dispatch any reducer from another slice by thunk API dispatch function ****
      // thunkAPI.dispatch(openModal());

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("We can reject with custom response");
    }
  }
);
// export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
//   return fetch(url)
//     .then((response) => response.json())
//     .catch((err) => console.log(err));
// });

const initialState = {
  cardItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  // *** The object notation for `createSlice.extraReducers` is deprecated, and will be removed in RTK 2.0. Please use the 'builder callback' notation instead ****
  // extraReducers: {
  //   [getCartItems.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [getCartItems.fulfilled]: (state, action) => {
  //     console.log(action);
  //     state.cardItems = action.payload;
  //     state.isLoading = false;
  //   },
  //   [getCartItems.rejected]: (state) => {
  //     state.isLoading = false;
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        console.log(action);
        state.cardItems = action.payload;
        state.isLoading = false;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false;
      });
  },
  reducers: {
    clearCard: (state) => {
      state.cardItems = [];
    },
    removeItem: (state, action) => {
      // console.log(action);
      state.cardItems = state.cardItems.filter(
        (item) => item.id !== action.payload
      );
    },
    toggleItem: (state, action) => {
      const { payload } = action;
      const cartItem = state.cardItems.find((item) => item.id === payload.id);
      if (payload.action === "increase") {
        cartItem.amount = cartItem.amount + 1;
      } else {
        cartItem.amount = cartItem.amount - 1;
      }
    },
    calculateTotals: (state) => {
      let total = 0;
      let amount = 0;
      state.cardItems.forEach((item) => {
        total += item.amount * item.price;
        amount += item.amount;
      });
      state.total = total;
      state.amount = amount;
    },
  },
});

// console.log(cardSlice);

export const { clearCard, removeItem, toggleItem, calculateTotals } =
  cardSlice.actions;

export default cardSlice.reducer;
