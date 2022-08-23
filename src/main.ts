import {world, EntityInventoryComponent, Player, BlockLocation, Block, ItemStack, MinecraftEnchantmentTypes, EnchantmentList} from "mojang-minecraft";
import {replaceItem} from "./items";
import {setTimeout} from "./timers";


const hammers: Array<string> = ["ihg:wooden_hammer", "ihg:stone_hammer", "ihg:gold_hammer", "ihg:iron_hammer", "ihg:diamond_hammer", "ihg:netherite_hammer"];
const breakableStones: Array<string> = [
    "minecraft:deepslate", 
    "minecraft:tuff",
    "minecraft:amethyst_block",
    "minecraft:calcite",
    "minecraft:smooth_basalt",
    "minecraft:budding_amethyst",
    "minecraft:cobbled_deepslate",
    "minecraft:prismarine",
    "minecraft:basalt",
    "minecraft:smooth_basalt",
    "minecraft:magma",
    "minecraft:slime",
    "minecraft:honey_block",
    "minecraft:netherrack",
    "minecraft:blackstone",
    "minecraft:red_sandstone",
    "minecraft:red_nether_brick",
    "minecraft:cracked_polished_blackstone_bricks",
    "minecraft:nether_brick",
    "minecraft:polished_blackstone",
    "minecraft:gilded_blackstone",
    "minecraft:end_stone",
    "minecraft:concrete",
    "minecraft:sculk"
];

world.events.tick.subscribe( t => {
    for (const player of world.getPlayers()) {
        let inventory = (player.getComponent("inventory") as EntityInventoryComponent).container;
        for(let slot = 0; slot < inventory.size; slot++){
            if(hammers.includes(inventory.getItem(slot).id)){
            let found_axe = inventory.getItem(slot);
            if(found_axe.getComponent("durability").damage >= found_axe.getComponent("durability").maxDurability){
                player.runCommand(`clear ${player.name} ${inventory.getItem(slot).id} ${found_axe.getComponent("durability").damage} 1`);
            }
            }
        }
    }
});

let itemDamage: number = 4.0;

world.events.blockBreak.subscribe( data => {
    let player: Player = data.player;
    let held_item = (data.player.getComponent("inventory") as EntityInventoryComponent).container.getItem(data.player.selectedSlot);
    if(hammers.includes(held_item.id) && (data.brokenBlockPermutation.hasTag("stone") || breakableStones.includes(data.brokenBlockPermutation.type.id))){
        excavateStones(player, held_item, data.block.location);
    }
});

function enchantmentEffect(held_item: ItemStack): number{
    let enchantments = held_item.getComponent("enchantments").enchantments as EnchantmentList;
    let level = enchantments.hasEnchantment(MinecraftEnchantmentTypes.unbreaking);
    let unbreakingEffect = (100 / (level + 1)) / 100;
    return itemDamage * unbreakingEffect;
}

function excavateStones(player: Player, held_item: ItemStack, blockLocation: BlockLocation): void{
    let worldClient = world.getDimension(player.dimension.id);
    for (let y = -1; y < 2; y++) {
        for (let x = -1; x < 2; x++) {
            for (let z = -1; z < 2; z++) {
                let newBlock: Block = worldClient.getBlock(blockLocation.offset(x, y, z));
                if(newBlock.hasTag("stone") || breakableStones.includes(newBlock.id)){
                    worldClient.runCommand(`setblock ${newBlock.x} ${newBlock.y} ${newBlock.z} air 0 destroy`);
                }
            }
        }
    }
    let damage = enchantmentEffect(held_item);
    setTimeout(replaceItem, 1, player, held_item, damage, hammers);
}

function print(x: any): void{
    world.getDimension("overworld").runCommand(`say ${x}`);
}