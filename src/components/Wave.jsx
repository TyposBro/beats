import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import WaveSurfer from "wavesurfer.js";

const brand = "rgba(0, 229, 139, 1)";

const getOptions = (ref, plugins = []) => {
  return {
    container: ref,
    waveColor: "rgba(250, 239, 221, 0.5)",
    progressColor: brand,
    cursorColor: brand,
    barWidth: 3,
    barRadius: 3,
    responsive: true,
    interact: true,
    height: 50,
    // If true, normalize by the maximum peak instead of 1.0.
    normalize: true,
    // Use the PeakCache to improve rendering speed of large waveforms.
    partialRender: true,
    plugins: plugins,
  };
};

export default function Wave({ blob }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  const [play, setPlay] = useState(false);

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    const options = getOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.loadBlob(blob);

    wavesurfer.current.on("ready", () => {
      setPlay(false);
      wavesurfer.current.setVolume(1);
    });
    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [blob]);

  const handlePlayPause = () => {
    if (!play) {
      wavesurfer.current.playPause();
      setPlay(true);
    } else {
      setPlay(false);
      wavesurfer.current.playPause();
    }
  };
  return (
    <div>
      <div id="waveform" ref={waveformRef} />

      <div>
        {/* <Replay10 onClick={() => wavesurfer.current.skip(-10)} />
        {play ? <Pause onClick={handlePlayPause} /> : <Play onClick={handlePlayPause} />}
        <Forward10 onClick={() => wavesurfer.current.skip(10)} /> */}
      </div>
    </div>
  );
}

Wave.propTypes = {
  blob: PropTypes.blob.isRequired,
};
