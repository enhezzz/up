const express = require('express')
const router = express.Router()

router.get('/announce_manage/get_publish_announce', (req, res) => {
  res.json({
    data: {
      data: [
        {
          announcement_id: 1,
          title: '阿斯顿撒多撒多撒'
        },
        {
          announcement_id: 2,
          title: 'asd奥术大师大所大所多撒多撒多所'
        },
        {
          announcement_id: 3,
          title: '发生大幅度范德萨范德萨范德萨'
        },
        {
          announcement_id: 4,
          title: '胜多负少大学擦拭大'
        }
      ]
    }
  })
})

module.exports = router
