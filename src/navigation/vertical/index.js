import { Home, Users, FileText } from 'react-feather'

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
    restrictedTo: { role: ['admin'] },
  },
  {
    id: 'eula-edit',
    title: 'Edit Eula',
    icon: <FileText size={20} />,
    navLink: '/eula/edit',
    restrictedTo: { role: ['admin'] },
  },
]
