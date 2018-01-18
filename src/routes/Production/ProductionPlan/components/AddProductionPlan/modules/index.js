import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const ADD_PRODUCTION_PLAN_GET_LIST_DATA = 'ADD_PRODUCTION_PLAN_GET_LIST_DATA'
const ADD_PRODUCTION_PLAN_ADD_LIST_DATA = 'ADD_PRODUCTION_PLAN_ADD_LIST_DATA'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : ADD_PRODUCTION_PLAN_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : ADD_PRODUCTION_PLAN_ADD_LIST_DATA,
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

export default function AddProductionPlan (state = initialState, action) {
  var map = {
    ADD_PRODUCTION_PLAN_GET_LIST_DATA () {
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
    ADD_PRODUCTION_PLAN_ADD_LIST_DATA () {
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

export function *getListSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(ADD_PRODUCTION_PLAN_GET_LIST_DATA)
    const { callback, params } = payload
    const data = yield call(fetchAPI, apis.ProductionAPI.getNonProductionPlan, params)
    callback && callback(data)
    yield put(addListDataAction({ data: data }))
  }
}

export const sagas = [
  getListSaga
]
