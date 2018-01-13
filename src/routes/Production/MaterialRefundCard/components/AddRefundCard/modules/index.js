import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import _ from 'lodash'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const ADD_WELD_APPLY_CARD_GET_LIST_DATA = 'ADD_WELD_APPLY_CARD_GET_LIST_DATA'
const ADD_WELD_APPLY_CARD_ADD_LIST_DATA = 'ADD_WELD_APPLY_CARD_ADD_LIST_DATA'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : ADD_WELD_APPLY_CARD_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : ADD_WELD_APPLY_CARD_ADD_LIST_DATA,
    payload : payload
  }
}

export const actions = {
  getListDataAction,
  addListDataAction
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  loading: false,
  pagination: {
    pageSize: 10
  }
})

export default function AddWeldApplyCardUser (state = initialState, action) {
  var map = {
    ADD_WELD_APPLY_CARD_GET_LIST_DATA () {
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
    ADD_WELD_APPLY_CARD_ADD_LIST_DATA () {
      let { data } = action.payload
      return state.mergeIn(
        ['pagination'], { total: data.count }
      ).merge({
        list: data.results,
        loading: false
      })
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
const mapRequest = {
  '4': apis.ProductionAPI.getWeldingQuotaItems,
  '1': apis.ProductionAPI.getAuxiliaryQuotaItems,
  '3': apis.ProductionAPI.getBroughtInItems
}
export function *getListSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(ADD_WELD_APPLY_CARD_GET_LIST_DATA)
    const { callback, params } = payload
    let detailType = mapRequest[params.detail_type]
    console.log('params', params)
    if (_.isUndefined(detailType)) {
      detailType = apis.ProductionAPI.getWeldingQuotaItems
    }
    const data = yield call(fetchAPI, detailType, params)
    callback && callback(data)
    yield put(addListDataAction({ data: data }))
  }
}

export const sagas = [
  getListSaga
]
