
var templateUser = `<div class="row">
                        <div class="col-md-12">
                           <h3>**NOME** / **VOLUME**</h3>
                           <hr>
                        </div>
                    </div>`;
function carregaVolume(){
    var parametro = window.location.search;
    console.log("URL = "+parametro);
                    
    var numParceiro = parametro.substr(4);
                    
    //alert("Numero do Parceiro = "+numParceiro);
    console.log("Numero do Parceiro = "+numParceiro);
                    
    // a partir daqui posso fazer um fetch no endpoint de departamento e
    // preencher um conjunto de linhas com todos os usuários daquele depto
    fetch("http://localhost:8080/agentesfinanceiros/"+numParceiro+"/dashboard")
        .then(res => res.json())
        .then(res => preenche(res))
}
function preenche(res){
	
	var userLogado = localStorage.getItem("userDash");
   
    if (!userLogado){
        // se não tiver, redireciona pra o INDEX  (ou seja, não tá logado)
        window.location="index.html";
    }

	console.log(res);    


    document.getElementById("conteudo").innerHTML = res.nome;
    document.getElementById("sucesso").innerHTML = res.statusOk;
    document.getElementById("falha").innerHTML = res.statusFalha;
	document.getElementById("fraude").innerHTML = res.statusFraude;
	document.getElementById("total").innerHTML = res.statusFraude+res.statusOk+res.statusFalha;

    desenharPizza(res);

    barraUsuario();
}


function desenharPizza(res) {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Sucesso',     res.statusOk],
      ['Falha',      res.statusFalha],
      ['Fraude',  res.statusFraude],
    ]);

    var options = {
      is3D: true,
      colors: ['#006400', '#ecc400', '#b6342d']
    };

    var chart = new google.visualization.PieChart(document.getElementById('graficoPizza'));
    chart.draw(data, options);
  }

  function barraUsuario(){
    
    var tptBarraUser = `<img src="\images\**FOTO**" width="70px"> 
                    **NOME** (**RACF**)`;
    
    var userLogado2 = localStorage.getItem("userDash");
 
    var user = JSON.parse(userLogado2);
 
    document.getElementById("barraUser").innerHTML = tptBarraUser
                                        .replace("**FOTO**",user.linkFoto)
                                        .replace("**NOME**", user.nome)
                                        .replace("**RACF**", user.racf.toUpperCase());   
}

