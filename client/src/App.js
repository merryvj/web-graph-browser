import React, {useEffect, useState} from 'react'
import Graph from './components/Graph';
import SiteFrame from './components/SiteFrame';
import Loader from './components/Loader';
import './App.css'


function App() {

  const [loading, setLoading] = useState(true);
  const [backendData, setBackendData] = useState([]);
  const [url, setUrl] = useState("https://jvns.ca/");

  useEffect(() => {
    setLoading(true);
    let link = url;
    fetch('/api/url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({url: link})
    })
      .then(response => response.json())
      .then(data => {
        setBackendData(data)
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
    });
  }, [url])

  return (
    <div>
      <SiteFrame url={url} setUrl={setUrl}/>
      {(loading || backendData.length === 0) ? (
        <Loader/>
      ) : (
        <Graph data={backendData} onClick={setUrl}/>
      )}
      
    </div>
  )}

export default App