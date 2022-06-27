import "./styleHome.css"
import delhiPic from "./DELHI.jpg"
import singaPic from "./singa.jpg"
import bangkokPic from "./bangkok.jpg"

const Landing = () => {
    return (
        <>
            <section className="header">
                <div className="headerGradient"></div>
                <nav>
                    <a href="index.html"><img src="Dedsec.png" /></a>
                    <div className="nav-links">
                        <ul>
                            <li><b><a href="/login">LOGIN</a></b></li>
                            <li><b><a href="/register">REGISTER</a></b></li>
                            <li><b><a href="/about">ABOUT</a></b></li>
                            <li><b><a href="/contact">CONTACT</a></b></li>
                        </ul>
                    </div>
                </nav>
                <div className="text-box">
                    <h1><b>B-Airways</b></h1>
                    <h4>Subsidiary of Indonesia's leading airline company- Virgin Airlines </h4><br /><br />
                    <a href="/booking" className="hero-btn">Book tickets now</a>
                </div>
            </section>

            <section className="city-carousal">
                <h2>Explore amazing destinations</h2> <br /><br />

                {/* <!-- Carousel --> */}
                <div id="demo" className="carousel slide" data-bs-ride="carousel">

                    {/* <!-- Indicators/dots --> */}
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                    </div>

                    {/* <!-- The slideshow/carousel --> */}
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={delhiPic} alt="Los Angeles" className="d-block image-width image-heigh1"  />
                                <div className="carousel-caption">
                                    <h3>Delhi</h3>
                                </div>
                        </div>
                        <div className="carousel-item">
                            <img src={singaPic} alt="Chicago" className="d-block image-width"  />
                                <div className="carousel-caption">
                                    <h3>Singapore</h3>
                                </div>
                        </div>
                        <div className="carousel-item">
                            <img src={bangkokPic} alt="New York" className="d-block image-width"  />
                                <div className="carousel-caption">
                                    <h3>Bangkok</h3>
                                </div>
                        </div>
                    </div>

                    {/* <!-- Left and right controls/icons --> */}
                    <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
            </section>

            {/* <!------cONTACT US--> */}
            <section className="contact">
                <h1><a href="/booking">Book your tickets now!</a> </h1>
            </section>
            {/* <!------Footer--> */}
            <section>
                <div className="footer">
                    <div className="footer-col">
                        <h1>WELCOME</h1>
                        <p><b>Virgin Airlines, the leading airline company in Indonesia is always ready to dispatch our customers to destinations safely. <br />
                            witness a truly unique experience!</b></p>
                    </div>
                    <div className="footer-col">
                        <h1>CONTACT US</h1>
                        
                    </div>
                    <div className="footer-col">

                    </div>
                </div>
            </section>
        </>
    );
}

export default Landing;