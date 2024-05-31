//Файлик для прописания кода вывода в таблицу данных из json
var btn1_back = document.getElementById("btn1Back")
var i = 1;

btn1_back.addEventListener("click", function () {BackMenu ()})

function BackMenu(){
    window.location.href = "../menu/menu.html"; 
}

(document).ready(function () { 
        
        $.getJSON("game/scores.json",  
                function (data) { 
            var player = ''; 

            $.each(data, function (key, value) { 
                
                player += '<tr>'; 
                player += '<td>' +  
                    value.name + '</td>'; 

                player += '<td>' +  
                    value.score + '</td>'; 

                player += '<td>' +  
                    value.level + '</td>'; 

                player += '</tr>'; 
            }); 
              
            $('#table').append(player); 
        }); 
});