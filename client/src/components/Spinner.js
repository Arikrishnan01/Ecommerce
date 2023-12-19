import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Spinner({ path ="login"}) {

    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    /**useeffect for set interval time for spinner */
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((preValue) => --preValue)
        },1000)
        count === 0 && navigate(`${path}`, {
            state: location.pathname,
        })
        return () => clearInterval(interval)
    },[count, navigate, location, path]);

  return (
    <>
        <div class="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >
            <h1 className='text-center'>
                Redirect to you in {count} second
            </h1>
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </>
  )
}
