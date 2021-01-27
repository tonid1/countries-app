import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import OtherCountries from './otherCountries'
import EmptyMap from './empty-map.png';
import AfricaMap from './Africa.png';
import AsiaMap from './Asia.png';
import EuroMap from './Europe.png';
import NorthAMap from './NorthA.png';
import SouthAMap from './SouthA.png';
import OtherMap from './Other-map.png';
import './App.css';
import Eight from './eight';

function useWindowSize(){
    const [size, setSize] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setSize(window.innerWidth)
        }
        window.addEventListener('resize', handleResize);
        return() => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);

    return size;
}

function Countries(){

    const [items,setItems] = useState([]);
    const [continent, setContinent] = useState([])
    const [myCountries, setMyCountries] = useState([]);
    const [message, setMessage] = useState('');
    const [map, setMap] = useState(EmptyMap)
    const [showMenu, setShowMenu] = useState(false);
    const [mainList, setMainList] = useState(true)
    const width = useWindowSize();
    let history = useHistory();
    
    const [style, setStyle] = useState({
        color: '#ffb175',
        backgroundColor: '#262626',
        border: '3px solid #ffb175',
        borderRadius: '5px',
        position: 'fixed',
        top: '-100px',
        left: '50%',
        zIndex: '999',
        transition: 'top 0.5s ease',
        padding: '20px'
    });

    const forNotification = useRef(true);
    const [trigger, setTrigger] = useState(0)

    useEffect(() => {
        if(forNotification.current){
            forNotification.current = false;
        }
        else{
            setStyle({
                color: '#ffb175',
                backgroundColor: '#262626',
                border: '3px solid #ffb175',
                borderRadius: '5px',
                position: 'fixed',
                top: '16px',
                left: '50%',
                zIndex: '999',
                transition: 'top 0.5s ease',
                padding: '20px'
            });
            setTimeout(() => {
                setStyle({
                    color: '#ffb175',
                    backgroundColor: '#262626',
                    border: '3px solid #ffb175',
                    borderRadius: '5px',
                    position: 'fixed',
                    top: '-100px',
                    left: '50%',
                    zIndex: '999',
                    transition: 'top 0.5s ease',
                    padding: '20px'
                })
            }, 3000);
        }
    }, [trigger])

    useEffect(() => {
        async function fetchData(){ 
            const res = await fetch('https://restcountries.eu/rest/v2/all')
            res.json().then(res => setItems(res.filter(item =>  item.name !== 'United Kingdom of Great Britain and Northern Ireland' && 
                                                                item.name !== 'Macedonia (the former Yugoslav Republic of)' &&
                                                                item.name !== 'Åland Islands' &&
                                                                item.name !== 'Guernsey' &&
                                                                item.name !== 'Isle of Man' &&
                                                                item.name !== 'Jersey' &&
                                                                item.name !== 'Mayotte' &&
                                                                item.name !== 'Réunion' &&
                                                                item.name !== 'Bonaire, Sint Eustatius and Saba' &&
                                                                item.name !== 'United States Minor Outlying Islands' &&
                                                                item.name !== 'French Southern Territories' &&
                                                                item.name !== 'Montserrat' &&
                                                                item.name !== 'Saint Martin (French part)' &&
                                                                item.name !== 'Saint Pierre and Miquelon' &&
                                                                item.name !== 'Sint Maarten (Dutch part)' &&
                                                                item.name !== 'Turks and Caicos Islands' &&
                                                                item.name !== 'Svalbard and Jan Mayen' &&
                                                                !item.name.includes('Virgin Islands') &&
                                                                !item.name.includes('Korea (Democratic People') &&
                                                                item.name !== 'Saint Helena, Ascension and Tristan da Cunha' &&
                                                                item.name !== 'South Georgia and the South Sandwich Islands').concat(OtherCountries)))}

        fetchData()
    }, [])

    const chooseMyCountries = (country) => {
        if(!myCountries.includes(country)){
            if(myCountries.length < 16){
                setMyCountries((prev) => [country, ...prev])
            }
            else{
                setMessage("Maximum 16 countries")
                setTrigger(trigger + 1);
            }
        }
        else{
            setMessage("Countries must be unique")
                setTrigger(trigger + 1);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()     
        
        if(myCountries.length !== 16){
            setMessage("Choose all 16 countries")
            setTrigger(trigger + 1);
        }
        else{
            history.push('/roundof16', myCountries)
        }

    }

    const handleRandom = (e) => {
        e.preventDefault();

        const len = myCountries.length;
        for(let i = 0; i < 16 - len; i++){
            while(true){
                let a = Math.floor(Math.random() * 234)
                if(!myCountries.includes(items[a])){
                    setMyCountries(myCountries.push(items[a]))
                    break;
                }
            }
        } 
        history.push('/roundof16', myCountries)
    }

    const Asia = () => {
        setContinent(items.filter(item => item.region === 'Asia' && item.name !== 'Macao'))
        setMap(AsiaMap);
    }

    const Europe = () => {
        setContinent(items.filter(item => item.region === 'Europe' && item.name !== "Faroe Islands" && item.name !== "Gibraltar"))
        setMap(EuroMap);
    }

    const Africa = () => {
        setContinent(items.filter(item => item.region === 'Africa' && item.name !=="British Indian Ocean Territory"))
        setMap(AfricaMap);
    }

    const NorthAmerica = () => {
        setContinent(items.filter(item => item.region === 'Americas' && item.subregion !== 'South America' && item.name !== "Saint Barthélemy"))
        setMap(NorthAMap);
    }

    const SouthAmerica = () => {
        setContinent(items.filter(item => item.subregion === "South America" && item.name !== "Falkland Islands (Malvinas)"))
        setMap(SouthAMap);
    }

    const Others = () => {
        setContinent(items.filter(item => (item.region !== 'Asia' && item.region !== 'Europe' && item.region !== 'Africa' && item.region !== 'Americas') || item.name === "Faroe Islands" || item.name === "Macao" || item.name === "Falkland Islands (Malvinas)" || item.name === "Gibraltar" || item.name === "British Indian Ocean Territory" || item.name === "Saint Barthélemy"))
        setMap(OtherMap);
    }

    const removeCountry = (targetIndex) => {
        setMyCountries((prev) => prev.filter((item,index) => index !== targetIndex))
    }

    const clearAll = () => {
        setMyCountries([])
    }

    const moveUp = (targetIndex) => {
        let targetItem = myCountries[targetIndex - 1]
        myCountries.splice(targetIndex - 1, 1)
        myCountries.splice(targetIndex, 0, targetItem)
        setMyCountries((prev) => [...prev])
    }

    const moveDown = (targetIndex) => {
        let targetItem = myCountries[targetIndex + 1]
        myCountries.splice(targetIndex + 1, 1)
        myCountries.splice(targetIndex, 0, targetItem)
        setMyCountries((prev) => [...prev])
    }

    let menu

    if(showMenu){
        menu = <div className='choice-div-2'>
        <div>
        <h3 className='white-text'>Your countries:</h3>
        {myCountries.map((item,index) =>
            <div key={index} className='item-div my-country'>
                <div className='up-down'>
                    {index !== 0 &&
                        <button onClick={() => moveUp(index)}>▲</button>
                    }
                    {index !== myCountries.length - 1 &&
                        <button onClick={() => moveDown(index)}>▼</button>
                    }
                </div>
                <img src={item.flag} className='flag my-flag' alt=''/>
                <p className='item-name'>{item.name}</p>
                <button className='btn-delete' onClick={() => removeCountry(index)}>X</button>
            </div>
        )}
        <button className='top-btn btn1 white-text' type='submit' onClick={handleSubmit}>Confirm</button>
        <button className='top-btn btn5 white-text' onClick={handleRandom}>Randomise</button>
        <button className='top-btn btn6 white-text' onClick={clearAll}>Clear all</button>
        </div>
    </div>
    }

    const goToList = () => {
        setMainList(true)
    }

    const goToCircle = () => {
        setMainList(false)
    }

    return(
        <div>
            <div style={style}>
                {message}
            </div>
            <div className='top-buttons'>
                <button className='top-btn btn1' onClick={Asia}>Asia</button>
                <button className='top-btn btn2' onClick={Europe}>Europe</button>
                <button className='top-btn btn3' onClick={Africa}>Africa</button>
                <button className='top-btn btn4' onClick={NorthAmerica}>North America</button>
                <button className='top-btn btn5' onClick={SouthAmerica}>South America</button>
                <button className='top-btn btn6' onClick={Others}>Others</button>
            </div>
            {mainList ? <div className='container'>
                <div>
                    {continent.map((item) => 
                        <div key={item.numericCode} onClick={() => chooseMyCountries(item)} className={myCountries.includes(item) ? 'item-div chosen' : 'item-div'}>
                            <img src={item.flag} className='flag' alt='' />
                            <p className='item-name'>{item.name}</p>
                        </div>    
                    )}
                </div>
            </div> : 
                <div className='container wrap'>
                {continent.map((item) => 
                        <div key={item.numericCode} onClick={() => chooseMyCountries(item)} className={myCountries.includes(item) ? 'item-div-circle chosen-circ' : 'item-div-circle'}>
                            <img src={item.flag} className='flag-circle' alt='' />
                        </div>
                )}
            </div>}
            {width >= 1400 ?
            <div className='choice-div'>
                <div>
                <h3>Your countries:</h3>
                {myCountries.map((item,index) =>
                    <div key={index} className='item-div my-country'>
                        <div className='up-down'>
                            {index !== 0 &&
                                <button onClick={() => moveUp(index)}>▲</button>
                            }
                            {index !== myCountries.length - 1 &&
                                <button onClick={() => moveDown(index)}>▼</button>
                            }
                        </div>
                        <img src={item.flag} className='flag my-flag' alt=''/>
                        <p className='item-name'>{item.name}</p>
                        <button className='btn-delete' onClick={() => removeCountry(index)}>X</button>
                    </div>
                )}
                <button className='top-btn btn1 white-text' type='submit' onClick={handleSubmit}>Confirm</button>
                <button className='top-btn btn5 white-text' onClick={handleRandom}>Randomise</button>
                <button className='top-btn btn6 white-text' onClick={clearAll}>Clear all</button>
                </div>
            </div> : 
            <div>
                <button className='top-btn btn1 choice-btn white-text' onClick={() => setShowMenu(!showMenu)}>Selected</button>
                {menu}
            </div>
            }
            <div className='map-div'>
                <img src={map} className='map' alt='' />
            </div>
            <div className='switch-div'>
                <button className='switch-btn btn5 white-text' onClick={goToList}>List</button>
                <button className='switch-btn btn6 white-text' onClick={goToCircle}>Circles</button>
            </div>
        </div>
    )
}

export default Countries;