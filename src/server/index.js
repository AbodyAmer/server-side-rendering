import express from 'express'
import cors from 'cors'
import {renderToString} from 'react-dom/server'
import React from 'react'
import App from '../shared/app'
import serialize from 'serialize-javascript'
import {fetchPopularRepos} from '../shared/api'
import {matchPath, StaticRouter} from 'react-router-dom'
import routes from '../shared/routes'
const app = express()

app.use(cors())
app.use(express.static('public'))
app.get('*' , (req, res, next) => {
    const activeRoute = routes.find( route => matchPath(req.url , route)) || {}

    const promise = activeRoute.fetchIntialData
    ?  activeRoute.fetchIntialData(req.path)
    : Promise.resolve()


    promise.then((data) => {
        const context = { data }
         
        const markup = renderToString(
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        )
      
          console.log('req.url ' , req.url )
        res.send(`
        <!DOCTYPE HTML> 
        <html>
          <head>
            <title>SSR With React</title>
            <script src='/bundle.js' defer></script>
            <script>window.__INITIAL_DATA__=${serialize(data)}</script>
          </head>
          <body>
            <div id='app'>${markup}</app>
          </body>
        </html>
        `)
    })
    .catch(next)
  
})
app.listen(3000, () => console.log('Server is running on port 3000'))