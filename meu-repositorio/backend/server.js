const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Serve os ficheiros estáticos da pasta frontend (HTML, CSS, JS, Imagens)
app.use(express.static(path.join(__dirname, '../frontend')));

// Exemplo de rota de API (se necessário)
app.get('/api/status', (req, res) => {
    res.json({ mensagem: 'API NaneBijus a funcionar com sucesso!' });
});

// Redireciona qualquer outra rota para o index.html do frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor a rodar na porta ${PORT}`);
});