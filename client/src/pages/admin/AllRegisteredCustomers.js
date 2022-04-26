import useFetch from "./useFetch";

const AllRegisteredCustomers = () => {

    const { data, isPending, error } = useFetch("http://localhost:3001/api/registered-customer/all")

    return (
        <>
            <h2 className="add-margin-top">All Registered Customers</h2>
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
                            <tr>
                                <td>{registeredCustomer.userID}</td>
                                <td>{registeredCustomer.firstname}</td>
                                <td>{registeredCustomer.lastname}</td>
                                <td>{registeredCustomer.email}</td>
                                <td>{registeredCustomer.status === 1 ? "Active" : "Deleted"}</td>
                                <td><a className="btn btn-danger" href="#">Delete</a></td>
                                <td><a className="btn btn-info" href="#">Edit</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
        </>
    );
}

export default AllRegisteredCustomers;