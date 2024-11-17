import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    
    return (
        <div className={`sidebar`}>
            <h2 className="sidebar-title" style={{color:"white"}}>S.G.I</h2>
            <hr style={{marginBottom:"50px"}} />
            <nav>
                <ul className="sidebar-list">
                    <li>
                        <NavLink to="/home" className="sidebar-link" activeClassName="active">
                            Articles
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/settings" className="sidebar-link" activeClassName="active">
                            Categorie
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/tables" className="sidebar-link" activeClassName="active">
                            Commandes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/maps" className="sidebar-link" activeClassName="active">
                            Fournisseur
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/inventory" className="sidebar-link" activeClassName="active">
                            Rapport d'inventaire
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/alerts" className="sidebar-link" activeClassName="active">
                            Alertes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" className="sidebar-link logout-link" activeClassName="active">
                            Logout
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
