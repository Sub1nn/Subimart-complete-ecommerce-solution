import MinimumLayout from "../layout/MinimumLayout";
import Login from "../page/Login";
import Register from "../page/Register";
import Practice from "../page/practice";

const guestRoutes = [
  {
    path: "/",
    element: <MinimumLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "practice",
        element: <Practice />,
      },
    ],
  },
];

export default guestRoutes;
