/* eslint-disable */
const config = {
  "employeeId":"1345",
  "employeeName":"王蕾",
  "employeeMail":"806935949@qq.com",
  "isAdmin": true,
  "menus": [
    {
      "code": "menu.sell",
      "name": "经销管理",
      "children": [
        {
          "code": "menu.sell.production",
          "name": "产品",
          "children": [],
        }, {
          "code": "menu.sell.prosend",
          "name": "生产科下发",
          "children": [],
        }, {
          "code": "menu.sell.craftsend",
          "name": "工艺科下发",
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
          "code": "menu.process.weld",
          "name": "焊接明细",
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
  ]
}

module.exports = JSON.stringify(config);
