import useFetch from "./useFetch";
import axios from "axios"
import { useNavigate, useSearchParams } from "react-router-dom";

const AllAuthorizedUsers = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const filter = parseInt(searchParams.get("filter"))

    const navigate = useNavigate()
    var data, isPending, error;
    
    if (filter === 1) {
        ({ data, isPending, error } = useFetch("http://localhost:3001/api/authorized-user/all"))
    } 
    else if (filter === 2) {
        ({ data, isPending, error } = useFetch("http://localhost:3001/api/authorized-user/onlyActive"))
    } else {
        ({ data, isPending, error } = useFetch("http://localhost:3001/api/authorized-user/onlyDeleted"))
    }

    const handleDelete = (userID) => {
        if (window.confirm("are you sure, you want to delete this authorized user?") === true) {
            axios.delete("http://localhost:3001/api/authorized-user/delete/" + userID)
                .then(result => {
                    window.location.reload(false);
                })
                .catch(err => console.log(err))
        } else {
            return
        }
    }

    const handleEdit = (userID) => {
        navigate("../update-authorized-user/" + userID)
    }

    const handleSelectQuery = (e) => {
        if (parseInt(e.target.value) === 1) navigate("../all-authorized-users?filter=1")
        else if (parseInt(e.target.value) === 2) navigate("../all-authorized-users?filter=2")
        else navigate("../all-authorized-users?filter=3")
    }

    return (
        <>
            <h2 className="add-margin-top">All Authorized Users</h2> <br />

            <select className="form-select" aria-label="Default select example"
                defaultValue={0}
                onChange={(e) => handleSelectQuery(e)}>
                <option value="0" disabled>Filter by:</option>
                <option value="1"  >All</option>
                <option value="2"  >Only Active</option>
                <option value="3"  >Only Deleted</option>
            </select> <br />

            {isPending && <p> Loading... </p>}
            {error && <p>Error occured: {error} </p>}
            {data && !data.success && <p>Error occured: {JSON.stringify(data.err)} </p>}
            {data && data.success &&
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>UserID</th>
                            <th>Fisrt name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.result.map(authorizedUser => (
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
                    </tbody>
                </table>}
        </>
    );
}

export default AllAuthorizedUsers;