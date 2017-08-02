const CATEGORY = {0:'ONE', 1: '阅读', 2: '连载', 3: '问答', 4: '音乐', 5: '影视', 6: '广告'}

export default {
  install (Vue) {
    /**
     * @param {Number} category
     */
    Vue.filter('categoryName', function (category) {
      return CATEGORY[category]
    })
  }
}
