// Assumptions (for discount table in DB):
//     - When manager adding a discount, he/she should add the relevent start and end DateTime accordingly 
//     (no dateTime conflicts)
//     - There should be a rate for each NO_DISCOUNT, FREQUENT, and GOLDEN discountClassType for current DateTime 

import { useEffect, useState } from "react"

const ViewDiscounts = () => {

    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        const abortCont = new AbortController();

        fetch("http://localhost:3001/api/discount/all", { signal: abortCont.signal })
            .then(res => {
                if (!res.ok) throw Error("Could not fetch the data for that resource")
                return res.json()
            })
            .then(data => {
                setData(data)
                setIsPending(false)
                setError(null)
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    setIsPending(false)
                    setError(err.message)
                }
            })

        return () => { abortCont.abort(); }
    }, [])

    return (
        <>
            <div className="container"> <br /> <br />
                <h2>All Discounts</h2> <br /><br />

                {isPending && <p> Loading... </p>}
                {error && <p>Error occured: {error} </p>}
                {data && !data.success && <p>Error occured: {JSON.stringify(data.err)} </p>}
                {data && data.success &&
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>DiscountID</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>startTimeDate</th>
                                <th>endTimeDate</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.result.map(discountElement => (
                                <tr key={discountElement.discountID} className={discountElement.status === 0 ? "table-danger" : ""} >
                                    <td>{discountElement.discountID}</td>
                                    <td>{discountElement.discountClassType === 2 ? "NO_DISCOUNT" : (discountElement.discountClassType === 1 ? "FREQUENT" : "GOLDEN")}</td>
                                    <td>{discountElement.amount}</td>
                                    <td>{discountElement.status}</td>
                                    {/* <td>{discountElement.type === 1 ? "Manager" : "Admin"}</td>
                                    <td>{discountElement.status === 1 ? "Active" : "Deleted"}</td> */}
                                    <td>{(discountElement.startTimeDate).split("T")[0] + " " + (discountElement.startTimeDate).split("T")[1].split(".000Z")[0] }</td>
                                    <td>{(discountElement.endTimeDate).split("T")[0] + " " + (discountElement.endTimeDate).split("T")[1].split(".000Z")[0] }</td>

                                    {!!discountElement.status &&
                                        <>
                                            <td><a className="btn btn-danger" onClick={() => handleDelete(discountElement.discountID)}>Delete</a></td>
                                            <td><a className="btn btn-info" onClick={() => handleEdit(discountElement.discountID)}>Edit</a></td>
                                        </>
                                    }
                                    {!discountElement.status &&
                                        <>
                                            <td></td>
                                            <td></td>
                                        </>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </>
    );
}

export default ViewDiscounts;