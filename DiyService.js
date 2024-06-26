import Tools from './Tools'
/**
 * Promise 封装 uni 原生方法
 */
class DiyService {
    constructor() {
        this.__init()
    }

    /**
     * __init
     */
    __init() {
		this.tools = new Tools()
        this.__initDefaults()
        this.__initMethods()
    }

    /**
     * __initDefaults
     */
    __initDefaults() {
        // 缓存非异步方法
        this.noPromiseMethods = [
            'stopRecord',
            'pauseVoice',
            'stopVoice',
            'pauseBackgroundAudio',
            'stopBackgroundAudio',
            'showNavigationBarLoading',
            'hideNavigationBarLoading',
            'createAnimation',
            'createContext',
            'hideKeyboard',
            'stopPullDownRefresh',
        ]

        // 缓存 uni 接口方法名
        this.instanceSource = {
            method: Object.keys(uni)
        }
    }

    /**
     * 遍历 uni 方法对象，判断是否为异步方法，是则构造 Promise
     */
    __initMethods() {
        for (let key in this.instanceSource) {
            this.instanceSource[key].forEach((method, index) => {
                this[method] = (...args) => {
                    // 判断是否为非异步方法或以 uni.on 开头，或以 Sync 结尾的方法
                    if (this.noPromiseMethods.indexOf(method) !== -1 || method.substr(0, 2) === 'on' || /\w+Sync$/.test(method)) {
                        return uni[method](...args)
                    }
                    return this.__defaultRequest(method, ...args)
                }
            })
        }

        const navigate = [
            'navigateTo',
            'redirectTo',
            'switchTab',
            // 'navigateBack', 
            'reLaunch',
        ]

        /**
         * 重写导航 API
         * @param {String} url  路径
         * @param {Object} params 参数
         */
        navigate.forEach((method, index) => {
            this[method] = (url, params) => {
                const obj = {
                    url,
                }
                if (method !== 'switchTab') {
                    obj.url = this.tools.buildUrl(url, params)
                }
                return this.__defaultRequest(method, obj)
            }
        })

        /**
         * 关闭当前页面，返回上一页面或多级页面
         * @param {Number} delta  返回的页面数，如果 delta 大于现有页面数，则返回到首页
         */
        this.navigateBack = (delta = 1) => {
            return uni.navigateBack({
                delta,
            })
        }
    }

    /**
     * 以 uni 下 API 作为底层方法
     * @param {String} method 方法名
     * @param {Object} obj    接收参数
     */
    __defaultRequest(method = '', obj = {}) {
        return new Promise((resolve, reject) => {
            obj.success = (res) => resolve(res)
            obj.fail = (res) => reject(res)
            uni[method](obj)
        })
    }
}

export default DiyService