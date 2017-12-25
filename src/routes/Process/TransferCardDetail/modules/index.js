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
const FIRST_PAGE_SIZE = 5
const PAGE_SIZE = 10
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

export const actions = {
  getCardDataAction,
  getProcessDataAction
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  cardInfo: {},
  pagination: {
    pageSize: 10
  }
})

export default function TransferCardDetail (state = initialState, action) {
  var map = {
    TRANSCARDDETAIL_ADD_CARD_DATA () {
      const { data } = action.payload
      console.log('data', data)
      return state.merge({
        cardInfo: data
      })
    },
    TRANSCARDDETAIL_GET_PROCESS_DATA () {
      let { params = {} } = action.payload
      return state.mergeIn(
        ['pagination'], {
          current: +(params.page || 1),
          pageSize: +(params.limit || PAGE_SIZE)
        }
      )
    },
    TRANSCARDDETAIL_ADD_PROCESS_DATA () {
      const { data } = action.payload
      const { count, results } = data
      console.log('process data', data)
      return state.merge({
        processList: results,
        pagination: {
          totalPage: count <= FIRST_PAGE_SIZE ? 1 : Math.ceil((count - FIRST_PAGE_SIZE) / PAGE_SIZE)
        }
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
export function *getCardSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(TRANSCARDDETAIL_GET_CARD_DATA)
    const { callback, params, id } = payload
    const { url, method } = apis.ProcessAPI.getTransferCard
    const api = {
      url: url(id),
      method
    }
    const data = yield call(fetchAPI, api, params)
    callback && callback(data)
    yield put(addCardDataAction({ data }))
  }
}

export function *getProcessSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(TRANSCARDDETAIL_GET_PROCESS_DATA)
    const { callback, params } = payload
    const data = yield call(fetchAPI, apis.ProcessAPI.getTransferCardProcess, params)
    callback && callback(data)
    yield put(addProcessDataAction({ data }))
  }
}

export const sagas = [
  getCardSaga,
  getProcessSaga
]
