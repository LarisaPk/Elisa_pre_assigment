import React, { useState, useEffect} from 'react'
import ProgramsService from './services/Programs'
import LiveNow from './pages/LiveNow'
import Schedule from './pages/Schedule'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, NavLink,} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

function App() {
  const [livePrograms, setLivePrograms] = useState()
  const [allChannels, setallChannels] = useState()
  const [logos, setLogos] = useState()

 //const [prgByDateandChannel, setPrgByDateandChannel] = useState([])


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

  useEffect(() => {
    let didCancel= false
    const  fetchMyAPI = async ()  => {
      console.log('live pr effect')
      try {const response = await ProgramsService.getLivePrograms()
        if (!didCancel) { // Ignore if we started fetching something else
          setLivePrograms(response.schedule)
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

  useEffect(() => {
    let didCancel= false
    const  fetchMyAPI = async ()  => {
      console.log('live pr effect')
      try {const response = await ProgramsService.getAllLogos()
        if (!didCancel) { // Ignore if we started fetching something else
          const logos = response.channels.map(channel=>({
            id: channel.id, 
            logos:channel.logos,
            name:channel.name
          }) 
          )
          const result = logos.filter(logo => logo.logos.length > 0)
          setLogos(result)
        console.log(result,'logos');
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
  console.log('live programms',livePrograms)
  console.log('all channels', allChannels)



  return (
    <Container>
      <Router>
        <div>
          <Menu inverted>
            <Menu.Item >
              <NavLink  to="/live">Live Now</NavLink>
            </Menu.Item>
            <Menu.Item link className="menuItem">
              <NavLink to="/schedule">Shedule</NavLink>
            </Menu.Item>

          </Menu>

          <Route exact path="/" render={() => <LiveNow livePrograms={livePrograms} channels={allChannels} logos={logos}/>} />
          <Route path="/live" render={() => <LiveNow livePrograms={livePrograms} channels={allChannels} logos={logos}/>} />
          <Route path="/schedule" render={() => <Schedule />} />
        </div>
      </Router>
    </Container> 
  )
} 

export default App
