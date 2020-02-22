import React from 'react'
import LivePrograms from '../components/LivePrograms'
import Channels from '../components/Channels'


const LiveNow = ({showAll, livePrograms, filteredPrograms, allChannels, logos, reset, HandleChooseChannel, HandleRemoveChannel})=> {

  return (
    <div> 
      <Channels showAll ={showAll} reset ={reset} channels={logos} HandleChooseChannel={HandleChooseChannel} HandleRemoveChannel={HandleRemoveChannel}/>  
      <LivePrograms livePrograms={showAll?livePrograms:filteredPrograms} channels={allChannels} logos={logos}/>
    </div>  
  )
}

export default LiveNow