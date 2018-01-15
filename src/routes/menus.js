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
      productionSend: '/distribution/production_send',
      processSend: '/distribution/process_send',
      procurementSend: '/distribution/procurement_send',
      bidDocument: '/distribution/bid_document'
    },
    process: {
      icon: 'lock',
      processimport: '/process/process_import',
      process: '/process/process',
      weldingseam: '/process/welding_seam',
      broughtinitems: '/process/bought_in_items',
      firstfeedingitems: '/process/first_feeding_items',
      cooperantitems: '/process/cooperant_items',
      principalquota: '/process/principal_quota',
      auxiliaryquota: '/process/auxiliary_quota',
      weldingquota: '/process/welding_quota'
    },
    purchase: {
      icon: 'appstore',
      pendingorder: '/purchase/pending_order',
      material: '/purchase/material',
      purchaseordermanagement: '/purchase/purchase_order_management',
      materialsub: '/purchase/material_sub'
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
