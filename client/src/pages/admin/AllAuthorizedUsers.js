import useFetch from "./useFetch";
import axios from "axios"

const AllAuthorizedUsers = () => {

    const { data, isPending, error } = useFetch("http://localhost:3001/api/authorized-user/all")

    const handleDelete = (userID) => {
        alert("are you sure, you want to delete this authorized user?")
        axios.delete("http://localhost:3001/api/authorized-user/delete/" + userID)
        .then(result => {
            window.location.reload(false);
        })
        .catch(err => console.log(err))
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
                            <th>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.result.map(authorizedUser => (
                            <tr key={authorizedUser.userID}>
                                <td>{authorizedUser.userID}</td>
                                <td>{authorizedUser.firstname}</td>
                                <td>{authorizedUser.lastname}</td>
                                <td>{authorizedUser.email}</td>
                                <td>{authorizedUser.status === 1 ? "Active" : "Deleted"}</td>
                                <td><a className="btn btn-danger" onClick={() => handleDelete(authorizedUser.userID)}>Delete</a></td>
                                <td><a className="btn btn-info" href="#">Edit</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
        </>
    );
}

export default AllAuthorizedUsers;