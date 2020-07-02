let primeiroGrafico = document.getElementById('primeiroGrafico').getContext('2d');
x = 10;
y = 5;
z = 7;

let chart = new Chart (primeiroGrafico,{
    type: "pie",

    data: {
        labels: ["Sucesso","Falha","Possivel Fraude"],

        datasets:[{
            label: "Transações Financeiras",
            data: [x,y, z],
        }]
    }
});



