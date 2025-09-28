import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authslice";
import usersReducer from "../slices/userslice";
import auditReducer from "../slices/auditslice";
import { saveState, loadState } from "../utils/persist";

const persisted = loadState();

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    audit: auditReducer,
  },
  preloadedState: persisted,
});

// persist on change
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
