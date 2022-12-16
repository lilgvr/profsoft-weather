import { useDispatch } from "react-redux";
import { bindActionCreators } from '@reduxjs/toolkit'
import { weatherActions } from "../store/weather";
import { geolocationActions } from "../store/geolocation";


const actions = {
    ...weatherActions,
    ...geolocationActions
}

const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}

export { useActions }
