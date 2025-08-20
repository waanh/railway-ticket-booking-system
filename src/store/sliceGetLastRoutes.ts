import { IGetStatus, IItem } from '../models/interfaces';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiService } from '../API/apiService';
import { RootState } from '.';

export const getLastRoutesThunk = createAsyncThunk('sliceGetLastRoutes/getLastRoutesThunk', async () => {
  const response = await apiService.getLastRoutes();
  return response.data;
});

const initialState: IGetStatus<IItem[]> = {
  items: [],
  loading: false,
  error: false
};

export const sliceGetLastRoutes = createSlice({
  name: 'sliceGetLastRoutes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLastRoutesThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getLastRoutesThunk.fulfilled, (state, actions: PayloadAction<IItem[]>) => {
        state.loading = true;
        state.error = false;
        state.items = actions.payload;
      })
      .addCase(getLastRoutesThunk.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  }
});

export const sliceGetLastRoutesState = (state: RootState) => state.sliceGetLastRoutes
export default sliceGetLastRoutes.reducer;
