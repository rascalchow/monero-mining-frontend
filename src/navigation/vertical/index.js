import { Home, Users, FileText, Inbox } from 'react-feather'

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
  },
  {
    id: 'eula-product',
    title: 'Edit Product',
    icon: <Inbox size={20} />,
    navLink: '/product/edit',
  },
]
