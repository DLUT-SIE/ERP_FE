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
  deleteCoperantItems: {
    url: (id) => (`/api/cooperant_items/${id}/`),
    method: 'DELETE'
  },
  getPrincipalQuota: {
    url: '/api/principal_quotas/',
    method: 'GET'
  },
  deletePrincipalQuota: {
    url: '/api/principal_quotas/',
    method: 'DELETE'
  },
  updatePincipalQuota: {
    url: 'api/principal_quotas/',
    method: 'PATCH'
  },
  addPincipalQuota: {
    url: 'api/principal_quotas/',
    method: 'POST'
  },
  getMaterials: {
    url: '/api/materials/',
    method: 'GET'
  },
  getAuxiliaryQuota: {
    url: '/api/auxiliary_quotas/',
    method: 'GET'
  },
  updateAuxiliaryQuota: {
    url: '/api/auxiliary_quotas/',
    method: 'PATCH'
  },
  addAuxiliaryQuota: {
    url: '/api/auxiliary_quotas/',
    method: 'POST'
  },
  deleteAuxiliaryQuota: {
    url: '/api/auxiliary_quotas/',
    method: 'DELETE'
  },
  getWeldingQuota: {
    url: '/api/welding_quotas/',
    method: 'GET'
  },
  updateWeldingQuota: {
    url: '/api/welding_quotas/',
    method: 'PATCH'
  },
  addWeldingQuota: {
    url: '/api/welding_quotas/',
    method: 'POST'
  },
  deleteWeldingQuota: {
    url: '/api/welding_quotas/',
    method: 'DELETE'
  },
  getTransferCards: {
    url: '/api/transfer_card',
    method: 'GET'
  },
  getTransferCard: {
    url: (id) => (`/api/transfer_card/${id}/`),
    method: 'GET'
  },
  deleteTransferCard: {
    url: (id) => (`/api/transfer_card/${id}/`),
    method: 'DELETE'
  }
}
