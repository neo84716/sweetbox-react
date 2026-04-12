import { Outlet } from "react-router-dom";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import ScrollToTop from "./components/ScrollToTop"
function App() {

  return (
    <div>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
