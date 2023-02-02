import { Home, Users, User, FileText, Inbox, Mail, FolderPlus, UserPlus, Cast, DollarSign, CreditCard } from 'react-feather'

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
  {
    id: 'install',
    title: 'Installs',
    icon: <FolderPlus size={20} />,
    navLink: '/install',
    restrictedTo: { role: ['publisher'] },
  },
  {
    id: 'live',
    title: 'Live Time',
    icon: <Cast size={20} />,
    navLink: '/live-time',
    restrictedTo: { role: ['publisher'] },
  },
  {
    id: 'referral',
    title:'Invitations',
    icon: <Inbox size={20}/>,
    navLink: '/invite',
    restrictedTo: {role:['publisher']}
  },
  {
    id: 'affiliate',
    title:'Affiliates',
    icon: <UserPlus size={20}/>,
    navLink: '/affiliate',
    restrictedTo: {role:['publisher']}
  },
  {
    id: 'earning',
    title:'Earnings',
    icon: <DollarSign size={20}/>,
    navLink: '/earning',
    restrictedTo: {role:['publisher']}
  },
  {
    id: 'payment',
    title:'Payments',
    icon: <CreditCard size={20}/>,
    navLink: '/payment',
    restrictedTo: {role:['publisher']}
  },
]
