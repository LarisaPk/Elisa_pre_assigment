import React from 'react'
import LivePrograms from '../components/LivePrograms'
import Channels from '../components/Channels'

const LiveNow = ({livePrograms, channels, logos})=> {

 if (!livePrograms||!channels||!logos) {
        return (
          <div>
            <h1>Loading...</h1>
          </div>  
        )
      }
  return (
    <div>
      <Channels channels={logos}/>     
      <LivePrograms livePrograms={livePrograms} channels={channels} logos={logos}/>
    </div>  
  )
}

export default LiveNow