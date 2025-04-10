async function carregarProdutos() {
    try {
      const response = await fetch('http://localhost:5500/api/produtos');
      const produtos = await response.json();
      
      // Atualiza a interface
      produtos.forEach(produto => {
        document.getElementById('produtos').innerHTML += `
          <div class="produto">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2)}</p>
          </div>
        `;
      });
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  }
  
  // Executa quando a página carrega
  window.onload = carregarProdutos;