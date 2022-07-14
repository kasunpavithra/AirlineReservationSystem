
import axios from "../../../../services/HttpServices"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import AircraftServices from "../../../../services/AircraftServices";
import {Modal,Button,Accordion } from 'react-bootstrap'
import Swal from "sweetalert2";

const AllAirports = () => {

    // const [searchParams, setSearchParams] = useSearchParams()
    // const filter = parseInt(searchParams.get("filter"))
    const [data,setData]=useState();
    const [show, setShow] = useState(false);
    const [allAirPortLevels,  setAllAirPortLevels] = useState();
    const [selectedLevelType,  setselectedLevelType] = useState();
    const [allRemovedAirPortLevels,     setAllRemovedAirPortLevels] = useState();
    const [tempAirPortLevels,       settempAirPortLevels] = useState({});
    const [airportlevels,  setAirportLevels] = useState();
    
  
 
   
    const [levels,setLevel]=useState([{}
        

       
    ])
       
    const [lst1, setIndex]=useState([])
   

    
    const handleClose = () => {
        // setselectedAiportID()
        setLevel([{}])
        setAllAirPortLevels()
        setShow(false)};

       
    const handleShow = () => {
     
        getAllAirPortLevels()
        setIndex([])
        setShow(true);
    }

        const getAllAirPortLevels=async()=>{
            const AllAirPortsDetails= await AircraftServices.getalllevels();
        
            setAllAirPortLevels(AllAirPortsDetails.data.result)
            settempAirPortLevels(AllAirPortsDetails.data.result)

        }
    
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

   const  showErr = ()=>{
        Swal.fire({  
          icon: 'error',  
          title: 'Oops...',  
          text: 'Error Adding Airport',  
        }).then(()=>{
          window.location.reload();
        });
      }
    
      const showAddSuccess = ()=>{
        Swal.fire({
          icon: 'success',
          title: 'Success',    
          text: 'Successfully Added Airport',  
        }).then(()=>{
        //   this.props.navigate("/dashboard",{ replace: true });
        window.location.reload(false)

        });
      }

      const showEditSuccess = ()=>{
        Swal.fire({
          icon: 'success',
          title: 'Success',    
          text: 'Successfully Edited Airport',  
        }).then(()=>{
        //   this.props.navigate("/dashboard",{ replace: true });
        window.location.reload(false)

        });
      }

     

    useEffect(()=>{
        getAllAirPorts();
  
        
    },[])

    const getAllAirPorts=async()=>{
        const AllAirPortsDetails= await AircraftServices.getallairports();

        setData(AllAirPortsDetails.data)
        console.log(AllAirPortsDetails)

       
    }
    
    const getAirPortLevels=async(AirPortID)=>{
        const AllAirPortsDetails= await AircraftServices.getairportlevels(AirPortID);
        console.log(AllAirPortsDetails)

        setLevel(AllAirPortsDetails.data.result)
        

       
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
                axios.delete("http://localhost:3001/api/airport/deleteAirport/" + AirCraftTypeID)
            .then(result => {

                Swal.fire(
                    'Deleted!',
                    'Selected Airport has been deleted.',
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


    const  handleLevel = (AirPortID,AirPortName) => {
        handleShow()
        getAirPortLevels(AirPortID)
       
     
        setselectedAiportID({
            'AirPortID':AirPortID,'AirPortName':AirPortName})
        // navigate("/manager/handleaircrafts/addairport",{state: AirCraftTypeID})
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
       
        var levelData=[]
        if(selectedAiportID){
            levels?.map((item,index)=>{
            
                levelData=[...levelData,[item.levelID,item.value,item.airportlevelDetailID]]
    
    
            })
            console.log(levelData)
    
            const updateData = {
    
                airport_id:selectedAiportID['AirPortID'],
                infoArray:levelData
           
            }
            console.log(updateData)

            const updateName = {
    
                name: editAiport['AirPortName']
                , id: editAiport['AirPortID']
           
            }

        console.log(levels)
  

               

        axios.put("http://localhost:3001/api/airport/updateAirport",updateName)
        .then(result => {
            console.log(result)
            if (result.data.errType === "bad_request") {
                // document.getElementById("discount-invalid-feedback").innerHTML = result.data.errMessage
                // document.getElementById("discount-invalid-feedback").className = "alert alert-danger"
            } else {
                setShow(false)

                axios.put("http://localhost:3001/api/airportInfo/updateAirportInfo",updateData)
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
        
                // showEditSuccess()
               
            }

        })
        .catch(err => {
            console.log(err)
            showErr()
        })



        }
        else{
            var levelData=[]
            levels?.map((item,index)=>{
                
                levelData=[...levelData,[item.levelID,item.value]]


            })
            console.log(levelData)

            const airportData = {
    
                airportName: modalAirport,
                infoArray:levelData
           
            }
            console.log(airportData)

        axios.post("http://localhost:3001/api/airportInfo/addAirportInfo",airportData)
            .then(result => {
                console.log(result)
                if (result.data.errType === "bad_request") {
                    // document.getElementById("discount-invalid-feedback").innerHTML = result.data.errMessage
                    // document.getElementById("discount-invalid-feedback").className = "alert alert-danger"
                } else {
                    setShow(false)
                    
                    document.location.reload()
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
                            <th></th>
                          
                            {/* <th>Email</th>
                            <th>Type</th>
                            <th>Status</th> */}
                            {/* <th></th>
                            <th></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        
                
                        {data?.result?.map((AirCraftTypeDetail,index) => (
                            
                            <tr key={AirCraftTypeDetail?.airport_id} className={AirCraftTypeDetail?.status === 0 ? "table-danger" : ""} >
                                <td>{AirCraftTypeDetail?.airport_id}</td>
          
                                <b  style={{paddingTop:'3'}}><td>{AirCraftTypeDetail?.name}</td></b>
                                <td >

                        

                                <div key={index}>
                                    <Accordion style={{border:'20 solid'}}  >
                                        <Accordion.Item  eventKey="0">
                                            <Accordion.Header > See Location levels</Accordion.Header>
                                            <Accordion.Body style={{background:'#2fa1ff',justifyContent:'center'}} >
                                                {AirCraftTypeDetail?.location.map((location,index)=><>
                                                <div style={{display:'flex',justifyContent:'flex-start'}}>
                                                    <h4>{location.levelName}</h4>  :-
                                                    &nbsp;
                                                    <h5 style={{marginTop:'1px'}}>{location.value} </h5>
                                                </div>
                                                </>
                                                )}
                                          
                                            </Accordion.Body>
                                        </Accordion.Item>

                                    </Accordion>
                                </div>
                                    </td>
                             
                             
                                
                                {/* <td>{AirCraftTypeDetail?.description}</td> */}
                                {/* <td>{AirCraftTypeDetail.email}</td>
                                <td>{AirCraftTypeDetail.type === 1 ? "Manager" : "Admin"}</td>
                                <td>{AirCraftTypeDetail.status === 1 ? "Active" : "Deleted"}</td> */}

                                {/* {!!AirCraftTypeDetail?.status && */}
                                    <>
                                        <td><button className="btn btn-danger" onClick={() => handleDelete(AirCraftTypeDetail?.airport_id)}>Delete</button></td>

                                        <td><button className="btn btn-info" style={{marginLeft:10,width:110}} onClick={() => handleLevel(AirCraftTypeDetail?.airport_id,AirCraftTypeDetail?.name)}>Edit Levels</button></td>
                                    </>
                                
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
                                        {selectedAiportID? <input type="text" required  defaultValue={selectedAiportID? selectedAiportID['AirPortName']:''}
                                            onChange={(e) => setEditAirport({...selectedAiportID,'AirPortName':e.target.value})}
                                             className="form-control" placeholder="Enter Airport Code" aria-label="amount" aria-describedby="basic-addon1" />:
                                             <input type="text" required
                                            onChange={(e) => setmodalAirport(e.target.value)}
                                             className="form-control" placeholder="Enter Airport Code" aria-label="amount" aria-describedby="basic-addon1" />}

                                        
                                            
                                    </div> <br />
            

              
                       
                {levels?.map((level,index)=>(<><div  style={{display:'flex'}}>
                <div>
                  <button
                    type="button"
                    class="btn btn-success dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{'border-radius':0}}
                    key={index}
                  >
                    {/* {Object.keys(levels[index]).length!=0? Object.keys(levels[index]) :'Level Type'} */}
                    {levels[index]['levelName']? levels[index]['levelName'] :'Level Type'}
                  </button>
                  
                   
                     <div class="dropdown-menu">
            
            
                    {
                     allAirPortLevels?.map((levelType,idx)=>(
                    
                    // <button class="dropdown-item" id='but' value={levelType.levelID}  key={level.levelID} type="button" onClick={(event)=>{setLevel([...levels,{[event.target.value]:{'name':levelType.levelName,'id':event.target.value,'rank':levelType.levelrank}}]);}}>
                    <button class="dropdown-item" id='but' value={levelType.levelID}  key={idx} type="button"   onClick={(e) => {
                              var lst = [...levels];
                              lst[index]={...lst[index],'levelID':parseInt( levelType.levelID),'levelName':levelType.levelName,'levelrank':levelType.levelrank};
                              setIndex([...lst1,lst[index]])
                              setLevel(lst);
                              console.log(allAirPortLevels.map((a,index)=>a))
                               tempAirPortLevels.some((item)=>{
                                     var list=[]
                                        if(item?.levelID===lst1[lst1.length-1]?.levelID){
                                            tempAirPortLevels.some((item1)=>{
                                                if(item1.levelrank===lst1[lst1.length-1].levelrank){
                                                    console.log(item1)
                                                    list=tempAirPortLevels.slice(tempAirPortLevels.indexOf(item1)+1)
                                                
                                                }
                                            })
                                                setAllAirPortLevels(list)
                                        
                                        // console.log(allAirPortLevels.slice(allAirPortLevels.indexOf(item)))
                                        // setAllRemovedAirPortLevels(allAirPortLevels.slice(allAirPortLevels.indexOf(item)))
                                      }})
                        
                            // allAirPortLevels.some(item => lst[index].includes(item))
                        
                         
                           
                }}>
                                
                      {levelType.levelName}
                    </button>
                      
                     ))}
                    
                   
                  </div>
                  
                </div>
                <div className=" input-group  "  >
            
                    {selectedAiportID? <input   type="text" required  defaultValue={selectedAiportID? levels[index]?.value:''}
                        onChange={(e) => {
                            var lst = [...levels];
                            lst[index]={...lst[index],'value':e.target.value};
                            // setIndex([...lst1,lst[index]])
                            setLevel(lst);
                            }}
                            className="form-control" placeholder="Enter Airport Code" aria-label="amount" aria-describedby="basic-addon1" />:
                            <input type="text" required
                        onChange={(e) => {
                            var lst = [...levels];
                            lst[index]={...lst[index],'value':e.target.value};
                            // setIndex([...lst1,lst[index]])
                            setLevel(lst);
                            }}
                            className="form-control" placeholder="Enter Level Name" aria-label="amount" aria-describedby="basic-addon1" />}

                 </div> 
               
                 </div>
                 
                 <br></br>
                    </> ))}
                    <div style={{display:'flex',justifyContent:'flex-end'}} >
                    {/* {console.log(levels.length>0 ?Object.keys(levels[levels?.length-1]).length:'')}
                    {console.log(tempAirPortLevels.length>0? tempAirPortLevels.length-1:'')} */}
                 <div >
                            <Button style={{ borderRadius: "50px"}} id='j' disabled={levels?.length>0? Object.keys(levels[levels?.length-1])?.length!=4 || levels[levels?.length-1]['value'].length==0 ||lst1[lst1?.length-1]?.levelID===tempAirPortLevels[tempAirPortLevels.length-1]?.levelID :false} onClick={()=>{setLevel([...levels,{}]);
                                if(levels.length==0){
                                    getAllAirPortLevels();
                                }
                                else{
                                    tempAirPortLevels.some((item)=>{
                                     var list=[]
                                        if(item?.levelID===lst1[lst1.length-1]?.levelID){
                                            tempAirPortLevels.some((item1)=>{
                                                if(item1.levelrank===lst1[lst1.length-1].levelrank){
                                                    console.log(item1)
                                                    list=tempAirPortLevels.slice(tempAirPortLevels.indexOf(item1)+1)
                                                
                                                }
                                            })
                                                setAllAirPortLevels(list)
                                        
                                        // console.log(allAirPortLevels.slice(allAirPortLevels.indexOf(item)))
                                        // setAllRemovedAirPortLevels(allAirPortLevels.slice(allAirPortLevels.indexOf(item)))
                                      }})
                                }
                                console.log(levels)
                               
                       
                        }} >+ Add Level</Button>
                      
                </div>
                &nbsp;
                
                <div>
                            <Button style={{ borderRadius: "50px"}} onClick={()=>{levels.pop() ; setLevel([...levels]); 
                            lst1.pop();

                            console.log('hello',lst1)
                    
                            tempAirPortLevels.some((item)=>{if(item?.levelID===lst1[lst1.length-1]?.levelID){
                                // setAllAirPortLevels(...allAirPortLevels)
                                // getAllAirPortLevels()
                                console.log(item)
                                console.log(tempAirPortLevels)
                                setAllAirPortLevels( tempAirPortLevels.slice(tempAirPortLevels.indexOf(item)+1))
                                // setAllRemovedAirPortLevels(allAirPortLevels.slice(allAirPortLevels.indexOf(item)))
                              }})
                       }} >- Remove Level</Button>
                    
                </div>
                </div>
               
             
            
                


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