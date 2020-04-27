const express = require('express')
const router = express.Router()

router.get('/type_manage/get_goods_list_by_assets', (req, res) => {
  const assetsId = req.query.assets_id
  console.log(assetsId === 5)
  if (assetsId === '5') {
    res.json({
      data: {
        total: 1,
        data: [
          {
            goods_type: -1,
            data: Array(5).fill().map((item, index) => ({
              goods_id: index,
              img_path: 'https://avatars3.githubusercontent.com/u/29703980?s=460&u=947f5dc8fdd0855cc043be5b0fb1fe70308e99e4&v=4',
              goods_name: `物品${index + 1}`,
              remaining_stock: 99 + index,
              unit: index,
              floor_name: 2
            }))
          }
        ]
      },
      state: 0
    })
  } else if (assetsId === '1') {
    res.json({
      data: {
        total: 1,
        data: [
          {
            goods_type: -1,
            data: Array(10).fill().map((item, index) => ({
              goods_id: index,
              img_path: 'http://pic.sc.chinaz.com/Files/pic/pic9/201905/bpic11900_s.jpg',
              goods_name: `雨伞${index + 1}`,
              remaining_stock: 10 + index,
              unit: index,
              floor_name: 2
            }))
          }
        ]
      },
      state: 0
    })
  } else {
    res.json({
      data: {
        total: 3,
        data: [
          {
            goods_type: 1,
            goods_type_name: '漫画类',
            data: Array(3).fill().map((item, index) => ({
              goods_id: index,
              img_path: 'https://img.redocn.com/sheying/20141126/sidiedakaideshu_3619263_small.jpg',
              goods_name: `漫画${index + 1}`,
              remaining_stock: 2 + index,
              unit: index,
              floor_name: 2
            }))
          },
          {
            goods_type: 2,
            goods_type_name: '技术类',
            data: Array(10).fill().map((item, index) => ({
              goods_id: index,
              img_path: 'https://img.redocn.com/sheying/20141126/sidiedakaideshu_3619263_small.jpg',
              goods_name: `技术${index + 1}`,
              remaining_stock: 8 + index,
              unit: index,
              floor_name: 2
            }))
          },
          {
            goods_type: 3,
            goods_type_name: '科学类',
            data: Array(5).fill().map((item, index) => ({
              goods_id: index,
              img_path: 'https://img.redocn.com/sheying/20141126/sidiedakaideshu_3619263_small.jpg',
              goods_name: `科学${index + 1}`,
              remaining_stock: 3 + index,
              unit: index,
              floor_name: 2
            }))
          }
        ]
      },
      state: 0
    })
  }
})

module.exports = router
