export default {
  getPurchaseOrders: {
    url: '/api/purchase_orders/',
    method: 'GET'
  },
  deletePurchaseOrder: {
    url: (id) => (`/api/purchase_orders/${id}`),
    method: 'DELETE'
  }
}
