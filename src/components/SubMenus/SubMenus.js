/**
 * Created by lh on 2017/12/26.
 */
const WeldSubMenus = [
  {
    icon: 'check-square-o',
    path: '/inventory/weld/weld_entry/?status=2',
    breadcrumbName: '焊材入库管理'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/weld/weld_apply_card/?status=3',
    breadcrumbName: '焊材领用管理'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/weld/weld_humiture_record',
    breadcrumbName: '焊材温湿度记录'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/weld/weld_apply_card',
    breadcrumbName: '焊材烘焙记录'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/weld/weld_refund/?status=2',
    breadcrumbName: '焊材退库管理'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/weld/weld_account',
    breadcrumbName: '焊材台账'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/weld/weld_apply_card',
    breadcrumbName: '焊材发放回收记录'
  }
]
const WeldAccountSubMenus = [
  {
    icon: 'check-square-o',
    path: '/inventory/weld/weld_account/weld_entry_account',
    breadcrumbName: '焊材入库台账'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/weld/weld_account/weld_apply_card_account',
    breadcrumbName: '焊材出库台账'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/weld/weld_account/weld_inventory_account',
    breadcrumbName: '焊材库存台账'
  }
]
const SteelSubMenus = [
  {
    icon: 'check-square-o',
    path: '/inventory/steel/steel_entry/?status=2',
    breadcrumbName: '钢材入库管理'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/steel/steel_apply_card/?status=3',
    breadcrumbName: '钢材领用管理'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/steel/steel_refund/?status=2',
    breadcrumbName: '钢材退库管理'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/steel/steel_account',
    breadcrumbName: '钢材台账'
  }
]
const SteelAccountSubMenus = [
  {
    icon: 'check-square-o',
    path: '/inventory/steel/steel_account/steel_entry_account',
    breadcrumbName: '钢材入库台账'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/steel/steel_account/steel_apply_card_account',
    breadcrumbName: '钢材出库台账'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/steel/steel_account/steel_inventory_account',
    breadcrumbName: '钢材库存台账'
  }
]
const BroughtInSubMenus = [
  {
    icon: 'check-square-o',
    path: '/inventory/brought_in/brought_in_entry/?status=2',
    breadcrumbName: '外购件入库管理'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/brought_in/brought_in_apply_card/?status=3',
    breadcrumbName: '外购件领用管理'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/brought_in/brought_in_refund/?status=2',
    breadcrumbName: '外购件退库管理'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/brought_in/brought_in_account',
    breadcrumbName: '外购件台账'
  }
]
const BroughtInAccountSubMenus = [
  {
    icon: 'check-square-o',
    path: '/inventory/brought_in/brought_in_account/brought_in_entry_account',
    breadcrumbName: '外购件入库台账'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/brought_in/brought_in_account/brought_in_apply_card_account',
    breadcrumbName: '外购件出库台账'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/brought_in/brought_in_account/brought_in_inventory_account',
    breadcrumbName: '外购件库存台账'
  }
]
const AuxiliarySubMenus = [
  {
    icon: 'check-square-o',
    path: '/inventory/auxiliary/auxiliary_entry/?status=2',
    breadcrumbName: '辅助工具入库管理'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/auxiliary/auxiliary_apply_card/?status=3',
    breadcrumbName: '辅助工具领用管理'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/auxiliary/auxiliary_account',
    breadcrumbName: '辅助工具台账'
  }
]
const AuxiliaryAccountMenus = [
  {
    icon: 'check-square-o',
    path: '/inventory/auxiliary/auxiliary_account/auxiliary_entry_account',
    breadcrumbName: '辅助工具入库台账'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/auxiliary/auxiliary_account/auxiliary_apply_card_account',
    breadcrumbName: '辅助工具出库台账'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/auxiliary/auxiliary_account/auxiliary_inventory_account',
    breadcrumbName: '辅助工具库存台账'
  }
]

const BasicDataSubMenus = [
  {
    icon: 'check-square-o',
    path: '/inventory/basic_data/warehouse',
    breadcrumbName: '库房管理'
  },
  {
    icon: 'check-square-o',
    path: '/inventory/basic_data/temp_humiture',
    breadcrumbName: '焊材要求温湿度管理'
  }
]

export const MatertialApplyCards = [
  {
    icon: 'check-square-o',
    path: '/production/material_apply_card/welding',
    breadcrumbName: '焊材领用卡'
  },
  {
    icon: 'check-square-o',
    path: '/production/material_apply_card/steel',
    breadcrumbName: '钢材领用卡'
  },
  {
    icon: 'check-square-o',
    path: '/production/material_apply_card/brought_in',
    breadcrumbName: '外购件领用卡'
  },
  {
    icon: 'check-square-o',
    path: '/production/material_apply_card/auxiliary',
    breadcrumbName: '辅材领用卡'
  }
]

export { WeldSubMenus, WeldAccountSubMenus, SteelSubMenus, SteelAccountSubMenus, BroughtInSubMenus, BroughtInAccountSubMenus, AuxiliarySubMenus, AuxiliaryAccountMenus, BasicDataSubMenus }
