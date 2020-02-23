import React, { useState, useEffect} from 'react'
import Channels from '../components/Channels'
import DatePicker from 'react-date-picker'
import ProgramsService from '../services/Programs'
import { Card, Icon, Image } from 'semantic-ui-react'
import  './cards.css'

const Schedule = ({allChannels, logos})=> {

  const [date, setDate] = useState(new Date())
  const [channels, setChannells] = useState([])
  const [programs, setPrograms] = useState()

 //fetch programs when channels or date changes
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
}, [channels, date])

  const onChange = date => {
    setDate( date )
  }

  const handleAddChahhel =(id)=>{
    console.log("channel shedule clicked")
    const newChannels = channels.concat(id)
    setChannells(newChannels)
  }

  const reset=()=>{
    setPrograms('')
    setChannells('')
  }
  console.log(typeof(startDate),date, 'date' )
  console.log(programs, 'programs on choosen channel' )

  return (
    <div>
        <h2>Choose the date</h2>
        <DatePicker
            onChange={e => onChange(e)}
            value={date}
            format={'dd/MM/yy'}
        />
      <Channels channels={logos} allChannels={allChannels} HandleChooseChannel={handleAddChahhel} reset={reset}/>
      <div className='cards'>
        {programs?programs.map(program=>
        <Card key={program.id} className='card'>
          <Image src={program.thumbnails?program.thumbnails[2].url:'https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png://cinemaone.net/images/movie_placeholder.png'} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{program.name}</Card.Header>
            <Card.Meta>
              <span className='date'><strong>{program.startTime.slice(10)} - {program.endTime.slice(10)} Duration {program.lengthMinutes} min</strong></span>
            </Card.Meta>
            <Card.Description>
              {program.shortDescription}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>        
            {program.channel.name}        
          </Card.Content>
        </Card>):<></>} 
      </div>
    </div>    
  )
}

export default Schedule