import { useState } from 'react'
// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'

const config = useJwt.jwtConfig
const jwt = useJwt

const useAuth = () => {
  const [userData, setUserData] = useState(null);

  // ** Handle User Login
  const handleLogin = async (data) => {
    try {
      const res = await jwt.login(data)
      setUserData(res.user)
      // ** Add to user, accessToken & refreshToken to localStorage
      localStorage.setItem('userData', JSON.stringify(res.user))
      localStorage.setItem(config.storageTokenKeyName, res.token)
      localStorage.setItem(
        config.storageRefreshTokenKeyName,
        JSON.stringify(data.refreshToken),
      )
    } catch (error) {
      localStorage.removeItem('userData')
      localStorage.removeItem(config.storageTokenKeyName)
      throw error
    }
  }
  // ** Handle User Register
  const handleRegister = async (data) => {
    await jwt.register(data)
  }

  // ** Handle User Logout
  const handleLogout = () => {
    setUserData(null);
    // ** Remove user, accessToken & refreshToken from localStorage
    localStorage.removeItem('userData')
    localStorage.removeItem(config.storageTokenKeyName)
    localStorage.removeItem(config.storageRefreshTokenKeyName)
  }

  const getAuth = async () => {
    try {
      const data = await jwt.getUser()
      setUserData(data.user);
      // ** Add to user, accessToken & refreshToken to localStorage
      localStorage.setItem('userData', JSON.stringify(data.user))
      localStorage.setItem(config.storageTokenKeyName, data.token)
    } catch (error) {
      localStorage.removeItem('userData')
      localStorage.removeItem(config.storageTokenKeyName)
      setUserData(null);
    }
  }


  return {
    userData,
    handleLogin,
    handleLogout,
    getAuth,
    handleRegister,
  }
}

export default useAuth
