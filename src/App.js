import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [apidata, setApidata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchOptions, setSearchOptions] = useState({
    district: false,
    state: false,
    pincode: true,
    regionName: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [updateClick, setUpdateClick] = useState(false);
  const [createClick, setCreateClick] = useState(false);
  const [updateFields, setUpdateFields] = useState({
    _id:"",
    Officename: "",
    Pincode: "",
    Officetype: "",
    Deliverystatus: "",
    Divisionname: "",
    Regionname: "",
    Circlename: "",
    Taluk: "",
    Districtname: "",
    Statename: "",
  });

  const [updateFields1, setUpdateFields1] = useState({
    Officename: "",
    Pincode: "",
    Officetype: "",
    Deliverystatus: "",
    Divisionname: "",
    Regionname: "",
    Circlename: "",
    Taluk: "",
    Districtname: "",
    Statename: "",
  });

  const handleApidata = async () => {
    try {
      const response = await axios.get("https://pincode-dir.onrender.com/api/v1/getAllData");
      if (response?.data?.success) {
        setApidata(response?.data?.pincodes);
        setFilteredData(response?.data?.pincodes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleApidata();
  }, [deleted]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    let filtered = apidata;

    if (!searchOptions.district && !searchOptions.state && !searchOptions.regionName) {
      // If no filters selected, default search by Pincode
      filtered = apidata.filter((item) => String(item?.Pincode).includes(searchTerm));
    } else {
      filtered = apidata.filter((item) => {
        if (searchOptions.district && item?.Districtname.toLowerCase().includes(searchTerm)) {
          return true;
        }
        if (searchOptions.state && item?.Statename.toLowerCase().includes(searchTerm)) {
          return true;
        }
        if (searchOptions.pincode && String(item?.Pincode).includes(searchTerm)) {
          return true;
        }
        if (searchOptions.regionName && item?.Regionname.toLowerCase().includes(searchTerm)) {
          return true;
        }
        return false;
      });
    }

    setFilteredData(filtered);
  };

  const handleCheckboxChange = (option) => {
    setSearchOptions({ ...searchOptions, [option]: !searchOptions[option] });
  };

  const handleClearFilters = () => {
    setSearchOptions({
      district: false,
      state: false,
      pincode: true,
      regionName: false,
    });
    setFilteredData(apidata);
    setSearchTerm(""); 
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://pincode-dir.onrender.com/api/v1/deletePin/${id}`);
      if (response?.data?.success) {
        console.log(response?.data?.message);
        setDeleted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateField = (item) => {
    setUpdateFields({
      _id:item?._id || "",
      Officename: item?.Officename || "",
      Pincode: item?.Pincode || "",
      Officetype: item?.Officetype || "",
      Deliverystatus: item?.Deliverystatus || "",
      Divisionname: item?.Divisionname || "",
      Regionname: item?.Regionname || "",
      Circlename: item?.Circlename || "",
      Taluk: item?.Taluk || "",
      Districtname: item?.Districtname || "",
      Statename: item?.Statename || "",
    });
    setUpdateClick(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await axios.put("https://pincode-dir.onrender.com/api/v1/updatePin", updateFields);
      if (response?.data?.success) {
        console.log(response?.data?.message);
        setDeleted(true);
        setUpdateClick(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateSubmit = async () => {
    try {
      console.log(updateFields1)
      const response = await axios.post("https://pincode-dir.onrender.com/api/v1/create", updateFields1);
      if (response?.data?.success) {
        console.log(response?.data?.message);
        setDeleted(true);
        setCreateClick(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <div className="checkbox-container">
          <label className="district">
            <input
              type="checkbox"
              checked={searchOptions.district}
              onChange={() => handleCheckboxChange("district")}
            />
            District
          </label>
          <label>
            <input
              type="checkbox"
              checked={searchOptions.state}
              onChange={() => handleCheckboxChange("state")}
            />
            State
          </label>
          <label>
            <input
              type="checkbox"
              checked={searchOptions.pincode}
              onChange={() => handleCheckboxChange("pincode")}
            />
            Pincode
          </label>
          <label>
            <input
              type="checkbox"
              checked={searchOptions.regionName}
              onChange={() => handleCheckboxChange("regionName")}
            />
            Regions
          </label>
          <button onClick={handleClearFilters} style={{backgroundColor:"rgb(240, 172, 172)"}}>Clear All</button>

          <button 
              onClick={()=>setCreateClick(true)} 
              className="createnew"
              style={{backgroundColor:"green"}}
          >Create New</button>

        </div>
      </div>
      <div className="list-container">
        <div className="list-header">
          <div className="list-cell">Officename</div>
          <div className="list-cell">Pincode</div>
          <div className="list-cell">Officetype</div>
          <div className="list-cell">Deliverystatus</div>
          <div className="list-cell">Divisionname</div>
          <div className="list-cell">Regionname</div>
          <div className="list-cell">Circlename</div>
          <div className="list-cell">Taluk</div>
          <div className="list-cell">Districtname</div>
          <div className="list-cell">Statename</div>
          <div className="list-cell">Actions</div>
        </div>
        <div className="list">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div key={index} className={`list-row ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}>
                <div className="list-cell">{item?.Officename}</div>
                <div className="list-cell">{item?.Pincode}</div>
                <div className="list-cell">{item?.Officetype}</div>
                <div className="list-cell">{item?.Deliverystatus}</div>
                <div className="list-cell">{item?.Divisionname}</div>
                <div className="list-cell">{item?.Regionname}</div>
                <div className="list-cell">{item?.Circlename}</div>
                <div className="list-cell">{item?.Taluk}</div>
                <div className="list-cell">{item?.Districtname}</div>
                <div className="list-cell">{item?.Statename}</div>
                <div className="list-cell">
                  <button onClick={() => handleUpdateField(item)} className="updatebtn">Update</button>
                  <button onClick={() => handleDelete(item?._id)} className="deletebtn">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div>No results found.</div>
          )}
        </div>
      </div>
      {updateClick && (
        <div className="update-overlay">
          <div className="update-form">
            <h2>Update Item</h2>
            <label>Officename:</label>
            <input
              type="text"
              value={updateFields.Officename}
              onChange={(e) => setUpdateFields({ ...updateFields, Officename: e.target.value })}
            />
            <label>Pincode:</label>
            <input
              type="text"
              value={updateFields.Pincode}
              onChange={(e) => setUpdateFields({ ...updateFields, Pincode: e.target.value })}
            />

            <label>Officetype:</label>
            <input
              type="text"
              value={updateFields.Officetype}
              onChange={(e) => setUpdateFields({ ...updateFields, Officetype: e.target.value })}
            />

            <label>Deliverystatus:</label>
            <input
              type="text"
              value={updateFields.Deliverystatus}
              onChange={(e) => setUpdateFields({ ...updateFields, Deliverystatus: e.target.value })}
            />

            <label>Divisionname:</label>
            <input
              type="text"
              value={updateFields.Divisionname}
              onChange={(e) => setUpdateFields({ ...updateFields, Divisionname: e.target.value })}
            />

            <label>Regionname:</label>
            <input
              type="text"
              value={updateFields.Regionname}
              onChange={(e) => setUpdateFields({ ...updateFields, Regionname: e.target.value })}
            />

            <label>Circlename:</label>
            <input
              type="text"
              value={updateFields.Circlename}
              onChange={(e) => setUpdateFields({ ...updateFields, Circlename: e.target.value })}
            />

            <label>Taluk:</label>
            <input
              type="text"
              value={updateFields.Taluk}
              onChange={(e) => setUpdateFields({ ...updateFields, Taluk: e.target.value })}
            />

            <label>Districtname:</label>
            <input
              type="text"
              value={updateFields.Districtname}
              onChange={(e) => setUpdateFields({ ...updateFields, Districtname: e.target.value })}
            />

            <label>Statename:</label>
            <input
              type="text"
              value={updateFields.Statename}
              onChange={(e) => setUpdateFields({ ...updateFields, Statename: e.target.value })}
            />
            <button onClick={handleUpdateSubmit} className="updateupdate">Submit</button>
            <button onClick={() => setUpdateClick(false)} className="updatecancel">Cancel</button>
          </div>
        </div>
      )}

      {createClick && (
        <div className="update-overlay">
          <div className="update-form">
            <h2>Create Item</h2>
            <label>Officename:</label>
            <input
              type="text"
              value={updateFields1.Officename}
              onChange={(e) => setUpdateFields1({ ...updateFields1, Officename: e.target.value })}
            />
            <label>Pincode:</label>
            <input
              type="text"
              value={updateFields1.Pincode}
              onChange={(e) => setUpdateFields1({ ...updateFields1, Pincode: e.target.value })}
            />

            <label>Officetype:</label>
            <input
              type="text"
              value={updateFields1.Officetype}
              onChange={(e) => setUpdateFields1({ ...updateFields1, Officetype: e.target.value })}
            />

            <label>Deliverystatus:</label>
            <input
              type="text"
              value={updateFields1.Deliverystatus}
              onChange={(e) => setUpdateFields1({ ...updateFields1, Deliverystatus: e.target.value })}
            />

            <label>Divisionname:</label>
            <input
              type="text"
              value={updateFields1.Divisionname}
              onChange={(e) => setUpdateFields1({ ...updateFields1, Divisionname: e.target.value })}
            />

            <label>Regionname:</label>
            <input
              type="text"
              value={updateFields1.Regionname}
              onChange={(e) => setUpdateFields1({ ...updateFields1, Regionname: e.target.value })}
            />

            <label>Circlename:</label>
            <input
              type="text"
              value={updateFields1.Circlename}
              onChange={(e) => setUpdateFields1({ ...updateFields1, Circlename: e.target.value })}
            />

            <label>Taluk:</label>
            <input
              type="text"
              value={updateFields1.Taluk}
              onChange={(e) => setUpdateFields1({ ...updateFields1, Taluk: e.target.value })}
            />

            <label>Districtname:</label>
            <input
              type="text"
              value={updateFields1.Districtname}
              onChange={(e) => setUpdateFields1({ ...updateFields1, Districtname: e.target.value })}
            />

            <label>Statename:</label>
            <input
              type="text"
              value={updateFields1.Statename}
              onChange={(e) => setUpdateFields1({ ...updateFields1, Statename: e.target.value })}
            />
            <button onClick={handleCreateSubmit} className="updateupdate">Create</button>
            <button onClick={() => setCreateClick(false)} className="updatecancel">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
