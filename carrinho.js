document.addEventListener("DOMContentLoaded", () => {
    
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    function exibirCarrinho() {
        const itensCarrinho = document.getElementById("itens-carrinho");
        itensCarrinho.innerHTML = ""; // Limpa o conteúdo anterior

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
        localStorage.setItem("carrinho", JSON.stringify(carrinho)); // Salva as alterações no localStorage
        exibirCarrinho(); // Atualiza a exibição do carrinho
    }

    document.getElementById("finalizar-compra").addEventListener("click", () => {
        if (carrinho.length > 0) {
            alert("Compra finalizada com sucesso!");
            carrinho = []; // Limpa o carrinho após a compra
            localStorage.setItem("carrinho", JSON.stringify(carrinho)); // Salva as alterações no localStorage
            exibirCarrinho(); // Atualiza a exibição do carrinho
        } else {
            alert("O carrinho está vazio!");
        }
    });

    exibirCarrinho();
});
