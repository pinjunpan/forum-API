const { User } = require('../../models')

const userServices = require('../../services/user-services')

const userController = {
  signUpPage: (req, res) => {
    res.render('signUp')
  },
  signUp: (req, res, next) => {
    userServices.signUp(req, (err, data) => {
      if (err) return next(err)

      req.flash('success_messages', '成功註冊帳號！')
      return res.redirect('/signin')
    })
  },
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/restaurants')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/signin')
  },
  getUser: (req, res, next) => {
    userServices.getUser(req, (err, data) => err ? next(err) : res.render('users/profile', data))
  },
  editUser: (req, res, next) => {
    return User.findByPk(req.params.id, {
      raw: true
    })
      .then(user => {
        if (!user) throw new Error("User didn't exist!")

        return res.render('users/edit', { user })
      })
      .catch(err => next(err))
  },
  putUser: (req, res, next) => {
    userServices.putUser(req, (err, data) => {
      if (err) return next(err)

      req.flash('success_messages', '使用者資料編輯成功')
      req.session.updatedData = data
      return res.redirect(`/users/${req.params.id}`)
    })
  },
  addFavorite: (req, res, next) => {
    userServices.addFavorite(req, (err, data) => {
      if (err) return next(err)

      req.flash('success_messages', '成功新增最愛')
      req.session.favoritedData = data
      return res.redirect('back')
    })
  },
  removeFavorite: (req, res, next) => {
    userServices.removeFavorite(req, (err, data) => {
      if (err) return next(err)

      req.flash('success_messages', '成功刪除最愛')
      req.session.deletedData = data
      return res.redirect('back')
    })
  },
  addLike: (req, res, next) => {
    userServices.addLike(req, (err, data) => {
      if (err) return next(err)

      req.flash('success_messages', '成功新增 Like')
      req.session.likedData = data
      return res.redirect('back')
    })
  },
  removeLike: (req, res, next) => {
    userServices.removeLike(req, (err, data) => {
      if (err) return next(err)

      req.flash('success_messages', '成功刪除 Like')
      req.session.deletedData = data
      return res.redirect('back')
    })
  },
  getTopUsers: (req, res, next) => {
    userServices.getTopUsers(req, (err, data) => err ? next(err) : res.render('top-users', data))
  },
  addFollowing: (req, res, next) => {
    userServices.addFollowing(req, (err, data) => {
      if (err) return next(err)

      req.flash('success_messages', '成功追蹤')
      req.session.deletedData = data
      return res.redirect('back')
    })
  },
  removeFollowing: (req, res, next) => {
    userServices.removeFollowing(req, (err, data) => {
      if (err) return next(err)

      req.flash('success_messages', '刪除追蹤')
      req.session.deletedData = data
      return res.redirect('back')
    })
  }
}

module.exports = userController
