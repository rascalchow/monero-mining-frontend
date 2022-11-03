// ** UseJWT import to get config
import axios from 'axios'
import useJwt from '@src/auth/jwt/useJwt'

const config = useJwt.jwtConfig
const jwt = useJwt

// ** Handle User Login
export const handleLogin = (data) => {
  return async (dispatch) => {
    const res = await jwt.login({email: 'admin@nurev.com', password: 'NureVAdmin!2#'})
    dispatch({
      type: 'LOGIN',
      data:res.user,
      config,
      [config.storageTokenKeyName]: data[config.storageTokenKeyName],
      [config.storageRefreshTokenKeyName]:
        data[config.storageRefreshTokenKeyName],
    })

    // ** Add to user, accessToken & refreshToken to localStorage
    localStorage.setItem('userData', JSON.stringify(res.data.user))
    localStorage.setItem(
      config.storageTokenKeyName,
      res.data.token,
    )
    localStorage.setItem(
      config.storageRefreshTokenKeyName,
      JSON.stringify(data.refreshToken),
    )
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOGOUT',
      [config.storageTokenKeyName]: null,
      [config.storageRefreshTokenKeyName]: null,
    })

    // ** Remove user, accessToken & refreshToken from localStorage
    localStorage.removeItem('userData')
    localStorage.removeItem(config.storageTokenKeyName)
    localStorage.removeItem(config.storageRefreshTokenKeyName)
  }
}
