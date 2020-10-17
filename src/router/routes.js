
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/albums', component: () => import('pages/Albums.vue') },
      { path: '/albums/:id', component: () => import('pages/Album.vue') }
      // { path: '/posters', component: () => import('pages/Posters.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
