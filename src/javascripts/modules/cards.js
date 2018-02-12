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

  stack.on('dragstart', (e) => {
    const $card = $(e.target)
    if (!$card.hasClass('outline__swipeable__cards__item--20')) {
      const nextCardId = parseInt(e.target.classList[1].split('--')[1]) + 1
      const $nextCard = $(`.outline__swipeable__cards__item--${nextCardId}`)
      const nextCardHeight = $nextCard.css('height')
      const fixedNextCardHeight = parseInt(nextCardHeight.split(' ')[0]) + 4
      const $last4Cards = $('.outline__swipeable__cards__fake')
      $last4Cards.css('height', fixedNextCardHeight)
    } else {
      const $lastCard = $('.outline__swipeable__cards__fake--4')
      $lastCard.css('height', $card.css('height'))
    }
  })

  stack.on('dragmove', (e) => {
    const left = e.throwDirection === Swing.Direction.LEFT
    const right = e.throwDirection === Swing.Direction.RIGHT
    const opacity = 1 - (e.throwOutConfidence - 0.4)
    const $card = $(e.target)
    $card.css('border-top-color', 'white')
    if (!$card.hasClass('outline__swipeable__cards__item--20')) {
      const nextCardId = parseInt(e.target.classList[1].split('--')[1]) + 1
      const $nextCard = $(`.outline__swipeable__cards__item--${nextCardId}`)
      if (left || right) {
        $card.css('opacity', opacity.toString())
        $nextCard.css('opacity', e.throwOutConfidence)
      }
    }
  })

  stack.on('throwout', (e) => {
    const $last4Cards = $('.outline__swipeable__cards__fake')
    const currentCardId = parseInt(e.target.classList[1].split('--')[1])
    if (currentCardId === 17) {
      $last4Cards.css('height', '20px')
      $last4Cards[0].classList.add('hidden')
    } else if (currentCardId === 18) {
      $last4Cards.css('height', '20px')
      $last4Cards[1].classList.add('hidden')
    } else if (currentCardId === 19) {
      $last4Cards.css('height', '20px')
      $last4Cards[2].classList.add('hidden')
    } else if (currentCardId === 20) {
      const $lastCardContent = $('.outline__swipeable__cards__fake__content')
      $lastCardContent.addClass('appear')
    }
    e.target.classList.add('hidden')
  })

  stack.on('throwin', (e) => {
    const $card = $(e.target)
    const nextCardId = parseInt(e.target.classList[1].split('--')[1]) + 1
    const $nextCard = $(`.outline__swipeable__cards__item--${nextCardId}`)
    $nextCard.css('opacity', 0)
    $card.css('border-top-color', 'lightgray')
    $card.css('opacity', '1')
  })

  stack.on('throwinend', (e) => {
    const $last4Cards = $('.outline__swipeable__cards__fake')
    $last4Cards.css('height', '20px')
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
