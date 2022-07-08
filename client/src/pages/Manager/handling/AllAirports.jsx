
import axios from "axios"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import AircraftServices from "../../../../services/AircraftServices";
import {Modal,Button } from 'react-bootstrap'

const AllAirports = () => {

    // const [searchParams, setSearchParams] = useSearchParams()
    // const filter = parseInt(searchParams.get("filter"))
    const [data,setData]=useState();
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setselectedAiportID()
        setShow(false)};
    const handleShow = () => setShow(true);
    const [ selectedAiportID,setselectedAiportID]=useState();
    const [ editAiport,  setEditAirport]=useState();
  

   
    const [modalAirport, setmodalAirport] = useState()
    // const [modalDiscountAmount, setmodalDiscountAmount] = useState(0)
    // const [startDate, setstartDate] = useState(null)
    //  const [endDate, setendDate] = useState(null)


    const navigate = useNavigate()
  
    
    // if (filter === 3) {
    //     ({ data, isPending, error } = useFetch("http://localhost:3001/api/authorized-user/onlyDeleted"))
    // } 
    // else if (filter === 2) {
    //     ({ data, isPending, error } = useFetch("http://localhost:3001/api/authorized-user/onlyActive"))
    // } else {
    //     ({ data, isPending, error } = useFetch("http://localhost:3001/api/authorized-user/all"))
    // }
    useEffect(()=>{
        getAllAirPorts();
        
    },[])

    const getAllAirPorts=async()=>{
        const AllAirPortsDetails= await AircraftServices.getallairports();
        // console.log(AllAirCraftTypesDetails.data.result)
        setData(AllAirPortsDetails.data)
        console.log()
    }

    const handleDelete = (AirCraftTypeID) => {
        if (window.confirm("Are you sure, you want to delete this Airport?") === true) {
            axios.delete("http://localhost:3001/api/airport/deleteAirport/" + AirCraftTypeID)
                .then(result => {
                    window.location.reload(false);
                })
                .catch(err => console.log(err))
        } else {
            return
        }
    }

    const handleEdit = (AirPortID,AirPortName) => {
        handleShow()
        setselectedAiportID({
            'AirPortID':AirPortID,'AirPortName':AirPortName})
        // navigate("/manager/handleaircrafts/addairport",{state: AirCraftTypeID})
    }

    const handleSelectQuery = (e) => {
        if (parseInt(e.target.value) === 1) navigate("../all-authorized-users?filter=1")
        else if (parseInt(e.target.value) === 2) navigate("../all-authorized-users?filter=2")
        else navigate("../all-authorized-users?filter=3")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
      
        if(selectedAiportID){
            const airportData = {
    
                name: editAiport['AirPortName']
                , id: editAiport['AirPortID']
           
            }
            console.log(airportData)
               

        axios.put("http://localhost:3001/api/airport/updateAirport",airportData)
        .then(result => {
            console.log(result)
            if (result.data.errType === "bad_request") {
                // document.getElementById("discount-invalid-feedback").innerHTML = result.data.errMessage
                // document.getElementById("discount-invalid-feedback").className = "alert alert-danger"
            } else {
                setShow(false)
                document.location.reload()
            }

        })
        .catch(err => {
            console.log(err)
        })

        }
        else{

            const airportData = {
    
                name: modalAirport
           
            }

        axios.post("http://localhost:3001/api/airport/addAirport",airportData)
            .then(result => {
                console.log(result)
                if (result.data.errType === "bad_request") {
                    // document.getElementById("discount-invalid-feedback").innerHTML = result.data.errMessage
                    // document.getElementById("discount-invalid-feedback").className = "alert alert-danger"
                } else {
                    setShow(false)
                    document.location.reload()
                }

            })
            .catch(err => {
                console.log(err)
            })
        }
    }


    return (
        <>
            <h2 className="add-margin-top">All AirPorts</h2> <br />
        
{/* 
            <select className="form-select" aria-label="Default select example"
                defaultValue={0}
                onChange={(e) => handleSelectQuery(e)}>
                <option value="0" disabled>Filter by:</option>
                <option value="1"  >All</option>
                <option value="2"  >Only Active</option>
                <option value="3"  >Only Deleted</option>
            </select> <br /> */}
{/* 
            {isPending && <p> Loading... </p>} */}
            {/* {error && <p>Error occured: {error} </p>} */}
            {/* {data && !data.success && <p>Error occured: {JSON.stringify(data.err)} </p>} */}
            <Button variant="primary" onClick={handleShow}>
                            Add new Airport
                        </Button> <br /> <br />
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>AirPort ID</th>
                            <th>Name</th>
                          
                            {/* <th>Email</th>
                            <th>Type</th>
                            <th>Status</th> */}
                            {/* <th></th>
                            <th></th> */}
                        </tr>
                    </thead>
                    <tbody>
                
                        {data?.result?.map(AirCraftTypeDetail => (
                            
                            <tr key={AirCraftTypeDetail?.airport_id} className={AirCraftTypeDetail?.status === 0 ? "table-danger" : ""} >
                                <td>{AirCraftTypeDetail?.airport_id}</td>
                                <td>{AirCraftTypeDetail?.name}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                {/* <td>{AirCraftTypeDetail?.description}</td> */}
                                {/* <td>{AirCraftTypeDetail.email}</td>
                                <td>{AirCraftTypeDetail.type === 1 ? "Manager" : "Admin"}</td>
                                <td>{AirCraftTypeDetail.status === 1 ? "Active" : "Deleted"}</td> */}

                                {!!AirCraftTypeDetail?.status &&
                                    <>
                                        <td><button className="btn btn-danger" onClick={() => handleDelete(AirCraftTypeDetail?.airport_id)}>Delete</button></td>
                                        <td><button className="btn btn-info" style={{marginRight:300,width:80}} onClick={() => handleEdit(AirCraftTypeDetail?.airport_id,AirCraftTypeDetail?.name)}>Edit</button></td>
                                    </>
                                }
                                {/* {!AirCraftTypeDetail?.status &&
                                    <>
                                        <td></td>
                                        <td></td>
                                    </>
                                } */}
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
                                <Modal.Title>{selectedAiportID? 'Edit Airport' :'Add an Airport'}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <form onSubmit={(e) => handleSubmit(e)}>

                                    {/* <p>Select discount type:</p>
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
                                    </div> <br /> */}

                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">Name</span>
                                        <input type="text" required  value={selectedAiportID? selectedAiportID['AirPortName']:''}
                                            onChange={(e) => setmodalAirport(setEditAirport({...selectedAiportID,'AirPortName':e.target.value}))}
                                                
                                        
                                            className="form-control" placeholder="Enter Airport Code" aria-label="amount" aria-describedby="basic-addon1" />
                                    </div> <br />


                                    {/* <div className="input-group mb-3">
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

                                    <div role="alert" id="discount-invalid-feedback">
                                    </div> */}

                                    <button type="submit" className="btn btn-primary">{selectedAiportID? 'Edit': 'Add' }</button> <br />
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
        </>
    );
}

export default AllAirports;