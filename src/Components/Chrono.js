import React, {useEffect, useReducer, useRef, useState} from "react";
import PauseImg from "../Images/pause.svg";
import PlayImg from "../Images/play.svg";
import ResetImg from "../Images/reset.svg";
// import clock from "../Images/clock.svg";
import breakSound from "../Sound/timeForBreak.mp3";
import workSound from "../Sound/timeForWork.mp3";

const Chrono = () => {
    const [sessionTime, setSessionTime] = useState(1500);
    const [sessionTimeFixed, setSessionTimeFixed] = useState(1500);

    const [breakTime, setBreakTime] = useState(300);
    const [breakTimeFixed, setBreakTimeFixed] = useState(300);

    const [workingChrono, setWorkingChrono] = useState(false);

    const [playAudio, setPlayAudio] = useState(false);
    const breakRef = useRef(null);
    const workRef = useRef(null);


    // eslint-disable-next-line
    const [state, dispatch] = useReducer(reducer);

    // FONCTIONS
    const playPause = () => {
        setWorkingChrono(!workingChrono);
    };

    function reducer(state, action) {
        switch (action.type) {
            case "TICK":
                if (sessionTime >= 0) {
                    setSessionTime(sessionTime - 1);
                } else if (breakTime >= 1) {
                    setBreakTime(breakTime - 1);
                } else if (breakTime <= 0 && breakTime <= 0) {
                    setSessionTime(sessionTimeFixed);
                    setBreakTime(breakTimeFixed);
                }
                break;
            default:
                throw new Error(`Action type non gérée: ${action.type}`);
        }
    }


    useEffect(() => {
        let id;
        if (workingChrono) {
            id = window.setInterval(() => {
                dispatch({type: "TICK"});
            }, 1000);
        }
        return () => {
            // Ceci est une cleanup function, elle permet de vider la mémoire à chaque création d'un nouvel interval
            window.clearInterval(id);
        };
    }, [workingChrono]);
    useEffect(() => {
        if (sessionTime === 0) {
            breakRef.current.play();
            setPlayAudio(true);
        } else if (breakTime === 0) {
            workRef.current.play();
            setPlayAudio(true);
        }
    }, [sessionTime, breakTime, playAudio]);


    const handleSession = (e) => {
        const el = e.target;

        if (el.classList.contains("minus")) {
            if (sessionTime / 60 > 1) {
                setSessionTime(sessionTime - 60);
                setSessionTimeFixed(sessionTimeFixed - 60);
            }
        } else if (el.classList.contains("plus")) {
            setSessionTime(sessionTime + 60);
            setSessionTimeFixed(sessionTimeFixed + 60);
        }
    };

    const handleBreak = (e) => {
        const el = e.target;

        if (el.classList.contains("minus")) {
            if (breakTime / 60 > 1) {
                setBreakTime(breakTime - 60);
                setBreakTimeFixed(breakTimeFixed - 60);
            }
        } else if (el.classList.contains("plus")) {
            setBreakTime(breakTime + 60);
            setBreakTimeFixed(breakTimeFixed + 60);
        }
    };

    const resetFunc = () => {
        if (workingChrono) {
            setWorkingChrono(!workingChrono);
        }
        setSessionTime(sessionTimeFixed);
        setBreakTime(breakTimeFixed);
    };

    return (
        <div
            className={
                workingChrono ? "container-chrono xl:w-1/2 xl:h-[70vh] bg-beige md:bg-beige-light anim-glow" : "container-chrono xl:w-1/2 xl:h-[70vh]  bg-beige md:bg-beige-light"
            }
        >
            <audio className="hidden" ref={breakRef} src={breakSound} preload="auto"></audio>
            <audio className="hidden" ref={workRef} src={workSound} preload="auto"></audio>

            <h4 className="font-bold text-5xl text-bleu">
                CHRONO APP
            </h4>
            {/*<img className="h-[60px] w-auto" src={clock} alt="chronometre"/>*/}
            <div className="container-config">
                <div className="box-btns session">
                    <button
                        className="minus transition ease-in-out lg:hover:-translate-y-1 lg:hover:scale-105 duration-300"
                        onClick={handleSession}>
                        -
                    </button>
                    <span>{sessionTimeFixed / 60}</span>
                    <button
                        className="plus transition ease-in-out lg:hover:-translate-y-1 lg:hover:scale-105 duration-300"
                        onClick={handleSession}>
                        +
                    </button>
                </div>

                <div className="box-btns break">
                    <button
                        className="minus transition ease-in-out lg:hover:-translate-y-1 lg:hover:scale-105 duration-300"
                        onClick={handleBreak}>
                        -
                    </button>
                    <span>{breakTimeFixed / 60}</span>
                    <button
                        className="plus transition ease-in-out lg:hover:-translate-y-1 lg:hover:scale-105 duration-300"
                        onClick={handleBreak}>
                        +
                    </button>
                </div>
            </div>

            <div
                className="w-3/4 lg:w-1/2 rounded-2xl text-7xl text-white bg-gris-mauve flex justify-center items-center py-5 mt-20">
                {sessionTime >= 0 ? (
                    <span className="rounded-2xl">{`${Math.trunc(sessionTime / 60)} : ${
                        sessionTime % 60 < 10
                            ? `0${sessionTime % 60}`
                            : `${sessionTime % 60}`
                    }`}</span>
                ) : (
                    <span className="rounded-2xl">{`${Math.trunc(breakTime / 60)} : ${
                        breakTime % 60 < 10 ? `0${breakTime % 60}` : `${breakTime % 60}`
                    }`}</span>
                )}
            </div>

            <div className="container-controllers">
                <button className="transition ease-in-out lg:hover:-translate-y-1 lg:hover:scale-105 duration-300" onClick={playPause}>
                    <img src={workingChrono ? PauseImg : PlayImg} alt="bouton lecture"/>
                </button>
                <button className="transition ease-in-out lg:hover:-translate-y-1 lg:hover:scale-105 duration-300"
                        onClick={resetFunc}>
                    <img src={ResetImg} alt="bouton remise à zéro"/>
                </button>
            </div>
        </div>
    );
};

export default Chrono;
