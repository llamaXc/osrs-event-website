import {expect} from 'chai';
import { createLanguageServiceSourceFile } from 'typescript';
import { Bank } from '../entity/Bank';
import { BankSlot } from '../entity/BankSlot';
import { Equipment } from '../entity/Equipment';
import { EquipmentSlot } from '../entity/EquipmentSlot';
import { Item } from '../entity/Item';
import { Level } from '../entity/Level';
import { Player } from '../entity/Player';
import { playerService } from '../service/Services';

describe('Bank Test', () => {

    it('should create bank slots', async () => {

        const bankPlayer = await playerService.registerNewPlayer("BankTestPlayer");

        const lawRune = {
            icon: "FFFF",
            name: "Law Rune",
            id: 3453
        } as Item;
        const savedLawRune = await Item.save(lawRune);

        const firstSlot = new BankSlot();
        firstSlot.item = lawRune;
        firstSlot.slotIndex = 1;
        firstSlot.quantity = 200000;

        const bank = new Bank();
        bank.slots = [firstSlot];

        bankPlayer.bank = bank
        const savedBankPlayer = await Player.save(bankPlayer);
        console.log("BANK: " + JSON.stringify(bank));
        expect(savedBankPlayer.bank.slots[0].item.id).to.equal(3453)

    });

});