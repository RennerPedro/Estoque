// Adicionar
function abrirInterface() {
    // Criação de elementos HTML para a interface
    var overlay = document.createElement('div');
    overlay.className = 'overlay';

    var interface = document.createElement('div');
    interface.className = 'interface';

    var formulario = document.createElement('form');
    formulario.innerHTML = `
        <label for="nomeProduto">Nome do Produto:</label>
        <input type="text" id="nomeProduto" name="nomeProduto" required>
        
        <label for="precoProduto">Preço:</label>
        <input type="text" id="precoProduto" name="precoProduto" required>
        
        <label for="categoriaProduto">Categoria:</label>
        <select id="categoriaProduto" name="categoriaProduto" required>
            <!-- Opções de categoria aqui -->
        </select>
        
        <label for="marcaProduto">Marca:</label>
        <select id="marcaProduto" name="marcaProduto" required>
            <!-- Opções de marca aqui -->
        
        <label for="fornecedorProduto">Fornecedor:</label>
        <select id="fornecedorProduto" name="fornecedorProduto" required>
            <!-- Opções de fornecedor aqui -->

        <button type="submit">Adicionar</button>
    `;

    // Adiciona o formulário à interface
    interface.appendChild(formulario);

    // Adiciona a interface ao overlay
    overlay.appendChild(interface);

    // Adiciona o overlay ao corpo do documento
    document.body.appendChild(overlay);

    // Impede que o scroll da página principal seja possível enquanto a interface estiver aberta
    document.body.style.overflow = 'hidden';

    // Adiciona um ouvinte de evento para fechar a interface quando o formulário é enviado
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        fecharInterface();
    });
}

//Excluir ou vender
function fecharInterface() {
    // Remove o overlay e reabilita o scroll da página principal
    var overlay = document.querySelector('.overlay');
    document.body.removeChild(overlay);
    document.body.style.overflow = 'auto';
}

function abrirInterfaceExcluir() {
    var overlay = document.createElement('div');
    overlay.className = 'overlay';

    var interface = document.createElement('div');
    interface.className = 'interface';

    var formulario = document.createElement('form');
    formulario.innerHTML = `
        <label for="produtoExistente">Selecione o Produto:</label>
        <select id="produtoExistente" name="produtoExistente" required>
            <!-- Opções de produtos existentes aqui -->
        </select>
        
        <label for="quantidadeRemover">Quantidade a Remover/Vender:</label>
        <input type="number" id="quantidadeRemover" name="quantidadeRemover" min="1" required>

        <button type="submit">Excluir/Vender</button>
    `;

    interface.appendChild(formulario);
    overlay.appendChild(interface);
    document.body.appendChild(overlay);

    document.body.style.overflow = 'hidden';

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        // Lógica para excluir/vender o produto
        fecharInterface();
    });
}


//Banco de dados
const express = require('express');
const sql = require('mssql');
const app = express();

// Configurar a conexão com o banco de dados
const config = {
  user: 'seu-usuario-do-sql-server',
  password: 'sua-senha-do-sql-server',
  server: 'seu-servidor-do-sql-server',
  database: 'seu-nome-do-banco-de-dados',
  options: {
    encrypt: false, // Defina como true se estiver usando Azure
    trustServerCertificate: true // Defina como true se estiver usando Azure
  }
};

// Conectar ao banco de dados
sql.connect(config)
  .then(() => {
    console.log('Conexão bem-sucedida ao banco de dados');
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

// Rota para obter dados da tabela Estoque
app.get('/estoque', (req, res) => {
  const request = new sql.Request();
  request.query('SELECT * FROM Estoque', (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).send('Erro interno do servidor');
    } else {
      res.json(result.recordset);
    }
  });
});

// Adicione rotas semelhantes para outras tabelas (Categoria, Marca, Fornecedor, Produto)

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
