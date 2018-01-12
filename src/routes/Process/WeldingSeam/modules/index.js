import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import _ from 'lodash'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const WELDINGSEAM_GET_LIST_DATA = 'WELDINGSEAM_GET_LIST_DATA'
const WELDINGSEAM_ADD_LIST_DATA = 'WELDINGSEAM_ADD_LIST_DATA'
const WELDINGSEAM_GET_LIBRARY_DATA = 'WELDINGSEAM_GET_LIBRARY_DATA'
const WELDINGSEAM_ADD_LIBRARY_DATA = 'WELDINGSEAM_ADD_LIBRARY_DATA'
const WELDINGSEAM_GET_MATERIALS_DATA = 'WELDINGSEAM_GET_MATERIALS_DATA'
const WELDINGSEAM_ADD_MATERIALS_DATA = 'WELDINGSEAM_ADD_MATERIALS_DATA'
const WELDINGSEAM_RESET_DATA = 'WELDINGSEAM_RESET_DATA'
const WELDINGSEAM_CHANGE_WELDINGSEAM_MODAL = 'WELDINGSEAM_CHANGE_WELDINGSEAM_MODAL'
const WELDINGSEAM_CHANGE_WELDINGJOINT_MODAL = 'WELDINGSEAM_CHANGE_WELDINGJOINT_MODAL'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : WELDINGSEAM_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : WELDINGSEAM_ADD_LIST_DATA,
    payload : payload
  }
}

function getLibraryDataAction (body) {
  return {
    type    : WELDINGSEAM_GET_LIBRARY_DATA,
    payload : body
  }
}

function addLibraryDataAction (payload = {}) {
  return {
    type    : WELDINGSEAM_ADD_LIBRARY_DATA,
    payload : payload
  }
}

function getMaterialsAction (payload = {}) {
  return {
    type    : WELDINGSEAM_GET_MATERIALS_DATA,
    payload : payload
  }
}

function addMaterialsAction (payload = {}) {
  return {
    type    : WELDINGSEAM_ADD_MATERIALS_DATA,
    payload : payload
  }
}

function resetDataAction (payload = {}) {
  return {
    type    : WELDINGSEAM_RESET_DATA,
    payload : payload
  }
}

function changeWeldingSeamModalAction (payload = {}) {
  return {
    type    : WELDINGSEAM_CHANGE_WELDINGSEAM_MODAL,
    payload : payload
  }
}

function changeWeldingJointModalAction (payload = {}) {
  return {
    type    : WELDINGSEAM_CHANGE_WELDINGJOINT_MODAL,
    payload : payload
  }
}

export const actions = {
  getListDataAction,
  getLibraryDataAction,
  getMaterialsAction,
  resetDataAction,
  changeWeldingSeamModalAction,
  changeWeldingJointModalAction
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  loading: false,
  pagination: {
    pageSize: 10
  },
  weldingSeamModal: {
    visible: false
  },
  weldingJointModal: {
    visible: false
  },
  workOrderInfo: {},
  weldProSpeci: {}
})

export default function WeldingSeam (state = initialState, action) {
  var map = {
    WELDINGSEAM_GET_LIST_DATA () {
      let { params = {} } = action.payload
      return state.mergeIn(
        ['pagination'], {
          current: +(params.page || 1),
          pageSize: +(params.limit || PAGE_SIZE)
        }
      ).set(
        'loading', true
      )
    },
    WELDINGSEAM_ADD_LIST_DATA () {
      let { data } = action.payload
      const { count, results } = data
      return state.mergeIn(
        ['pagination'], { total: count }
      ).merge({
        list: results,
        loading: false
      })
    },
    WELDINGSEAM_ADD_LIBRARY_DATA () {
      const { quotaData, weldProSpeciData, weldCertifiData } = action.payload
      const weldCertifiList = _.map(weldCertifiData.results, (item) => ({
        value: item.id,
        label: item.name
      }))
      return state.merge({
        workOrderInfo: quotaData.results[0] || {},
        weldProSpeci: weldProSpeciData.results[0] || {},
        weldCertifiList
      })
    },
    WELDINGSEAM_ADD_MATERIALS_DATA () {
      let { weldingMaterials, fluxMaterials } = action.payload
      weldingMaterials = _.map(weldingMaterials.results, (item) => {
        return {
          value: item.id,
          label: item.name
        }
      })
      fluxMaterials = _.map(fluxMaterials.results, (item) => {
        return {
          value: item.id,
          label: item.name
        }
      })
      return state.merge({
        weldingMaterials,
        fluxMaterials
      })
    },
    WELDINGSEAM_RESET_DATA () {
      return state.merge({
        workOrderInfo: {},
        list: []
      })
    },
    WELDINGSEAM_CHANGE_WELDINGSEAM_MODAL () {
      return state.mergeIn(['weldingSeamModal'], action.payload)
    },
    WELDINGSEAM_CHANGE_WELDINGJOINT_MODAL () {
      return state.mergeIn(['weldingJointModal'], action.payload)
    }
  }

  if (map[action.type]) {
    return map[action.type]()
  } else {
    return state
  }
}

// ------------------------------------
// Sagas
// ------------------------------------
export function *getListSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(WELDINGSEAM_GET_LIST_DATA)
    const { callback, params = {} } = payload
    const data = yield call(fetchAPI, apis.ProcessAPI.getWeldingSeams, params)
    callback && callback(data)
    yield put(addListDataAction({ data }))
  }
}

export function *getLibrarySaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(WELDINGSEAM_GET_LIBRARY_DATA)
    const { callback, params = {} } = payload
    const [ quotaData, weldProSpeciData, weldCertifiData ] = yield [
      call(fetchAPI, apis.ProcessAPI.getQuotaList, params),
      call(fetchAPI, apis.ProcessAPI.getWeldingProcessSpecifications, {
        work_order_uid: params.work_order_uid
      }),
      call(fetchAPI, apis.ProcessAPI.getWeldingCertifications)
    ]
    callback && callback(quotaData)
    yield put(addLibraryDataAction({ quotaData, weldProSpeciData, weldCertifiData }))
  }
}

export function *getMaterialsSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(WELDINGSEAM_GET_MATERIALS_DATA)
    const { params = {} } = payload
    const [ weldingMaterials, fluxMaterials ] = yield [
      call(fetchAPI, apis.ProcessAPI.getWeldingMaterials, params),
      call(fetchAPI, apis.ProcessAPI.getFluxMaterials, params)
    ]
    yield put(addMaterialsAction({ weldingMaterials, fluxMaterials }))
  }
}

export const sagas = [
  getListSaga,
  getLibrarySaga,
  getMaterialsSaga
]
