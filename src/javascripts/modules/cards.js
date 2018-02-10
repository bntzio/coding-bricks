const $ = require('jquery')
const Swing = require('swing')

$(document).ready(() => {
  // Buttons
  const $prevBtn = $('.outline__cards__prev')
  const $nextBtn = $('.outline__cards__next')

  // Swipeable Cards ⬅️🃏➡️
  const config = {
    allowedDirections: [Swing.Direction.LEFT, Swing.Direction.RIGHT],
    throwOutConfidence: (xOffset, yOffset, element) => {
      const xConfidence = Math.min(Math.abs(xOffset) / (element.offsetWidth / 4), 1)
      const yConfidence = Math.min(Math.abs(yOffset) / (element.offsetHeight / 4), 1)

      return Math.max(xConfidence, yConfidence)
    }
  }

  const $swipeableCards = [].slice.call($('.outline__swipeable__cards__item'))
  const stack = Swing.Stack(config)

  $swipeableCards.forEach((card) => {
    stack.createCard(card)
  })

  stack.on('dragmove', (e) => {
    const left = e.throwDirection === Swing.Direction.LEFT
    const right = e.throwDirection === Swing.Direction.RIGHT
    const opacity = 1 - (e.throwOutConfidence - 0.4)
    const $card = $(e.target)

    $card.css('border-top-color', 'white')

    if (left || right) {
      $card.css('opacity', opacity.toString())
      // console.log(`Confidence is ${e.throwOutConfidence} and Opacity is ${opacity}`)
    }
  })

  stack.on('throwout', (e) => {
    e.target.classList.add('hidden')
  })

  stack.on('throwin', (e) => {
    const $card = $(e.target)
    $card.css('border-top-color', 'lightgray')
    $card.css('opacity', '1')
  })

  // jQuery Fun!! 🎉 (card toggling)
  const $cards = $('.outline__cards__card')

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
