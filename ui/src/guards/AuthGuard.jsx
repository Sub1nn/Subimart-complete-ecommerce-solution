import React from "react"
import useLoggedInUser from "../custom-hooks/useLoggedInUser"

const AuthGuard = (props) => {
  const isLoggedIn = useLoggedInUser
  console.log(isLoggedIn)

  return <div>{props.children}</div>
}

export default AuthGuard
