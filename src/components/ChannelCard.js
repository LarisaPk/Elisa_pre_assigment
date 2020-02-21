import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import  './ChannelCard.css'

const ChannelCard =({name, img}) => {

return (
  <div>
    <Card className ='channel_Card'>
      <Image src={img} wrapped ui={false} />
      <Card.Content>
      <Card.Header className ='channel_Card_header'>{name}</Card.Header>
    </Card.Content>
  </Card>
  </div>

  )
}

export default ChannelCard