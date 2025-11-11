import { useState } from "react";
import { login } from "../firebase";
import { useNavigate } from "react-router";
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(email, password);

    const configUser = {
      email: user.email,
    };
    if (user) {
      navigate("/", {
        replace: true,
      });
    }
  };
  return (
    <form
      className="max-w-xl mx-auto grid py-4 gap-4 mt-10 "
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          E-posta
        </label>
        <div className="mt-1">
          <input
            type="email"
            id="email"
            className="block w-full rounded-md border border-gray-300 focus:border-2 focus:border-purple-500 focus:outline-none p-2"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Parola
        </label>
        <div className="mt-1">
          <input
            type="password"
            className="block w-full rounded-md border border-gray-300 focus:border-2 focus:border-purple-500 focus:outline-none p-2"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          disabled={!email || !password}
          type="submit"
          className=" disabled:opacity-20 inline-flex items-center justify-center 
             px-4 py-2 border border-transparent text-sm font-medium rounded-md 
             shadow-md text-white bg-indigo-600 
             hover:bg-indigo-700 hover:border-indigo-600 
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
             transition-all duration-200 hover:scale-95 active:scale-90 mt-3 cursor-pointer"
        >
          Giriş Yap
        </button>
      </div>
    </form>
  );
};

export default Login;
