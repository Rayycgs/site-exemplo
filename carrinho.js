document.addEventListener("DOMContentLoaded", () => {
    
    /// carrinho //* 

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    function adicionarAoCarrinho(produto) {
        carrinho.push(produto);
        salvarCarrinho();
        atualizarQuantidadeCarrinho();
    }

    function salvarCarrinho() {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }

    function atualizarQuantidadeCarrinho() {
        const quantidadeCarrinho = document.getElementById("quantidade-carrinho");
        quantidadeCarrinho.innerText = carrinho.length;
    }

    function exibirCarrinho() {
        const itensCarrinho = document.getElementById("itens-carrinho");
        itensCarrinho.innerHTML = ""; 

        if (carrinho.length === 0) {
            itensCarrinho.innerHTML = "<p>O carrinho está vazio.</p>";
            return;
        }

        carrinho.forEach(item => {
            const divItem = document.createElement("div");
            divItem.className = "item-carrinho";
            divItem.innerHTML = `
                <h4>${item.nome}</h4>
                <span>R$ ${item.preco.toFixed(2)}</span>
                <button onclick="removerItem(${item.id})">Remover</button>
            `;
            itensCarrinho.appendChild(divItem);
        });
    }

    window.removerItem = function(id) {
        carrinho = carrinho.filter(item => item.id !== id);
        salvarCarrinho(); // Salva as alterações no localStorage
        exibirCarrinho(); // Atualiza a exibição do carrinho
        atualizarQuantidadeCarrinho(); // Atualiza a quantidade no carrinho
    }

    document.getElementById("finalizar-compra")?.addEventListener("click", () => {
        if (carrinho.length > 0) {
            alert("Compra finalizada com sucesso!");
            carrinho = []; // Limpa o carrinho após a compra
            salvarCarrinho(); // Salva as alterações no localStorage
            exibirCarrinho(); // Atualiza a exibição do carrinho
            atualizarQuantidadeCarrinho(); // Atualiza a quantidade no carrinho
        } else {
            alert("O carrinho está vazio!");
        }
    });

    document.querySelectorAll(".adicionar-carrinho").forEach((button, index) => {
        button.addEventListener("click", () => {
            const produtoNome = button.parentElement.querySelector("h2").innerText;
            const produtoPreco = parseFloat(button.parentElement.querySelector("p").innerText.replace("Preço: R$ ", "").replace(",", "."));
            
            const produto = { id: index + 1, nome: produtoNome, preco: produtoPreco };
            adicionarAoCarrinho(produto);
            alert(`${produtoNome} foi adicionado ao carrinho!`);
        });
    });

    exibirCarrinho();
    atualizarQuantidadeCarrinho();
});
