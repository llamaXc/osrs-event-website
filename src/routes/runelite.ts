import express, { Router } from 'express';
const router : Router = express.Router();

import {playerController} from "../controller"

const controller = playerController;

router.get('/', controller.test.bind(controller))

router.post('/npc_kill',  controller.saveNpcLoot.bind(controller))

router.post('/inventory_items', controller.updateInventoryItems.bind(controller))

router.post('/equipped_items', controller.updateEquippedItems.bind(controller))

router.post('/level_change', controller.updateLevels.bind(controller))

router.post('/quest_change', controller.updateQuests.bind(controller))

router.post('/bank', controller.updateBank.bind(controller))

export = router;