import { Routes, Route, NavLink } from "react-router-dom";
import AllGuests from "./AllGuests";
import AllRegisteredCustomers from "./AllRegisteredCustomers";
import CreateAuthorizedUser from "./CreateAuthorizedUser";
import CreateRegisteredCustomer from "./CreateRegisteredCustomer";
import './admin.css'

const AdminDashboard = () => {
    return (
        <div className="container">
            
            <h2 className="add-margin-top">Welcome Admin</h2>

            <ul>
                <li><NavLink to='/admin/all-registered-customers' >all-registered-customers</NavLink></li>
                <li><NavLink to='/admin/all-guests' >all-guests</NavLink></li>
                <li><NavLink to='/admin/create-authorized-user' >create-authorized-user</NavLink></li>
                <li><NavLink to='/admin/create-registered-customer' >create-registered-customer</NavLink></li>
            </ul>

            <Routes>
                <Route path="/all-registered-customers" element={<AllRegisteredCustomers />} />
                <Route path="/all-guests" element={<AllGuests />} />
                <Route path="/create-authorized-user" element={<CreateAuthorizedUser />} />
                <Route path="/create-registered-customer" element={<CreateRegisteredCustomer />} />
            </Routes>
        </div>
    );
}

export default AdminDashboard;