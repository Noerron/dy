import qs from 'qs'

import {isPlainObject,getSessionStorage} from '../utils'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {message} from 'antd'
NProgress.settings.showSpinner = false
/*重新封装了一下fetch  现在get传参更改形式参数必须都放到params里面{ params: {fileName: "led"}},post不需要
*/

const http = function http(confing){
    //initial confing & 校验
    if (!isPlainObject(confing)) confing = {}
    confing = Object.assign({
        url:'',
        method:'GET',
        credentials:'include',
        headers:null,
        body:null,
        params:null,
        responseType:'json',
        signal:null
    },confing)
   
    if (!confing.url ) throw new TypeError('url must be required')
    if (!isPlainObject(confing.headers)) confing.headers = {}
    if (confing.params!==null && !isPlainObject(confing.params)) confing.params = null
    //处理各种细节
    let {url,method,credentials,headers,body,params,responseType,signal} = confing
    
    //处理问号传参
    if (params) {
        url+=`${url.includes('?')?'&':'?'}${qs.stringify(params)}`
        
    }
    //处理请求主体信息
    if (isPlainObject(body)) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json';
    }
    //类型于axios的请求拦截器，把每一个请求，传递给服务器相同的内容在这里处理
    if (getSessionStorage('token')) {
        NProgress.start()
        headers['Authorization'] = 'Bearer ' + getSessionStorage('token')
    }
    method = method.toUpperCase()
    confing = {
        method,
        credentials,
        headers,
        cache:'no-cache',
        signal
    }
    if (/^(POST|PUT|PATCH)$/i.test(method) && body) confing.body = body
   console.log(confing);
    return fetch(url,confing)
    .then(response=>{
        NProgress.done()
        let {status,statusText} = response
        if (/^(2|3)\d{2}$/.test(status)) {
            //请求成功:根据预设的方法，获取需要的值
            let result;
            switch (responseType.toLowerCase()) {
                case 'text':
                    result = response.text()
                    break;
                case 'arraybuffer':
                    result = response.arrayBuffer()
                    break;
                 case 'blob':
                    result = response.blob()
                    break;
                default:
                    result = response.json()
            }
            return result;
        }
        //请求失败，http状态码失败
        return Promise.reject({
            code:-100,
            status,
            statusText
        })
    }).catch(reason=>{
        //失败的统一提示
        NProgress.done()
        if (reason && typeof reason === 'object') {
            let {code,status} = reason
            if (code===-100) {
                switch (+status) {
                    case 400:
                        message.error('请求参数出现问题')
                        break;
                    case 401:
                        message.info('没有权限')
                        break;
                    case 500||505:
                         message.info('服务器错误')
                         break;
                    case 404:
                        message.info('404找不到请求地址')
                        break;
                               
                    default:
                        break;
                }
            }else if(code === 20){
                message.error('请求被中断了')
            }else{
                message.error('出错')
            }
        }else{
            message.error('出错')
        }
       
        return Promise.reject(reason)

    })


}
const arr = ['GET','HEAD','DELETE','OPTIONS']

// 快捷方法
arr.forEach(item => {
    http[item.toLowerCase()] = function (url,config){
        if (!isPlainObject(config)) config = {}
        config['url'] = url
        config['method'] = item
        return http(config)
    }
});

['POST','PUT','PATCH'].forEach(item => {
  
    http[item.toLowerCase()] = function (url,body,config){
        if (!isPlainObject(config)) config = {}
        config['url'] = url
        config['body'] = body
        config['method'] = item
        return http(config)
    }
});

export default http