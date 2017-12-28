import { call, take } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const EMP_GET_INIT_DATA = 'EMP_GET_INIT_DATA'

// ------------------------------------
// Actions
// ------------------------------------

function getInitDataAction (body) {
  return {
    type    : EMP_GET_INIT_DATA,
    payload : body
  }
}

export const actions = {
  getInitDataAction
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

export default function PendingOrder (state = initialState, action) {
  var map = {
    EMP_GET_INIT_DATA () {
      let { params = {} } = action.payload
      return state.mergeIn(
        ['pagination'], {
          current: +(params.page || 1),
          pageSize: +(params.limit)
        }
      ).set(
        'loading', true
      )
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
export function *employeeInitSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(EMP_GET_INIT_DATA)
    const { callback, params } = payload
    const [ list ] = yield [
      call(fetchAPI, apis.getUserList, params)
    ]
    callback && callback({ list })
  }
}

export const sagas = [
  employeeInitSaga
]
