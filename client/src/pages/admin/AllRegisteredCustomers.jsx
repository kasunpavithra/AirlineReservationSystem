import useFetch from "./useFetch";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const AllRegisteredCustomers = () => {

    const navigate = useNavigate()

    const { data, isPending, error } = useFetch("http://localhost:3001/api/registered-customer/all")

    const handleDelete = (userID) => {
        if (window.confirm("are you sure, you want to delete this registered customer?") === true) {
            axios.delete("http://localhost:3001/api/registered-customer/delete/" + userID)
            .then(result => {
                window.location.reload(false);
            })
            .catch(err => console.log(err))
        } else {
            return
        }
    }

    const handleEdit = (userID) => {
        navigate("../update-registered-customer/" + userID)
    }

    return (
        <>
            <h2 className="add-margin-top">All Registered Customers</h2>
            <br />
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
                        {data.result.map(registeredCustomer => (
                            <tr key={registeredCustomer.userID}>
                                <td>{registeredCustomer.userID}</td>
                                <td>{registeredCustomer.firstname}</td>
                                <td>{registeredCustomer.lastname}</td>
                                <td>{registeredCustomer.email}</td>
                                <td>{registeredCustomer.status === 1 ? "Active" : "Deleted"}</td>
                                <td><a className="btn btn-danger" onClick={() => handleDelete(registeredCustomer.userID)}>Delete</a></td>
                                <td><a className="btn btn-info" onClick={() => handleEdit(registeredCustomer.userID)} >Edit</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
        </>
    );
}

export default AllRegisteredCustomers;