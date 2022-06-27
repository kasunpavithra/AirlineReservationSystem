import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";

import { Button, ButtonGroup, Card, Form, ToggleButton } from "react-bootstrap";
import "./managerStyle.css";
import ManagerServices from "../../../services/ManagerServices";
import managerValidation from "../../Validation/managerValidation";

const ManagerDashboard = () => {
  const [ageType, setAgeType] = useState([]);
  const [flightId,setFlightId] = useState();
  const [destinationId,setDestinationId] = useState();
  const [destinationDates,setDestinationDates]=useState('');
  const [flightPassengers,setFlightPassengers]=useState('');
  const [allPassengers,setAllPassengers]=useState('');

  const [FlightNumbers,setflightNumbers]=useState([]);
  const [Destinations,setDestinationNames]=useState([]);
  const [passengerTypes,setPassengerTypes]=useState([]);

  const [errorData, setError] = useState({'Flight No':'','Age Type':''});
  let sidebar = document.querySelector(".sidebar");
  let sidebarBtn = document.querySelector(".sidebarBtn");

  useEffect(() => {
    getFlightNumbers();
    getDestinationNames();
    getPassengerTypes();
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
      console.log(passengerTypes.data.result);
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
    ["18+", "1"],
    ["18-", "0"],
  ];
  const errors = {};

  const handleSubmitFlightPassengers=async(e)=>{
    e.preventDefault();
    const state={'Flight No':flightId,'Age Type':ageType.value}
    console.log(state);
    const {value,error}=managerValidation.ValidateFlightPassengers(state)
    console.log(error)
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
          setFlightPassengers(response.data.result[0].passengers)
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

    setError(errors);

  }

  const handleSubmitAllPassengers=async(e)=>{
    e.preventDefault();
    console.log('id',destinationId)
    var state={'Destination Id':destinationId,'Start Date':destinationDates['startDate'],'End Date':destinationDates['endDate']}
    // console.log(state);
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
          
          // console.log("State:", state);
          console.log("hello")
          const startDate=new Date(destinationDates['startDate']);
          const endDate=new Date(destinationDates['endDate']);

          startDate.setUTCHours(0, 0, 0);
          endDate.setUTCHours(23, 59, 59)
        
          
          state={'Destination Id':destinationId,'Start Date':startDate.toISOString(),'End Date':endDate.toISOString()}
          const response = await ManagerServices.getDateDestinationPassengers(state)

          console.log(response);
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

    setError(errors);

  }


  const handleSetAgeFlightPassengers = (event) => {
    // console.log("event is", event.split(",")[0]);
    // console.log('helllo',event)
    // console.log(event[0]);
    // console.log(event[1]);
    setAgeType({
      name: event[0],
      value: event[1],
    });
    
  };




  return (
    <>
      <div class="sidebar">
        <div class="ml-4 logo-details">
          <i class="pl-3 bx bx-bold"></i>
          <span class=" logo_name">Airways</span>
        </div>
        <ul class="nav-links">
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
          <li>
            <a href="#">
              <i class="bx bx-cog"></i>
              <span class="links_name">Setting</span>
            </a>
          </li>
          <li class="log_out">
            <a href="#">
              <i class="bx bx-log-out"></i>
              <span class="links_name">Log out</span>
            </a>
          </li>
        </ul>
      </div>



      <section class="home-section">
        <nav>
          <div class="sidebar-button">
            <i class="bx bx-menu sidebarBtn" onClick={handleSideBar}></i>
            <span class="dashboard">Manager</span>
          </div>
          <div class="search-box">
            <input type="text" placeholder="Search..." />
            <i class="bx bx-search"></i>
          </div>
          <div class="profile-details">
            {/* <!--<img src="images/profile.jpg" alt=""/>--> */}
            <span class="admin_name">Thushalya</span>
            <i class="bx bx-chevron-down"></i>
          </div>
        </nav>

        <div class="home-content">
          <div class="overview-boxes">
            <div class="box">
              <div class="right-side">
                <div class="box-topic">Flight Passengers</div>
             
                <Form onSubmit={handleSubmitFlightPassengers}>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-danger dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Flight No
                  </button>
        
                  {errorData['Flight No'] !== "" && <p className="error">{errorData['Flight No']}</p>}
                  {/* {errorData.NI !== "" && <p className="error">{errorData.NIC}</p>} */}
                  <div class="dropdown-menu">
                    {
                     FlightNumbers?.map((flightno,idx)=>(
                    
    
                    <button class="dropdown-item" value={flightno.flightID} type="button" onClick={(event)=>{setFlightId(event.target.value);}}>
                      {flightno.flightID}
                    </button>
                     ))}
                    
      
                  </div>
                </div>
                <div className="row">
                  <Form.Group>
                    <Form.Label>Age Type</Form.Label>
                    <div className="col-md-8">
                      <ButtonGroup className="mb-12">
              
                        {passengertypes?.map((radio, idx) => (
                          <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant={
                              idx % 2 ? "outline-primary" : "outline-primary"
                            }
                            name="radio"
                            value={radio[1]}
                            checked={ageType.value === radio[1]}
                            onChange={() => handleSetAgeFlightPassengers([radio[0], radio[1]])}
                          >
                            {radio[0]}
                          </ToggleButton>
                        ))}
                      </ButtonGroup>
                      {errorData['Age Type'] !== "" && <p className="error">{errorData['Age Type']}</p>}
                    </div>
               
                    <span className="col-5 number mr-5"> {flightPassengers? flightPassengers:'0'}</span>
                    <span>
                      <Button  type="submit">
                        search
                      </Button>
                    </span>
                    {/* {type_err != "" && <p className="error">{type_err}</p>} */}
                  </Form.Group>
                </div>
                </Form>
                <div class="indicator">
                  <i class="bx bx-up-arrow-alt"></i>
                  <span class="text">Up from yesterday</span>
                </div>
              </div>
              <i class="bx bx-cart-alt cart"></i>
            </div>
           






            <div class="box">
              <div class="right-side">
                <div class="box-topic">All Passengers</div>
              
                <Form onSubmit={handleSubmitAllPassengers}>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-danger dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Destination
                  </button>
                  {errorData['Destination Id'] !== "" && <p className="error">{errorData['Destination Id']}</p>}
                     {/* {errorData.NI !== "" && <p className="error">{errorData.NIC}</p>} */}
                     <div class="dropdown-menu">
                    {
                     Destinations?.map((Destination,idx)=>(
                    
    
                    <button class="dropdown-item" value={Destination.airport_id} type="button" onClick={(event)=>{setDestinationId(event.target.value);}}>
                      {Destination.name}
                    </button>
                     ))}
                   
                  </div>
                </div>
                <div class="container">
                  Start Date: <input type="date" name='startDate' id="startDate" onChange={(event)=>{setDestinationDates({...destinationDates,[event.target.name]: event.target.value})}} width="276" />
                  {errorData['Start Date'] !== "" && <p className="error">{errorData['Start Date']}</p>}
                  <br></br>
                  End Date: <input type="date" name='endDate' id="endDate"   onChange={(event)=>{setDestinationDates({...destinationDates,[event.target.name]: event.target.value})}} width="276" />
                  {errorData['End Date'] !== "" && <p className="error">{errorData['End Date']}</p>}
                </div>
                <div class="number">{allPassengers? allPassengers:'0'}</div>
                <span>
                  <Button type="submit">search</Button>
                </span>
                </Form>
                <div class="indicator">
                  <i class="bx bx-up-arrow-alt"></i>
                  <span class="text">Up from yesterday</span>
                </div>
              </div>
              <i class="bx bxs-cart-add cart two"></i>
            </div>


            <div class="box">
              <div class="right-side">
                <div class="box-topic">All Bookings</div>
                Passenger Type
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-danger dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Action
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">
                      Separated link
                    </a>
                  </div>
                </div>
                <div class="container">
                  Start Date: <input type="date" id="startDate" width="276" />
                  <br></br>
                  End Date: <input type="date" id="endDate" width="276" />
                </div>
                <div class="number">$12,876</div>
                <div class="indicator">
                  <i class="bx bx-up-arrow-alt"></i>
                  <span class="text">Up from yesterday</span>
                </div>
              </div>
              <i class="bx bx-cart cart three"></i>
            </div>


            <div class="box">
              <div class="right-side">
                <div class="box-topic">Total Revenue</div>
                AirCraft Type
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-danger dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Action
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">
                      Separated link
                    </a>
                  </div>
                </div>
                <div class="number">11,086</div>
                <div class="indicator">
                  <i class="bx bx-down-arrow-alt down"></i>
                  <span class="text">Down From Today</span>
                </div>
              </div>
              <i class="bx bxs-cart-download cart four"></i>
            </div>




            <div class="box">
              <div class="right-side">
                <div class="box-topic">Past Flights</div>
                Origin
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-danger dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Action
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">
                      Separated link
                    </a>
                  </div>
                </div>
                <br></br>
                Destination
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-danger dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Action
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">
                      Separated link
                    </a>
                  </div>
                </div>
                <div class="number">11,086</div>
                <div class="indicator">
                  <i class="bx bx-down-arrow-alt down"></i>
                  <span class="text">Down From Today</span>
                </div>
              </div>
              <i class="bx bxs-cart-download cart four"></i>
            </div>
          </div>






          <div class="sales-boxes">
            <div class="recent-sales box">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>FlightID</th>
                    <th>Flight name</th>
                    <th>State</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Passenger Count</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                {/* <tbody> */}
                {/* {data.result.map(authorizedUser => (
                            <tr key={authorizedUser.userID} className={authorizedUser.status === 0 ? "table-danger" : ""} >
                                <td>{authorizedUser.userID}</td>
                                <td>{authorizedUser.firstname}</td>
                                <td>{authorizedUser.lastname}</td>
                                <td>{authorizedUser.email}</td>
                                <td>{authorizedUser.type === 1 ? "Manager" : "Admin"}</td>
                                <td>{authorizedUser.status === 1 ? "Active" : "Deleted"}</td>

                                {!!authorizedUser.status &&
                                    <>
                                        <td><a className="btn btn-danger" onClick={() => handleDelete(authorizedUser.userID)}>Delete</a></td>
                                        <td><a className="btn btn-info" onClick={() => handleEdit(authorizedUser.userID)}>Edit</a></td>
                                    </>
                                }
                                {!authorizedUser.status &&
                                    <>
                                        <td></td>
                                        <td></td>
                                    </>
                                }
                            </tr>
                        ))}
                    </tbody> */}
              </table>
            </div>
            <div class="top-sales box">
              <div class="title">Top Seling Product</div>
              <ul class="top-sales-details">
                <li>
                  <a href="#">
                    {/* <!--<img src="images/sunglasses.jpg" alt="">--> */}
                    <span class="product">Vuitton Sunglasses</span>
                  </a>
                  <span class="price">$1107</span>
                </li>
                <li>
                  <a href="#">
                    {/* <!--<img src="images/jeans.jpg" alt="">--> */}
                    <span class="product">Hourglass Jeans </span>
                  </a>
                  <span class="price">$1567</span>
                </li>
                <li>
                  <a href="#">
                    {/* <!-- <img src="images/nike.jpg" alt="">--> */}
                    <span class="product">Nike Sport Shoe</span>
                  </a>
                  <span class="price">$1234</span>
                </li>
                <li>
                  <a href="#">
                    {/* <!--<img src="images/scarves.jpg" alt="">--> */}
                    <span class="product">Hermes Silk Scarves.</span>
                  </a>
                  <span class="price">$2312</span>
                </li>
                <li>
                  <a href="#">
                    {/* <!--<img src="images/blueBag.jpg" alt="">--> */}
                    <span class="product">Succi Ladies Bag</span>
                  </a>
                  <span class="price">$1456</span>
                </li>
                <li>
                  <a href="#">
                    {/* <!--<img src="images/bag.jpg" alt="">--> */}
                    <span class="product">Gucci Womens's Bags</span>
                  </a>
                  <span class="price">$2345</span>
                </li>
                <li>
                  <a href="#">
                    {/* <!--<img src="images/addidas.jpg" alt="">--> */}
                    <span class="product">Addidas Running Shoe</span>
                  </a>
                  <span class="price">$2345</span>
                </li>
                <li>
                  <a href="#">
                    {/* <!--<img src="images/shirt.jpg" alt="">--> */}
                    <span class="product">Bilack Wear's Shirt</span>
                  </a>
                  <span class="price">$1245</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default ManagerDashboard;
