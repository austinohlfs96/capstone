
import React from "react";
import { Segment, Image } from "semantic-ui-react";
import Head from "./Header";


const LandingPage = () => {
  return (
    <div>
      <Head />
      {/* <Segment style={{ background: "#f0f0f0", textAlign: "center" }}> */}
      <div style={{ position: "relative", marginTop: "10px" }}>
          <Image
            src="https://content.invisioncic.com/n281171/monthly_2020_03/image.png.1219740564eea0550ff238a905befbf5.png"
            fluid
            centered
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
            }}
          >
            <Segment style={{ background: 'rgba(255, 255, 255, 0.3)' }}>
            <h1><Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Valknut.svg/1200px-Valknut.svg.png' size='tiny'/>
             Æsir Performance Tunes</h1>
            <p>GO FAST TAKE CHANCES!</p>
            </Segment>
          </div>
        </div>
      {/* </Segment> */}
      <div >
      <Segment style={{ 
        background: 'rgba(255, 255, 255, 0.9)',
        marginRight: '120px',
        marginLeft: '9px',
        marginTop: "70px",
        height: 'auto'
         }}>
        <Image
          src="https://www.usskiandsnowboard.org/sites/default/files/paragraph/single-image-caption/2020-01/maggiepodium%20.jpg"
          size="medium"
          floated="left"
        />
        <h2 style={{textAlign: "center"}}>Mission</h2>
        <h3 style={{textAlign: "center"}}>
        At Æsir Performance Tunes, our mission is to elevate the winter sports compition by providing unmatched tuning services that empower athletes and coaches to achieve their highest potential on the slopes. We are committed to excellence, constantly pushing the boundaries of performance tuning through innovation and precision. Our goal is to be the trusted partner for winter sports enthusiasts, delivering quality tuning that not only meets but exceeds the rigorous demands of competitive skiing and snowboarding. With a passion for the sport and a dedication to craftsmanship, we strive to enhance the joy and success of every individual who chooses Æsir Performance Tunes.</h3> 
          </Segment>
          <Segment style={{ 
        background: 'rgba(255, 255, 255, 0.9)',
        marginLeft: '120px',
        marginRight: '9px',
        marginTop: "70px",
        height: 'auto'
         }}>
          <Image
          src="https://nbcsports.brightspotcdn.com/dims4/default/9966318/2147483647/strip/true/crop/2195x1235+0+128/resize/1440x810!/quality/90/?url=https%3A%2F%2Fnbc-sports-production-nbc-sports.s3.us-east-1.amazonaws.com%2Fbrightspot%2Fbe%2F53%2F26a974c6d3488d4f6700bd8145ae%2Fdwise.jpg"
          size="medium"
          floated="right"
        />
        <h2 style={{textAlign: "center"}}>Premier Services</h2>
          <h3 style={{textAlign: "center"}}>Discover a new level of performance with Æsir Performance Tunes' premier tuning services. Our offerings are meticulously crafted to cater to the unique needs of athletes and coaches, setting us apart as the premier destination for professional ski and snowboard tuning. We utilize cutting-edge equipment and high-end products to ensure that every tuning process is executed with precision.

</h3> 
          </Segment>
          <Segment style={{ 
        background: 'rgba(255, 255, 255, 0.9)',
        marginRight: '120px',
        marginLeft: '9px',
        marginTop: "70px",
        height: 'auto'
         }}>
        <Image
          src="https://www.snowboarder.com/.image/t_share/MTk2MzUwOTc2MjcyNDQzMzMx/tuning-taylor-boyd-02.jpg"
          size="medium"
          floated="left"
        />
        <h2 style={{textAlign: "center"}}>Our Crew</h2>
        <h3 style={{textAlign: "center"}}>Our success at Æsir Performance Tunes is driven by the expertise and passion of our professional employees and technicians. With a dedicated team of skilled individuals who share a genuine love for winter sports, we take pride in delivering unparalleled tuning experiences. Our technicians are not just experts in their field; they are enthusiasts who understand the intricacies of competitive skiing and snowboarding.
        </h3>
      </Segment>
      <div style={{marginBottom: "10px"}}>
      <Image
        src="https://www.snowboarder.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTk2MzUxNDI1MzY0ODMwMTQ3/modified-pipe.jpg"
        size="large"
        centered
      />
      </div>
    </div>
    </div>
  );
};

export default LandingPage;
