export default {
  getDeptMap: {
    url: '/api/departments/distribution/',
    method: 'GET'
  },
  getProFileList: {
    url: '/api/products/',
    method: 'GET'
  },
  uploadBidFile: {
    url: '/api/bidding_documents/',
    method: 'POST'
  },
  getWorkOrderList: {
    url: '/api/work_orders/',
    method: 'GET'
  },
  saveWorkOrder: {
    url: '/api/work_orders/',
    method: 'POST'
  },
  saveCheckDocument: {
    url: (id) => (`/api/bidding_documents/${id}/`),
    method: 'PATCH'
  }
}
