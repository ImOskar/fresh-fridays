import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playEnded } from "../redux/preview/preview.actions";

const useAudioPreview = () => {
  const { url, audio, playing } = useSelector((state) => state.preview);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!url) return;
    audio.play();
  }, [url, audio]);

  useEffect(() => {
    if (!audio.getAttribute("src")) return;
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    const onPlayEnded = () => {
      dispatch(playEnded());
    };
    audio.addEventListener("ended", onPlayEnded);
    return () => {
      audio.removeEventListener("ended", onPlayEnded);
    };
  }, [audio, dispatch]);
};

export default useAudioPreview;
