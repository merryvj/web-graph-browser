import React, {useEffect, useState} from 'react'
import Graph from './components/Graph';
import SiteFrame from './components/SiteFrame';
import Loader from './components/Loader';
import './App.css'


function App() {

  const [loading, setLoading] = useState(true);
  const [backendData, setBackendData] = useState([]);
  const [url, setUrl] = useState("https://rfong.github.io/rflog/");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    setLoading(true);
    let link = url;
    fetch('https://wobbly-browser-server.onrender.com/api/url', {
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
        fetchSummary();
      })
      .catch(error => {
        console.log(error);
    });
  }, [url])

  const fetchSummary = async() => {
    fetch('https://wobbly-browser-server.onrender.com/api/summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({body: backendData.body})
    })
    .then(res => res.json())
    .then(data => setSummary(data))
  }

  return (
    <div>
      <SiteFrame url={url} setUrl={setUrl} summary={summary}/>
      {(loading || backendData.length === 0) ? (
        <Loader/>
      ) : (
        <Graph data={backendData} onClick={setUrl}/>
      )}
      
    </div>
  )}

export default App