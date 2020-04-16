
const path = require('path')
const config = require('./config')
const fs = require('fs');
const fetch = require('node-fetch');
const execa = require('execa')
const cp = require('child_process')
const images = require('images')

// fetch(
// 	'https://octodex.github.com/images/Fintechtocat.png'
// ).then(res => {
// 	const dest = fs.createWriteStream('./octocat.png');
// 	res.body.pipe(dest);
// });

// gm(525, 110, "#00ff55aa")
//     .font(`./fonts/PingFangSC-Light.ttf`)
//     .fontSize(30)
//     .drawText(30, 50, "我日")
//     .font(`./fonts/PingFangSC-SemiBold.ttf`)
//     .fontSize(30)
//     .drawText(30, 100, "我日")
//     .font(`./fonts/PingFangSC-Bold.ttf`)
//     .fontSize(30)
//     .drawText(30, 150, "我日")
// // gm(525, 110, "#00ff55aa")
// //   .fontSize(68)
// //   .stroke("#efe", 2)
// //   .fill("#555")
// //   .drawText(20, 72, "graphics")
// //   .fill("#fa0")
// //   .drawText(274, 72, " magick")
//     .write('all.png', (err) => {
//         console.log(err)
//     })

const DrawUtils = {
    async init(tempDir) {
        await execa.shell(`mkdir -p ${tempDir}`)
        this.tempDir = tempDir
    },
    async drawWorks(works) {

        await this.init(path.resolve(__dirname, './temp'))


        const pics = works.pics
        const picUrls = await Promise.all(pics.map(pic => this.drawPic(pic, works)))
        return picUrls
    },
    async drawPic(pic, works) {
        const scale = 5 // 按照输入图片的3倍绘制

        // 新建画布
        // const canvasPath = path.join(this.tempDir, 'null.png')
        const drawConfig = {
            scale,
            canvasPath: ''
        }
        // const resultCanvasPath = path.join(this.tempDir, 'result.png')
        // await execa.command(`magick convert -size ${works.width*scale}x${works.height*scale} xc:white ${canvasPath}`)

        // 绘制
        let commands = []
        for (let node of pic.nodes) {
            switch (node.type) {
                case "text":
                    commands.push(await this.drawTextNode(node, drawConfig))
                    break
                case "image":
                    commands.push(await this.drawImageNode(node, drawConfig))
                    break
                default:
                    break
            }


        }


        for (let cmd of commands) {
            // console.log(cmd)
            await execa.shell(cmd)
        }

        // 圆角裁切
        // if (works.borderRadius && works.borderRadius.some(br => br !== 0)) {
        //     canvas = this.cutRadius(
        //         canvas,
        //         canvas.width,
        //         canvas.height,
        //         works.borderRadius.map(br => br * works.scale)
        //     )
        // }

        // 调整为输出尺寸
        // const base64 = await this.resizeImgOrCanvas(
        //     canvas,
        //     works.outputWidth,
        //     works.outputHeight,
        //     "png",
        //     "base64"
        // )

        // 下载
        // const src = await upload2(
        //     {
        //         base64
        //     },
        //     {
        //         service: "luban",
        //         size: true,
        //         v1: {
        //             isSt: true,
        //             media: "pic"
        //         }
        //     }
        // )
        // return src
    },
    drawTextNode(node, drawConfig) {
        const { scale, canvasPath } = drawConfig
        let boxLeft = node.left * scale,
            boxTop = node.top* scale,
            fontSize = node.settings.fontSize * scale,
            fontFamily = node.settings.fontFamily || 'PingFangSC-Regular'
            width = (parseInt(node.width) || 0) * scale,
            height = (parseInt(node.height) || 0) * scale,
            textLeft = boxLeft,
            textTop = boxTop,
            [paddingTop, paddingRight, paddingBottom, paddingLeft] = node.padding

        const fontFamily = node.settings.fontFamily.replace(/-/g, "_")
        ctx.font = `${node.settings.fontSize}px ${fontFamily}`
        const textWidth = ctx.measureText(node.settings.text).width
        const textHeight = node.settings.fontSize * 1.1

        // 计算盒子宽度
        // if (!boxWidth) {
        //     boxWidth = paddingLeft + paddingRight + textWidth
        // }
        // if (!boxHeight) {
        //     boxHeight = paddingTop + paddingBottom + textHeight
        // }

        // // textAlign调整文字左右位置
        // if (node.settings.textAlign === "center") {
        //     textLeft =
        //         boxLeft +
        //         (boxWidth - paddingLeft - paddingRight - textWidth) / 2 +
        //         paddingLeft
        // } else if (node.settings.textAlign === "right") {
        //     textLeft = boxLeft + boxWidth - textWidth - paddingRight
        // }

        // // verticalAlign调整文字上下位置
        // if (
        //     !node.settings.verticalAlign ||
        //     node.settings.verticalAlign === "center"
        // ) {
        //     textTop = boxTop + (boxHeight - textHeight) / 2
        // } else if (node.settings.textAlign === "bottom") {
        //     textTop = boxTop + boxHeight - textHeight
        // }

        const commands = []
        const input = () => commands.length > 0 ? '-' : filepath

        // 指定了文案背景色 则需要绘制box
        let backgroundColor = (node.settings.backgroundColor || '').replace(/\s/g, '')
        if (
            width && height &&
            backgroundColor && backgroundColor !== 'transparent' && !/^rgba\(\d+,\d+,\d+,0\)$/.test(backgroundColor)) { 

            const borderRadius = node.borderRadius || []
            const [lt = 0, rt = 0, rb = 0, lb = 0] = borderRadius
            let path = `M 0 0 H ${width} V ${height} H 0 Z`
             // 指定了圆角
            if (lt || rt || lb || rb) {
                path = `M ${lt} 0 H ${width - rt} Q ${width} 0 ${width} ${rt} V ${height - rb} Q ${width} ${height} ${width - rb} ${height} H ${lb} Q 0 ${height} 0 ${height - lb} V ${lt} Q 0 0 ${lt} 0 Z`
            }
            // 填充背景色
            commands.push(`magick convert -size ${width}x${height} xc:none -fill "${backgroundColor}" -draw 'path "${path}"' - -compose SrcOver -composite png:-`)
            // magick convert -size 100x100 xc:none -fill "blue" -draw 'path "M 0 0 H 100 V 100 H 0 Z"' c.png

            // 绘制文字
            if(node.settings.text){
                commands.push(`magick convert -fill '${node.settings.color}' -pointsize ${fontSize} -font 'fonts/${fontFamily}.ttf' -draw 'text 0,${fontSize} "${node.settings.text}"'  - png:-`)
                // magick convert -fill 'red' -pointsize 15 -font 'fonts/PingFangSC-Semibold.ttf' -draw 'text 0,15 "呵呵"'  c.png d.png
            }
        } else {
            // 绘制文字
            if(node.settings.text){
                commands.push(`magick convert -size 100x100 xc:none -fill 'red'  -pointsize 15 -font 'fonts/PingFangSC-Semibold.ttf' -draw 'text 0,15 "呵呵呵"'  d.png`)
                // magick convert -size 100x100 xc:none -fill 'red'  -pointsize 15 -font 'fonts/PingFangSC-Semibold.ttf' -draw 'text 0,15 "呵呵呵"'  d.png
            }
        }

        // 绘制文字
        // ctx.font = `${node.settings.fontSize * scale}px ${fontFamily}`
        // ctx.fillStyle = node.settings.color
        // ctx.textBaseline = "top"
        // textTop = this.fixTextTop(textTop, node.settings.fontSize)
        // ctx.fillText(node.settings.text, textLeft * scale, textTop * scale)

        // 绘制文字
        if(node.settings.text){
            commands.push(`magick convert -draw 'text 0,${node.} "${node.settings.text}"' -fill '${node.settings.color}' -pointsize 15 -font 'fonts/PingFangSC-Semibold.ttf' c.png d.png`)
        }

        // 绘制文字到画布指定位置
        if (canvasPath) {
            commands.push(`magick composite -geometry ${width}x${height}+${left}+${top} ${commands.length > 0 ? '-' : filepath} ${canvasPath} ${canvasPath}`)

            
            // magick convert -draw 'text 0,15 "呵呵"' -fill 'red' -pointsize 15 -font 'fonts/PingFangSC-Semibold.ttf' c.png d.png
        } else {
            const canvasPath = path.join(this.tempDir, 'result.png')
            commands.push(`magick ${commands.length > 0 ? '-' : filepath} ${canvasPath}`)
            drawConfig.canvasPath = canvasPath
        }
    },
    async drawImageNode(node, drawConfig) {
        const { scale, canvasPath } = drawConfig

        // 图片存在则不重新绘制

        // 图片写入本地
        const filepath = await this.saveImage(node.settings.src)


        const commands = []
        const input = () => commands.length > 0 ? '-' : filepath
        const width = node.width * scale, height = node.height * scale, left = node.left * scale, top = node.top * scale

        // 图片圆角
        const borderRadius = node.borderRadius || []
        const [lt = 0, rt = 0, rb = 0, lb = 0] = borderRadius
        if (lt || rt || lb || rb) {
            // 裁切圆角
            commands.push(`magick convert -size ${width}x${height} xc:none -fill white -draw 'path "M ${lt} 0 H ${width - rt} Q ${width} 0 ${width} ${rt} V ${height - rb} Q ${width} ${height} ${width - rb} ${height} H ${lb} Q 0 ${height} 0 ${height - lb} V ${lt} Q 0 0 ${lt} 0 Z"' \\( -resize ${width}x${height} ${filepath} -geometry ${width}x${height}+0+0  \\) -compose SrcIn -composite png:-`)
        }

        // 图片背景色
        let backgroundColor = (node.settings.backgroundColor || '').replace(/\s/g, '')
        if (backgroundColor && backgroundColor !== 'transparent' && !/^rgba\(\d+,\d+,\d+,0\)$/.test(backgroundColor)) {    // 非透明
            // 填充背景色
            commands.push(`magick convert -size ${width}x${height} xc:none -fill "${backgroundColor}" -draw 'path "M ${lt} 0 H ${width - rt} Q ${width} 0 ${width} ${rt} V ${height - rb} Q ${width} ${height} ${width - rb} ${height} H ${lb} Q 0 ${height} 0 ${height - lb} V ${lt} Q 0 0 ${lt} 0 Z"' ${input()} -compose SrcOver -composite png:-`)
        }

        // 绘制节点到画布指定位置
        if (canvasPath) {
            commands.push(`magick composite -geometry ${width}x${height}+${left}+${top} ${input()} ${canvasPath} ${canvasPath}`)
        } else {
            const canvasPath = path.join(this.tempDir, 'result.png')
            commands.push(`magick ${input()} ${canvasPath}`)
            drawConfig.canvasPath = canvasPath
        }

        return commands.join('|')
    },

    saveImage(url) {
        // console.log(url)

        // 文件存在则直接返回

        // 从远端拉取文件
        return fetch(url)
            .then(res => {
                return new Promise((resolve, reject) => {
                    url = new URL(url)
                    const filename = url.pathname.replace(/\//g, '_')
                    const filepath = path.join(this.tempDir, filename)
                    // console.log(filepath)
                    res.body.pipe(fs.createWriteStream(filepath))
                        .on('close', () => {
                            resolve(filepath)
                        })
                        .on('error', (e) => {
                            reject(e)
                        })
                })
            });
    }

}

DrawUtils.drawWorks(config)

// const cp = require('child_process')
// const fs = require('fs')

// const descriptor = fs.openSync('./picture.png', 'r')
// console.log(descriptor)
// const args = [
// //   '-',  // 使用标准输入
// //   '-resize', '150x100!',
// //   '-strip',
// //   'jpg:-',  // 输出到标准输出

//   '-crop', '100x100+100+100', `-`, 'png:-'
// ]


// const streamIn = fs.createReadStream('./picture.png')
// const proc = cp.spawn('convert', args)
// streamIn.pipe(proc.stdin)
// proc.stdout.pipe(fs.createWriteStream('picture21.png'))

// const execa  = require('execa')
// execa.command('magick convert -crop 100x100+100+100 picture.png picture12.png')


// 把一张图画到另一张图指定位置指定尺寸
// execa.command('magick composite -geometry 100x100+0+0 picture.png bg.png picture13.png')
// magick convert -draw 'image SrcOver 0,0 100,100 picture.png' bg.png picture14.png

// 在一张图上指定位置绘制圆角矩形
// magick convert -fill blue  -draw 'roundRectangle 10,10 100,100 10,10' bg.png picture15.png
// 绘制多个图
// magick convert -fill blue  -draw 'roundRectangle 10,10 100,100 10,10' -fill red  -draw 'roundRectangle 50,50 120,120 10,10'  bg.png picture15.png

// path 绘制任意图形
// magick convert -fill red  -draw 'path "M10 10 H 90 V 90 H 10 L 10 10"'  bg.png picture15.png

// 空白画布
// magick convert -size 100x60 xc:none null.png
// 红色画布
// magick convert -size 100x60 xc:red null.png


// 图片裁切圆角
// magick convert -size 200x200 xc:none -fill white -draw 'roundRectangle 0,0 200,200 10,10' logo: -compose SrcIn -composite round.png
// 图片先缩放到指定大小， 再裁切圆角
// convert -size 435x435 xc:none -fill white -draw 'roundRectangle 0,0 435,435 10,10' \( -resize 435x435 b2.png -geometry 435x435+0+0  \) -compose SrcOver -composite a.png
// 图片裁切圆角 后继续绘制一个矩形
// magick convert -size 200x200 xc:none -fill white -draw 'roundRectangle 0,0 200,200 10,10' logo: -compose SrcIn -composite -fill red  -draw 'path "M10 10 H 90 V 90 H 10 L 10 10"' picture15.png



// 管道 先调整尺寸，再切圆角
// magick convert -resize 1044x558 b.png - | magick convert -size 1044x558 xc:none -fill white -draw 'roundRectangle 0,0 1044,558 10,10' - -compose SrcIn -composite a.png
// 图像作用域 \(\)
// magick convert -size 1044x558 xc:none -fill white -draw 'roundRectangle 0,0 1044,558 10,10' \( -resize 1044x558 b.png \) -compose SrcIn -composite a.png



// magick convert -draw 'image copy 0,0 870,465 "/Users/Franklin/Workspace/MyGits/pre-research/鲁班/temp/_luban_7eb0213404f67bafa15a0092e652932f.png"' /Users/Franklin/Workspace/MyGits/pre-research/鲁班/temp/null.png temp/shit.png

// magick composite -geometry +0+0 "temp/_800_pic_4707e6101e07658ce2fdf026ef02ab5d.png" "bg.png" "bg.png"


