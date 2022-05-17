import { Routes, Route, NavLink } from "react-router-dom";
import AllRegisteredCustomers from "./AllRegisteredCustomers";
import CreateAuthorizedUser from "./CreateAuthorizedUser";
import CreateRegisteredCustomer from "./CreateRegisteredCustomer";
import './admin.css'
import AllAuthorizedUsers from "./AllAuthorizedUsers";
import UpdateRegisteredCustomer from "./UpdateRegisteredCustomer";
import UpdateAuthorizedUser from "./UpdateAuthorizedUser";

const AdminDashboard = () => {
    return (
        <div className="container">

            <h2 className="add-margin-top">Welcome Admin</h2>

            <ul>
                <li><NavLink to='/admin/all-registered-customers' >all-registered-customers</NavLink></li>
                <li><NavLink to='/admin/all-authorized-users' >all-authorized-users</NavLink></li>
                <li><NavLink to='/admin/create-authorized-user' >create-authorized-user</NavLink></li>
                <li><NavLink to='/admin/create-registered-customer' >create-registered-customer</NavLink></li>
            </ul>

            <Routes>
                <Route path="/all-registered-customers" element={<AllRegisteredCustomers />} />
                <Route path="/all-authorized-users" element={<AllAuthorizedUsers />} />
                <Route path="/create-authorized-user" element={<CreateAuthorizedUser />} />
                <Route path="/create-registered-customer" element={<CreateRegisteredCustomer />} />
                <Route path="/update-registered-customer/:id" element={<UpdateRegisteredCustomer />} />
                <Route path="/update-authorized-user/:id" element={<UpdateAuthorizedUser />} />
            </Routes>
        </div>
    );
}

export default AdminDashboard;