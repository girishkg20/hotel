import React, { useEffect, useState } from 'react';
import './SearchBar.css';
import reset from './Source/reset.png';
import search from './Source/search.png';
/////Redux
import { useSelector } from 'react-redux';
import {textEntered} from '../../Redux/reducer';
import store from '../../Redux/store';
import { useDispatch } from 'react-redux';
/////Redux

    const Searchbar = () => {

        const [resetbutton, setresetbutton] = useState<HTMLButtonElement | null>();
        const [searchdata, setsearchdata] = useState<HTMLInputElement | null>();
        const [boxboarder, setboxboarder] = useState<HTMLFormElement | null>();
        
        useEffect(() => {
            setresetbutton(document.getElementById("resetbtn") as HTMLButtonElement | null);
            setsearchdata(document.getElementById("searchbox") as HTMLInputElement | null);
            setboxboarder(document.getElementById("searchbar") as HTMLFormElement | null);
        },[]);

        const dispatch = useDispatch() ///redux
        // const entered = useSelector((state: RootState) => state.enteredText.value) ///redux

        function datacheck() {
            if (searchdata) {
                let searchvalue = searchdata!.value;
                ///////////////////////////////////////////redux
                dispatch(textEntered(searchvalue))
                ///////////////////////////////////////////redux

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
            <input className="searchbox" id="searchbox" type="search" onFocus={boarderadd} onInput={datacheck} onBlur={boarderremove} placeholder="Search for food and restaurants"/>
            <button className="rbtn" id="resetbtn" type="reset" onClick={clrbtn}>
                <img className="resetlogo" src={reset}/>
            </button>
        </form>
        </div>
        
        </>)
    }
    export default Searchbar;

    document.addEventListener('DOMContentLoaded', () => {
        
          window.onpopstate = () => {
            const inputBox = document.getElementById('searchbox') as HTMLInputElement;
            const entered = store.getState().enteredText.value;
            inputBox.value = entered;
            inputBox.dispatchEvent(new Event('input', { bubbles: true }));
          }
      });