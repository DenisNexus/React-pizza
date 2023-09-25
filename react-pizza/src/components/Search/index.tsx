import styles from './Search.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import { setIntutValue,selectSort } from '../../redux/slices/filterSlice'

export default function Search() {
    const dispatch = useDispatch()
    const {inputValue} = useSelector(selectSort)

        return (
            <div className={styles.root}>
                <svg className={styles.icon} enableBackground="new 0 0 50 50" height="24px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="50px" xmlns="http://www.w3.org/2000/svg" >
                    <rect fill="none" height="24" width="50"/><circle cx="21" cy="20" fill="none" r="16" stroke="#000000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
                    <line fill="none" stroke="#000000" strokeMiterlimit="10" strokeWidth="4" x1="32.229" x2="45.5" y1="32.229" y2="45.5"/>
                </svg>
                <input 
                className={styles.input}
                value={inputValue} 
                onChange={(event)=>dispatch(setIntutValue(event.target.value))}  
                placeholder='Введи название пиццы' 
                />
                {inputValue && <img onClick={()=>dispatch(setIntutValue(""))} className={styles.close} src="../img/close.svg" alt="close" />}
            </div>
        )
}
