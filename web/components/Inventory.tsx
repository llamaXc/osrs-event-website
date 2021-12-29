import { CircularProgress, Grid, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Inventory } from "../interfaces";
import { usePlayerStore } from "../store/player";

export function Inventory() {

    const player = usePlayerStore(state => state.player);

    const [items, setItems] = useState([])
    const [isLoading, setLoading] = useState(true);


    //Take API Slots and Turn into Inventory for compomenet
    function buildInventoryWithSlots (apiSlots){
        let currentSlotIndex = 0

        setItems([]);
         for(let i = 0; i < 28; i++){
            let slot = apiSlots[currentSlotIndex]
            console.log(JSON.stringify(slot, null, 2))

            if(slot && slot.slotIndex === i){
                console.log("Adding item: "+ slot.item.name)
                const name = slot.item.name;
                const slotItem = slot.item;
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
        if(player && player.inventory){
            console.log("BUILD INVENTORY PLEASE!")
            console.log(JSON.stringify(player.inventory));
            buildInventoryWithSlots(player.inventory.slots);
            setLoading(false);
        }
    },[player])


    return (
        <div className="invo-container">
            { isLoading && <CircularProgress />}
            { !isLoading &&
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                {items.map((item) => {
                    if(item.name){
                    console.log("Item being rendered: " + item.name)
                    }else{
                        console.log("no item name being rendered")
                    }
                    return <Grid className="item-temp" item xs={3}>
                        {item.valid &&
                            <Tooltip title={item.name}>
                                <div className="item-slot">
                                    {item.quantity > 1 && <p className="item-quantity">{item.quantity}</p> }
                                    <img className="item-image" src={item.img}/>
                                </div>
                            </Tooltip>
                        }
                    </Grid>
                })}
            </Grid>
            }
        </div>
    )
}
