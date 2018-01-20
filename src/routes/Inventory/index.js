import React from 'react'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import WeldManage from './WeldManage'
import WeldEntry from './WeldManage/components/WeldEnrty'
import WeldApplyCardDetail from './WeldManage/components/WeldApplyCard/components/WeldApplyCardDetail'
import SteelApplyCardDetail from './SteelManage/components/SteelApplyCard/components/SteelApplyCardDetail'
import BroughtInApplyCardDetail from './BroughtInManage/components/BroughtInApplyCard/components/BroughtInApplyCardDetail'
import AuxiliaryApplyCardDetail from './AuxiliaryManage/components/AuxiliaryApplyCard/components/AuxiliaryApplyCardDetail'
import WeldDetail from './WeldManage/components/WeldEnrty/components/WeldDetail'
import WeldApplyCard from './WeldManage/components/WeldApplyCard'
import WeldHumitureRecord from './WeldManage/components/WeldHumitureRecord'
import WeldRefund from './WeldManage/components/WeldRefund'
import WeldAccount from './WeldManage/components/WeldAccount'
import WeldEntryAccount from './WeldManage/components/WeldAccount/components/WeldEnrtyAccount'
import WeldApplyCardAccount from './WeldManage/components/WeldAccount/components/WeldApplyCardAccount'
import WeldInventoryAccount from './WeldManage/components/WeldAccount/components/WeldInventoryAccount'
import SteelManage from './SteelManage'
import SteelEntry from './SteelManage/components/SteelEnrty'
import SteelApplyCard from './SteelManage/components/SteelApplyCard'
import SteelRefund from './SteelManage/components/SteelRefund'
import SteelAccount from './SteelManage/components/SteelAccount'
import SteelApplyCardAccount from './SteelManage/components/SteelAccount/components/ApplyCardAccount'
import SteelEntryAccount from './SteelManage/components/SteelAccount/components/EnrtyAccount'
import SteelInventoryAccount from './SteelManage/components/SteelAccount/components/InventoryAccount'
import BroughtInManage from './BroughtInManage'
import BroughtInEntry from './BroughtInManage/components/BroughtInEnrty'
import BroughtInApplyCard from './BroughtInManage/components/BroughtInApplyCard'
import BroughtInRefund from './BroughtInManage/components/BroughtInRefund'
import BroughtInAccount from './BroughtInManage/components/BroughtInAccount'
import BroughtInApplyCardAccount from './BroughtInManage/components/BroughtInAccount/components/ApplyCardAccount'
import BroughtInEntryAccount from './BroughtInManage/components/BroughtInAccount/components/EnrtyAccount'
import BroughtInInventoryAccount from './BroughtInManage/components/BroughtInAccount/components/InventoryAccount'
import AuxiliaryManage from './AuxiliaryManage'
import AuxiliaryEntry from './AuxiliaryManage/components/AuxiliaryEntry'
import AuxiliaryApplyCard from './AuxiliaryManage/components/AuxiliaryApplyCard'
import AuxiliaryAccount from './AuxiliaryManage/components/AuxiliaryAccount'
import AuxiliaryApplyCardAccount from './AuxiliaryManage/components/AuxiliaryAccount/components/ApplyCardAccount'
import AuxiliaryEntryAccount from './AuxiliaryManage/components/AuxiliaryAccount/components/EnrtyAccount'
import AuxiliaryInventoryAccount from './AuxiliaryManage/components/AuxiliaryAccount/components/InventoryAccount'
import BasicDataManage from './BasicDataManage'
import WareHouse from './BasicDataManage/components/Warehouse'
import TempHumiture from './BasicDataManage/components/TempHumiture'

const childRoutes = [
  {
    path: `weld/weld_entry/:uid`,
    breadcrumbName: '焊材入库单',
    component: WeldDetail,
    exact: true
  },
  {
    path: `weld/weld_entry`,
    breadcrumbName: '焊材入库管理',
    component: WeldEntry,
    exact: true
  },
  {
    path: `weld/weld_apply_card/:id/`,
    breadcrumbName: '焊材领用卡',
    component: WeldApplyCardDetail,
    exact: true
  },
  {
    path: 'weld/weld_apply_card',
    breadcrumbName: '焊材领用管理',
    component: WeldApplyCard,
    exact: true
  },
  {
    path: 'weld/weld_humiture_record',
    breadcrumbName: '焊材温湿度记录',
    component: WeldHumitureRecord,
    exact: true
  },
  {
    path:'weld/weld_refund',
    breadcrumbName: '焊材退库管理',
    component: WeldRefund,
    exact: true
  },
  {
    path:'weld/weld_account/weld_entry_account',
    breadcrumbName: '焊材入库台账',
    component: WeldEntryAccount,
    exact: true
  },
  {
    path:'weld/weld_account/weld_apply_card_account',
    breadcrumbName: '焊材出库台账',
    component: WeldApplyCardAccount,
    exact: true
  },
  {
    path:'weld/weld_account/weld_inventory_account',
    breadcrumbName: '焊材库存台账',
    component: WeldInventoryAccount,
    exact: true
  },
  {
    path:'weld/weld_account',
    breadcrumbName: '焊材台账',
    component: WeldAccount,
    exact: true
  },
  {
    path: 'weld',
    breadcrumbName: '焊材库存管理',
    component: WeldManage,
    exact: true
  },
  // 钢材管理
  {
    path: 'steel/steel_entry',
    breadcrumbName: '钢材入库管理',
    component: SteelEntry,
    exact: true
  },
  {
    path: 'steel/steel_apply_card/:id/',
    breadcrumbName: '钢材领用卡',
    component: SteelApplyCardDetail,
    exact: true
  },
  {
    path: 'steel/steel_apply_card',
    breadcrumbName: '钢材领用管理',
    component: SteelApplyCard,
    exact: true
  },
  {
    path: 'steel/steel_refund',
    breadcrumbName: '钢材退库管理',
    component: SteelRefund,
    exact: true
  },
  {
    path:'steel/steel_account/steel_entry_account',
    breadcrumbName: '钢材入库台账',
    component: SteelEntryAccount,
    exact: true
  },
  {
    path:'steel/steel_account/steel_apply_card_account',
    breadcrumbName: '钢材出库台账',
    component: SteelApplyCardAccount,
    exact: true
  },
  {
    path:'steel/steel_account/steel_inventory_account',
    breadcrumbName: '钢材库存台账',
    component: SteelInventoryAccount,
    exact: true
  },
  {
    path: 'steel/steel_account',
    breadcrumbName: '钢材台账',
    component: SteelAccount,
    exact: true
  },
  {
    path: 'steel',
    breadcrumbName: '钢材库存管理',
    component: SteelManage,
    exact: true
  },
  // 外购件管理
  {
    path: 'brought_in/brought_in_entry',
    breadcrumbName: '外购件入库管理',
    component: BroughtInEntry,
    exact: true
  },
  {
    path: 'brought_in/brought_in_apply_card/:id/',
    breadcrumbName: '外购件领用卡',
    component: BroughtInApplyCardDetail,
    exact: true
  },
  {
    path: 'brought_in/brought_in_apply_card',
    breadcrumbName: '外购件领用管理',
    component: BroughtInApplyCard,
    exact: true
  },
  {
    path: 'brought_in/brought_in_refund',
    breadcrumbName: '外购件退库管理',
    component: BroughtInRefund,
    exact: true
  },
  {
    path:'brought_in/brought_in_account/brought_in_entry_account',
    breadcrumbName: '外购件入库台账',
    component: BroughtInEntryAccount,
    exact: true
  },
  {
    path:'brought_in/brought_in_account/brought_in_apply_card_account',
    breadcrumbName: '外购件出库台账',
    component: BroughtInApplyCardAccount,
    exact: true
  },
  {
    path:'brought_in/brought_in_account/brought_in_inventory_account',
    breadcrumbName: '外购件库存台账',
    component: BroughtInInventoryAccount,
    exact: true
  },
  {
    path: 'brought_in/brought_in_account',
    breadcrumbName: '外购件台账',
    component: BroughtInAccount,
    exact: true
  },
  {
    path: 'brought_in',
    breadcrumbName: '外购件库存管理',
    component: BroughtInManage,
    exact: true
  },
  // 辅助工具
  {
    path: 'auxiliary/auxiliary_entry',
    breadcrumbName: '辅助工具入库管理',
    component: AuxiliaryEntry,
    exact: true
  },
  {
    path: 'auxiliary/auxiliary_apply_card/:id/',
    breadcrumbName: '辅助工具领用管理',
    component: AuxiliaryApplyCardDetail,
    exact: true
  },
  {
    path: 'auxiliary/auxiliary_apply_card',
    breadcrumbName: '辅助工具领用管理',
    component: AuxiliaryApplyCard,
    exact: true
  },
  {
    path:'auxiliary/auxiliary_account/auxiliary_entry_account',
    breadcrumbName: '辅助工具入库台账',
    component: AuxiliaryEntryAccount,
    exact: true
  },
  {
    path:'auxiliary/auxiliary_account/auxiliary_apply_card_account',
    breadcrumbName: '辅助工具出库台账',
    component: AuxiliaryApplyCardAccount,
    exact: true
  },
  {
    path:'auxiliary/auxiliary_account/auxiliary_inventory_account',
    breadcrumbName: '辅助工具库存台账',
    component: AuxiliaryInventoryAccount,
    exact: true
  },
  {
    path: 'auxiliary/auxiliary_account',
    breadcrumbName: '辅助工具台账',
    component: AuxiliaryAccount,
    exact: true
  },
  {
    path: 'auxiliary',
    breadcrumbName: '辅助库存管理',
    component: AuxiliaryManage,
    exact: true
  },
  // 库存基础数据管理
  {
    path: 'basic_data',
    breadcrumbName: '库存基础数据管理',
    component: BasicDataManage,
    exact: true
  },
  {
    path: 'basic_data/warehouse',
    breadcrumbName: '库房管理',
    component: WareHouse,
    exact: true
  },
  {
    path: 'basic_data/temp_humiture',
    breadcrumbName: '焊材要求温湿度管理',
    component: TempHumiture,
    exact: true
  }
]

export default (path) => {
  return _.map(childRoutes, (child) => ({
    path: `/${path}/${child.path}`,
    component: child.component,
    breadcrumbName: child.breadcrumbName,
    exact: child.exact
  })).concat({
    path: `/${path}`,
    breadcrumbName: '库存管理',
    // redirect: `/${path}/pendingorder`
    component: () => (
      <Redirect to={`/${path}/weld`} />
    )
  })
}
