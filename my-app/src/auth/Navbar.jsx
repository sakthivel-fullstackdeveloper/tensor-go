import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const NavBar = () => {
  const NavigateNow = useNavigate()
  const [islogIn, SetLogIn] = useState(false)
  const [UserFullName, setuserfullName] = useState("")

  useEffect(() => {
    const checkloginSTATUS = () => {
      const token_value = localStorage.getItem("token")
      const stored_Name = localStorage.getItem("name")
      SetLogIn(!!token_value)
      setuserfullName(stored_Name || "")
    }
    checkloginSTATUS()
    window.addEventListener("userLoggedIn", checkloginSTATUS)
    window.addEventListener("userLoggedOut", checkloginSTATUS)
    return () => {
      window.removeEventListener("userLoggedIn", checkloginSTATUS)
      window.removeEventListener("userLoggedOut", checkloginSTATUS)
    }
  }, [])

  const DoLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("name")
    window.dispatchEvent(new Event("userLoggedOut"))
    SetLogIn(false)
    setuserfullName("")
    NavigateNow("/login")
  }

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">vedio chat </h1>
      <div className="flex items-center gap-4">
        {islogIn && <span className="font-medium">Hi, {UserFullName}</span>}

        {!islogIn ? (
          <>
            <button onClick={() => NavigateNow("/register")} className="hover:underline">Register</button>
            <button onClick={() => NavigateNow("/login")} className="hover:underline">Login</button>
          </>
        ) : (
          <>
            <button onClick={() => NavigateNow("/forgot")} className="hover:underline">Update Password</button>
            <button onClick={DoLogout} className="bg-red-500 px-4 py-1 rounded hover:bg-red-600">Logout</button>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar
