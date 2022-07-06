import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../../User/Update/updateStyle.css";

import { useNavigate} from "react-router-dom";
import { Row,Col, Dropdown,DropdownButton} from 'react-bootstrap';
//import UserServices from '../../services/API/UserServices';
import Validation  from '../../../Validation/updateValidation';
import Messages from "../../LandingPage/Messages";
import UserServices from '../../../../services/UserServices';
import Layout from './../../Navbar/Layout/Layout';
import { useEffect } from 'react';
import jwtDecode from "jwt-decode";
import AircraftServices from '../../../../services/AircraftServices';


const  Aircraftupdate=() => {
    const formValues={
        'Name':'',
        'Description':'',
       
    }
    var [state,setState]=React.useState(formValues);
    const [errordata,setError]=React.useState(formValues);
    const [img, setImg] = React.useState();
    const [imgname, setImgName] = React.useState("");
    const [img_err, setImgErr] = React.useState("");
    const[imagepath,setImagePath] = React.useState('');
    const navigate = useNavigate();


    useEffect(() => {
        getCustomerDetails();
      }, []);

      const getCustomerDetails = async () => {
        try {
        //   const genderType = await ExaminerServices.getgendertypes();
        //   // console.log(genderType.data.data);
        //   setgenderTypes(genderType.data.data);
    
        // try{
        //      var user=jwtDecode(localStorage.getItem("AccessToken"))
        //    }
          

        // catch(err){
        //     user=null
        // }
        const getCustomer = await UserServices.getcustomer()
        console.log( getCustomer.data.result[0])
          // console.log("patient",getPatient);
          state = {

            "Name":getCustomer.data.result[0].firstname,
            "Description": getCustomer.data.result[0].lastname,
            
          };
          console.log(state)
          setState(state);
          setImagePath( getCustomer.data.result[0].image)
    

          // console.log("state",state);
          
        } catch (error) {}
      };
    
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
       
            document.getElementById("imagePreview").innerHTML = '<img width="200" height="200" src="'+ e.target.result+'"/>';
            //   setImg(reader.result.replace("data:", "").replace(/^.+,/, ""));
            console.log(fileInput.files[0])
            console.log(fileInput.files[0].name)
            setImg(fileInput.files[0]);
            setImgName(fileInput.files[0].name);
            };
    
              
            reader.readAsDataURL(fileInput.files[0]);
           
          }
        }
      };

    const errors = {};
    const handleSubmit=async(event)=>{
        event.preventDefault();
        const {value,error}=Validation.ValidateAircraftTypeAdd(state)
        console.log(error);
        console.log(state);
        if (error) {
            console.log("error",error)
                const errors={}
                error.details.map(item => {
                    errors[item.path[0]] = item.message;
                });
                setError(errors);
    
            
        }
        else{
            setError({})
        } 
        // else {
        //     try {
        //         const response = await UserServices.AuthUserCompleteRegistration(state);
        //     } catch (error) {
        //         console.log(error.message);
        //     }
        // } 
        if (!document.getElementById("file").value  && !imagepath) {
            setImgErr("Profile photo is required");
          }
        else {
        setImgErr('')
        }
        console.log(img_err)
        console.log(errordata)
        // const options={
        //     labels:{
        //         confirmable:"Confirm",
        //         cancellable:"Cancel"
        //     }
        // }
        // const result=await confirm(`Please confirm your details\n\n\n\n\tFirst Name: ${patient_id}   Test type: ${testtype.name}\n\n\Click OK to start the test.`,options);
            if(!img_err && !errordata['Name'] && !errordata['Description']){
                // setLoader(true);
                try {
                    // const test_id = location.state.test_id;
                    console.log('heeee')
                    console.log(img)
       
                    const formData = new FormData();
                    formData.append("name", state['Name']);
                    formData.append("description",state['Description']);
                    formData.append("Image", img);
                    formData.append("ImageName", imgname);
                 
                    console.log('geee')
                    const response = await AircraftServices.addaircrafttype(formData);
                    console.log(response);
                   
                    if (response.status === 200) {
                    Messages.SuccessMessage("Added successfully");
                    // navigate(`/dashboard`);

                    // setTimeout(() => {
                    //     // setLoader(false);
                    // }, 200);
                    }
                    
                    
                } catch (error) {
                    console.log(error);
                    Messages.ErrorMessage({
                    error: error,
                    custom_message: `Adding fail`,
                    });
                    // setLoader(false)
                    navigate(0);
                }
            
        }
        
    
    }
  return (
    <div>
        <Layout content='update'/>
    <div className=' col-xl-5 pt-4 mx-auto form-container'>
        
        <h1 className='fs-1 text-primary mb-3'>Aircraft Type </h1>
         <Form onSubmit={handleSubmit} >
            <Form.Group  className=" fw-bold  col-xl-12 mb-3 mx-auto">
            <div className="preview" id="imagePreview">
                    <img width="200"
                        height="200"
                        src= {imagepath? imagepath:"https://i.ibb.co/Q68tPz8/No-Preview.png"}
                        alt=""
                    />
                    
                    </div>
                    <br></br>
                <Row>   
                <Col sm={3}>
                </Col>
                {/* <div className="container upload_preview"> */}
                    <Col sm={6}>
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
                   
                {/* </div> */}
                </Row>
            </Form.Group>

            <Form.Group as={Row} className='fw-bold col-xl-12 mb-3 mx-auto' controlId='Name'>
                <Form.Label style={{"font-family":"FontAwesome"}}  column sm={4}>Name</Form.Label>
                <Col sm={7} >
                
               
                <Form.Control style={{"font-family":"FontAwesome"}}  type="text" name='Name'  value={state["Name"]}   placeholder='&#xf007;Name' onChange={handleUser} />
                </Col>
                <Row>
                    <Col>
                    </Col>
                    <Col sm={8}>
                    {errordata['Name'] !== '' && <p className="error">{errordata['Name']}</p>}
                    </Col>
                </Row>
               
                
            </Form.Group>

            <Form.Group as={Row} className='fw-bold col-xl-12 mb-3 mx-auto' controlId='Description'>
                 <Form.Label style={{"font-family":"FontAwesome"}}   column sm={4} >Last Name </Form.Label>
                 <Col sm={7}>
                <textarea rows="4" cols='40' style={{"font-family":"FontAwesome"}}  name='Description'  value={state["Description"]} placeholder='&#xf234; Description' onChange={handleUser}/>
                </Col>
                <Row>
                    <Col>
                    </Col>
                    <Col sm={8}>
                    {errordata['Description'] !== '' && <p className="error">{errordata['Description']}</p>}
                    </Col>
                </Row>
                
            </Form.Group>

            
           <Button className='button btn btn-primary' size="lg" block="block" type="submit">Create</Button>
        </Form>
        
    </div>
    
    </div>
  )
}


export default  Aircraftupdate;