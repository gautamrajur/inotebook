import React, { useEffect } from 'react'
import {Link, useLocation} from "react-router-dom";

function Navbar() {
    let location = useLocation();
    useEffect(()=>{
        console.log(location.pathname)
    },[location])
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand"to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className={`nav-link ${location.pathname==="/" ? "active": ""}`}to="/">Home </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/about" ? "active": ""}`} to="/about">About</Link>
                    </li>
                </ul>
            </div>
            <form className="d-flex justify-content-end">
                    <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
            </form>
    </nav>
    </>
  )
}

export default Navbar
