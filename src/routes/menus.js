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
    sell: {
      icon: 'appstore-o',
      production: '/sell/production',
      prosend: '/sell/prosend',
      craftsend: '/sell/craftsend'
    },
    process: {
      icon: 'lock',
      processimport: '/process/processImport',
      process: '/process/process',
      weld: '/process/weld'
    },
    purchase: {
      icon: 'appstore',
      pendingorder: '/purchase/pendingOrder',
      material: '/purchase/material',
      purchaseorder: '/purchase/purchaseOrder'
    }
  }
}
