import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWrapper } from "../../fetchWrapper";
const initialState = {
  allPosts: null,
};
export const getPosts = createAsyncThunk("allPosts/getposts", async () => {
  const data = await fetchWrapper.get("http://localhost:8000/PostList");
  return data;
});

export const postSlice = createSlice({
  name: "updatePost",
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.allPosts = action.payload;
    },
    manageError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allPosts = action.payload;
        state.error = "";
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.allPosts = null;
      });
  },
});

export const posts = (state) => state.updatePost.allPosts;
export const { updateData } = postSlice.actions;
export default postSlice.reducer;

/*{
  "usersList": [
    {
      "id": 2,
      "username": "zahra1885",
      "password": "abcdefgh",
      "email": "zahra1885@gmail.com",
      "prf": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
    },
    {
      "username": "uv380",
      "email": "rezaahmadpour28@gmail.com",
      "password": "Azer1831. ",
      "prf": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png",
      "id": 3
    },
    {
      "username": "reza67",
      "email": "rezaap1881@gmail.com",
      "password": "Reza1831. ",
      "prf": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png",
      "id": 4
    },
    {
      "username": "rezasfsf",
      "email": "rezaahmadpour88@gmail.com",
      "password": "Azer1831. ",
      "prf": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png",
      "id": 5
    },
    {
      "username": "reza32",
      "email": "rezareza32@gmail.com",
      "password": "Reza1831. ",
      "prf": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png",
      "id": 6
    },
    {
      "username": "reza4545",
      "email": "reza4545@gmail.com",
      "password": "Reza1831. ",
      "prf": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png",
      "id": 7
    }
  ],
  "PostList": [
    {
      "tittle": "sit amet2323consectetur",
      "text": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio maiores impedit voluptates ipsa facere ipsam asperiores sed deleniti fugit aperiam dolores, aut architecto suscipit? Tempora, id? Reiciendis, praesentium. Illum, impedit!",
      "img": "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      "author": "reza",
      "cat": {
        "categories": ["life", "music"]
      },
      "publicationDate": 1688853389430,
      "id": 1
    },
    {
      "tittle": "sit amet consectetur",
      "text": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio maiores impedit voluptates ipsa facere ipsam asperiores sed deleniti fugit aperiam dolores, aut architecto suscipit? Tempora, id? Reiciendis, praesentium. Illum, impedit!",
      "img": "https://images.pexels.com/photos/6758029/pexels-photo-6758029.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "author": "reza",
      "cat": {
        "categories": ["music", "sport"]
      },
      "publicationDate": 1688853389430,
      "id": 2
    },
    {
      "tittle": "sit amet consectetur",
      "text": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio maiores impedit voluptates ipsa facere ipsam asperiores sed deleniti fugit aperiam dolores, aut architecto suscipit? Tempora, id? Reiciendis, praesentium. Illum, impedit!",
      "img": "https://images.pexels.com/photos/6711867/pexels-photo-6711867.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      "author": "reza32",
      "cat": { "categories": ["style", "tech"] },
      "publicationDate": 1688853389430,
      "id": 3
    },
    {
      "tittle": "sit amet consectetur",
      "text": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio maiores impedit voluptates ipsa facere ipsam asperiores sed deleniti fugit aperiam dolores, aut architecto suscipit? Tempora, id? Reiciendis, praesentium. Illum, impedit!",
      "img": "https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      "author": "reza",
      "cat": {
        "categories": ["sport", "life"]
      },
      "publicationDate": 1688853389430,
      "id": 4
    },
    {
      "tittle": "sit amet consectetur",
      "text": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio maiores impedit voluptates ipsa facere ipsam asperiores sed deleniti fugit aperiam dolores, aut architecto suscipit? Tempora, id? Reiciendis, praesentium. Illum, impedit!",
      "img": "https://images.pexels.com/photos/4916559/pexels-photo-4916559.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      "author": "reza",
      "cat": {
        "categories": ["music", "tech"]
      },
      "publicationDate": 1688853389430,
      "id": 5
    }
  ]
}
*/
