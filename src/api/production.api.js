/**
 * Created by lh on 2017/12/29.
 */
export default{
  getProductionPlan: {
    url: '/api/production_plans/',
    method: 'GET'
  },
  getProductionPlanDetail: {
    url: (id) => (`/api/production_plans/${id}/`),
    method: 'GET'
  },
  deleteProductionPlan: {
    url: '/api/production_plans/',
    method: 'DELETE'
  },
  updateProductionPlan: {
    url: (id) => (`/api/production_plans/${id}/`),
    method: 'PATCH'
  },
  getProcessDetail: {
    url: '/api/process_details/',
    method: 'GET'
  },
  getProcessDetailItem: {
    url: (id) => (`/api/process_details/${id}/`),
    method: 'GET'
  },
  getPlanStatusProcessDetail: {
    url: '/api/process_details/',
    method: 'GET'
  },
  updateProcessDetails: {
    url: (id) => (`/api/process_details/${id}/`),
    method: 'PATCH'
  },
  getProductionWorkGroup: {
    url: '/api/production_work_groups/',
    method: 'GET'
  }
}
