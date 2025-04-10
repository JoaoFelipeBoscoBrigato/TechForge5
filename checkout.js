
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        cliente_id: 123, 
        itens: [
            {
                produto_id: 1, 
                quantidade: 1,
                preco: 279.90
            }
        ]
    };

    try {
        const response = await fetch('/api/pedidos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        alert(`Pedido #${data.pedido_id} criado com sucesso!`);
    } catch (error) {
        console.error('Erro:', error);
    }
});