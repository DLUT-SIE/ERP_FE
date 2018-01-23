import _ from 'lodash'

export function formatMenu (source) {
  if (!source.length) {
    return []
  }
  _.forEach(source, o => {
    if (o.children) {
      _.forEach(o.children, c => {
        c.url = _.get(menu, c.code, '')
      })
    }
    o.icon = _.get(menu, o.code + '.icon', '')
  })
  return source
}

export const menu = {
  menu: {
    distribution: {
      icon: 'appstore-o',
      production: '/distribution/production',
      production_send: '/distribution/production_send',
      process_send: '/distribution/process_send',
      procurement_send: '/distribution/procurement_send',
      bid_document: '/distribution/bid_document'
    },
    process: {
      icon: 'lock',
      process_import: '/process/process_import',
      process: '/process/process',
      welding_seam: '/process/welding_seam',
      brought_in_items: '/process/bought_in_items',
      first_feeding_items: '/process/first_feeding_items',
      cooperant_items: '/process/cooperant_items',
      principal_quota: '/process/principal_quota',
      auxiliary_quota: '/process/auxiliary_quota',
      welding_quota: '/process/welding_quota'
    },
    purchase: {
      icon: 'appstore',
      pending_order: '/purchase/pending_order',
      material_summarize: '/purchase/material_summarize',
      purchase_order_management: '/purchase/purchase_order_management',
      purchase_track: '/purchase/purchase_track',
      entry_confirm: '/purchase/entry_confirm',
      material_sub_apply: '/purchase/material_sub_apply',
      status_back_track: '/purchase/status_back_track',
      material_execution: '/purchase/material_execution',
      supplier: '/purchase/supplier',
      contract: '/purchase/contract'
    },
    inventory: {
      icon: 'appstore',
      weld: '/inventory/weld',
      steel: '/inventory/steel',
      brought_in: '/inventory/brought_in',
      auxiliary: '/inventory/auxiliary',
      basic_data: '/inventory/basic_data'
    },
    production: {
      icon: 'appstore',
      production_plan: '/production/production_plan',
      ledgers: '/production/ledgers',
      departments: '/production/departments',
      query_work_hours: '/production/query_work_hours',
      task_plan_date: `/production/task_plan_date/?allocation_status=${false}&confirm_status=${false}`,
      task_allocation: `/production/task_allocation/?plan_status=${true}&confirm_status=${false}`,
      task_confirm: `/production/task_confirm/?allocation_status=${true}`,
      production_users: '/production/production_users',
      material_apply_card: '/production/material_apply_card',
      material_refund_card: '/production/material_refund_card'
    }
  }
}
