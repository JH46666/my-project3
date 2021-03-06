import router from '@/router';
import Vue from 'vue'
import { type } from 'os';
// 配置API接口地址
var root = '/api'
// 引用axios
var axios = require('axios')
// 自定义判断元素类型JS
function toType (obj) {
	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
		delete o[key]
    }
	if (toType(o[key]) === 'string') {
		o[key] = o[key].trim()
	} else if (toType(o[key]) === 'object') {
		o[key] = filterNull(o[key])
	} else if (toType(o[key]) === 'array') {
		o[key] = filterNull(o[key])
	}
  }
  return o
}

function todd(method,data){
    // Do whatever you want to transform the data
    if(method === 'POST'){
		let ret = '';
		for (let it in data) {
			ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
		}
		return ret;
    }
    return data;
}
/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/

function apiAxios (method, url, params, success, failure) {
  if(method === 'POST' && typeof params === 'string') {
    params = JSON.parse(params)
  } else {
    params = todd(method,params)
  }
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: true
  }).then(function (res) {
    if (res.data.code === 0) {
      if (success) {
        success(res.data)
      }
    } else {
      if(res.data.code === 3001) {
        let toast = Vue.$toast({
            message: '需要登录',
            position: 'bottom',
            duration: 500
          })
        return setTimeout(() => {
          router.push('/login')
        },200)
      }
      if (failure) {
        failure(res.data)
      } else {
        let toast = Vue.$toast({
            message: JSON.stringify(res.data.message),
            position: 'bottom',
            duration: 500
          })
      }
    }
  }).catch(function (err) {
    let res = err.response
    if (err) {
      window.alert('api error, HTTP CODE: ' + res.status)
    }
  })
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}






















