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
  getWeldBakeRecordDetail: {
    url: '/api/welding_material_bake_records/:id/',
    method: 'GET'
  },
  getWeldBakeRecord: {
    url: '/api/welding_material_bake_records/',
    method: 'GET'
  },
  updateWeldBakeRecord: {
    url: '/api/welding_material_bake_records/:id/',
    method: 'PATCH'
  },
  createWeldBakeRecord: {
    url: '/api/welding_material_bake_records/',
    method: 'POST'
  },
  getWeldHumitureRecordDetail: {
    url: '/api/welding_material_humiture_records/:id/',
    method: 'GET'
  },
  updateWeldHumitureRecord: {
    url: '/api/welding_material_humiture_records/:id/',
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
    url: '/api/welding_material_inventory_details/:id/',
    method: 'GET'
  },
  updateWeldInventoryAccount: {
    url: '/api/welding_material_inventory_details/:id/',
    method: 'PATCH'
  },
  getSteelEntry: {
    url: '/api/steel_material_entries/',
    method: 'GET'
  },
  getSteelApplyCard: {
    url: '/api/steel_material_apply_cards/',
    method: 'GET'
  },
  getSteelRefund: {
    url: '/api/steel_material_refund_cards/',
    method: 'GET'
  },
  getSteelApplyCardAccount: {
    url: '/api/steel_material_apply_ledgers/',
    method: 'GET'
  },
  getSteelEntryAccount: {
    url: '/api/steel_material_entry_ledgers/',
    method: 'GET'
  },
  getSteelRefundAccount: {
    url: '/api/steel_material_inventory_ledgers/',
    method: 'GET'
  },
  getSteelInventoryAccount: {
    url: '/api/steel_material_inventory_ledgers/',
    method: 'GET'
  },
  getSteelInventoryAccountDetail: {
    url: '/api/steel_material_inventory_ledgers/:id/',
    method: 'GET'
  },
  updateSteelInventoryAccount: {
    url: '/api/steel_material_inventory_ledgers/:id/',
    method: 'PATCH'
  },
  getBroughtInEntry: {
    url: '/api/bought_in_component_entries/',
    method: 'GET'
  },
  getBroughtInApplyCard: {
    url: '/api/bought_in_component_apply_cards/',
    method: 'GET'
  },
  getBroughtInRefund: {
    url: '/api/bought_in_component_refund_cards/',
    method: 'GET'
  },
  getBroughtInEntryAccount: {
    url: '/api/bought_in_component_entry_ledgers/',
    method: 'GET'
  },
  getBroughtInApplyCardAccount: {
    url: '/api/bought_in_component_apply_ledgers/',
    method: 'GET'
  },
  getBroughtInInventoryAccount: {
    url: '/api/bought_in_component_inventory_ledgers/',
    method: 'GET'
  },
  getBroughtInInventoryAccountDetail: {
    url: '/api/bought_in_component_inventory_ledgers/:id/',
    method: 'GET'
  },
  updateBroughtInInventoryAccount: {
    url: '/api/bought_in_component_inventory_details/:id/',
    method: 'PATCH'
  },
  getAuxiliaryEntry: {
    url: '/api/auxiliary_material_entries/',
    method: 'GET'
  },
  getAuxiliaryApplyCard: {
    url: '/api/auxiliary_material_apply_cards/',
    method: 'GET'
  },
  getAuxiliaryEntryAccount: {
    url: '/api/auxiliary_material_entry_ledgers/',
    method: 'GET'
  },
  getAuxiliaryApplyCardAccount: {
    url: '/api/auxiliary_material_apply_ledgers/',
    method: 'GET'
  },
  getAuxiliaryInventoryAccount: {
    url: '/api/auxiliary_material_inventory_ledgers/',
    method: 'GET'
  },
  getAuxiliaryInventoryAccountDetail: {
    url: '/api/auxiliary_material_inventory_ledgers/:id/',
    method: 'GET'
  },
  updateAuxiliaryInventoryAccount: {
    url: '/api/auxiliary_material_inventory_details/:id/',
    method: 'PATCH'
  },
  getWarehouseRecords: {
    url: '/api/warehouses/',
    method: 'GET'
  },
  getWarehouseRecordsDetail: {
    url: '/api/warehouses/:id/',
    method: 'GET'
  },
  updateWarehouseRecord: {
    url: '/api/warehouses/:id/',
    method: 'PATCH'
  },
  deleteWarehouseRecord: {
    url: '/api/warehouses/',
    method: 'DELETE'
  },
  createWarehouseRecord: {
    url: '/api/warehouses/',
    method: 'POST'
  },
  getWeldingMaterialApplyCardDetails: {
    url: '/api/welding_material_apply_cards/:id/',
    method: 'GET'
  },
  getSteelMaterialApplyCardDetails: {
    url: '/api/steel_material_apply_cards/:id/',
    method: 'GET'
  },
  getBroughtInMaterialApplyCardDetails: {
    url: '/api/bought_in_component_apply_cards/:id/',
    method: 'GET'
  },
  getAuxiliaryMaterialApplyCardDetails: {
    url: '/api/auxiliary_material_apply_cards/:id/',
    method: 'GET'
  },
  getWeldingMaterialEntryCardDetails: {
    url: '/api/welding_material_entries/:id/',
    method: 'GET'
  },
  getSteelMaterialEntryCardDetails: {
    url: '/api/steel_material_entries/:id/',
    method: 'GET'
  },
  getBroughtInMaterialEntryCardDetails: {
    url: '/api/bought_in_component_entries/:id/',
    method: 'GET'
  },
  getAuxiliaryMaterialEntryCardDetail: {
    url: '/api/auxiliary_material_entries/:id/',
    method: 'GET'
  },
  updateWeldingMaterialEntryCardStatus: {
    url: '/api/welding_material_entries/:id/',
    method: 'PATCH'
  },
  updateSteelMaterialEntryCardStatus: {
    url: '/api/steel_material_entries/:id/',
    method: 'PATCH'
  },
  updateBroughtInMaterialEntryCardStatus: {
    url: '/api/bought_in_component_entries/:id/',
    method: 'PATCH'
  },
  updateAuxiliaryMaterialEntryCardStatus: {
    url: '/api/auxiliary_material_entries/:id/',
    method: 'PATCH'
  }
}
