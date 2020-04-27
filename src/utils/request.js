import axios from 'axios'
import Vue from 'vue'
axios.defaults.baseURL = 'http://119.23.32.24'
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log(config)
  // config.headers.Cookie = "Access-Token=eyJhbGciOiJIUzUxMiIsImlhdCI6MTU1NDE2NTU5NiwiZXhwIjoxNTU0MjUxOTk2fQ.eyJpZCI6MX0.gygbHMbJTXaG8cmJNtTSC--h7zmRGFFGTD5zU1s7qeMaZSjDRyqVbWnoi43SWXr8mNn3v1nt_NffgweiLnZVug;session=.eJxVj11PwjAUhv_LyS4XLc6OQMKFOKciTBAX8GoprGzFfsy2gzGy_-50wcTL9-vkPGfQilMYnhsXLBPUWCIKGPYwvu35GA98F0pDdVsAlra-C8wkJBVMXsQ2JzKjSXH8i3ea0rq9iX4Vk5ZqSfglVd2yIMYclW5H4PiOVqVMzcjHPkLImV8_eVHdX28w3npigpzIjuO3WV5UL_pw9XFvqyD0lnVM9yjNtMnvVtVu2g9OZroOn1_fV9lpsAniyaN4WC7oQn3tVRVVlt98Zvow98ahyuZixhC4oCnhiSSi_RY6KheMUckPqyw57-j_N5rmG_PDZUI.XKKvXA.GT_OtmYWRYBrA1d6iPY33_vTjAQ"
  // document.cookie = "Access-Token=eyJhbGciOiJIUzUxMiIsImlhdCI6MTU1NDMzOTA5MSwiZXhwIjoxNTU0NDI1NDkxfQ.eyJpZCI6MX0.i_4gnxqC7xkbFaPHyuEUQ3rdWypsOFg3HHKosnsCDxqvxgNoNZ1-Oq7tAQYgzyMc3MxT1EscB2_l92gfPMqTXw;session=.eJxVj11TgkAUhv_LGS6ZWtvAwRkvMqIyJcwY7YpZZQVsP2h3UcThv0cxNtPl-3XmPGdQklEYnVsbTMGpNoSXMBo4zi3GHvIGNlSaqq4ARdr5NhQ6ISkvxEVscyIympTHv3inKG26m-hXFcJQJQi7pLJflkTro1TdCCzXUrISqR67josQsqLrJxw2w_XGcbaYT5EVmkn8Ns_L-kUdrj7uTe0HeNnEdI_STOn8blXvZkP_pGfr4Pn1fZWdvI0fTx_5w3JBF_JrL-uwNuzmM1OHCE8CmUV8XiCwQVHCEkF49y30VDZoLZMfVlEx1tP_b7TtN-wwZTs.XKVVEw.WGjj4dKjSNn0Xig1MIQaUMpjIIo"
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

//  response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  // console.log(response)
  return response
}, function (error) {
  // console.log(error)
  // Do something with response error
  // alert(error)
  Vue.prototype.$notify({
    message: `错误！代码:${error}`,
    duration: 100,
    status: 'danger'
  })
  return Promise.reject(error)
})

const getTypeListUrl = '/up/api/front/borrow/type_manage/get_type_list'
const getGoodsListByAssetsUrl = '/up/api/front/borrow/type_manage/get_goods_list_by_assets'
const borrowGoodsUrl = '/up/api/front/borrow/goods_manage/borrow_goods'
const returnGoodsUrl = '/up/api/front/borrow/goods_manage/return_goods'
const receiveGoodsUrl = '/up/api/front/borrow/goods_manage/receive_goods_list'
const getPublishAnnounceUrl = '/up/api/front/borrow/announce_manage/get_publish_announce'
const getGoodsInfoUrl = '/up/api/front/borrow/goods_manage/get_goods_info'
const getGoodsLentInfoUrl = '/up/api/front/borrow/lent_info_manage/get_goods_lent_info'
const getLentInfoUrl = '/up/api/front/borrow/lent_info_manage/get_lent_info'
const loginUrl = '/up/api/front/borrow/ding_front/ding_login'
function getTypeList () {
  return axios.get(getTypeListUrl)
}
function getGoodsListByAssets (condition) {
  if (!condition.has_stock) { return axios.get(`${getGoodsListByAssetsUrl}?assets_id=${condition.assets_id}`) }
  return axios.get(`${getGoodsListByAssetsUrl}?assets_id=${condition.assets_id}&has_stock=${condition.has_stock}`)
}

function borrowGoods (condition) {
  return axios.post(borrowGoodsUrl, condition)
}
function returnGoods (condition) {
  return axios.post(returnGoodsUrl, condition)
}

function receiveGoods (condition) {
  return axios.post(receiveGoodsUrl, condition)
}
function getPublishAnnounce () {
  return axios.get(getPublishAnnounceUrl)
}
function getGoodsInfo (goodsId) {
  return axios.get(`${getGoodsInfoUrl}?goods_id=${goodsId}`)
}
function getGoodsLentInfo (goodsId) {
  return axios.get(`${getGoodsLentInfoUrl}?goods_id=${goodsId}`)
}
function getBookDetailInfo (goodsId) {
  return Promise.all([getGoodsInfo(goodsId), getGoodsLentInfo(goodsId)])
}
function getLentInfo (condition) {
  return axios.get(`${getLentInfoUrl}?lent_code=${condition.lent_code}&assets_id=${condition.assets_id}&is_return=${condition.is_return}`)
}
function login (condition) {
  return axios.post(loginUrl, condition)
}
export {
  getTypeList,
  getGoodsListByAssets,
  borrowGoods,
  returnGoods,
  receiveGoods,
  getPublishAnnounce,
  getGoodsInfo,
  getGoodsLentInfo,
  getBookDetailInfo,
  getLentInfo,
  login
}
