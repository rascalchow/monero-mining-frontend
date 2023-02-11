import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/dashboard')),
    private: true,
  },
  {
    path: '/publisher/list',
    component: lazy(() => import('../../views/user/list')),
    private: true,
  },
  {
    path: '/admin/list',
    component: lazy(() => import('../../views/user/list')),
    private: true,
  },
  {
    path: '/publisher/:id',
    component: lazy(() => import('../../views/user/info')),
    private: true,
  },
  {
    path: '/eula/edit',
    component: lazy(() => import('../../views/eula')),
    private: true,
  },
  {
    path: '/invite',
    component: lazy(() => import('../../views/invite')),
    private: true
  },
  {
    path: '/product/edit',
    component: lazy(() => import('../../views/product/edit')),
    private: true,
  },
  {
    path: '/account-settings',
    component: lazy(() => import('../../views/account-settings')),
    private: true,
  },
  {
    path: '/installs',
    component: lazy(() => import('../../views/publisher/LiveTime')),
    private: true,
  },
  {
    path: '/live-time',
    component: lazy(() => import('../../views/publisher/Install')),
    private: true,
  },
  {
    path: '/app-users',
    component: lazy(() => import('../../views/publisher/AppUsers')),
    private: true,
  },
  {
    path: '/affiliate',
    component: lazy(() => import('../../views/user/info/partials/Invites')),
    private: true,
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/auth/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/register',
    component: lazy(() => import('../../views/auth/Register')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },

  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout',
  },
]

export { DefaultRoute, TemplateTitle, Routes }
