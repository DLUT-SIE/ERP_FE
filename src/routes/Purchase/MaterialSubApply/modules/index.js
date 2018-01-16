import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const MATERIALSUBAPPLY_GET_LIST_DATA = 'MATERIALSUBAPPLY_GET_LIST_DATA'
const MATERIALSUBAPPLY_ADD_LIST_DATA = 'MATERIALSUBAPPLY_ADD_LIST_DATA'
const MATERIALSUBAPPLY_CHANGE_MODAL = 'MATERIALSUBAPPLY_CHANGE_MODAL'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : MATERIALSUBAPPLY_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : MATERIALSUBAPPLY_ADD_LIST_DATA,
    payload : payload
  }
}

function changeModalAction (payload = {}) {
  return {
    type    : MATERIALSUBAPPLY_CHANGE_MODAL,
    payload : payload
  }
}

export const actions = {
  getListDataAction,
  addListDataAction,
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
    visible: false,
    apply: {},
    itemList: [{}]
  }
})

export default function MaterialSubApply (state = initialState, action) {
  var map = {
    MATERIALSUBAPPLY_GET_LIST_DATA () {
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
    MATERIALSUBAPPLY_ADD_LIST_DATA () {
      let { data } = action.payload
      return state.mergeIn(
        ['pagination'], { total: data.total }
      ).merge({
        list: data.results,
        loading: false
      })
    },
    MATERIALSUBAPPLY_CHANGE_MODAL () {
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
    const { payload = {} } = yield take(MATERIALSUBAPPLY_GET_LIST_DATA)
    const { callback, params } = payload
    const data = yield call(fetchAPI, apis.PurchaseAPI.getMaterialSubApplies, params)
    callback && callback(data)
    yield put(addListDataAction({ data }))
  }
}

export const sagas = [
  getListSaga
]
