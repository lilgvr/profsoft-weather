import { useDispatch } from "react-redux";
import { bindActionCreators } from '@reduxjs/toolkit'
import { weatherActions } from "../store/weather/weather.slice";


const actions = {
    ...weatherActions
}

const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}

export { useActions }
