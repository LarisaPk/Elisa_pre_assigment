import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import  './Channels.css'
import ChannelCard from './ChannelCard'

const Channels =({channels}) => {

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
                slidesToShow: 3,
                slidesToScroll: 3,
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
    <div> 
        <h2>Choose the channels</h2>
      <Slider {...settings}>
        {channels.map(channel=>
        <ChannelCard key={channel.id} name={channel.name} img={channel.logos[6].url}/>
        )}

      </Slider>
    </div>
  )
}

export default Channels