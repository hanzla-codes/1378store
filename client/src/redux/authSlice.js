import { createSlice } from "@reduxjs/toolkit";
import cookie from "js-cookie";

let userInfoFromCookie = cookie.get("userInfo");
try {
  if (userInfoFromCookie) {
    userInfoFromCookie = JSON.parse(userInfoFromCookie);
  } else {
    userInfoFromCookie = null;
  }
} catch (error) {
  userInfoFromCookie = null;
}

const initialState = {
  userInfo: userInfoFromCookie,
};

const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addUserInfo: (state, { payload }) => {
      state.userInfo = payload;
      cookie.set("userInfo", JSON.stringify(payload));
    },
    removeUserInfo: (state) => {
      state.userInfo = null;
      cookie.remove("userInfo");
    },
  },
});

export const { addUserInfo, removeUserInfo } = auth.actions;

export default auth.reducer;
