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
  /* jquery */
  $('#enroll').mouseenter(function () {
    $(this).text('Enroll! 🎉')
  })
  $('#enroll').mouseleave(function () {
    $(this).text('Enroll')
  })
  /* scrollmagic */
  const controller = new ScrollMagic.Controller({ addIndicators: false })

  new ScrollMagic.Scene({
    triggerElement: '.intro-scroll'
  })
  .setClassToggle('.top__wrapper', 'fade-out')
  .addTo(controller)

  new ScrollMagic.Scene({
    triggerElement: '.intro-scroll'
  })
  .setClassToggle('.details__wrapper', 'fade-in')
  .addTo(controller)
})
