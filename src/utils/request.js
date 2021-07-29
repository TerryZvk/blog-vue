import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store';
// import router from '@/router';
import { getToken } from "@/utils/cookies"

// create an axios instance
const service = axios.create({
    baseURL: '/', // http://localhost:21021/
    // withCredentials: true, // send cookies when cross-domain requests
    //timeout: 5000 // request timeout
    //`xsrfCookieName`是要用作 xsrf 令牌的值的cookie的名称
    xsrfCookieName: 'XSRF-TOKEN', // default
    // `xsrfHeaderName`是携带xsrf令牌值的http头的名称
    xsrfHeaderName: 'X-XSRF-TOKEN', // default
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        let token = getToken()
        if (token != undefined && token != '') {
            config.headers['X-Authorization-Token'] = token
        }
        return config
    },
    error => {
        // do something with request error
        // console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
       * If you want to get http information such as headers or status
       * Please return  response => response
      */

    /**
       * Determine the request status by custom code
       * Here is just an example
       * You can also judge the status by HTTP Status Code
       */
    response => {
        const res = response.data
        // if the custom code is not 20000, it is judged as an error.
        if (response.status !== 200) {
            
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                    confirmButtonText: 'Re-Login',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service