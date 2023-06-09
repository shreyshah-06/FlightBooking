import {React ,useState}from 'react'
import {Navigate,Link} from 'react-router-dom';
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Stack,Button} from "@mui/material";
import BookFlight from './flightCard';

const FlightCard = () => {
    const [flightDetail,setflightDetail]= useState({source:'',destination:'',date:new Date()});
    const [flightsFound,setflightsFound]=useState([]);
    const token = localStorage.getItem("authToken");
    const checkAuthorised = async()=>{
        try {
            if(!token) {
                window.alert("You are not logged in");
            }
                // go to login route
        }catch (error) {
            console.log(error);
        }
    }
    function handleChange(e){
        setflightDetail({...flightDetail,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/getflight',flightDetail).then((res)=>{
            console.log("hereree")
            setflightsFound(res.data)
            console.log(flightsFound);
        })
    }
    function reverseString(str) {

        // empty string
        const arr = str.split('-');
        let m = Number(arr[2])+1;
        m = m.toString();
        if(m.length===1){
            m = '0'+m;
        }
        return m+'-'+arr[1]+'-'+arr[0];;
    }
    
    // function bookFlight(id){
    //     console.log(id);
    //     BookFlight(id);
    // }
    const dataItems = flightsFound.map((flight) =>
        <div className='p-1' key={flight._id} >
        <div className="card w-100" style={{backgroundColor:'#301E67',color:'white'}}>
            <div className="card-body">
                <Stack direction='row' sx={{justifyContent:'space-between'}} >
                    <Stack direction='column'>
                        <h5 className="card-title">{flight.source.toUpperCase()}</h5>
                        <span>Departure: {flight.dep} </span>
                    </Stack>
                    <Stack direction='column'>
                        <div>{flight.airline.toUpperCase()}({flight.name})</div>
                        <span>2 Hr</span>
                    </Stack>
                <Stack direction='column'>
                    <h5 className="card-title">{flight.destination.toUpperCase()}</h5>
                    <span>Arrival: {flight.arr}</span>
                </Stack>
                <Stack direction='column'>

                <h6>Rs. {flight.price}</h6>
                <span>{reverseString(flight.date.substring(0,10))}</span>
                </Stack>
                <Link href="#" onClick={checkAuthorised} sx={{backgroundColor:'#E5E5CB',color:'#3C2A21',borderRadius:'1rem',':hover': {backgroundColor:'#D5CEA3',color:'#3C2A21'}}}>Book</Link>
                </Stack>
            </div>
        </div>

        </div>
    // <li key={flight._id}>
    //   <p>{flight.name}</p>
    //   <span>{flight.price}</span>
    //   </li>
    );
    // console.log(flight.destination)
    console.log(dataItems)
return (
    <Card sx={{ width: { xs: '240px', sm: '480px', md: "720px", }, boxShadow: "none", borderRadius: 5 }} >
    <CardContent sx={{ backgroundColor: "#1E1E1E", height:{md:'280px',sm:'520px',xs:'515px'}}}>
        <Typography variant="h4" fontWeight="bold" color="#FFF" align='center'>
          Search Flights
        </Typography>
        <form onSubmit={handleSubmit}>
            <Stack  direction={{ xs: "column", md: "row" ,sm:'column'}} justifyContent='space-between' p={2}>
                <div>
                    <label className='text-danger px-3 fw-bold'>From: </label>
                    <input type="text" name="source" placeholder="From" style={{borderRadius:'20px'}} value={flightDetail.source} onChange={handleChange} />
                </div>
                <div>
                    <Button sx={{color:'white',fontSize:'1.1rem'}}> <b>↑↓</b></Button>
                </div>
                <div>
                    <label className='text-danger px-3 fw-bold' >To: </label>
                    <input type="text" name="destination" placeholder="To" style={{borderRadius:'20px'}} value={flightDetail.destination} onChange={handleChange} />
                </div>
            </Stack>
            <div className='d-flex justify-content-center'>
            <label>Date: </label>
                <input type='date' name='date' value={flightDetail.date} onChange={handleChange} ></input>
            </div>
            <div className='d-flex justify-content-center p-4'>

            <Button variant="primary" type="submit" sx={{backgroundColor:'#E5E5CB',color:'#3C2A21',':hover': {backgroundColor:'#D5CEA3',color:'#3C2A21'}}} >Submit</Button>
            </div>
        </form>
    </CardContent>
    <Stack direction='column'>
    {flightsFound.length>0 && <div style={{backgroundColor:'#5B8FB9'}}>
        <ul >
            {dataItems}
        </ul>
    </div>}

    </Stack>
  </Card>);
};

export default FlightCard