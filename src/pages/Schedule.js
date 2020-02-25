import React, { useState, useEffect } from 'react'
import Channels from '../components/Channels'
import DatePicker from 'react-date-picker'
import ProgramsService from '../services/Programs'
import Sticky from 'react-sticky-el'
import moment from 'moment'//easier to work with with Date object
import TablePrograms from '../components/TablePrograms'

const Schedule = ({ allChannels }) => {

  const [date, setDate] = useState(new Date())
  const [channels, setChannells] = useState([])
  const [programs, setPrograms] = useState('')
  const [noChosenChannels, setNoChosenChannels] = useState(true)
  const [programForDescripton, setProgramForDescripton] = useState()

  //fetch programs when channels or date change
  useEffect(() => {
    let didCancel= false
    const channelsFormatted =channels.toString()
    const dateFormatted =moment(date).format('YYYY-MM-DD')
    console.log(dateFormatted,'date for request')
    const  fetchMyAPI = async ()  => {
      console.log('shedule effect')
      try {const response = await ProgramsService.getProgramsOnChannel(channelsFormatted, dateFormatted)
        if (!didCancel) { // Ignore if we started fetching something else
          const programs = response.schedule.map(element => {
            return element.programs
          })
            .flat()
            .map(program => {
              const logo = allChannels.find( ({ id }) => id === program.channel.id)
              program.logo=logo?logo.logos[2].url:null
              return program
            })
            .sort((a, b) => {
              return a.startTimeUTC - b.startTimeUTC
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
    console.log(date,'date')
  }
  console.log(date,'date in state')

  //when channel clicked
  const handleAddChahhel =(id) => {
    console.log('channel shedule clicked')
    const newChannels = channels.concat(id)
    setChannells(newChannels)
    setNoChosenChannels(false)
  }

  //when user clicks chanel that was choosen before (undo)
  const HandleRemoveChannel =(id) => {

    const newChannels = channels
      .filter(channel => channel!== id)
    setChannells(newChannels)

    const fileredPrograms = programs
      .filter(program => program.channel.id !== id)
      .sort((a, b) => {
        return a.startTimeUTC - b.startTimeUTC
      })

    setPrograms(fileredPrograms)

    if(fileredPrograms.length===0){
      setNoChosenChannels(true)
      setPrograms('')
      setChannells([])
    }
  }

  //resets choosen chanells
  const reset=() => {
    setPrograms('')
    setChannells([])
    setNoChosenChannels(true)
  }

  const handleShowDescription =(channel, id) => {
    const p =  programs.find(program => program.id=== id)
    console.log(p, 'for description')
    setProgramForDescripton(p)
  }

  console.log(typeof(startDate),date, 'date' )
  console.log(programs, 'programs on choosen channel' )

  return (
    <div>
      <div style={{ display:'flex', flexWrap:'wrap', flexDirection:'row', alignItems:'baseline' }}>
        <h2 style={{ marginRight:'1em' }}>Choose the date</h2>
        <DatePicker
          onChange={e => onChange(e)}
          value={date}
          format={'dd/MM/yy'}
          clearIcon={null}
        />
      </div>

      <Sticky><Channels channels={allChannels} HandleChooseChannel={handleAddChahhel} reset={reset} HandleRemoveChannel={HandleRemoveChannel} showAll={noChosenChannels}/></Sticky>

      {programs?<TablePrograms handleShowDescription ={handleShowDescription} programs ={programs} programForDescripton={programForDescripton}/>:<></>}

    </div>
  )
}

export default Schedule