import React, { useState, useEffect} from 'react'
import LivePrograms from '../components/LivePrograms'
import Channels from '../components/Channels'
import ProgramsService from '../services/Programs'
import { Loader } from 'semantic-ui-react'

const LiveNow = ()=> {

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
          .sort(function(a, b) {
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

// fetch channels for missing logos on first render (previousely there were not all channesl actually...)
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
  console.log('channels', allChannels)


  const HandleChooseChannel =(id)=>{
    console.log("card clicked")
    setShowAll(false)
    const NewfileredPrograms = filteredPrograms.concat(livePrograms
      .filter(program => program.channel.id === id))  
	
    console.log(NewfileredPrograms)

    setFilteredPrograms(NewfileredPrograms)
  }

  const HandleRemoveChannel =(id)=>{
 
  
    const NewfileredPrograms = filteredPrograms
      .filter(program => program.channel.id !== id) 
	
    console.log('unclicked',NewfileredPrograms)

    setFilteredPrograms(NewfileredPrograms)
    if(NewfileredPrograms.length===0){
      setShowAll(true)
    }
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
    <div>
      <Channels channels={logos} HandleChooseChannel={HandleChooseChannel} HandleRemoveChannel={HandleRemoveChannel}/>     
      <LivePrograms livePrograms={showAll?livePrograms:filteredPrograms} channels={allChannels} logos={logos}/>
    </div>  
  )
}

export default LiveNow