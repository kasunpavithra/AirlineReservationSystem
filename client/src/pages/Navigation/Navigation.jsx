import { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
// import "./AdminDashboard.css"
import 'font-awesome/css/font-awesome.css';

// import Loader from "../../components/loader/Loader";

import jwtDecode from "jwt-decode";
const Navigation = () => {

    const navigate = useNavigate();
    // const location = useLocation();
    // console.log(location.state?.from);
    // const from = location.state?.path || "/";
    

    // const [loader, setLoader] = useState(false);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async (usertype) => {
        // setLoader(true);
        try {
            // const response = await UserServices.getUser();
            
            // setAuth({usertype:response.data.data.auth.usertype.name})
            try{
                var user=jwtDecode(localStorage.getItem("AccessToken"))
               }
              

            catch(err){
                user=null
            }
            console.log('myuser',user.userInfo.role)
            // console.log(from)
            // navigate(from, { replace: true })
            // console.log("usertype",response.data.data.auth.usertype.name);
            // user?.profile_complete
        
            if (true) {
                console.log('helo')
                switch (user?.userInfo?.role) {
                    case 5002:
                        navigate('/admin');
                        break;
                    case 5003:
                        navigate('/manager');
                        break
                    case 5000:
                        navigate('/dashboard');
                        break
                    default:
                        break;
                }
            } else {
                navigate('/update-profile');
            }
        } catch (error) {
            // console.log(error);
        }
        setTimeout(() => {
            // setLoader(false);
        }, 200);
    };

    // if (loader) {
    //     return <Loader/>
    // }
    // else{
    //     return (
    //     <div className="dashboard">

    //     </div>
    // );
    // }
}

export default Navigation;