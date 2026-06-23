import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sprout, AlertCircle, Eye, EyeOff, User, Mail, Phone, MapPin, Lock } from "lucide-react";

function Register() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [grupo, setGrupo] = useState(1);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const validar = () => {
    const e = {};
    if (!nombre.trim()) e.nombre = "Debe ingresar su nombre";
    if (!correo.trim()) e.correo = "Debe ingresar su correo";
    else if (!/\S+@\S+\.\S+/.test(correo)) e.correo = "Correo no válido";
    if (!password.trim()) e.password = "Debe ingresar una contraseña";
    else if (password.length < 6) e.password = "Mínimo 6 caracteres";
    if (!telefono) e.telefono = "Debe ingresar su teléfono";
    else if (!/^\d+$/.test(telefono)) e.telefono = "Solo números";
    else if (telefono.length !== 10) e.telefono = `Debe tener 10 dígitos (faltan ${10 - telefono.length})`;
    if (!direccion.trim()) e.direccion = "Debe ingresar su dirección";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!validar()) return;

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, telefono, direccion, password, id_grupo: grupo }),
      });

      const data = await response.json();

      if (!response.ok) {
        setApiError(data.error || "El correo ya está registrado");
        return;
      }

      navigate("/login");
    } catch {
      setApiError("Error de conexión con el servidor");
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-[#0a0a0f] px-4 py-8"
      style={{
        background:
          "radial-gradient(circle at top right, rgba(16,185,129,0.10), transparent 35%), radial-gradient(circle at bottom left, rgba(59,130,246,0.10), transparent 30%), #0a0a0f",
      }}
    >
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#111019] p-8 text-white shadow-[0_28px_90px_rgba(0,0,0,0.45)]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15">
            <Sprout size={32} className="text-emerald-300" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Crear cuenta</h1>
          <p className="mt-2 text-sm text-slate-400">Regístrate en SoftCamp</p>
        </div>

        {apiError && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            <AlertCircle size={16} />
            {apiError}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-slate-400">
              <User size={12} /> Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className={`w-full rounded-xl border bg-black/30 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/40 ${
                errors.nombre ? "border-red-500/50" : "border-white/10"
              }`}
            />
            {errors.nombre && <p className="mt-1 text-xs text-red-400">{errors.nombre}</p>}
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-slate-400">
              <Mail size={12} /> Correo electrónico
            </label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className={`w-full rounded-xl border bg-black/30 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/40 ${
                errors.correo ? "border-red-500/50" : "border-white/10"
              }`}
            />
            {errors.correo && <p className="mt-1 text-xs text-red-400">{errors.correo}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-slate-400">
                <Phone size={12} /> Teléfono
              </label>
              <input
                type="text"
                value={telefono}
                maxLength={10}
                onChange={(e) => {
                  const valor = e.target.value.replace(/\D/g, "");
                  setTelefono(valor);
                }}
                className={`w-full rounded-xl border bg-black/30 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/40 ${
                  errors.telefono ? "border-red-500/50" : "border-white/10"
                }`}
              />
              {errors.telefono && <p className="mt-1 text-xs text-red-400">{errors.telefono}</p>}
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-slate-400">
                <Lock size={12} /> Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-xl border bg-black/30 px-4 py-3 pr-10 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/40 ${
                    errors.password ? "border-red-500/50" : "border-white/10"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
            </div>
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-slate-400">
              <MapPin size={12} /> Dirección
            </label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className={`w-full rounded-xl border bg-black/30 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/40 ${
                errors.direccion ? "border-red-500/50" : "border-white/10"
              }`}
            />
            {errors.direccion && <p className="mt-1 text-xs text-red-400">{errors.direccion}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-slate-400">Tipo de usuario</label>
            <select
              value={grupo}
              onChange={(e) => setGrupo(Number(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/40"
            >
              <option value={1} className="bg-[#111019]">Campesino</option>
              <option value={2} className="bg-[#111019]">Comprador</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-2 rounded-xl bg-emerald-500/20 py-3 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/30"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="font-medium text-emerald-300 hover:text-emerald-200">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
