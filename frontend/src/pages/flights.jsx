import React from 'react'
import { Box, Stack } from "@mui/material";
import FlightCard from '../components/card'
import  FlightdataCard from '../components/flightCard'
const Flights = () => {
  return (
    <Stack direction='column'>
        <Box sx={{  height: { sx: "auto", md: "auto" },backgroundColor:'red',display: 'flex',justifyContent: 'center',p:{md:3,xs:2,sm:2}}}>
            <FlightCard/>
        </Box>
    </Stack>
  )
}

export default Flights