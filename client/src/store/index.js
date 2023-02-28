import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user: null,
  token: null,
  posts: [],
};

export const store = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload.posts;
    },
    setPost(state, action) {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setFriends(state, action) {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends does not exist");
      }
    },
    setMode(state, action) {
      state.mode = action.payload.mode === "dark" ? "light" : "dark";
    },
    setLogin(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout(state) {
      state.user = null;
      state.token = null;
    },
  },
});
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  store.actions;
export default store.reducer;
