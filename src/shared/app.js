import React from 'react'
import {Route, Switch} from 'react-router-dom'
import routes from './routes'
import Nomatch from './noMatch.'
import Navbar from './navbar'

class App extends React.Component { 
    render(){
        return(
            <div>
                <Navbar />
                <Switch>
                {routes.map(({path, exact, component: C, ...rest}) => (
                    <Route 
                       key={path}
                       path={path}
                       exact={exact}
                       render={(props) => (
                           <C {...props} {...rest}/>
                       )}
                    />
                ))}
                <Route render={ props => <Nomatch {...props}/>} />
                </Switch>
            </div>
        )
    }
}

export default App