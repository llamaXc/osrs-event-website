import express from 'express';

import {playerController} from "../controller/Controllers"

const router = express.Router();

router.post('/npc_kill', (req, res) => {
    playerController.saveNpcLoot(req, res)
})

router.get('/', (req,res) => {
    playerController.getNpcKillsTest(req, res);
})

// router.post('/inventory_items',(req, res) => {
//     playerController.updateInventoryItems(req, res);
// })

// router.post('/equipped_items', async (req,res) => {
//     playerController.updateEquippedItems(req, res);
// })

// router.post('/level_change', async (req,res) => {
//     playerController.updateLevels(req, res);
// })

// router.post('/quest_change', async (req,res) => {
//     playerController.updateQuests(req, res);
// })

// router.post('/bank', async (req, res) => {
//     playerController.updateBank(req, res);
// })

// router.get('/player/:id', async(req, res) => {
//     playerController.getPlayerById(req, res);
// })

// router.get('/inventory_items', async (req,res) => {
//     playerController.getInventoryTest(req, res)
// })

// router.get('/npc_kill', async (req,res) => {
//     playerController.getNpcKillsTest(req, res)
// })

// router.get('/equipped_items', async (req,res) => {
//     playerController.getEquippedItemsTest(req, res)
// })

// router.get('/level_change', async (req,res)=>{
//     playerController.getLevelsTest(req, res)
// })


export default router;
