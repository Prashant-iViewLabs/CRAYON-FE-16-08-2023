import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFilter: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSelectedFilter: (state, action) => {
      console.log(action.payload);
      state.selectedFilter = action.payload;
    },
  },
});

export const { setSelectedFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
