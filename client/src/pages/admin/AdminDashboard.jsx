import AdminNavbar from "./AdminNavbar";
import { Routes, Route, NavLink } from "react-router-dom";
import AllRegisteredCustomers from "./AllRegisteredCustomers";
import CreateAuthorizedUser from "./CreateAuthorizedUser";
import CreateRegisteredCustomer from "./CreateRegisteredCustomer";
import AllAuthorizedUsers from "./AllAuthorizedUsers";
import UpdateRegisteredCustomer from "./UpdateRegisteredCustomer";
import UpdateAuthorizedUser from "./UpdateAuthorizedUser";
import AdminDashboardContent from "./AdminDashboardContent";
import './admin.css'

const AdminDashboard = () => {
    return (
        <>
            <AdminNavbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4 col-lg-3 admin-panel">
                        <h3 className="mt-4">B-Airways</h3> <br />
                        <ul className="nav nav-pills flex-column">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin/dashboard-content"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-speedometer" viewBox="0 0 16 16"><path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2zM3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.389.389 0 0 0-.029-.518z"/><path fillRule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z"/></svg> 
                                &nbsp; admin-dashboard</NavLink>
                            </li> <br />
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin/all-registered-customers"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg>
                                &nbsp; all-registered-customers</NavLink>
                            </li> <br />
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin/all-authorized-users"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg>
                                &nbsp; all-authorized-users</NavLink>
                            </li> <br />
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin/create-authorized-user"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg>
                                &nbsp; create-authorized-user</NavLink>                                
                            </li> <br />
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin/create-registered-customer"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg>
                                &nbsp; create-registered-customer</NavLink>
                            </li>
                        </ul>
                        <hr className="d-sm-none" />
                    </div>

                    <div className="col-sm-8 col-lg-9">
                        <Routes>
                            
                            <Route exact path="/all-registered-customers" element={<AllRegisteredCustomers />} />
                            <Route exact path="/all-authorized-users" element={<AllAuthorizedUsers />} />
                            <Route exact path="/create-authorized-user" element={<CreateAuthorizedUser />} />
                            <Route exact path="/create-registered-customer" element={<CreateRegisteredCustomer />} />
                            <Route exact path="/update-registered-customer/:id" element={<UpdateRegisteredCustomer />} />
                            <Route exact path="/update-authorized-user/:id" element={<UpdateAuthorizedUser />} />
                            <Route exact path="/dashboard-content" element={<AdminDashboardContent />} />
                            <Route exact path="/*" element={<AdminDashboardContent />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;