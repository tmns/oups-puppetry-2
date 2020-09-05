// Get our characters and set up their sound functions
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

// Configure our button that enables / disables sound
// We render it with display: none by default since we
// don't want to show it if there is no JS. Thus, we must
// display it first below (by adding js-enabled class).
var soundButton = document.querySelector('.sound-btn')
soundButton.classList.add('js-enabled')
var soundOffIcon = soundButton.querySelector('.sound-off')
var soundOnIcon = soundButton.querySelector('.sound-on')
var enableSoundTitle = "Ενεργοποίηση 'Ηχου"
var disableSoundTitle = "Απενεργοποίηση 'Ηχου"
var soundOnAudio = new Audio('sounds/sound-on.mp3')
var soundOffAudio = new Audio('sounds/sound-off.mp3')

soundButton.addEventListener('click', function() {
  if (soundButton.getAttribute('title') === enableSoundTitle) {
    soundOnAudio.play().catch((err) => console.log(err))
    soundButton.setAttribute('title', disableSoundTitle)
    soundButton.setAttribute('aria-label', disableSoundTitle)
    soundOffIcon.style.display = 'none'
    soundOnIcon.style.display = 'inline-block'

    // If we're enabling sound, we add the appropriate
    // mouse enter / leave events to all our characters
    Array.prototype.forEach.call(characters, function (character) {
      character.addEventListener('mouseenter', playSound)
      character.addEventListener('mouseleave', pauseSound)
    })
  } else {
    soundOffAudio.play().catch((err) => console.log(err))
    soundButton.setAttribute('title', enableSoundTitle)
    soundButton.setAttribute('aria-label', enableSoundTitle)
    soundOffIcon.style.display = 'inline-block'
    soundOnIcon.style.display = 'none'

    // If we're disabling sound, we remove the appropriate
    // mouse enter / leave events from all our characters
    Array.prototype.forEach.call(characters, function (character) {
      character.removeEventListener('mouseenter', playSound)
      character.removeEventListener('mouseleave', pauseSound)
    })
  }
})