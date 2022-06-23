import { Routes, Route, NavLink } from "react-router-dom";
import AllRegisteredCustomers from "./AllRegisteredCustomers";
import CreateAuthorizedUser from "./CreateAuthorizedUser";
import CreateRegisteredCustomer from "./CreateRegisteredCustomer";
import './admin.css'
import AllAuthorizedUsers from "./AllAuthorizedUsers";
import UpdateRegisteredCustomer from "./UpdateRegisteredCustomer";
import UpdateAuthorizedUser from "./UpdateAuthorizedUser";
import AdminPanel from "./AdminPanel";

const AdminDashboard = () => {
    return (
        <div className="container">
            <Routes>
                <Route path="/all-registered-customers" element={<AllRegisteredCustomers />} />
                <Route path="/all-authorized-users" element={<AllAuthorizedUsers />} />
                <Route path="/create-authorized-user" element={<CreateAuthorizedUser />} />
                <Route path="/create-registered-customer" element={<CreateRegisteredCustomer />} />
                <Route path="/update-registered-customer/:id" element={<UpdateRegisteredCustomer />} />
                <Route path="/update-authorized-user/:id" element={<UpdateAuthorizedUser />} />
                <Route path="/admin-panel" element={<AdminPanel />} />
            </Routes>

            <h2 className="add-margin-top">Welcome Admin</h2>

            <ul>
                <li><NavLink to='/admin/all-registered-customers?filter=1' >all-registered-customers</NavLink></li>
                <li><NavLink to='/admin/all-authorized-users?filter=1' >all-authorized-users</NavLink></li>
                <li><NavLink to='/admin/create-authorized-user' >create-authorized-user</NavLink></li>
                <li><NavLink to='/admin/create-registered-customer' >create-registered-customer</NavLink></li>
                <li><NavLink to='/admin/admin-panel' >admin-panel</NavLink></li>
            </ul>

            
        </div>
    );
}

export default AdminDashboard;