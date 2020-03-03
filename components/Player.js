import dynamic from 'next/dynamic';
import React from 'react';

function Player({ src }) {
  return <iframe
    id="player"
    src={src}
    height="720"
    width="1280"
    frameBorder="0"
    scrolling="no"
    allowFullScreen="true">
  </iframe>;
}

export default dynamic(() => Promise.resolve(Player), {
  ssr: false,
});
