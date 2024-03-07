import { createSlice } from "@reduxjs/toolkit";
import cookie from "js-cookie";

let cartItemsFromStorage = cookie.get("cartItems");
try {
  cartItemsFromStorage =
    cartItemsFromStorage && JSON.parse(cartItemsFromStorage)
      ? JSON.parse(cartItemsFromStorage)
      : [];
} catch (err) {
  cartItemsFromStorage = [];
}

let shippingFromStorage = cookie.get("shippingAddress");
try {
  shippingFromStorage =
    shippingFromStorage && JSON.parse(shippingFromStorage)
      ? JSON.parse(shippingFromStorage)
      : null;
} catch (err) {
  shippingFromStorage = null;
}

const calculateSubTotal = (cartItems) => {
  return cartItems.reduce((pre, cur) => {
    return (pre += cur.price * cur.qty);
  }, 0);
};

const calculateShippingPrice = (cartItems) => {
  const subTotal = calculateSubTotal(cartItems);
  if (subTotal < 5000) {
    return 200;
  }
  return 0;
};

const calculateSaleTax = (cartItems) => {
  const subTotal = calculateSubTotal(cartItems);
  return Math.round((subTotal / 100) * 16);
};

const calculateTotalPrice = (cartItems) => {
  return (
    calculateSubTotal(cartItems) +
    calculateSaleTax(cartItems) +
    calculateShippingPrice(cartItems)
  );
};

const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingFromStorage,
  subTotal: calculateSubTotal(cartItemsFromStorage),
  shippingPrice: calculateShippingPrice(cartItemsFromStorage),
  saleTax: calculateSaleTax(cartItemsFromStorage),
  totalPrice: calculateTotalPrice(cartItemsFromStorage),
};

const cart = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const { payload } = action;
      const itemExist = state.cartItems.find(
        (item) => item.product === payload.product
      );
      if (itemExist) {
        // update
        state.cartItems = state.cartItems.map((item) =>
          item.product === payload.product ? payload : item
        );
      } else {
        // add
        state.cartItems = [...state.cartItems, payload];
      }
      cookie.set("cartItems", JSON.stringify(state.cartItems));
      state.subTotal = calculateSubTotal(state.cartItems);
      state.saleTax = calculateSaleTax(state.cartItems);
      state.shippingPrice = calculateShippingPrice(state.cartItems);
      state.totalPrice = calculateTotalPrice(state.cartItems);
    },
    removeFromCart: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== payload
      );
      cookie.set("cartItems", JSON.stringify(state.cartItems));
      state.subTotal = calculateSubTotal(state.cartItems);
      state.saleTax = calculateSaleTax(state.cartItems);
      state.shippingPrice = calculateShippingPrice(state.cartItems);
      state.totalPrice = calculateTotalPrice(state.cartItems);
    },
    addShippingAddress: (state, { payload }) => {
      state.shippingAddress = payload;
      cookie.set("shippingAddress", JSON.stringify(state.shippingAddress));
    },
  },
});

export const { addToCart, removeFromCart, addShippingAddress } = cart.actions;

export default cart.reducer;
