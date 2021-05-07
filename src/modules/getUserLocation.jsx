import React, { useState } from "react"

export const getUserLocation = () => {  
  const [lat, setLat] = useState()
  const [long, setLong] = useState()
  window.navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude
    let long= position.coords.longitude 
  })
  return [lat, long]
}