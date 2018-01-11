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
    url: '/api/circulation_routes/:id/',
    method: 'PATCH'
  },
  saveProcessRoute: {
    url: '/api/process_routes/:id/',
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
    url: '/api/transfer_cards/:id/',
    method: 'GET'
  },
  updateTransferCard: {
    url: '/api/transfer_cards/:id/',
    method: 'PATCH'
  },
  addTransferCard: {
    url: '/api/transfer_cards/',
    method: 'POST'
  },
  deleteTransferCard: {
    url: '/api/transfer_cards/:id/',
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
  getWeldingSeams: {
    url: '/api/welding_seams/',
    method: 'GET'
  },
  getWeldingSeam: {
    url: '/api/welding_seams/:id/',
    method: 'GET'
  },
  updateWeldingSeam: {
    url: '/api/welding_seams/:id/',
    method: 'PATCH'
  },
  addWeldingSeam: {
    url: '/api/welding_seams/',
    method: 'POST'
  },
  getWeldingProcessSpecifications: {
    url: '/api/welding_process_specifications/',
    method: 'GET'
  },
  addWeldingJointProcessAnalyses: {
    url: '/api/welding_joint_process_analyses/',
    method: 'POST'
  },
  getWeldingCertifications: {
    url: '/api/welding_certifications/',
    method: 'GET'
  },
  getBoughtInItems: {
    url: '/api/bought_in_items/',
    method: 'GET'
  },
  updateBoughtInItems: {
    url: '/api/bought_in_items/:id/',
    method: 'PATCH'
  },
  addBoughtInItems: {
    url: '/api/bought_in_items/',
    method: 'POST'
  },
  deleteBoughtInItems: {
    url: '/api/bought_in_items/:id/',
    method: 'DELETE'
  },
  getFirstFeedingItems: {
    url: '/api/first_feeding_items/',
    method: 'GET'
  },
  updateFirstFeedingItems: {
    url: '/api/first_feeding_items/:id/',
    method: 'PATCH'
  },
  addFirstFeedingItems: {
    url: '/api/first_feeding_items/',
    method: 'POST'
  },
  deleteFirstFeedingItems: {
    url: '/api/first_feeding_items/:id/',
    method: 'DELETE'
  },
  getCoperantItems: {
    url: '/api/cooperant_items/',
    method: 'GET'
  },
  updateCoperantItems: {
    url: '/api/cooperant_items/:id/',
    method: 'PATCH'
  },
  addCoperantItems: {
    url: '/api/cooperant_items/',
    method: 'POST'
  },
  deleteCoperantItems: {
    url: '/api/cooperant_items/:id/',
    method: 'DELETE'
  },
  getPrincipalQuotas: {
    url: '/api/principal_quota_items/',
    method: 'GET'
  },
  getPrincipalQuota: {
    url: '/api/principal_quota_items/:id/',
    method: 'GET'
  },
  updatePincipalQuota: {
    url: '/api/principal_quota_items/:id/',
    method: 'PATCH'
  },
  addPincipalQuota: {
    url: '/api/principal_quota_items/',
    method: 'POST'
  },
  deletePrincipalQuota: {
    url: '/api/principal_quota_items/:id/',
    method: 'DELETE'
  },
  getMaterials: {
    url: '/api/materials/',
    method: 'GET'
  },
  getTotalWeldingMaterials: {
    url: '/api/total_welding_materials/',
    method: 'GET'
  },
  getWeldingMaterials: {
    url: '/api/welding_materials/',
    method: 'GET'
  },
  getFluxMaterials: {
    url: '/api/flux_materials/',
    method: 'GET'
  },
  getAuxiliaryQuotas: {
    url: '/api/auxiliary_quota_items/',
    method: 'GET'
  },
  getAuxiliaryQuota: {
    url: '/api/auxiliary_quota_items/:id/',
    method: 'GET'
  },
  updateAuxiliaryQuota: {
    url: '/api/auxiliary_quota_items/:id/',
    method: 'PATCH'
  },
  addAuxiliaryQuota: {
    url: '/api/auxiliary_quota_items/',
    method: 'POST'
  },
  deleteAuxiliaryQuota: {
    url: '/api/auxiliary_quota_items/:id/',
    method: 'DELETE'
  },
  getWeldingQuotas: {
    url: '/api/welding_quota_items/',
    method: 'GET'
  },
  getWeldingQuota: {
    url: '/api/welding_quota_items/:id/',
    method: 'GET'
  },
  updateWeldingQuota: {
    url: '/api/welding_quota_items/:id/',
    method: 'PATCH'
  },
  addWeldingQuota: {
    url: '/api/welding_quota_items/',
    method: 'POST'
  },
  deleteWeldingQuota: {
    url: '/api/welding_quota_items/:id/',
    method: 'DELETE'
  }
}
