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
  updateMaterialSubApplies: {
    url: '/api/material_sub_applies/:id/',
    method: 'PATCH'
  },
  deleteMaterialSubApplies: {
    url: '/api/material_sub_applies/:id/',
    method: 'DELETE'
  }
}
