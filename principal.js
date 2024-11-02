document.addEventListener("DOMContentLoaded", () => {

    // VALIDAR TELEFONE //*

    document.getElementById('telefone').addEventListener('input', function (e) {
        let numbers = e.target.value.replace(/\D/g, ''); 
    
       
        if (numbers.length > 10) {
            
            e.target.value = numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (numbers.length > 6) {
            
            e.target.value = numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else if (numbers.length > 2) {
           
            e.target.value = numbers.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        } else {
            
            e.target.value = numbers.replace(/(\d*)/, '($1');
        }   
    });

    //* VALIDAÇÃO DO FORMULARIO//*

    document.getElementById('form').addEventListener('submit', function (e) {
        e.preventDefault();     

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const mensagem = document.getElementById('mensagem').value;
    
        if (nome && email && telefone && mensagem) {
            document.getElementById('message').style.display = 'block'; 
            document.getElementById('form').reset(); 
        } else {
            alert('Por favor, preencha todos os campos.'); 
        }
    });
});
