export default {
  getPurchaseOrders: {
    url: '/api/purchase_orders/',
    method: 'GET'
  },
  getPurchaseOrder: {
    url: '/api/purchase_orders/:id/',
    method: 'GET'
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
  }
}
