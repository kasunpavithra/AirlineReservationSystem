import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../styles/updateStyle.css";
import 'font-awesome/css/font-awesome.css';
import { Row,Col} from 'react-bootstrap';
//import UserServices from '../../services/API/UserServices';
import Validation  from '../Validation/updateValidation';

const  Update =() => {
    
    const formValues={
        'First Name':'',
        'Last Name':'',
        'NIC' :'',
        'Contact Number' :'',
        'Email' :'',
        'Birthday' :''
    }

    const [state,setState]=React.useState(formValues);
    const [errordata,setError]=React.useState(formValues);
    
    const handleUser=(event)=>{
        setState({
            ...state,
            [event.target.name] : event.target.value})
    }

    const errors = {};
    const handleSubmit=async(event)=>{
        event.preventDefault();
        const {value,error}=Validation.ValidateUpdate(state)
        
        console.log(state);
        if (error) {
            error.details.map(item => {
                errors[item.path[0]] = item.message;
            });    
        } 
        // else {
        //     try {
        //         const response = await UserServices.AuthUserCompleteRegistration(state);
        //     } catch (error) {
        //         console.log(error.message);
        //     }
        // } 
        setError(errors);
    }
  return (
    <div>
    <div className='form-container col-xl-5 mt-2 pt-5 mx-auto '>
        
        <h1 className='fs-1 text-primary mb-5'>Update account </h1>
         <Form onSubmit={handleSubmit} >
            <Form.Group as={Row} className='fw-bold col-xl-12 mb-2 mx-auto' controlId='First Name'>
                <Form.Label className='fa' column sm={4}>First Name</Form.Label>
                <Col sm={6} >
                <Form.Control className='fa'  type="text" name='First Name' placeholder='&#xf007; First Name' onChange={handleUser} />
                {errordata['First Name'] !== '' && <p className="error">{errordata['First Name']}</p>}
                </Col>
                
            </Form.Group>

            <Form.Group as={Row} className='fw-bold col-xl-12 mb-2 mx-auto' controlId='Last Name'>
                 <Form.Label className='fa' column sm={4} >Last Name </Form.Label>
                 <Col sm={6}>
                <Form.Control className='fa' type="text" name='Last Name' placeholder='&#xf234; Last Name' onChange={handleUser}/>
                {errordata['Last Name'] !== '' && <p className="error">{errordata['Last Name']}</p>}
                </Col>
                
            </Form.Group>

            <Form.Group as={Row} className='fw-bold col-xl-12 mb-2 mx-auto' controlId='NIC'>
                <Form.Label className='fa' column sm={4} >NIC</Form.Label>
                <Col sm={6}>
                <Form.Control className='fa' type="text" name='NIC' placeholder='&#xf2c2; NIC' onChange={handleUser}/>
                {errordata.NIC !== '' && <p className="error">{errordata.NIC}</p>}
                </Col>
                
            </Form.Group>

            <Form.Group as={Row} className='fw-bold col-xl-12 mb-2 mx-auto' controlId='Contact Number'>
                <Form.Label className='fa' column sm={4}>Contact Number</Form.Label>
                <Col sm={6}>
                <Form.Control className='fa' type="text" name='Contact Number' placeholder='&#xf095; Contact Number' onChange={handleUser}/>
                {errordata['Contact Number'] !== '' && <p className="error">{errordata['Contact Number']}</p>}
                </Col>
                
           </Form.Group>

           <Form.Group as={Row} className='fw-bold col-xl-12 mb-2 mx-auto' controlId='Email'>
               <Form.Label className='fa' column sm={4} >Email</Form.Label>
               <Col sm={6}>
               <Form.Control className='fa' type="text" name='Email' placeholder='&#xf0e0; Email' onChange={handleUser}/>
               {errordata.Email !== '' && <p className="error">{errordata.Email}</p>}
               </Col>
               
           </Form.Group>

           <Form.Group as={Row} className='fw-bold col-xl-12 mb-2 mx-auto' controlId='Birthday'>
               <Form.Label className='fa' column sm={4} >Birthday</Form.Label>
               <Col sm={6}>
               <Form.Control className='fa' type="date" name='Birthday' placeholder='&#xf1fd; Birthday' onChange={handleUser}/>
               {errordata.Birthday !== '' && <p className="error">{errordata.Birthday}</p>}
               </Col>
              
           </Form.Group>
           <Button className='button btn btn-primary' size="lg" block="block" type="submit">Update Details</Button>
        </Form>
        
    </div>
    </div>
  )
}


export default Update;