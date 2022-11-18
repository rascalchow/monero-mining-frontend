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
    path: '/user/list',
    component: lazy(() => import('../../views/user/list')),
    private: true,
  },
  {
    path: '/user/view/:id',
    component: lazy(() => import('../../views/user/view')),
    private: true,
  },
  {
    path: '/eula/edit',
    component: lazy(() => import('../../views/eula/edit')),
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
