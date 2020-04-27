const express = require('express')
const app = express()
const announce = require('./module/announce')
const good = require('./module/good')
app.use('/up/api/front/borrow', announce)
app.use('/up/api/front/borrow', good)
app.listen(80, '0.0.0.0', () => {
  console.log('listening...')
})
