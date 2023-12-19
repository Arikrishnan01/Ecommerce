import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth';
import UserMenu from '../../components/Layout/UserMenu';

export default function Dashboard() {

  const [auth] = useAuth();

  return (
    <Layout title="Dashboard -Ecommerce App">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 user-menu">
            <div className="card w-75 p-3">
              <h3>{auth?.user?.user}</h3>
              <h3>{auth?.user?.email}</h3>
              <h3>{auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
