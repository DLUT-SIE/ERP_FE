import Distribution from './distribution.api'
import ProcessAPI from './process.api'
import PurchaseAPI from './purchase.api'
import InventoryAPI from './inventory.api'
import ProductionAPI from './production.api'

const baseAPIs = {}

// TODO:后续随 API 增加，建议根据功能拆分成单独文件维护
// 拆分 API 在此处 assign 进来，如 Object.assign({}, baseAPIs, { moreAPIs })
export const apis = Object.assign({}, baseAPIs, {
  Distribution,
  ProcessAPI,
  PurchaseAPI,
  InventoryAPI,
  ProductionAPI
})
