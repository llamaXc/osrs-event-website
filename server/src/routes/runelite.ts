import express, { Router } from 'express';
const router : Router = express.Router();

import {playerController} from "../controller"

const controller = playerController;

router.post('/npc_kill', controller.updateSupplementInformation.bind(controller), controller.saveNpcLoot.bind(controller))
router.post('/inventory_items',controller.updateSupplementInformation.bind(controller),  controller.updateInventoryItems.bind(controller))
router.post('/equipped_items', controller.updateSupplementInformation.bind(controller), controller.updateEquippedItems.bind(controller))
router.post('/level_change', controller.updateSupplementInformation.bind(controller), controller.updateLevels.bind(controller))
router.post('/quest_change', controller.updateSupplementInformation.bind(controller), controller.updateQuests.bind(controller))
router.post('/bank', controller.updateSupplementInformation.bind(controller), controller.updateBank.bind(controller))

router.get('/', controller.getAllTest.bind(controller))
router.get('/players', controller.getPlayers.bind(controller))
router.get("/player/:id", controller.getPlayerDetails.bind(controller))

export = router;