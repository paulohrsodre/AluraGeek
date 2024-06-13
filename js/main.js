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

document.getElementById('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const imagem = document.getElementById('imagem').value;

    const novoProduto = { nome, preco, imagem };

    const resultado = await postProduto(novoProduto);

    if (resultado) {
        alert('Produto adicionado com sucesso!');
        document.getElementById('form').reset();
        adicionarProdutoAoCarrossel(resultado);
    }
});

function adicionarProdutoAoCarrossel(produto) {
    const carrossel = document.querySelector('.produtos__carrossel');
    
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', produto.id);

    card.innerHTML = `
        <div class="card_img">
            <img src="${produto.imagem}" alt="Imagem do produto">
        </div>
        <div class="card__info">
            <p class="card__info-nome">${produto.nome}</p>
            <div class="card__info-preco">
                <p class="info__valor">$ ${produto.preco.toFixed(2)}</p>
                <img src="./images/icon_trash.svg" alt="Remover produto" onclick="removerProduto('${produto.id}')">
            </div>
        </div>
    `;

    carrossel.appendChild(card);
}


async function removerProduto(id) {
    try {
        const response = await fetch(`http://localhost:3000/produtos/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Erro ao remover o produto');
        }

        document.querySelector(`.card[data-id='${id}']`).remove();
        alert('Produto removido com sucesso!');
    } catch (erro) {
        console.error('Erro ao remover o produto:', erro);
    }
}

async function carregarProdutos() {
    try {
        const response = await fetch('http://localhost:3000/produtos');
        const produtos = await response.json();

        produtos.forEach(produto => {
            adicionarProdutoAoCarrossel(produto);
        });
    } catch (erro) {
        console.error('Erro ao carregar os produtos:', erro);
    }
}

document.addEventListener('DOMContentLoaded', carregarProdutos);

