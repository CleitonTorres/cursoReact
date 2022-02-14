import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Empresa from './components/pages/Empresa.js';
import Home from './components/pages/Home.js';
import Contato from './components/pages/Contato.js';
import Projetos from './components/pages/Projects.js';

import Container from './components/layout/Container.js';
import Navbar from './components/layout/Navbar.js';
import Footer from './components/layout/Footer.js';
import NovoProjeto from './components/pages/NewProject.js';

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/empresa" element={<Empresa />} />
          <Route path="/projects" element={<Projetos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/newProject" element={<NovoProjeto />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
