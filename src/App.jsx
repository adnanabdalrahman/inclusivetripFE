import { useContext, useState } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Ratings from "./components/Ratings";
import CreateRating from "./components/CreateRating";
import User from "./components/User";
import Footer from "./components/Footer";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { AuthProvider, AuthContext } from "./components/AuthContext";
import Signup from "./components/Signup";

const MainLayout = () => {
  return (
     <div className="flex flex-col min-h-screen">
      <AuthProvider>
        <Navbar />
        <div className="flex-grow container mx-auto py-4">
          <Outlet />
        </div>
      </AuthProvider>
      <Footer />
    </div>
  );
};

const Protected = () => {
  const { userInfo, loading } = useContext(AuthContext);
  return <>{userInfo ? <Outlet /> : <Navigate to="/login" />}</>;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="ratings" element={<Ratings />} />
      <Route path="user" element={<User/>} />
       <Route path="create" element={<CreateRating />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="/" element={<Protected />}>
        {/* <Route path="myposts" element={<MyPosts />} /> */}
      </Route>
      {/* <Route path="post/:id" element={<Details />} /> */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
