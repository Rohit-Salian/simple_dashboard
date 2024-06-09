import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterItem {
  id: number;
  value: string;
}

interface FilterState {
  filter: FilterItem | null;
  alldata: null;
}

const initialState: FilterState = {
  filter: null,
  alldata: null,
};

const filterSlice = createSlice({
  name: "theFilter",
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<FilterItem>) => {
      state.filter = action.payload;
    },
    resetFilter: (state) => {
      state.filter = null;
    },
    alldata: (state, action: PayloadAction<FilterItem>) => {
      state.alldata = action.payload;
    },
  },
});

export const { addFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
