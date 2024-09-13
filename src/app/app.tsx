import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SetName from './_components/ChatRoom/ChatRoom';
import ChatRoom from './_components/SetName/SetName';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SetName />} />
        <Route path="/index" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;