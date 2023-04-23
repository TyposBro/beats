// import { useEffect, useRef, useState } from "react";
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

// const options = {
//   "Deep Sleep(2)": 2,
//   "Relaxed(8)": 8,
//   "Focused(16)": 16,
//   2: "Deep Sleep(2)",
//   8: "Relaxed(8)",
//   16: "Focused(16)",
// };

const Binaurial = () => {
  // const [input, setInput] = useState(110);
  // const [diff, setDiff] = useState(10);
  // const [playing, setPlaying] = useState(false);
  // useEffect(() => {
  //   console.log(diff);
  //   if (playing) start();
  // }, [diff]);
  // const onChange = (e) => {
  //   let text = e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");
  //   setInput(text);
  //   if (channel1.current) {
  //     channel1.current.suspend();
  //     channel2.current.suspend();
  //   }
  // };
  // const channel1 = useRef();
  // const channel2 = useRef();

  // const start = () => {
  //   if (playing) stop();
  //   channel1.current = new (window.AudioContext || window.webkitAudioContent)();
  //   channel2.current = new (window.AudioContext || window.webkitAudioContent)();

  //   const osc1 = channel1.current.createOscillator(); //default frequency is 440HZ
  //   osc1.frequency.value = input;
  //   const osc2 = channel2.current.createOscillator();
  //   osc2.frequency.value = input - diff;

  //   const leftStereo = new StereoPannerNode(channel1.current);
  //   leftStereo.pan.value = -1;
  //   const rightStereo = new StereoPannerNode(channel2.current, { pan: 1 });

  //   osc1.connect(leftStereo).connect(channel1.current.destination);

  //   osc2.connect(rightStereo).connect(channel2.current.destination);

  //   //Play
  //   osc1.start();
  //   osc2.start();

  //   setPlaying(true);
  // };
  // const stop = () => {
  //   channel1.current.suspend();
  //   channel2.current.suspend();
  //   setPlaying(false);
  // };
  return (
    <div className="w-screen h-screen bg-white flex flex-col">
      <div className="grow-[3] m-2">
        <div className="flex justify-end relative">
          <AiOutlineMenu className="w-12 h-12 p-2 cursor-pointer absolute start-0" />
          <AiOutlineHeart className="w-12 h-12 p-2 cursor-pointer basis-16" />
          <ImEqualizer2 className="w-12 h-12 p-2 cursor-pointer basis-16" />
          <AiOutlineClockCircle className="w-12 h-12 p-2 cursor-pointer basis-16" />
        </div>
        <div className="mx-8 my-2 rounded-md overflow-hidden relative">
          <img
            src="https://s3-aop.plusmember.jp/prod/public/yorushika/contents/discography/a2c91653ae3e7272ee7847002a9fb95f.jpeg"
            alt="Album Cover"
            className="object-contain"
          />
          <div className="absolute flex flex-col w-fit bottom-1 left-1 text-neutral-300">
            <span className="">Yorushika</span>
            <span>Moonlight</span>
            <span>Yamaguchi</span>
          </div>
        </div>
      </div>
      <div className="w-full basis-24 bg-yellow-600 grow flex justify-between items-center">
        <MdShuffle className="grow h-14 p-2 text-amber-300" />
        <div className="flex justify-between grow-[3] items-center">
          <MdOutlineChevronLeft className="align-start grow h-24 text-gray-300" />
          <AiOutlinePlayCircle className="align-start grow h-24 text-gray-300" />
          <MdOutlineChevronRight className="align-start grow h-24 text-gray-300" />
        </div>
        <MdOutlineRepeat className="grow h-14 p-2 text-amber-300" />
      </div>
    </div>
  );
};

export default Binaurial;
