const $ = require('jquery')

const warningStyles = {
  'display': 'block',
  'color': 'black',
  'font-size': '1.2rem',
  'text-align': 'center',
  'margin-top': '2rem'
}

$(document).ready(() => {
  let seenAlert = false
  $(window).on('orientationchange', () => {
    // Detects iOS Chrome UA - https://developer.chrome.com/multidevice/user-agent
    if (!navigator.userAgent.match('CriOS')) {
      if (window.innerHeight < window.innerWidth) {
        $('body').css('background-color', 'white')
        $('#main').css('display', 'none')
        $('#warning-message').css(warningStyles)
      } else {
        $('body').css('background-color', '#161930')
        $('#warning-message').css('display', 'none')
        $('#main').css('display', 'block')
      }
    } else {
      if (!seenAlert) {
        window.alert('It\'s recommended to use portrait mode while navigating this site 😉')
        seenAlert = true
      }
    }
  })
})
