import App from "../App";
import Cart from "../pages/Cart";
import EmptyCart from "../pages/EmptyCart";
import Home from "../pages/Home";
import Theme from "../pages/Theme";
import ThemeDetail from "../pages/ThemeDetail";
import Subscribe from "../pages/admin/Subscribe";

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
            path: "admin/subscribe",
            element: <Subscribe />
          }
        ]
      }
      
];

export default routes;
