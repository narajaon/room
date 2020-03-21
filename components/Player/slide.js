import { WIDTH, MULT, paddings } from './const';

export function slide(arr, direction, padding) {
  if (!direction) return arr;

  if (direction === 'right') {
    return arr
      .slice(arr.length - padding)
      .concat(arr.slice(0, arr.length - padding));
  }

  return arr.slice(padding).concat(arr.slice(0, padding));
}

export function clipClickHandler(slug, clips, ref, cb) {
  const byVideoSlug = videoSlug => clip => videoSlug === clip.slug;

  return async () => {
    const indexOfClicked = clips.findIndex(byVideoSlug(slug));
    if (indexOfClicked === 2) {
      return;
    }

    let direction;
    if (indexOfClicked > 2) {
      direction = 'left';
    } else if (indexOfClicked < 2) {
      direction = 'right';
    }

    const result = slide(clips, direction, paddings[indexOfClicked]);

    await Promise.all(
      Array.prototype.map.call(ref.current.children, (elem, index) => {
        const nextIndex = result.indexOf(clips[index]);
        const initPos = WIDTH * -(2 - index) * MULT;
        const nextPos = WIDTH * -(2 - nextIndex) * MULT;
        const initScale = 1 - paddings[index] * 0.15;
        const nextScale = 1 - paddings[nextIndex] * 0.15;

        let opacity = [1, 1];

        if (direction === 'left') {
          if ((index === 0 || index === 1) && paddings[indexOfClicked] === 2) {
            opacity = [1, 0];
          } else if (index === 0) {
            opacity = [1, 0];
          }
        } else if (direction === 'right') {
          if ((index === 3 || index === 4) && paddings[indexOfClicked] === 2) {
            opacity = [1, 0];
          } else if (index === 4) {
            opacity = [1, 0];
          }
        }

        const player = elem.animate(
          {
            transform: [
              `translateX(${initPos}px) scale(${initScale}, ${initScale})`,
              `translateX(${nextPos}px) scale(${nextScale}, ${nextScale})`
            ],
            opacity
          },
          {
            duration: 300,
            delay: 100
          }
        );

        return new Promise(res =>
          player.addEventListener('finish', () => {
            res();
            player.removeEventListener('finish', () => null);
          })
        );
      })
    );

    cb(result);
  };
}

export function playNext(clips, ref, cb) {
  const { slug: nextClipSlug } = clips[3];

  return clipClickHandler(nextClipSlug, clips, ref, cb);
}
