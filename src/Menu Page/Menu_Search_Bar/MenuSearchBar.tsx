import React, { useEffect, useState } from 'react';
import './MenuSearchBar.css';
import reset from './Source/reset.png';
import search from './Source/search.png';


const Menusearchbar = () => {

    const [resetbutton, setresetbutton] = useState<HTMLButtonElement | null>();
    const [searchdata, setsearchdata] = useState<HTMLInputElement | null>();
    const [boxboarder, setboxboarder] = useState<HTMLFormElement | null>();

    useEffect(() => {
        setresetbutton(document.getElementById("resetbtn") as HTMLButtonElement | null);
        setsearchdata(document.getElementById("searchbox") as HTMLInputElement | null);
        setboxboarder(document.getElementById("searchbar") as HTMLFormElement | null);
    },[]);


    function datacheck() {
        if (searchdata) {

            let searchvalue = searchdata!.value;
            if (searchvalue.length == 0) {
                resetbutton!.style.display = "none";
            } else {
                resetbutton!.style.display = "flex";
            }

        }
    };

    function boarderadd() {
        boxboarder!.style.border = "2px solid #7527F5";
    };

    function boarderremove() {
        boxboarder!.style.border = "1px solid #B2AEB9";
    };

    function clrbtn() {
        searchdata!.focus();
        resetbutton!.style.display = "none";
    };

    return (<>

    <div className="searchbarholder">
        <form className="searchbar" id="searchbar">
            <img className="searchlogo" src={search}/>
            <input className="searchbox" id="searchbox" type="search" onFocus={boarderadd} onInput={datacheck} onBlur={boarderremove} placeholder="Search for dishes"/>
            <button className="rbtn" id="resetbtn" type="reset" onClick={clrbtn}>
                <img className="resetlogo" src={reset}/>
            </button>
        </form>
    </div>

    </>)
}
export default Menusearchbar;