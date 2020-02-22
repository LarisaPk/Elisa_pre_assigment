import React, { useState } from 'react'
import  './ChannelCard.css'

const ChannelCard =({name, img, HandleChooseChannel, HandleRemoveChannel, id}) => {

  const [clicked, setClicked] = useState(false)

  const handleClick =(id)=>{
    !clicked?HandleChooseChannel(id):HandleRemoveChannel(id)
    setClicked(!clicked)
  }

return (
  <div className ={!clicked?'channel_Card':'channel_CardClicked'} onClick={()=>handleClick(id)} >
    <img className ='channel_img'src={img} alt= {name}/>
    <div className ='channel_text'>
      {name}
    </div>
  </div>

  )
}

export default ChannelCard