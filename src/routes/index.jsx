import App from "../App";
import Cart from "../pages/Cart";
import CartCheckout from "../pages/CartCheckout";
import EmptyCart from "../pages/EmptyCart";
import Home from "../pages/Home";
import Subscription from "../pages/Subscription";
import Theme from "../pages/Theme";
import ThemeDetail from "../pages/ThemeDetail";
import Subscribe from "../pages/admin/Subscribe";
import SubscribeDetail from "../pages/admin/SubscribeDetail";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,   // 這樣就代表 "/" 對應 Home
        element: <Home />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "theme",
        element: <Theme />
      },
      {
        path: "themeDetail",
        element: <ThemeDetail />
      },
      {
        path: "emptyCart",
        element: <EmptyCart />
      },
      {
        path: "subscription",
        element: <Subscription />
      },
      {
        path: "admin/subscribe",
        element: <Subscribe />
      },
      {
        path: "admin/subscribeDetail",
        element: <SubscribeDetail />
      },
      { 
        path: "cartCheckout", 
        element: <CartCheckout /> 
      }
    ]
  }
];

export default routes;
