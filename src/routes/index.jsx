import App from "../App";
import Cart from "../pages/Cart";
import EmptyCart from "../pages/EmptyCart";
import Home from "../pages/Home";
import Theme from "../pages/Theme";
import ThemeDetail from "../pages/ThemeDetail";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
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
            // {
            //     path: "admin/products",
            //     element: <AdminProducts />
            // }
        ]
    }
];

export default routes;
