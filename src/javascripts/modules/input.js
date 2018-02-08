const $ = require('jquery')

$(document).ready(() => {
  const $input = $('.top__form').find('form').find('input')
  const $button = $('.top__form').find('form').find('button')

  $input.on('keyup', function () {
    if ($(this).val().length > 0) {
      $button.prop('disabled', false)
      $button.css('cursor', 'pointer')
      if ($(window).width() <= 768) {
        $button.addClass('animate-button')
        $button.text('Enroll! 🎉')
      } else {
        if ($button.is(':hover')) {
          $button.addClass('animate-button')
          $button.text('Enroll! 🎉')
        }
      }
    } else {
      $button.removeClass('animate-button')
      $button.text('Enroll')
      $button.css('cursor', 'not-allowed')
      $button.prop('disabled', true)
    }
  })

  if ($(window).width() > 768) {
    $button.on('mouseover', function () {
      $(this).addClass('animate-button')
      $button.text('Enroll! 🎉')
    })
    $button.on('mouseleave', function () {
      $(this).removeClass('animate-button')
      $button.text('Enroll')
    })
  }
})
