import { CircularProgress, Grid, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { usePlayerStore } from "../store/player";
import { Box } from "@mui/material";
export function Quests() {

    const player = usePlayerStore(state => state.player);
    const [qp, setQp] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [quests, setQuests] = useState([])
    const [filter, setFilter] = useState("")

    useEffect( () => {
        if(player){
            console.log("Buildilng quests")
            setQuests(player.quests)
            setQp(player.questPoints);
            console.log(JSON.stringify(player.quests, null, 2));
            setLoading(false)
        }

    },[player])

    const updateInput = (e) => {
        console.log(e.target.value);
        setFilter(e.target.value)
    }

    return (
        <div className="quest-container">
            { isLoading && <CircularProgress className="loader" />}
            <Box display="flex" flexDirection="row">
            <input onChange={(e) => updateInput(e)} className="quest-search" placeholder="Search quest"/>
            <p className="quest-points">QP: {qp}</p>
            </Box>

            <Grid className="quest-grid" container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                {quests.filter(q => filter === '' || q.name.toLowerCase().includes(filter.toLowerCase())).map((quest) => {
                    let className = "quest-row "

                    if(quest.state == "FINISHED"){
                        className += 'finished'
                    }else if(quest.state == 'IN_PROGRESS'){
                        className += 'in-progress'
                    }else{
                        className += 'not-started'
                    }
                    console.log(className);

                    return <Grid className={className} item key={quest.id} xs={8}>
                        {quest.name}
                    </Grid>
                })}

            </Grid>
        </div>
    )
}
