import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./AddAirCraftTypeStyle.css";

import { useNavigate,useLocation} from "react-router-dom";
import { Row,Col, Dropdown,DropdownButton} from 'react-bootstrap';
//import UserServices from '../../services/API/UserServices';
import Validation  from '../../../Validation/updateValidation';
import Messages from "../../LandingPage/Messages";
import UserServices from '../../../../services/UserServices';
import Layout from '../../Navbar/Layout/Layout'
import { useEffect } from 'react';
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";

import AircraftServices from '../../../../services/AircraftServices';



const  AddAirCraft=(prop) => {
    const formValues={
        'AircraftTypeID':'',
        'EconomySeatCount':'',
        'BusinessSeatCount':'',
        'PlatinumSeatCount':''
       
    }

    var [state,setState]=React.useState(formValues);
    const [errordata,setError]=React.useState(formValues);
    const [img, setImg] = React.useState();
    const [imgname, setImgName] = React.useState("");
    const [img_err, setImgErr] = React.useState("");
    const[imagepath,setImagePath] = React.useState('');
    const [selectedAirCraftType, setselectedAirCraftType] = React.useState("");
    
    const[id,setId]=React.useState('');
    const navigate = useNavigate();
    const location=useLocation();
    const [airCraftTypes,setAirCraftTypes]=React.useState();


    const  showErr = ()=>{
        Swal.fire({  
          icon: 'error',  
          title: 'Oops...',  
          text: 'Error Adding AirCraft',  
        }).then(()=>{
          window.location.reload();
        });
      }
    
      const showAddSuccess = ()=>{
        Swal.fire({
          icon: 'success',
          title: 'Success',    
          text: 'Successfully Added AirCraft',  
        }).then(()=>{
        //   this.props.navigate("/dashboard",{ replace: true });
        // window.location.reload(false)

        });
      }

      const showEditSuccess = ()=>{
        Swal.fire({
          icon: 'success',
          title: 'Success',    
          text: 'Successfully Edited AirCraft',  
        }).then(()=>{
        //   this.props.navigate("/dashboard",{ replace: true });
        // window.location.reload(false)

        });
      }


    useEffect(()=>{
        getAllAirCraftTypes();
        if(location.state){
            getAirCraft();
        }
     
        
    },[])

    const getAllAirCraftTypes=async()=>{
        const AllAirCraftTypes= await AircraftServices.getallaircrafttypes();
        // console.log(AllAirCraftTypesDetails.data.result)
        setAirCraftTypes(AllAirCraftTypes.data.result)
        console.log(AllAirCraftTypes.data)
    }

    const getAirCraft=async()=>{
        try{

            const AirCraft= await AircraftServices.getaircraftbyid(location.state);
            // console.log(AllAirCraftTypesDetails.data.result)
            setId(location.state)
            console.log(AirCraft)
           
           
            // console.log( getCustomer.data.result[0])
              // console.log("patient",getPatient);
              
              state = {
        
                "EconomySeatCount":( AirCraft.data.result[0].EconomySeatCount.toString()),
                "BusinessSeatCount":(AirCraft.data.result[0].BusinessSeatCount.toString()) ,
                "PlatinumSeatCount":(AirCraft.data.result[0].PlatinumSeatCount.toString()) ,
                'AircraftTypeID':AirCraft.data.result[0].aircraftTypeID
                
              };
             var aircrafttype={'name':AirCraft.data.result[0].name,'id':AirCraft.data.result[0].aircraftTypeID,'image':AirCraft.data.result[0].image}
            //   console.log(state)
              setState(state);
    
              setselectedAirCraftType(aircrafttype);
        }
     catch (error) {}
    
       
    }
    
   



      // console.log("state",state);
      
  

    

    //   const getCustomerDetails = async () => {
    //     try {
        //   const genderType = await ExaminerServices.getgendertypes();
        //   // console.log(genderType.data.data);
        //   setgenderTypes(genderType.data.data);
    
        // try{
        //      var user=jwtDecode(localStorage.getItem("AccessToken"))
        //    }
          

        // catch(err){
        //     user=null
        // }
    //     console.log('hi')
    //     console.log(location.state)
    //     const getAirCraft = await AircraftServices.getaircraft(location.state)
            
    //     setId(location.state)
    //     console.log(getAirCraft)
    //     // console.log( getCustomer.data.result[0])
    //       // console.log("patient",getPatient);
    //       state = {

    //         "Name":getAirCraft.data.result[0].name,
    //         "Description": getAirCraft.data.result[0].description,
            
    //       };
    //     //   console.log(state)
    //       setState(state);
    //       setImagePath( getAirCraft.data.result[0].image)

    

    //       // console.log("state",state);
          
    //     } catch (error) {}
    //   };
    
    const handleUser=(event)=>{
        setState({
            ...state,
            [event.target.name] : event.target.value})
    }

    const fileValidation = () => {
        var fileInput = document.getElementById("file");
        if (Validation.imageValidation(fileInput)) {
          // Image preview
          console.log(fileInput.files);
          if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                console.log(e.target.result)
       
            document.getElementById("imagePreview").innerHTML = '<img width="400" height="400" src="'+ e.target.result+'"/>';
            //   setImg(reader.result.replace("data:", "").replace(/^.+,/, ""));
            console.log(fileInput.files[0])
            console.log(fileInput.files[0].name)
            setImg(fileInput.files[0]);
            setImgName(fileInput.files[0].name);
            setImgErr('')
            };
    
              
            reader.readAsDataURL(fileInput.files[0]);
           
          }
        }
      };

    const errors = {};
    const handleSubmit=async(event)=>{
        event.preventDefault();
        state={...state,'AircraftTypeID':selectedAirCraftType.id}
        console.log(state);
        const {value,error}=Validation.ValidateAircraftAdd(state)
        console.log(error);
        console.log(state);
        if (error) {
            console.log("error",error)
            if(error){
                const errors={}
                error.details.map(item => {
                    errors[item.path[0]] = item.message;
                });
                console.log(errors)
                setError(errors);
                console.log(document.getElementById("file"))
            }
            else{
                setError({});
            }
            // }

            //     if (!document.getElementById("file").value && !id) {
            //         setImgErr("Profile photo is required");
            //       }
            //     else {
            //     setImgErr('')
            //     }
    
            
        }
        // else{
        //     console.log('hi')
        //     setError({})
        // } 
        // else {
        //     try {
        //         const response = await UserServices.AuthUserCompleteRegistration(state);
        //     } catch (error) {
        //         console.log(error.message);
        //     }
        // } 
        
    
        // const options={
        //     labels:{
        //         confirmable:"Confirm",
        //         cancellable:"Cancel"
        //     }
        // }
        // const result=await confirm(`Please confirm your details\n\n\n\n\tFirst Name: ${patient_id}   Test type: ${testtype.name}\n\n\Click OK to start the test.`,options);
       
        // (img_err=='') && errordata['Name']=='' && errordata['Description']==''
        else{
                // setLoader(true);
                try {
                    // const test_id = location.state.test_id;
                    setError({});
                    // console.log('heeee')
                    // console.log(img)
                    // console.log(state)
                    // const formData = new FormData();
                    // formData.append("name", state['Name']);
                    // formData.append("description",state['Description']);
                    // formData.append("Image", img);
                    // formData.append("ImageName", imgname);
                    // console.log(id)
                    // if(id){
                    //     formData.append("id",id)
                    // }
                   
                 
                    // console.log('geee')
                    if(id){
                        var editresponse=await AircraftServices.updateaircraft(state,id)
                    }
                    console.log(state)
                    
                    if(!id){
                        // var addresponse = await AircraftServices.addaircraft(state);
                        const details=[{name:"Platinam",id:1,count:state.PlatinumSeatCount},{name:"Bussiness",id:2,count:state.BusinessSeatCount},{name:"Economy",id:3,count:state.EconomySeatCount}];

                        navigate('/AddAircraftSeats',{state:{'classCounts':details,'aircraftTypeID':state.AircraftTypeID}})
                    }
                    console.log('status',id)
                    
                   
                    // console.log(editresponse)
                  //   console.log(addresponse)
                   
                  //  if(addresponse?.status===201){
                    
                  //   showAddSuccess()
                  //   navigate(`/manager/handleaircrafts/all-aircrafts`);
                  //  }
                    
                
                    if (editresponse?.status === 200) {
                        showEditSuccess()
                        navigate(`/manager/handleaircrafts/all-aircrafts`);
                    }
                    
                    // setTimeout(() => {
                    //     // setLoader(false);
                    // }, 200);
                    
                    
                    
                } catch (error) {
                    console.log(error);
                    // Messages.ErrorMessage({
                    // error: error,
                    // custom_message: `Adding fail`,
                    // });
                    showErr()
                    // setLoader(false)
                    navigate(0);
                }
            
        }
        // console.log((img_err==''))
        // console.log(errordata)
        // console.log(errordata['Name'])
        // console.log(errordata['Name']=='')
        // console.log( errordata['Description']=='')
        
    
    }
  return (
    <div>
        <Layout content='update'/>
    <div className=' col-xl-7 pt-4 mx-auto form-container'>
        
        {location.state?<h1 className='fs-1 text-primary mb-3'> Edit Aircraft</h1>:<h1 className='fs-1 text-primary mb-3'> Add Aircraft </h1>}
         <Form onSubmit={handleSubmit} >
            <Form.Group  className=" fw-bold  col-xl-12 mb-3 mx-auto">

            <div className="preview" id="imagePreview">
                    <img width="600"
                        height="400"
                        src= {selectedAirCraftType? selectedAirCraftType.image:"https://i.ibb.co/Q68tPz8/No-Preview.png"}
                        alt=""
                    />
                    
                    </div>
                    <br></br>
                <Row>   
                <Col sm={3}>
                </Col>
                {/* <div className="container upload_preview"> */}
                    {/* <Col sm={6}>
                    <Form.Control 
                    type="file"
                    id="file"
                    onChange={fileValidation}
                    />
                    </Col>
                    
                    <Row>
                    <Col>
                    </Col>
                    <Col sm={8}>
                    {img_err != "" && <p className="error">{img_err}</p>}
                    </Col>
                </Row>
                    */}
                {/* </div> */}
                </Row>
            </Form.Group>

            <div class="btn-group mt-2">
                  <button
                    type="button"
                    class="btn btn-success dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {selectedAirCraftType? selectedAirCraftType.name:'AirCraft Type'}
                  </button>
                  
                   
                     <div class="dropdown-menu">
                    {
                     airCraftTypes?.map((airCraftType,idx)=>(
                    
    
                    <button class="dropdown-item" value={airCraftType.aircraftTypeID} type="button" onClick={(event)=>{setselectedAirCraftType({'name':airCraftType.name,'id':event.target.value,'image':airCraftType.image});}}>
                      {airCraftType.name}
                    </button>
                     ))}
                   
                  </div>
                  
                </div>
                {errordata.AircraftTypeID !== "" && !selectedAirCraftType && <p className=" fw-bold error" style={{marginLeft:200}}>{errordata.AircraftTypeID}</p>}

            <Form.Group as={Row} className='fw-bold col-xl-12 mb-3 mx-auto' controlId='EconomySeatCount'>
                <Form.Label style={{"font-family":"FontAwesome"}}  column sm={4}>EconomySeatCount</Form.Label>
                <Col sm={7} >
                
               
                <Form.Control style={{"font-family":"FontAwesome"}}  type="number" min={0} name='EconomySeatCount'  value={state["EconomySeatCount"]}   placeholder='&#xf007;EconomySeatCount' onChange={handleUser} />
                </Col>
                <Row>
                    <Col>
                    </Col>
                    <Col sm={8}>
                    {errordata['EconomySeatCount'] !== '' && <p className="error">{errordata['EconomySeatCount']}</p>}
                    </Col>
                </Row>
               
                
            </Form.Group>

            
            <Form.Group as={Row} className='fw-bold col-xl-12 mb-3 mx-auto' controlId='BusinessSeatCount'>
                <Form.Label style={{"font-family":"FontAwesome"}}  column sm={4}>BusinessSeatCount</Form.Label>
                <Col sm={7} >
                
               
                <Form.Control style={{"font-family":"FontAwesome"}}  type="number" min={0} name='BusinessSeatCount'  value={state["BusinessSeatCount"]}   placeholder='&#xf007;BusinessSeatCount' onChange={handleUser} />
                </Col>
                <Row>
                    <Col>
                    </Col>
                    <Col sm={8}>
                    {errordata['BusinessSeatCount'] !== '' && <p className="error">{errordata['BusinessSeatCount']}</p>}
                    </Col>
                </Row>
               
                
            </Form.Group>
            
            <Form.Group as={Row} className='fw-bold col-xl-12 mb-3 mx-auto' controlId='PlatinumSeatCount'>
                <Form.Label style={{"font-family":"FontAwesome"}}  column sm={4}>PlatinumSeatCount</Form.Label>
                <Col sm={7} >
                
               
                <Form.Control style={{"font-family":"FontAwesome"}}  type="number" min={0} name='PlatinumSeatCount'  value={state["PlatinumSeatCount"]}   placeholder='&#xf007;PlatinumSeatCount' onChange={handleUser} />
                </Col>
                <Row>
                    <Col>
                    </Col>
                    <Col sm={8}>
                    {errordata['PlatinumSeatCount'] !== '' && <p className="error">{errordata['PlatinumSeatCount']}</p>}
                    </Col>
                </Row>
               
                
            </Form.Group>

            {/* <Form.Group as={Row} className='fw-bold col-xl-12 mb-3 mx-auto' controlId='Description'>
                 <Form.Label style={{"font-family":"FontAwesome"}}   column sm={4} >Last Name </Form.Label>
                 <Col sm={7}>
                <textarea rows="4" cols='42' style={{"font-family":"FontAwesome"}}  name='Description'  value={state["Description"]} placeholder='&#xf234; Description' onChange={handleUser}/>
                </Col>
                <Row>
                    <Col>
                    </Col>
                    <Col sm={8}>
                    {errordata['Description'] !== '' && <p className="error">{errordata['Description']}</p>}
                    </Col>
                </Row>
                
            </Form.Group> */}

            
           <Button className='button btn btn-primary' size="lg" block="block" type="submit">{location.state?'Edit':'Create'}</Button>
        </Form>
        
    </div>
    
    </div>
  )
}


export default  AddAirCraft;