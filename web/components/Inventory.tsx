import { CircularProgress, Grid, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";

export function Inventory() {

    const [items, setItems] = useState([])
    const [isLoading, setLoading] = useState(true);

    async function loadPlayerInventory () {
        const URL = "http://localhost:6501/api-unauth"
        console.log("Getting fetch: " + URL)
        let response = await fetch(URL)
        return await response.json()
    }

    //Take API Slots and Turn into Inventory for compomenet
    function buildInventoryWithSlots (apiSlots){
        let currentSlotIndex = 0
        setItems([]);
         for(let i = 0; i < 28; i++){
            let slot = apiSlots[currentSlotIndex];
            if(slot && slot.slotIndex == i){
                const name = slot.name;
                const slotItem = slot.item;
                console.log(JSON.stringify(slot, null, 2))
                const base64Image = "data:image/png;base64, " + slotItem.icon;
                let item = {index: i, quantity: slot.quantity, name: slotItem.name, img: base64Image, valid: true }
                setItems(oldItems => [...oldItems, item])
                currentSlotIndex++;
            }else{
                let item = {index: i, valid: false }
                setItems(oldItems => [...oldItems, item])
            }
        }
    }

    useEffect( () => {
        loadPlayerInventory().then(res => {
            let slots = res.player.inventory.slots
            buildInventoryWithSlots(slots)
            setLoading(false)
        });
    },[])


    return (
        <div className="invo-wrapper">
            <div className="invo-container">
                { isLoading && <CircularProgress />}
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    {items.map((item) => {
                        return <Grid item xs={3}>
                            <div className="item-temp">
                                {item.valid &&
                                    <Tooltip title={item.name}>
                                        <div className="item-slot">
                                            {item.quantity > 1 && <p className="item-quantity">{item.quantity}</p> }
                                            <img className="item-image" src={item.img}/>
                                        </div>
                                    </Tooltip>
                                }
                            </div></Grid>
                    })}
                </Grid>
            </div>
        </div>
    )
}
