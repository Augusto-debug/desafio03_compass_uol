import React, { useState } from "react";
import { auth, provider } from "../config/firebase";
import {
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

interface AuthButtonProps {
  mode: "login" | "signup";
}

const AuthButton: React.FC<AuthButtonProps> = ({ mode }) => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginWithGoogle = async () => {
    try {
      setError("");
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
      setError("Erro ao autenticar com o Google. Tente novamente.");
    }
  };

  const handleLoginWithEmail = async () => {
    try {
      setError("");

      if (!email || !password) {
        setError("Preencha todos os campos.");
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logado com sucesso");
    } catch (error) {
      console.error("Erro ao fazer login com email:", error);
      setError("Erro ao autenticar com o email. Tente novamente.");
    }
  };

  const handleCreateUserWithEmail = async () => {
    try {
      setError("");

      if (!email || !password) {
        setError("Preencha todos os campos.");
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuário criado com sucesso");
    } catch (error) {
      console.error("Erro ao criar usuário com email:", error);
      setError("Erro ao criar usuário com o email. Tente novamente.");
    }
  };

  const handleLogout = async () => {
    try {
      setError("");
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      setError("Erro ao sair da conta. Tente novamente.");
    }
  };

  if (user) {
    return (
      <div className="text-center">
        <p>Bem-vindo, {user.displayName || user.email}</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded mt-5"
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-sm">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="h-12 text-black px-3 mb-4 border rounded w-full"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        className="h-12 px-3 text-black mb-4 border rounded w-full"
      />

      <button
        onClick={mode === "login" ? handleLoginWithEmail : handleCreateUserWithEmail}
        className="bg-green-500 text-white px-4 py-2 rounded w-full mb-4"
      >
        {mode === "login" ? "Sign In" : "Sign Up"}
      </button>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex items-center justify-center mt-5">
        <img src="google-icon.png" alt="Google" className="mr-5" />
        <button
          onClick={handleLoginWithGoogle}
          className="text-white px-4 py-2 rounded"
        >
          {mode === "login" ? "Sign In with Google" : "Sign Up with Google"}
        </button>
      </div>
    </div>
  );
};

export default AuthButton;
