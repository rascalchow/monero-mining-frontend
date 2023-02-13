import LoadingSpinner from '@components/spinner/Loading-spinner'
import AdminHome from './admin'
import PublisherHome from './publisher'
import { useAuthCtx } from '@context/authContext'

const Home = () => {
  const { userData } = useAuthCtx();
  if (userData === null) {
    return <LoadingSpinner />
  }
  if (userData.role === 'publisher') {
    return <PublisherHome />
  }
  return <AdminHome />
}

export default Home
