import useFetch from "./useFetch";
import axios from '../../../services/HttpServices'
import Swal from "sweetalert2";
import { useNavigate, useSearchParams } from "react-router-dom";

const AllRegisteredCustomers = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const filter = parseInt(searchParams.get("filter"))

    const navigate = useNavigate()
    var data, isPending, error;
    // ({ data, isPending, error } = useFetch("http://localhost:3001/api/registered-customer/all"))

    if (filter === 3) {
        ({ data, isPending, error } = useFetch("http://localhost:3001/api/registered-customer/onlyDeleted"))
    }
    else if (filter === 2) {
        ({ data, isPending, error } = useFetch("http://localhost:3001/api/registered-customer/onlyActive"))
    } else {
        ({ data, isPending, error } = useFetch("http://localhost:3001/api/registered-customer/all"))
    }

    const handleDelete = (userID) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete("http://localhost:3001/api/registered-customer/delete/" + userID)
                    .then(result => {
                        window.location.reload(false);
                    })
                    .catch(err => console.log(err))
            }
        })
    }

    const handleEdit = (userID) => {
        navigate("../update-registered-customer/" + userID)
    }

    const handleSelectQuery = (e) => {
        if (parseInt(e.target.value) === 1) navigate("../all-registered-customers?filter=1")
        else if (parseInt(e.target.value) === 2) navigate("../all-registered-customers?filter=2")
        else navigate("../all-registered-customers?filter=3")
    }

    return (
        <>
            <h2 className="add-margin-top">All Registered Customers</h2> <br />

            <select className="form-select" aria-label="Default select example"
                defaultValue={0}
                onChange={(e) => handleSelectQuery(e)}>
                <option value="0" disabled>Filter by:</option>
                <option value="1"  >All</option>
                <option value="2"  >Only Active</option>
                <option value="3"  >Only Deleted</option>
            </select>

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

                            <tr key={registeredCustomer.userID} className={registeredCustomer.status === 0 ? "table-danger" : ""}>
                                <td>{registeredCustomer.userID}</td>
                                <td>{registeredCustomer.firstname}</td>
                                <td>{registeredCustomer.lastname}</td>
                                <td>{registeredCustomer.email}</td>
                                <td>{registeredCustomer.status === 1 ? "Active" : "Deleted"}</td>

                                {!!registeredCustomer.status &&
                                    <>
                                        <td><a className="btn btn-danger" onClick={() => handleDelete(registeredCustomer.userID)}>Delete</a></td>
                                        <td><a className="btn btn-info" onClick={() => handleEdit(registeredCustomer.userID)} >Edit</a></td>
                                    </>
                                }
                                {!registeredCustomer.status &&
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

export default AllRegisteredCustomers;