/**
 * 
 * function options (url, payload) {
        return {
            url: url,
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({...payload}) 
        }
    }
    request({url: '/api/xxx', method: 'get'})
    request(options('/api/xxx', payload))
 */
import axios from 'axios';

axios.defaults.baseURL = ''; //api的baseUrl
axios.defaults.timeout = 10000; //请求超时时间
axios.defaults.withCredentials = true; // 跨域下允许请求保存cookie

export default function request(params) {
    return axios(params)
        .then(checkStatus)
        .then(checkCode)
        .catch(err => {
            handleError(err)
        })
}

//检查返回状态
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        //...
        return response;
    }

    const error = new Error(codeMessage(response.status || response.statusText));
    error.response = response;
    throw error;
}

//返回data前做一些默认处理
function checkCode(response) {
    console.log(response)
    //...
    return response.data;
}

//处理请求中抛出的错误
function handleError(error) {
    console.log(error)
    //...
}



//取消请求的相关配置
let pending = [];
const CancelToken = axios.CancelToken;
const removePending = (config) => {
    for (let i in pending) {
        if (pending[i].u === config.url + JSON.stringify(config.data) + '&' + config.method) {
            pending[i].f(); //执行取消请求
            pending.splice(i, 1); //删除标识
        }
    }
}

// 请求拦截器
axios.interceptors.request.use(config => {
    //...
    removePending(config);
    config.cancelToken = new CancelToken((c) => { //将该次请求的标识和取消回调保存至pending数组
        pending.push({
            f: c,
            u: config.url + JSON.stringify(config.data) + '&' + config.method
        })
    })
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(res => {
    //...
    removePending(config);
    return res
}, error => {
    return Promise.reject(error)
})