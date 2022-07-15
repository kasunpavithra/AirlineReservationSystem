// import AdminNavbar from "./AdminNavbar";
import { Routes, Route, NavLink } from "react-router-dom";
// import AllRegisteredCustomers from "./AllRegisteredCustomers";
// import CreateAuthorizedUser from "./CreateAuthorizedUser";
// import CreateRegisteredCustomer from "./CreateRegisteredCustomer";
// import AllAuthorizedUsers from "./AllAuthorizedUsers";
// import UpdateRegisteredCustomer from "./UpdateRegisteredCustomer";
// import UpdateAuthorizedUser from "./UpdateAuthorizedUser";
// import AdminDashboardContent from "./AdminDashboardContent";
import './Manager.css'
import Layout from "../../Navbar/Layout/Layout";
import AllAirCraftTypes from "./AllAirCraftTypes";
import AddAirCraftType from './AddAirCraftType';
import ViewDiscounts from './../ViewDiscounts';
import AllAircrafts from './AllAircrafts';
import AddAirCraft from "./AddAirCraft";
import AllAirports from './AllAirports';
import AllAiportLevels from './AllAiportLevels';
import AllRoutes from "./AllRoutes";


const ManagerHandleAircrafts = () => {
    return (
        <>
            {/* <AdminNavbar /> */}
           <Layout/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4 col-lg-3 admin-panel">
                        <h3 className="mt-4">B-Airways</h3> <br />
                        <ul className="nav nav-pills flex-column">
                            <li className="nav-item">
                                <NavLink className="nav-link" style={{fontSize:22,fontFamily:'Times'}} to="/manager/handleaircrafts/all-aircraft-types"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/><path fillRule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z"/></svg> 
                                &nbsp; AirCraft Types</NavLink>
                            </li> <br />
                            <li className="nav-item">
                                <NavLink className="nav-link" style={{fontSize:22,fontFamily:'Times'}}  to="/manager/handleaircrafts/view-discounts"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg>
                                &nbsp; Discounts</NavLink>
                            </li> <br />
                            <li className="nav-item">
                                <NavLink className="nav-link" style={{fontSize:22,fontFamily:'Times'}}  to="/manager/handleaircrafts/all-aircrafts"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg>
                                &nbsp; AirCrafts</NavLink>
                            </li> <br />
                            <li className="nav-item">
                                <NavLink className="nav-link" style={{fontSize:22,fontFamily:'Times'}}  to="/manager/handleaircrafts/all-airports"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg>
                                &nbsp; Airports</NavLink>                                
                            </li> <br />
                            <li className="nav-item">
                                <NavLink className="nav-link" style={{fontSize:22,fontFamily:'Times'}}  to="/manager/handleaircrafts/all-airport-levels"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg>
                                &nbsp; Airport Levels</NavLink>
                            </li> <br/>
                            <li className="nav-item">
                                <NavLink className="nav-link" style={{fontSize:22,fontFamily:'Times'}}  to="/manager/handleaircrafts/all-routes"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg>
                                &nbsp; Routes</NavLink>
                            </li>
                        </ul>
                        <hr className="d-sm-none" />
                    </div>

                    <div className="col-sm-8 col-lg-9">
                        <Routes>
                 
                            <Route exact path="/all-aircraft-types" element={<AllAirCraftTypes />} />
                            <Route exact path="/addaircrafttype" element={<AddAirCraftType/>} />
                            <Route exact path="/all-aircrafts" element={<AllAircrafts/>} />
                             <Route exact path="/addaircraft" element={<AddAirCraft/>} />
                             <Route exact path="/all-flights" element={<AddAirCraft/>} />
                             <Route exact path="/all-airports" element={<AllAirports/>} />
                             <Route exact path="/all-airport-levels" element={<AllAiportLevels/>} />
                             <Route exact path="/all-routes" element={<AllRoutes/>} />
                          


                            <Route exact path="/view-discounts" element={<ViewDiscounts />} />
                            {/* <Route exact path="/update-registered-customer/:id" element={<UpdateRegisteredCustomer />} />
                            <Route exact path="/update-authorized-user/:id" element={<UpdateAuthorizedUser />} />
                            <Route exact path="/dashboard-content" element={<AdminDashboardContent />} /> 
                            <Route exact path="/*" element={<AdminDashboardContent />} />   */}
                        </Routes>
                    </div> 
                </div>
            </div>
        </>
    );
}

export default ManagerHandleAircrafts;