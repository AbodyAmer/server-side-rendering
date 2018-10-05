import React from 'react'
import {NavLink} from 'react-router-dom'

export default function Navbar() {
     const language = [
         {
             name: 'all', 
             param: 'all'
         }, 
         {
             name: 'JavaScript', 
             param: 'javascript'
         }, 
         {
            name: 'Java', 
            param: 'java'
        }, 
        {
            name: 'Ruby', 
            param: 'ruby'
        }, 
         
     ]

     return(
         <ul>
             {language.map(({name, param}) => (
                 <li key={param}>
                   <NavLink activeStyle={{fontWeight: "bold"}} to={`/popular/${param}`}>
                     {name}
                   </NavLink>
                 </li>
             ))}
         </ul>
     )
}

