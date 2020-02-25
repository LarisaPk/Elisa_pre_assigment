import React, { useState, useEffect } from 'react'
import LivePrograms from '../components/LivePrograms'
import Channels from '../components/Channels'
import { Loader } from 'semantic-ui-react'
import ProgramsService from '../services/Programs'
import Sticky from 'react-sticky-el'

const LiveNow = ({ allChannels }) => {

  const [livePrograms, setLivePrograms] = useState()
  const [filteredPrograms, setFilteredPrograms] = useState([])
  const [showAll, setShowAll] = useState(true)

  //fetch live programs
  useEffect(() => {
    let didCancel= false
    const  fetchMyAPI = async ()  => {
      console.log('live pr effect')
      try {const response = await ProgramsService.getLivePrograms()
        if (!didCancel) { // Ignore if we started fetching something else
          const programs = response.schedule.map(element => {
            return element.programs
          })
            .flat()
            .filter((program) => allChannels.find(({ id }) => program.channel.id === id))
            .sort((a, b) => {
              return a.startTimeUTC - b.startTimeUTC
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
  }, [allChannels])

  //when user chooses the channel
  const HandleChooseChannel =(id) => {
    console.log('card clicked')
    setShowAll(false)
    const NewfileredPrograms = filteredPrograms.concat(livePrograms
      .filter(program => program.channel.id === id))
    console.log(NewfileredPrograms)

    setFilteredPrograms(NewfileredPrograms.sort((a, b) => {
      return a.startTimeUTC - b.startTimeUTC
    }))
  }

  //when user clicks chanel that was choosen before (undo)
  const HandleRemoveChannel =(id) => {
    const NewfileredPrograms = filteredPrograms
      .filter(program => program.channel.id !== id)
    console.log('unclicked',NewfileredPrograms)

    setFilteredPrograms(NewfileredPrograms.sort((a, b) => {
      return a.startTimeUTC - b.startTimeUTC
    }))
    if(NewfileredPrograms.length===0){
      setShowAll(true)
    }
  }
  //shows all channels again
  const reset =() => {
    setFilteredPrograms([])
    setShowAll(true)
  }

  console.log('live programms',livePrograms)

  if (!livePrograms) {
    return (
      <div>
        <h1>Loading...</h1>
        <Loader active inline='centered' size='huge'/>
      </div>
    )
  }
  return (
    <div style={{ Zindex: 1 }}>
      <Sticky><Channels showAll ={showAll} reset ={reset} channels={allChannels} HandleChooseChannel={HandleChooseChannel} HandleRemoveChannel={HandleRemoveChannel}/></Sticky>
      <LivePrograms livePrograms={showAll?livePrograms:filteredPrograms} channels={allChannels}/>
    </div>
  )
}

export default LiveNow