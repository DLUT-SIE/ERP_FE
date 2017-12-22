export default {
  getWeldEntry: {
    url: '/api/welding_material_entries/',
    method: 'GET'
  },
  getWeldApplyCard: {
    url: '/api/welding_material_apply_cards/',
    method: 'GET'
  },
  getWeldHumitureRecord: {
    url: '/api/welding_material_humiture_records/',
    method: 'GET'
  },
  getWeldHumitureRecordDetail: {
    url: (id) => (`/api/welding_material_humiture_records/${id}/`),
    method: 'GET'
  },
  updateWeldHumitureRecord: {
    url: (id) => (`/api/welding_material_humiture_records/${id}/`),
    method: 'PATCH'
  },
  createWeldHumitureRecord: {
    url: '/api/welding_material_humiture_records/',
    method: 'POST'
  },
  getWeldRefund:{
    url: '/api/welding_material_refund_cards/',
    method: 'GET'
  },
  getWeldEntryAccount:{
    url: '/api/welding_material_entry_ledgers/',
    method: 'GET'
  },
  getWeldApplyCardAccount:{
    url: '/api/welding_material_apply_ledgers/',
    method: 'GET'
  },
  getWeldInventoryAccount:{
    url: '/api/welding_material_inventory_ledgers/',
    method: 'GET'
  },
  getWeldInventoryAccountDetail: {
    url: (id) => (`/api/welding_material_inventory_ledgers/${id}/`),
    method: 'GET'
  },
  updateWeldInventoryAccount: {
    url: (id) => (`/api/welding_material_inventory_ledgers/${id}/`),
    method: 'PATCH'
  }
}
