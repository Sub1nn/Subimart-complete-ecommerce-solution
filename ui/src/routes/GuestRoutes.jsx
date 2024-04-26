import GuestGuard from "../guards/GuestGuard"
import MinimumLayout from "../layout/MinimumLayout"
import Login from "../page/Login"
import Register from "../page/Register"
// import Practice from "../page/practice"

const guestRoutes = [
  {
    path: "/",
    element: (
      <GuestGuard>
        <MinimumLayout />
      </GuestGuard>
    ),
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      // {
      //   path: "practice",
      //   element: <Practice />,
      // },
    ],
  },
]

export default guestRoutes
