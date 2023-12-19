import React from 'react'
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';
import errorGIF from '../Images/funny-404-error.gif';

export default function PageNotFound() {
  return (
    <Layout title={"go-back 404"}>
      <div className="pnf">
        {/* <h1 className="pnf-title">404</h1> */}
        <img className="pnf-title-img" src={errorGIF} alt='404-gif' />
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
  )
}
