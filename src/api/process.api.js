export default {
  getProductList: {
    url: '/api/products/',
    method: 'GET'
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
  uploadProcessFile: {
    url: '/api/processs/',
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
  }
}
