import React, { useEffect, useState } from 'react';
import './App.css';

// export function Countries({image, name}){
//   return(
    
//   );
  
//}
function App() {
  const [countries, setCountries] = useState([]);
  const[searchTerm, setSearchTerm] = useState("");

 

  useEffect(() =>{
    const performAPI = async() =>{
      try {
        const response = await fetch(' https://countries-search-data-prod-812920491762.asia-south1.run.app/countries');
        if(!response.ok){
          throw new Error("Failed to fetch country data");
        }
        const responseJSON = await response.json();
        setCountries(responseJSON); 
      } catch (error) {
        console.log('Error Fetching Data : ',error);
      }
    }
    performAPI()
  }, []);

  const filteredCountries = countries.filter((ele) => ele.common.toLowerCase().includes(searchTerm.toLowerCase()));

  return(
    <div style={{
      textAlign: "center",
      marginTop:"20px",
      // padding:'20px',
      }}>

      <input type='text'
      placeholder='Search for a country...'
      value={searchTerm}
      onChange={(e) =>{setSearchTerm(e.target.value)}}
      style={{
        padding: '10px',
        fontSize: '16px',
        marginBottom:'20px',
        width: '80%',
        maxWidth: '400px'
      }}/>

      
      <div style={{
        display: 'flex',
        flexWrap:'wrap',
        margin:'10px',
        padding:'10px',
        gap:'10px',
        }}>
        {filteredCountries.length>0 ?(
          filteredCountries.map((ele,idx) =>(
            <div
            key={idx}
            className='countryCard'
              style={{
               display: "flex",
               flexDirection: "column",
               justifyContent: "center",
               alignItems:"center",
               textAlign: "center",
               border:'1px solid black',
               borderRadius:"10px",
               height:"170px",
               width:"170px",
             }}>
               <img 
               style={{
                 height: '100px',
                 width: '100px',
               }}
                src = {ele.png} alt ={`flag of${ele.common}`}/>
               <p>{ele.common}</p>
             </div>
             ))
            ):(
              <p>No country found</p>
             )}
        
        
      </div>
    </div>
    
  )
}

export default App;
