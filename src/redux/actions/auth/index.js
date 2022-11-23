// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'

const config = useJwt.jwtConfig
const jwt = useJwt

// ** Handle User Login
export const handleLogin = (data) => {
  return async (dispatch) => {
    try {
      const res = await jwt.login(data)
      dispatch({
        type: 'LOGIN',
        data: res.user,
        config,
        [config.storageTokenKeyName]: data[config.storageTokenKeyName],
        [config.storageRefreshTokenKeyName]:
          data[config.storageRefreshTokenKeyName],
      })

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
}
// ** Handle User Register
export const handleRegister = (data) => {
  return async () => {
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

export const getAuth = () => {
  return async (dispatch) => {
    try {
      const data = await jwt.getUser()
      dispatch({
        type: 'SET_DATA',
        payload: {
          userData: data.user,
          token: data.token,
        },
      })

      // ** Add to user, accessToken & refreshToken to localStorage
      localStorage.setItem('userData', JSON.stringify(data.user))
      localStorage.setItem(config.storageTokenKeyName, data.token)
    } catch (error) {
      localStorage.removeItem('userData')
      localStorage.removeItem(config.storageTokenKeyName)
      dispatch({
        type: 'SET_DATA',
        payload: {
          userData: null,
          token: null,
        },
      })
    }
  }
}
