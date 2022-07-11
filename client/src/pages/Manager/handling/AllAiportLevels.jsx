
import axios from "axios"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import AircraftServices from "../../../../services/AircraftServices";
import {Modal,Button } from 'react-bootstrap'
import Swal from "sweetalert2";

const AllAiportLevels = () => {

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
     
    const [modalRank, setmodalRank] = useState()
    
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

   const  showErr = ()=>{
        Swal.fire({  
          icon: 'error',  
          title: 'Oops...',  
          text: 'Error Adding Airport Level',  
        }).then(()=>{
          window.location.reload();
        });
      }
    
      const showAddSuccess = ()=>{
        Swal.fire({
          icon: 'success',
          title: 'Success',    
          text: 'Successfully Added Airport Level',  
        }).then(()=>{
        //   this.props.navigate("/dashboard",{ replace: true });
        window.location.reload(false)

        });
      }

      const showEditSuccess = ()=>{
        Swal.fire({
          icon: 'success',
          title: 'Success',    
          text: 'Successfully Edited Airport Level',  
        }).then(()=>{
        //   this.props.navigate("/dashboard",{ replace: true });
        window.location.reload(false)

        });
      }

     

    useEffect(()=>{
        getAllAirPorts();
        
    },[])

    const getAllAirPorts=async()=>{
        const AllAirPortsDetails= await AircraftServices.getalllevels();
        // console.log(AllAirCraftTypesDetails.data.result)
        setData(AllAirPortsDetails.data)
        console.log(AllAirPortsDetails)
    }

    const handleDelete = (AirCraftTypeID) => {
       
            Swal.fire({
              icon: 'warning',
              title: 'Are you sure?',    
              text: "You won't be able to revert this!", 
              showCancelButton:true,
              confirmButtonColor:'#3085d6',
              cancelButtonColor:'#d33',
              confirmButtonText:'Yes delete it!' 
            }).then((result)=>{
            //   this.props.navigate("/dashboard",{ replace: true });
            // document.location.reload()
            if(result.isConfirmed){
                axios.delete("http://localhost:3001/api/level/deleteLevel/" + AirCraftTypeID)
            .then(result => {

                Swal.fire(
                    'Deleted!',
                    'Selected Airport Level has been deleted.',
                    'success'
                 ).then((result)=>
                window.location.reload(false)
                )
               
                
            })
            .catch(err => console.log(err))
            // window.location.reload(false);

        }
    
            });
          

    }

    const handleEdit = (AirPortID,AirPortName,AirPortRank) => {
        handleShow()
        setselectedAiportID({
            'AirPortID':AirPortID,'AirPortName':AirPortName,'AirPortRank':AirPortRank})
        
        // navigate("/manager/handleaircrafts/addairport",{state: AirCraftTypeID})
    }

    const handleSelectQuery = (e) => {
        if (parseInt(e.target.value) === 1) navigate("../all-authorized-users?filter=1")
        else if (parseInt(e.target.value) === 2) navigate("../all-authorized-users?filter=2")
        else navigate("../all-authorized-users?filter=3")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(selectedAiportID)
     
        if(selectedAiportID){
            const airportData = {
    
                levelName: selectedAiportID['AirPortName'],
                levelrank:selectedAiportID['AirPortRank'],
                id: selectedAiportID['AirPortID']
           
            }
            console.log(airportData)
               

        axios.put("http://localhost:3001/api/level/updateLevel",airportData)
        .then(result => {
            console.log(result)
            if (result.data.errType === "bad_request") {
                // document.getElementById("discount-invalid-feedback").innerHTML = result.data.errMessage
                // document.getElementById("discount-invalid-feedback").className = "alert alert-danger"
            } else {
                setShow(false)
                showEditSuccess()
               
            }

        })
        .catch(err => {
            console.log(err)
            showErr()
        })

        }
        else{

            const levelData = {
    
                levelName: modalAirport['AirPortName'],
                levelrank: modalAirport['AirPortRank']
           
            }
            console.log(levelData)

        axios.post("http://localhost:3001/api/level/addLevel",levelData)
            .then(result => {
                console.log(result)
                if (result.data.errType === "bad_request") {
                    // document.getElementById("discount-invalid-feedback").innerHTML = result.data.errMessage
                    // document.getElementById("discount-invalid-feedback").className = "alert alert-danger"
                } else {
                    setShow(false)
                    
                    // document.location.reload()
                    showAddSuccess()
                }

            })
            .catch(err => {
                console.log(err)
                showErr()
            })
        }
    }


    return (
        <>
            <h2 className="add-margin-top">All AirPort Levels</h2> <br />
        
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
                            Add new Airport Level
                        </Button> <br /> <br />
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>AirPort Level ID</th>
                            <th>Name</th>
                            <th>Rank</th>
                          
                            {/* <th>Email</th>
                            <th>Type</th>
                            <th>Status</th> */}
                            {/* <th></th>
                            <th></th> */}
                        </tr>
                    </thead>
                    <tbody>
                
                        {data?.result?.map(AirCraftTypeDetail => (
                            
                            <tr key={AirCraftTypeDetail?.levelID} className={AirCraftTypeDetail?.status === 0 ? "table-danger" : ""} >
                                <td>{AirCraftTypeDetail?.levelID}</td>
                                <td>{AirCraftTypeDetail?.levelName}</td>
                                <td>{AirCraftTypeDetail?.levelrank}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                {/* <td>{AirCraftTypeDetail?.description}</td> */}
                                {/* <td>{AirCraftTypeDetail.email}</td>
                                <td>{AirCraftTypeDetail.type === 1 ? "Manager" : "Admin"}</td>
                                <td>{AirCraftTypeDetail.status === 1 ? "Active" : "Deleted"}</td> */}

                                {
                                    <>
                                        <td><button className="btn btn-danger" onClick={() => handleDelete(AirCraftTypeDetail?.levelID)}>Delete</button></td>
                                        <td><button className="btn btn-info" style={{marginRight:300,width:80}} onClick={() => handleEdit(AirCraftTypeDetail?.levelID,AirCraftTypeDetail?.levelName,AirCraftTypeDetail.levelrank)}>Edit</button></td>
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
                <Modal style={{marginTop:150}}
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>{selectedAiportID? 'Edit Airport Level' :'Add an Airport Level'}</Modal.Title>
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

                                    <div className="input-group  mt-3">
                                        <span className="input-group-text" id="basic-addon1">Name</span>
                                        {selectedAiportID? <input type="text" required  defaultValue={selectedAiportID? selectedAiportID['AirPortName']:''}
                                            onChange={(e) => setselectedAiportID({...selectedAiportID,'AirPortName':e.target.value})}
                                             className="form-control" placeholder="Enter Level Name" aria-label="amount" aria-describedby="basic-addon1" />:
                                             <input type="text" required
                                            onChange={(e) => setmodalAirport({...modalAirport,'AirPortName': e.target.value})}
                                             className="form-control" placeholder="Enter Level Name" aria-label="amount" aria-describedby="basic-addon1" />}
                                  

                                        
                                            
                                    </div> <br />
                                    <div className="input-group mb-3" >
 
                                        <span className="input-group-text" style={{paddingRight:21}} id="basic-addon1">Rank</span>
 
                                         {selectedAiportID? <input type="number" step="1" required  defaultValue={selectedAiportID? selectedAiportID['AirPortRank']:''}
                                            onChange={(e) => setselectedAiportID({...selectedAiportID,'AirPortRank':e.target.value})}
                                             className="form-control" placeholder="Select Level Rank" aria-label="amount" aria-describedby="basic-addon1" />:
                                             <input type="number" required step="1"
                                            onChange={(e) => setmodalAirport({...modalAirport,'AirPortRank': e.target.value})}
                                             className="form-control" placeholder="Select Level Rank" aria-label="amount" aria-describedby="basic-addon1" />}
                                  

                                        
                                            
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
                                <Button variant="danger"  onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
        </>
    );
}

export default AllAiportLevels;