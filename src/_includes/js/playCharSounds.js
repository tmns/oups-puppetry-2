var characters = document.querySelectorAll('.character')
var sound;

function playSound() {
  sound = new Audio(`sounds/${this.dataset.sound}.mp3`)
  sound.play().catch((err) => console.log(err))
}

function pauseSound() {
  if (sound) {
    sound.pause()
  }
}

Array.prototype.forEach.call(characters, function (character) {
  character.addEventListener('mouseenter', playSound)
  character.addEventListener('mouseleave', pauseSound)
})