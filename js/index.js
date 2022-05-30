// Function resposavel por pegar as checkbox, adicionar em um array e mostrar ao usuario qual as escolhas dele
var valueList = document.getElementById('valueList'); // Pegar o P para exibir a mensagem
var text = '<span>Você escolheu:</span>' // Mensagem a ser exibida no paragráfo

var checkboxes = document.querySelectorAll('.checkbox') // Pegar as checkbox 
var userAlarms = []; //Array onde serão inseridos os horários 
var userAlarmsIds = [];

for(var checkbox of checkboxes){
    checkbox.addEventListener('click', function(){
        if(this.checked == true){
            userAlarms.push(this.value);
            userAlarmsIds.push(this.id);
            valueList.innerHTML = text + userAlarmsIds.join(' , ')
            formatarDados()
        }else{
            userAlarms = userAlarms.filter(Event => Event !== this.value)
            userAlarmsIds = userAlarmsIds.filter(Event => Event !== this.id)
            valueList.innerHTML = text + userAlarmsIds.join(' , ')
        }
    })

}

// função para mudar o valor que o usuário deseja ser despertado antes
var tempoAntes = document.getElementById('minutosAntes');
var tempoAntesValue;
var tempoAntesValueInt;
tempoAntes.addEventListener('change', function(){
        tempoAntesValue = tempoAntes.value
        tempoAntesValueInt = parseInt(tempoAntesValue)
})

// Function responsável por pegar os valores do array formatar e transformar em inteiros 
var userAlarmsFormatado = []
var userAlarmsInt = []

function formatarDados(){
    for(var i = 0; i < userAlarms.length; i++){
        userAlarmsFormatado[i] = userAlarms[i].replace(/:/g , '')
        userAlarmsInt[i] = parseInt(userAlarmsFormatado[i])
     }   
}

// função para pegar a hora de despertar

var calculo;
setInterval(function(){
        var data = new Date();
      
        var hora = data.getHours();
        var min = data.getMinutes();
        var seg = data.getSeconds();
    
        min = zero(min);
        seg = zero(seg);
    
        
        var time = `${hora}${min}${seg}`
        var timeInt = parseInt(time)
    document.getElementById('hora').textContent = `${hora}:${min}:${seg}`;
    
    for(var i = 0; i < userAlarmsInt.length; i++){
        calculo = userAlarmsInt[i] - tempoAntesValueInt
        console.log(calculo)

        if(calculo == timeInt){
            const audio = document.getElementById('audio')
            audio.play() 
         }
    }  
}, 1000)

//function para adionar o 0 nos segundos e minutos abaixo de 10
function zero(x) {
    if (x < 10) {
        x = '0' + x;
    } return x;
}

//function para adicionar os elementos do check box no array e mostrar ao usuário 
const audio = document.getElementById('audio')
const button = document.getElementById('stop')
button.addEventListener('click', function(){
    audio.pause()
    audio.currentTime = 0;
})    


