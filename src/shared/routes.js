import Home from './home'
import Grid from './grid'
import {fetchPopularRepos} from './api'

const routes = [
    {
        path:'/', 
        exact: true, 
        component: Home
    }, 
    {
        path: '/popular/:id', 
        component: Grid, 
        fetchIntialData: (path = '') => fetchPopularRepos(path.split('/').pop())
    }
]

export default routes