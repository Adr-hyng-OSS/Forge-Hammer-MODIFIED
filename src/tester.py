import json
breakableStones = [
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
    "minecraft:concrete"
]

obj = {
    "block": None,
    "speed": 9,
    "on_dig": {
        "event": "nothing"
    }
}

objs = [];

for block in breakableStones:
    obj["block"] = f'{block}'
    print(json.dumps(obj, indent = 2), end = ",\n")
    # objs.append(obj)
    
