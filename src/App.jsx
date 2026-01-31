import { Outlet, Link } from "react-router-dom";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
function App() {

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
