import React from "react";
import { useState, useEffect } from "react";


import { Button, ButtonGroup, Card, Dropdown, DropdownButton, Form, ToggleButton,Modal } from "react-bootstrap";
import "./managerStyle.css";
import ManagerServices from "../../../services/ManagerServices";
import managerValidation from "../../Validation/managerValidation";
import Layout from "../Navbar/Layout/Layout";
import { useNavigate } from 'react-router';


const ManagerDashboard = () => {
  const navigate=useNavigate();
  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [ageType, setAgeType] = useState('');
  const [ageTypeForBookings, setAgeTypeForBookings] = useState('');
  
  const [flightId,setFlightId] = useState();
  const [destinationId,setDestinationId] = useState();
  const [aircrafttypes,setaircraftTypes] = useState();
  const [aircrafttypeID, setaircraftTypeID] = useState();
  const [revenue, setRevenue] = useState();
  

  const [pastFlightsDestinationId, setPastFlightsDestinationId] = useState();
  const [pastFlightsOriginId, setPastFlightsOriginId] = useState();


 
  
  const [classId,setClassId] = useState();
  const [destinationDates,setDestinationDates]=useState('');
  const [bookingDates,setBookingDates]=useState('');
  const [flightPassengers,setFlightPassengers]=useState('');
  const [allPassengers,setAllPassengers]=useState('');
  const [allBookings,setAllBookings]=useState('');
  

 
  const [allPastFlights,setAllPastFlights]=useState('');
  const [FlightNumbers,setflightNumbers]=useState([]);
  const [Destinations,setDestinationNames]=useState([]);
  const [passengerTypes,setPassengerTypes]=useState([]);

  const [errorFlightPassengers, setFlightPassengersError] = useState({'Flight No':'','Age Type':''});
  const [errorAllPassengers, setAllPassengersError] = useState({'Class Id':'','Start Date':'','End Date':''});
  const [errorAllBookings, setAllBookingsError] = useState({'Class Id':'','Age Type':'','Start Date':'','End Date':''});
  const [errorRevenue,setRevenueError] = useState({'AirCraft Id':''});
  const [errorPastFlights,setPastFlightsError] = useState({'Origin Id':'','Destination Id':''});

 
  let sidebar = document.querySelector(".sidebar");
  let sidebarBtn = document.querySelector(".sidebarBtn");

  useEffect(() => {
    getFlightNumbers();
    getDestinationNames();
    getPassengerTypes();
    getAirCraftTypes()

  }, []);

  const getFlightNumbers = async () => {
    try {
      const flightNumbers = await ManagerServices.getFlightNumbers();
      // console.log(testType.data.testTypes);
      // console.log(flightNumbers);
      setflightNumbers(flightNumbers.data.result);
      // setPatientID(location.state.patient_id);
      // console.log(flightNumbers.data.result);
    } catch (err) {
      //   console.log(err);
    }
  };
  const getAirCraftTypes = async () => {
    try {
      const aircraftTypes = await ManagerServices. getAirCraftTypes();
      // console.log(testType.data.testTypes);
      console.log(aircraftTypes);
      setaircraftTypes( aircraftTypes.data.result);
      // setPatientID(location.state.patient_id);
      // console.log(flightNumbers.data.result);
    } catch (err) {
      //   console.log(err);
    }
  };


  const getDestinationNames = async () => {
    try {
      const destionationNames = await ManagerServices.getDestinationNames();
      // console.log(testType.data.testTypes);
      // console.log(flightNumbers);
      setDestinationNames(destionationNames.data.result);
      // setPatientID(location.state.patient_id);
      console.log(destionationNames.data);
    } catch (err) {
      //   console.log(err);
    }
  };

  const getPassengerTypes = async () => {
    try {
      const passengerTypes = await ManagerServices.getPassengerTypes();
      console.log("passsenger",passengerTypes.data.result);
      // console.log(flightNumbers);
      setPassengerTypes(passengerTypes.data.result);
      // setPatientID(location.state.patient_id);
    } catch (err) {
      //   console.log(err);
    }
  };

  const handleSideBar = () => {
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
      sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
  };
  const passengertypes = [
    ["Adult", "1"],
    ["Children", "0"],
  ];
  const errors = {};

  const handleSubmitFlightPassengers=async(e)=>{
    e.preventDefault();
    const state={'Flight No':flightId?.id,'Age Type':ageType.value}
    console.log(state);
    const {value,error}=managerValidation.ValidateFlightPassengers(state)
   
    if (error) {
      error.details.map((item) => {
        errors[item.path[0]] = item.message;
      });
    } else {
        try {
          // const patient_id = params.patient_id;
          
          // console.log("State:", state);
        
          const response = await ManagerServices.getFlightNumberPassengers(state)
          // console.log(response);
          console.log(response)
          setAllBookings();
          setRevenue()
          setAllPastFlights()
          setAllPassengers()
          setFlightPassengers(response.data.result[0])
          // if (response.status === 200) {            
        //   //   Messages.SuccessMessage("Patient Updated Successfully");
        // }
      } catch (error) {
        // console.log(error.message);
        // Messages.ErrorMessage({
        //   error: error,
        //   custom_message: `Patient update failed`,
        // });
      }
    }

    setFlightPassengersError(errors);

  }

  const handleSubmitAllPassengers=async(e)=>{
    e.preventDefault();
 
    var state={'Destination Id':destinationId?.id,'Start Date':destinationDates['startDate1'],'End Date':destinationDates['endDate1']}
    console.log(state);
    const {value,error}=managerValidation.ValidateAllPassengers(state)
    if (error) {
      error.details.map((item) => {
        errors[item.path[0]] = item.message;
      });
      // console.log(errors["End Date"])
      if (errors["End Date"]=='"End Date" must be greater than or equal to "ref:Start Date"')
        errors['End Date']='End Date must be greater than or equal to Start Date'
      if (errors["Destination Id"]=='"Destination Id" is required')
        errors["Destination Id"]='"Destination" is required'

        console.log(errors)
    } else {
        try {
          // const patient_id = params.patient_id;
          
    

          const startDate=new Date(destinationDates['startDate1']);
          const endDate=new Date(destinationDates['endDate1']);

          startDate.setUTCHours(0, 0, 0);
          endDate.setUTCHours(23, 59, 59)
        


        
          state={'Destination Id':destinationId?.id,'Start Date':startDate.toISOString(),'End Date':endDate.toISOString()}
         
          const response = await ManagerServices.getDateDestinationPassengers(state)

          console.log(response);
          setAllBookings();
          setFlightPassengers()
          setRevenue()
          setAllPastFlights()
          setAllPassengers(response.data.result[0].passengers)
          // console.log(response.data.result[0])
          // setPassengers(response.data.result[0].passengers)
         
          // if (response.status === 200) {            
        //   //   Messages.SuccessMessage("Patient Updated Successfully");
        // }
      } catch (error) {
        // console.log(error.message);
        // Messages.ErrorMessage({
        //   error: error,
        //   custom_message: `Patient update failed`,
        // });
      }
    }

    setAllPassengersError(errors);

  }


  const handleSubmitAllBookings=async(e)=>{
    e.preventDefault();
 
    var state={'Class Id':classId?.id,'Age Type':ageTypeForBookings.value,'Start Date':bookingDates['startDate2'],'End Date':bookingDates['endDate2']}
  
    const {value,error}=managerValidation.ValidateAllBookings(state)
    if (error) {
      error.details.map((item) => {
        errors[item.path[0]] = item.message;
      });
      // console.log(errors["End Date"])
      if (errors["End Date"]=='"End Date" must be greater than or equal to "ref:Start Date"')
        errors['End Date']='End Date must be greater than or equal to Start Date'
      if (errors["Class Id"]=='"Class Id" is required')
        errors["Class Id"]='"Class" is required'
      
        console.log(errors)
    } else {
      
        try {
          // const patient_id = params.patient_id;
          
          // console.log("State:", state);
      
          const startDate=new Date(bookingDates['startDate2']);
          const endDate=new Date(bookingDates['endDate2']);

          startDate.setUTCHours(0, 0, 0);
          endDate.setUTCHours(23, 59, 59)
        
          
          state={'Class Id':classId?.id,'Age Type':ageTypeForBookings.value,'Start Date':startDate.toISOString(),'End Date':endDate.toISOString()}
          
          const response = await ManagerServices.getAllBookings(state)
      
          console.log(response);
          setFlightPassengers()
          setRevenue()
          setAllPastFlights()
          setAllPassengers()
          setAllBookings(response.data.result[0])
          // setAllPassengers(response.data.result[0].passengers)
          // console.log(response.data.result[0])
          // setPassengers(response.data.result[0].passengers)
         
          // if (response.status === 200) {            
        //   //   Messages.SuccessMessage("Patient Updated Successfully");
        // }
      } catch (error) {
        // console.log(error.message);
        // Messages.ErrorMessage({
        //   error: error,
        //   custom_message: `Patient update failed`,
        // });
      }
    }

    setAllBookingsError(errors);
  }

  const handleSubmitRevenue=async(e)=>{
    e.preventDefault();
 
    var state={'AirCraft Id':aircrafttypeID?.id}
  
    const {value,error}=managerValidation.ValidateRevenue(state)
    if (error) {
      error.details.map((item) => {
        errors[item.path[0]] = item.message;
      });
      // console.log(errors["End Date"])'
      if (errors["AirCraft Id"]=='"AirCraft Id" is required')
        errors["AirCraft Id"]='"AirCraft" is required'
      
        console.log(errors)
    } else {
      
        try {
          // const patient_id = params.patient_id;
          
          // console.log("State:", state);
      
          // const startDate=new Date(bookingDates['startDate']);
          // const endDate=new Date(bookingDates['endDate']);

          // startDate.setUTCHours(0, 0, 0);
          // endDate.setUTCHours(23, 59, 59)
        
          
          // state={'Class Id':classId,'Age Type':ageTypeForBookings.value,'Start Date':startDate.toISOString(),'End Date':endDate.toISOString()}
          
          const response = await ManagerServices.getRevenue(state)
          setAllBookings();
          setFlightPassengers()
          setAllPastFlights()
          setAllPassengers()
          setRevenue(response.data.result[0].total)
      
          console.log(response);
          // setAllPassengers(response.data.result[0].passengers)
          // console.log(response.data.result[0])
          // setPassengers(response.data.result[0].passengers)
         
          // if (response.status === 200) {            
        //   //   Messages.SuccessMessage("Patient Updated Successfully");
        // }
      } catch (error) {
        // console.log(error.message);
        // Messages.ErrorMessage({
        //   error: error,
        //   custom_message: `Patient update failed`,
        // });
      }
    }

    setRevenueError(errors);
    console.log( errorRevenue)
  }



  const handleSubmitPastFlights=async(e)=>{
    e.preventDefault();
 
    var state={'Origin Id':pastFlightsOriginId?.id,'Destination Id':pastFlightsDestinationId?.id}
  
    const {value,error}=managerValidation.ValidatePastFlights(state)
    if (error) {
      error.details.map((item) => {
        errors[item.path[0]] = item.message;
      });
      // console.log(errors["End Date"])'
      if (errors["Origin Id"]=='"Origin Id" is required')
        errors["Origin Id"]='"Origin" is required'
      if (errors["Destination Id"]=='"Destination Id" is required')
        errors["Destination Id"]='"Destination" is required'
      
        console.log(errors)
    } else {
      
        try {
          // const patient_id = params.patient_id;
          
          // console.log("State:", state);
      
          // const startDate=new Date(bookingDates['startDate']);
          // const endDate=new Date(bookingDates['endDate']);

          // startDate.setUTCHours(0, 0, 0);
          // endDate.setUTCHours(23, 59, 59)
        
          
          // state={'Class Id':classId,'Age Type':ageTypeForBookings.value,'Start Date':startDate.toISOString(),'End Date':endDate.toISOString()}
          
          const response = await ManagerServices.getPastFlights(state)
      
          console.log(response);
          setAllBookings();
          setFlightPassengers()
          setRevenue()
          setAllPassengers()
          setAllPastFlights(response.data.result)
          console.log(allPastFlights)
          // setAllPassengers(response.data.result[0].passengers)
          // console.log(response.data.result[0])
          // setPassengers(response.data.result[0].passengers)
         
          // if (response.status === 200) {            
        //   //   Messages.SuccessMessage("Patient Updated Successfully");
        // }
      } catch (error) {
        // console.log(error.message);
        // Messages.ErrorMessage({
        //   error: error,
        //   custom_message: `Patient update failed`,
        // });
      }
    }

    setPastFlightsError(errors);
    console.log( errorRevenue)
  }

 

  return (
    <>
    <Layout/>
      {/* <div class="sidebar">
        <div class="ml-4 logo-details mt-3">
          <span class=" logo_name">B Airways</span>
        </div>
        <ul class="nav-links mt-4">
          <li>
            <a href="#" class="active">
              <i class="bx bx-grid-alt"></i>
              <span class="links_name">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-box"></i>
              <span class="links_name">Product</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-list-ul"></i>
              <span class="links_name">Order list</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-pie-chart-alt-2"></i>
              <span class="links_name">Analytics</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-coin-stack"></i>
              <span class="links_name">Stock</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-book-alt"></i>
              <span class="links_name">Total order</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-user"></i>
              <span class="links_name">Team</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-message"></i>
              <span class="links_name">Messages</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-heart"></i>
              <span class="links_name">Favourites</span>
            </a>
          </li>
         
          <li >
            <a href="#">
              <i class="bx bx-log-out"></i>
              <span class="links_name">Log out</span>
            </a>
          </li>
        </ul>
      </div> */}



      <section class="home-section">
        <nav>
          <div class="sidebar-button" style={{display:'flex'}}>
            <i class="bx bx-menu sidebarBtn mt-4" onClick={handleSideBar}></i>
            <span class="dashboard mt-4">Manager</span>
            <div class="rightside" style={{marginLeft:15}}>
               <Button onClick={()=>{navigate('/createStaticScheduler')}} > <div class="box-topic" style={{fontSize:16}}> Create Static schedule</div></Button>
              </div>
              <div class="right-side" style={{marginLeft:15}}>
               <Button  onClick={()=>{navigate('/manager/handleaircrafts')}} > <div class="box-topic" style={{fontSize:16}}>Handle aircrafts</div></Button>
              </div>
              <div class="right-side" style={{marginLeft:15}}>
               <Button onClick={()=>{navigate('/manager/updateStaticScheduler')}} > <div class="box-topic" style={{fontSize:16}}>Update Static schedule</div></Button>
              </div>
              <div class="right-side" style={{marginLeft:15}}>
               <Button onClick={()=>{navigate('/manager/updateFlightScheduler')}} > <div class="box-topic" style={{fontSize:16}}>Update Flight schedule</div></Button>
              </div>
          </div>
         
      
          {/* <div class="search-box">
            <input type="text" placeholder="Search..." />
            <i class="bx bx-search"></i>
          </div> */}
          {/* <div class="profile-details"> */}
            {/* <!--<img src="images/profile.jpg" alt=""/>--> */}
            {/* <span class="admin_name">Thushalya</span>
            <i class="bx bx-chevron-down"></i>
          </div> */}
        </nav>

        <div class="home-content">
          <div class="overview-boxes">
            <div class="box">
              <div class="right-side">
                <div class="box-topic mb-2">Flight Passengers</div>
                Flight No
                <Form onSubmit={handleSubmitFlightPassengers}>
                <div class="btn-group mt-2">
                  {/* <button
                    type="button"
                    class="btn btn-primary dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {flightId? flightId.name:'Flight No'}
                  </button> */}
                
                  <DropdownButton id="dropdown-basic-button" title=  {flightId? flightId.name:'Flight No'} onSelect={(event)=>{
  
                        // console.log(event.split('/')[1])
                       
                        setFlightId( {'name':event.split('/')[0],'id':event.split('/')[1]} );}}>
                  {
                     FlightNumbers?.map((flightno,idx)=>(
                    // <button class="dropdown-item" value={flightno.flightID} type="button" onClick={(event)=>{setFlightId({'name':flightno.flightID,'id':event.target.value});}}>
                    //   {flightno.flightID}
                    // </button>     
                      <Dropdown.Item  eventKey={ flightno.flightID.toString()+'/' +flightno.flightID.toString()} >
                      {flightno.flightID}
                      </Dropdown.Item>

                     ))}

              

                  </DropdownButton>
        

                  {/* {errorData.NI !== "" && <p className="error">{errorData.NIC}</p>} */}
                  {/* <div class="dropdown-menu">
                    {
                     FlightNumbers?.map((flightno,idx)=>(
                    
    
                    <button class="dropdown-item" value={flightno.flightID} type="button" onClick={(event)=>{setFlightId({'name':flightno.flightID,'id':event.target.value});}}>
                      {flightno.flightID}
                    </button>
                     ))}
      
                  </div> */}
        
                </div>
                {errorFlightPassengers['Flight No'] !== "" && <p className="error">{errorFlightPassengers['Flight No']}</p>}
                <div className="row">
                  <Form.Group>
                    <Form.Label>Age Type</Form.Label>
                    <div className="col-md-8">
                      <ButtonGroup className="mb-12">
              
                        {passengertypes?.map((radio, idx) => (
                          <ToggleButton
                            key={idx+5}
                            id={`radio-${idx+5}`}
                            type="radio"
                            variant={
                              idx % 2 ? "outline-primary" : "outline-primary"
                            }
                            name="radio"
                            value={radio[1]}
                            checked={ageType.value === radio[1]}
                           
                            onChange={() =>{ setAgeType({
                              name: radio[0],
                              value: radio[1],
                            })}}
                          >
                            {radio[0]}
                          </ToggleButton>
                        ))}
                      </ButtonGroup>
                    
          
                    </div>
                    {errorFlightPassengers['Age Type'] !== "" && <p className="error">{errorFlightPassengers['Age Type']}</p>}
                    <i class='mt-2 bx bxs-plane-alt cart'></i>
                   
                    <div className="row">
                    <div className="col-9 "></div>
                    <div className="col-3 ">
                      <Button  type="submit">
                        search
                      </Button>
                    </div>
                    </div>
                    {/* {type_err != "" && <p className="error">{type_err}</p>} */}
                  </Form.Group>
                </div>
                </Form>
                <div class="indicator">
                  <i class="bx bx-up-arrow-alt"></i>
                  <span class="text">Up from yesterday</span>
                </div>
              </div>
              <div className=" number mr-5"> {flightPassengers? flightPassengers.Total:''} </div>
            </div>
           






            <div class="box ">
              <div class="right-side">
                <div class="box-topic mb-2">All Passengers</div>
                Destination
                <Form onSubmit={handleSubmitAllPassengers}>
                <div class="btn-group mt-2">
            
                            
                <DropdownButton variant="success" id="dropdown-basic-button" title={destinationId? destinationId.name:'Destination'} onSelect={(event)=>{
  
  // console.log(event.split('/')[1])
                    setDestinationId( {'name':event.split('/')[0],'id':event.split('/')[1]} );}}>

                     {/* {errorData.NI !== "" && <p className="error">{errorData.NIC}</p>} */}
             
                    {Destinations?.map((Destination,idx)=>(
                    <Dropdown.Item  eventKey={ Destination.name.toString()+'/' +Destination.airport_id.toString()} >
                       {Destination.name}
                    </Dropdown.Item>
                     ))
                     }
                  </DropdownButton>
                
                </div>
                {errorAllPassengers['Destination Id'] !== "" && <p className="error">{errorAllPassengers['Destination Id']}</p>}
                <div></div>
                <div class="container">
                  Start Date: <input type="date" name='startDate1' id="startDate1" onChange={(event)=>{setDestinationDates({...destinationDates,[event.target.name]: event.target.value})}} width="276" />
                  {errorAllPassengers['Start Date'] !== "" && <p className="error">{errorAllPassengers['Start Date']}</p>}
                  </div>
                  <div class="container ">
                  End Date: <input type="date" name='endDate1' id="endDate1"   onChange={(event)=>{setDestinationDates({...destinationDates,[event.target.name]: event.target.value})}} width="276" />
                  {errorAllPassengers['End Date'] !== "" && <p className="error">{errorAllPassengers['End Date']}</p>}
                  </div>
                  
                  <i class='mt-2 bx bx-user-circle cart two'></i>
                <div className="row">
                    <div className="col-9 "></div>
                    <div className="col-3 ">
                      <Button variant="success"  type="submit">
                        search
                      </Button>
                    </div>
                    </div>
                </Form>
                <div class="indicator">
                 
                  <span class="text">Up from yesterday</span>
                </div>
              </div>
              
              <div class="number  mt-5">{allPassengers? allPassengers:''}</div>
            </div>


            <div class="box">
              <div class="right-side">
                <div class="box-topic">All Bookings</div>
                Class
                <Form onSubmit={handleSubmitAllBookings}>
                <div class="btn-group">
                  <DropdownButton variant="warning" id="dropdown-basic-button" title={classId? classId.name:'Class'} onSelect={(event)=>{
                    setClassId( {'name':event.split('/')[0],'id':event.split('/')[1]} );}}>
              
                  {
                     passengerTypes?.map((passengertype,idx)=>(
                    
                  <Dropdown.Item  eventKey={ passengertype.name.toString()+'/' +passengertype.classID.toString()} >
                  {passengertype.name}
                  </Dropdown.Item>

                     ))}
                  </DropdownButton>

                 
                </div>
                {errorAllBookings['Class Id'] !== "" && <p className="error">{errorAllBookings['Class Id']}</p>}
                
            
              <Form.Group>
              <Form.Label>Age Type</Form.Label>
                <div className="col-md-12">
                      <ButtonGroup className="mb-12">
              
                        {passengertypes?.map((radio, idx) => (
                          <ToggleButton
                          
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant={
                              idx % 2 ? "outline-warning" : "outline-warning"
                            }
                            name="radio"
                            value={radio[1]}
                            checked={ageTypeForBookings.value === radio[1]}
                            
                            onChange={() =>{setAgeTypeForBookings({
                              name: radio[0],
                              value: radio[1],
                            })}}
                          >
                            {radio[0]}
                          </ToggleButton>
                          
                        ))}
                        {ageTypeForBookings.value1}
                      </ButtonGroup>
                     
                    </div>
                    {errorAllBookings['Age Type'] !== "" && <p className="error">{errorAllBookings['Age Type']}</p>}
                    </Form.Group>
                    <div class="container">
                  Start Date: <input type="date" name='startDate2' id="startDate2" onChange={(event)=>{setBookingDates({...bookingDates,[event.target.name]: event.target.value})}} width="276" />
                  {errorAllBookings['Start Date'] !== "" && <p className="error">{errorAllBookings['Start Date']}</p>}
                  <br></br>
                  End Date: <input type="date" name='endDate2' id="endDate2"   onChange={(event)=>{setBookingDates({...bookingDates,[event.target.name]: event.target.value})}} width="276" />
                  {errorAllBookings['End Date'] !== "" && <p className="error">{errorAllBookings['End Date']}</p>}
                </div>
                
                <i class='mt-2 bx bxs-book cart three'></i>
              
                <div className="row">
                    <div className="col-9 "></div>
                    <div className="col-3 ">
                      <Button variant="warning" type="submit">
                        search
                      </Button>
                    </div>
                    </div>
                </Form>
                <div class="indicator">
                  <i class="bx bx-up-arrow-alt"></i>
                  <span class="text">Up from yesterday</span>
                </div>
              </div>
              <div class="number mr-4 mt-5">{allBookings? allBookings.Total:''}</div>
            </div>


            <div class="box">
              <div class="right-side">
                <div class="box-topic mb-2">Total Revenue</div>
                AirCraft
                <Form onSubmit={handleSubmitRevenue}>
                <div class="btn-group mt-2">
               
                  <DropdownButton variant="danger" id="dropdown-basic-button" title={aircrafttypeID? aircrafttypeID.name:'AirCraft'} onSelect={(event)=>{
                    setaircraftTypeID( {'name':event.split('/')[0],'id':event.split('/')[1]} );}}>

                  {
                     aircrafttypes?.map((aircrafttype,idx)=>(
                                      
                    <Dropdown.Item  eventKey={ aircrafttype.name.toString()+'/' +aircrafttype.aircraftTypeID.toString()} >
                    {aircrafttype.name}
                    </Dropdown.Item>

                     ))}
          
                  </DropdownButton>
               
                </div>
               
                <div className="row"></div>
                {errorRevenue['AirCraft Id'] !== "" && <p className="error">{errorRevenue['AirCraft Id']}</p>}
                <Form.Group>
                <i class="mt-2 bx bxs-cart-download cart four"></i>
                
                <div className="row">
                    <div className="col-9 "></div>
                    <div className="col-3 ">
                      <Button variant="danger" type="submit">
                        search
                      </Button>
                    </div>
                    </div>
                    </Form.Group>
                </Form>
                <div class="indicator">
                  <i class="bx bx-down-arrow-alt down"></i>
                  <span class="text">Down From Today</span>
                </div>
              </div>
              <div class="number">{revenue? `Rs ${revenue}` :`Rs 0`}</div>
            </div>


            <div class="box">
              <div class="right-side">
                <div class="box-topic">Past Flights</div>
                <Form onSubmit={handleSubmitPastFlights}>
                <div class="btn-group ml-2 mt-2">
              
                  <DropdownButton variant="info" id="dropdown-basic-button" title={pastFlightsOriginId? pastFlightsOriginId.name:'Origin'} onSelect={(event)=>{
                    setPastFlightsOriginId( {'name':event.split('/')[0],'id':event.split('/')[1]} );}}>
               
                  {
                     Destinations?.map((destination,idx)=>(
                    
                       <Dropdown.Item  eventKey={destination.name.toString()+'/' + destination.airport_id.toString()} >
                           {destination.name}
                       </Dropdown.Item>
                     ))}

                
          
                  </DropdownButton>
                </div>
                { errorPastFlights['Origin Id'] !== "" && <p className="error">{ errorPastFlights['Origin Id']}</p>}
                
              
                <div class="ml-2 mt-2 btn-group">
     

                  <DropdownButton variant="info" id="dropdown-basic-button" title={pastFlightsDestinationId? pastFlightsDestinationId.name:'Destination'} onSelect={(event)=>{
                    setPastFlightsDestinationId( {'name':event.split('/')[0],'id':event.split('/')[1]} );}}>
         
                  {
                     Destinations?.map((destination,idx)=>(
                                        
                    <Dropdown.Item  eventKey={destination.name.toString()+'/' + destination.airport_id.toString()} >
                    {destination.name}
                    </Dropdown.Item>
                     ))
                    }
              
                  </DropdownButton>
               
                </div>
            
                { errorPastFlights['Destination Id'] !== "" && <p className="error">{ errorPastFlights['Destination Id'] }</p>}
                <div></div>
                
                <i class='mt-2 bx bxs-plane-take-off cart five'></i>
                
                <div className="row">
                    <div className="col-9 "></div>
                    <div className="col-3 ">
                      <Button variant="info"  type="submit">
                        search
                      </Button>
                    </div>
                    </div>
                </Form>
                <div class="indicator">
                  <i class="bx bx-down-arrow-alt down"></i>
                  <span class="text">Down From Today</span>
                </div>
              </div>

              <div class="mr-5 number"></div>
            </div>
        

         
          </div>
          

          
          

          
          <Modal
                            show={flightPassengers || allBookings || allPastFlights}
                            onHide={()=>{ setFlightPassengers()
                              setAllBookings();
                              setAllPastFlights()}}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Search Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                            {flightPassengers &&
          <div class="sales-boxes">
            <div class="recent-sales box">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Registered user count</th>
                    <th>Guest user count</th>
                    <th>Total</th>
                    {/* <th>Email</th>
                    <th>Type</th>
                    <th>Passenger Count</th> */}
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>                
                  <tr>
                  <td>{flightPassengers?.Registercount}</td>
                  <td>{flightPassengers?.Guestcount}</td>
                  <td>{flightPassengers?.Total}</td>

                </tr>
                </tbody>

              </table>
            </div>
          </div>}
          {allBookings &&
           <div class="sales-boxes">
           <div class="recent-sales box">
             <table className="table table-hover">
               <thead>
                 <tr>
                   <th>Registered user count</th>
                   <th>Guest user count</th>
                   <th>Total</th>
                   {/* <th>Email</th>
                   <th>Type</th>
                   <th>Passenger Count</th> */}
                   <th></th>
                   <th></th>
                 </tr>
               </thead>
               <tr>
                 <td>{allBookings?.Registercount}</td>
                 <td>{allBookings?.Guestcount}</td>
                 <td>{allBookings?.Total}</td>

               </tr>
             </table>
           </div>
         </div>
          }
           {allPastFlights &&
           <div class="sales-boxes">
           <div class="recent-sales box">
             <table className="table table-hover">
               <thead>
                 <tr>
                 <th>Flight Id</th>
                   <th>Registered user count</th>
                   <th>Guest user count</th>
                   <th>Total</th>
                   {/* <th>Email</th>
                   <th>Type</th>
                   <th>Passenger Count</th> */}
                   <th></th>
                   <th></th>
                 </tr>
               </thead>
               {allPastFlights?.map(row=>(
                  <tr>
                  <td>{row?.Flightid}</td>
                  <td>{row?.Registeredcount}</td>
                  <td>{row?.Guestcount}</td>
                  <td >{row?.Total}</td>
                </tr>
               ))

               }
             
             </table>
           </div>
         </div>
          }
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={()=>{ setFlightPassengers()
                                  setAllBookings();
                                  setAllPastFlights()}
                                 
                                  }>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>




{/* 
          {flightPassengers &&
          <div class="sales-boxes">
            <div class="recent-sales box">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Registered user count</th>
                    <th>Guest user count</th>
                    <th>Total</th>
             
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>                
                  <tr>
                  <td>{flightPassengers?.Registercount}</td>
                  <td>{flightPassengers?.Guestcount}</td>
                  <td>{flightPassengers?.Total}</td>

                </tr>
                </tbody>

              </table>
            </div>
          </div>}
          {allBookings &&
           <div class="sales-boxes">
           <div class="recent-sales box">
             <table className="table table-hover">
               <thead>
                 <tr>
                   <th>Registered user count</th>
                   <th>Guest user count</th>
                   <th>Total</th>
            
                   <th></th>
                   <th></th>
                 </tr>
               </thead>
               <tr>
                 <td>{allBookings?.Registercount}</td>
                 <td>{allBookings?.Guestcount}</td>
                 <td>{allBookings?.Total}</td>

               </tr>
             </table>
           </div>
         </div>
          }
           {allPastFlights &&
           <div class="sales-boxes">
           <div class="recent-sales box">
             <table className="table table-hover">
               <thead>
                 <tr>
                 <th>Flight Id</th>
                   <th>Registered user count</th>
                   <th>Guest user count</th>
                   <th>Total</th>
                   
                   <th></th>
                   <th></th>
                 </tr>
               </thead>
               {allPastFlights?.map(row=>(
                  <tr>
                  <td>{row?.Flightid}</td>
                  <td>{row?.Registeredcount}</td>
                  <td>{row?.Guestcount}</td>
                  <td >{row?.Total}</td>
                </tr>
               ))

               }
             
             </table>
           </div>
         </div>
          }
          
           */}

        </div>
      </section>
    </>
  );
};


export default ManagerDashboard;
