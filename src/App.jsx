import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import EditPost from "./components/edit/EditPost";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { currentUser, user } from "./redux/features/userSlice";
import { useSelector } from "react-redux";

import Exs from "./components/exs/Exs";
import CategoriesHome from "./categoriesHome/CategoriesHome";
import MypostsPage from "./pages/mypostspage/MypostsPage";
import { useEffect } from "react";
import { fetchWrapper } from "./fetchWrapper";
import { posts } from "./redux/features/postSlice";
import SearchRes from "./pages/search/SearchRes";

function App() {
  /*const post = useSelector(posts);
  useEffect(() => {
    console.log(post);
  }, [post]);
  const s = useSelector(currentUser);
  useEffect(() => {
    console.log(s);
  }, [s]);*/

  const active = useSelector(user);

  return (
    // <Exs />

    <>
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/edit" element={<EditPost />} />
        <Route path="/posts" element={<Homepage />} />
        <Route
          path="/register"
          element={active ? <Homepage /> : <Register />}
        />
        <Route path="/single" element={<Single />} />
        <Route path="/write" element={active ? <Write /> : <Login />} />
        <Route path="/settings" element={active ? <Settings /> : <Login />} />
        <Route path="/categories" element={<CategoriesHome />} />
        <Route path="/myposts" element={active ? <MypostsPage /> : <Login />} />
        <Route path="/login" element={active ? <Homepage /> : <Login />} />
        <Route path="/search" element={<SearchRes />} />
      </Routes>
    </>
  );
}

export default App;
//        <Route path="*" element={<NoMatch />} />
