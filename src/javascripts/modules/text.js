const $ = require('jquery')

$(document).ready(() => {
  const $text = $('.details__overview')
  const content = `
    <b>I know what you're thinking...🔮</b>
    <br />
    <br />
    What?! 10 programming languages and 30 apps in one course?
    <br />
    <br />
    Yep, you're right, 10 programming languages, 30 apps.
    <br />
    <br />
    You'll learn how to think like a programmer, how to code real apps, and most important, you'll become a programmer with solid understanding of what's going on under the hood.
    <br />
    <br />
    The programming world is full of languages, tools, frameworks and libraries, and believe me, it's difficult to find where and how to start.
    <br />
    <br />
    That's why I created this course, to teach people like you how to code from the very beginning, from A to Z, and how to do it well.
    <br />
    <br />
    Are you ready to become a programmer? 😉
  `

  const css = {
    'line-height': '1.3rem',
    'font-size': '.94rem'
  }

  if ($(window).width() <= '768') {
    $text.empty()
    $text.append(content)
    $text.css(css)
  }
})
