// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'

const config = useJwt.jwtConfig
const jwt = useJwt

// ** Handle User Login
export const handleLogin = (data) => {
  return async (dispatch) => {
    await new Promise((resolve)=>{setTimeout(()=>{resolve(true)}, 1000)})
    const res = await jwt.login(data)

    dispatch({
      type: 'LOGIN',
      data:res.data.user,
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
// ** Handle User Register
export const handleRegister = (data) => {
  return async () => {
    await new Promise((resolve)=>{setTimeout(()=>{resolve(true)}, 1000)})
    await jwt.register(data)
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
