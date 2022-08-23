import { ItemStack, Items } from "mojang-minecraft";
function damageItem(item, damage) {
    if (item.getComponent("durability").maxDurability > item.getComponent("durability").damage) {
        let newItem = new ItemStack(Items.get(item.id), item.amount, item.data);
        newItem.nameTag = item.nameTag;
        newItem.getComponents = item.getComponents;
        newItem.setLore(item.getLore());
        newItem.getComponent('enchantments').enchantments = item.getComponent('enchantments').enchantments;
        newItem.getComponent("durability").damage = item.getComponent("durability").damage + damage;
        return newItem;
    }
}
function replaceItem(player, item, damage, validItems) {
    if (validItems.includes(item.id)) {
        let durability = item.getComponent("durability");
        if (durability.damage > durability.maxDurability) {
            player.runCommandAsync(`replaceitem entity ${player.name} slot.weapon.mainhand 0 air 1`);
        }
        player.getComponent("inventory").container.setItem(player.selectedSlot, damageItem(item, damage));
    }
}
export { replaceItem };
