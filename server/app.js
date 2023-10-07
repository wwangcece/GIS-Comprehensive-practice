// 导入所需模块和库
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg')
const path = require('path');
const cors = require('cors');

const app = express()

// 使用中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'LabManage',
  password: '1q2w3e4r5t',
  port: 5432,
});


// 首页路由
app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send('Welcome to the index page');
});

app.get('/query', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const query = req.query.q // 获取查询参数中的 query

  pool.query(query, (err, result) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    if (query.includes('select')) {
      const fields = result.fields
      const rows = result.rows
      res.send({ fields, rows });
    }
    else { 
      res.send({msg: "success"});
    }

  });
});

// 程序退出时关闭数据库连接池
app.on('beforeExit', () => {
  console.log('Closing database pool...');
  pool.end();
});

// 启动服务器，并监听 3000 端口
app.listen(3000, () => {
  console.log('Server is up and running on http://127.0.0.1:3000');
});
