// nome e sobrenome são obrigatórios
// pelo menos 2 caracteres

// idade mínima 18

/// 99999-9999

// email precisa ser válido

// senha precisa ter pelo menos 8 caracteres
// precisa ter um número
// precisa ter letras maiúsculas e minúsculas

let form = document.getElementById("form-inscricao");


/// keyup, change

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let formData = new FormData(form);

  let dados = {
    nome: formData.get("nome").trim(),
    sobrenome: formData.get("sobrenome").trim(),
    idade: +formData.get("idade"),
    celular: formData.get("celular").trim(),
    email: formData.get("email").trim(),
    senha: formData.get("senha"),
    senhaConfirmacao: formData.get("senha-confirmacao"),
    termosECondicoes: !!formData.get("termos-e-condicoes")
  };

  let erros = [];

  if (!validaObrigatorio(dados.nome)) {
    erros.push("O nome é obrigatório");
  } else if (!validaPeloMenos2Caracteres(dados.nome)) {
    erros.push("O nome precisa ter pelo menos dois caracteres");
  }

  if (!validaObrigatorio(dados.sobrenome)) {
    erros.push("O sobrenome é obrigatório");
  } else if (!validaPeloMenos2Caracteres(dados.sobrenome)) {
    erros.push("O sobrenome deve ter pelo menos dois caracteres");
  }
  if (!validaMaiorOuIgualA18(dados.idade)) {
    erros.push("A idade precisa ser 18 no mínimo");
  }
  if (!validaFormatoCelular(dados.celular)) {
    erros.push("O número de celular deve seguir o formato 99999-9999");
  }
  if (!validaFormatoEmail(dados.email)) {
    erros.push("O email precisa ter um formato válido");
  }
  if (!validaObrigatorio(dados.senha)) {
    erros.push("É obrigatório informar uma senha");
  } else if (!validaSenha(dados.senha)) {
    erros.push("A senha deve ter pelo 8 caracteres e conter letras maiúsculas e minusculas, e pelo menos um número");
  } else if (!validaIguais(dados.senha, dados.senhaConfirmacao)) {
    erros.push("A confirmação deve ser igual a senha digitada");
  }
  if (!validaTermosAceitos(dados.termosECondicoes)) {
      erros.push("É necessário aceitar os termos e condições de uso")
  }

  exibirErrosForm(erros)
  if (!erros.length) {
      setTimeout(() => alert('Dados enviados com sucesso!'), 0)
  }

  console.log(dados);
  console.log(erros)
});

function validaObrigatorio(valor) {
  return !!valor;
}

function validaPeloMenos2Caracteres(valor) {
  return valor.length >= 2;
}

function validaMaiorOuIgualA18(valor) {
  return valor >= 18;
}

function validaFormatoCelular(valor) {
  return /^[0-9]{5}-[0-9]{4}$/.test(valor);
}

function validaFormatoEmail(valor) {
  return /^\S+@\S+$/.test(valor);
}

function validaSenha(valor) {
  return (
    valor.length >= 8 &&
    /[a-z]/.test(valor) &&
    /[A-Z]/.test(valor) &&
    /[0-9]/.test(valor)
  );
}

function validaIguais(valor1, valor2) {
  return valor1 === valor2;
}

function validaTermosAceitos(valor) {
    return !!valor
}


function exibirErrosForm(erros) {
    let areaErrosForm = document.getElementById("erros-form")
    areaErrosForm.innerHTML = ""
    
    let listaErros = document.createElement('ul')
    listaErros.style.color = 'red'

    for (let erro of erros) {
        let item = document.createElement('li')
        item.textContent = erro
        listaErros.appendChild(item)
    }

    areaErrosForm.appendChild(listaErros)
}
