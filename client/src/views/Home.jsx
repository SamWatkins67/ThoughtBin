import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Home = () => {
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
                const remainingThoughts = thoughts.filter(thought => thought._id !== id);
                setThoughts(remainingThoughts);
                if (randomThought && randomThought._id === id) {
                    const randomIndex = Math.floor(Math.random() * remainingThoughts.length);
                    const selectedThought = remainingThoughts[randomIndex];
                    setRandomThought(selectedThought);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="main_container">
            <div className="container">
            <th className="header"><h2>Thought Bin</h2></th>
                <table className="buttons">
                    <tr>
                        <th><Link to="/thoughtForm" className="btn btn-primary">Create a New Thought</Link></th>
                        <th>|</th>
                        <th><Link to="/" className="btn btn-danger">Close Thoughts</Link></th>
                    </tr>
                </table>
                <h2 className="header">Random Thought</h2>
                {randomThought && (
                    <div>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>{randomThought.thought}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
                <h2 className="header">All Thoughts</h2>
                <div>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Name of Thinker</th>
                                <th>Thought Title</th>
                                <th>Positive Thought?</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {thoughts.map((thought) => (
                                <tr key={thought._id}>
                                    <td>{thought.firstName}</td>
                                    <td><Link to={`/thoughtDetails/${thought._id}`}>{thought.thoughtTitle}</Link></td>
                                    <td>{thought.isNegative ? "No" : "Yes"}</td>
                                    <td>
                                        <button onClick={() => handleDelete(thought._id)} className="btn btn-danger">Delete</button>
                                        <Link to={`/thoughtUpdate/${thought._id}`} className="btn btn-warning">Update</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <p>1234 Main Street, Powder Keg, KS, 87496</p>

<p>Phone: (707) 555-7890 | Email: thoughtbinsupport@thoughtbin.com</p>

<p>© 2024 Thought Bin. All rights reserved.</p>
        </div>
    );
};

export default Home;