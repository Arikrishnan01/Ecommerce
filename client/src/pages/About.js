import React from "react";
import Layout from "./../components/Layout/Layout";
import aboutUs from '../Images/aboutUs_03.png'

const About = () => {
  return (
    <Layout title={"AboutUs -Ecommerce App"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src={aboutUs}
            alt="contactus"
            style={{ width: "100%", height: "300px !impartant", borderRadius: "5px"}}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2 aboutUs-Com">
          A passion for excellence and a client-focused approach, 
          <span className="aboutUs-company_name">
          Quorvix  
          </span> has a proven track record of successfully 
          delivering projects on time and within budget. 
          Our diverse portfolio reflects our commitment to quality, 
          innovation, and turning challenges into opportunities.

          Thank you for considering 
          <span className="aboutUs-company_name">
          Quorvix  
          </span>
           as your strategic
          partner. We look forward to the opportunity of working with you
          and making your vision a reality.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;