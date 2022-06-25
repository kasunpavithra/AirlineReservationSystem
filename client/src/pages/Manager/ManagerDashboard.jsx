import React from 'react'
import Navbar from "../Navbar/Navbar";
// import { Routes, Route } from "react-router-dom";
// import AllRegisteredCustomers from "./AllRegisteredCustomers";
// import CreateAuthorizedUser from "./CreateAuthorizedUser";
// import CreateRegisteredCustomer from "./CreateRegisteredCustomer";
// import AllAuthorizedUsers from "./AllAuthorizedUsers";
// import UpdateRegisteredCustomer from "./UpdateRegisteredCustomer";
// import UpdateAuthorizedUser from "./UpdateAuthorizedUser";
// import AdminDashboardContent from "./AdminDashboardContent";
import './managerStyle.css'

const ManagerDashboard=()=>{
  return (
    <>
    <Navbar />
    {/* <div className="container-fluid">
        <div className="row">
            <div className="col-sm-4 col-lg-3" >
                <h3 className="mt-4">B-Airways</h3>
                <ul className="nav nav-pills flex-column">
                    <li className="nav-item">
                        <a className="nav-link" href="/Manager">Manager-Dashboard</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/Manager/all-registered-customers">all-registered-customers</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/Manager/all-authorized-users">all-authorized-users</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/Manager/create-authorized-user">create-authorized-user</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/Manager  /create-registered-customer">create-registered-customer</a>
                    </li>
                </ul>
                <hr className="d-sm-none" />
            </div>


            <div className="col-sm-8 col-lg-9">
                <Routes>
                    <Route exact path="/" element={<AdminDashboardContent />} />
                    <Route exact path="/all-registered-customers" element={<AllRegisteredCustomers />} />
                    <Route exact path="/all-authorized-users" element={<AllAuthorizedUsers />} />
                    <Route exact path="/create-authorized-user" element={<CreateAuthorizedUser />} />
                    <Route exact path="/create-registered-customer" element={<CreateRegisteredCustomer />} />
                    <Route exact path="/update-registered-customer/:id" element={<UpdateRegisteredCustomer />} />
                    <Route exact path="/update-authorized-user/:id" element={<UpdateAuthorizedUser />} />
                </Routes>
            </div>
        </div>
    </div> */}
</>
  )
}

export default ManagerDashboard