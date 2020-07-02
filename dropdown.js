var tptDDLBegin = `<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`
var tptDDLEnd = `</div>`
var templateAgente = `<a class="dropdown-item" href="dashboard.html?id=**IDAGENTE**">**NOMEAGENTE**</a>`

var tptAGTTBegin = `<table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Parceiro</th>
                            <th scope="col">Volume Transacional</th>
                          </tr>
                        </thead><tbody>`
var tptAGTTEnd = `</tbody>`
var tptAgenteTransacao = `<tr><th scope="row">**NOMEPARCEIRO**</th><td>**VOLUME**</td></tr>`

function logout(){
    localStorage.removeItem("userDash");
    window.location="index.html";
}

function carregaParceiros(){
    fetch("http://localhost:8080/nomeagentes")
        .then(res => res.json())
        .then(res => preenche(res)); 
}

function preenche(resJson){
    var contAgente ="";
    for(i=0; i<resJson.length; i++){       
        var agente = resJson[i];
        contAgente = contAgente + templateAgente.replace("**IDAGENTE**",agente.id_agente)
                                                .replace("**NOMEAGENTE**", agente.nome_agente);
    }
    document.getElementById("conteudo").innerHTML = tptDDLBegin + contAgente + tptDDLEnd;

    carregaTopTen();
}

function carregaTopTen() {
    fetch("http://localhost:8080/agentesfinanceiros")
    .then(res2 => res2.json())
    .then(res2 => preencheTopTen(res2)); 
}

function preencheTopTen(resJson2) {

    var contTT ="";
    for(i=0; i<resJson2.length; i++){       
        var agTT = resJson2[i];
        contTT = contTT + tptAgenteTransacao.replace("**NOMEPARCEIRO**",agTT.nome)
                                            .replace("**VOLUME**", agTT.volume);
    }
    document.getElementById("conteudo2").innerHTML = tptAGTTBegin + contTT + tptAGTTEnd;
    console.log (tptAGTTBegin + contTT + tptAGTTEnd);

}