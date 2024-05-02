import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ThoughtUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [thought, setThought] = useState({
        firstName: "",
        thoughtTitle: "",
        thought: "",
        isNegative: false,
        date: ""
    });

    useEffect(() => {
        axios.get(`http://localhost:9999/api/${id}`)
            .then((res) => {
                setThought(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const validateForm = () => {
        const errors = {};
        if (thought.firstName.length < 1) {
            errors.firstName = "Name must be at least 1 character";
        }
        if (thought.thoughtTitle.length < 3) {
            errors.thoughtTitle = "Thought title must be at least 3 characters";
        }
        if (thought.thought.length < 5) {
            errors.thought = "Thought must be at least 5 characters";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (thoughtUpdateChange) => {
        const { name, value, type, checked } = thoughtUpdateChange.target;
        const newValue = type === "checkbox" ? checked : value;
        setThought({ ...thought, [name]: newValue });
    };

    const handleSubmit = async (thoughtUpdateSubmit) => {
        thoughtUpdateSubmit.preventDefault();
        if (validateForm()) {
            try {
                await axios.put(`http://localhost:9999/api/${id}`, thought);
                navigate("/home");
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="container">
            <tr><h1 className="header">Thought Bin</h1></tr>
            <tr><Link to="/home" className="btn btn-primary">Back to Home</Link></tr>
            <h1 className="header">Edit Thought</h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        <p>Name of Thinker</p>
                        <input type="text" className="form-control" id="firstName" name="firstName" value={thought.firstName} onChange={handleChange} />
                        {errors.firstName && <h2 className="errors">{errors.firstName}</h2>}
                        <p>Thought Title</p>
                        <input type="text" className="form-control" id="thoughtTitle" name="thoughtTitle" value={thought.thoughtTitle} onChange={handleChange} />
                        {errors.thoughtTitle && <h2 className="errors">{errors.thoughtTitle}</h2>}
                        <p>Thought</p>
                        <textarea className="form-control" id="thought" name="thought" value={thought.thought} onChange={handleChange} rows={3} />
                        {errors.thought && <h2 className="errors" >{errors.thought}</h2>}
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="isNegative" name="isNegative" checked={thought.isNegative} onChange={handleChange} />
                            <label className="form-check-label" htmlFor="isNegative">Is Negative?</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Update Thought</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ThoughtUpdate;