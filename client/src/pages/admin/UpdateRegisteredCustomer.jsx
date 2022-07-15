import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../services/HttpServices";

const UpdateRegisteredCustomer = () => {
    const userID = useParams().id
    const navigate = useNavigate()

    const [isPending, setisPending] = useState(true)
    const [error, seterror] = useState(null)
    var [registeredCustomer, setregisteredCustomer] = useState(null)

    const [firstname, setfirstname] = useState("")
    const [lastname, setlastname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")

    useEffect(() => {

        // setisPending(true)
        axios.get("http://localhost:3001/api/registered-customer/get/" + userID)
            .then(result => {
                var data = result.data
                if (data.success) {
                    setregisteredCustomer(data.result[0])
                    setfirstname(data.result[0].firstname)
                    setlastname(data.result[0].lastname)
                    setemail(data.result[0].email)
                    setpassword(data.result[0].password)
                    setconfirmPassword(data.result[0].confirmPassword)
                } else {
                    seterror(data.err)
                }
                setisPending(false)
            })
            .catch(err => {
                console.log("Error when fetching customer data: ", err);
                seterror(err)
                setisPending(false)
            })
    }, [])



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
                var updatedRegCustomer = { ...registeredCustomer, firstname, lastname, email, password }
                axios.put("http://localhost:3001/api/registered-customer/update", updatedRegCustomer)
                    .then(result => {
                        // console.log("YAYYY", result.data);
                        navigate("../all-registered-customers?filter=1")
                    })
                    .catch(err => {
                        console.log("error: ", err);
                    })
            }
        }
    }

    return (
        <>

            {isPending && <p> Loading... </p>}
            {error && <p> Error occured: {error.message} </p>}
            {registeredCustomer &&
                <>
                    <form onSubmit={(e) => handleSubmit(e)} className="needs-validation">
                        <div className="mb-3 mt-3">
                            <label htmlFor="firstname" className="form-label">First name:</label>
                            <input type="text" className="form-control" id="firstname" placeholder="Enter firstname" name="firstname" required
                                value={firstname}
                                onChange={(e) => setfirstname(e.target.value)} />
                            {/* <div className="valid-feedback"></div> */}
                            <div className="invalid-div" id="invalid-firstname"></div>
                        </div>

                        <div className="mb-3 mt-3">
                            <label htmlFor="lastname" className="form-label">lastname:</label>
                            <input type="text" className="form-control" id="lastname" placeholder="Enter lastname" name="lastname" required
                                value={lastname}
                                onChange={(e) => setlastname(e.target.value)} />
                            <div className="invalid-div" id="invalid-lastname"></div>
                        </div>

                        <div className="mb-3 mt-3">
                            <label htmlFor="email" className="form-label">email:</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" required
                                value={email}
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
                        <button className="btn btn-primary" type="submit">Update</button>
                    </form>
                </>
            }
        </>
    );
}

export default UpdateRegisteredCustomer;