import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ThoughtForm = () => {
    const [firstName, setFirstName] = useState("");
    const [thoughtTitle, setThoughtTitle] = useState("");
    const [thought, setThought] = useState("");
    const [isNegative, setIsNegative] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        if (firstName.length < 1) { 
            errors.firstName = "First name must be at least 1 character";
        }
        if (thoughtTitle.length < 3) {
            errors.thoughtTitle = "Thought title must be at least 3 characters";
        }
        if (thought.length < 5) {
            errors.thought = "Thought must be at least 5 characters";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const submitHandler = (newThoughtSubmit) => {
        newThoughtSubmit.preventDefault();
        if (validateForm()) {
            axios
                .post(`http://localhost:9999/api/`, {
                    firstName, thoughtTitle, thought, isNegative,
                })
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    navigate("/home");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="container">
            <tr><h1 className="header">Thought Bin</h1></tr>
            <tr><Link to="/home" className="btn btn-primary">Back to Home</Link></tr>
            <form onSubmit={submitHandler}>
                <div className="row">
                    <div className="col">
                        
                        <h2 className="header">Add New Thought</h2>
                        <input type="text" className="form-control" id="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        {errors.firstName && <h2 className="errors">{errors.firstName}</h2>}
                        <input type="text" className="form-control" id="thoughtTitle" placeholder="Thought Title" value={thoughtTitle} onChange={(e) => setThoughtTitle(e.target.value)} />
                        {errors.thoughtTitle && <h2 className="errors">{errors.thoughtTitle}</h2>}
                        <textarea className="form-control" id="thought" placeholder="Thought" value={thought} onChange={(e) => setThought(e.target.value)} rows={3} />
                        {errors.thought && <h2 className="errors">{errors.thought}</h2>}
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="isNegative" checked={isNegative} onChange={(e) => setIsNegative(e.target.checked)} />
                            <label className="form-check-label" htmlFor="isNegative">Is thought Negative?</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Add Thought</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ThoughtForm;