// import HeaderOne from "../../components/headers/HeaderOne";
import Layout from '../Navbar/Layout/Layout';
import './Contact.css';
// import NavBar from "../HomePage/NavBar";

const Contact = () => {
    return (

        <div className="about" >
            <Layout/>

            {/* <NavBar page={'Home'}/> */}

            <h1 className="about_header" >About Us...</h1>

            <div className="container cont justify-content-center">

                <div className="row">
                    <div className="about_card col-lg-3 clo-md-6">
                        <div className="image">
                            <img src="https://i.ibb.co/vH7LnZq/doc-ex.png" alt="" />
                        </div>
                        <h5 className="h_6">Register as a Doctor or an Examiner</h5>
                        <p className="des">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, magni, ipsum impedit assumenda doloribus voluptas in, consequatur nulla esse molestiae soluta quo! Provident, ab? Deserunt recusandae nam libero magnam quas.</p>
                    </div>

                    <div className="about_card col-lg-3 clo-md-6">
                        <div className="image">
                            <img src="https://i.ibb.co/BPswCvn/about.png" alt="" />
                        </div>
                        <h5 className="h_6">Add Patients for Tests</h5>
                        <p className="des">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, magni, ipsum impedit assumenda doloribus voluptas in, consequatur nulla esse molestiae soluta quo! Provident, ab? Deserunt recusandae nam libero magnam quas.</p>
                    </div>

                    <div className="about_card col-lg-3 clo-md-6">
                        <div className="image">
                            <img src="https://i.ibb.co/2FNrvtC/test.png" alt="" />
                        </div>
                        <h5 className="h_6">Spiral & Wave Testing</h5>
                        <p className="des">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, magni, ipsum impedit assumenda doloribus voluptas in, consequatur nulla esse molestiae soluta quo! Provident, ab? Deserunt recusandae nam libero magnam quas.</p>
                    </div>

                    <div className="about_card col-lg-3 clo-md-6">
                        <div className="image">
                            <img src="https://i.ibb.co/ns6M3xx/report.png" alt="" />
                        </div>
                        <h5 className="h_6">Save and View Test Records</h5>
                        <p className="des">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, magni, ipsum impedit assumenda doloribus voluptas in, consequatur nulla esse molestiae soluta quo! Provident, ab? Deserunt recusandae nam libero magnam quas.</p>
                    </div>
                </div>

            </div>

            <div className="container cont footer justify-content-center">

                <div className="row">
                    <div className="col-lg-3">
                        <div className="image">
                            <img src="https://i.ibb.co/GMzgMJC/parkinson.png" alt="" />
                        </div>
                    </div>
                    <div className="info_p col-lg-9">
                        <p className="info">Parkinson's disease (PD), sometimes known as Parkinson's, is a long-term central nervous
                            system degenerative condition that primarily affects the motor system. Symptoms normally
                            appear gradually, and non-motor symptoms become more prevalent as the condition
                            progresses. Parkinson's illness was named after English doctor James Parkinson, who gave the
                            first full description of the condition in 1817 in an essay on the Shaking Palsy. Tremor,
                            stiffness, slowness of movement and trouble walking are the most noticeable early signs,
                            although cognitive and behavioral difficulties can also emerge. Many persons with PD
                            experience despair, anxiety, and apathy, which can lead to cognitive and behavioral issues.
                            Parkinson's disease dementia becomes more frequent as the condition progresses, although
                            patients may also have issues with their sleep and sensory systems.
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="info_p col-lg-9">
                        <p className="info">This Parkinson’s Disease Detecting System can identify whether a person is having
                            Parkinson’s disease or not through testing which takes the physical drawings and sketches
                            with some special patterns drawn by a person as a sample. The system uses a machine
                            learning model to perform the testing. Because there is no specific test for Parkinson's disease, this is new research. A doctor skilled
                            in nervous system problems (neurologist) will diagnose Parkinson's disease based on patient
                            medical history and give a review of patient signs and symptoms. This software does physical
                            testing for Parkinson's disease.
                        </p>
                    </div>
                    <div className="col-lg-3">
                        <div className="image">
                            <img src="https://i.ibb.co/cD4Dd4t/parkinson2.png" alt="" />
                        </div>
                    </div>
                </div>

                <p> &copy; Parkinson Disease Detecting System</p>
            </div>

        </div>

    );
}

export default Contact;