function FLIP(
  element,
  animateFrom,
  animateTo,
  option,
  finishCB = () => undefined
) {
  // Get the first position.
  const first = element.getBoundingClientRect();

  // Move it to the end.
  element.classList.add('ongoing-flip');

  // Get the last position.
  const last = element.getBoundingClientRect();

  // Go from the inverted position to last.
  const player = element.animate(
    [animateFrom({ first, last }), animateTo({ first, last })],
    option
  );

  // Do any tidy up at the end
  // of the animation.
  player.addEventListener('finish', () => {
    element.classList.remove('ongoing-flip');
    finishCB();
  });
}

export default FLIP;
