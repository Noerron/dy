//判断是否是纯对象
export const isPlainObject=(obj)=> {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }

//绘画存储
export const setSessionStorage = (key,value)=>{
    window.sessionStorage.setItem(key,value)
}
//去除存储信息
export const getSessionStorage = (key)=>{
    return window.sessionStorage.getItem(key)
}

//删除存储信息
export const removeToken = (key)=>{
    return window.sessionStorage.removeItem(key)
}

export const getpermission = ()=>{
    return JSON.parse(window.sessionStorage.getItem("permission"))
}
export const gettextpermission = ()=>{
    return window.sessionStorage.getItem("permission")
}