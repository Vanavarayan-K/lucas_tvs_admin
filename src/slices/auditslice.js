import { createSlice } from "@reduxjs/toolkit";

const auditSlice = createSlice({
  name: "audit",
  initialState: { logs: [] },
  reducers: {
    addLog: (state, action) => {
      state.logs.unshift({ id: Date.now().toString(), ...action.payload });
      if (state.logs.length > 200) state.logs.pop();
    },
    clearLogs: (state) => {
      state.logs = [];
    },
  },
});

export const { addLog, clearLogs } = auditSlice.actions;
export default auditSlice.reducer;
