import { CircularProgress, Grid, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { usePlayerStore } from "../store/player";

export function Level() {

    const player = usePlayerStore(state => state.player);

    const [levels, setLevels] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

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
            let levelToAdd = {name: levelName, level: levelFromApi, id: i, icon: "levels/" + levelName + ".png"}
            setLevels(old => [...old, levelToAdd])
        }
    }

    useEffect( () => {
        if(player){
            console.log("Building levels!")
            const levels = player.levels;
            setTotal(player.totalLevel)
            console.log(JSON.stringify(levels, null, 2))
            var mapLevels = levels.reduce(function(map, level) {
                map[level.name.toLowerCase()] = level.level;
                return map;
            }, {});

            buildLevels(mapLevels)
            setLoading(false)
        }

    },[player])


    return (
        // <div className="invo-wrapper">
            <div className="invo-container">
                { isLoading && <CircularProgress className="loader" />}
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    {levels.map((level) => {
                        return <Grid  item key={level.id} xs={4}>
                            <div className="level-slot">
                                <img className="level-image" src={level.icon}/>
                                <p>{level.level}</p>
                            </div>
                        </Grid>
                    })}
                    {!isLoading && 
                        <Grid item xs={4}>
                            <div className="level-slot">
                                <div className="total-level">
                                    <p>{total}</p>
                                </div>
                            </div>
                        </Grid>
                    }
                </Grid>
            </div>
        // </div>
    )
}
