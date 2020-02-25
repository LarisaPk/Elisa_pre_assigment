import React, { useState, useEffect} from 'react'
import ProgramsService from '../services/Programs'
import TablePrograms from '../components/TablePrograms'

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
      <TablePrograms handleShowDescription ={handleShowDescription} livePrograms ={programs} programForDescripton={programForDescripton}/>
    </div>
  )
}

export default LivePrograms