import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart"

function App() {

  return (
      <Routes>
        <Route path="/Cart" element={<Cart />} />       
      </Routes>
  )
}

export default App
