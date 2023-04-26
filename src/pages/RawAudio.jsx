import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

import {
  AiOutlineMenu,
  AiOutlineHeart,
  AiOutlineClockCircle,
  AiOutlinePlayCircle,
  AiOutlinePauseCircle,
  AiOutlineMore,
} from "react-icons/ai";
import { ImEqualizer2 } from "react-icons/im";
import {
  MdOutlineRepeat,
  MdShuffle,
  MdBookmarkBorder,
  MdOutlineChevronRight,
  MdOutlineChevronLeft,
} from "react-icons/md";

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
    height: 40,
    barHeight: 0.6,
    // If true, normalize by the maximum peak instead of 1.0.
    normalize: true,
    // Use the PeakCache to improve rendering speed of large waveforms.
    partialRender: true,
    plugins: plugins,
  };
};

// const options = {
//   "Deep Sleep(2)": 2,
//   "Relaxed(8)": 8,
//   "Focused(16)": 16,
//   2: "Deep Sleep(2)",
//   8: "Relaxed(8)",
//   16: "Focused(16)",
// };

const Binaurial = () => {
  const [input, setInput] = useState(110);
  const [diff, setDiff] = useState(10);
  const [blob, setBlob] = useState("/audio.mp3");

  const channel1 = useRef();
  const channel2 = useRef();

  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  const [play, setPlay] = useState(false);

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    const options = getOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(blob);

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

  useEffect(() => {
    console.log(diff);
    if (play) start();
  }, [diff]);

  const onChange = (e) => {
    let text = e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");
    setInput(text);
    if (channel1.current) {
      channel1.current.suspend();
      channel2.current.suspend();
    }
  };

  const start = () => {
    if (play) stop();
    channel1.current = new (window.AudioContext || window.webkitAudioContent)();
    channel2.current = new (window.AudioContext || window.webkitAudioContent)();

    const osc1 = channel1.current.createOscillator(); //default frequency is 440HZ
    osc1.frequency.value = input;
    const osc2 = channel2.current.createOscillator();
    osc2.frequency.value = input - diff;

    const leftStereo = new StereoPannerNode(channel1.current, { pan: -1 });
    const rightStereo = new StereoPannerNode(channel2.current, { pan: 1 });

    osc1.connect(leftStereo).connect(channel1.current.destination);
    osc2.connect(rightStereo).connect(channel2.current.destination);

    //Play
    osc1.start();
    osc2.start();

    setPlay(true);
  };
  const stop = () => {
    channel1.current.suspend();
    channel2.current.suspend();
    setPlay(false);
  };
  return (
    <div className="w-screen h-screen bg-white flex flex-col">
      <div className="grow-[3] m-2">
        <div className="flex justify-end relative">
          <AiOutlineMenu className="w-12 h-12 p-2 cursor-pointer absolute start-0" />
          <AiOutlineHeart className="w-12 h-12 p-2 cursor-pointer basis-16" />
          <ImEqualizer2 className="w-12 h-12 p-2 cursor-pointer basis-16" />
          <AiOutlineClockCircle className="w-12 h-12 p-2 cursor-pointer basis-16" />
        </div>
        <div className="mx-8 my-2 max-h-80 rounded-md overflow-hidden relative">
          <img
            src="https://s3-aop.plusmember.jp/prod/public/yorushika/contents/discography/a2c91653ae3e7272ee7847002a9fb95f.jpeg"
            alt="Album Cover"
            className="object-contain"
          />
          <div className="absolute flex flex-col w-fit bottom-1 left-1 text-neutral-300">
            <div className="">Yorushika</div>
            <div>Moonlight</div>
            <div>Miyagochi</div>
          </div>
        </div>
        <div className="flex justify-between px-2 items-center text-lg">
          <MdBookmarkBorder className="h-12 w-8" />
          <div className="grow flex flex-col items-center">
            <span className="font-bold">Miyagochi</span>
            <span className="text-gray-800 font-normal">Yorushika</span>
            <span className="text-gray-800 font-normal">Moonlight Live</span>
          </div>
          <AiOutlineMore className="h-12 w-8" />
        </div>
        <div className="p-2">
          <div id="waveform" ref={waveformRef} />
        </div>
      </div>
      <div className="flex flex-col w-full basis-24 bg-yellow-600 grow">
        <div className=" flex justify-between items-center">
          <MdShuffle className="grow h-16 p-2 text-amber-300" />
          <div className="flex justify-between grow-[3] items-center">
            <MdOutlineChevronLeft
              className="align-start grow h-24 text-gray-300"
              onClick={() => wavesurfer.current.skip(-10)}
            />
            {play ? (
              <AiOutlinePauseCircle
                className="align-start grow h-24 text-gray-300"
                onClick={handlePlayPause}
              />
            ) : (
              <AiOutlinePlayCircle
                className="align-start grow h-24 text-gray-300"
                onClick={handlePlayPause}
              />
            )}
            <MdOutlineChevronRight
              className="align-start grow h-24 text-gray-300"
              onClick={() => wavesurfer.current.skip(10)}
            />
          </div>
          <MdOutlineRepeat className="grow h-16 p-2 text-amber-300" />
        </div>
        <div className="grid grid-rows-1 grid-cols-3 justify-items-center px-4 text-gray-300 opacity-95">
          <span className="justify-self-start">1.00 x</span>
          <span className="">#3 - 3/8</span>
        </div>
      </div>
    </div>
  );
};

export default Binaurial;
