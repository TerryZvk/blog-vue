/**
 * @param {string} url
 * @returns {Object}
 */
 export function getQueryObject (url = window.location.href) {
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength (str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray (actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {String}
 */
export function param (json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/* 获取指定url参数值 */
/**
 * @param {string} url
 * @param {string} param
 * @returns {String}
 */
export function getParam (url, param) {
  const paramExpr = new RegExp('(?:^|&|\\?)' + param + '=([^&]*)(?:&|$|#)')
  const matches = paramExpr.exec(url)
  return matches ? decodeURIComponent(matches[1]) : ''
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text (val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge (target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

// 首字母大写
export function titleCase (str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

// 连字符和下划线单词转驼峰
export function camelCase (str) {
  return str.replace(/(-|_)[a-z]/g, str1 => str1.substr(-1).toUpperCase())
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

/**
 * @param {object} obj
 * @returns {Object}
 * @description 克隆对象
 */
export function cloneObj (obj) {
  const objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // 判断obj的子元素是否为object对象，如果是则就递归拷贝
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = cloneObj(obj[key])
        } else {
          // 如果不为对象就直接拷贝
          objClone[key] = obj[key]
        }
      }
    }
  }
  return objClone
}

/**
 * @param {array} arr
 * @returns {String}
 * @description 数组转字符串
 */
export function arrToString (arr) {
  return JSON.stringify([...arr].sort()).replace(/"/g, '\'')
}

/**
 * @returns {Array}
 * @description 检测设备类型
 */
export function getDeviceType () {
  const type = []
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    type.push('mobile')
  } else {
    type.push('pc')
  }
  if (/Android/i.test(navigator.userAgent)) {
    type.push('android')
  }
  if (/iPhone|iPod/i.test(navigator.userAgent)) {
    type.push('ios')
  }
  return type
}

export function makeMap (str, expectsLowerCase) {
  const map = Object.create(null)
  const list = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}

/* *********** 验证工具 ************* */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:|open)/.test(path)
}

// 是否是数字字符串
export function isNumberStr (str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}

/**
 * @param {object} obj1
 * @param {object} obj2
 * @returns {boolean}
 * @description 判断2个对象是否相等
 */
export function isObjectEqual (obj1, obj2) {
  const aProps = Object.keys(obj1)
  const bProps = Object.keys(obj2)
  if (aProps.length !== bProps.length) {
    return false
  }
  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i]

    const propA = obj1[propName]
    const propB = obj2[propName]
    if ((typeof (propA) === 'object')) {
      if (!this.isObjectEqual(propA, propB)) {
        return false
      }
    } else if (propA !== propB) {
      return false
    }
  }
  return true
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function isURL (url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function isEmail (email) {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray (arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

// todo 回显数据字典 该方法后期需要用新字典工具移除
export function selectDictLabel (datas, value) {
  const actions = []
  Object.keys(datas).map((key) => {
    if (datas[key].codeValue === ('' + value)) {
      actions.push(datas[key].codeName)
      return false
    }
  })
  return actions.join('')
}

// 添加日期范围
export function addDateRange (params, dateRange) {
  const search = params
  search.beginTime = ''
  search.endTime = ''
  if (dateRange != null && dateRange !== '') {
    search.beginTime = dateRange[0]
    search.endTime = dateRange[1]
  }
  return search
}

// 通用下载方法
export function download (fileName) {
  window.location.href = process.env.VUE_APP_BASE_API + '/common/excel?fileName=' + encodeURI(fileName) + '&delete=' + true
}

// 转换字符串，undefined,null等转化为""
export function parseStrEmpty (str) {
  if (!str || str === 'undefined' || str === 'null') {
    return ''
  }
  return str
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree (data, id, parentId, children, rootId) {
  id = id || 'id'
  parentId = parentId || 'parentId'
  children = children || 'children'
  rootId = rootId || '0'
  // 对源数据深度克隆
  const cloneData = JSON.parse(JSON.stringify(data))
  // 循环所有项
  const treeData = cloneData.filter(father => {
    const branchArr = cloneData.filter(child => {
      // 返回每一项的子级数组
      return father[id] === child[parentId]
    })
    if (branchArr.length > 0) { father.children = branchArr }
    // 返回第一层
    return father[parentId] === rootId
  })
  return treeData !== '' ? treeData : data
}
