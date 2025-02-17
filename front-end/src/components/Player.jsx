import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlay,
    faCirclePause,
    faBackwardStep,
    faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useNavigate } from "react-router-dom";

const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${minutes < 10 ? "0" + minutes : minutes}:${
        seconds < 10 ? "0" + seconds : seconds
    }`;
};

const timeInSeconds = (timeString) => {
    const splitArray = timeString.split(":");
    const minutes = Number(splitArray[0]);
    const seconds = Number(splitArray[1]);

    return seconds + minutes * 60;
};

const Player = ({ duration, songsArrayFromArtist, audio }) => {
    const { id } = useParams();
    const audioPlayer = useRef();
    const progressBar = useRef();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(formatTime(0));
    const durationInSeconds = timeInSeconds(duration);

    // Encontra o índice da música atual no array
    const currentIndex = songsArrayFromArtist.findIndex(
        (songsArrayFromArtist) => songsArrayFromArtist._id === id
    );

    const nextSong =
        songsArrayFromArtist[(currentIndex + 1) % songsArrayFromArtist.length]
            ._id;
    const previousSong =
        songsArrayFromArtist[
            (currentIndex - 1 + songsArrayFromArtist.length) %
                songsArrayFromArtist.length
        ]._id;

    const playPause = () => {
        isPlaying ? audioPlayer.current.pause() : audioPlayer.current.play();
        setIsPlaying(!isPlaying);
        setCurrentTime(formatTime(audioPlayer.current.currentTime));
    };
    // console.log(audioPlayer.current.play());

    // const intervalId = setInterval(() => {
    //     setCurrentTime(formatTime(audioPlayer.current.currentTime));
    // }, 1000);

    useEffect(() => {
        const intervalId = setInterval(() => {
            //useEffect para atualizar o tempo da música
            if (isPlaying)
                setCurrentTime(formatTime(audioPlayer.current.currentTime)); //No primeiro argumento, passamos uma função que será executada a cada segundo. No segundo argumento, passamos uma funçao de limpeza. No caso, a função de limpeza limpa o intervalo. No terceiro argumento, passamos uma variável que, quando mudar, o useEffect será executado novamente.

            progressBar.current.style.setProperty(
                "--_progress",
                (audioPlayer.current.currentTime / durationInSeconds) * 100 +
                    "%"
            );
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [isPlaying]);

    return (
        <div className="player">
            <div className="player__controllers">
                <Link to={`/song/${previousSong}`}>
                    <FontAwesomeIcon
                        className="player__icon "
                        icon={faBackwardStep}
                    />
                </Link>

                <FontAwesomeIcon
                    onClick={() => {
                        playPause();
                    }}
                    className="player__icon player__icon--play "
                    icon={isPlaying ? faCirclePause : faCirclePlay}
                />

                <Link to={`/song/${nextSong}`}>
                    <FontAwesomeIcon
                        className="player__icon "
                        icon={faForwardStep}
                    />
                </Link>
            </div>

            <div className="player__progress">
                <p>{currentTime}</p>
                <div className="player__bar">
                    <div
                        ref={progressBar}
                        className="player__bar-progress"
                    ></div>
                </div>
                <p>{duration}</p>
            </div>

            <audio ref={audioPlayer} src={audio}></audio>
        </div>
    );
};

export default Player;
