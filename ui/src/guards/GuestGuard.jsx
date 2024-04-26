import React from "react"
import useLoggedInUser from "../custom-hooks/useLoggedInUser"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const GuestGuard = (props) => {
  const isLoggedIn = useLoggedInUser()
  const navigate = useNavigate()

  const { pathname } = useLocation()

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home")
    }
    if (pathname === "/" && !isLoggedIn) {
      navigate("/login")
    }
  }, [isLoggedIn, navigate, pathname])

  return <>{!isLoggedIn && props.children}</>
}

export default GuestGuard
