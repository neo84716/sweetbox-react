import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart"
import Theme  from "./pages/Theme"
import EmptyCart from "./pages/EmptyCart";

function App() {

  return (
      <Routes>
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Theme" element={<Theme />}/>
        <Route path="/EmptyCart" element={<EmptyCart />}/>
      </Routes>
  )
}

export default App
