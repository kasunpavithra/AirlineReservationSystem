import useFetch from "./useFetch";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const AllAuthorizedUsers = () => {

    const navigate = useNavigate()
    const { data, isPending, error } = useFetch("http://localhost:3001/api/authorized-user/all")

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

    return (
        <>
            <h2 className="add-margin-top">All Authorized Users</h2>
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