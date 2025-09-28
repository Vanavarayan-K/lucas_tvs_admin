import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byId: {
    "1": { id: "1", name: "Admin", email: "admin@test.com", contact: "1234567890", address: "City", role: "admin" }
  },
  allIds: ["1"],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUser: (state, action) => {
      const user = action.payload;
      state.byId[user.id] = user;
      state.allIds.push(user.id);
    },
    editUser: (state, action) => {
      const user = action.payload;
      if (state.byId[user.id]) state.byId[user.id] = user;
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      delete state.byId[id];
      state.allIds = state.allIds.filter((x) => x !== id);
    },
  },
});

export const { createUser, editUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
