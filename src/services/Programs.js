import axios from 'axios'
const baseUrl = ' https://rest-api.elisaviihde.fi/rest/epg/'

//get urrently live programs
const getLivePrograms = async ()=> {
   const response = await axios.get(`${baseUrl}schedule/live`)
   return response.data
  }

//get all channels
const getAllChannels = async ()=> {
    const response = await axios.get(`${baseUrl}channels`)
    return response.data
  }
//get all logos
const getAllLogos = async ()=> {
  const response = await axios.get(`${baseUrl}channels/all`)
  return response.data
}
//get programs on a channel on specific day
const getProgramsOnChannel = async (channelIds, date)=> {
    const response = await axios.get(`${baseUrl}schedule?channelId=${channelIds}&date=${date}`)
    return response.data
  }  
export default { getLivePrograms, getAllChannels, getProgramsOnChannel, getAllLogos }