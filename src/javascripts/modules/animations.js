const $ = require('jquery')
const { TimelineMax, TweenMax } = require('gsap')
const ScrollMagic = require('ScrollMagic')
require('debug.addIndicators')

$(document).ready(() => {
  /* gsap */
  const $char = $('.top__title__char')
  const tl = new TimelineMax({ repeat: -1, repeatDelay: 10 })
  tl.staggerTo($char, 0.2, { scale: 1.2, y: 10, repeat: 1, yoyo: true }, 0.1)
  $char.mouseenter((el) => {
    if (tl.isActive() === true) {
      tl.restart()
      tl.kill()
    } else {
      tl.kill()
    }
    TweenMax.to(el.currentTarget, 0.3, {
      scale: 1.4, rotation: Math.floor(Math.random() * 61) - 30
    })
  })
  $char.mouseleave((el) => {
    TweenMax.to(el.currentTarget, 0.3, { scale: 1, rotation: 0 })
  })
  /* scrollmagic */
  const controller = new ScrollMagic.Controller({ addIndicators: false })
  const mobileController = new ScrollMagic.Controller({ addIndicators: true })
  const desktopController = new ScrollMagic.Controller({ addIndicators: true })

  let introScene
  const createIntroScene = () => {
    introScene = new ScrollMagic.Scene({
      triggerElement: '.top__share'
    })
    .setClassToggle('.top__wrapper', 'fade-out')
    .addIndicators({
      name: 'topFadeOut',
      indent: 0
    })
    .addTo(controller)
  }
  createIntroScene()

  const destroyIntroScene = () => {
    introScene.destroy()
  }

  if ($(window).width() <= 768) {
    $('.top__form').find('form').find('input').on('focus', () => {
      destroyIntroScene()
    })
    $('.top__form').find('form').find('input').on('focusout', () => {
      createIntroScene()
    })
  }

  new ScrollMagic.Scene({
    triggerElement: '.top__share'
  })
  .setClassToggle('.details__wrapper', 'appear')
  .addIndicators({
    name: 'detailsFadeIn',
    indent: 200
  })
  .addTo(controller)

  let mobilePinScene
  if ($(window).width() <= (1024 - 1)) {
    mobilePinScene = new ScrollMagic.Scene({
      triggerElement: '.outline',
      triggerHook: 0
    })
    .setPin('.outline__wrapper', { pushFollowers: false })
    .addIndicators({
      name: 'courseContentPin',
      indent: 0
    })
    .addTo(mobileController)
  } else {
    new ScrollMagic.Scene({
      triggerElement: '.outline',
      triggerHook: 0,
      duration: '50%'
    })
    .setPin('.outline__wrapper', { pushFollowers: false })
    .addIndicators({
      name: 'courseContentPin',
      indent: 0
    })
    .addTo(desktopController)

    new ScrollMagic.Scene({
      triggerElement: '.pricing'
    })
    .setClassToggle('.outline__cards', 'swipe-down')
    .addIndicators({
      name: 'courseContentSwipeDown',
      indent: 600
    })
    .addTo(desktopController)
  }

  $(window).resize(() => {
    if ($(window).width() <= (1024 - 1)) {
      desktopController.destroy(true)

      if (!mobilePinScene) {
        mobilePinScene = new ScrollMagic.Scene({
          triggerElement: '.outline',
          triggerHook: 0
        })
        .setPin('.outline__wrapper', { pushFollowers: false })
        .addIndicators({
          name: 'courseContentPin',
          indent: 0
        })
        .addTo(mobileController)
      }
    }
  })

  new ScrollMagic.Scene({
    triggerElement: '.pricing'
  })
  .setClassToggle('.outline__title', 'disappear')
  .addIndicators({
    name: 'hideCourseContentTitle',
    indent: 300
  })
  .addTo(controller)

  new ScrollMagic.Scene({
    triggerElement: '.pricing'
  })
  .setClassToggle('.pricing', 'top-shadow')
  .addIndicators({
    name: 'addCourseContentShadow',
    indent: 0
  })
  .addTo(controller)

  /* jquery */
  const socialShareAnimation = () => {
    const $facebookBtn = $('#facebook-share')
    const $twitterBtn = $('#twitter-share')
    const $shareMessage = $('.top__share__message')

    $facebookBtn.add($twitterBtn).on('mouseover', function (ev) {
      $shareMessage.css('transform', 'translateY(2.5rem)')
      $shareMessage.css('opacity', '1')

      if (ev.currentTarget.id.includes('facebook')) {
        $shareMessage.html('<span>Share</span> the Course!')
      } else {
        $shareMessage.html('<span>Tweet</span> the Course!')
      }
    })

    $facebookBtn.add($twitterBtn).on('mouseleave', function () {
      $shareMessage.css('transform', 'translateY(0.5rem)')
      $shareMessage.css('opacity', '0')
    })
  }

  if ($(window).width() > 768) {
    socialShareAnimation()
  }

  $(window).resize(() => {
    if ($(window).width() > 768) {
      socialShareAnimation()
    }
  })

  const $kidText = $('#hackerkid')
  const $profilePhoto = $('#profile-photo')

  $kidText.mouseover(() => {
    $profilePhoto.attr('src', '/images/kid.jpg')
  })
  $kidText.mouseleave(() => {
    $profilePhoto.attr('src', '/images/profile.jpg')
  })
})
