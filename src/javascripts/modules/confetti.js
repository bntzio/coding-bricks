import { TweenMax, Power4 } from 'gsap'
import * as _ from 'lodash'
require('./../vendor/physics-2d-plugin')

/*
  🎊 Confetti Party 🎉
  by @EliFitch 👌👇
  ✨ https://codepen.io/elifitch/pen/apxxVL ✨
*/

const DECAY = 4
const SPREAD = 50
const GRAVITY = 1200
const ANGLE_A = 300
const ANGLE_B = 240
const TIMEOUT = 3600

let shoot = true

let dpr = window.devicePixelRatio || 1
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.style.display = 'block'

let confettiSpriteIds = []
let confettiSprites = {}

ctx.scale(dpr, dpr)

function setCanvasSize () {
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
}

function setupListeners () {
  TweenMax.ticker.addEventListener('tick', render)
  canvas.addEventListener('resize', setCanvasSize)
}

function addConfettiParticles (amount, angle, velocity, x, y) {
  let i = 0
  while (i < amount) {
    // Sprite
    const r = _.random(4, 6) * dpr
    const d = _.random(15, 25) * dpr

    const cr = _.random(50, 255)
    const cg = _.random(50, 200)
    const cb = _.random(50, 200)
    const color = `rgb(${cr}, ${cg}, ${cb})`

    const tilt = _.random(10, -10)
    const tiltAngleIncremental = _.random(0.07, 0.05)
    const tiltAngle = 0

    const id = _.uniqueId()
    const sprite = {
      [id]: {
        angle,
        velocity,
        x,
        y,
        r,
        d,
        color,
        tilt,
        tiltAngleIncremental,
        tiltAngle
      }
    }

    Object.assign(confettiSprites, sprite)
    confettiSpriteIds.push(id)
    tweenConfettiParticle(id)
    i++
  }
}

function tweenConfettiParticle (id) {
  const minAngle = confettiSprites[id].angle - SPREAD / 2
  const maxAngle = confettiSprites[id].angle + SPREAD / 2

  const minVelocity = confettiSprites[id].velocity / 4
  const maxVelocity = confettiSprites[id].velocity

  // Physics Props
  const velocity = _.random(minVelocity, maxVelocity)
  const angle = _.random(minAngle, maxAngle)
  const gravity = GRAVITY
  const friction = _.random(0.01, 0.05)
  const d = 0

  TweenMax.to(confettiSprites[id], DECAY, {
    physics2D: {
      velocity,
      angle,
      gravity,
      friction
    },
    d,
    ease: Power4.easeIn,
    onComplete: () => {
      // Remove confetti sprite and id
      _.pull(confettiSpriteIds, id)
      delete confettiSprites[id]
    }
  })
}

function updateConfettiParticle (id) {
  const sprite = confettiSprites[id]
  const tiltAngle = 0.0005 * sprite.d

  sprite.angle += 0.01
  sprite.tiltAngle += tiltAngle
  sprite.tiltAngle += sprite.tiltAngleIncremental
  sprite.tilt = (Math.sin(sprite.tiltAngle - (sprite.r / 2))) * sprite.r * 2
  sprite.y += Math.sin(sprite.angle + sprite.r / 2) * 2
  sprite.x += Math.cos(sprite.angle) / 2
}

function drawConfetti () {
  confettiSpriteIds.map(id => {
    const sprite = confettiSprites[id]

    ctx.beginPath()
    ctx.lineWidth = sprite.d / 2
    ctx.strokeStyle = sprite.color
    ctx.moveTo(sprite.x + sprite.tilt + sprite.r, sprite.y)
    ctx.lineTo(sprite.x + sprite.tilt, sprite.y + sprite.tilt + sprite.r)
    ctx.stroke()

    updateConfettiParticle(id)
  })
}

function render () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawConfetti()
}

function shootConfetti () {
  window.requestAnimationFrame(shootConfetti)
  if (shoot) {
    addConfettiParticles(10, ANGLE_A, 5000, 0, canvas.height)
    addConfettiParticles(10, ANGLE_B, 5000, canvas.width, canvas.height)
  }
}

setupListeners()
setCanvasSize()
shootConfetti()

setTimeout(() => {
  shoot = false
}, TIMEOUT)
