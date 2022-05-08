import React from 'react'
import {useIsDarkMode} from "../../hooks";
import {TweetsView} from "./style";

export default function Tweets({id}){
  const {darkMode} = useIsDarkMode()
  if (!id){
    return null
  }
  return <TweetsView>
    <iframe width="100%" height="350px"
            allowtransparency="true"
            src={`https://platform.twitter.com/embed/Tweet.html?dnt=false&embedId=twitter-widget-2&frame=false&hideCard=false&hideThread=true&id=${id}&lang=en&theme=${darkMode ? 'dark' : 'light'}&chrome=noheader%20transparent`}
            frameBorder="0" />
  </TweetsView>
}
