import './SearchBar.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import reset from './Source/reset.png';
import search from './Source/search.png';
import back from './Source/right.png';


const Searchbar = () => {

    const navigate = useNavigate();

    const [resetbutton, setresetbutton] = useState<HTMLButtonElement | null>();
    const [searchdata, setsearchdata] = useState<HTMLInputElement | null>();
    const [boxboarder, setboxboarder] = useState<HTMLFormElement | null>();

    useEffect(() => {
        setresetbutton(document.getElementById("resetbtn") as HTMLButtonElement | null);
        setsearchdata(document.getElementById("searchbox") as HTMLInputElement | null);
        setboxboarder(document.getElementById("searchbar") as HTMLFormElement | null);
    },[]);

    useEffect(() => {
        const removeinputfocus = (event: TouchEvent) => {
            if(!searchdata!.contains(event.target as Node) && !resetbutton!.contains(event.target as Node)) {
                searchdata!.blur();
            }
        }

        window.addEventListener('touchstart', removeinputfocus);
        return () => {
            window.removeEventListener('touchstart', removeinputfocus);
        };

    },[searchdata, resetbutton]);

    useEffect(() => {
        if (searchdata) {
            let searchvalue = searchdata!.value;

            if (searchvalue.length == 0) {
                resetbutton!.style.display = "none";
            } else {
                resetbutton!.style.display = "flex";
            }
        }
    },[searchdata && searchdata.value]);

    function boarderadd() {
        boxboarder!.style.outline = "2px solid #7527F5";
    };

    function boarderremove() {
        boxboarder!.style.outline = "none";
    };

    function clrbtn() {
        searchdata!.focus();
        resetbutton!.style.display = "none";
    };

    return (<>

    <div className="searchbarholder">
        <form className="searchbar" id="searchbar">
            <div className='searchback' onClick={()=>navigate(-1)}>
                <img className="searchbackimg" src={back}/>
            </div>
            <input className="searchbox" id="searchbox" type="search" onFocus={boarderadd} onBlur={boarderremove} placeholder="Search for food and restaurants"/>
            <button className="resetbtn" id="resetbtn" type="reset" onClick={clrbtn}>
                <img className="resetlogo" src={reset}/>
            </button>
            <div className='searchlogoholder'>
                <img className="searchlogo" src={search}/>
            </div>
        </form>
    </div>

    </>)
}
export default Searchbar;