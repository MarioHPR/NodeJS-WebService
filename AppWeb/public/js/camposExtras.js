var incremento = 1;

function excluirLinha(j) {
    if (((j + 1) == incremento)) {
        var element = this.document.getElementById("myTable");
        var child = this.document.getElementById("l" + j);
        element.removeChild(child);
        --incremento;
    }
    else {
        alert("Remover debaixo para cima!!");
    }
};
function incrementa() {
    incremento++;
}

function excluirLinhaEditar(j) {
        var element = this.document.getElementById("myTable");
        var child = this.document.getElementById("l" + j);
        element.removeChild(child);
        --incremento;
};

function adicionarCampos(flag) {
    var input, input2, excluir, linha;
    var x = this.document.getElementById('myTable');

    linha = this.document.createElement("div");
    linha.id = "l" + incremento;

    excluir = this.document.createElement("input");
    excluir.type = "button";
    if(flag==0)
        excluir.setAttribute('onclick', "excluirLinha(" + incremento + ")");
    else
        excluir.setAttribute('onclick', "excluirLinhaEditar(" + incremento + ")");
    excluir.value = " X ";
    excluir.id = "x" + incremento;

    input = this.document.createElement("input");
    input.placeholder = (incremento + 1) + " Atributo";
    input.id = "A" + incremento;
    input.name = "A" + incremento;

    input2 = this.document.createElement("input");
    input2.placeholder = (incremento + 1) + " Valor";
    input2.id = "V" + incremento;
    input2.name = "V" + incremento;

    linha.append(input);
    linha.append(" = ");
    linha.append(input2);
    linha.append(excluir);
    x.append(linha);
    incremento++;
};

function atualizaCampo() {
    this.document.getElementById("seletor").autoRefresh();
};