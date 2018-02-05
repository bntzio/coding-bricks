const $ = require('jquery')

$(document).ready(() => {
  // Buttons
  const $prevBtn = $('.outline__notebook__prev')
  const $nextBtn = $('.outline__notebook__next')

  // Cards
  const $card1 = $('.outline__notebook__card--1')
  const $card2 = $('.outline__notebook__card--2')
  const $card3 = $('.outline__notebook__card--3')
  const $card4 = $('.outline__notebook__card--4')

  // jQuery Fun!! 🎉
  $nextBtn.click(() => {
    if ($card1.hasClass('hidden') === false) {
      $card2.removeClass('hidden')
      $card1.addClass('hidden')
      $prevBtn.removeClass('hidden')
    } else if ($card2.hasClass('hidden') === false) {
      $card3.removeClass('hidden')
      $card2.addClass('hidden')
    } else if ($card3.hasClass('hidden') === false) {
      $card4.removeClass('hidden')
      $card3.addClass('hidden')
      $nextBtn.addClass('hidden')
    }
  })

  $prevBtn.click(() => {
    if ($card4.hasClass('hidden') === false) {
      $nextBtn.removeClass('hidden')
      $card3.removeClass('hidden')
      $card4.addClass('hidden')
    } else if ($card3.hasClass('hidden') === false) {
      $card2.removeClass('hidden')
      $card3.addClass('hidden')
    } else if ($card2.hasClass('hidden') === false) {
      $card1.removeClass('hidden')
      $card2.addClass('hidden')
      $prevBtn.addClass('hidden')
    }
  })
})
