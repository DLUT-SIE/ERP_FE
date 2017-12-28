export default {
  getProcessLibraries: {
    url: '/api/process_libraries/',
    method: 'GET'
  },
  uploadProcessLibrary: {
    url: '/api/process_libraries/upload/',
    method: 'POST'
  },
  getProcessMaterials: {
    url: '/api/process_materials/',
    method: 'GET'
  },
  saveCirculationRoute: {
    url: (id) => (`/api/circulation_routes/${id}/`),
    method: 'PATCH'
  },
  saveProcessRoute: {
    url: (id) => (`/api/process_routes/${id}/`),
    method: 'PATCH'
  },
  getCirculationRoute: {
    url: '/api/circulation_routes/',
    method: 'GET'
  },
  getProcessRoute: {
    url: '/api/process_routes/',
    method: 'GET'
  },
  getTransferCards: {
    url: '/api/transfer_cards/',
    method: 'GET'
  },
  getTransferCard: {
    url: (id) => (`/api/transfer_cards/${id}/`),
    method: 'GET'
  },
  updateTransferCard: {
    url: (id) => (`/api/transfer_cards/${id}/`),
    method: 'PATCH'
  },
  deleteTransferCard: {
    url: (id) => (`/api/transfer_cards/${id}/`),
    method: 'DELETE'
  },
  getTransferCardProcess: {
    url: '/api/transfer_card_processes/',
    method: 'GET'
  },
  getQuotaList: {
    url: '/api/quota_lists/',
    method: 'GET'
  },
  getWeldingSeam: {
    url: '/api/welding_seams/',
    method: 'GET'
  },
  getBoughtInItems: {
    url: '/api/bought_in_items/',
    method: 'GET'
  },
  updateBoughtInItems: {
    url: (id) => (`/api/bought_in_items/${id}/`),
    method: 'PATCH'
  },
  addBoughtInItems: {
    url: '/api/bought_in_items/',
    method: 'POST'
  },
  deleteBoughtInItems: {
    url: (id) => (`/api/bought_in_items/${id}/`),
    method: 'DELETE'
  },
  getFirstFeedingItems: {
    url: '/api/first_feeding_items/',
    method: 'GET'
  },
  updateFirstFeedingItems: {
    url: (id) => (`/api/first_feeding_items/${id}/`),
    method: 'PATCH'
  },
  addFirstFeedingItems: {
    url: '/api/first_feeding_items/',
    method: 'POST'
  },
  deleteFirstFeedingItems: {
    url: (id) => (`/api/first_feeding_items/${id}/`),
    method: 'DELETE'
  },
  getCoperantItems: {
    url: '/api/cooperant_items/',
    method: 'GET'
  },
  updateCoperantItems: {
    url: (id) => (`/api/cooperant_items/${id}/`),
    method: 'PATCH'
  },
  addCoperantItems: {
    url: '/api/cooperant_items/',
    method: 'POST'
  },
  deleteCoperantItems: {
    url: (id) => (`/api/cooperant_items/${id}/`),
    method: 'DELETE'
  },
  getPrincipalQuota: {
    url: '/api/principal_quota_items/',
    method: 'GET'
  },
  updatePincipalQuota: {
    url: (id) => (`/api/principal_quota_items/${id}/`),
    method: 'PATCH'
  },
  addPincipalQuota: {
    url: '/api/principal_quota_items/',
    method: 'POST'
  },
  deletePrincipalQuota: {
    url: (id) => (`/api/principal_quota_items/${id}/`),
    method: 'DELETE'
  },
  getMaterials: {
    url: '/api/materials/',
    method: 'GET'
  },
  getAuxiliaryQuota: {
    url: '/api/auxiliary_quota_items/',
    method: 'GET'
  },
  updateAuxiliaryQuota: {
    url: (id) => (`/api/auxiliary_quota_items/${id}/`),
    method: 'PATCH'
  },
  addAuxiliaryQuota: {
    url: '/api/auxiliary_quota_items/',
    method: 'POST'
  },
  deleteAuxiliaryQuota: {
    url: (id) => (`/api/auxiliary_quota_items/${id}/`),
    method: 'DELETE'
  },
  getWeldingQuota: {
    url: '/api/welding_quota_items/',
    method: 'GET'
  },
  updateWeldingQuota: {
    url: (id) => (`/api/welding_quota_items/${id}/`),
    method: 'PATCH'
  },
  addWeldingQuota: {
    url: '/api/welding_quota_items/',
    method: 'POST'
  },
  deleteWeldingQuota: {
    url: (id) => (`/api/welding_quota_items/${id}/`),
    method: 'DELETE'
  }
}
