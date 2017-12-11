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
      product: '/sell/product',
      craft: '/sell/craft',
      purchase: '/sell/purchase',
      check: '/sell/check'
    },
    data: {
      icon: 'lock',
      processimport: '/data/processimport',
      process: '/data/process',
      weld: '/data/weld'
    },
    purchase: {
      icon: 'appstore',
      pendingorder: '/purchase/pendingorder',
      material: '/purchase/material',
      purchaseorder: '/purchase/purchaseorder'
    }
  }
}
