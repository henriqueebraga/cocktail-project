import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddCocktail from '@/components/AddCocktail'
import EditCocktail from '@/components/EditCocktail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-cocktail',
      name: 'AddCocktail',
      component: AddCocktail
    },
    {
      path: '/edit-cocktail/:drink_slug',
      name: 'EditCocktail',
      component: EditCocktail
    }
  ]
})
