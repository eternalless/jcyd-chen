import nav from './nav-config'
import auth from '../auth'

const loginSuccess = (to, from, next) => {
  if (auth.loggedIn()) {
    next({
      path: '/'
    })
  } else {
    next()
  }
}
const needloginSuccess = (to, from, next) => {
  if (!auth.loggedIn()) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
}
const getComponent = name => require(`../flight/admin/${name}.vue`)
const routers = [
  {path: '/', component: require('../flight/admin/index'), beforeEnter: needloginSuccess},
  {path: '/index', name: 'Index', component: require('../flight/index.vue')},
  {path: '/login', name: 'Login', component: require('../flight/admin/login'), beforeEnter: loginSuccess},
  {path: '/arr', name: 'Arr', component: require('../flight/flight-arriving.vue')},
  {path: '/belt-single', name: 'BeltSingle', component: require('../flight/flight-belt.vue')},
  {path: '/bor', name: 'Bor', component: require('../flight/flight-bording.vue')},
  {path: '/belt', name: 'Belt', component: require('../flight/flight-belt-single.vue')}
]

nav.forEach((mod) => {
  const subMenus = mod.children
  subMenus.forEach((subMenu) => {
    routers.push({
      beforeEnter: needloginSuccess,
      path: subMenu.path,
      name: subMenu.name,
      meta: {text: subMenu.text},
      component: getComponent(subMenu.name)
    })
  })
})

routers.push({
  path: '*',
  name: 'notfound',
  component: require('../flight/admin/notfound')
})

export default routers
