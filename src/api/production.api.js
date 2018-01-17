/**
 * Created by lh on 2017/12/29.
 */
export default{
  getProductionPlan: {
    url: '/api/production_plans/',
    method: 'GET'
  },
  getProductionPlanDetail: {
    url: '/api/production_plans/:id/',
    method: 'GET'
  },
  deleteProductionPlan: {
    url: '/api/production_plans/',
    method: 'DELETE'
  },
  updateProductionPlan: {
    url: '/api/production_plans/:id/',
    method: 'PATCH'
  },
  getNonProductionPlan: {
    url: '/api/work_orders/non_production_plans/',
    method: 'GET'
  },
  createProductionPlan: {
    url: '/api/production_plans/',
    method: 'POST'
  },
  getProcessDetail: {
    url: '/api/process_details/',
    method: 'GET'
  },
  getProcessDetailItem: {
    url: '/api/process_details/:id/',
    method: 'GET'
  },
  getPlanStatusProcessDetail: {
    url: '/api/process_details/',
    method: 'GET'
  },
  updateProcessDetails: {
    url: '/api/process_details/:id/',
    method: 'PATCH'
  },
  getProductionWorkGroup: {
    url: '/api/production_work_groups/',
    method: 'GET'
  },
  getProductionUsers: {
    url: '/api/production_users/',
    method: 'GET'
  },
  deleteProductionUser: {
    url: '/api/production_users/:id/',
    method: 'DELETE'
  },
  updateProductionUserGroup: {
    url: '/api/production_users/:id/',
    method: 'PATCH'
  },
  getNonProductionUsers: {
    url: '/api/users/non_production_users/',
    method: 'GET'
  },
  createProductionUsers: {
    url: '/api/production_users/',
    method: 'POST'
  },
  getWeldingMaterialApplyCards: {
    url : '/api/welding_material_apply_cards/',
    method: 'GET'
  },
  getSteelMaterialApplyCards: {
    url : '/api/steel_material_apply_cards/',
    method: 'GET'
  },
  getBroughtInMaterialApplyCards: {
    url : '/api/bought_in_component_apply_cards/',
    method: 'GET'
  },
  getAuxiliaryMaterialApplyCards: {
    url : '/api/auxiliary_material_apply_cards/',
    method: 'GET'
  },
  createWeldingMaterialApplyCards: {
    url : '/api/welding_material_apply_cards/',
    method: 'POST'
  },
  createSteelMaterialApplyCards: {
    url : '/api/steel_material_apply_cards/',
    method: 'POST'
  },
  createBroughtInMaterialApplyCards: {
    url : '/api/bought_in_component_apply_cards/',
    method: 'POST'
  },
  createAuxiliaryMaterialApplyCards: {
    url : '/api/auxiliary_material_apply_cards/',
    method: 'POST'
  },
  getWeldingMaterialApplyCardDetails: {
    url: '/api/welding_material_apply_cards/:id/',
    method: 'GET'
  },
  getSteelMaterialApplyCardDetails: {
    url: '/api/steel_material_apply_cards/:id/',
    method: 'GET'
  },
  getBroughtInMaterialApplyCardDetails: {
    url: '/api/bought_in_component_apply_cards/:id/',
    method: 'GET'
  },
  getAuxiliaryMaterialApplyCardDetails: {
    url: '/api/auxiliary_material_apply_cards/:id/',
    method: 'GET'
  },
  getWeldingQuotaItems: {
    url : '/api/welding_quota_items/production/',
    method: 'GET'
  },
  getBroughtInItems: {
    url : '/api/bought_in_items/production/',
    method: 'GET'
  },
  getAuxiliaryQuotaItems: {
    url : '/api/auxiliary_quota_items/production/',
    method: 'GET'
  },
  getProcurementMaterial: {
    url : '/api/procurement_materials/production/',
    method: 'GET'
  },
  getWeldingMaterialRefundCards: {
    url : '/api/welding_material_refund_cards/',
    method: 'GET'
  },
  getSteelMaterialRefundCards: {
    url : '/api/steel_material_refund_cards/',
    method: 'GET'
  },
  getBroughtInMaterialRefundCards: {
    url : '/api/bought_in_component_refund_cards/',
    method: 'GET'
  },
  /* getAuxiliaryMaterialRefundCards: {
    url : '/api/auxiliary_material_refund_cards/',
    method: 'GET'
  }, */
  getWeldingMaterialRefundCardDetails: {
    url: '/api/welding_material_refund_cards/:id/',
    method: 'GET'
  },
  getSteelMaterialRefundCardDetails: {
    url: '/api/steel_material_refund_details/:id/',
    method: 'GET'
  },
  getBroughtInMaterialRefundCardDetails: {
    url: '/api/bought_in_component_refund_details/:id/',
    method: 'GET'
  },
  getAuxiliaryMaterialRefundCardDetails: {
    url: '/api/auxiliary_material_refund_cards/:id/',
    method: 'GET'
  },
  getWeldingMaterialCompletedApplyCards: {
    url: '/api/welding_material_apply_cards/',
    method: 'GET'
  },
  getSteelMaterialCompletedApplyCards: {
    url: '/api/steel_material_apply_cards/',
    method: 'GET'
  },
  getBroughtInMaterialCompletedApplyCards: {
    url: '/api/bought_in_component_apply_cards/',
    method: 'GET'
  },
  createWeldingMaterialRefundCards: {
    url: '/api/welding_material_refund_cards/',
    method: 'POST'
  },
  createSteelMaterialRefundCards: {
    url: '/api/steel_material_refund_cards/',
    method: 'POST'
  },
  createBroughtInMaterialRefundCards: {
    url: '/api/bought_in_component_refund_cards/',
    method: 'POST'
  },
  getSubMaterialLedgers: {
    url: '/api/sub_material_ledgers/',
    method: 'GET'
  },
  getSubMaterialLedgerDetail: {
    url: '/api/sub_material_ledgers/:id/',
    method: 'GET'
  },
  updateSubMaterialLedger: {
    url: '/api/sub_material_ledgers/:id/',
    method: 'PATCH'
  }
}
