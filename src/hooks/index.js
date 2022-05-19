import {useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DARK_MODE} from "../redux/index";

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
    return 'End'
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
    localStorage.setItem('isDarkMode', isDarkMode ? '1' : '0')
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
