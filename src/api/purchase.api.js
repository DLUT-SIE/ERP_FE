export default {
  getPurchaseOrders: {
    url: '/api/purchase_orders/',
    method: 'GET'
  },
  getPurchaseOrder: {
    url: (id) => (`/api/purchase_orders/${id}/`),
    method: 'GET'
  },
  updatePurchaseOrder: {
    url: (id) => (`/api/purchase_orders/${id}/`),
    method: 'PATCH'
  },
  deletePurchaseOrder: {
    url: (id) => (`/api/purchase_orders/${id}/`),
    method: 'DELETE'
  },
  getProcurementMaterials: {
    url: '/api/procurement_materials/',
    method: 'GET'
  },
  updateProcurementMaterial: {
    url: (id) => (`/api/procurement_materials/${id}/`),
    method: 'PATCH'
  }
}
