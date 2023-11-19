import React from "react";
import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectorIsAuth } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectorIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/posts/:id" element={<FullPost />}></Route>
          <Route path="/add-post" element={<AddPost />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          {/* <Home /> */}
          {/* <FullPost /> */}
          {/* <AddPost /> */}
          {/* <Login /> */}
          {/* <Registration /> */}
        </Routes>
      </Container>
    </>
  );
}

export default App;
