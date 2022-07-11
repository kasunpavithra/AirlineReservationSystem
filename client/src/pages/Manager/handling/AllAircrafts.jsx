
import axios from "axios"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import AircraftServices from "../../../../services/AircraftServices";
import {Button } from 'react-bootstrap'

const AllAircrafts = () => {

    // const [searchParams, setSearchParams] = useSearchParams()
    // const filter = parseInt(searchParams.get("filter"))
    const [data,setData]=useState();

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
        getAllAirCrafts();
        
    },[])

    const getAllAirCrafts=async()=>{
        const AllAirCrafts= await AircraftServices.getallaircrafts();
        // console.log(AllAirCraftTypesDetails.data.result)
        setData(AllAirCrafts.data)
        console.log(AllAirCrafts)
    }

    const handleDelete = (aircraftid) => {
        if (window.confirm("Are you sure, you want to delete this Aircraft Type?") === true) {
            axios.delete("http://localhost:3001/api/airCraft/delete/" + aircraftid)
                .then(result => {
                    window.location.reload(false);
                })
                .catch(err => console.log(err))
        } else {
            return
        }
    }

    const handleEdit = (aircraftid) => {
        navigate("/manager/handleaircrafts/addaircraft",{state: aircraftid})
    }

    const handleSelectQuery = (e) => {
        if (parseInt(e.target.value) === 1) navigate("../all-authorized-users?filter=1")
        else if (parseInt(e.target.value) === 2) navigate("../all-authorized-users?filter=2")
        else navigate("../all-authorized-users?filter=3")
    }

    return (
        <>
            <h2 className="add-margin-top">All Aircrafts</h2> <br />
        
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
            <Button variant="primary" onClick={()=>{navigate('/manager/handleaircrafts/addaircraft')}}>
                            Add new Aircraft
                        </Button> <br /> <br />
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>AirCrft ID</th>
                            <th>Type</th>
                            <th>Economy Seat Count</th>
                            {/* <th>Email</th>
                            <th>Type</th>
                            <th>Status</th> */}
                            <th>Business Seat Count</th>
                            <th>Platinum Seat Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(data?.result)}
                        {data?.result?.map(AirCraftTypeDetail => (
                            
                            <tr key={AirCraftTypeDetail?.aircraftid} className={AirCraftTypeDetail?.status === 0 ? "table-danger" : ""} >
                                <td>{AirCraftTypeDetail?.aircraftid}</td>
                                <td>{AirCraftTypeDetail?.name}</td>
                                <td>{AirCraftTypeDetail?.EconomySeatCount}</td>
                                <td>{AirCraftTypeDetail?.BusinessSeatCount}</td>
                                <td>{AirCraftTypeDetail?.PlatinumSeatCount}</td>
                                {/* <td>{AirCraftTypeDetail.email}</td>
                                <td>{AirCraftTypeDetail.type === 1 ? "Manager" : "Admin"}</td>
                                <td>{AirCraftTypeDetail.status === 1 ? "Active" : "Deleted"}</td> */}

                                {
                                    <>
                                        <td><button className="btn btn-danger" onClick={() => handleDelete(AirCraftTypeDetail?.aircraftid)}>Delete</button></td>
                                        <td><button className="btn btn-info" onClick={() => handleEdit(AirCraftTypeDetail?.aircraftid)}>Edit</button></td>
                                    </>
                                }
                                {!AirCraftTypeDetail?.status &&
                                    <>
                                        <td></td>
                                        <td></td>
                                    </>
                                }
                            </tr>
                        ))}
                    </tbody> 
                </table>
        </>
    );
}

export default AllAircrafts;