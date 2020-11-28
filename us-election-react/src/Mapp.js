import React, { useState, useEffect } from 'react';
import USAMap from "react-usa-map";
import App from "./App";

const COLORS = {
    REPUBLICAN: "#D81C28",
    DEMOCRAT: "#019bd8"
}

const electorates = [
    { name: "Alabama", code: "AL", x: 642, y: 405, count: 9 },
    { name: "Alaska", code: "AK", x: 106, y: 488, count: 3 },
    { name: "Arizona", code: "AZ", x: 187, y: 360, count: 11 },
    { name: "Arkansas", code: "AR", x: 534, y: 368, count: 6 },
    { name: "California", code: "CA", x: 67, y: 273, count: 55 },
    { name: "Colorado", code: "CO", x: 305, y: 266, count: 9 },
    { name: "Connecticut", code: "CT", x: -100000, y: 183, count: 7 },
    { name: "Delaware", code: "DE", x: -100000, y: 256, count: 3 },
    { name: "District of Columbia", code: "DC", x: -100000, y: 270, count: 3 },
    { name: "Florida", code: "FL", x: 754, y: 487, count: 29 },
    { name: "Georgia", code: "GA", x: 701, y: 396, count: 16 },
    { name: "Hawaii", code: "HI", x: 324, y: 560, count: 4 },
    { name: "Idaho", code: "ID", x: 180, y: 135, count: 4 },
    { name: "Illinois", code: "IL", x: 588, y: 246, count: 20 },
    { name: "Indiana", code: "IN", x: 638, y: 241, count: 11 },
    { name: "Iowa", code: "IA", x: 515, y: 206, count: 6 },
    { name: "Kansas", code: "KS", x: 430, y: 283, count: 6 },
    { name: "Kentucky", code: "KY", x: 663, y: 296, count: 8 },
    { name: "Louisiana", code: "LA", x: 538, y: 450, count: 8 },
    { name: "Maine", code: "ME", x: 883, y: 70, count: 4 },
    { name: "Maryland", code: "MD", x: -100000, y: 0, count: 10 },
    { name: "Massachusetts", code: "MA", x: -100000, y: 0, count: 11 },
    { name: "Michigan", code: "MI", x: 658, y: 175, count: 16 },
    { name: "Minnesota", code: "MN", x: 492, y: 116, count: 10 },
    { name: "Mississippi", code: "MS", x: 586, y: 404, count: 6 },
    { name: "Missouri", code: "MO", x: 530, y: 284, count: 10 },
    { name: "Montana", code: "MT", x: 266, y: 80, count: 3 },
    { name: "Nebraska", code: "NE", x: 408, y: 216, count: 5 },
    { name: "Nevada", code: "NV", x: 127, y: 228, count: 6 },
    { name: "New Hampshire", code: "NH", x: -100000, y: 0, count: 4 },
    { name: "New Jersey", code: "NJ", x: -100000, y: 0, count: 14 },
    { name: "New Mexico", code: "NM", x: 294, y: 359, count: 5 },
    { name: "New York", code: "NY", x: 809, y: 145, count: 29 },
    { name: "North Carolina", code: "NC", x: 760, y: 322, count: 15 },
    { name: "North Dakota", code: "ND", x: 409, y: 85, count: 3 },
    { name: "Ohio", code: "OH", x: 690, y: 231, count: 18 },
    { name: "Oklahoma", code: "OK", x: 452, y: 353, count: 7 },
    { name: "Oregon", code: "OR", x: 86, y: 114, count: 7 },
    { name: "Pennsylvania", code: "PA", x: 776, y: 205, count: 20 },
    { name: "Rhode Island", code: "RI", x: -100000, y: 0, count: 4 },
    { name: "South Carolina", code: "SC", x: 745, y: 362, count: 9 },
    { name: "South Dakota", code: "SD", x: 405, y: 152, count: 3 },
    { name: "Tennessee", code: "TN", x: 638, y: 337, count: 11 },
    { name: "Texas", code: "TX", x: 409, y: 434, count: 38 },
    { name: "Utah", code: "UT", x: 216, y: 245, count: 6 },
    { name: "Vermont", code: "VT", x: -100000, y: 0, count: 3 },
    { name: "Virginia", code: "VA", x: 775, y: 276, count: 13 },
    { name: "Washington", code: "WA", x: 113, y: 42, count: 12 },
    { name: "West Virginia", code: "WV", x: 730, y: 265, count: 5 },
    { name: "Wisconsin", code: "WI", x: 569, y: 142, count: 10 },
    { name: "Wyoming", code: "WY", x: 290, y: 171, count: 3 }
]

const Mapp = () => {
    const [pressedKey, setPressedKey] = useState("");
    const [results, setResults] = useState([]);
    const [finalDemocrat, setFinalDemocrat] = useState(0);
    const [finalRepublican, setFinalRepublican] = useState(0);
    const [stateColors, setStateColors] = useState({});

    useEffect(() => {

        window.addEventListener("keydown", (e) => { setPressedKey(e.key) });
        window.addEventListener("keyup", (e) => { setPressedKey("") });

        let res = [];
        electorates.forEach(e => {
            let r = JSON.parse(JSON.stringify(e));
            r.D = 0;
            r.R = 0;
            res.push(r);
        })

        setResults(res);

        return () => {
            // window.removeEventListener('keydown');
            // window.removeEventListener('keyup', upHandler);
        };
    }, []);

    const setStateResult = (stateCode, party) => {
        let stateDetails = electorates.find(e => e.code == stateCode);
        console.log({ stateCode, stateDetails });

        let results1 = results.map(r => r);
        results1.find(r => r.code == stateCode)['D'] = 0;
        results1.find(r => r.code == stateCode)['R'] = 0;
        results1.find(r => r.code == stateCode)[party] = stateDetails.count;
        setResults(results1);

        console.log({ results });

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
        <div style={{ textAlign: "center" }}>
            <h1 style={{
                fontWeight: 200, marginBottom: 0
            }}>United States Presidential Election Results Simulator</h1>
            <ul style={{ fontWeight: 400, color: "#686868", textAlign: "left", width: "auto", display: "inline-block" }}>
                <li>Click while pressing 'D' (or Ctrl) to declare Democratic victory for a state</li>
                <li>Click while pressing 'R' (or Alt) to declare Republican victory for a state</li>
                <li>The electorate split for Maine (ME) and Nebraska (NE) need to be done manually</li>
            </ul>
            <div style={{ position: "relative", width: 900, border: "0px solid", marginLeft: "auto", marginRight: "auto" }}>
                <USAMap
                    defaultFill="#9a9a9a"
                    customize={stateColors}
                    onClick={(e) => {
                        console.log({ e });
                        console.log(Date());
                        navigator.clipboard.writeText(`x: ${e.clientX - 20}, y: ${e.clientY - 30}`);

                        let winner = "";
                        let winnerColor = "";
                        if (pressedKey == "d" || e.ctrlKey) {
                            winner = "D";
                            winnerColor = COLORS.DEMOCRAT;
                        }
                        if (pressedKey == "r" || e.altKey) {
                            winner = "R";
                            winnerColor = COLORS.REPUBLICAN;
                        }

                        if (winner) {
                            let newStateColors = JSON.parse(JSON.stringify(stateColors));
                            newStateColors[e.target.dataset.name] = { fill: winnerColor };
                            setStateColors(newStateColors);
                            setStateResult(e.target.dataset.name, winner);
                        }
                    }}
                ></USAMap>
                {
                    results.map((e, i) => (
                        <div key={e.code} style={{
                            left: e.x, top: e.y,
                            cursor: "default", pointerEvents: "none", position: "absolute", color: "#fff", border: "0px solid", fontSize: 11
                        }} title={e.name}>
                            {e.code}
                        </div>
                    ))
                }
            </div>


            {/* <div className="main-div" style={{ width: "32vw", margin: "0 auto", display: "none" }}>
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
            </div> */}


            <div className="final-result">
                <div className="democrat" style={{ backgroundColor: "#fff", color: COLORS.DEMOCRAT }}>
                    {finalDemocrat}
                </div>
                <div className="republican" style={{ backgroundColor: "#fff", color: COLORS.REPUBLICAN }}>
                    {finalRepublican}
                </div>
            </div>


            {/* <div style={{ border: "3px solid #444", padding: 10, marginTop: 30, position: "relative" }}>
                <App />
            </div> */}

        </div>
    );
}

export default Mapp;
