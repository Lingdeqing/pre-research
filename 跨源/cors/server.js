
const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();
app.use(cors({
    maxAge: 1000*60
}))

app.use(async (ctx, next) => {
    ctx.body = 'hello';
});

app.listen(3998)