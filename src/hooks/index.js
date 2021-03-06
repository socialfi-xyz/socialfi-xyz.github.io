import {useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DARK_MODE, IS_LIGHT_MODE} from "../redux/index";

export const useNow = () => {
  const [now, setNow] = useState(() => ~~(new Date().getTime() / 1000))
  useMemo(() => {
    const timeout = setTimeout(() => {
      setNow(~~(new Date().getTime() / 1000))
    }, 1000)
    return () => clearTimeout(timeout)
  }, [now]);
  return now
}

export const useCountDown = (endTime) => {
  const now = useNow()
  const remaining = endTime - now
  if (remaining <= 0){
    return {
      day: 0,
      hours: 0,
      minutes: 0
    }
  }
  const day = ~~(remaining/86400)
  const hours = ~~((remaining%86400)/3600)
  const minutes = ~~((remaining%3600)/60)
  return {
    day,
    hours,
    minutes
  }
}

export const useIsDarkMode = () => {
  const darkMode = useSelector(state => state.index.darkMode)
  const dispatch = useDispatch()
  const changeDarkMode = (isDarkMode) => {
    localStorage.setItem(IS_LIGHT_MODE, isDarkMode ? '' : IS_LIGHT_MODE)
    dispatch(
      {
        type: DARK_MODE,
        data: isDarkMode
      }
    )
  }
  return {
    changeDarkMode,
    darkMode
  }
}
