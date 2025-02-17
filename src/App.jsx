import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from 'axios';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';

function App() {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:5001/api/Tipusok')
      .then(response => {
        setTools(response.data);
      })
      .catch(error => {
        console.error('Hiba történt az adatok betöltésekor:', error);
      })
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Eszközök</Link> | <Link to="/add">Új eszköz hozzáadása</Link>
        </nav>
        <Routes>
          <Route path="/" element={
            <Row>
              {tools.map(tool => (
                <Col md="3" key={tool.id}>
                  <Card>
                    <Card.Img src={tool.kepek} width="200"/>
                    <Card.Body>
                      <Card.Title><strong>{tool.megnevezes}</strong></Card.Title>
                      <Card.Text>Leírás: {tool.leiras}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          } />
          <Route path="/add" element={<AddTool />} />
        </Routes>
      </div>
    </Router>
  );
}

function AddTool() {
  const [megnevezes, setMegnevezes] = useState('');
  const [leiras, setLeiras] = useState('');
  const [kepek, setKepek] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newTool = {
      megnevezes,
      leiras,
      kepek,
    };

    axios.post('https://localhost:5001/api/UjTipusok', newTool)
      .then(response => {
        alert('Eszköz sikeresen hozzáadva!');
      })
      .catch(error => {
        console.error('Hiba történt az eszköz hozzáadásakor:', error);
      });
  };

  return (
    <div>
      <h2>Új eszköz hozzáadása</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMegnevezes">
          <Form.Label>Megnevezés</Form.Label>
          <Form.Control
            type="text"
            placeholder="Adja meg az eszköz nevét"
            value={megnevezes}
            onChange={(e) => setMegnevezes(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formLeiras">
          <Form.Label>Leírás</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Adja meg az eszköz leírását"
            value={leiras}
            onChange={(e) => setLeiras(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formKepek">
          <Form.Label>Kép URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Adja meg a kép URL-jét"
            value={kepek}
            onChange={(e) => setKepek(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Hozzáadás</Button>
      </Form>
    </div>
  );
}

export default App;

