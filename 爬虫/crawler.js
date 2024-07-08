const axios = require('axios');
const cheerio = require('cheerio');
const fse = require('fs-extra')
const path = require('path')


// 定义一个函数来获取页面内容和下一个页面的链接
let pageIndex = 0
const maxPage = 10000000
async function fetchPage({ url, prevFileName, onNextFetched }) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // 获取页面标题
        const title = $('.title').text();

        $('#center_tip').remove()

        // 获取文章内容的HTML
        const articleHtml = $('#articlecon').html();

        // 获取下一个页面的链接
        let nextPageLink = $('#pb_next').attr('href');
        let nextFileName = ''
        let currentIndex = pageIndex
        let currentFileName = `${currentIndex.toString().padStart(4, 0)}_${title.replace(/\s+/, '_')}.md`
        onNextFetched?.({
            title,
            fileName: currentFileName
        })

        // 输出文件
        let outputed = false
        const outputCurrent = () => {
            if (outputed) return
            outputed = true
            const footerHtml = `${nextFileName ? `<p><a href="./${encodeURIComponent(nextFileName)}">下一页</a></p>` : ''}${prevFileName ? `<p><a href="./${encodeURIComponent(prevFileName)}">上一页</a></p>` : ''}<p><a href="../">目录</a></p>`
            console.log(`河神/${currentFileName}`)
            fse.outputFile(path.resolve(__dirname, `河神/${currentFileName}`), `<h1>${title}</h1>
            <div>${footerHtml}</div>
            <div>${articleHtml}</div>
            <div>${footerHtml}</div>`)
        }

        if (!nextPageLink || pageIndex >= maxPage || title.trim() === '开新书了') {
            outputCurrent()
        } else {
            pageIndex++
            // 递归调用以爬取下一个页面
            await fetchPage({
                url: new URL(url).origin + nextPageLink,
                prevFileName: currentFileName,
                onNextFetched: (info) => {
                    nextFileName = info.fileName
                    outputCurrent()
                }
            });
        }


    } catch (error) {
        console.error(`Error fetching page: ${url}`, error);
    }
}

// 起始URL，根据实际情况替换
const startUrl = 'http://m.doupocangqiong.cc/138913/t1.html'; // 替换为你要爬取的起始页面URL

// 开始爬取
fetchPage({ url: startUrl });