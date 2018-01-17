/* eslint-disable */
const config = {
    "employeeId": "1345",
    "employeeName": "王蕾",
    "employeeMail": "806935949@qq.com",
    "isAdmin": true,
    "deptMap": {
        "distribution": 1,
        "process": 2,
        "procurement": 3,
        "production": 4
    },
    "menus": [{
        "code": "menu.distribution",
        "name": "经销管理",
        "children": [{
            "code": "menu.distribution.production",
            "name": "产品",
            "children": [],
        }, {
            "code": "menu.distribution.production_send",
            "name": "生产科下发",
            "children": [],
        }, {
            "code": "menu.distribution.process_send",
            "name": "工艺科下发",
            "children": []
        }, {
            "code": "menu.distribution.procurement_send",
            "name": "采购科下发",
            "children": []
        }, {
            "code": "menu.distribution.bid_document",
            "name": "招标文件审核",
            "children": []
        }],
    }, {
        "code": "menu.process",
        "name": "工艺管理",
        "children": [{
            "code": "menu.process.process_import",
            "name": "工艺库导入",
            "children": [],
        }, {
            "code": "menu.process.process",
            "name": "工艺库",
            "children": [],
        }, {
            "code": "menu.process.welding_seam",
            "name": "焊缝明细",
            "children": [],
        }, {
            "code": "menu.process.brought_in_items",
            "name": "外购件明细",
            "children": []
        }, {
            "code": "menu.process.first_feeding_items",
            "name": "先投件明细",
            "children": []
        }, {
            "code": "menu.process.cooperant_items",
            "name": "工序性协作件明细",
            "children": []
        }, {
            "code": "menu.process.principal_quota",
            "name": "主材定额",
            "children": []
        }, {
            "code": "menu.process.auxiliary_quota",
            "name": "辅材定额",
            "children": []
        }, {
            "code": "menu.process.welding_quota",
            "name": "焊材定额",
            "children": []
        }],
    }, {
        "code": "menu.purchase",
        "name": "采购管理",
        "children": [{
            "code": "menu.purchase.pending_order",
            "name": "待处理工作令",
            "children": [],
        }, {
            "code": "menu.purchase.material",
            "name": "物料汇总",
            "children": [],
        }, {
            "code": "menu.purchase.purchase_order_management",
            "name": "订购单管理",
            "children": []
        }, {
            "code": "menu.purchase.material_sub_apply",
            "name": "材料代用",
            "children": []
        }, {
            "code": "menu.purchase.status_back_track",
            "name": "状态回溯",
            "children": []
        }]
    }, {
        "code": "menu.inventory",
        "name": "库存管理",
        "children": [{
            "code": "menu.inventory.weld",
            "name": "焊材库存管理",
            "children": [],
        }, {
            "code": "menu.inventory.steel",
            "name": "钢材库存管理",
            "children": []
        }, {
            "code": "menu.inventory.brought_in",
            "name": "外购件库存管理",
            "children": []
        }, {
            "code": "menu.inventory.auxiliary",
            "name": "辅助工具库存管理",
            "children": []
        }, {
            "code": "menu.inventory.basic_data",
            "name": "库存基础数据管理",
            "children": []
        }],
    }, {
        "code": "menu.production",
        "name": "生产管理",
        "children": [{
            "code": "menu.production.production_plan",
            "name": "生产计划",
            "children": [],
        }, {
            "code": "menu.production.ledgers",
            "name": "台账查询",
            "children": []
        }, {
            "code": "menu.production.departments",
            "name": "综合工部",
            "children": []
        }, {
            "code": "menu.production.query_work_hours",
            "name": "工时信息查询",
            "children": []
        }, {
          "code": "menu.production.task_plan_date",
          "name": "任务计划时间",
          "children": []
        }, {
          "code": "menu.production.task_allocation",
          "name": "任务分配",
          "children": []
        }, {
          "code": "menu.production.task_confirm",
          "name": "任务完成确认",
          "children": []
        },{
          "code": "menu.production.production_users",
          "name": "生产用户管理",
          "children": []
        },{
          "code": "menu.production.material_apply_card",
          "name": "材料领用卡",
          "children": []
        },{
          "code": "menu.production.material_refund_card",
          "name": "材料退库卡",
          "children": []
        }
        ],
    }]

}

module.exports = JSON.stringify(config);
