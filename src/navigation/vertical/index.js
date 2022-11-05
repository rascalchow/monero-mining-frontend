import { Mail, Home, Users } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home',
  },
  {
    id: 'users',
    title: 'Users',
    icon: <Users size={20} />,
    navLink: '/user/list',
  },
]
