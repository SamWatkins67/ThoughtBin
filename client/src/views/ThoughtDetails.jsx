import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";


const ThoughtDetails = () => {
    const [thought, setThought] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:9999/api/${id}`)
            .then((res) => {
                console.log(res.data);
                setThought(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);



    return (
        <div className="container">
            <div className="table">
                <table className="table">
                    <tbody>
                        <tr><h1 className="header">Thought Bin</h1>
                            <td><Link to={`/thoughtUpdate/${thought._id}`} className="btn btn-primary">Update Thought</Link></td>
                            <td>|</td>
                            <td><Link to="/home" className="btn btn-primary">Back to Home</Link></td>
                            <td>|</td>
                            <td><Link to="/" className="btn btn-danger">Close Thoughts</Link></td>
                        </tr>
                    </tbody>
                </table>
                <h1>{thought.thoughtTitle}</h1>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name of Thinker</th>
                            <th>Thought Title</th>
                            <th>Is Negative?</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{thought.firstName}</td>
                            <td>{thought.thoughtTitle}</td>
                            <td>{thought.isNegative ? "Yes" : "No"}</td>
                            <td>{thought.date}</td>
                        </tr>
                    </tbody>
                </table>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Thought</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="table">{thought.thought}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ThoughtDetails;