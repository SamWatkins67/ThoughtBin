import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Index = () => {
    const [thoughts, setThoughts] = useState([]);
    const [randomThought, setRandomThought] = useState({});

    useEffect(() => {
        axios.get("http://localhost:9999/api/")
            .then((res) => {
                const thoughtsData = res.data;
                const randomIndex = Math.floor(Math.random() * thoughtsData.length);
                const selectedThought = thoughtsData[randomIndex];
                setRandomThought(selectedThought);
                setThoughts(thoughtsData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:9999/api/${id}`)
            .then((res) => {
                console.log(res);
                setThoughts(thoughts.filter(thought => thought._id !== id));
                setRandomThought({});
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="container">
            <h1 className="header">Thought Bin</h1>
            <p>A place to create, view, update, and delete your own thoughts or the thoughts of others!</p>
            <p className="errors">May the best thought remain unchanged</p>
            <p className="errors">Don't judge a book by its cover</p>
            <h3 className="mb-4"><Link to="/home" className="btn btn-primary">All Thoughts</Link></h3>
        </div>
    );
};

export default Index;