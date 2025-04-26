import { Route, Routes } from "react-router-dom"
import DashLayout from "./components/DashLayout"
import Layout from "./components/Layout"
import Public from "./components/Public"
import Login from "./features/auth/Login"
import Welcome from "./features/auth/Welcome"
import NotesList from "./features/notes/NotesList"
import UsersList from "./features/users/UsersList"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* /dash */}
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />

          {/* /dash/notes */}
          <Route path="notes">
            <Route index element={<NotesList />} />
          </Route>
          {/* END OF /dash/notes */}

          {/* /dash/users */}
          <Route path="users">
            <Route index element={<UsersList />} />
          </Route>
          {/* END OF /dash/users */}
        </Route>
        {/* END OF /dash */}
      </Route>
    </Routes>
  )
}

export default App
