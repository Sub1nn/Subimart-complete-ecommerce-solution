export const useLoggedInUser = () => {
  const token = localStorage.getItem("token")

  if (token) {
    return true
  } else {
    return false
  }
}

export default useLoggedInUser
