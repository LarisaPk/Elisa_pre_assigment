import React, { useState, useEffect} from 'react'
import { Header, Image, Table } from 'semantic-ui-react'
import Clock from 'react-live-clock'

const LivePrograms =({livePrograms, channels, logos}) => {
console.log(livePrograms)
const [programs, setPrograms] = useState([])

//adds logos
useEffect(() => { 
        const programs = livePrograms
        .filter(function( element ) {
          return element !== undefined
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
        setPrograms(programs)    
}, [channels, livePrograms, logos])

console.log(programs,'programs to show')

//there is one channel in the slider that has nothing live (Motorvision TV (tilapäinen)).
if (programs.length===0) {
  return (
    <div>
      <h3>Nothing live now on this channel, choose another one</h3>
    </div>  
  )
}
  return (
    <div style={{marginTop:'4em'}}> 
    <h2 style={{textAlign:'left', margin:'1em'}}>Time <Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/Helsinki'} /></h2>
    <h2 style={{textAlign:'center', margin:'1em'}}>Live now</h2>

        <Table basic='very' celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}>Channel</Table.HeaderCell>
            <Table.HeaderCell width={4}>Program name</Table.HeaderCell>
            <Table.HeaderCell width={4}>Strart time - end time</Table.HeaderCell>
          </Table.Row>
       </Table.Header>

         <Table.Body>
         {programs.map(program=>
           <Table.Row key={program.id}>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src={program.logo?program.logo:'https://kodi.tv/sites/default/files/styles/medium_crop/public/addon_assets/plugin.video.elisa.viihde/icon/icon.png?itok=ANCAlOsJ'}  size='small' />
                 <Header.Content>
                  {program.channel.name}
                 </Header.Content>
                </Header>
             </Table.Cell>
             <Table.Cell>{program.name}</Table.Cell>
             <Table.Cell>{program.startTime.slice(10)} - {program.endTime.slice(10)}</Table.Cell>
            </Table.Row>)}
         </Table.Body>
        </Table>

    </div>
  )
}

export default LivePrograms