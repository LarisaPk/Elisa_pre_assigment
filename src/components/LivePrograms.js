import React from 'react'
import { List, Image } from 'semantic-ui-react'


const LivePrograms =({livePrograms}) => {



const programs = livePrograms.map(element =>  element.programs)
.flat()
.sort(function(a, b) {
  return a.startTimeUTC - b.startTimeUTC;
})

console.log(programs)

  return (
    <div style={{marginTop:'4em'}}> 
    <h2>Live now on all channels</h2>

    <List divided relaxed size='huge'>
      {programs.map(program=>
        <List.Item key={program.id}>
          <Image avatar src='http://images.elisaviihde.fi/logos/100x100/yle_tv1.png' verticalAlign='middle'  />
           <List.Content>
           <List.Header as='a'>{program.name}</List.Header>
           <List.Description as='a'>Starts {program.startTime} / Ends {program.endTime}</List.Description>
           </List.Content>
        </List.Item>)}
    </List>
    </div>
  )
}

export default LivePrograms