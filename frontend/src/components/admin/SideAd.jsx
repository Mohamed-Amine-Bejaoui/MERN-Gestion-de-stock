import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Adhome.css";

export default function SideAd() {
    
    return (
        <div className={`sideAD`}>
            <h2 className="sideAD-title" style={{color:"white"}}>S.G.I</h2>
            <hr style={{marginBottom:"50px"}} />
            <nav>
                <ul className="sideAD-list">
                    <li>
                        <NavLink to="/Admin/homeAd" className="sideAD-link" activeClassName="active">
                            Approved Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Admin/PendingAd" className="sideAD-link" activeClassName="active">
                            Pending Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" className="sideAD-link" activeClassName="active" style={{textDecoration:'underline'}}>
                            logout
                        </NavLink>
                    </li>
                    
                </ul>
            </nav>
        </div>
    );
}
