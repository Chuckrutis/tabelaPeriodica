var valorDoBotao;
var nomeDoBotao;
var contador = 0;

$(document).ready( function(){			

	$('button').click(function(){
		valorDoBotao = $(this).val();
		nomeDoBotao = $(this).attr('name');

		if (valorDoBotao == 'tabelaConteudoLista') {
			$('#paginaConteudo').hide();
			$('#paginaTabela').show();
		} else if(valorDoBotao == 'tabelaConteudoInicio'){
			$('#paginaConteudo').hide();
			$('#paginaTabela').hide();
			$('#paginaInicial').show();
		} else {
			$('#tituloConteudo').html(nomeDoBotao).val();
			$('#paginaInicial').hide();
			$('#paginaConteudo').show();
			$('#paginaTabela').show();
			deletarTabela();
			mostraTabela(nomeDoBotao);
			resetarCampos();
		}

	});

});
		
//Adiciona uma palavra escrita no campo Palavra na tabela.
function adicionar(){
				
	palavra = txtChave.value;
	nomeDoBotaoo = nomeDoBotao
	//alert('Palavra: '+ palavra);
	//alert('Nome do Botao: '+ nomeDoBotao);
	palavra = " " + palavra; 
	//alert('Primeira Letra da Palavra: '+ palavra.substr(1,1));

	if ((palavra.substr(1,1)) == nomeDoBotao) {
		localStorage.setItem(txtChave.value, txtValor.value);
		swal("","Palavra " + txtChave.value + " adicionada.","success");
		txtChave.value = txtValor.value = "";
	} else {
		//alert('Nome do Botao: '+ nomeDoBotao +'| Primeira Letra: '+ palavra.substr(1,1));
		swal("","A palavra"+ palavra +" não pode ser adicionada!","error");
	}

	deletarTabela();
	mostraTabela(nomeDoBotao);
}

//Pesquisa uma palavra escrita no campo Palavra no campo de texto e no pop-up.
function pesquisar(){
	var texto = txtChave.value;
	//alert(texto);
	var obj = localStorage.getItem(txtChave.value);
	//alert("Objeto.value: " + obj);

	if(obj != null){
		//var pesquisa = document.getElementById('txtValor').value = obj;
		texto = " " + texto;
		pesquisa = " " + pesquisa;
		//alert("OBJ: " + obj.substr(1,1));
		//alert("tituloDaPagina: " + nomeDoBotao);
		if (texto.substr(1,1) == nomeDoBotao) {
			var pesquisa = document.getElementById('txtValor').value = obj;
			swal("Palavra:"+ texto ," Descricao: "+ pesquisa ,"success");
		} else {
			swal("",'Essa palavra não começa com: '+ nomeDoBotao,"info");
		}
		txtValor.focus();
	} else {
		swal("","A palavra"+ texto +" não existe ou o campo está vazio VERIFIQUE.","info");
		resetarCampos();
	}
}

//Remove uma palavra escrita no campo Palavra da tabela.
function remover(){
	var obj = localStorage.getItem(txtChave.value);

	if (obj != null) {
		localStorage.removeItem(txtChave.value);
		swal("","O item: " + txtChave.value + " foi removido da lista.","success");
		txtChave.value = txtValor.value = "";
		
		deletarTabelaGeral();
		mostraTabela(nomeDoBotao);
	} else {
		swal("","O item não pode ser excluido pois não existe.","error");
	}

	txtChave.focus();
}

//Limpa os campos Palavra e Descrição.
function limpar(){
	txtChave.value = txtValor.value = "";
	swal("","Campos limpos.","");
}

//Apaga todas as palavras registradas.
function apagarBanco(){

	swal({
		title: "Você têm certeza?",
		text: "Uma vez apagado todas as palavras registradas serão deletadas.",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	  })
	  .then((willDelete) => {
		if (willDelete) {
		  swal("Poof! Todas as palavras cadastradas foram deletadas.", {
			icon: "success",			
		  });
		  localStorage.clear();
		} else {
		  swal("Você abortou a operação.");
		}
	  });
}

//Função não utilizada na versao final.
function preencheTabela() {;

		for (var i = 0; i < localStorage.length; i++) {
	    	var chave = localStorage.key(i); 
			var valor = localStorage.getItem(chave);
			alert('Chave: '+chave);
			chave = " " + chave;  
			alert('Chave Primeira Letra: '+ chave.substr(1,1));
			alert('NomeDoBotao: '+nomeDoBotao);

			if (chave.substr(1,1) == nomeDoBotao) {
				var linha = document.createElement("tr");
				var campo_chave = document.createElement("td");
				var campo_valor = document.createElement("td");

				var texto_chave = document.createTextNode(chave);
				var texto_valor = document.createTextNode(valor);

		    	campo_chave.appendChild(texto_chave);
				campo_valor.appendChild(texto_valor);

				linha.appendChild(campo_chave);
				linha.appendChild(campo_valor);

				corpo_tabela.appendChild(linha);
			}							
		}
		contador += 1;		
}

//Refresh da página.
function resetarPagina(){
	resetarCampos();
	window.location.reload();
}

//Limpa os campos Palavra e Descrição dentro de outras funções.
function resetarCampos(){
	txtChave.value = "";
	txtValor.value = "";
	//resetarCampos(txtChave,txtValor)
}

//Escreve a tabela na página.
function mostraTabela(tituloDaPagina){
	for (var i = 0; i < localStorage.length; i++) { 
			
		var chave = localStorage.key(i); 
		var valor = localStorage.getItem(chave);
		//alert("Key: " + chave + " Value: " + valor);
		chave = " " + chave;
		//alert("Primeira letra Key: " + chave);
		if (chave.substr(1,1) == tituloDaPagina) {
			//alert("Key: " + chave + " Passou!!");

			var linha = document.createElement("tr");
			linha.setAttribute("id", "linha"+i);
			var campo_chave = document.createElement("td");
			var campo_valor = document.createElement("td");

			var texto_chave = document.createTextNode(localStorage.key(i));
			var texto_valor = document.createTextNode(localStorage.getItem(localStorage.key(i)));

			campo_chave.appendChild(texto_chave);
			campo_valor.appendChild(texto_valor);

			linha.appendChild(campo_chave);
			linha.appendChild(campo_valor);

			corpo_tabela.appendChild(linha);
		}
	}
}

//Deleta a tabela na página para não ser escrita duas vezes.
function deletarTabela(){
	var elemento;
	for (var i = 0; i < localStorage.length; i++) {
		elemento = document.getElementById('linha'+i);
		//alert("Elemento: "+elemento.Value);
		if (elemento != null) {
			elemento.remove();	
		}	
	}	
}

//Deleta a tabela
function deletarTabelaGeral(){
	var elemento;
	for (var i = 0; i < localStorage.length+1; i++) {
		elemento = document.getElementById('linha'+i);
		//alert("Elemento: "+elemento.Value);
		if (elemento != null) {
			elemento.remove();
		}
	}	
}

//Deleta uma linha específica da tabela.
function deletarElemento(item){
	var elemento;
	for (var i = 0; i < localStorage.length; i++) {
		elemento = document.getElementById('linha'+i);
		conteudo = document.getElementById('streamurl').innerHTML;
		alert("Conteudo da linha: "+ conteudo);
		alert("Palavra Excluida(valor do campo chave): "+ item);
		if (item == conteudo) {
			elemento.remove();
		}

		
		// else if (elemento == item)
	}
}

