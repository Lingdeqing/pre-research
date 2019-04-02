const Vue = require('vue');
const app = new Vue({
    template: '<div>Hellow SSR</div>'
});

const renderer = require('vue-server-renderer').createRenderer();
const renderer2 = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
});

renderer.renderToString(app, (err, html) => {
    if(err){
        console.log(err)
    } else {
        console.log(html);
    }
})

const server = require('express')();

server.get('/a/*', (req, res) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        template: '<div>访问的 URL 是： {{ url }}</div>'
    })

    renderer.renderToString(app, (err, html) => {
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        if(err){
            res.status(500).end('Internal Server Error');
        } else {
            res.end(`
            <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
            `)
        }
    })
});

server.get('/b/*', (req, res) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        template: '<div>访问的 URL 是： {{ url }}</div>'
    })

    renderer2.renderToString(app,{
        title: 'hello ssr'
    }, (err, html) => {
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        if(err){
            res.status(500).end('Internal Server Error');
        } else {
            res.end(html);
        }
    })
});

server.listen(8080);