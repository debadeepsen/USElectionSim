import React, { useState, useEffect } from 'react';


const electorates = [
  { name: "Alabama", count: 9 },
  { name: "Alaska", count: 3 },
  { name: "Arizona", count: 11 },
  { name: "Arkansas", count: 6 },
  { name: "California", count: 55 },
  { name: "Colorado", count: 9 },
  { name: "Connecticut", count: 7 },
  { name: "Delaware", count: 3 },
  { name: "District of Columbia", count: 3 },
  { name: "Florida", count: 29 },
  { name: "Georgia", count: 16 },
  { name: "Hawaii", count: 4 },
  { name: "Idaho", count: 4 },
  { name: "Illinois", count: 20 },
  { name: "Indiana", count: 11 },
  { name: "Iowa", count: 6 },
  { name: "Kansas", count: 6 },
  { name: "Kentucky", count: 8 },
  { name: "Louisiana", count: 8 },
  { name: "Maine", count: 4 },
  { name: "Maryland", count: 10 },
  { name: "Massachusetts", count: 11 },
  { name: "Michigan", count: 16 },
  { name: "Minnesota", count: 10 },
  { name: "Mississippi", count: 6 },
  { name: "Missouri", count: 10 },
  { name: "Montana", count: 3 },
  { name: "Nebraska", count: 5 },
  { name: "Nevada", count: 6 },
  { name: "New Hampshire", count: 4 },
  { name: "New Jersey", count: 14 },
  { name: "New Mexico", count: 5 },
  { name: "New York", count: 29 },
  { name: "North Carolina", count: 15 },
  { name: "North Dakota", count: 3 },
  { name: "Ohio", count: 18 },
  { name: "Oklahoma", count: 7 },
  { name: "Oregon", count: 7 },
  { name: "Pennsylvania", count: 20 },
  { name: "Rhode Island", count: 4 },
  { name: "South Carolina", count: 9 },
  { name: "South Dakota", count: 3 },
  { name: "Tennessee", count: 11 },
  { name: "Texas", count: 38 },
  { name: "Utah", count: 6 },
  { name: "Vermont", count: 3 },
  { name: "Virginia", count: 13 },
  { name: "Washington", count: 12 },
  { name: "West Virginia", count: 5 },
  { name: "Wisconsin", count: 10 },
  { name: "Wyoming", count: 3 }
]

const MobileApp = () => {

  const [results, setResults] = useState([]);
  const [finalDemocrat, setFinalDemocrat] = useState(0);
  const [finalRepublican, setFinalRepublican] = useState(0);

  useEffect(() => {
    let res = [];
    electorates.forEach(e => {
      let r = {};
      r.name = e.name;
      r.count = e.count;
      r.D = 0;
      r.R = 0;
      res.push(r);
    })

    setResults(res);
  }, []);

  const setStateResult = (state, party) => {
    let results1 = results.map(r => r);
    results1.find(r => r.name == state.name)['D'] = 0;
    results1.find(r => r.name == state.name)['R'] = 0;
    results1.find(r => r.name == state.name)[party] = state.count;
    setResults(results1);

    let finalD = 0;
    results1.forEach(r => {
      finalD += r.D;
    })
    setFinalDemocrat(finalD);

    let finalR = 0;
    results1.forEach(r => {
      finalR += r.R;
    })
    setFinalRepublican(finalR);

  }

  return (
    <div style={{textAlign:"center"}}>
    <h1 style={{
      fontWeight: 200
    }}>United States Presidential Election Results Simulator</h1>
    <h3 style={{fontWeight:200, color: "#555"}}>Click the buttons 'D' or 'R' to set Democratic or Republican victories for each state, and the result will update itself.</h3>
      <div className="main-div" style={{ width: "32vw", margin: "0 auto" }}>
        {
          results.map((e, i) => (
            <div key={i} style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: (e.D == 0 && e.R == 0) ? "#0000" : (e.D > 0 ? "#1c9eda15" : "#da1c1c15")
            }} className="row">
              <div style={{
                fontWeight: (e.D == 0 && e.R == 0) ? 400 : 600,
                color: (e.D == 0 && e.R == 0) ? "#222" : (e.D > 0 ? "#1c9eda" : "#da1c1c"),
                paddingTop: 3,
                paddingLeft: 3
              }}>{e.name}</div>
              <div><button className="democrat" title={'Click to set Democratic victory for ' + e.name} onClick={() => setStateResult(e, 'D')}>D</button></div>
              <div><button className="republican" title={'Click to set Republican victory for ' + e.name} onClick={() => setStateResult(e, 'R')}>R</button></div>
              <div className="D">{e.D}</div>
              <div className="R">{e.R}</div>
            </div>
          ))
        }
      </div>
      <div className="final-result">
        <div className="democrat">
          {finalDemocrat}
        </div>
        <div className="republican">
          {finalRepublican}
        </div>
      </div>
    </div>
  );
}

export default MobileApp;
