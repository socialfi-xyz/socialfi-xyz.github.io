let requestUrl_ = "http://192.168.1.239:5000"//  'https://node1.woofer.xyz'//
// if (sessionStorage.getItem('socialfi_xyz_test')){
//   requestUrl_ = 'https://node1.socialfi.xyz'
// }
export const requestUrl = requestUrl_

export const signNodes = [
  requestUrl_
  // 'https://node1.socialfi.xyz',
  // 'https://node2.socialfi.xyz',
  // 'https://node3.socialfi.xyz',
  // 'https://node4.socialfi.xyz',
  // 'https://node5.socialfi.xyz',
]
export const VALID_SIGNATURE = 1

export const HASHTAG = 'WooferAirdrop'
// type
export const TASK_TYPE_LOOKUP = 0 // default
export const TASK_TYPE_CLAIM = 1 // claim
export const TASK_TYPE_QUOTA = 2 // add quota
export const TASK_TYPE_RE_WOOF = 2 // re woof

export const ERROR_CODE_OK = 0
export const ERROR_CODE_PARAMS_0 = 400
export const ERROR_CODE_PARAMS_1 = 401
export const ERROR_CODE_PARAMS_2 = 402
export const ERROR_CODE_PARAMS_3 = 403
export const ERROR_CODE_PARAMS_4 = 404
export const ERROR_CODE_USER_0 = 600
export const ERROR_CODE_USER_1 = 601
export const ERROR_CODE_USER_2 = 602
export const ERROR_CODE_TASK_0 = 700
export const ERROR_CODE_TASK_1 = 701
export const ERROR_SERVER = 500

export const ERROR_MSG = {
  [ERROR_CODE_PARAMS_0]: 'username does not exist',
  [ERROR_CODE_PARAMS_1]: 'url fail',
  [ERROR_CODE_PARAMS_2]: 'taskid error',
  [ERROR_CODE_PARAMS_3]: 'type error',
  [ERROR_CODE_USER_0]: 'user does not exist',
  [ERROR_CODE_TASK_0]: 'no Task',
  [ERROR_CODE_TASK_1]: 'Task error',
  [ERROR_SERVER]: 'server error'
}
