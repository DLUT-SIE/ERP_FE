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
      purchaseorder: '/purchase/purchase_order'
    },
    inventory: {
      icon: 'appstore',
      weld: '/inventory/weld',
      steel: '/inventory/steel'
    }
  }
}
