import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PRF from "../../assist/images/prf.png";
import { fetchWrapper } from "../../fetchWrapper";
export const getUsers = createAsyncThunk("allUsers/getusers", async () => {
  const data = await fetchWrapper.get("http://localhost:8000/UsersList");
  return data;
});

const initialState = {
  currentUser: {
    username: "",
    password: "",
    email: "",
    prf: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png",
    id: null,
  },
  allUsers: null,
  active: false,
};

const reducers = {
  login: (state, action) => {
    state.currentUser.username = action.payload.username;
    state.currentUser.password = action.payload.password;
    state.currentUser.email = action.payload.email;
    state.currentUser.prf = action.payload.prf;
    state.active = true;
    state.currentUser.id = action.payload.id;
  },
  logout: (state) => {
    state.active = false;
    state.currentUser.username = "";
    state.currentUser.email = "";
    state.currentUser.password = "";
    state.currentUser.prf = PRF;
    state.currentUser.id = null;
  },
  updateAccount: (state, action) => {
    state.currentUser = action.payload;
  },
};

const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers,
  /* extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allUsers = action.payload;
        state.error = "";
        action.payload.map((user) => {
          if (state.currentUser.username === user.username) {
            state.currentUser.id = user.id;
          }
        });
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },*/
});

export const { logout, login, updateAccount } = userSlice.actions;

export const currentUser = (state) => state.userState.currentUser;
export const user = (state) => state.userState.active;

export default userSlice.reducer;
