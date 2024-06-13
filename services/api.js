async function getProduto(id) {
    try {
        const resultado = await fetch(`http://localhost:3000/produtos/${id}`);
        const dados = await resultado.json();
        return dados;
    } catch (erro) {
        console.error('Erro ao obter o produto:', erro);
    }
}

async function postProduto(produto) {
    try {
        const response = await fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar o produto');
        }

        const dados = await response.json();
        return dados;
    } catch (erro) {
        console.error('Erro ao adicionar o produto:', erro);
    }
}
