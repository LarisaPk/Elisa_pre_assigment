import React, { useState, useEffect} from 'react'
import LiveNow from './pages/LiveNow'
import Schedule from './pages/Schedule'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, NavLink, Redirect} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import Clock from 'react-live-clock'
import ProgramsService from './services/Programs'
import { Loader } from 'semantic-ui-react'
import  './App.css'

function App() {

const [allChannels, setallChannels] = useState()

//fetch channels only on first render 
  useEffect(() => {
    let didCancel= false
    const  fetchMyAPI = async ()  => {
      try {const response = await ProgramsService.getAllChannels()
        console.log('all ch effect')
        if (!didCancel) { // Ignore if we started fetching something else
          setallChannels(response.channels)
        }
      }
      catch (e){
      console.log(e)
      }
    } 
    fetchMyAPI()
    return () => {
      didCancel = true
    }        
  }, [])

console.log('channels', allChannels)

 if (!allChannels) {
        return (
          <div>
            <h1>Loading...</h1>
            <Loader active inline='centered' size='huge'/>
          </div>  
        )
  }

  return (
    <Container>

      <Router>
        <div>
          <Menu >            
            <Menu.Item link>   
              <NavLink className='link' to="/live"  activeClassName="selected">Live Now </NavLink>
            </Menu.Item>

            <Menu.Item link >
              <NavLink className='link'  to="/schedule"  activeClassName="selected">Shedule</NavLink>
            </Menu.Item>
          </Menu>

          <h2 style={{textAlign:'center', margin:'1em'}}>Time <Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/Helsinki'} /></h2>

          <Route exact path="/" render={() => <Redirect to="/live" />} />
          <Route path="/live" render={() => <LiveNow  allChannels={allChannels}/>} />
          <Route path="/schedule" render={() => <Schedule allChannels={allChannels}/>} />

        </div>
      </Router>

    </Container> 
  )
} 

export default App
