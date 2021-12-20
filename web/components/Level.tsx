import { CircularProgress, Grid, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";

export function Level() {

    const [levels, setLevels] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    async function loadPlayer () {
        const URL = "http://localhost:6501/api-unauth"
        console.log("Getting fetch: " + URL)
        let response = await fetch(URL)
        return await response.json()
    }

    const LEVEL_NAME_TO_POSITION = [
        "attack",
        "hitpoints",
        "mining",
        "strength",
        "agility",
        "smithing",
        "defence",
        "herblore",
        "fishing",
        "ranged",
        "thieving",
        "cooking",
        "prayer",
        "crafting",
        "firemaking",
        "magic",
        "fletching",
        "woodcutting",
        "runecraft",
        "slayer",
        "farming",
        "construction",
        "hunter",
    ]

    function buildLevels(levels){
        console.log(JSON.stringify(levels, null, 2));
        let keys = Object.keys(levels);
        setLevels([])
        for(let i = 0; i < LEVEL_NAME_TO_POSITION.length; i++){
            const levelName = LEVEL_NAME_TO_POSITION[i];
            const levelFromApi = levels[levelName];
            let levelToAdd = {name: levelName, level: levelFromApi, id: i, icon: "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAQMAAAD+JxcgAAAABlBMVEUAAAEAAAFq3O48AAAAAXRSTlMAQObYZgAAAFBJREFUeAEFwTEOQDAAAMBrOnSR+oJndOijbBZEYvUgI/+wiE/YuAMUKFAAwof4baTpIo8vqfbEvSPsUKBChRkGeBbCfRDPg7QutAk5o2kAP9iiD+JkO/gAAAAAAElFTkSuQmCC"}
            setLevels(old => [...old, levelToAdd])
        }
        // for(let i = 0; i < 23; i++){
        //     let index = LEVEL_NAME_TO_POSITION.get(
        //     let name = levels
        //     let levelToAdd = {name: level.name, level: level.level, id: i, icon: "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAQMAAAD+JxcgAAAABlBMVEUAAAEAAAFq3O48AAAAAXRSTlMAQObYZgAAAFBJREFUeAEFwTEOQDAAAMBrOnSR+oJndOijbBZEYvUgI/+wiE/YuAMUKFAAwof4baTpIo8vqfbEvSPsUKBChRkGeBbCfRDPg7QutAk5o2kAP9iiD+JkO/gAAAAAAElFTkSuQmCC"}
        //     setLevels(old => [...old, levelToAdd])
        // }
    }

    useEffect( () => {
        setLoading(false)
        loadPlayer().then(res => {
            console.log(JSON.stringify(res, null, 2))
            let levels = res.player.levels
            let total = res.player.totalLevel
            setTotal(total)

            var mapLevels = levels.reduce(function(map, level) {
                map[level.name.toLowerCase()] = level.level;
                return map;
            }, {});
            console.log(mapLevels);

            buildLevels(mapLevels)
            setLoading(false)
        });
    },[])


    return (
        <div className="invo-wrapper">
            <div className="invo-container">
                { isLoading && <CircularProgress className="loader" />}
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    {levels.map((level) => {
                        return <Grid  item key={level.id} xs={4}>
                            <div className="level-slot">
                                <img className="level-image" src={level.icon}/>
                                <p>{level.level}/99</p>
                            </div>
                        </Grid>
                    })}
                    <Grid item xs={4}>
                        <div className="level-slot">
                            <div className="total-level">
                                <p>{total}</p>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
