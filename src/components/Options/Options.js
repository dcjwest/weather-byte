import React, { useContext, useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GlobalContext } from '../../context/GlobalState';
import cloudUrl from '../../assets/images/loader/cloud-bite.svg';
import './Options.css';

const Options = ({ setLastUpdateTime, weatherApi }) => {
    const { switchUnits, updateWeather } = useContext(GlobalContext);
    const [showOptions, setShowOptions] = useState(false);
    const [showUpdater, setShowUpdater] = useState(false);
    const [currentUnit, setCurrentUnit] = useState('cel');

    // Add an overlay when options button is clicked to handle clicking elsewhere or scrolling away.
    useEffect(() => {
        const overlay = document.querySelector('.overlay');
        overlay.addEventListener('click', () => setShowOptions(false));
        window.addEventListener('scroll', () => setShowOptions(false));
        return () => {
            overlay.removeEventListener('click', () => setShowOptions(false));
            window.removeEventListener('scroll', () => setShowOptions(false));
        };
    }, []);

    // Update weather info by making new API request with either Celcius(SI) or Fahrenheit(Imperial) units.
    function handleUpdate() {
        let nextRequest =
            currentUnit === 'cel' ? `${weatherApi}?units=si` : weatherApi;

        // Hide Options dialogue and show Updating screen while waiting for API response.
        setShowUpdater(true);
        setShowOptions(false);

        fetch(nextRequest)
            .then(res => res.json())
            .then(data => {
                updateWeather(data);
                switchUnits(currentUnit);
                setLastUpdateTime();
                setShowUpdater(false);
            });
    }

    function handleRadioBtn(e) {
        e.target.value === 'fah'
            ? setCurrentUnit('fah')
            : setCurrentUnit('cel');
    }

    return (
        <div className="options-wrapper">
            <div className="options-btn-wrapper">
                <button
                    className="options-btn"
                    onClick={() => setShowOptions(!showOptions)}
                >
                    <IconContext.Provider value={{ className: 'options-icon' }}>
                        <BsThreeDotsVertical />
                    </IconContext.Provider>
                </button>
                <div
                    className={`options-list ${showOptions ? 'show' : 'hide'}`}
                >
                    <form
                        className="unit-toggle-wrapper"
                        onSubmit={e => e.preventDefault()}
                    >
                        <label htmlFor="cel">
                            <input
                                type="radio"
                                id="cel"
                                value="cel"
                                name="unit"
                                checked={currentUnit === 'cel'}
                                onChange={handleRadioBtn}
                            />
                            &deg;C
                        </label>
                        <label htmlFor="fah">
                            <input
                                type="radio"
                                id="fah"
                                value="fah"
                                name="unit"
                                checked={currentUnit === 'fah'}
                                onChange={handleRadioBtn}
                            />
                            &deg;F
                        </label>
                    </form>
                    <hr />
                    <button onClick={handleUpdate}>Update</button>
                </div>
                <div className={`overlay ${showOptions ? 'show' : ''}`}></div>
                {showUpdater && (
                    <div className="updating-screen flex-center">
                        <img src={cloudUrl} alt="cloud animation" />
                        <p>Updating</p>
                        <div className="loading-dots flex-center">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Options;
