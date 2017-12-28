/* eslint-disable */
const config = {
  "employeeId":"1345",
  "employeeName":"王蕾",
  "employeeMail":"806935949@qq.com",
  "isAdmin": true,
  "deptMap": {
    "distribution": 1,
    "process": 2,
    "procurement": 3,
    "production": 4
  },
  "menus": [
    {
      "code": "menu.distribution",
      "name": "经销管理",
      "children": [
        {
          "code": "menu.distribution.production",
          "name": "产品",
          "children": [],
        }, {
          "code": "menu.distribution.productionSend",
          "name": "生产科下发",
          "children": [],
        }, {
          "code": "menu.distribution.processSend",
          "name": "工艺科下发",
          "children": []
        }, {
          "code": "menu.distribution.procurementSend",
          "name": "采购科下发",
          "children": []
        }, {
          "code": "menu.distribution.bidDocument",
          "name": "招标文件审核",
          "children": []
        }
      ],
    },
    {
      "code": "menu.process",
      "name": "工艺管理",
      "children": [
        {
          "code": "menu.process.processimport",
          "name": "工艺库导入",
          "children": [],
        }, {
          "code": "menu.process.process",
          "name": "工艺库",
          "children": [],
        }, {
          "code": "menu.process.weldingseam",
          "name": "焊缝明细",
          "children": [],
        }, {
          "code": "menu.process.broughtinitems",
          "name": "外购件明细",
          "children": []
        }, {
          "code": "menu.process.firstfeedingitems",
          "name": "先投件明细",
          "children": []
        }, {
          "code": "menu.process.cooperantitems",
          "name": "工序性协作件明细",
          "children": []
        }, {
          "code": "menu.process.principalquota",
          "name": "主材定额",
          "children": []
        }, {
          "code": "menu.process.auxiliaryquota",
          "name": "辅材定额",
          "children": []
        }, {
          "code": "menu.process.weldingquota",
          "name": "焊材定额",
          "children": []
        }
      ],
    },
    {
      "code": "menu.purchase",
      "name": "采购管理",
      "children": [
        {
          "code": "menu.purchase.pendingorder",
          "name": "待处理工作令",
          "children": [],
        }, {
          "code": "menu.purchase.material",
          "name": "物料汇总",
          "children": [],
        }, {
          "code": "menu.purchase.purchaseorder",
          "name": "订购单管理",
          "children": []
        }
      ],
    },
    {
      "code": "menu.inventory",
      "name": "库存管理",
      "children": [
        {
          "code": "menu.inventory.weld",
          "name": "焊材库存管理",
          "children": [],
        }, {
          "code": "menu.inventory.steel",
          "name": "钢材库存管理",
          "children": []
        },
        {
          "code": "menu.inventory.brought_in",
          "name": "外购件库存管理",
          "children": []
        },{
          "code": "menu.inventory.auxiliary",
          "name": "辅助工具库存管理",
          "children": []
        },{
          "code": "menu.inventory.basic_data",
          "name": "库存基础数据管理",
          "children": []
        }
      ],
    },
  ]
}

module.exports = JSON.stringify(config);
