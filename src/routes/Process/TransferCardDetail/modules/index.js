import { put, call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------
const TRANSCARDDETAIL_GET_CARD_DATA = 'TRANSCARDDETAIL_GET_CARD_DATA'
const TRANSCARDDETAIL_ADD_CARD_DATA = 'TRANSCARDDETAIL_ADD_CARD_DATA'
const TRANSCARDDETAIL_GET_PROCESS_DATA = 'TRANSCARDDETAIL_GET_PROCESS_DATA'
const TRANSCARDDETAIL_ADD_PROCESS_DATA = 'TRANSCARDDETAIL_ADD_PROCESS_DATA'
const TRANSCARDDETAIL_CHANGE_CARD_MODAL = 'TRANSCARDDETAIL_CHANGE_CARD_MODAL'
// ------------------------------------
// Actions
// ------------------------------------
function getCardDataAction (body) {
  return {
    type: TRANSCARDDETAIL_GET_CARD_DATA,
    payload: body
  }
}

function addCardDataAction (payload) {
  return {
    type: TRANSCARDDETAIL_ADD_CARD_DATA,
    payload: payload
  }
}

function getProcessDataAction (body) {
  return {
    type: TRANSCARDDETAIL_GET_PROCESS_DATA,
    payload: body
  }
}

function addProcessDataAction (payload) {
  return {
    type: TRANSCARDDETAIL_ADD_PROCESS_DATA,
    payload: payload
  }
}

function changeCardModalAction (payload) {
  return {
    type: TRANSCARDDETAIL_CHANGE_CARD_MODAL,
    payload: payload
  }
}

export const actions = {
  getCardDataAction,
  getProcessDataAction,
  changeCardModalAction
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  cardInfo: {},
  pagination: {
    pageSize: 10
  },
  processList: [],
  cardModal: {
    visible: false
  }
})

export default function TransferCardDetail (state = initialState, action) {
  var map = {
    TRANSCARDDETAIL_ADD_CARD_DATA () {
      const { data } = action.payload
      return state.merge({
        cardInfo: data
      })
    },
    TRANSCARDDETAIL_GET_PROCESS_DATA () {
      let { params = {} } = action.payload
      return state.mergeIn(
        ['pagination'], {
          current: +(params.current || 1),
          pageSize: +(params.limit)
        }
      )
    },
    TRANSCARDDETAIL_ADD_PROCESS_DATA () {
      const { data, firstPageSize, pageSize } = action.payload
      const { count, results } = data
      return state.mergeIn(
        ['pagination'], {
          totalPage: count <= firstPageSize ? 1 : Math.ceil((count - firstPageSize) / pageSize) + 1
        }
      ).merge({
        processList: results
      })
    },
    TRANSCARDDETAIL_CHANGE_CARD_MODAL () {
      return state.mergeIn(['cardModal'], action.payload)
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
export function *getCardSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(TRANSCARDDETAIL_GET_CARD_DATA)
    const { callback, params, id } = payload
    const data = yield call(fetchAPI, apis.ProcessAPI.getTransferCard, params, { id })
    callback && callback(data)
    yield put(addCardDataAction({ data }))
  }
}

export function *getProcessSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(TRANSCARDDETAIL_GET_PROCESS_DATA)
    const { callback, params } = payload
    const data = yield call(fetchAPI, apis.ProcessAPI.getTransferCardProcess, {
      offset: params.offset,
      limit: params.limit
    })
    callback && callback(data)
    yield put(addProcessDataAction({ data, firstPageSize: params.firstPageSize, pageSize: params.pageSize }))
  }
}

export const sagas = [
  getCardSaga,
  getProcessSaga
]
