import { CircularProgress, Grid, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { usePlayerStore } from "../store/player";

export function Equipment() {

    const [isLoading, setLoading] = useState(true);
    const [equipment, setEquipment] = useState([]);
    const player = usePlayerStore(state => state.player);

    function buildEquipment(equipmentFromApi){
        setEquipment([])
        for(let i = 0; i < EQUIPMENT_ORDER.length; i++){
            let name = EQUIPMENT_ORDER[i]
            if(name !== "empty"){
                let slot = equipmentFromApi[name]
                if(slot){
                    let osrsItem = slot.item
                    let base64Image =  "data:image/png;base64, " +  osrsItem.icon
                    let itemToAdd = {id: i, name: osrsItem.name, image: base64Image, valid: true}
                    setEquipment(old => [...old, itemToAdd])
                }else{
                    console.log("No item fround for: " + name)
                    let itemToAdd = {id: i, name: name, valid: true}
                    setEquipment(old => [...old, itemToAdd])
                }
                // console.log(item)
            }else{
                let itemToAdd = {id: i, valid: false}
                setEquipment(old => [...old, itemToAdd])
            }
        }
        console.log(equipment)
    }

    useEffect( () => {
        setLoading(false)
        if(player && player.equipment && player.equipment.slots){
            let equipment = player.equipment.slots
            console.log(JSON.stringify(equipment, null, 2))

            var equipmentMap = equipment.reduce(function(map, equipmentSlot) {
                map[equipmentSlot.slotName.toLowerCase()] = equipmentSlot;
                return map;
            }, {});
            buildEquipment(equipmentMap)
            setLoading(false)
        }
    },[player])


    const EQUIPMENT_ORDER = [
        "empty",
        "head",
        "empty",
        "cape",
        "amulet",
        "ammo",
        "weapon",
        "body",
        "shield",
        "empty",
        "legs",
        "empty",
        "gloves",
        "boots",
        "ring"
    ]

    console.log("====")
    console.log(equipment.length)
    return (
        <div className="invo-container">
            { isLoading && <CircularProgress className="loader" />}
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                {equipment.map((slot) => {
                        if(slot.valid){
                            console.log(slot)
                            return <Grid className="equipment-slot" item key={slot.id} xs={4}>
                            <Tooltip title={slot.name}>
                                <div>
                                    {!slot.image && <p>{slot.name}</p>}
                                    {slot.image && <img className="equipment-image" src={slot.image}/>}
                                </div>
                                </Tooltip>
                            </Grid>
                        }else{
                            return <Grid  item key={slot.id} xs={4}>
                                <p>&#8205;</p>
                            </Grid>
                        }
                    })}
            </Grid>
        </div>
    )
}
