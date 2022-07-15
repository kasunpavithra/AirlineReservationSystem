import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../services/HttpServices";

const UpdateAuthorizedUser = () => {
    const userID = useParams().id
    const navigate = useNavigate()

    const [isPending, setisPending] = useState(true)
    const [error, seterror] = useState(null)
    var [authorizedUser, setauthorizedUser] = useState(null)

    const [firstname, setfirstname] = useState("")
    const [lastname, setlastname] = useState("")
    const [email, setemail] = useState("")
    const [type, settype] = useState(null)
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")

    useEffect(() => {

        axios.get("http://localhost:3001/api/authorized-user/get/" + userID)
            .then(result => {
                var data = result.data
                if (data.success) {
                    setauthorizedUser(data.result[0])
                    setfirstname(data.result[0].firstname)
                    setlastname(data.result[0].lastname)
                    setemail(data.result[0].email)
                    settype(data.result[0].type)
                    // console.log(typeof data.result[0].type, data.result[0].type);
                    setpassword(data.result[0].password)
                    setconfirmPassword(data.result[0].confirmPassword)
                } else {
                    seterror(data.err)
                }
                setisPending(false)
            })
            .catch(err => {
                console.log("Error when fetching authorized-user data: ", err);
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
                var updatedAuthUser = { ...authorizedUser, firstname, lastname, email, password, type }
                // console.log(type)
                axios.put("http://localhost:3001/api/authorized-user/update", updatedAuthUser)
                    .then(result => {
                        console.log("YAYYY", result.data);
                        navigate("../all-authorized-users?filter=1")
                    })
                    .catch(err => {
                        console.log("error: ", err);
                    })
                
            }
        }
    }

    return (
        <>

            {isPending && <p className="add-margin-top"> Loading... </p>}
            {error && <p className="add-margin-top"> Error occured: {error.message} </p>}
            {authorizedUser &&
                <>
                    <form onSubmit={(e) => handleSubmit(e)} className="needs-validation add-margin-top">
                        <div className="mb-3 mt-3">
                            <label htmlFor="firstname" className="form-label">First name:</label>
                            <input type="text" className="form-control" id="firstname" placeholder="Enter firstname" name="firstname" required
                                value={firstname}
                                onChange={(e) => setfirstname(e.target.value)} />
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

                        {!!type &&
                            <>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                                        value="1"
                                        onClick={(e) => settype(e.target.value)}
                                        defaultChecked
                                    />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Manager
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                        value="0"
                                        onClick={(e) => settype(e.target.value)}

                                    />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        Admin
                                    </label>
                                </div>
                            </>
                        }
                        {!type &&
                            <>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                                        value="1"
                                        onClick={(e) => settype(e.target.value)}
                                        
                                    />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Manager
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                        value="0"
                                        onClick={(e) => settype(e.target.value)}
                                        defaultChecked
                                    />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        Admin
                                    </label>
                                </div>
                            </>
                        }
                        <br />

                        <button className="btn btn-primary" type="submit">Update</button>
                    </form>
                </>
            }
        </>
    );
}

export default UpdateAuthorizedUser;