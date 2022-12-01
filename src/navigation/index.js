import { useHistory, useLocation } from 'react-router-dom'
export const useSearchParams = () => {
  const history = useHistory()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const setSearchParams = (state, reset = false) => {
    const searchParams = reset
      ? new URLSearchParams()
      : new URLSearchParams(location.search)

    Object.keys(state).forEach((key) => {
      if (state[key] === null || state[key] === '') {
        searchParams.delete(key)
      } else {
        searchParams.set(key, state[key])
      }
    })

    const searchString = searchParams.toString()
    history.push(
      location.pathname + (searchString.length > 0 && `?${searchString}`),
    )
  }

  return [searchParams, setSearchParams]
}
