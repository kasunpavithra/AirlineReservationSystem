import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./updateStyle.css";

import { useNavigate} from "react-router-dom";
import { Row,Col, Dropdown,DropdownButton} from 'react-bootstrap';
//import UserServices from '../../services/API/UserServices';
import Validation  from '../../../Validation/updateValidation';
import Messages from "../../LandingPage/Messages";
import UserServices from '../../../../services/UserServices';
import Layout from './../../Navbar/Layout/Layout';
import { useEffect } from 'react';
import jwtDecode from "jwt-decode";


const  Update =() => {
    const formValues={
        'First Name':'',
        'Last Name':'',
        'Gender' :'',
        'Contact Number' :'',
        'Email' :'',
        'Birthday' :''
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
    
        try{
             var user=jwtDecode(localStorage.getItem("AccessToken"))
           }
          

        catch(err){
            user=null
        }
        const getCustomer = await UserServices.getcustomer(user.userInfo.id)
        console.log( getCustomer.data.result[0])
          // console.log("patient",getPatient);
          state = {

            "First Name":getCustomer.data.result[0].firstname,
            "Last Name": getCustomer.data.result[0].lastname,
            "Address":getCustomer.data.result[0].address,
            "Contact Number": getCustomer.data.result[0].phoneNumber,
            "Birthday": getCustomer.data.result[0].birthday.split("T")[0],
            "Gender":getCustomer.data.result[0].gender,
            "userID":user.userInfo.id 
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
    const handleSelect=(event)=>{
        console.log(event);
        console.log(parseInt(event,10))
        setState({
            ...state,'Gender' : parseInt(event,10)})
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
        const {value,error}=Validation.ValidateUpdate(state)
        console.log(error);
        console.log(state);
        if (error) {
            console.log("error",error)
            if(error){
                const errors={}
                error.details.map(item => {
                    errors[item.path[0]] = item.message;
                });
                setError(errors);
            
            }
            else{
                setError({})
            }
           
            
           
            
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
        setError({})
        const options={
            labels:{
                confirmable:"Confirm",
                cancellable:"Cancel"
            }
        }
        // const result=await confirm(`Please confirm your details\n\n\n\n\tFirst Name: ${patient_id}   Test type: ${testtype.name}\n\n\Click OK to start the test.`,options);
            if(true){
                // setLoader(true);
                try {
                    // const test_id = location.state.test_id;
                    console.log('heeee')
                    console.log(img)
       
                    const formData = new FormData();
                    formData.append("firstname", state['First Name']);
                    formData.append("lastname",state['Last Name']);
                    formData.append("gender", state['Gender']);
                    formData.append("contactnumber", state['Contact Number']);
                    formData.append("address", state['Address']);
                    formData.append("userID",state ['userID']);
                    formData.append("birthday", state['Birthday']);
                    formData.append("Image", img);
                    formData.append("ImageName", imgname);
                 
                    console.log('geee')
                    const response = await UserServices.update(formData);
                    console.log(response);
                   
                    if (response.status === 200) {
                    Messages.SuccessMessage("Updated successfully");
                    navigate(`/dashboard`);

                    // setTimeout(() => {
                    //     // setLoader(false);
                    // }, 200);
                    }
                    
                    
                } catch (error) {
                    console.log(error);
                    Messages.ErrorMessage({
                    error: error,
                    custom_message: `Update fail`,
                    });
                    // setLoader(false)
                    navigate(0);
                }
            }
        }
        
    
    }
  return (
    <div>
        <Layout content='update'/>
    <div className=' col-xl-5 pt-4 mx-auto form-container'>
        
        <h1 className='fs-1 text-primary mb-3'>Update Account </h1>
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

            <Form.Group as={Row} className='fw-bold col-xl-12 mb-3 mx-auto' controlId='First Name'>
                <Form.Label style={{"font-family":"FontAwesome"}}  column sm={4}>First Name</Form.Label>
                <Col sm={7} >
                
               
                <Form.Control style={{"font-family":"FontAwesome"}}  type="text" name='First Name'  value={state["First Name"]}   placeholder='&#xf007; First Name' onChange={handleUser} />
                </Col>
                <Row>
                    <Col>
                    </Col>
                    <Col sm={8}>
                    {errordata['First Name'] !== '' && <p className="error">{errordata['First Name']}</p>}
                    </Col>
                </Row>
               
                
            </Form.Group>

            <Form.Group as={Row} className='fw-bold col-xl-12 mb-3 mx-auto' controlId='Last Name'>
                 <Form.Label style={{"font-family":"FontAwesome"}}   column sm={4} >Last Name </Form.Label>
                 <Col sm={7}>
                <Form.Control style={{"font-family":"FontAwesome"}}  type="text" name='Last Name'  value={state["Last Name"]} placeholder='&#xf234; Last Name' onChange={handleUser}/>
                </Col>
                <Row>
                    <Col>
                    </Col>
                    <Col sm={8}>
                    {errordata['Last Name'] !== '' && <p className="error">{errordata['Last Name']}</p>}
                    </Col>
                </Row>
                
            </Form.Group>

            <Form.Group as={Row} className='fw-bold col-xl-12 mb-3 mx-auto' controlId='Address'>
               <Form.Label style={{"font-family":"FontAwesome"}}  column sm={4} >Address</Form.Label>
               <Col sm={7}>
               <Form.Control style={{"font-family":"FontAwesome"}}   type="text" name='Address'  value={state["Address"]} placeholder='&#xf0e0; Address' onChange={handleUser}/>
               </Col>
               <Row>
                    <Col>
                    </Col>
                    <Col sm={8}>
                    {errordata.Address !== '' && <p className="error">{errordata.Address}</p>}
                    </Col>
                </Row>
               
           </Form.Group>

            {/* <Form.Group as={Row} className='fw-bold col-xl-12 mb-2 mx-auto' controlId='NIC'>
                <Form.Label className='fa' column sm={4} >NIC</Form.Label>
                <Col sm={6}>
                <Form.Control className='fa' type="text" name='NIC' placeholder='&#xf2c2; NIC' onChange={handleUser}/>
                {errordata.NIC !== '' && <p className="error">{errordata.NIC}</p>}
                </Col>
                
            </Form.Group> */}
            <Form.Group as={Row} className='fw-bold col-xl-12 mb-3 mx-auto' controlId='Gender'>
               <Form.Label style={{"font-family":"FontAwesome"}}  column sm={4} >Gender</Form.Label>
               <Col sm={1}>
                <DropdownButton bsPrefix='button1' id="dropdown-basic-button"   title={state.Gender =='' ? 'Gender' : state.Gender =='1'? 'Male':'Female'} onSelect={handleSelect}>
                        <Dropdown.Item eventKey='1'>Male</Dropdown.Item>
                        <Dropdown.Item eventKey='0'>Female</Dropdown.Item>
                </DropdownButton>
                </Col>
                <Row >
                    <Col>
                    </Col>
                    <Col sm={8}>
                    {errordata['Gender'] !== '' && <p className="error">{errordata['Gender']}</p>}
                    </Col>
                </Row>
                
                
               
            </Form.Group>

            <Form.Group as={Row} className='fw-bold col-xl-12 mb-3 mx-auto' controlId='Contact Number'>
                <Form.Label style={{"font-family":"FontAwesome"}}   column sm={4}>Contact Number</Form.Label>
                <Col sm={7}>
                <Form.Control style={{"font-family":"FontAwesome"}}  type="text" name='Contact Number'  value={state["Contact Number"]}  placeholder='&#xf095; Contact Number' onChange={handleUser}/>
                </Col>
                <Row>
                    <Col>
                    </Col>
                    <Col sm={8}>
                    {errordata['Contact Number'] !== '' && <p className="error">{errordata['Contact Number']}</p>}
                    </Col>
                </Row>
                
           </Form.Group>


           <Form.Group as={Row} className='fw-bold col-xl-12 mb-3 mx-auto' controlId='Birthday'>
               <Form.Label style={{"font-family":"FontAwesome"}}  column sm={4} >Birthday</Form.Label>
               <Col sm={7}>
               <Form.Control style={{"font-family":"FontAwesome"}}  type="date" name='Birthday'  value={state["Birthday"]}  placeholder='&#xf1fd; Birthday' onChange={handleUser}/>
               </Col>
               <Row>
                    <Col>
                    </Col>
                    <Col sm={8}>
                    {errordata.Birthday !== '' && <p className="error">{errordata.Birthday}</p>}
                    </Col>
                </Row>
              
           </Form.Group>
           <Button className='button btn btn-primary' size="lg" block="block" type="submit">Update</Button>
        </Form>
        
    </div>
    
    </div>
  )
}


export default Update;