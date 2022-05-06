export function tweetLink(tweet_id){
  return `https://twitter.com/intent/like?tweet_id=${tweet_id}`
}

export function tweetReply(tweet_id){
  return `https://twitter.com/intent/tweet?in_reply_to=${tweet_id}`
}

export function tweetIntent({text, url, hashtags}){
  return `https://twitter.com/intent/tweet?hashtags=${hashtags}&text=${text}&url=${url}`
}

