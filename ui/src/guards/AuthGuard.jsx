import React, { useEffect } from "react"
import useLoggedInUser from "../custom-hooks/useLoggedInUser"
import { useNavigate } from "react-router-dom"

const AuthGuard = (props) => {
  const isLoggedIn = useLoggedInUser
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
    }
  }, [isLoggedIn, navigate])

  return <>{isLoggedIn && props.children}</>
}

export default AuthGuard
