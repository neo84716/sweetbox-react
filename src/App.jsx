import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart"
import Theme  from "./pages/Theme"
import EmptyCart from "./pages/EmptyCart";
import ThemeDetail from "./pages/ThemeDetail";
import Home from "./pages/Home";

function App() {

  return (
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Theme" element={<Theme />}/>
        <Route path="/EmptyCart" element={<EmptyCart />}/>
        <Route path="/ThemeDetail" element={<ThemeDetail />}/>
      </Routes>
  )
}

export default App
