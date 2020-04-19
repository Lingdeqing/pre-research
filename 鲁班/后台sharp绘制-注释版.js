const sharp = require("sharp")

// 1. 安装sharpjs ，先到https://g.widora.cn/ 把安装过程中下载的tarball搞到本地
// 2. 解压拷贝到sharpjs目录下面vendor目录里面
// 3. 在sharpjs目录下面运行node-gyp rebuild && node install/dll-copy编译安装

// 区分不同平台 要复制一份新的sharp目录，命名为 "平台名_sharp" 使用的代码中自行区分不同平台 来require
// 不同平台的 build目录中的.o文件要到官网下载对应平台的 vendor文件在install时有个链接下载那个链接的解压就行了
async function drawScripts() {

    // 创建画布
    let canvas = await sharp({
        create: {
            width: 174,
            height: 93,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
    })

    // 绘制第一个节点 - 裁剪圆角
    const node1 = await sharp(Buffer.from(
        '<svg><rect x="0" y="0" width="174" height="93" rx="6" ry="6"/></svg>'
    )).composite([{
        input: await sharp('temp/_luban_7eb0213404f67bafa15a0092e652932f.png').resize({
            width: 174,
            height: 93
        }).toBuffer(),
        blend: 'in',
        left: 0,
        top: 0,
    }]).toBuffer()

    // 文字还是先用imagemagick绘制出来，再用sharpjs绘制

    // 画上画布
    canvas = canvas.composite([
    // 绘制裁剪好的第一个节点
    {
        input: node1,
        left: 0,
        top: 0,
    }, 

    // 绘制第五个节点 - 图片
    {
        input: await sharp('temp/_800_pic_4707e6101e07658ce2fdf026ef02ab5d.png').resize({
            width: 87,
            height: 87
        }).toBuffer(),
        left: 87,
        top: 3,
    }])

    // 输出文件
    canvas.toFile('temp/output.png')
}

drawScripts()

