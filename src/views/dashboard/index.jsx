import { useSelector } from 'react-redux'
import LoadingSpinner from '@components/spinner/Loading-spinner'
import AdminHome from './admin'
import PublisherHome from './publisher'

const Home = () => {
  const userData = useSelector((state) => state.auth.userData)
  if (userData === null) {
    return <LoadingSpinner />
  }
  if (userData.role === 'publisher') {
    return <PublisherHome />
  }
  return <AdminHome />
}

export default Home
