import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import _ from 'lodash'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const WELDING_GET_LIST_DATA = 'WELDING_GET_LIST_DATA'
const WELDING_ADD_LIST_DATA = 'WELDING_ADD_LIST_DATA'
const WELDING_GET_LIBRARY_DATA = 'WELDING_GET_LIBRARY_DATA'
const WELDING_ADD_LIBRARY_DATA = 'WELDING_ADD_LIBRARY_DATA'
const WELDING_GET_MATERIALS_DATA = 'WELDING_GET_MATERIALS_DATA'
const WELDING_ADD_MATERIALS_DATA = 'WELDING_ADD_MATERIALS_DATA'
const WELDING_RESET_DATA = 'WELDING_RESET_DATA'
const WELDING_CHANGE_MODAL_DATA = 'WELDING_CHANGE_MODAL_DATA'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : WELDING_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : WELDING_ADD_LIST_DATA,
    payload : payload
  }
}

function getLibraryDataAction (body) {
  return {
    type    : WELDING_GET_LIBRARY_DATA,
    payload : body
  }
}

function addLibraryDataAction (payload = {}) {
  return {
    type    : WELDING_ADD_LIBRARY_DATA,
    payload : payload
  }
}

function getMaterialsAction (payload = {}) {
  return {
    type    : WELDING_GET_MATERIALS_DATA,
    payload : payload
  }
}

function addMaterialsAction (payload = {}) {
  return {
    type    : WELDING_ADD_MATERIALS_DATA,
    payload : payload
  }
}

function resetDataAction (payload = {}) {
  return {
    type    : WELDING_RESET_DATA,
    payload : payload
  }
}

function changeModalAction (payload = {}) {
  return {
    type    : WELDING_CHANGE_MODAL_DATA,
    payload : payload
  }
}

export const actions = {
  getListDataAction,
  getLibraryDataAction,
  getMaterialsAction,
  resetDataAction,
  changeModalAction
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  loading: false,
  pagination: {
    pageSize: 10
  },
  modal: {
    visible: false
  },
  workOrderInfo: {},
  list: []
})

export default function WeldingQuota (state = initialState, action) {
  var map = {
    WELDING_GET_LIST_DATA () {
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
    WELDING_ADD_LIST_DATA () {
      let { data } = action.payload
      const { count, results } = data
      return state.mergeIn(
        ['pagination'], { total: count }
      ).merge({
        list: results,
        loading: false
      })
    },
    WELDING_ADD_LIBRARY_DATA () {
      let { data } = action.payload
      return state.merge({
        workOrderInfo: data.results[0] || {}
      })
    },
    WELDING_ADD_MATERIALS_DATA () {
      let { data } = action.payload
      const materials = _.map(data.results, (item) => {
        return {
          value: item.id,
          label: item.name
        }
      })
      return state.merge({
        materials: materials
      })
    },
    WELDING_RESET_DATA () {
      return state.merge({
        workOrderInfo: {},
        list: []
      })
    },
    WELDING_CHANGE_MODAL_DATA () {
      return state.mergeIn(['modal'], action.payload)
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
    const { payload = {} } = yield take(WELDING_GET_LIST_DATA)
    const { callback, params = {} } = payload
    const data = yield call(fetchAPI, apis.ProcessAPI.getWeldingQuotas, params)
    callback && callback(data)
    yield put(addListDataAction({ data: data }))
  }
}

export function *getLibrarySaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(WELDING_GET_LIBRARY_DATA)
    const { callback, params = {} } = payload
    const data = yield call(fetchAPI, apis.ProcessAPI.getQuotaList, params)
    callback && callback(data)
    yield put(addLibraryDataAction({ data: data }))
  }
}

export function *getMaterialsSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(WELDING_GET_MATERIALS_DATA)
    const { params = {} } = payload
    const data = yield call(fetchAPI, apis.ProcessAPI.getTotalWeldingMaterials, params)
    yield put(addMaterialsAction({ data: data }))
  }
}

export const sagas = [
  getListSaga,
  getLibrarySaga,
  getMaterialsSaga
]
