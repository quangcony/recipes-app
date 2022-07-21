import Home from '../pages/Home'
import Detail from '../pages/Detail'

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/:country', component: Home },
  { path: '/search/:keyword', component: Home },
  { path: '/search/:keyword/:country', component: Home },
  { path: '/detail/:id/recipe', component: Detail },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
