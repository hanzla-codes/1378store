import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orderId: null,
  success: false,
};

const order = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    orderSuccess: (state, { payload }) => {
      state.orderId = payload;
      state.success = true;
    },
    orderReset: (state) => {
      state.orderId = null;
      state.success = false;
    },
  },
});

export const { orderSuccess, orderReset } = order.actions;

export default order.reducer;
