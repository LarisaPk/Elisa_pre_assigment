import React, { useState, useEffect} from 'react'
import Channels from '../components/Channels'
import DatePicker from 'react-date-picker'
import ProgramsService from '../services/Programs'
import { Header, Image, Table, Button, Modal} from 'semantic-ui-react'
import  './cards.css'
import Sticky from 'react-sticky-el'

const Schedule = ({allChannels})=> {

  const [date, setDate] = useState(new Date())
  const [channels, setChannells] = useState([])
  const [programs, setPrograms] = useState('')
  const [noChosenChannels, setNoChosenChannels] = useState(true)

 //fetch programs when channels or date change
 useEffect(() => {
  let didCancel= false
  const channelsFormatted =channels.toString()
  const dateFormatted =date.toISOString().slice(0,10)
  const  fetchMyAPI = async ()  => {
    console.log('shedule effect')
    try {const response = await ProgramsService.getProgramsOnChannel(channelsFormatted, dateFormatted)
      if (!didCancel) { // Ignore if we started fetching something else
        const programs = response.schedule.map(element =>{
          return element.programs
        })
        .flat()
        .map(program=>{
          const logo = allChannels.find( ({ id }) => id === program.channel.id)
          program.logo=logo?logo.logos[2].url:null
          return program
        })
        .sort((a, b)=> {
          return a.startTimeUTC - b.startTimeUTC;
        })
        setPrograms(programs)
      }
    }
    catch (e){
    console.log(e)
    }
  } 
  if (channels.length>0){
  fetchMyAPI()
}
  return () => {
    didCancel = true
  }        
}, [allChannels, channels, date])

//date is picked from the calendar
  const onChange = date => {
    setDate( date )
  }

//when channel clicked 
  const handleAddChahhel =(id)=>{
    console.log("channel shedule clicked")
    const newChannels = channels.concat(id)
    setChannells(newChannels)
    setNoChosenChannels(false)
  }

//when user clicks chanel that was choosen before (undo)  
  const HandleRemoveChannel =(id)=>{

    const newChannels = channels
     .filter(channel => channel!== id) 
      setChannells(newChannels)

    const fileredPrograms = programs
      .filter(program => program.channel.id !== id) 
      .sort((a, b)=> {
        return a.startTimeUTC - b.startTimeUTC;
      })

    setPrograms(fileredPrograms)

    if(fileredPrograms.length===0){
      setNoChosenChannels(true)
      setPrograms('')
      setChannells([])
    }
}

//resets choosen chanells
  const reset=()=>{
    setPrograms('')
    setChannells([])
    setNoChosenChannels(true)
  }
  
  console.log(typeof(startDate),date, 'date' )
  console.log(programs, 'programs on choosen channel' )

  return (
    <div>
      <div style={{display:'flex', flexWrap:'wrap', flexDirection:'row', alignItems:'baseline'}}>
          <h2 style={{marginRight:'1em'}}>Choose the date</h2>
          <DatePicker
            onChange={e => onChange(e)}
            value={date}
            format={'dd/MM/yy'}
            clearIcon={null}
      />
      </div>

      <Sticky><Channels channels={allChannels} HandleChooseChannel={handleAddChahhel} reset={reset} HandleRemoveChannel={HandleRemoveChannel} showAll={noChosenChannels}/></Sticky>
      
      {programs?<Table basic='very' celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}>Channel</Table.HeaderCell>
            <Table.HeaderCell width={2}>Program name</Table.HeaderCell>
            <Table.HeaderCell width={2}>Date</Table.HeaderCell>
            <Table.HeaderCell width={2}>Strart time - end time</Table.HeaderCell>
            <Table.HeaderCell width={2}>Description</Table.HeaderCell>
          </Table.Row>
       </Table.Header>

         <Table.Body>
         {programs.map(program=>
           <Table.Row key={program.id}>
              <Table.Cell>

                 <div style={{display:'flex', flexWrap:'wrap', flexDirection:'row', alignItems:'center'}}><img src={program.logo} style={{marginRight:'1em'}} alt='logo' /> <strong> {program.channel.name}</strong></div> 
                  
             </Table.Cell>
             <Table.Cell>{program.name}</Table.Cell>
             <Table.Cell>{program.startTime.slice(0,10)}</Table.Cell>
             <Table.Cell>{program.startTime.slice(10)} - {program.endTime.slice(10)}</Table.Cell>
             <Table.Cell>

                <Modal trigger={<Button color='purple'>Show details</Button>}>
                  <Modal.Header>Description</Modal.Header>
                  <Modal.Content image>
                    <Image wrapped size='medium'  src={program.thumbnails?program.thumbnails[2].url:'https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png://cinemaone.net/images/movie_placeholder.png'}/>
                    <Modal.Description>
                      <Header>{program.name}</Header>
                      <p>{program.shortDescription}</p>
                      <p><strong>{program.startTime.slice(10)} - {program.endTime.slice(10)} Duration {program.lengthMinutes} min</strong></p>
                    </Modal.Description>
                  </Modal.Content>
                </Modal>               
               
             </Table.Cell>
            </Table.Row>)}
         </Table.Body>
        </Table>:<></>}

    </div>    
  )
}

export default Schedule