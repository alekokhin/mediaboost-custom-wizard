import { buildRoute } from 'app/lazy-routing/build-route'
export const routes = [
  buildRoute({
    path: '/',
    factory: () => import('pages/home'),
    state: 'pending',
  }),
  buildRoute({
    path: 'new-property',
    factory: () => import('pages/new-property'),
    state: 'pending',
  }),
]
