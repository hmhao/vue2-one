const express = require('express')
const http = require('http')
//cheerio模块,用于对爬取到的页面做解析,得到想要的数据
const cheerio = require('cheerio')
const fs = require('fs')

const router = express.Router()

let url = 'http://m.wufazhuce.com'

const httpget = function (url, callback) {
  let html
  http.get(url, function (res) {
    res.on('data', function (chunk) {
      html += chunk
    })
    res.on('end', function () {
      callback && callback(html)
    })
  }).on('error', function (err) {
    console.log(err)
  })
}

router.get('/homeData', function (req, res, next) {
  let homeDesc = {},
      homeArticle = {},
      homeQuestion = {}

  httpget(url, function (html) {
    console.log('home爬取结束')
    let $ = cheerio.load(html)
    let homeLink = ($('.link-div a').attr('href')).split('/')
    homeDesc.id = homeLink[homeLink.length - 1]
    homeDesc.day = $('.day').text()
    homeDesc.month = $('.month').text()
    homeDesc.textShort = $('.text-content-short').text()
    homeDesc.href = $('.link-div a').attr('href')
    homeDesc.bgImg = $('.home-img').attr('style')

    let articleLink = ($('.text-more a').attr('href')).split('/')
    homeArticle.id = articleLink[articleLink.length - 1]
    homeArticle.artTitle = $('.article .text-title').text()
    homeArticle.artAuthor = $('.article .text-author').text()
    homeArticle.artShort = $('.article .text-content-short').text()
    homeArticle.artShortImg = $('.article .one-img-container img').attr('src')

    let questionLink = ($('.question .text-more a').attr('href')).split('/')
    homeQuestion.id = questionLink[questionLink.length - 1]
    homeQuestion.quesTitle = $('.question .text-title').text()
    homeQuestion.quesShort = $('.question .text-content-short').text()

    res.send({homeDesc, homeArticle, homeQuestion})
  })
})

router.get('/pictureDetail', function (req, res, next) {
  let id = req.query.id,
      detail = {}

  httpget(`${url}/one/${id}`, function (html) {
    console.log('picture爬取结束')
    let $ = cheerio.load(html, {decodeEntities: false})
    detail.img = $('.item-picture-img').attr('src')
    detail.author = $('.text-author').html()
    detail.day = $('.day').text()
    detail.month = $('.month').text()
    detail.article = $('.text-content').text()

    res.charset = 'utf-8'
    res.send({detail})
  })
})

router.get('/articleDetail', function (req, res, next) {
  let id = req.query.id,
      detail = {
        editor: []
      }

  httpget(`${url}/article/${id}`, function (html) {
    console.log('article爬取结束');
    let $ = cheerio.load(html, {decodeEntities: false})
    detail.title = $('.text-title').text()
    detail.author = $('.text-author').text()
    detail.article = $('.text-content').html()
    detail.title = $('.text-title').text()

    $('.text-editor').each(function () {
      detail.editor.push($(this).text())
    })
    res.charset = 'utf-8'
    res.send({detail})
  })
})

router.get('/questionDetail', function (req, res, next) {
  let id = req.query.id,
      detail = {}

  httpget(`${url}/question/${id}`, function (html) {
    console.log('question爬取结束');
    let $ = cheerio.load(html, {decodeEntities: false})
    detail.title = $('.text-title').text()
    detail.author = $('.text-askers').text()
    detail.question = $('.text-askers').next('.text-content').html()
    detail.answers = $('.text-answers').text()
    detail.article = $('.text-answers').next('.text-content').html()
    detail.editor = $('.text-editor').text()

    res.charset = 'utf-8'
    res.send({detail})
  })
})

module.exports = router