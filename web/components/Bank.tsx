import { CircularProgress, Grid, TextField, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { usePlayerStore } from "../store/player";

export function Bank() {

    const player = usePlayerStore(state => state.player);
    const bank = usePlayerStore(state => state.player.bank);

    const updateBank = usePlayerStore(state => state.updateBank)
    const [items, setItems] = useState([])
    const [filter, setFilter] = useState("")

    //Take API Slots and Turn into Inventory for compomenet
    function buildBank (bank){
        let currentSlotIndex = 0
        const slots = bank.slots
        console.log(bank)
        setItems([]);
        for(const slot of slots){
            let slotItem = slot.item
            const base64Image = "data:image/png;base64, " + slotItem.icon;
            let item = {quantity: slot.quantity, name: slotItem.name, img: base64Image, valid: true }
            setItems(oldItems => [...oldItems, item])
        }
    }

    useEffect(() => {
        updateBank();
    }, [])

    useEffect(() => {
        if(bank && bank.slots){
            buildBank(bank);
        }
    }, [bank])



    function updateSearch(e){
        console.log(e.target.value)
        setFilter(e.target.value)
    }

    return (<div className="bankContainer">
            <TextField  onChange={(e) => updateSearch(e)} id="bankSearch" label="Search Item" variant="standard" />

            <Grid marginTop={"10px"} container rowSpacing={1} columnSpacing={{ xs: 2, sm: 1, md: 1 }}>
            {items.filter(q => filter === '' || q.name.toLowerCase().includes(filter.toLowerCase())).map((item) => {
                return <Grid className="item-temp" item xs={2} sm={1} md={1}>
                    <Tooltip title={item.name}>
                        <div className="item-slot">
                            {item.quantity > 1 && <p className="item-quantity">{item.quantity}</p> }
                            <img className="item-image" src={item.img}/>
                        </div>
                    </Tooltip>
                </Grid>
            })}
        </Grid>
    </div>
    )
}
