const Koa = require('koa');
const cors = require('kcors');
const multer = require('@koa/multer');
const Router = require('@koa/router');
const fs = require('fs-extra')

const dest = 'tmp_files/videos';
fs.ensureDir(dest);
const upload = multer({ dest, limits: {fileSize: 100*1024*1024} });

const app = new Koa();
const router = new Router();
router.post('/', upload.single("file"), async (ctx) => {
    console.log(1)
    ctx.body = {
        code: 0,
        data: true
    }
    ctx.status = 200;
})

app.use(cors());
app.use(router.routes()).use(router.allowedMethods());
app.listen(8880);

