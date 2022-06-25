import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./admin.css"

const AdminDashboardContent = () => {

    const [totalRegusers, settotalRegusers] = useState("")
    const [totalAuthorizedusers, settotalAuthorizedusers] = useState("")

    // useEffect(() => {
      
    // }, [])
    

    return (
        <>
            <h2 className="add-margin-top">Admin dashboard</h2> <br />


            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-2">
                <div className="col">
                    <div className="card radius-10 border-start border-0 border-3 border-success">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div>
                                    <p className="mb-0 text-secondary">Total Registered Customers</p>
                                    <h4 className="my-1 text-success">4805</h4>
                                    <p className=""><NavLink className="mb-0 font-13 admin-card-link" to="/admin/all-registered-customers">View-All</NavLink>
                                    </p>
                                </div>
                                <p className="margin-left-top">
                                    <button className="btn btn-success">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                            <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                                            <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                                        </svg>
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card radius-10 border-start border-0 border-3 border-warning">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div>
                                    <p className="mb-0 text-secondary">Total Authorized Users</p>
                                    <h4 className="my-1 text-warning">4805</h4>
                                    <p className=""><NavLink className="mb-0 font-13 admin-card-link" to="/admin/all-authorized-users">View-All</NavLink>
                                    </p>
                                </div>
                                <p className="margin-left-top">
                                    <button className="btn btn-warning">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                                        </svg>
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
}

export default AdminDashboardContent;