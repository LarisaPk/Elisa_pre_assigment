import React, { useState, useEffect} from 'react'
import { Header, Image, Table, Button, Modal } from 'semantic-ui-react'
import ProgramsService from '../services/Programs'

const LivePrograms =({channels, livePrograms}) => {

const [programs, setPrograms] = useState([])
const [programId, setProgramId] = useState()
const [ChoosenChannel, setChoosenChannel] = useState()
const [programForDescripton, setProgramForDescripton] = useState()

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
        setPrograms(programs)    
}, [channels, livePrograms])

console.log(programs,'programs to show')

 //fetches programs today on choosen channel, finds one that needs for description and sets it in state
 useEffect(() => {
  let didCancel= false
  const date =new Date().toISOString().slice(0,10)
  const  fetchMyAPI = async ()  => {
    console.log('pr on channel today effect')
    try {const response = await ProgramsService.getProgramsOnChannel(ChoosenChannel.toString(), date)
      if (!didCancel) { // Ignore if we started fetching something else
        const program = response.schedule.map(element =>{
          return element.programs
        })
        .flat()
        .sort((a, b)=> {
          return a.startTimeUTC - b.startTimeUTC;
        })
        .find(program => program.id=== programId) 
        setProgramForDescripton(program)
      }
    }
    catch (e){
    console.log(e)
    }
  } 
  if (ChoosenChannel){
  fetchMyAPI()
}
  return () => {
    didCancel = true
  }        
}, [ChoosenChannel, programId])

const handleShowDescription =(channel, id)=>{
  setChoosenChannel(channel)
  setProgramId(id)
}
 console.log(programForDescripton, 'description')

//if nothing curentely live on the channel
if (programs.length===0) {
  return (
    <div>
      <h3>Nothing live now on this channel, choose another one</h3>
    </div>  
  )
}
  return (
    <div style={{marginTop:'4em'}}> 
    <h2 style={{textAlign:'center', margin:'1em'}}>Live now</h2>

        <Table basic='very' celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={3}>Channel</Table.HeaderCell>
            <Table.HeaderCell width={3}>Program name</Table.HeaderCell>
            <Table.HeaderCell width={2}>Strart time - end time</Table.HeaderCell>
            <Table.HeaderCell width={2}>Description</Table.HeaderCell>
          </Table.Row>
       </Table.Header>

         <Table.Body>
         {livePrograms.map(program=>
           <Table.Row key={program.id}>
              <Table.Cell>

                 <div style={{display:'flex', flexWrap:'wrap', flexDirection:'row', alignItems:'center'}}><img src={program.logo} style={{marginRight:'1em'}} alt='logo' /> <strong> {program.channel.name}</strong></div> 
                  
             </Table.Cell>
             <Table.Cell>{program.name}</Table.Cell>
             <Table.Cell>{program.startTime.slice(10)} - {program.endTime.slice(10)}</Table.Cell>
             <Table.Cell>

                <Modal trigger={<Button color='purple' onClick={()=>handleShowDescription(program.channel.id, program.id)}>Show details</Button>}>
                  <Modal.Header>Description</Modal.Header>
                  {programForDescripton?
                  <Modal.Content image>
                    <Image wrapped size='medium'  src={programForDescripton.thumbnails?programForDescripton.thumbnails[2].url:'https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png://cinemaone.net/images/movie_placeholder.png'}/>
                    <Modal.Description>
                      <Header>{programForDescripton.name}</Header>
                      <p>{programForDescripton.shortDescription}</p>
                      <p><strong>{programForDescripton.startTime.slice(10)} - {programForDescripton.endTime.slice(10)} Duration {programForDescripton.lengthMinutes} min</strong></p>
                    </Modal.Description>
                  </Modal.Content>
                  :<></>}
                </Modal>               
               
             </Table.Cell>
            </Table.Row>)}
         </Table.Body>
        </Table>

    </div>
  )
}

export default LivePrograms