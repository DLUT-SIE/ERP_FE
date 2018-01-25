import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const PROCESSTRACK_GET_LIST_DATA = 'PROCESSTRACK_GET_LIST_DATA'
const PROCESSTRACK_ADD_LIST_DATA = 'PROCESSTRACK_ADD_LIST_DATA'
const PROCESSTRACK_CHANGE_TRACK_MODAL = 'PROCESSTRACK_CHANGE_TRACK_MODAL'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : PROCESSTRACK_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : PROCESSTRACK_ADD_LIST_DATA,
    payload : payload
  }
}

function changeTrackModal (payload = {}) {
  return {
    type    : PROCESSTRACK_CHANGE_TRACK_MODAL,
    payload : payload
  }
}

export const actions = {
  getListDataAction,
  addListDataAction,
  changeTrackModal
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  loading: false,
  pagination: {
    pageSize: 10
  },
  trackModal: {
    visible: false
  }
})

export default function ProcessTrack (state = initialState, action) {
  var map = {
    PROCESSTRACK_GET_LIST_DATA () {
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
    PROCESSTRACK_ADD_LIST_DATA () {
      let { data } = action.payload
      return state.mergeIn(
        ['pagination'], { total: data.count }
      ).merge({
        list: data.results,
        loading: false
      })
    },
    PROCESSTRACK_CHANGE_TRACK_MODAL () {
      return state.mergeIn(['trackModal'], action.payload)
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
    const { payload = {} } = yield take(PROCESSTRACK_GET_LIST_DATA)
    const { callback, params } = payload
    const data = yield call(fetchAPI, apis.PurchaseAPI.getProcessFollowingInfos, params)
    callback && callback(data)
    yield put(addListDataAction({ data }))
  }
}

export const sagas = [
  getListSaga
]
