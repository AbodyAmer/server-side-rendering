import React from 'react'
import { throws } from 'assert';
class Grid extends React.Component{ 

    constructor(props){
        super(props)

        let repos 
        if(__isBrowser__){
            console.log('i am running')
            repos = window.__INITIAL_DATA__
            delete window.__INITIAL_DATA__
        }
        else {
            console.log('else is running')
            repos = this.props.staticContext.data
        }

        this.state = {
            repos, 
            loading: repos? false: true, 
            message: null
        }

        this.fetchRepos = this.fetchRepos.bind(this)
    }

    componentDidMount(){
        if(!this.state.repos){
            this.fetchRepos(this.props.match.params.id)
      
        }
    }

    componentWillReceiveProps(nextProps){
        const {match} = this.props
        if(match.params.id != nextProps.match.params.id){
            this.fetchRepos(nextProps.match.params.id)
        }
    }
   fetchRepos(lang){
       this.setState({loading: true})
       this.props.fetchIntialData(lang)
       .then(repos => {
           if(!repos){
               this.setState({message: 'API request exceed the limit' , loading:false})
           }
           this.setState({repos, loading: false})
       })
   }
    render(){
        console.log('this.props ' , this.props)
        const {repos, loading, message} = this.state

        if(loading) return <h1>Loading</h1>
        if(message !== null) return <h1>{this.state.message}</h1>
        return(
            <ul style={{display: 'grid' , gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', alignContent: 'center'}}>
                {repos.map(({name, owner, stargazers_count, html_url}) => (
                 <li key={name} style={{margin:30}}>
                     <ul>
                         <li><a href={html_url}>{name}</a></li>
                         <li>@{owner.login}</li>
                         <li>{stargazers_count} stars</li>
                     </ul>
                 </li>
                ))}
               
            </ul>

        )
    }
}
export default Grid