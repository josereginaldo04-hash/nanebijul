const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o Banco de Dados (usa a variável de ambiente MONGODB_URI do Atlas ou localhost localmente)
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nanebijus';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB com sucesso!'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Modelo de Cliente
const ClienteSchema = new mongoose.Schema({
  nome: String,
  telefone: String,
  endereco: String,
  cidade: String,
  senha: String
});
const Cliente = mongoose.model('Cliente', ClienteSchema);

// Modelo de Pedido
const PedidoSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  itens: Array,
  total: Number,
  data: { type: Date, default: Date.now }
});
const Pedido = mongoose.model('Pedido', PedidoSchema);

// ROTA DE CADASTRO
app.post('/api/cadastrar', async (req, res) => {
  try {
    const novoCliente = await Cliente.create(req.body);
    res.status(201).json({ sucesso: true, cliente: novoCliente });
  } catch (err) {
    res.status(400).json({ sucesso: false, erro: err.message });
  }
});

// ROTA DE CRIAÇÃO DE PEDIDO
app.post('/api/pedidos', async (req, res) => {
  try {
    const novoPedido = await Pedido.create(req.body);
    res.status(201).json({ sucesso: true, pedido: novoPedido });
  } catch (err) {
    res.status(400).json({ sucesso: false, erro: err.message });
  }
});

// Porta dinâmica fornecida pelo Render ou 3000 por padrão em desenvolvimento local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor NaneBijus rodando na porta ${PORT}`));