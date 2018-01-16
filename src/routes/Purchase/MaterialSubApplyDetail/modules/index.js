import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const MATERIALSUBAPPLYDETAIL_GET_LIST_DATA = 'MATERIALSUBAPPLYDETAIL_GET_LIST_DATA'
const MATERIALSUBAPPLYDETAIL_ADD_LIST_DATA = 'MATERIALSUBAPPLYDETAIL_ADD_LIST_DATA'
const MATERIALSUBAPPLYDETAIL_CHANGE_APPLY_MODAL = 'MATERIALSUBAPPLYDETAIL_CHANGE_APPLY_MODAL'
const MATERIALSUBAPPLYDETAIL_CHANGE_ITEM_MODAL = 'MATERIALSUBAPPLYDETAIL_CHANGE_ITEM_MODAL'

// ------------------------------------
// Actions
// ------------------------------------

function getDataAction (body) {
  return {
    type    : MATERIALSUBAPPLYDETAIL_GET_LIST_DATA,
    payload : body
  }
}

function addDataAction (payload = {}) {
  return {
    type    : MATERIALSUBAPPLYDETAIL_ADD_LIST_DATA,
    payload : payload
  }
}

function changeApplyModal (payload = {}) {
  return {
    type    : MATERIALSUBAPPLYDETAIL_CHANGE_APPLY_MODAL,
    payload : payload
  }
}

function changeItemModal (payload = {}) {
  return {
    type    : MATERIALSUBAPPLYDETAIL_CHANGE_ITEM_MODAL,
    payload : payload
  }
}

export const actions = {
  getDataAction,
  addDataAction,
  changeApplyModal,
  changeItemModal
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  apply: {
    sub_apply_items: [],
    sub_spply_comments: []
  },
  applyModal: {
    visible: false
  },
  itemModal: {
    visible: false
  }
})

export default function MaterialSubApplyDetail (state = initialState, action) {
  var map = {
    MATERIALSUBAPPLYDETAIL_ADD_LIST_DATA () {
      let { data } = action.payload
      return state.merge({
        apply: data
      })
    },
    MATERIALSUBAPPLYDETAIL_CHANGE_APPLY_MODAL () {
      return state.mergeIn(['applyModal'], action.payload)
    },
    MATERIALSUBAPPLYDETAIL_CHANGE_ITEM_MODAL () {
      return state.mergeIn(['itemModal'], action.payload)
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

export function *getDataSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(MATERIALSUBAPPLYDETAIL_GET_LIST_DATA)
    const { callback, params = {}, id } = payload
    const data = yield call(fetchAPI, apis.PurchaseAPI.getMaterialSubApply, params, { id })
    callback && callback(data)
    yield put(addDataAction({ data: data }))
  }
}

export const sagas = [
  getDataSaga
]
