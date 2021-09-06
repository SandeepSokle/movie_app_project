
import React,{useEffect} from 'react';
import { Link } from "react-router-dom";


function Navbar() {

  useEffect(()=>{

    let allBtns = document.querySelectorAll(".nav-link");
  
    console.log(allBtns.length);
  
    for(let i = 0 ; i < allBtns.length ; i++){
      allBtns[i].addEventListener("click",(e)=>{
      for(let j = 0 ; j < allBtns.length ; j++){
        allBtns[j].classList.remove("active")
      }  
  
      e.currentTarget.classList.add("active");
      })
    }
  },[])


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MovieRentals
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Movies
              </Link>
            </li>
            <li className ="nav-item">
              <Link className="nav-link" to="/customers">
                Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/rentals">
                Rentals
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;