
const path = require('path')
const config = require('./config')
const fs = require('fs');
const fetch = require('node-fetch');
const execa = require('execa')

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
        const drawConfig = {
            scale,
            canvasPath: 'a.png'
        }
        await execa.shell(`magick convert -size ${works.width * scale}x${works.height * scale} xc:none ${drawConfig.canvasPath}`)

        // 绘制
        let commands = []
        for (let node of pic.nodes) {
            switch (node.type) {
                case "text":
                    await this.drawTextNode(node, drawConfig)
                    break
                case "image":
                    await this.drawImageNode(node, drawConfig)
                    break
                default:
                    break
            }
        }
    },
    async drawTextNode(node, drawConfig) {
        const { scale, canvasPath } = drawConfig
        let left = node.left * scale,
            top = node.top* scale,
            width = (parseInt(node.width) || 0) * scale,
            height = (parseInt(node.height) || 0) * scale,
            fontSize = node.settings.fontSize * scale,
            fontFamily = node.settings.fontFamily || 'PingFangSC-Regular',
            fontFile = path.join("fonts", `${fontFamily}.ttf`),
            fontColor = node.settings.color,
            textAlign = node.settings.textAlign || 'left',
            backgroundColor = (node.settings.backgroundColor || '').replace(/\s/g, ''),
            [lt = 0, rt = 0, rb = 0, lb = 0] = (node.borderRadius || []).map(r => r * scale)

        if (
            width && height &&
            backgroundColor && backgroundColor !== 'transparent' && !/^rgba\(\d+,\d+,\d+,0\)$/.test(backgroundColor)) { 

            // 绘制文字背景 到临时画布：输出流
            const commands = []
            commands.push(`magick convert -size ${width}x${height} xc:none -fill '${backgroundColor}' -draw 'path "M ${lt} 0 H ${width-rt} Q ${width} 0 ${width} ${rt} V ${height-rb} Q ${width} ${height} ${width-rb} ${height} H ${lb} Q 0 ${height} 0 ${height-lb} V ${lt} Q 0 0 ${lt} 0 Z"' png:-`)

            // 绘制文字 到文字背景上面
            commands.push(`magick convert -fill '${fontColor}' -pointsize ${fontSize} -font '${fontFile}' -gravity center -draw 'text 0,0 "${node.settings.text}"' - png:-`)

            // 绘制文字 到画布上面
            commands.push(`magick convert -fill green -draw 'image SrcOver ${left},${top} ${width},${height} -' ${canvasPath} ${canvasPath}`)

            await execa.shell(commands.join('|'))
        } else {
            await execa.shell(`magick convert -fill '${fontColor}' -pointsize ${fontSize} -font '${fontFile}' -draw 'text ${left},${top+fontSize} "${node.settings.text}"' ${canvasPath} ${canvasPath}`)
        }
        return 
    },
    async drawImageNode(node, drawConfig) {
        const { scale, canvasPath } = drawConfig

        // 拉取图片 写入本地
        const imagePath = await this.saveImage(node.settings.src)

        const commands = []
        const input = () => commands.length > 0 ? '-' : `"${imagePath}"`
        const width = node.width * scale, height = node.height * scale, left = node.left * scale, top = node.top * scale
        const [lt = 0, rt = 0, rb = 0, lb = 0] = (node.borderRadius || []).map(r => r * scale)
        
        // 背景色 绘制到画布上面
        let backgroundColor = (node.settings.backgroundColor || '').replace(/\s/g, '')
        if (backgroundColor && backgroundColor !== 'transparent' && !/^rgba\(\d+,\d+,\d+,0\)$/.test(backgroundColor)) {
            await execa.shell(`magick convert ${canvasPath} -fill "${backgroundColor}"  -draw 'path "M ${left+lt} ${top} H ${left+width-rt} Q ${left+width} ${top} ${left+width} ${top+rt} V ${top+height-rb} Q ${left+width} ${top+height} ${left+width-rb} ${top+height} H ${left+lb} Q ${left} ${top+height} ${left} ${top-lb} V ${top+lt} Q ${left} ${top} ${left+lt} ${top} Z"' ${canvasPath}`)
        }

        // 裁切圆角 到临时画布（输出流）
        if (lt || rt || lb || rb) {
            commands.push(`magick convert -size ${width}x${height} xc:none -fill green -draw 'path "M ${lt} 0 H ${width-rt} Q ${width} 0 ${width} ${rt} V ${height-rb} Q ${width} ${height} ${width-rb} ${height} H ${lb} Q 0 ${height} 0 ${height-lb} V ${lt} Q 0 0 ${lt} 0 Z"' \\( -resize ${width}x${height} ${imagePath} -geometry ${width}x${height}+0+0  \\) -compose SrcIn -composite png:-`)
        }

        commands.push(`magick convert -fill green -draw 'image SrcOver ${left},${top} ${width},${height} ${input()}' ${canvasPath} ${canvasPath}`)

        // 绘制图片 到画布指定位置
        await execa.shell(commands.join('|'))

        return
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

