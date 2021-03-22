import { useState, useEffect } from "react";

const useAudioPreview = () => {
  const [audio] = useState(new Audio(""));
  const [isPlaying, setIsPlaying] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying, audio]);

  useEffect(() => {
    const onPlayEnded = () => {
      audio.setAttribute("src", "");
      setUrl("");
      setIsPlaying(false);
    };
    audio.addEventListener("ended", onPlayEnded);
    return () => {
      audio.removeEventListener("ended", onPlayEnded);
    };
  }, [audio]);

  useEffect(() => {
    if (url === "") return;
    setIsPlaying(true);
  }, [url]);

  return [{ isPlaying, url, audio }, setIsPlaying, setUrl];
};

export default useAudioPreview;
