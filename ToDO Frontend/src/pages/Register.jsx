import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await register({ username, email, password });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        
        <Input 
          placeholder="Username" 
          value={username}
          onChange={e => setUsername(e.target.value)} 
          required
        />
        
        <Input 
          type="email"
          placeholder="Email" 
          value={email}
          onChange={e => setEmail(e.target.value)} 
          required
        />
        
        <Input 
          type="password" 
          placeholder="Password (min 8 characters)" 
          value={password}
          onChange={e => setPassword(e.target.value)} 
          required
          minLength={8}
        />
        
        <Button disabled={loading}>
          {loading ? "Creating Account..." : "Register"}
        </Button>
        
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}