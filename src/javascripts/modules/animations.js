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
  let introScene

  const createIntroScene = () => {
    introScene = new ScrollMagic.Scene({
      triggerElement: '.top__share'
    })
    .setClassToggle('.top__wrapper', 'fade-out')
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
  .addTo(controller)

  new ScrollMagic.Scene({
    triggerElement: '.outline',
    triggerHook: 0,
    duration: '50%'
  })
  .setPin('.outline__wrapper', { pushFollowers: false })
  .addTo(controller)

  new ScrollMagic.Scene({
    triggerElement: '.pricing'
  })
  .setClassToggle('.outline__cards', 'swipe-down')
  .addTo(controller)

  new ScrollMagic.Scene({
    triggerElement: '.pricing'
  })
  .setClassToggle('.outline__title', 'disappear')
  .addTo(controller)

  new ScrollMagic.Scene({
    triggerElement: '.pricing'
  })
  .setClassToggle('.pricing', 'top-shadow')
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
})
