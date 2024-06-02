import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Error from "./pages/Error";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";

const App = () => {
     return (
          <>
               <BrowserRouter>
                    <Header />
                    <Routes>
                         <Route path="/" element={<Home />} />
                         <Route path="/about" element={<About />} />
                         <Route path="/sign-in" element={<SignIn />} />
                         <Route path="/sign-up" element={<SignUp />} />
                         <Route path="*" element={<Error />} />
                         <Route element={<PrivateRoute />}>
                              <Route path="/profile" element={<Profile />} />
                         </Route>
                    </Routes>
               </BrowserRouter>
          </>
     )
}

export default App
