import React ,{ useState, useEffect }from 'react'
import "../styles/categorie.css";
import Sidebar from './Sidebar';
const Categorie = () => {
  const [categories, setCategories] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCat, setNewCat] = useState({
    nom: "",
});
 const [editingCat,setEditingcat]=useState(null)
useEffect(() => {
  
  const fetchCategories = async () => {
    try {
        const response = await fetch("https://mern-gestion-de-stock-production.up.railway.app/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data); 
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};

fetchCategories();
},[])

const handleDeletecat = async (id) => {
  try {
      const response = await fetch(`https://mern-gestion-de-stock-production.up.railway.app/categories/${id}`, {
          method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete categorie");
      setCategories(categories.filter((cat) => cat.id_categorie !== id));
  } catch (error) {
      console.error("Error deleting categorie:", error);
  }
};
const handleAddCategorie = async (e) => {
  e.preventDefault(); 
  try {
      const response = await fetch("https://mern-gestion-de-stock-production.up.railway.app/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCat),
      });
      if (!response.ok) throw new Error("Failed to add Categorie");
      const savedCats = await response.json();
      setCategories([...categories, savedCats]);
      setNewCat({
          nom: "",
      });
      setIsModalOpen(false); 
  } catch (error) {
      console.error("Error adding Categorie:", error);
  }
};

const handleUpdateCat = async () => {
  try {
      const response = await fetch(
          `https://mern-gestion-de-stock-production.up.railway.app/categories/${editingCat.id_categorie}`,
          {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(editingCat),
          }
      );
      if (!response.ok) throw new Error("Failed to update Categorie");
      const updatedCat = await response.json();
      setCategories(
          categories.map((cat) =>
              cat.id_categorie === updatedCat.id_categorie
                  ? updatedCat
                  : cat
          )
      );
      setEditingcat(null);
  } catch (error) {
      console.error("Error updating categorie:", error);
  }
};

  return (
    <div style={{ display: "flex"}}>
            <Sidebar />
            <div className="Categorie-content" style={{ marginLeft: "20px" }}>
            <h2 >Categories</h2>
            <div>
                <button onClick={() => setIsModalOpen(true)} className="ajouterCat">ajouter</button>
                {isModalOpen && (
                  <div className="modal">
                  <div className="modal-contentCat">
                      <span className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</span>
                      <form onSubmit={handleAddCategorie}>
                          <input
                              type="text"
                              placeholder="Nom"
                              value={newCat.nom}
                              onChange={(e) =>
                                setNewCat({ ...newCat, nom: e.target.value })
                              }
                          />
                          <button type="submit">ajouter Categorie</button>
                      </form>
                  </div>
                </div>
                )}
                <div className="categories">
                        { (
                            categories.map((cat) => (
                                <div key={cat.id_categorie} className="CardCat">
                              
                                    <h3 title={cat.nom}>{cat.nom}</h3>
                                    <button className="buttonAR Del" onClick={() => handleDeletecat(cat.id_categorie)}>
                                        supprimer
                                    </button>
                                    <button className="buttonAR Ed" style={{backgroundColor:"#ffce3b"}} onClick={() => setEditingcat({ ...cat })}>
                                        modifier
                                    </button>
                                </div>
                            ))
                        )}
                        {editingCat && (
                            <div className="editP">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleUpdateCat();
                                    }}
                                >
                                    <input
                                        type="text"
                                        placeholder="nom"
                                        value={editingCat.nom}
                                        onChange={(e) =>
                                            setEditingcat({
                                                ...editingCat,
                                                nom: e.target.value,
                                            })
                                        }
                                    />
                                    <button type="submit">Update Categorie</button>
                                    <button
                                        onClick={() => setEditingcat(null)}
                                        type="button"
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
            </div>


            </div>
    </div>
  )
}

export default Categorie