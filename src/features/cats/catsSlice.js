// Action Creators
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// async actions
export const fetchCats = createAsyncThunk("cats/fetchCats", () => {
  // return a Promise containing the data we want
  return fetch("https://learn-co-curriculum.github.io/cat-api/cats.json")
    .then((response) => response.json())
    .then((data) => data.images);
});

// Reducer
const initialState = {
  entities: [], // array of cats
  status: "idle", // loading state
};

const catsSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    catAdded(state, action) {
      // using createSlice lets us mutate state!
      state.entities.push(action.payload);
    },
    catUpdated(state, action) {
      const cat = state.entities.find((cat) => cat.id === action.payload.id);
      cat.url = action.payload.url;
    },
  },
  extraReducers: {
    // handle async action types
    [fetchCats.pending](state){
      state.status = "loading";
    },
    [fetchCats.fulfilled](state, action){
      state.entities = action.payload;
      state.status = "idle";
    }
  }
});

export const { catAdded, catUpdated } = catsSlice.actions;
export default catsSlice.reducer;
