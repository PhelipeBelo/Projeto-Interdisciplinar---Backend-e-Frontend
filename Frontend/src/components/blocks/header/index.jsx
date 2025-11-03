"use client"
import "./navbar.css"
import {useEffect} from "react"
import Link from "next/link";


export default function Navbar() {
    useEffect(()=>{
        require("bootstrap/dist/js/bootstrap.min.js")
    },[])
    
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary nb mb-0"> 
            <div className="container-fluid">
                
                <Link className="navbar-brand ce" href="/">
                    Nexus Suprimentos
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
                    <span className="navbar-toggler-icon" />
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                        
                        <li className="nav-item">
                            <Link className="nav-link active ce" aria-current="page" href="/">
                                Início
                            </Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link ce" href="/produtos">
                                Produtos
                            </Link>
                        </li>

                         <li className="nav-item ms-lg-3 me-lg-0">
                            <Link href="/login">
                                <button className="btn btn-primary-dark w-100 w-lg-auto">
                                    <i className="bi bi-person-circle me-1"></i> Login
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}