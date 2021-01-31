import React, { useState, useRef, useEffect } from "react";
import axios from "./axios";
import moment from "moment";

const Suggestions = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [first, setFirst] = useState();
    const [last, setLast] = useState();
    const [message, setMessage] = useState();
    const elemRef = useRef();

    useEffect(() => {
        axios
            .get("/suggestions.json")
            .then(({ data }) => {
                console.log("data in axios.get suggestions: ", data);
                setSuggestions(data);
                elemRef.current.scrollTop =
                    elemRef.current.scrollHeight - elemRef.current.clientHeight;
            })
            .catch((err) => {
                console.log("error in axios.get suggestions: ", err);
            });
    }, []);

    let newMessage = {
        first: first,
        last: last,
        message: message,
    };

    const handleChangeFirst = (e) => {
        // console.log(e.target.value);
        setFirst(e.target.value);
    };

    const handleChangeLast = (e) => {
        // console.log(e.target.value);
        setLast(e.target.value);
    };

    const handleChangeMessage = (e) => {
        setMessage(e.target.value);
    };

    const keyCheck = (e) => {
        if (e.key == "Enter") {
            e.preventDefault();
            // console.log("newMessage: ", newMessage);

            axios
                .post("/new-suggestion", newMessage)
                .then(({ data }) => {
                    console.log("response: ", data);

                    setSuggestions([...suggestions, data]);

                    elemRef.current.scrollTop =
                        elemRef.current.scrollHeight -
                        elemRef.current.clientHeight;
                })
                .catch((err) => {
                    console.log("error in axios.post /suggestions: ", err);
                });
        }
    };

    return (
        <div className="suggestions">
            <div className="suggestions-text">
                <h2>Tell us what is on your mind </h2>
                <p>
                    Help us improve this app for everyone! Tell us what is the
                    place you <br></br>missed on the maps or suggest new
                    exciting themes and locations :){" "}
                </p>
                <p className="all-fields">
                    All the fields are required to be filled in!
                </p>
            </div>
            <div className="big-container">
                <div className="input-container">
                    <input
                        onChange={(e) => handleChangeFirst(e)}
                        placeholder="first name"
                    />
                    <input
                        onChange={(e) => handleChangeLast(e)}
                        placeholder="last name"
                    />
                    <textarea
                        onChange={(e) => handleChangeMessage(e)}
                        placeholder="Add your message here and press enter to send it!"
                        onKeyDown={(e) => keyCheck(e)}
                    ></textarea>
                </div>
                <div className="suggestions-container" ref={elemRef}>
                    {suggestions &&
                        suggestions.map((item) => (
                            <div key={item.id}>
                                <div className="message">
                                    <h4>
                                        {item.first} {item.last}{" "}
                                        {moment(item.created_at).fromNow()}
                                    </h4>
                                    <p>{item.message}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Suggestions;
