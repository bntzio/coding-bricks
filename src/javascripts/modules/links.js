const $ = require('jquery')

$(document).ready(() => {
  const $facebook = $('#facebook-icon')
  const $twitter = $('#twitter-icon')
  const $instagram = $('#instagram-icon')
  const $medium = $('#medium-icon')

  const navigate = (site) => {
    let link
    let mLink
    let deepLink

    if (site === 'facebook') {
      link = 'https://facebook.com/bntzio'
      mLink = 'https://m.facebook.com/bntzio'
      deepLink = 'fb://profile/1364405213586613'
    } else if (site === 'twitter') {
      link = 'https://twitter.com/bntzio'
      mLink = 'https://mobile.twitter.com/bntzio'
      deepLink = 'twitter://user?screen_name=bntzio'
    } else if (site === 'instagram') {
      link = 'https://instagram.com/bntzio'
      mLink = 'https://instagram.com/bntzio'
      deepLink = 'instagram://user?username=bntzio'
    } else {
      link = 'https://medium.com/@bntz'
      mLink = 'https://medium.com/@bntz'
      deepLink = 'medium://p/f5c8e93464af'
    }

    switch (navigator.platform) {
      case 'iPhone' || 'iPad' || 'iPod':
        window.location = deepLink
        setTimeout(() => { window.location = mLink }, 25)
        break
      default:
        window.open(link)
    }
  }

  $facebook.add($twitter).add($instagram).add($medium).click((el) => {
    if (el.currentTarget.id.includes('facebook')) {
      navigate('facebook')
    } else if (el.currentTarget.id.includes('twitter')) {
      navigate('twitter')
    } else if (el.currentTarget.id.includes('instagram')) {
      navigate('instagram')
    } else {
      navigate('medium')
    }
  })
})
