import MainLayout from "../layout/MainLayout";
import About from "../page/About";
import AddProduct from "../page/AddProduct";
import CartPage from "../page/CartPage";
import EditProduct from "../page/EditProduct";
import Home from "../page/Home";
import ProductDetail from "../page/ProductDetail";
import ProductList from "../page/ProductList";

const mainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "product/list",
        element: <ProductList />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "product/add",
        element: <AddProduct />,
      },
      {
        path: "product/detail/:id",
        element: <ProductDetail />,
      },
      {
        path: "product/edit/:id",
        element: <EditProduct />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
];

export default mainRoutes;
