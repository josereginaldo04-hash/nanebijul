const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Serve os ficheiros estáticos da pasta frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rota de teste da API
app.get('/api/status', (req, res) => {
    res.json({ mensagem: 'API NaneBijus a funcionar!' });
});

// Envia o index.html para qualquer rota que não seja da API
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor a rodar na porta ${PORT}`);
});