import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

type State = {
  classSearch: string,
  classHeader: string,
  classTitle: string,
  classLine: string,
  transform: boolean,
  success: boolean
};

const initialState: State = {
  classSearch: 'search__widget',
  classHeader: 'header',
  classTitle: 'header__title',
  classLine: 'header__endline',
  transform: false,
  success: false
};

export const sliceHeaderTransform = createSlice({
  name: 'sliceHeaderTransform',
  initialState,
  reducers: {
    transformHeader: (state) => {
      state.classHeader = 'header__transform';
      state.classSearch = 'search__transform';
      state.classTitle = 'none';
      state.classLine = 'none';
      state.transform = true;
      state.success = false;
    },
    transformHeaderToMain: (state) => {
      state.classSearch = 'search__widget';
      state.classHeader = 'header';
      state.classTitle = 'header__title';
      state.classLine = 'header__endline';
      state.transform = false;
      state.success = false;
    },
    transformHeaderSuccess: (state) => {
      state.success = true;
      state.classTitle = 'none';
      state.classSearch = 'none';
      state.classHeader = 'header__success';
    }
  }
});

export const {
  transformHeader,
  transformHeaderToMain,
  transformHeaderSuccess
} = sliceHeaderTransform.actions;

export const sliceHeaderTransformState = (state: RootState) => state.sliceHeaderTransform
export default sliceHeaderTransform.reducer;
