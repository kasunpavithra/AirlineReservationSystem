import { Routes, Route, NavLink } from "react-router-dom";
import AllGuests from "./AllGuests";
import AllRegisteredCustomers from "./AllRegisteredCustomers";
import CreateAuthorizedUser from "./CreateAuthorizedUser";

const AdminDashboard = () => {
    return (
        <>
            <h2>Admin dashboard</h2>

            <ul>
                <li><NavLink to='/admin/all-registered-customers' >all-registered-customers</NavLink></li>
                <li><NavLink to='/admin/all-guests' >all-guests</NavLink></li>
                <li><NavLink to='/admin/create-authorized-user' >create-authorized-user</NavLink></li>
            </ul>

            <Routes>
                <Route path="/all-registered-customers" element={<AllRegisteredCustomers/>} />
                <Route path="/all-guests" element={<AllGuests/>} />
                <Route path="/create-authorized-user" element={<CreateAuthorizedUser/>} />
            </Routes>
        </>
    );
}

export default AdminDashboard;