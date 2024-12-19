const commentServices = require('../../services/comment-services')

const commentController = {
  postComment: (req, res, next) => {
    commentServices.postComment(req, (err, data) => {
      if (err) return next(err)

      req.flash('success_messages', '成功新增評論')
      req.session.newComment = data
      // 修正：id路徑
      return res.redirect(`/restaurants/${data.comment.dataValues.restaurantId}`)
    })
  },
  deleteComment: (req, res, next) => {
    commentServices.deleteComment(req, (err, data) => {
      if (err) return next(err)

      req.flash('success_messages', '成功刪除評論')
      req.session.deletedComment = data
      return res.redirect(`/restaurants/${data.comment.dataValues.restaurantId}`)
    })
  }
}

module.exports = commentController
