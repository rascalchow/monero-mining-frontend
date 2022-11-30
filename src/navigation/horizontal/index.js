import { Home, Users, User, FileText, Inbox, Mail } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home',
  },
  {
    id: 'admins',
    title: 'Admins',
    icon: <User size={20} />,
    navLink: '/admin/list',
    restrictedTo: { role: ['admin'] },
  },
  {
    id: 'publishers',
    title: 'Publishers',
    icon: <Users size={20} />,
    navLink: '/publisher/list',
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
    restrictedTo: { role: ['publisher'] },
  },
]
