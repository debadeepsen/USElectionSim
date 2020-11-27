import React, { useState, useEffect } from 'react';
import USAMap from "react-usa-map";

const COLORS = {
    REPUBLICAN: "#D81C28",
    DEMOCRAT: "#019bd8"
}

const electorates = [
    { name: "Alabama", abbr: "AL", x: 642, y: 405, count: 9 },
    { name: "Alaska", abbr: "AK", x: 106, y: 488, count: 3 },
    { name: "Arizona", abbr: "AZ", x: 187, y: 360, count: 11 },
    { name: "Arkansas", abbr: "AR", x: 534, y: 368, count: 6 },
    { name: "California", abbr: "CA", x: 67, y: 273, count: 55 },
    { name: "Colorado", abbr: "CO", x: 305, y: 266, count: 9 },
    { name: "Connecticut", abbr: "CT", x: 930, y: 183, count: 7 },
    { name: "Delaware", abbr: "DE", x: 930, y: 256, count: 3 },
    { name: "District of Columbia", abbr: "DC", x: 930, y: 270, count: 3 },
    { name: "Florida", abbr: "FL", x: 754, y: 487, count: 29 },
    { name: "Georgia", abbr: "GA", x: 701, y: 396, count: 16 },
    { name: "Hawaii", abbr: "HI", x: 324, y: 560, count: 4 },
    { name: "Idaho", abbr: "ID", x: 180, y: 135, count: 4 },
    { name: "Illinois", abbr: "IL", x: 588, y: 246, count: 20 },
    { name: "Indiana", abbr: "IN", x: 638, y: 241, count: 11 },
    { name: "Iowa", abbr: "IA", x: 515, y: 206, count: 6 },
    { name: "Kansas", abbr: "KS", x: 430, y: 283, count: 6 },
    { name: "Kentucky", abbr: "KY", x: 663, y: 296, count: 8 },
    { name: "Louisiana", abbr: "LA", x: 538, y: 450, count: 8 },
    { name: "Maine", abbr: "ME", x: 883, y: 70, count: 4 },
    { name: "Maryland", abbr: "MD", x: 0, y: 0, count: 10 },
    { name: "Massachusetts", abbr: "MA", x: 0, y: 0, count: 11 },
    { name: "Michigan", abbr: "MI", x: 658, y: 175, count: 16 },
    { name: "Minnesota", abbr: "MN", x: 492, y: 116, count: 10 },
    { name: "Mississippi", abbr: "MS", x: 586, y: 404, count: 6 },
    { name: "Missouri", abbr: "MO", x: 530, y: 284, count: 10 },
    { name: "Montana", abbr: "MT", x: 266, y: 80, count: 3 },
    { name: "Nebraska", abbr: "NE", x: 408, y: 211, count: 5 },
    { name: "Nevada", abbr: "NV", x: 127, y: 228, count: 6 },
    { name: "New Hampshire", abbr: "NH", x: 0, y: 0, count: 4 },
    { name: "New Jersey", abbr: "NJ", x: 0, y: 0, count: 14 },
    { name: "New Mexico", abbr: "NM", x: 294, y: 359, count: 5 },
    { name: "New York", abbr: "NY", x: 809, y: 145, count: 29 },
    { name: "North Carolina", abbr: "NC", x: 760, y: 322, count: 15 },
    { name: "North Dakota", abbr: "ND", x: 409, y: 85, count: 3 },
    { name: "Ohio", abbr: "OH", x: 690, y: 231, count: 18 },
    { name: "Oklahoma", abbr: "OK", x: 452, y: 351, count: 7 },
    { name: "Oregon", abbr: "OR", x: 86, y: 114, count: 7 },
    { name: "Pennsylvania", abbr: "PA", x: 776, y: 205, count: 20 },
    { name: "Rhode Island", abbr: "RI", x: 0, y: 0, count: 4 },
    { name: "South Carolina", abbr: "SC", x: 745, y: 362, count: 9 },
    { name: "South Dakota", abbr: "SD", x: 405, y: 152, count: 3 },
    { name: "Tennessee", abbr: "TN", x: 638, y: 337, count: 11 },
    { name: "Texas", abbr: "TX", x: 409, y: 434, count: 38 },
    { name: "Utah", abbr: "UT", x: 216, y: 245, count: 6 },
    { name: "Vermont", abbr: "VT", x: 0, y: 0, count: 3 },
    { name: "Virginia", abbr: "VA", x: 775, y: 276, count: 13 },
    { name: "Washington", abbr: "WA", x: 113, y: 42, count: 12 },
    { name: "West Virginia", abbr: "WV", x: 730, y: 265, count: 5 },
    { name: "Wisconsin", abbr: "WI", x: 569, y: 142, count: 10 },
    { name: "Wyoming", abbr: "WY", x: 290, y: 171, count: 3 }
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
        <div style={{ textAlign: "center" }}>
            <h1 style={{
                fontWeight: 200
            }}>United States Presidential Election Results Simulator</h1>
            <h3 style={{ fontWeight: 200, color: "#555" }}>Click the states while pressing 'D' (or Ctrl), or 'R' (or Alt) to set Democratic or Republican victories for each state, and the result will update itself.</h3>
            <div style={{ position: "relative", width: 600 }}>
                <USAMap
                    defaultFill="#9a9a9a"
                    customize={stateColors}
                    onClick={(e) => {
                        console.log({ e });
                        console.log(Date());
                        navigator.clipboard.writeText(`x: ${e.clientX - 20}, y: ${e.clientY - 30}`);

                        let winnerColor = "";
                        if (pressedKey == "d" || e.ctrlKey) winnerColor = COLORS.DEMOCRAT;
                        if (pressedKey == "r" || e.altKey) winnerColor = COLORS.REPUBLICAN;

                        if (winnerColor) {
                            let newStateColors = JSON.parse(JSON.stringify(stateColors));
                            newStateColors[e.target.dataset.name] = { fill: winnerColor };
                            setStateColors(newStateColors);
                        }
                    }}
                ></USAMap>
                {
                    results.map((e, i) => (
                        <div style={{
                            left: e.x, top: e.y,
                            cursor: "default", pointerEvents: "none", position: "absolute", color: "#fff", border: "0px solid", fontSize: 11
                        }} title={e.name}>
                            {e.abbr}
                        </div>
                    ))
                }
            </div>
            <div className="main-div" style={{ width: "32vw", margin: "0 auto", display: "none" }}>
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
                <div className="democrat" style={{backgroundColor:"#fff", color: COLORS.DEMOCRAT}}>
                    {finalDemocrat}
                </div>
                <div className="republican" style={{backgroundColor:"#fff", color: COLORS.REPUBLICAN}}>
                    {finalRepublican}
                </div>
            </div>
        </div>
    );
}

export default Mapp;
