export const SELL_TYPE_LIST = [
  {
    value: 0,
    label: '内销'
  },
  {
    value: 1,
    label: '外销'
  }
]

export const CICULATION_ROUTE_LIST = [
  {
    value: 0,
    label: 'H1'
  },
  {
    value: 1,
    label: 'J'
  },
  {
    value: 3,
    label: 'ZM'
  },
  {
    value: 4,
    label: 'R'
  },
  {
    value: 5,
    label: 'GY'
  },
  {
    value: 6,
    label: 'DY'
  },
  {
    value: 7,
    label: 'XZ'
  }
]

export const PROCESS_ROUTE_LIST = [
  {
    value: 0,
    label: 'W'
  },
  {
    value: 1,
    label: 'W1'
  },
  {
    value: 2,
    label: 'W2'
  },
  {
    value: 3,
    label: 'W3'
  },
  {
    value: 4,
    label: 'W4'
  },
  {
    value: 5,
    label: 'W5'
  },
  {
    value: 6,
    label: 'W6'
  },
  {
    value: 7,
    label: 'W25'
  },
  {
    value: 8,
    label: 'P01'
  },
  {
    value: 9,
    label: 'P02'
  },
  {
    value: 10,
    label: 'R'
  },
  {
    value: 11,
    label: 'R1'
  },
  {
    value: 12,
    label: 'R2'
  },
  {
    value: 13,
    label: 'Z'
  },
  {
    value: 14,
    label: 'H'
  },
  {
    value: 15,
    label: 'M'
  },
  {
    value: 16,
    label: 'L'
  },
  {
    value: 17,
    label: 'Y'
  },
  {
    value: 18,
    label: 'G'
  },
  {
    value: 19,
    label: 'G1'
  },
  {
    value: 20,
    label: 'G2'
  },
  {
    value: 21,
    label: 'G3'
  },
  {
    value: 22,
    label: 'G4'
  },
  {
    value: 23,
    label: 'G5'
  },
  {
    value: 24,
    label: 'X'
  },
  {
    value: 25,
    label: 'J'
  },
  {
    value: 26,
    label: 'K'
  },
  {
    value: 27,
    label: 'D2'
  },
  {
    value: 28,
    label: 'D'
  }
]

export const TASK_PLAN_STATUS = [
  { value: 'true',
    label: '已完成' },
  { value: 'false',
    label: '未完成' }
]
export const TRANSFERCARD_CATEGORY_LIST = [
  {
    value: '0',
    label: '筒体流转卡'
  },
  {
    value: '1',
    label: '封头流转卡'
  },
  {
    value: '2',
    label: '焊接试板流转卡'
  },
  {
    value: '3',
    label: '母材试板流转卡'
  },
  {
    value: '4',
    label: '受压元件流转卡'
  },
  {
    value: '5',
    label: '特别元件流转卡'
  }
]
export const MATERIAL_CATEGORY = [
  { value: 0,
    label: '焊材' },
  { value: 1,
    label: '钢材' },
  { value: 2,
    label: '辅材' },
  { value: 3,
    label: '外购件' }
]

export const WELD_POSITION_LIST = [
  {
    value: 0,
    label: '平焊'
  },
  {
    value: 1,
    label: '横焊'
  },
  {
    value: 2,
    label: '仰焊'
  },
  {
    value: 3,
    label: '立向上焊'
  },
  {
    value: 4,
    label: '全位置焊'
  }
]

export const WELD_METHOD_LIST = [
  {
    value: 0,
    label: '焊条电弧焊'
  },
  {
    value: 1,
    label: '埋弧焊'
  },
  {
    value: 2,
    label: '气体保护焊'
  },
  {
    value: 3,
    label: '氩弧焊'
  }
]
export const PRODUCTION_STATUS = [
  { value: 0,
    label: '必保' },
  {
    value: 1,
    label: '在制'
  }
]
export const MATERIAL_APPLY_CARD = [
  {
    value: 'welding_material_apply_cards',
    label: '焊材'
  }, {
    value: 'steel_material_apply_cards',
    label: '钢材'
  }, {
    value: 'bought_in_component_apply_cards',
    label: '外购件'
  }, {
    value: 'auxiliary_material_apply_cards',
    label: '辅材'
  }
]
export const MATERIAL_REFUND_CARD = [
  {
    value: 'welding_material_refund_cards',
    label: '焊材'
  }, {
    value: 'steel_material_refund_cards',
    label: '钢材'
  }, {
    value: 'bought_in_component_refund_cards',
    label: '外购件'
  }
]
export const MATERIAL_APPLY_CARD_TYPE = {
  WELD: 'welding_material_apply_cards',
  STEEL: 'steel_material_apply_cards',
  BROUGHT_IN: 'bought_in_component_apply_cards',
  AUXILIARY: 'auxiliary_material_apply_cards'
}
export const MATERIAL_REFUND_CARD_TYPE = {
  WELD: 'welding_material_refund_cards',
  STEEL: 'steel_material_refund_cards',
  BROUGHT_IN: 'bought_in_component_refund_cards'
}
// todo: 主材定额，外购件明细，工序性外协明细暂时不知对应的领用单类型
export const DETAILED_TYPE = [{
  value: 4,
  label: '焊材定额'
}, {
  value: 1,
  label: '辅材定额'
}, {
  value: 3,
  label: '外购件定额'
}
]
export const DETAILED_TABLE_CATEGORY_MAP = {
  '辅材定额明细表': 0,
  '主材定额明细表': 1,
  '工序性外协明细表': 2,
  '先投件明细表': 3,
  '外购件明细表': 4,
  '焊缝明细表': 5,
  '装箱外购件明细表': 6,
  '设计库表': 7,
  '焊材明细表': 8,
  '流转卡表': 9,
  '工艺库表': 10
}
export const PROCESS_DETAIL_STATUS = {
  NOT_PLAN: 0,
  PLANED: 1,
  ALLOCATION: 2,
  CONFIRMED: 3,
  INSPECTED: 4
}

export const MATERIAL_CATEGORY_MAP = {
  '其他': 0,
  '焊条': 1,
  '焊丝': 2,
  '焊带': 3,
  '焊剂': 4,
  '板材': 5,
  '型材': 6,
  '外购件': 7,
  '辅助工具': 8
}

export const PROC_QUAL_INDEX_LIST = [
  {
    value: 0,
    label: 'RH24-13-09'
  },
  {
    value: 1,
    label: 'RH24-13-36'
  }
]

export const PURCHASE_ORDER_STATUS_LIST = [
  {
    value: 0,
    label: '创建中订购单'
  },
  {
    value: 1,
    label: '创建完成订购单'
  },
  {
    value: 2,
    label: '审核通过订购单'
  },
  {
    value: 3,
    label: '批准通过订购单'
  },
  {
    value: 4,
    label: '已终止历史订购单'
  }
]

export const BIDDING_SHEET_STATUS_LIST = [
  {
    value: 0,
    label: '标单创建'
  },
  {
    value: 1,
    label: '供应商选择'
  },
  {
    value: 2,
    label: '招标申请选择'
  },
  {
    value: 3,
    label: '招标申请填写'
  },
  {
    value: 4,
    label: '招标中'
  },
  {
    value: 5,
    label: '中标确认'
  },
  {
    value: 6,
    label: '进程跟踪'
  },
  {
    value: 7,
    label: '标单检验'
  },
  {
    value: 8,
    label: '标单入库'
  },
  {
    value: 9,
    label: '标单完成'
  },
  {
    value: 10,
    label: '标单终止'
  }
]

export const MATERIAL_CATEGORY_LIST = [
  {
    value: -1,
    label: '未设置'
  },
  {
    value: 0,
    label: '主材定额'
  },
  {
    value: 1,
    label: '辅材定额'
  },
  {
    value: 2,
    label: '先投件明细'
  },
  {
    value: 3,
    label: '外购件明细'
  },
  {
    value: 4,
    label: '焊材定额'
  },
  {
    value: 5,
    label: '工序性外协明细'
  }
]

export const UNKNOW_COLUMN = {
  title: '未知标题',
  dataIndex: 'unkow_column',
  key: 'unkow_column'
}

export const COLUMNS = {
  action: {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    className: 'column-action'
  },
  work_order_uid: {
    title: '工作令',
    key: 'work_order_uid',
    dataIndex: 'work_order_uid'
  },
  detail: {
    title: '明细表',
    key: 'detail',
    dataIndex: 'detail'
  },
  contract: {
    title: '联系单',
    key: 'contract',
    dataIndex: 'contract'
  },
  production_name: {
    title: '产品名称',
    key: 'name',
    dataIndex: 'name'
  },
  ticket_number: {
    title: '票号',
    key: 'ticket_number',
    dataIndex: 'ticket_number'
  },
  part_number: {
    title: '件号',
    key: 'part_number',
    dataIndex: 'part_number'
  },
  drawing_number: {
    title: '图号',
    key: 'drawing_number',
    dataIndex: 'drawing_number'
  },
  lib_name: {
    title: '名称',
    key: 'name',
    dataIndex: 'name'
  },
  spec: {
    title: '规格',
    key: 'spec',
    dataIndex: 'spec'
  },
  material: {
    title: '材质',
    key: 'material',
    dataIndex: 'material'
  },
  material_num:{
    title: '材料牌号',
    key: 'material',
    dataIndex: 'material'
  },
  send_file: {
    title: '下发文件',
    key: 'send_file',
    dataIndex: 'send_file'
  },
  upload_file: {
    title: '上传招标文件',
    key: 'upload_file',
    dataIndex: 'upload_file'
  },
  pretty_status: {
    title: '文件审核状态',
    key: 'pretty_status',
    dataIndex: 'pretty_status'
  },
  create_work_order: {
    title: '生成工作令',
    key: 'create_work_order',
    dataIndex: 'create_work_order'
  },
  uid: {
    title: '工作令编号',
    key: 'uid',
    dataIndex: 'uid'
  },
  pretty_sell_type: {
    title: '销售类型',
    key: 'pretty_sell_type',
    dataIndex: 'pretty_sell_type'
  },
  client: {
    title: '客户名称',
    key: 'client',
    dataIndex: 'client'
  },
  project: {
    title: '项目名称',
    key: 'project',
    dataIndex: 'project'
  },
  count: {
    title: '数量',
    key: 'count',
    dataIndex: 'count'
  },
  piece_weight: {
    title: '净重(Kg)',
    key: 'piece_weight',
    dataIndex: 'piece_weight'
  },
  total_weight: {
    title: '总重(Kg)',
    key: 'total_weight',
    dataIndex: 'total_weight'
  },
  remark: {
    title: '备注',
    key: 'remark',
    dataIndex: 'remark'
  },
  circulation_route: {
    title: '流转路线',
    key: 'circulation_route',
    dataIndex: 'circulation_route'
  },
  process_route: {
    title: '工序路线',
    key: 'process_route',
    dataIndex: 'process_route'
  },
  transferCard: {
    title: '流转卡',
    key: 'transferCard',
    dataIndex: 'transferCard'
  },
  weldingSeam: {
    title: '焊缝',
    key: 'weldingSeam',
    dataIndex: 'weldingSeam'
  },
  order: {
    title: '序号',
    key: 'order',
    dataIndex: 'order'
  },
  size: {
    title: '规格',
    key: 'size',
    dataIndex: 'size'
  },
  weight: {
    title: '单重(Kg)',
    key: 'weight',
    dataIndex: 'weight'
  },
  operative_norm: {
    title: '执行标准',
    key: 'operative_norm',
    dataIndex: 'operative_norm'
  },
  status: {
    title: '供货状态',
    key: 'status',
    dataIndex: 'status'
  },
  purchase_order_uid: {
    title: '订购单单号',
    key: 'uid',
    dataIndex: 'uid'
  },
  purchase_order_create_dt: {
    title: '创建时间',
    key: 'create_dt',
    dataIndex: 'create_dt'
  },
  part_drawing_number: {
    title: '零件图号',
    key: 'drawing_number',
    dataIndex: 'drawing_number'
  },
  unit_drawing_number: {
    title: '部件图号',
    key: 'parent_drawing_number',
    dataIndex: 'parent_drawing_number'
  },
  category: {
    title: '材料类别',
    key: 'category',
    dataIndex: 'category'
  },
  quota: {
    title: '定额',
    key: 'quota',
    dataIndex: 'quota'
  },
  use_ratio: {
    title: '利用率',
    key: 'use_ratio',
    dataIndex: 'use_ratio'
  },
  press_mark: {
    title: '受压标记',
    key: 'press_mark',
    dataIndex: 'press_mark'
  },
  gross_weight: {
    title: '毛重(Kg)',
    key: 'total_weight',
    dataIndex: 'total_weight'
  },
  mark: {
    title: '牌号',
    key: 'mark',
    dataIndex: 'mark'
  },
  part_name: {
    title: '零件名',
    key: 'name',
    dataIndex: 'name'
  },
  transfer_card_category: {
    title: '流转卡类型',
    key: 'category',
    dataIndex: 'category'
  },
  file_index: {
    title: '流转卡文件编号',
    key: 'file_index',
    dataIndex: 'file_index'
  },
  write_status: {
    title: '编制进度',
    key: 'status',
    dataIndex: 'status'
  },
  collaborative_content: {
    title: '协作内容',
    key: 'remark',
    dataIndex: 'remark'
  },
  weight_alias: {
    title: '重量(Kg)',
    key: 'weight_alias',
    dataIndex: 'weight_alias'
  },
  process_routes: {
    title: '生产路线',
    key: 'process_routes',
    dataIndex: 'process_routes'
  },
  common_uid:{
    title: '编号',
    key: 'uid',
    dataIndex: 'uid'
  },
  common_work_uid: {
    title: '工作令编号',
    key: 'uid',
    dataIndex: 'uid'
  },
  create_dt:{
    title: '日期',
    key: 'create_dt',
    dataIndex: 'create_dt'
  },
  purchaser:{
    title: '采购员',
    key: 'purchaser',
    dataIndex: 'purchaser'
  },
  inspector: {
    title: '检验员',
    key: 'inspector',
    dataIndex: 'inspector'
  },
  weld_seam_uid: {
    title: '焊缝编号',
    key: 'weld_seam_uid',
    dataIndex: 'weld_seam_uid'
  },
  material_mark: {
    title: '焊缝牌号',
    key: 'material_mark',
    dataIndex: 'material_mark'
  },
  common_material_mark: {
    title: '材料牌号',
    key: 'material_mark',
    dataIndex: 'material_mark'
  },
  model: {
    title: '型号',
    key: 'model',
    dataIndex: 'model'
  },
  specification: {
    title: '规格',
    key: 'specification',
    dataIndex: 'specification'
  },
  department: {
    title: '领用单位',
    key: 'department',
    dataIndex: 'department'
  },
  applicant: {
    title: '领料人',
    key: 'applicant',
    dataIndex: 'applicant'
  },
  keeper: {
    title: '记录人',
    key: 'keeper',
    dataIndex: 'keeper'
  },
  sub_order_uid: {
    title: '工作令',
    key: 'sub_order_uid',
    dataIndex: 'sub_order_uid'
  },
  refund_id: {
    title: '退库单编号',
    key: 'id',
    dataIndex: 'id'
  },
  refund_uid: {
    title: '退库单编号',
    key: 'uid',
    dataIndex: 'uid'
  },
  refund_pretty_status: {
    title: '退库单状态',
    key: 'pretty_status',
    dataIndex: 'pretty_status'
  },
  apply_card_pretty_status: {
    title: '领用单状态',
    key: 'pretty_status',
    dataIndex: 'pretty_status'
  },
  material_number: {
    title: '材质编号',
    key: 'material_number',
    dataIndex: 'material_number'
  },
  factory: {
    title: '厂家',
    key: 'factory',
    dataIndex: 'factory'
  },
  entry_count:{
    title: '入库数量',
    key: 'entry_count',
    dataIndex: 'entry_count'
  },
  entry_dt: {
    title: '入库时间',
    key: 'entry_dt',
    dataIndex: 'entry_dt'
  },
  material_batch_number: {
    title: '材料批号',
    key: 'material_batch_number',
    dataIndex: 'material_batch_number'
  },
  welding_seam_uid:{
    title: '焊缝编号',
    key: 'welding_seam_uid',
    dataIndex: 'welding_seam_uid'
  },
  apply_dt:{
    title: '领用时间',
    key: 'apply_dt',
    dataIndex: 'apply_dt'
  },
  apply_uid:{
    title: '领用单编号',
    key: 'apply_uid',
    dataIndex: 'apply_uid'
  },
  actual_weight: {
    title: '实发重量',
    key: 'actual_weight',
    dataIndex: 'actual_weight'
  },
  actual_count: {
    title: '实发数量',
    key: 'actual_count',
    dataIndex: 'actual_count'
  },
  inventory_pretty_status: {
    title: '状态',
    key: 'pretty_status',
    dataIndex: 'pretty_status'
  },
  weld_uid: {
    title: '焊缝编号',
    key: 'uid',
    dataIndex: 'uid'
  },
  weld_position_name: {
    title: '焊接位置',
    key: 'weld_position_name',
    dataIndex: 'weld_position_name'
  },
  seam_type: {
    title: '焊缝类型',
    key: 'seam_type',
    dataIndex: 'seam_type'
  },
  weld_method_1_name: {
    title: '焊接方法1',
    key: 'weld_method_1_name',
    dataIndex: 'weld_method_1_name'
  },
  weld_method_2_name: {
    title: '焊接方法2',
    key: 'weld_method_2_name',
    dataIndex: 'weld_method_2_name'
  },
  length: {
    title: '焊缝长度',
    key: 'length',
    dataIndex: 'length'
  },
  bm_1: {
    title: '母材材质1',
    key: 'bm_1',
    dataIndex: 'bm_1'
  },
  bm_thick_1: {
    title: '母材厚度1',
    key: 'bm_thick_1',
    dataIndex: 'bm_thick_1'
  },
  wm_1_name: {
    title: '焊丝/焊条1',
    key: 'wm_1_name',
    dataIndex: 'wm_1_name'
  },
  ws_1: {
    title: '规格1',
    key: 'ws_1',
    dataIndex: 'ws_1'
  },
  wt_1: {
    title: '焊材厚度1',
    key: 'wt_1',
    dataIndex: 'wt_1'
  },
  weight_1: {
    title: '焊材重量1',
    key: 'weight_1',
    dataIndex: 'weight_1'
  },
  wf_1_name: {
    title: '焊剂1',
    key: 'wf_1_name',
    dataIndex: 'wf_1_name'
  },
  wf_weight_1: {
    title: '焊剂重量1',
    key: 'wf_weight_1',
    dataIndex: 'wf_weight_1'
  },
  bm_2: {
    title: '母材材质2',
    key: 'bm_2',
    dataIndex: 'bm_2'
  },
  bm_thick_2: {
    title: '母材厚度2',
    key: 'bm_thick_2',
    dataIndex: 'bm_thick_2'
  },
  wm_2_name: {
    title: '焊丝/焊条2',
    key: 'wm_2_name',
    dataIndex: 'wm_2_name'
  },
  ws_2: {
    title: '规格2',
    key: 'ws_2',
    dataIndex: 'ws_2'
  },
  wt_2: {
    title: '焊材厚度2',
    key: 'wt_2',
    dataIndex: 'wt_2'
  },
  weight_2: {
    title: '焊材重量2',
    key: 'weight_2',
    dataIndex: 'weight_2'
  },
  wf_2_name: {
    title: '焊剂2',
    key: 'wf_2_name',
    dataIndex: 'wf_2_name'
  },
  wf_weight_2: {
    title: '焊剂重量2',
    key: 'wf_weight_2',
    dataIndex: 'wf_weight_2'
  },
  add: {
    title: '添加',
    key: 'add',
    dataIndex: 'add'
  },
  material_name_in_quota: {
    title: '材质',
    key: 'material_name',
    dataIndex: 'material_name'
  },
  source: {
    title: '货物来源',
    key: 'source',
    dataIndex: 'source'
  },
  pretty_steel_type: {
    title: '入库单类型',
    key: 'pretty_steel_type',
    dataIndex: 'pretty_steel_type'
  },
  steel_type: {
    title: '材料类型',
    key: 'steel_type',
    dataIndex: 'steel_type'
  },
  refunder: {
    title: '退料人',
    key: 'refunder',
    dataIndex: 'refunder'
  },
  apply_count: {
    title: '领用数量',
    key: 'apply_count',
    dataIndex: 'apply_count'
  },
  batch_number: {
    title: '炉批号',
    key: 'batch_number',
    dataIndex: 'batch_number'
  },
  location: {
    title: '库房位置',
    key: 'location',
    dataIndex: 'location'
  },
  refund_times: {
    title: '退库次数',
    key: 'refund_times',
    dataIndex: 'refund_times'
  },
  nesting_diagram: {
    title: '-套料图-',
    key: 'nesting_diagram',
    dataIndex: 'nesting_diagram'
  },
  // 外购件入库
  material_type: {
    title: '材料类型',
    key: 'material_type',
    dataIndex: 'material_type'
  },
  mark_number: {
    title: '-标记号-',
    key: 'mark_number',
    dataIndex: 'mark_number'
  },
  standard_number: {
    title: '-标准号/图号-',
    key: 'standard_number',
    dataIndex: 'standard_number'
  },
  entry_uid: {
    title: '入库单号',
    key: 'entry_uid',
    dataIndex: 'entry_uid'
  },
  apply_card_uid: {
    title: '领用单号',
    key: 'apply_card_uid',
    dataIndex: 'apply_card_uid'
  },
  apply_intentory: {
    title: '领用材料',
    key: 'apply_intentory',
    dataIndex: 'apply_intentory'
  },
  name: {
    title: '-名称-',
    key: 'name',
    dataIndex: 'name'
  },
  suppilier: {
    title: '供货商',
    key: 'suppilier',
    dataIndex: 'suppilier'
  },
  material_name: {
    title: '-材料名称-',
    key: 'material_name',
    dataIndex: 'material_name'
  },
  actual_specification: {
    title: '实发规格',
    key: 'actual_specification',
    dataIndex: 'actual_specification'
  },
  apply_name: {
    title: '请领名称',
    key: 'apply_name',
    dataIndex: 'apply_name'
  },
  apply_specification: {
    title: '请领规格',
    key: 'apply_specification',
    dataIndex: 'apply_specification'
  },
  warehouse_name: {
    title: '库房名称',
    key: 'name',
    dataIndex: 'name'
  },
  pretty_category: {
    title: '材料类别',
    key: 'pretty_category',
    dataIndex: 'pretty_category'
  },
  delivery_dt: {
    title: '交货日期',
    key: 'delivery_dt',
    dataIndex: 'delivery_dt'
  },
  product: {
    title: '产品名称',
    key: 'product',
    dataIndex: 'product'
  },
  production_count: {
    title: '数量（台数）',
    key: 'count',
    dataIndex: 'count'
  },
  output_value: {
    title: '产值（万元）',
    key: 'output_value',
    dataIndex: 'output_value'
  },
  output: {
    title: '产量（吨）',
    key: 'output',
    dataIndex: 'output'
  },
  plan_dt: {
    title: '计划年月',
    key: 'plan_dt',
    dataIndex: 'plan_dt'
  },
  work_order: {
    title: '工作令',
    key: 'work_order',
    dataIndex: 'work_order'
  },
  remarks: {
    title: '备注',
    key: 'remarks',
    dataIndex: 'remarks'
  },
  status_description: {
    title: '状态',
    key: 'status_description',
    dataIndex: 'status_description'
  },
  material_index: {
    title: '工作票号',
    key: 'material_index',
    dataIndex: 'material_index'
  },
  process_id: {
    title: '工序编号',
    key: 'process_id',
    dataIndex: 'process_id'
  },
  process_name: {
    title: '工序',
    key: 'process_name',
    dataIndex: 'process_name'
  },
  work_hour: {
    title: '工时',
    key: 'work_hour',
    dataIndex: 'work_hour'
  },
  estimated_start_dt: {
    title: '计划开始时间',
    key: 'estimated_start_dt',
    dataIndex: 'estimated_start_dt'
  },
  estimated_finish_dt: {
    title: '计划结束时间',
    key: 'estimated_finish_dt',
    dataIndex: 'estimated_finish_dt'
  },
  work_group_list: {
    title: '分配组',
    key: 'work_group_list',
    dataIndex: 'work_group_list'
  },
  work_group_name: {
    title: '分配组',
    key: 'work_group_name',
    dataIndex: 'work_group_name'
  },
  material_name_welding: {
    title: '牌号',
    key: 'material_name',
    dataIndex: 'material_name'
  },
  material_brand: {
    title: '材料牌号',
    key: 'material',
    dataIndex: 'material'
  },
  sub_order: {
    title: '工作令编号',
    key: 'sub_order',
    dataIndex: 'sub_order'
  },
  ticket_number_order: {
    title: '票号',
    key: 'process_material.ticket_number',
    dataIndex: 'process_material.ticket_number'
  },
  name_order: {
    title: '名称',
    key: 'process_material.name',
    dataIndex: 'process_material.name'
  },
  spec_order: {
    title: '规格',
    key: 'process_material.spec',
    dataIndex: 'process_material.spec'
  },
  drawing_number_order: {
    title: '图号',
    key: 'process_material.drawing_number',
    dataIndex: 'process_material.drawing_number'
  },
  material_order: {
    title: '材质',
    key: 'process_material.material',
    dataIndex: 'process_material.material'
  },
  count_order: {
    title: '数量',
    key: 'process_material.count',
    dataIndex: 'process_material.count'
  },
  piece_weight_order: {
    title: '单重',
    key: 'process_material.piece_weight',
    dataIndex: 'process_material.piece_weight'
  },
  weight_order: {
    title: '单重(Kg)',
    key: 'weight',
    dataIndex: 'weight'
  },
  total_weight_order: {
    title: '采购(Kg)',
    key: 'total_weight',
    dataIndex: 'total_weight'
  },
  remark_order: {
    title: '备注',
    key: 'process_material.remark',
    dataIndex: 'process_material.remark'
  },
  finished: {
    title: '是否结束',
    key: 'finished',
    dataIndex: 'finished'

  },
  first_name: {
    title: '姓名',
    key: 'first_name',
    dataIndex: 'first_name'
  },
  phone: {
    title: '电话',
    key: 'phone',
    dataIndex: 'phone'
  },
  mobile: {
    title: '移动电话',
    key: 'mobile',
    dataIndex: 'mobile'
  },
  gender: {
    title: '性别',
    key: 'gender',
    dataIndex: 'gender'
  },
  uid_material_sub_applies: {
    title: '单据编号',
    key: 'uid',
    dataIndex: 'uid'
  },
  production: {
    title: '产品名称',
    key: 'production',
    dataIndex: 'production'
  },
  figure_code: {
    title: '图号',
    key: 'figure_code',
    dataIndex: 'figure_code'
  },
  applicant_material_sub_applies: {
    title: '申请人',
    key: 'applicant',
    dataIndex: 'applicant'
  },
  reason: {
    title: '备注',
    key: 'reason',
    dataIndex: 'reason'
  },
  refund_count: {
    title: '数量',
    key: 'actual_count',
    dataIndex: 'actual_count'
  },
  radio: {
    key: 'radio',
    dataIndex: 'radio'
  },
  process_part_number: {
    title: '件号',
    key: 'process_material.part_number',
    dataIndex: 'process_material.part_number'
  },
  process_parent_drawing_number: {
    title: '部件图号',
    key: 'process_material.parent_drawing_number',
    dataIndex: 'process_material.parent_drawing_number'
  },
  process_piece_weight: {
    title: '净重',
    key: 'process_material.piece_weight',
    dataIndex: 'process_material.piece_weight'
  },
  process_total_weight: {
    title: '净重',
    key: 'process_material.total_weight',
    dataIndex: 'process_material.total_weight'
  },
  bidding_sheet_uid: {
    title: '标单',
    key: 'uid',
    dataIndex: 'uid'
  },
  bidding_sheet_status: {
    title: '当前状态',
    key: 'pretty_status',
    dataIndex: 'pretty_status'
  },
  history: {
    title: '查看历史',
    key: 'history'
  },
  change_status: {
    title: '更改状态',
    key: 'change_status'
  },
  pretty_original_status: {
    title: '更改前状态',
    key: 'pretty_original_status',
    dataIndex: 'pretty_original_status'
  },
  pretty_new_status: {
    title: '更改后状态',
    key: 'pretty_new_status',
    dataIndex: 'pretty_new_status'
  },
  change_dt: {
    title: '更改日期',
    key: 'change_dt',
    dataIndex: 'change_dt'
  },
  change_user: {
    title: '执行人',
    key: 'change_user',
    dataIndex: 'change_user'
  },
  change_type: {
    title: '更改类型',
    key: 'change_type'
  },
  reason_bidding_sheet: {
    title: '更改原因',
    key: 'reason',
    dataIndex: 'reason'
  },
  supplier_uid: {
    title: '供应商编号',
    key: 'uid',
    dataIndex: 'uid'
  },
  supplier_name: {
    title: '供应商名称',
    key: 'name',
    dataIndex: 'name'
  },
  supplier_file: {
    title: '相关文件下载',
    key: 'supplier_file'
  },
  quotation: {
    title: '报价',
    key: 'quotation'
  },
  upload_supplier_file: {
    title: '上传文件',
    key: 'upload_supplier_file'
  },
  pretty_inventory_type: {
    title: '库存',
    key: 'pretty_inventory_type',
    dataIndex: 'pretty_inventory_type'
  },
  name_spec: {
    title: '名称及规格',
    key: 'name_spec',
    dataIndex: 'name_spec'
  },
  material_mark_quotation: {
    title: '材质',
    key: 'material_mark',
    dataIndex: 'material_mark'
  },
  unit_price: {
    title: '单价',
    key: 'unit_price',
    dataIndex: 'unit_price'
  },
  unit: {
    title: '单位',
    key: 'unit',
    dataIndex: 'unit'
  },
  doc_name: {
    title: '文件名称',
    key: 'doc_name',
    dataIndex: 'doc_name'
  },
  doc_size: {
    title: '文件大小',
    key: 'doc_size',
    dataIndex: 'doc_size'
  },
  upload_dt: {
    title: '上传时间',
    key: 'upload_dt',
    dataIndex: 'upload_dt'
  },
  uid_execution: {
    title: '编号',
    key: 'uid',
    dataIndex: 'uid'
  },
  lister: {
    title: '制表人',
    key: 'lister',
    dataIndex: 'lister'
  },
  list_dt: {
    title: '制表日期',
    key: 'list_dt',
    dataIndex: 'list_dt'
  },
  process_requirement: {
    title: '工艺要求',
    key: 'process_requirement',
    dataIndex: 'process_requirement'
  },
  entry_form_uid: {
    title: '入库单编号',
    key: 'uid',
    dataIndex: 'uid'
  }
}
