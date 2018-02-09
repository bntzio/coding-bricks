const $ = require('jquery')

$(document).ready(() => {
  // Buttons
  const $prevBtn = $('.outline__cards__prev')
  const $nextBtn = $('.outline__cards__next')

  // Cards
  const $cards = $('.outline__cards__card')

  // jQuery Fun!! 🎉
  $nextBtn.click(() => {
    const $currentCard = $cards.filter(function () {
      if ($(this).hasClass('active')) {
        return $(this)
      }
    })

    const currentCardPos = parseInt($currentCard.data('module'))
    const nextCard = $cards[currentCardPos]

    if (currentCardPos === 1) {
      $prevBtn.removeClass('hidden')
    } else if (currentCardPos === $cards.length - 1) {
      $nextBtn.addClass('hidden')
    }

    $currentCard.removeClass('active').addClass('hidden')
    nextCard.classList.remove('hidden')
    nextCard.classList.add('active')
  })

  $prevBtn.click(() => {
    const $currentCard = $cards.filter(function () {
      if ($(this).hasClass('active')) {
        return $(this)
      }
    })

    const currentCardPos = parseInt($currentCard.data('module'))
    const prevCard = $cards[currentCardPos - 2]

    if ((currentCardPos - 1) === 1) {
      $prevBtn.addClass('hidden')
    } else if (currentCardPos === $cards.length) {
      $nextBtn.removeClass('hidden')
    }

    $currentCard.removeClass('active').addClass('hidden')
    prevCard.classList.remove('hidden')
    prevCard.classList.add('active')
  })
})
