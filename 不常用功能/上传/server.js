const Koa = require('koa');
const cors = require('kcors');
const multer = require('@koa/multer');
const Router = require('@koa/router');
const koaBody = require('koa-body');
const fs = require('fs-extra');
const path = require('path');

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

router.post('/files', upload.array("files"), async (ctx) => {
    console.log('files:')
    console.log(ctx.files)
    ctx.body = {
        code: 0,
        data: true
    }
    ctx.status = 200;
})

router.post('/files2', koaBody({
    multipart: true,
        formidable: {
            maxFileSize: 2000 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
        }
}),
  async (ctx) => {
    const files = ctx.request.files.files;
    const newRoot = 'res-'+Date.now();
    for(let file of files){
        const reader  = fs.createReadStream(file.path);
        const filename = path.basename(file.name);
        const dirname = path.dirname(file.name);
        const newDir = path.join(__dirname, dest, 'res', newRoot, dirname);
        const newPath = path.join(newDir, filename);
        fs.ensureDirSync(newDir);
        reader.pipe(fs.createWriteStream(newPath));
    }
    ctx.body = {
        code: 0,
        data: {
            url: newRoot
        }
    };
  }
);

app.use(cors());
app.use(router.routes()).use(router.allowedMethods());
app.listen(8880);

