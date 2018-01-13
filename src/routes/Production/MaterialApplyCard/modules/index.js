import { put, call, take } from 'redux-saga/effects'
import _ from 'lodash'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { apis } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------

const APPLY_CARD_GET_LIST_DATA = 'APPLY_CARD_GET_LIST_DATA'
const APPLY_CARD_ADD_LIST_DATA = 'APPLY_CARD_ADD_LIST_DATA'
const APPLY_CARD_CHANGE_MODAL_DATA = 'APPLY_CARD_CHANGE_MODAL_DATA'
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------

function getListDataAction (body) {
  return {
    type    : APPLY_CARD_GET_LIST_DATA,
    payload : body
  }
}

function addListDataAction (payload = {}) {
  return {
    type    : APPLY_CARD_ADD_LIST_DATA,
    payload : payload
  }
}
function changeModalAction (payload = {}) {
  return {
    type    :APPLY_CARD_CHANGE_MODAL_DATA,
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
    visible: false
  }
})

export default function ApplyCard (state = initialState, action) {
  var map = {
    APPLY_CARD_GET_LIST_DATA () {
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
    APPLY_CARD_ADD_LIST_DATA () {
      let { data } = action.payload
      return state.mergeIn(
        ['pagination'], { total: data.count }
      ).merge({
        list: data.results,
        loading: false
      })
    },
    APPLY_CARD_CHANGE_MODAL_DATA () {
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
const mapRequest = {
  welding_material_apply_cards: apis.ProductionAPI.getWeldingMaterialApplyCards,
  steel_material_apply_cards: apis.ProductionAPI.getSteelMaterialApplyCards,
  bought_in_component_apply_cards: apis.ProductionAPI.getBroughtInMaterialApplyCards,
  auxiliary_material_apply_cards: apis.ProductionAPI.getAuxiliaryMaterialApplyCards
}
export function *getListSaga (type, body) {
  while (true) {
    const { payload = {} } = yield take(APPLY_CARD_GET_LIST_DATA)
    const { callback, params } = payload
    let category = mapRequest[params.category]
    if (_.isUndefined(category)) {
      category = apis.ProductionAPI.getWeldingMaterialApplyCards
    }
    const data = yield call(fetchAPI, category, params)
    callback && callback(data)
    yield put(addListDataAction({ data: data }))
  }
}

export const sagas = [
  getListSaga
]
