import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: call auth API
    console.log("login", { email, password });
  };

  return (
    <div style={{ padding: 32, maxWidth: 480, margin: "0 auto" }}>
      <h1>ISPradius Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: 8 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: 8 }}
            />
          </label>
        </div>
        <button type="submit" style={{ padding: "10px 16px" }}>
          Sign in
        </button>
      </form>
    </div>
  );
}
