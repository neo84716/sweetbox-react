import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart"
import Theme  from "./pages/Theme"

function App() {

  return (
      <Routes>
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Theme" element={<Theme />}/>      
      </Routes>
  )
}

export default App
