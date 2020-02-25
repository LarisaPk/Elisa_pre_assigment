import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import  './Channels.css'
import ChannelCard from './ChannelCard'
import { Button } from 'semantic-ui-react'

const Channels =({ channels, HandleChooseChannel, HandleRemoveChannel, reset, showAll }) => {

  //settings with breakpoints for different screen sizes
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows:true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,

        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,

        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,

        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  }


  console.log(channels)

  return (
    <div style={{ backgroundColor:'white' }}>
      <h2>Choose the channels</h2>{!showAll?<Button color='red' onClick={() => reset()}>Clear filters</Button>:<></>}
      <Slider {...settings}>
        {channels.map(channel =>
          <ChannelCard filter ={showAll} HandleChooseChannel={HandleChooseChannel} HandleRemoveChannel={HandleRemoveChannel} key={channel.id} id={channel.id} name={channel.name} img={channel.logos[6]?channel.logos[6].url:channel.logos[1].url}/>
        )}

      </Slider>
    </div>
  )
}

export default Channels