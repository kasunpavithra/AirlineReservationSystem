import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap";

import Layout from "../../pages/Navbar/Layout/Layout";

const Unauthorized = ()=>{
    const navigate = useNavigate();

    const goBack = ()=>navigate(-1);
    

    return(
        // <section>
        //     <h1>Unauthorized</h1>
        //     <br />
        //     <p>You do not have access to the requested page.</p>
        //     <div className="flexGrow">
        //         <button onClick={goBack}>Go Back</button>
        //     </div>
        // </section>
        <> 
          <div>
          <Layout/>
           

          {/* <HeaderOne /> */}

          <h1 className="notfound_header" style={{marginTop:130}}>401 Error - Unauthorized</h1>

          <p style={{color: "black", textAlign: "center", margin: "10px"}}>Sorry, You don't have permisson to access this page</p>

          <div className="image">
              <img src="https://i.ibb.co/zh0ZJFD/unauthorized.png" alt=""/>
          </div>

          <div className="back_button">        
              <Button onClick={goBack} className="reg_button" style={{ borderRadius: "20px" }}>
                  Go Back
              </Button>
          </div>

      </div>
      </>
    )
}

export default Unauthorized;