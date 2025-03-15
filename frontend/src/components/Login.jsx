/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { registerUser, loginUser } from "../components/api";
import { useNavigate } from "react-router-dom"; // For redirection after login
import { Eye, EyeOff } from "lucide-react"; // Ensure you have this installed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [passwordValid, setPasswordValid] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password visibility

  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  /** ✅ Password Validation */
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
    return passwordRegex.test(password);
  };

  /** ✅ Handle Sign-Up */
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("❌ Passwords do not match!");
      return;
    }

    if (!isValidPassword(password)) {
      setError("❌ Password must be at least 5 characters, include a number and a special symbol!");
      return;
    }

    if (!name || !email || !password || !contact) {
      setError("❌ All fields are required!");
      return;
    }

    if (!/^\d{10}$/.test(contact)) {
      setError("❌ Contact number must be exactly 10 digits!");
      return;
    }

    setError("");

    try {
      const response = await registerUser({ name, contact, email, password });

      if (response.success) {
        alert("✅ Registration successful! Please log in.");
        setIsSignUp(false);
        setName("");
        setContact("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("❌ An error occurred during registration!");
    }
  };

  /** ✅ Handle Login */
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("❌ Both fields are required!");
      return;
    }

    if (!isValidPassword(password)) {
      setError("❌ Password must be at least 5 characters, include a number and a special symbol!");
      return;
    }

    setError("");

    try {
      const response = await loginUser(email, password);

      if (response.success) {
        alert("✅ Login successful!");

        localStorage.setItem("userToken", response.token);
        localStorage.setItem("userData", JSON.stringify(response.user));

        navigate("/dashboard");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("❌ An error occurred during login!");
    }
  };

  return (
    <div className="flex items-start justify-end min-h-screen p-4" style={{ marginTop: "16px", marginRight: "16px" }}>
      <div
        className={`w-full max-w-sm p-8 bg-white rounded-lg shadow-lg transition-transform duration-500 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
        }`}
      >
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
          {isSignUp && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                  type="text"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  value={contact}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/^\d{0,10}$/.test(input)) {
                      setContact(input);
                    }
                  }}
                  required
                  maxLength="10"
                  placeholder="Enter your 10-digit mobile number"
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="gmail"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="abcd@gmail.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordValid(isValidPassword(e.target.value));
                }}
                required
                placeholder="Use Strong Password"
              />
              <span 
                className="absolute text-lg cursor-pointer right-3 top-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-enter your password"
                />
                <span 
                  className="absolute text-lg cursor-pointer right-3 top-4"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isSignUp ? (
              <>
                Already have an account? <span onClick={() => setIsSignUp(false)} className="text-blue-600 cursor-pointer hover:text-blue-700">Login</span>
              </>
            ) : (
              <>
                Don&apos;t have an account? <span onClick={() => setIsSignUp(true)} className="text-blue-600 cursor-pointer hover:text-blue-700">Sign Up</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
