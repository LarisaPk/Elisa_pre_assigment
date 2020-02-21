import React, { useState, useEffect} from 'react'
import ProgramsService from './services/Programs'
import LiveNow from './pages/LiveNow'
import { Container } from 'semantic-ui-react'


function App() {
  const [livePrograms, setLivePrograms] = useState()
  const [allChannels, setallChannels] = useState()
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


  console.log('live programms',livePrograms)
  console.log('all channels', allChannels)

  //livePrograms.forEach(element => console.log(element))

  return (
    <Container>
      LOGO  LIVE NOW  SCHEDULE

      
      <LiveNow livePrograms={livePrograms}  channels={allChannels}/>
    </Container> 
  )
}

export default App
