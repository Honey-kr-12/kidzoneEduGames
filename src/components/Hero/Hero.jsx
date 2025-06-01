import { Link } from 'react-router-dom';
// import arrowBtn from '../../assets/arrow_btn.png'
import './hero.css'
import { useEffect } from 'react'

const Hero = ({ playStatus, heroCount, heroData, setHeroCount, setPlayStatus }) => {
    useEffect(() => {
        const interval = setInterval(() => {
            setHeroCount((prevCount) => (prevCount + 1) % 3);
        }, 4000);

        return () => clearInterval(interval);
    }, [setHeroCount]);

    const getAnimationClass = () => {
        switch (heroCount) {
            case 0:
                return 'fadeIn';
            case 1:
                return 'slideIn';
            case 2:
                return 'scaleUp';
            default:
                return 'fadeIn';
        }
    };

    return (
        <>
            <div className='heromain'>
                <div key={heroData.text1} className={`heromain-text ${getAnimationClass()}`}>
                    <p>{heroData.text1}</p>
                    <p>{heroData.text2}</p>
                </div>
                <div className="heromain-dot-play">
                    <ul className="heromain-dots">
                        <li onClick={() => setHeroCount(0)} className={heroCount === 0 ? "heromain-dot orange" : "heromain-dot"} ></li>
                        <li onClick={() => setHeroCount(1)} className={heroCount === 1 ? "heromain-dot orange" : "heromain-dot"} ></li>
                        <li onClick={() => setHeroCount(2)} className={heroCount === 2 ? "heromain-dot orange" : "heromain-dot"} ></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Hero;
