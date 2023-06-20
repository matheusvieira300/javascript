
const cepInput = document.getElementById('cep');


cepInput.addEventListener('blur', buscarEndereco);


function buscarEndereco() {
 
    const cep = cepInput.value.trim();

    
    const cepRegex = /^\d{5}-\d{3}$/;

   
    if (!cepRegex.test(cep)) {
       
        exibirErroCep();
    } else {
       
        limparErroCep();

        
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    
                    exibirErroCep();
                } else {
                    
                    preencherCamposEndereco(data);
                }
            })
            .catch(error => {
                console.log('Erro na requisição:', error);
                exibirErroCep();
            });
    }
}


function exibirErroCep() {
    const cepErro = document.getElementById('cep-erro');
    cepErro.classList.remove('d-none');
}


function limparErroCep() {
    const cepErro = document.getElementById('cep-erro');
    cepErro.classList.add('d-none');
}


function preencherCamposEndereco(data) {
    const enderecoInput = document.getElementById('endereco');
    const bairroInput = document.getElementById('bairro');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');

    enderecoInput.value = data.logradouro;
    bairroInput.value = data.bairro;
    cidadeInput.value = data.localidade;
    estadoInput.value = data.uf;
}
