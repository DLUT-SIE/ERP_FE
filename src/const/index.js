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

export const WELD_POSITION_LIST = [
  {
    value: 'FLUSH_WELD',
    label: '平焊'
  },
  {
    value: 'HORIZONTAL_WELD',
    label: '横焊'
  },
  {
    value: 'OVERHEAD_WELD',
    label: '仰焊'
  },
  {
    value: 'VERTICAL_WELD',
    label: '立向上焊'
  },
  {
    value: 'WIDE_WELD',
    label: '全位置焊'
  }
]

export const WELD_METHOD_LIST = [
  {
    value: 'SMAW',
    label: '焊条电弧焊'
  },
  {
    value: 'SAW',
    label: '埋弧焊'
  },
  {
    value: 'GMAW',
    label: '气体保护焊'
  },
  {
    value: 'GTAW',
    label: '氩弧焊'
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
    title: '利用率',
    key: 'press_mark',
    dataIndex: 'press_mark'
  },
  gross_weight: {
    title: '毛重(Kg)',
    key: 'gross_weight',
    dataIndex: 'gross_weight'
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
    key: 'collaborative_content',
    dataIndex: 'collaborative_content'
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
  refund_pretty_status: {
    title: '退库单状态',
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
  }
}
