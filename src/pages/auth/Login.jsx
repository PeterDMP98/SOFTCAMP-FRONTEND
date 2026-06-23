import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Sprout, AlertCircle, Eye, EyeOff } from "lucide-react";

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || "Credenciales incorrectas");
        return;
      }

      if (!data.user || !data.token) {
        setErrorMsg("Respuesta inválida del servidor");
        return;
      }

      login(data.user, data.token);

      const grupo = data.user.grupo.toLowerCase();
      if (grupo === "campesino") navigate("/campesino");
      else if (grupo === "comprador") navigate("/comprador");
      else setErrorMsg("Grupo de usuario no válido");
    } catch {
      setErrorMsg("Error de conexión con el servidor.");
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-[#0a0a0f] px-4"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(16,185,129,0.10), transparent 35%), radial-gradient(circle at bottom right, rgba(59,130,246,0.10), transparent 30%), #0a0a0f",
      }}
    >
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#111019] p-8 text-white shadow-[0_28px_90px_rgba(0,0,0,0.45)]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15">
            <Sprout size={32} className="text-emerald-300" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Iniciar sesión</h1>
          <p className="mt-2 text-sm text-slate-400">Accede a tu cuenta de SoftCamp</p>
        </div>

        {errorMsg && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            <AlertCircle size={16} />
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-slate-400">
              Correo electrónico
            </label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/40"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-slate-400">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 pr-10 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/40"
                required
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
              >
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="rounded-xl bg-emerald-500/20 py-3 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/30"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="font-medium text-emerald-300 hover:text-emerald-200">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
