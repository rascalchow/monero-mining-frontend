import { useSelector } from 'react-redux'
import AdminUpdateEula from './admin'
import UserUpdateEula from './user'

const UpdateEula = () => {
  const userData = useSelector((state) => state.auth.userData)

  if (userData.role === 'admin') {
    return <AdminUpdateEula />
  }
  return <UserUpdateEula />
}

export default UpdateEula
