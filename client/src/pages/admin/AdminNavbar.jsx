import './admin.css'

const AdminNavbar = () => {
    return (
        <>
            {/* <!-- A grey horizontal navbar that becomes vertical on small screens --> */}
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Admin-Panel</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                        </ul>
                        <form className="d-flex">
                            {/* <input className="form-control me-2" type="text" placeholder="Search" />
                                <button className="btn btn-primary" type="button">Search</button> */}
                            {/* <a className="nav-link" href="#">Signout</a> */}
                            <a className='btn btn-dark'>Signout</a>
                        </form>
                    </div>
                </div>
            </nav><br /><br />
        </>
    );
}

export default AdminNavbar;



