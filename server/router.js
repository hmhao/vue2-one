const express = require('express')
const request = require('request')
//cheerio模块,用于对爬取到的页面做解析,得到想要的数据
const cheerio = require('cheerio')
const fs = require('fs')

const router = express.Router()
const httpget = request.defaults({jar: true, json: true})

let url = 'http://m.wufazhuce.com'
let token = {
  picture: null,
  article: null,
  music: null,
  movie: null
};
let fetchToken = function (name, callback) {
  return function (req, res, next) {
    if (!token[name]) {
      httpget(`${url}/one/`, function (err, response, html) {
        console.log(`${name}Data token爬取结束`)
        let $ = cheerio.load(html),
          regex = /One.token\s*=\s*['"]([^'"]+)['"]/g
        $('script')
          .filter(function(i, script) {
            return script.children.length
          })
          .each(function (i, script) {
            let scriptText = script.children[0].data
            let match = regex.exec(scriptText)
            if (match) {
              token[name] = match[1]
              return false
            }
          })
        token[name] ? callback(req, res, next) : res.send([])
      })
    } else {
      callback(req, res, next)
    }
  }
}
let fetchData = function (name) {
  return fetchToken(name, function handler(req, res, next) {
    let index = req.query.index || '0'
    let path = name === 'picture' ? 'one' : name
    httpget(`${url}/${path}/ajaxlist/${index}?_token=${token[name]}`, function (err, response, body) {
      if (err) {
        console.log(err)
      }
      if (body.res === -99) {// token失效
        console.log(`${name}Data token失效`)
        token[name] = null
        fetchToken(name, handler)(req, res, next)
      } else {
        console.log(`${name}Data爬取结束`)
        res.send(body)
      }
    })
  })
}

router.get('/homeData', function (req, res, next) {
  let homeDesc = {},
      homeArticle = {},
      homeQuestion = {}

  httpget(url, function (err, response, html) {
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
router.get('/pictureData', fetchData('picture'))
router.get('/articleData', fetchData('article'))
router.get('/musicData', fetchData('music'))
router.get('/movieData', fetchData('movie'))

router.get('/pictureDetail', function (req, res, next) {
  let id = req.query.id,
      detail = {}

  httpget(`${url}/one/${id}`, function (err, response, html) {
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

  httpget(`${url}/article/${id}`, function (err, response, html) {
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
router.get('/musicDetail', function (req, res, next) {
  let id = req.query.id,
    detail = {
      editor: []
    }

  httpget(`${url}/music/${id}`, function (err, response, html) {
    console.log('music爬取结束');
    let $ = cheerio.load(html, {decodeEntities: false})
    detail.img = $('.text-detail').find('script, #popupXiamiMusic').remove().end().html()
    detail.musicInfo = $('.text-music-info').html()
    detail.title = $('.text-title').text()
    detail.author = $('.text-simple-author').text()
    detail.article = $('.text-content').html()

    $('.text-editor').each(function(){
      detail.editor.push($(this).text())
    })
    res.charset = 'utf-8'
    res.send({detail})
  })
})
router.get('/movieDetail', function (req, res, next) {
  let id = req.query.id,
    detail = {
      editor: []
    }

  httpget(`${url}/movie/${id}`, function (err, response, html) {
    console.log('movie爬取结束');
    let $ = cheerio.load(html, {decodeEntities: false})
    detail.topImg = $('.text-title').prev().attr('style').replace(/margin-top[^;]+;/, '')
    detail.title = $('.text-title').text()
    detail.subtitle = $('.text-subtitle').text()
    detail.author = $('.text-simple-author').text()
    detail.article = $('.text-content').html()

    $('.text-editor').each(function(){
      detail.editor.push($(this).text())
    })
    res.charset = 'utf-8'
    res.send({detail})
  })
})
router.get('/questionDetail', function (req, res, next) {
  let id = req.query.id,
      detail = {}

  httpget(`${url}/question/${id}`, function (err, response, html) {
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

router.get('/search', function (req, res, next) {
  let type = req.query.type || '',
    keyword = req.query.keyword || '',
    page = req.query.page || 1,
    searchType = 'search',
    result = {
      data: [],
      page: page,
      haveNext: false
    }

  switch (type) {
    case 'picture': searchType += 'Pic';break;
    case 'music': searchType += 'Music';break;
    case 'movie': searchType += 'Movie';break;
    case 'question': searchType += 'Que';break;
  }

  httpget(`${url}/${searchType}?searchString=${keyword}&page=${page}`, function (err, response, html) {
    console.log(`${searchType},${keyword},${page}爬取结束`);
    let $ = cheerio.load(html, {decodeEntities: false})
    let $item
    if (type === 'picture') {
      $('.search_result .item-picture.link-div').each(function (i, item) {
        $item = $(item)
        result.data.push({
          date: $item.find('.date').text(),
          img: $item.find('.item-picture-img').attr('src'),
          author: $item.find('.text-author').text().trim(),
          content: $item.find('.text-content-short').html(),
          id: $item.find('.div-link').attr('href').split('/')[4]
        })
      })
    } else if (type === 'article') {
      $('.search_result .item-text.link-div').each(function (i, item) {
        $item = $(item)

        let $author = $item.find('.text-author'),
          author = $author.text().trim();

        $author.remove()
        result.data.push({
          date: $item.find('.date').text(),
          author,
          title: $item.find('.text-title').text().trim(),
          content: $item.find('.text-content-short').html(),
          id: $item.find('.div-link').attr('href').split('/')[4]
        })
      })
    }

    let $listFooter = $('.list-footer a')
    if ($listFooter.length) {
      result.haveNext = $($listFooter[$listFooter.length-1]).hasClass('normal')
    }

    res.charset = 'utf-8'
    res.send(result)
  })
})

module.exports = router
