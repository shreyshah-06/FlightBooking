import React from 'react'
import {Stack,Button} from "@mui/material";
const BookFlight = () => {
  return (
    <div className='p-1'>
    <div className="card w-100" style={{backgroundColor:'#301E67',color:'white'}}>
        <div className="card-body">
            <Stack direction='row' sx={{justifyContent:'space-between'}} >
                <Stack direction='column'>
                    <h5 className="card-title">source</h5>
                    <span>Departure:</span>
                </Stack>
                <Stack direction='column'>
                    <div>asdasd</div>
                    <span>2 Hr</span>
                </Stack>
            <Stack direction='column'>
                <h5 className="card-title">asda</h5>
                <span>Arrival: sadasd</span>
            </Stack>
            <Stack direction='column'>

            <h6>Rs. asadsa</h6>
            {/* <span>{reverseString(props.date.substring(0,10))}</span> */}
            </Stack>
            </Stack>
        </div>
    </div>

    </div>
  )
}

export default BookFlight