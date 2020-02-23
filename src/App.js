import React, { useState, useEffect} from 'react'
import LiveNow from './pages/LiveNow'
import Schedule from './pages/Schedule'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, NavLink,} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import Clock from 'react-live-clock'
import ProgramsService from './services/Programs'
import { Loader } from 'semantic-ui-react'


function App() {

  const [livePrograms, setLivePrograms] = useState()
  const [allChannels, setallChannels] = useState()
  const [logos, setLogos] = useState()
  const [filteredPrograms, setFilteredPrograms] = useState([])
  const [showAll, setShowAll] = useState(true)


//fetch channels on first render 
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

//fetch live programs on first render
  useEffect(() => {
    let didCancel= false
    const  fetchMyAPI = async ()  => {
      console.log('live pr effect')
      try {const response = await ProgramsService.getLivePrograms()
        if (!didCancel) { // Ignore if we started fetching something else
          const programs = response.schedule.map(element =>{
            return element.programs
          })
          .flat()
          .sort((a, b)=> {
            return a.startTimeUTC - b.startTimeUTC;
          })
          setLivePrograms(programs)
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

// fetch channels for missing logos on first render (previousely there were not all channesl actually for those programs that live...) if image is missing using default image url
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
          const result = logos.map(logo=>{
          const logoUrl = 
          [{url: "https://www.childhood.org.au/app/uploads/2017/07/ACF-logo-placeholder-300x300.png",
          },
          {url: "https://www.childhood.org.au/app/uploads/2017/07/ACF-logo-placeholder-300x300.png",
          }]
          logo.logos=logo.logos.length===0?logoUrl:logo.logos
          return logo
        })
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
  console.log('channels', allChannels)

// when user chooses channel
  const HandleChooseChannel =(id)=>{
    console.log("card clicked")
    setShowAll(false)
    const NewfileredPrograms = filteredPrograms.concat(livePrograms
      .filter(program => program.channel.id === id))  
    console.log(NewfileredPrograms)

    setFilteredPrograms(NewfileredPrograms.sort((a, b)=> {
      return a.startTimeUTC - b.startTimeUTC
    }))
  }
  
//when user clicks chanel that was choosen before (undo)  
  const HandleRemoveChannel =(id)=>{
    const NewfileredPrograms = filteredPrograms
      .filter(program => program.channel.id !== id) 
    console.log('unclicked',NewfileredPrograms)

    setFilteredPrograms(NewfileredPrograms.sort((a, b)=> {
      return a.startTimeUTC - b.startTimeUTC
    }))
    if(NewfileredPrograms.length===0){
      setShowAll(true)
    }
  }
  //shows all channels again 
  const reset =()=>{
   setFilteredPrograms([])
   setShowAll(true)
  }

 if (!livePrograms||!allChannels||!logos) {
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
          <Menu inverted>
            <Menu.Item >
              <NavLink  to="/live">Live Now</NavLink>
            </Menu.Item>
            <Menu.Item link className="menuItem">
              <NavLink to="/schedule">Shedule</NavLink>
            </Menu.Item>
          </Menu>

          <h2 style={{textAlign:'left', margin:'1em'}}>Time <Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/Helsinki'} /></h2>

          <Route exact path="/" render={() => <LiveNow reset ={reset} HandleChooseChannel={HandleChooseChannel} HandleRemoveChannel={HandleRemoveChannel} showAll={showAll} livePrograms={livePrograms} filteredPrograms={filteredPrograms} allChannels={allChannels}  logos={logos} />} />
          <Route path="/live" render={() => <LiveNow reset ={reset} HandleChooseChannel={HandleChooseChannel} HandleRemoveChannel={HandleRemoveChannel} showAll={showAll} livePrograms={livePrograms} filteredPrograms={filteredPrograms} allChannels={allChannels}  logos={logos}/>} />
          <Route path="/schedule" render={() => <Schedule      allChannels={allChannels}  logos={logos}/>} />
        </div>
      </Router>

    </Container> 
  )
} 

export default App
