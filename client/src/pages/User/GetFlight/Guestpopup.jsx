import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Update/updateStyle.css";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
//import UserServices from '../../services/API/UserServices';
import Validation from "../../../Validation/updateValidation";
import Messages from "../../LandingPage/Messages";
import UserServices from "../../../../services/UserServices";
import Layout from "./../../Navbar/Layout/Layout";
import React from "react";
import Swal from "sweetalert2";


const Guestpopup = (prop) => {
  const location = useLocation();
  const formValues = {
    "First Name": "",
    "Last Name": "",
    Gender: "",
    Address: "",
    Email: "",
    Birthday: "",
  };
  const navigate = useNavigate();
  console.log(location.state)
  React.useEffect(()=>{
      if(!location.state){
          console.log('fdfsdf')
          navigate('/login')
      }

  },[])

  console.log("dfsdff");
  var [state, setState] = React.useState(formValues);
  const [errordata, setError] = React.useState(formValues);

  const handleUser = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const handleSelect = (event) => {
    console.log(event);
    console.log(parseInt(event, 10));
    setState({
      ...state,
      Gender: parseInt(event, 10),
    });
  };
  
  const  showErr = (id)=>{
    Swal.fire({  
      icon: 'warning',  
      title: 'Remember',  
      text: `You need to remember your Email ${state.Email} and Reference Number ${id} to see your previous bookings`,  
    })
  }

  const errors = {};
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(state);
    const { value, error } = Validation.ValidateGuest(state);
    console.log(error);
    console.log(state);
    if (error) {
      console.log("error", error);
      if (error) {
        const errors = {};
        error.details.map((item) => {
          errors[item.path[0]] = item.message;
        });
        setError(errors);
      } else {
        setError({});
      }
    } else {
      try {
        // const formData = new FormData();
        // formData.append("firstname", state['First Name']);
        // formData.append("lastname",state['Last Name']);
        // formData.append("gender", state['Gender']);
        // formData.append("email", state['Email']);
        // formData.append("address", state['Address']);
        // // formData.append("userID",state ['userID']);
        // formData.append("birthday", state['Birthday']);
        // // formData.append("Image", img);
        // // formData.append("ImageName", imgname);
        // console.log('geee')
        const response = await UserServices.createGuest(state);
        console.log(response.data.result.insertId);
        if (response.status === 201) {
        //   Messages.SuccessMessage("Created successfully");
        showErr(response.data.result.insertId)
        console.log(response)
          navigate(`/bookSeat`, {
            state: {
              ...location.state,
              guestUserID: response.data.result.insertId,
            },
          });
        }
      } catch (error) {
        console.log(error);
        Messages.ErrorMessage({
          error: error,
          custom_message: `Creating fail`,
        });
        // setLoader(false)
        navigate(0);
      }
    }
  };

  return (
    <div>
      <Layout />
      <div
        className=" col-xl-5 pt-4  mx-auto form-container"
        style={{ marginTop: 150 }}
      >
        <h1 className="fs-1 text-primary ">Add Your Details </h1>
        <b><p className="mb-5" style={{color:'red'}}>You need to fill your details before book a ticket</p></b>
        <Form onSubmit={handleSubmit}>
          <Form.Group
            as={Row}
            className="fw-bold col-xl-12 mb-3 mx-auto"
            controlId="First Name"
          >
            <Form.Label style={{ "font-family": "FontAwesome" }} column sm={4}>
              First Name
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                style={{ "font-family": "FontAwesome" }}
                type="text"
                name="First Name"
                value={state["First Name"]}
                placeholder="&#xf007; First Name"
                onChange={handleUser}
              />
            </Col>
            <Row>
              <Col></Col>
              <Col sm={8}>
                {errordata["First Name"] !== "" && (
                  <p className="error">{errordata["First Name"]}</p>
                )}
              </Col>
            </Row>
          </Form.Group>

          <Form.Group
            as={Row}
            className="fw-bold col-xl-12 mb-3 mx-auto"
            controlId="Last Name"
          >
            <Form.Label style={{ "font-family": "FontAwesome" }} column sm={4}>
              Last Name{" "}
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                style={{ "font-family": "FontAwesome" }}
                type="text"
                name="Last Name"
                value={state["Last Name"]}
                placeholder="&#xf234; Last Name"
                onChange={handleUser}
              />
            </Col>
            <Row>
              <Col></Col>
              <Col sm={8}>
                {errordata["Last Name"] !== "" && (
                  <p className="error">{errordata["Last Name"]}</p>
                )}
              </Col>
            </Row>
          </Form.Group>
          <Form.Group
            as={Row}
            className="fw-bold col-xl-12 mb-3 mx-auto"
            controlId="Email"
          >
            <Form.Label style={{ "font-family": "FontAwesome" }} column sm={4}>
              Email
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                style={{ "font-family": "FontAwesome" }}
                type="text"
                name="Email"
                value={state["Email"]}
                placeholder="&#xf0e0; Email"
                onChange={handleUser}
              />
            </Col>
            <Row>
              <Col></Col>
              <Col sm={8}>
                {errordata.Email !== "" && (
                  <p className="error">{errordata.Email}</p>
                )}
              </Col>
            </Row>
          </Form.Group>

          <Form.Group
            as={Row}
            className="fw-bold col-xl-12 mb-3 mx-auto"
            controlId="Address"
          >
            <Form.Label style={{ "font-family": "FontAwesome" }} column sm={4}>
              Address
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                style={{ "font-family": "FontAwesome" }}
                type="text"
                name="Address"
                value={state["Address"]}
                placeholder="&#xf0e0; Address"
                onChange={handleUser}
              />
            </Col>
            <Row>
              <Col></Col>
              <Col sm={8}>
                {errordata.Address !== "" && (
                  <p className="error">{errordata.Address}</p>
                )}
              </Col>
            </Row>
          </Form.Group>

          <Form.Group
            as={Row}
            className="fw-bold col-xl-12 mb-3 mx-auto"
            controlId="Gender"
          >
            <Form.Label style={{ "font-family": "FontAwesome" }} column sm={4}>
              Gender
            </Form.Label>
            <Col sm={1}>
              <DropdownButton
                bsPrefix="button1"
                id="dropdown-basic-button"
                title={
                  state.Gender === ""
                    ? "Gender"
                    : state?.Gender == "1"
                    ? "Male"
                    : "Female"
                }
                onSelect={handleSelect}
              >
                <Dropdown.Item eventKey="1">Male</Dropdown.Item>
                <Dropdown.Item eventKey="0">Female</Dropdown.Item>
              </DropdownButton>
            </Col>
            <Row>
              <Col></Col>
              <Col sm={8}>
                {errordata["Gender"] !== "" && (
                  <p className="error">{errordata["Gender"]}</p>
                )}
              </Col>
            </Row>
          </Form.Group>

          <Form.Group
            as={Row}
            className="fw-bold col-xl-12 mb-3 mx-auto"
            controlId="Birthday"
          >
            <Form.Label style={{ "font-family": "FontAwesome" }} column sm={4}>
              Birthday
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                style={{ "font-family": "FontAwesome" }}
                type="date"
                name="Birthday"
                value={state["Birthday"]}
                placeholder="&#xf1fd; Birthday"
                onChange={handleUser}
              />
            </Col>
            <Row>
              <Col></Col>
              <Col sm={8}>
                {errordata.Birthday !== "" && (
                  <p className="error">{errordata.Birthday}</p>
                )}
              </Col>
            </Row>
          </Form.Group>
          <Button
            className="button btn btn-primary"
            size="lg"
            block="block"
            type="submit"
          >
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Guestpopup;
