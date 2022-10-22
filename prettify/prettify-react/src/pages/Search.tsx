import "./Search.scss";
import { TweetInterface } from "../interfaces/interfaces";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { TweetPicture } from '../components/Picture'

function Search() {
  const regex = /https:\/\/twitter.com\/.+\/status\/.+/gi;
  const [tweet, setTweet] = useState<TweetInterface>({date: "", avatar: "", text: "", likes: "", name: "",  checkmark: false});
  const [term, setTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showTweet, setShowTweet] = useState<boolean>(false);
  const abortController = new AbortController();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const response = await fetch("/getTweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: term,
      }),
    });
    const newTweet = await response.json();
	setTweet(newTweet.data)
	setShowTweet(true);
    setLoading(false);
  };
  function handleTextChange(e: ChangeEvent<HTMLInputElement>): boolean {
    setTerm(e.target.value);
	if(regex.test(e.target.value)){
	}
    return true;
  }

  return <>
		  { showTweet || ( loading || <form onSubmit={(e) => handleSubmit(e)} className="search-bar-container">
        <input
          type="text"
          onChange={(e) => {
            handleTextChange(e);
          }}
          className="search-bar"
        />
        <button type="submit" className="search-bar-submit-button">
          {" "}
          Submit{" "}
        </button>
      </form>)}
		  { showTweet && (loading || <TweetPicture tweet={tweet}/>)} 
    </>
  
}

export default Search;
