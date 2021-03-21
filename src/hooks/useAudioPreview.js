import { useState, useEffect } from "react";

const useAudioPreview = () => {
  const [audio] = useState(new Audio(""));
  const [isPlaying, setIsPlaying] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const onPlayEnded = () => {
      audio.setAttribute("src", "");
      setUrl("");
      setIsPlaying(false);
    };
    audio.addEventListener("ended", onPlayEnded);
    isPlaying ? audio.play() : audio.pause();
    return () => {
      audio.removeEventListener("ended", onPlayEnded);
    };
  }, [audio, isPlaying]);

  useEffect(() => {
    if (url === "") return;
    audio.setAttribute("src", url);
    setIsPlaying(true);
  }, [url, audio]);

  return [{ isPlaying, url }, setIsPlaying, setUrl];
};

export default useAudioPreview;
