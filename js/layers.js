addLayer("p", {
    name: "声望", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "p", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#00FF00",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "声望", // Name of prestige currency
    baseResource: "点数", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal:膨胀资源层 static: 非膨胀资源层 使用时要加双引号
    exponent: 1, // Prestige currency exponent 初始值0.5
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade('p',12)) mult=mult.mul(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        11:{ title: "",
         description: "点数获取x2",
         cost:new Decimal(10),
        }, 
        12:{ title: "",
         description: "声望点获取x2",
         cost:new Decimal(25),
         unlocked() {return hasUpgrade('p',11)},
        }, 
        13:{ title: "",
         description: "解锁一个可购买",
         cost:new Decimal(80),
         unlocked() {return hasUpgrade('p',12)},
        }, 
        21:{ title: "点数增长",
         description: "每购买一次使点数x3,上限4次",
         cost:new Decimal(0),
         unlocked() {return hasUpgrade('p',13)},
        }, 
        22:{ title: "点数增长1",
         description: "",
         cost:new Decimal(30),
         unlocked() {return hasUpgrade('p',21)},
        }, 
        23:{ title: "点数增长2",
         description: "",
         cost:new Decimal(100),
         unlocked() {return hasUpgrade('p',22)},
        }, 
        31:{ title: "好像有点太无聊了，解锁一个挑战",
         description: "",
         cost:new Decimal(150),
         unlocked() {return hasUpgrade('p',23)},
        }, 
        32:{ title: "点数削弱",
         description: "点数x0.1，完成后解锁指数加成，进入时重置升级，声望点，点数",
         cost:new Decimal(300),
         unlocked() {return hasUpgrade('p',31)},
        }, 
        33:{ title: "进入挑战（第2次别点）",
         description: "",
         cost:new Decimal(0),
         unlocked() {return hasUpgrade('p',32)},
        }, 
        41:{ title: "点数增长3",
        description: "",
        cost:new Decimal(6),
        unlocked() {return hasUpgrade('a',11)},
       },  
       42:{ title: "点数增长4",
       description: "",
       cost:new Decimal(20),
       unlocked() {return hasUpgrade('p',41)},
      },  
      43:{ title: "完成挑战",
      description: "",
      cost:new Decimal(1000),
      unlocked() {return hasUpgrade('p',42)},
     },  
     44:{ title: "恭",
     description: "",
     cost:new Decimal(0),
     unlocked() {return hasUpgrade('m',13)},
    },   
    47:{ title: "关（解锁致谢名单）",
    description: "",
    cost:new Decimal(0),
    unlocked() {return hasUpgrade('a',46)},
   },  
   48:{ title: "致谢名单",
   description: "感谢qwqe198提供的灵感，感谢不咕不咕的代码支持，感谢喵喵的css设计，感谢22222的策划，感谢 群友都是神仙喵 一只鸽子（咕咕咕）的不懈测试，最后诚挚地感谢您为这个游戏花费那么多的时间，谢谢",
   cost:new Decimal(0),
   unlocked() {return hasUpgrade('a',46)},
  },                                                                                                                           
       },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "p: 进行声望重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
addLayer("a", {
    name: "挑战1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "a", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
     unlocked() { return hasUpgrade('p',33)},
		points: new Decimal(0),
    }},
    color: "#1f1e33",
    requires: new Decimal(80), // Can be a function that takes requirement increases into account
    resource: "进入挑战1（重置1次即可）", // Name of prestige currency
    baseResource: "点数", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal:膨胀资源层 static: 非膨胀资源层 使用时要加双引号
    exponent: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999, // Prestige currency exponent 初始值0.5
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        11:{ title: "进入挑战（真）",
         description: "",
         cost:new Decimal(1),
        }, 
        46:{ title: "通",
        description: "",
        cost:new Decimal(0),
        unlocked() {return hasUpgrade('m',45)},
       },                              
    }, 
    milestones: {
        1: {
            requirementDescription: "这是个很有用的里程碑",
            effectDescription: "",
            done() { return  hasUpgrade('p',33) },
            unlocked() {return true},
           },       
         },   
    row: 2, // Row the layer is in on the tree (0 is the first row)
    
    layerShown(){return  hasMilestone("a",1)}
})
addLayer("m", {
    name: "指数加成", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "m", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#fbc618",
    requires: new Decimal(10000), // Can be a function that takes requirement increases into account
    resource: "指数加成", // Name of prestige currency
    baseResource: "点数", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal:膨胀资源层 static: 非膨胀资源层 使用时要加双引号
    exponent: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999, // Prestige currency exponent 初始值0.5
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        11:{ title: "指数加成",
         description: "点数获取^2，这个在乘数之前生效，然后点数再x3",
         cost:new Decimal(1),
        },  
        12:{ title: "指数加成",
        description: "点数获取^1.3，这个乘数在指数之前生效",
        cost:new Decimal(1),
        unlocked() {return hasUpgrade('m',11)},       
       },   
       13:{ title: "",
       description: "解锁一系列新升级（后面还有内容）",
       cost:new Decimal(2),
       unlocked() {return hasUpgrade('m',12)},       
      },   
      45:{ title: "喜",
      description: "",
      cost:new Decimal(0),
      unlocked() {return hasUpgrade('p',44)},
     },                                                                  
    },  
    milestones: {
        1: {
            requirementDescription: "这是个很有用的里程碑",
            effectDescription: "",
            done() { return hasUpgrade('p',43) },
            unlocked() {return true},
           },       
         },       
    row: 1, // Row the layer is in on the tree (0 is the first row)
    
    layerShown(){return  hasMilestone("m",1)}
})
