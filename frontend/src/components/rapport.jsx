import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios'; 
import "../styles/rapport.css";
const Rapport = () => {
  const [reports, setReports] = useState([]); 

  const fetchReports = async () => {
    try {
      const response = await axios.get('https://mern-gestion-de-stock-production.up.railway.app/rapport/rapportinventaire');
      setReports(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const generateReport = async () => {
    try {
      const response = await axios.post('https://mern-gestion-de-stock-production.up.railway.app/rapport/generate');
      fetchReports(); 
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
  
  

    fetchReports();
    },[])
    


  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className='Rapport-content'>
        <h2>Rapports d'Inventaire</h2>
        <div>
          <button
            className="ajouterRap"
            onClick={generateReport}
          >
            Générer Rapport d\'Inventaire
          </button>
        </div>


        <div>
          {reports.length > 0 ? (
            <ul style={{textDecoration:"none",listStyleType:"none",marginTop:"40px"}}>
              {reports.map((rapport) => (
                <li key={rapport.id_rapport} className='Link'>
                <div className="rapport-item">
                  <p style={{color:"white"}}>
                    Rapport #{rapport.id_rapport} - {new Date(rapport.date_generation).toLocaleDateString()}
                  </p>
                  <a href={`https://mern-gestion-de-stock-production.up.railway.app/public/reports/${rapport.fileName}`} target="_blank" rel="noopener noreferrer" className="rapport-link">
                    Consulter
                  </a>
                </div>
              </li>
              ))}
            </ul>
          ) : (
            <p>Aucun rapport généré.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rapport;
