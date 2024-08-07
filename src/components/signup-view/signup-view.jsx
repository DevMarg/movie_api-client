import { useState } from "react";

export const SignupView = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

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
                window.location.reload();
            } else {
                return response.json().then((data) =>{
                    alert("Signup failed:" + data.error.map(err => err.msg).join(', '));
                })
            }
        })
        .catch((error) => {
            console.error("Error:", error)
        })
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
            Username:
            <input
             type="text"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
             required
             minLength="5"
            />
        </label>

        <label>
            Password:
            <input
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
             minLength="8"
            />
        </label>

        <label>
            Email:
            <input
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required             
            />
        </label>

        <label>
            Birthday:
            <input
             type="date"
             value={birthday}
             onChange={(e) => setBirthday(e.target.value)}
             required             
            />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  };