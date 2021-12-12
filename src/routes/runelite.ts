import express from 'express';

import {playerController} from "../controller/Controllers"

const router = express.Router();

router.post('/npc_kill', (req, res) => {
    playerController.saveNpcLoot(req, res)
})

router.get('/', (req,res) => {
    playerController.getAllTest(req, res);
})

router.post('/inventory_items',(req, res) => {
    playerController.updateInventoryItems(req, res);
})

router.post('/equipped_items', async (req,res) => {
    playerController.updateEquippedItems(req, res);
})

router.post('/level_change', async (req,res) => {
    playerController.updateLevels(req, res);
})

router.post('/quest_change', async (req,res) => {
    playerController.updateQuests(req, res);
})

router.post('/bank', async (req, res) => {
    console.log("TIME TO UPDATE BANK!")
    playerController.updateBank(req, res);
})




export default router;
