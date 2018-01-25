export default {
  getSubWorkOrders: {
    url: '/api/sub_work_orders/',
    method: 'GET'
  },
  updateSubWorkOrder: {
    url: '/api/sub_work_orders/:id/',
    method: 'PATCH'
  },
  getPurchaseOrders: {
    url: '/api/purchase_orders/',
    method: 'GET'
  },
  getPurchaseOrder: {
    url: '/api/purchase_orders/:id/',
    method: 'GET'
  },
  addPurchaseOrders: {
    url: '/api/purchase_orders/',
    method: 'POST'
  },
  updatePurchaseOrder: {
    url: '/api/purchase_orders/:id/',
    method: 'PATCH'
  },
  deletePurchaseOrder: {
    url: '/api/purchase_orders/:id/',
    method: 'DELETE'
  },
  getProcurementMaterials: {
    url: '/api/procurement_materials/',
    method: 'GET'
  },
  getProcurementMaterialsWithStatus: {
    url: '/api/procurement_materials/?status=1&status=2&status=3',
    method: 'GET'
  },
  updateProcurementMaterial: {
    url: '/api/procurement_materials/:id/',
    method: 'PATCH'
  },
  mergeMaterials: {
    url: '/api/merge_materials/',
    method: 'POST'
  },
  getMaterialSubApplies: {
    url: '/api/material_sub_applies/',
    method: 'GET'
  },
  getMaterialSubApply: {
    url: '/api/material_sub_applies/:id/',
    method: 'GET'
  },
  addMaterialSubApply: {
    url: '/api/material_sub_applies/',
    method: 'POST'
  },
  updateMaterialSubApplies: {
    url: '/api/material_sub_applies/:id/',
    method: 'PATCH'
  },
  deleteMaterialSubApplies: {
    url: '/api/material_sub_applies/:id/',
    method: 'DELETE'
  },
  addMaterialSubApplyItems: {
    url: '/api/material_sub_apply_items/',
    method: 'POST'
  },
  updateMaterialSubApplyItems: {
    url: '/api/material_sub_apply_items/:id/',
    method: 'PATCH'
  },
  deleteMaterialSubApplyItems: {
    url: '/api/material_sub_apply_items/:id/',
    method: 'DELETE'
  },
  getBiddingSheets: {
    url: '/api/bidding_sheets/',
    method: 'GET'
  },
  getBiddingSheetsWithStatus: {
    url: '/api/bidding_sheets/?status=1&status=2&status=3&status=4&status=5&status=6&status=7&status=8',
    method: 'GET'
  },
  getBiddingSheet: {
    url: '/api/bidding_sheets/:id/',
    method: 'GET'
  },
  updateBiddingSheet: {
    url: '/api/bidding_sheets/:id/',
    method: 'PATCH'
  },
  getStatusChanges: {
    url: '/api/status_changes/',
    method: 'GET'
  },
  addStatusChanges: {
    url: '/api/status_changes/',
    method: 'POST'
  },
  getSuppliers: {
    url: '/api/suppliers/',
    method: 'GET'
  },
  addSupplier: {
    url: '/api/suppliers/',
    method: 'POST'
  },
  updateSupplier: {
    url: '/api/suppliers/:id/',
    method: 'PATCH'
  },
  deleteSupplier: {
    url: '/api/suppliers/:id/',
    method: 'DELETE'
  },
  getSupplierQuotations: {
    url: '/api/supplier_quotations/',
    method: 'GET'
  },
  addSupplierQuotation: {
    url: '/api/supplier_quotations/',
    method: 'POST'
  },
  updateSupplierQuotation: {
    url: '/api/supplier_quotations/:id/',
    method: 'PATCH'
  },
  deleteSupplierQuotation: {
    url: '/api/supplier_quotations/:id/',
    method: 'DELETE'
  },
  getSupplierDocuments: {
    url: '/api/supplier_documents/',
    method: 'GET'
  },
  addSupplierDocument: {
    url: '/api/supplier_documents/',
    method: 'POST'
  },
  deleteSupplierDocument: {
    url: '/api/supplier_documents/:id/',
    method: 'DELETE'
  },
  getMaterialExecutions: {
    url: '/api/material_executions/',
    method: 'GET'
  },
  getMaterialExecution: {
    url: '/api/material_executions/:id/',
    method: 'GET'
  },
  addMaterialExecution: {
    url: '/api/material_executions/',
    method: 'POST'
  },
  getMaterialExecutionDetails: {
    url: '/api/material_execution_details/',
    method: 'GET'
  },
  getContracts: {
    url: '/api/contracts/',
    method: 'GET'
  },
  getContractDetails: {
    url: '/api/contract_details/',
    method: 'GET'
  },
  addContractDetail: {
    url: '/api/contract_details/',
    method: 'POST'
  },
  getWeldingMaterialEntry: {
    url: '/api/welding_material_entries/:id/',
    method: 'GET'
  },
  updateWeldingMaterialEntryDetail: {
    url: '/api/welding_material_entry_details/:id/',
    method: 'PATCH'
  },
  getSteelMaterialEntry: {
    url: '/api/steel_material_entries/:id/',
    method: 'GET'
  },
  updateSteelMaterialEntryDetail: {
    url: '/api/steel_material_entry_details/:id/',
    method: 'PATCH'
  },
  getAuxiliaryMaterialEntry: {
    url: '/api/auxiliary_material_entries/:id/',
    method: 'GET'
  },
  updateAuxiliaryMaterialEntryDetail: {
    url: '/api/auxiliary_material_entry_details/:id/',
    method: 'PATCH'
  },
  getBoughtInComponentEntry: {
    url: '/api/bought_in_component_entries/:id/',
    method: 'GET'
  },
  updateBoughtInComponentEntryDetail: {
    url: '/api/bought_in_component_entry_details/:id/',
    method: 'PATCH'
  },
  addSupplyRelationship: {
    url: '/api/supply_relationships/',
    method: 'POST'
  },
  resetSupplyRelationships: {
    url: '/api/supply_relationships/reset/',
    method: 'GET'
  },
  getProcessFollowingInfos: {
    url: '/api/process_following_infos/',
    method: 'GET'
  },
  addProcessFollowingInfo: {
    url: '/api/process_following_infos/',
    method: 'POST'
  },
  getSuppliersWithBiddingSheet: {
    url: '/api/suppliers/bidding_sheet/',
    method: 'GET'
  },
  getArrivalInspections: {
    url: '/api/arrival_inspections/',
    method: 'GET'
  },
  updateArrivalInspections: {
    url: '/api/suppliers/arrival_inspections/:id',
    method: 'PATCH'
  }
}
