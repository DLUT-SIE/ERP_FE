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
    url: '/api/circulation_route/',
    method: 'POST'
  },
  saveProcessRoute: {
    url: '/api/process_route/',
    method: 'POST'
  },
  getCirculationRoute: {
    url: '/api/circulation_route/',
    method: 'GET'
  },
  getProcessRoute: {
    url: '/api/process_route/',
    method: 'GET'
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
