
function excluirLinha(j) {
    var element = this.document.getElementById("myTable");
    var child = this.document.getElementById("l" + j);
    element.removeChild(child);
};

function adicionarCampos(flag) {
    var linhaAdicionada;
    let t = document.getElementsByClassName("testes").length + 1;

    for (let i = 1; i <= t ; i++ ){
        if(document.getElementById('l'+i) == null){
            linhaAdicionada = i;
            break;
        }
    }

    var input, input2, excluir, linha,celula1,celula2,celula3;
    var x = this.document.getElementById('myTable');

    linha    = this.document.createElement("tr");
    celula1  = this.document.createElement("td");
    celula2  = this.document.createElement("td");
    celula3  = this.document.createElement("td");
    linha.id = "l" + linhaAdicionada;

    excluir = this.document.createElement("input");
    excluir.type = "button";
    excluir.setAttribute('onclick', "excluirLinha(" + linhaAdicionada + ")");
    excluir.value = " X ";
    excluir.id = "x" + linhaAdicionada;

    input = this.document.createElement("input");
    input.placeholder = (linhaAdicionada) + " Atributo";
    input.id = "A" + linhaAdicionada;
    //input.name = "A" + linhaAdicionada;
    input.name = "A";
    input.setAttribute("class","form-control");

    input2 = this.document.createElement("input");
    input2.placeholder = (linhaAdicionada) + " Valor";
    input2.id = "V" + linhaAdicionada;
    //input2.name = "V" + linhaAdicionada;
    input2.name = "V";
    input2.setAttribute("class", "form-control testes");
    celula1.append(input);
    celula2.append(input2);
    celula3.append(excluir);

    linha.append(celula1);
    linha.append(celula2);
    linha.append(celula3);
    x.append(linha);
};

function atualizaCampo() {
    this.document.getElementById("seletor").autoRefresh();
};

function trocaBotao() {
    let bt = document.getElementById("imgAdd");
    let form;

    if (document.getElementById("formAddExame")){
        form = document.getElementById("formAddExame");
    }
    else if (document.getElementById("formAdExameExistente")){
        form = document.getElementById("formAdExameExistente");
    }
    else{
        form = document.getElementById("formAdConsultaExistente");
    }

    if (bt.getAttribute('src') == "https://img.icons8.com/ios/40/000000/plus-2-math.png") {
        bt.setAttribute("src", "https://img.icons8.com/ios/40/000000/minus.png")
        bt.setAttribute("title", "Não adicionar nova instituição");
        bt.setAttribute("alt", "não adicionar nova instituição");
        
        if (document.getElementById("formAddExame"))
            form.setAttribute("action","/tipoExame/Instituicao")
        else if (document.getElementById("formAdExameExistente"))
            form.setAttribute("action", "/tipoExame/InstExameExistente")
        else
            form.setAttribute("action", "/consulta/instituicao")

        $("#seletor").attr('disabled', true);// desabilita seletor
        $('#camposInstituicao').removeAttr('disabled');// habilita campos para inserção
    }
    else {
        bt.setAttribute("src", "https://img.icons8.com/ios/40/000000/plus-2-math.png");
        bt.setAttribute("title", "Adicionar instituição");
        bt.setAttribute("alt", "Adicionar instituição");
        if (document.getElementById("formAddExame"))
            form.setAttribute("action", "/tipoExame")
        else if (document.getElementById("formAdExameExistente"))
            form.setAttribute("action", "/tipoExame/exameExistente")
        else
            form.setAttribute("action", "/consulta/")
        $("#seletor").removeAttr('disabled');// habilita seletor
        $('#camposInstituicao').attr('disabled', true);// desabilita campos para inserção
    }
};