import React from 'react'
import { List, Image } from 'semantic-ui-react'


const LivePrograms =({livePrograms, channels, logos}) => {


const programs = livePrograms.map(element =>{
  return element.programs
})
.flat()
.sort(function(a, b) {
  return a.startTimeUTC - b.startTimeUTC;
})
.map(program=>{
  const logo = channels.find( ({ id }) => id === program.channel.id)
  program.logo=logo?logo.logos[2].url:null
  return program
})
.map(program=>{
  const logo = logos.find( ({ id }) => id === program.channel.id)
  program.logo=!program.logo&&logo?logo.logos[1].url:program.logo
  return program
})



console.log(programs)

  return (
    <div style={{marginTop:'4em'}}> 
    <h2>Live now on all channels</h2>

    <List divided relaxed size='huge'>
      {programs.map(program=>
        <List.Item key={program.id}>
          <Image avatar src={program.logo?program.logo:'https://kodi.tv/sites/default/files/styles/medium_crop/public/addon_assets/plugin.video.elisa.viihde/icon/icon.png?itok=ANCAlOsJ'} verticalAlign='middle'  />
           <List.Content>
           <List.Header as='a'>{program.name}</List.Header>
           <List.Description as='a'>Starts {program.startTime} / Ends {program.endTime}</List.Description>
           <List.Description as='a'>Available on <strong>{program.channel.name}</strong></List.Description>
           </List.Content>
        </List.Item>)}
    </List>
    </div>
  )
}

export default LivePrograms