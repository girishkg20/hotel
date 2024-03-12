import './MenuSearchBar.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import reset from './Source/reset.png';
import search from './Source/search.png';
import back from './Source/right.png';


const Menusearchbar = () => {

    const navigate = useNavigate();

    const [resetbutton, setresetbutton] = useState<HTMLButtonElement | null>();
    const [searchdata, setsearchdata] = useState<HTMLInputElement | null>();
    const [boxboarder, setboxboarder] = useState<HTMLFormElement | null>();

    useEffect(() => {
        setresetbutton(document.getElementById("menuresetbtn") as HTMLButtonElement | null);
        setsearchdata(document.getElementById("menusearchbox") as HTMLInputElement | null);
        setboxboarder(document.getElementById("menusearchbar") as HTMLFormElement | null);
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

    const checkdata = () => {
        if (searchdata && resetbutton) {
            const searchvalue = searchdata.value;
            
            if (searchvalue) {
                resetbutton.style.display = "flex";
            } else {
                resetbutton.style.display = "none";
            }
        }
    };

    useEffect(() => {
        checkdata();

        if(searchdata) {
            searchdata.addEventListener('input', checkdata);
            return () => {
                searchdata.removeEventListener('input', checkdata);
            }
        };
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

        <div className="menusearchbarholder">
            <form className="menusearchbar" id="menusearchbar">
                <div className='menusearchback' onClick={()=>navigate(-1)}>
                    <img className="menusearchbackimg" src={back}/>
                </div>
                <input className="menusearchbox" id="menusearchbox" type="search" onFocus={boarderadd} onBlur={boarderremove} placeholder="Search for dishes"/>
                <button className="menuresetbtn" id="menuresetbtn" type="reset" onClick={clrbtn}>
                    <img className="menuresetlogo" src={reset}/>
                </button>
                <div className='menusearchlogoholder'>
                    <img className="menusearchlogo" src={search}/>
                </div>
            </form>
        </div>

    </>)
}
export default Menusearchbar;