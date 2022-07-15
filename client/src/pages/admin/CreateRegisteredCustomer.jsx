import axios from "../../../services/HttpServices"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CreateRegisteredCustomer = () => {

    const navigate = useNavigate()

    const [firstname, setfirstname] = useState("")
    const [lastname, setlastname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [error, seterror] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        //validation
        if (firstname.length > 255 || lastname.length > 255 || email.length > 255) {
            if (firstname.length > 255) {
                document.getElementById("invalid-firstname").innerHTML = "first name must not exceed 255 characters"
            }
            if (lastname.length > 255) {
                document.getElementById("invalid-lastname").innerHTML = "last name must not exceed 255 characters"
            }
            if (email.length > 255) {
                document.getElementById("invalid-email").innerHTML = "email must not exceed 255 characters"
            }
        } else {
            if (password !== confirmPassword) {
                document.getElementById("invalid-confirmPassword").innerHTML = "Password and confirm password fields do not match"
            } else {
                var newRegCustomer = {
                    firstname,
                    lastname,
                    email,
                    password,
                    address: null,
                    status: 1,
                    image: null,
                    gender: null,
                    birthday: null
                }
                axios.post("http://localhost:3001/api/registered-customer/register", newRegCustomer)
                    .then(result => {
                        if (result.data.success) {
                            navigate("../all-registered-customers?filter=1")
                        } else {
                            seterror(result.data.err.sqlMessage)
                        }
                    })
                    .catch(err => {
                        seterror(err.message)
                    })
            }
        }
    }

    return (
        <>
            <br />
            <h2 className="add-margin-top">Create Registered Customer</h2>
            {error &&
                <div className="invalid-div">
                    ERROR OCCURED: {error}
                </div>
            }
            <br />
            <form onSubmit={(e) => handleSubmit(e)} className="needs-validation">
                <div className="mb-3 mt-3">
                    <label htmlFor="firstname" className="form-label">First name:</label>
                    <input type="text" className="form-control" id="firstname" placeholder="Enter firstname" name="firstname" required
                        onChange={(e) => setfirstname(e.target.value)} />
                    {/* <div className="valid-feedback"></div> */}
                    <div className="invalid-div" id="invalid-firstname"></div>
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="lastname" className="form-label">lastname:</label>
                    <input type="text" className="form-control" id="lastname" placeholder="Enter lastname" name="lastname" required
                        onChange={(e) => setlastname(e.target.value)} />
                    <div className="invalid-div" id="invalid-lastname"></div>
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" required
                        onChange={(e) => setemail(e.target.value)} />
                    <div className="invalid-div" id="invalid-email"></div>
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="password" className="form-label">password:</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" name="password" required
                        onChange={(e) => setpassword(e.target.value)} />
                    <div className="invalid-div" id="invalid-password"></div>
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="confirm-password" className="form-label">confirm-password:</label>
                    <input type="password" className="form-control" id="confirm-password" placeholder="Enter confirm-password" name="confirm-password" required
                        onChange={(e) => setconfirmPassword(e.target.value)} />
                    <div className="invalid-div" id="invalid-confirmPassword"></div>
                </div>
                <button className="btn btn-primary" type="submit">Create</button>
            </form>
        </>
    );
}

export default CreateRegisteredCustomer;