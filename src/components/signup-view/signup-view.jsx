import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";


export const SignupView = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = (event) => {

        event.preventDefault();

        const [year, month, day] = birthday.split("-");
        const formattedBirthday = `${day}/${month}/${year}`;

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: formattedBirthday
        }

        console.log("Payload", data)

        fetch("https://movie-spot-a025d6d649af.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                navigate("/login");
            } else {
                return response.json().then((data) =>{
                    setErrorMessages(data.error.map(err => err.msg));
                })
            }
        })
        .catch((error) => {
            console.error("Error:", error)
        })
    };
  
    return (

        
            <Form onSubmit={handleSubmit}>
            {errorMessages.length > 0 && (
                <Alert variant="danger">
                    {errorMessages.map((msg, index) => (
                        <div key={index}>{msg}</div>
                    ))}
                </Alert>
            )}
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="8"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required                    
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBirthday">
                <Form.Label>Date of Birth:</Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required                    
                />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form> 
        

             
    );
  };