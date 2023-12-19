import React from "react";
import Layout from "./../components/Layout/Layout";
import privacy from '../Images/privacy_policy_01.jpg'

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus policy-con">
        <div className="col-md-6 ">
          <img
            src={privacy}
            alt="contactus"
            style={{ width: "70%", borderRadius: "5px" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2 aboutUs-Com">
          At <span className="aboutUs-company_name">Quorevix</span> , your privacy is our priority. 
          We ensure the confidentiality of your data, utilizing 
          industry-standard security measures. We collect only necessary 
          information for specific purposes and do not share your data 
          with third parties without explicit consent. Our practices 
          adhere to data protection regulations, reflecting our commitment
           to transparency. For any privacy-related inquiries, feel free 
           to contact us.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;