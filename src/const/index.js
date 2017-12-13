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
  order_id: {
    title: '工作令',
    key: 'order_id',
    dataIndex: 'order_id'
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
  }
}
