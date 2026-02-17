function SidebarComprador() {
    return(
        <Sidebar>
      <Link
        to="/campesino"
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-100 transition"
      >
        <Home size={22} className="text-green-700" />
        <span className="text-gray-700">Inicio</span>
      </Link>

      <Link
        to="/campesino/ganado"
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-100 transition"
      >
        <Beef size={22} className="text-green-700" />
        <span className="text-gray-700">Ganado</span>
      </Link>

      <Link
        to="/campesino/tareas"
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-100 transition"
      >
        <ListTodo size={22} className="text-green-700" />
        <span className="text-gray-700">Tareas</span>
      </Link>

      <Link
        to="/campesino/siembras"
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-100 transition"
      >
        <Sprout size={22} className="text-green-700" />
        <span className="text-gray-700">Siembras</span>
      </Link>
    </Sidebar>
    );
}

export default SidebarComprador;