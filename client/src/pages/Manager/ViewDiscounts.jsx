// Assumptions (for discount table in DB):
//     - When manager adding a discount, he/she should add the relevent start and end DateTime accordingly 
//     (no dateTime conflicts)
//     - There should be a rate for each NO_DISCOUNT, FREQUENT, and GOLDEN discountClassType for current DateTime 

import { useEffect, useState } from "react"
import { Modal, Button } from 'react-bootstrap'
import axios from "axios";

const ViewDiscounts = () => {

    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const [show, setShow] = useState(false);
    const [modalDiscountType, setmodalDiscountType] = useState("FREQUENT")
    const [modalDiscountAmount, setmodalDiscountAmount] = useState(0)
    const [startDate, setstartDate] = useState(null)
    const [endDate, setendDate] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const handleSubmit = (e) => {
        e.preventDefault()
        // axios.post("http://localhost:3001/api/discount/add")
    }

    return (
        <>
            <div className="container"> <br /> <br />
                <h2>All Discounts</h2> <br /><br />

                {isPending && <p> Loading... </p>}
                {error && <p>Error occured: {error} </p>}
                {data && !data.success && <p>Error occured: {JSON.stringify(data.err)} </p>}
                {data && data.success &&
                    <>
                        <Button variant="primary" onClick={handleShow}>
                            Add new discount
                        </Button> <br /> <br />
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
                                        <td>{(discountElement.startTimeDate).split("T")[0] + " " + (discountElement.startTimeDate).split("T")[1].split(".000Z")[0]}</td>
                                        <td>{(discountElement.endTimeDate).split("T")[0] + " " + (discountElement.endTimeDate).split("T")[1].split(".000Z")[0]}</td>

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

                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Add a discount</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <form onSubmit={(e) => handleSubmit(e)}>

                                    <p>Select discount type:</p>
                                    <div className="form-check">
                                        <input className="form-check-input"
                                            type="radio"
                                            value="FREQUENT"
                                            name="flexRadioDefault" id="flexRadioDefault2"
                                            onClick={() => setmodalDiscountType("FREQUENT")}
                                            defaultChecked />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            FREQUENT
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input"
                                            type="radio"
                                            value="GOLDEN"
                                            onClick={() => setmodalDiscountType("GOLDEN")}
                                            name="flexRadioDefault" id="flexRadioDefault1" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            GOLDEN
                                        </label>
                                    </div> <br />

                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">Amount</span>
                                        <input type="number" step="0.01" required
                                            onChange={(e) => setmodalDiscountAmount(e.target.value)}
                                            className="form-control" placeholder="eg: 0.01 for 1% discount" aria-label="amount" aria-describedby="basic-addon1" />
                                    </div> <br />

                                    {/* <label for="startDate">Starting from: &emsp;</label>
                                    <input type="date" id="startDate" name="startDate"></input> <br /> <br />

                                    <label for="endDate">To: &emsp;&emsp;&emsp;</label>
                                    <input type="date" id="endDate" name="endDate"></input>
                                    <br /> */}

                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">Starting from</span>
                                        <input type="date" required
                                            onChange={(e) => setstartDate(e.target.value)}
                                            className="form-control" aria-label="startDate" aria-describedby="basic-addon1" />
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">To</span>
                                        <input type="date" required
                                            onChange={(e) => setendDate(e.target.value)}
                                            className="form-control" aria-label="endDate" aria-describedby="basic-addon1" />
                                    </div> <br />

                                    <button type="submit" className="btn btn-primary">Add</button>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                }
            </div>
        </>
    );
}

export default ViewDiscounts;