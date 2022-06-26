import { useEffect, useState } from "react";
//apiurl for guestUser= "/api/bookings/getGuestUserBooking/:id"
//apiurl for RegistertUser= "/api/bookings/getRegUserBooking/:id"
const ViewBookings = () => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    var v = 0;

    useEffect(() => {
        //const abortCont = new AbortController();

        fetch("http://localhost:3001/api/bookings/getRegUserBooking/1")
            .then(res => {
                if (!res.ok) throw Error("Could not fetch the data for that resource")
                return res.json()
            })
            .then(data => {
                setData(data)
                setIsPending(false)
                setError(null)
                console.log(data)
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted', err)
                } else {
                    setIsPending(false)
                    setError(err.message)
                }
            })

        //return () => { abortCont.abort(); }
    }, [])

    return (
        <>
            <h2>All bookings</h2>
            <br />
            {isPending && <p> Loading... </p>}
            {error && <p>Error occured: {error} </p>}
            {data && !data.success && <p>Error occured: {JSON.stringify(data.err)} </p>}
            {data && data.success &&
                <><table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Flight ID</th>
                            <th>Payment Status</th>
                            <th>Booking Time</th>
                            <th>Class ID</th>
                            <th>Aircraft Seat ID</th>
                            <th>Discount ID</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.result.map(user => {
                            if (user.status === 1) {
                                console.log("Athulata ava")
                                v += 1;
                                return (<tr key={user.bookingID}>
                                    <td>{user.bookingID}</td>
                                    <td>{user.flightID}</td>
                                    <td>{user.paymentStatus}</td>
                                    <td>{user.bookingTimeDate}</td>
                                    <td>{user.classID}</td>
                                    <td>{user.airCraftseatID}</td>
                                    <td>{user.discountID}</td>

                                </tr>);
                            }
                        })}

                    </tbody>
                </table>
                {v == 0 && (<h1>No Bookings</h1>)}
                </>
            }
        </>
    );
}

export default ViewBookings;