import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const STATUSBACKTRACK_GET_LIST_DATA = 'STATUSBACKTRACK_GET_LIST_DATA'
const STATUSBACKTRACK_ADD_LIST_DATA = 'STATUSBACKTRACK_ADD_LIST_DATA'
const STATUSBACKTRACK_CHANGE_STATUS_MODAL = 'STATUSBACKTRACK_CHANGE_STATUS_MODAL'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : STATUSBACKTRACK_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : STATUSBACKTRACK_ADD_LIST_DATA,
    payload : payload
  }
}

function changeStatusModalAction (payload = {}) {
  return {
    type    : STATUSBACKTRACK_CHANGE_STATUS_MODAL,
    payload : payload
  }
}

export const actions = {
  getListDataAction,
  addListDataAction,
  changeStatusModalAction
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  loading: false,
  pagination: {
    pageSize: 10
  },
  columns: [],
  modal: {
    visible: false
  }
})

export default function StatusBackTrack (state = initialState, action) {
  var map = {
    STATUSBACKTRACK_GET_LIST_DATA () {
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
    STATUSBACKTRACK_ADD_LIST_DATA () {
      let { data } = action.payload
      return state.mergeIn(
        ['pagination'], { total: data.count }
      ).merge({
        loading: false,
        list: data.results
      })
    },
    STATUSBACKTRACK_CHANGE_STATUS_MODAL () {
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
    const { payload = {} } = yield take(STATUSBACKTRACK_GET_LIST_DATA)
    const { callback, params } = payload
    const data = yield call(fetchAPI, apis.PurchaseAPI.getBiddingSheets, params)
    callback && callback(data)
    yield put(addListDataAction({ data: data }))
  }
}

export const sagas = [
  getListSaga
]
