import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Admin, Game, Home } from "./pages";
import { useStore } from "./hooks/useStore";

function App() {
  const [chatBar] = useStore((state) => [state.chatBar]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/world/:id" exact element={<Game />} />
          <Route path="/admin" exact element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
