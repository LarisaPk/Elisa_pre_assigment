import React from 'react'
import LivePrograms from '../components/LivePrograms'
import Channels from '../components/Channels'

const LiveNow = ({livePrograms, channels})=> {

 if (!livePrograms||!channels) {
        return (
          <div>
            <h1>Loading...</h1>
          </div>  
        )
      }
  return (
    <div>
      
      <Channels channels={channels}/>
      
      <LivePrograms livePrograms={livePrograms}/>
    </div>  
  )
}

export default LiveNow