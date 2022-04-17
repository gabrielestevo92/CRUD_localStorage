var dados = []

function ApagaRegistro(id) {
    let _confirm = confirm("Deseja realmente excluir esse registro?")
    if (_confirm) {
        for (let i = 0; i < dados.length; i++) {
            if (dados[i].id == id) {
                dados.splice(i, 1)
            }
        }
        PopulaTabela()
    }
}
function EditaRegistro(id) {
    $("#modalRegistro").modal("show")
    dados.forEach(function (item) {
        if (item.id == id) {
            $("#hdID").val(item.id)
            $("#txtNome").val(item.Nome)
            $("#txtSobrenome").val(item.Sobrenome)
            $("#txtDtNascimento").val(item.DtNascimento.substr(6, 4) + "-" + item.DtNascimento.substr(3, 2) + "-" + item.DtNascimento.substr(0, 2))
            $("#txtFormacao").val(item.Formacao)
        }
    })

}

function PopulaTabela() {



    if (Array.isArray(dados)) {

        localStorage.setItem("__dados__", JSON.stringify(dados))
        $("#tblDados tbody").html("")

        dados.forEach(function (item) {
            //TEMPLATE STRING
            $("#tblDados tbody").append(`<tr>
                <td>${item.id}</td> 
                <td>${item.Nome}</td>
                <td>${item.Sobrenome}</td>
                <td>${item.DtNascimento}</td>
                <td>${item.Formacao}</td>
                <td> <button type="button" class="btn btn-primary" onclick="javascript:EditaRegistro(${item.id})"><i class="fa fa-edit" /></button></td>
                <td> <button type="button" class="btn btn-danger" onclick="javascript:ApagaRegistro(${item.id});"><i class="fa fa-trash"/></button></td>
            </tr>`)
        })
    }

}

$(function () {
    //EXECUTA AO CARREGAR DA TELA

    //dados.push(JSON.parse(localStorage.getItem("__dados__")))
    console.log("Carregou a Pagina")
    //console.log(dados)
    dados = JSON.parse(localStorage.getItem("__dados__"))


    //dados = JSON.stringify(localStorage.getItem("__dados__"))

    //localStorage.setItem("__dados__", JSON.stringify(dados))



    if (dados) {

        PopulaTabela()

    }

    $("#btnSalvar").click(function () {
        //Evento salvar
        let _id = $("#hdID").val()
        let Nome = $("#txtNome").val()
        let Sobrenome = $("#txtSobrenome").val()
        let DtNascimento = new Date($("#txtDtNascimento").val()).toLocaleDateString("pt-br", { timeZone: "UTC" })
        let Formacao = $("#txtFormacao").val()



        if (!_id || _id == "0") {
            let registro = {}
            registro.Nome = Nome
            registro.Sobrenome = Sobrenome
            registro.DtNascimento = DtNascimento
            registro.Formacao = Formacao
            registro.id = dados.length + 1
            dados.push(registro)
        }
        else {
            dados.forEach(function (item) {
                if (item.id == _id) {
                    item.Nome = Nome
                    item.Sobrenome = Sobrenome
                    item.DtNascimento = DtNascimento
                    item.Formacao = Formacao
                }
            })
        }
        $('#modalRegistro').modal('hide')
        alert("Salvo com sucesso!!!")

        $("#hdID").val("")
        $("#txtNome").val("")
        $("#txtSobrenome").val("")
        $("#txtDtNascimento").val("")
        $("#txtFormacao").val("")

       

        PopulaTabela()



    })

})