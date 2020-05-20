import React, { useContext, useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GlobalContext } from '../context/GlobalState';
import cloudUrl from '../assets/images/loader/cloud-bite.svg';

const Options = ({ setLastUpdateTime, weatherApi }) => {
    const { switchUnits, updateWeather } = useContext(GlobalContext);
    const [showOptions, setShowOptions] = useState(false);
    const [showUpdater, setShowUpdater] = useState(false);
    const [useFahrenheit, setUseFahrenheit] = useState(false);

    useEffect(() => {
        const overlay = document.querySelector('.overlay');
        overlay.addEventListener('click', () => setShowOptions(false));
        window.addEventListener('scroll', () => setShowOptions(false));
        return () => {
            overlay.removeEventListener('click', () => setShowOptions(false));
            window.removeEventListener('scroll', () => setShowOptions(false));
        }
    }, []);

    function handleUpdate() {
        setShowUpdater(true);
        setShowOptions(false);
        let nextRequest = weatherApi;

        if (!useFahrenheit) {
            nextRequest = `${weatherApi}?units=si`;
        }

        fetch(nextRequest).then(res => res.json()).then(data => {
            updateWeather(data);
            setLastUpdateTime();
            setShowUpdater(false);
        });
    }

    function handleRadioBtn(e) {
        if (e.target.value === 'fah') {
            setUseFahrenheit(true);
            e.target.checked = true;

        }
        else {
            setUseFahrenheit(false);
            e.target.checked = true;
        }

        switchUnits(e.target.value);
    }

    return (
        <div className='options-wrapper'>
            <button className='options-btn' onClick={() => setShowOptions(!showOptions)}>
                <IconContext.Provider value={{className: 'options-icon'}} >
                    <BsThreeDotsVertical />
                </IconContext.Provider>
            </button>
            <div className={`options-list ${showOptions? 'show':'hide'}`}>
                <form className='unit-toggle-wrapper' onSubmit={e => e.preventDefault()}>
                    <label htmlFor='cel'>
                        <input type='radio' id='cel' value='cel' name='unit' onChange={handleRadioBtn}/>&deg;C
                    </label>
                    <label htmlFor='fah'>
                        <input type='radio' id='fah' value='fah' name='unit' onChange={handleRadioBtn}/>&deg;F
                    </label>
                </form>
                <hr />
                <button onClick={handleUpdate}>Update</button>
            </div>
            <div className={`overlay ${showOptions? 'show': ''}`}></div>
            {
                showUpdater && 
                <div className='updating-screen flex-center'>
                    <img src={cloudUrl} alt='cloud animation' />
                    <p>Updating</p>
                    <div className='loading-dots flex-center'>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Options;
