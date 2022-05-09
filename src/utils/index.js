import Web3 from "web3";

export function checkHexToUtf8(hex){
  return hex && Web3.utils.isHex(hex) ? Web3.utils.hexToUtf8(hex) : undefined
}

export function getQueryString(keyWords) {
  let href = window.location.href;
  let query = href.substring(href.indexOf("?") + 1);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] === keyWords && pair[1]) {
      let p = pair[1].split("#")
      return p[0];
    }
  }
  return undefined
}
export function calcDays(dateStr){
  const userCreatedAt = ~~(new Date(dateStr).getTime()/86400000)
  const now = ~~(new Date().getTime()/86400000)
  return now - userCreatedAt
}
export function calcQuota(users){
  return users.reduce((count, item) => {
    if (typeof item.days === 'undefined') {
      item.days = calcDays(item.userCreatedAt)
    }
    count = count + Math.sqrt((item.days || 1) * (item.followersCount || 1) * ((item.twitters && item.twitters.length)|| 1)).toFixed(0) * 1
    return count
  }, 0)
}
export const getHref = (username, calcNonce) => {
  const href = 'https://woofer.xyz' //window.location.href
  const params = '&nonce=' + calcNonce
  if (href[href.length - 1] === '/'){
    return href + params
  }
  return href + '/' + params
}

export function getMStr(m){
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m]
}

export const toPercent = (val) => {
  if (val > 1000000) {
    return val / 1000000 + 'M'
  } else if (val > 1000) {
    return val / 1000 + 'K'
  }
  return val
};

