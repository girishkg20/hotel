import './AddInstructionsPage.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import close from './Source/close.png';
import { foodinstruction } from '../FoodInstructionSlice';




const Addinstructionspage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    document.body.style.overflow = "hidden";

    const [instruction, setinstruction] = useState<any>(null);

    const cookinginstructions = useSelector((state:any) => state.foodinstruction.value);

    const addinstructions = () => {
        dispatch(foodinstruction(instruction.value));
        navigate(-1);
    }

    const clearinstructions = () => {
        instruction.value = "";
        instruction.focus();
    }

    useEffect(() => {
        const instruction = document.getElementById('instructions') as HTMLTextAreaElement;
        setinstruction(instruction);
        
        instruction.selectionStart = instruction.value.length;
    },[])


    return(<>
        <div className='custpopoverlay' onClick={() => navigate(-1)}></div>

        <div className="custpopover" style={{maxHeight:"48%"}}>
            <div className='acheader'>
                <p className="acheadertext">Cooking Instructions</p>
                <img className="acclosebtn" src={close} alt="Close" onClick={() => navigate(-1)}/>
            </div>

            <div className='cartholders'>
                <div className='insttextbox'>
                    <textarea id='instructions' rows={5} placeholder='Add cooking instructions?' autoFocus defaultValue={cookinginstructions}></textarea>
                    <div>
                        <button onClick={clearinstructions}>Clear</button>
                    </div>
                </div>
                <p className='insttext'>
                    The restaurant will do its best to follow your instructions.
                    Do keep in mind that once instructions are added,
                    they can't be removed. Unfortunately,
                    we won't be able to process cancellations or refunds if your request isn't fulfilled
                </p>
            </div>

            <div className="custfooter">
                <button className="cfadditembtn" onClick={() => addinstructions()}>
                    <p>Add Instruction</p>
                </button>
            </div>
        </div>
    </>)
}
export default Addinstructionspage;