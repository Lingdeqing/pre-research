const TextToSVG = require('text-to-svg')
const sharp = require('sharp')

const fonts = ['Regular', 'Light', 'Medium', 'Bold', 'Semibold']
const fs = []
for (let i = 0; i < fonts.length; i++) {
    // 多个不同的字体有bug
    const toSvg = TextToSVG.loadSync(`./fonts/PingFangSC-${fonts[i]}.ttf`);
    const f = toSvg.getSVG('呵呵',
        {
            fontSize: 50,
            anchor: 'top',
            attributes: {
                fill: 'blue'
            }
        });
    fs.push(f)
}
sharp("./temp/_luban_7eb0213404f67bafa15a0092e652932f.png")
    .composite([{
        input: Buffer.from(Regular),
        left: 100,
        top: 50
    }, {
        input: Buffer.from(Bold),
        left: 100,
        top: 100
    }, {
        input: Buffer.from(Medium),
        left: 100,
        top: 100
    },]).toFile('./temp/output.png')