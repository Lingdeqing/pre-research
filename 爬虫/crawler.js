const axios = require('axios');
const cheerio = require('cheerio');
const fse = require('fs-extra')
const path = require('path')


// 定义一个函数来获取页面内容和下一个页面的链接
async function fetchPage(url) {
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
        let nextLinkHtml = ''
        if (nextPageLink) {
            // nextPageLink = new URL(url).origin + nextPageLink
            nextLinkHtml = `<a href="${nextPageLink}">下一页</a>`
        }

        // 打印标题和文章内容
        console.log(`Title: ${title}`);
        console.log('Article HTML:');
        console.log(articleHtml);
        fse.outputFile(path.resolve(__dirname, `河神/${title.replace(/\s+/, '_')}.md`), `<h1>${title}</h1>
        <div>${nextLinkHtml}</div>
        <div>${articleHtml}</div>
        <div>${nextLinkHtml}</div>`)

        // 递归调用以爬取下一个页面
        if (nextPageLink) {
            // nextPageLink = new URL(url).origin + nextPageLink
            // await fetchPage(nextPageLink);
        }


    } catch (error) {
        console.error(`Error fetching page: ${url}`, error);
    }
}

// 起始URL，根据实际情况替换
const startUrl = 'http://m.doupocangqiong.cc/138913/t1.html'; // 替换为你要爬取的起始页面URL

// 开始爬取
fetchPage(startUrl);