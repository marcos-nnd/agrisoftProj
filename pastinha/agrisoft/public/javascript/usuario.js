function selecionar_hectare(){
    var valor_select = Number(select_hectare.value)
if(valor_select == 1){
    

    TEMP1.style.color='#42d353'
    UMID1.style.color='#42d353'
    UMID2.style.color='#42d353'
    TEMP2.style.color='#42d353'
    text_setor_temp_box1.style.boxShadow='10px 10px 10px #42d353'
    text_setor_temp_box2.style.boxShadow='10px 10px 10px #42d353'
    text_setor_temp_box3.style.boxShadow='10px 10px 10px #42d353'
    text_setor_temp_box4.style.boxShadow='10px 10px 10px #42d353'

    TEMP1.innerHTML = '23°C'
    UMID1.innerHTML = '73%'
    TEMP2.innerHTML = '22°C'
    UMID2.innerHTML = '75%'
}

 if(valor_select == 2){

    TEMP1.style.color='yellow'
    UMID1.style.color='#42d353'
    TEMP2.style.color='#42d353'
    UMID2.style.color='yellow'
    text_setor_temp_box1.style.boxShadow='10px 10px 10px yellow'
    text_setor_temp_box2.style.boxShadow='10px 10px 10px #42d353'
    text_setor_temp_box3.style.boxShadow='10px 10px 10px #42d353'
    text_setor_temp_box4.style.boxShadow='10px 10px 10px yellow'

    TEMP1.innerHTML = '30°C'
    UMID1.innerHTML = '73%'
    TEMP2.innerHTML = '25°C'
    UMID2.innerHTML = '70%'

   
}

 if(valor_select == 3){


    TEMP1.style.color='red'
    UMID1.style.color='#42d353'
    TEMP2.style.color='#42d353'
    UMID2.style.color='#42d353'
    text_setor_temp_box1.style.boxShadow='10px 10px 10px red'
    text_setor_temp_box2.style.boxShadow='10px 10px 10px #42d353'
    text_setor_temp_box3.style.boxShadow='10px 10px 10px #42d353'
    text_setor_temp_box4.style.boxShadow='10px 10px 10px #42d353'

    TEMP1.innerHTML = '34°C'
    UMID1.innerHTML = '73%'
    TEMP2.innerHTML = '25°C'
    UMID2.innerHTML = '73%'

 

}

 if(valor_select == 4){

    TEMP1.style.color='#42d353'
    UMID1.style.color='#42d353'
    TEMP2.style.color='rgb(67, 200, 253)'
    UMID2.style.color='rgb(67, 200, 253)'
    text_setor_temp_box1.style.boxShadow='10px 10px 10px #42d353'
    text_setor_temp_box2.style.boxShadow='10px 10px 10px #42d353'
    text_setor_temp_box3.style.boxShadow='10px 10px 10px rgb(67, 200, 253)'
    text_setor_temp_box4.style.boxShadow='10px 10px 10px rgb(67, 200, 253)'

    TEMP1.innerHTML = '24°C'
    UMID1.innerHTML = '73%'
    TEMP2.innerHTML = '20°C'
    UMID2.innerHTML = '80%'

}

else if(valor_select == 5){
    TEMP1.style.color='#42d353'
    UMID1.style.color='#42d353'
    TEMP2.style.color='#42d353'
    UMID2.style.color='rgb(51, 51, 173)'
    text_setor_temp_box1.style.boxShadow='10px 10px 10px #42d353'
    text_setor_temp_box2.style.boxShadow='10px 10px 10px #42d353'
    text_setor_temp_box3.style.boxShadow='10px 10px 10px #42d353'
    text_setor_temp_box4.style.boxShadow='10px 10px 10px rgb(51, 51, 173)'



    TEMP1.innerHTML = '25°C'
    UMID1.innerHTML = '73%'
    TEMP2.innerHTML = '22°C'
    UMID2.innerHTML = '65%'

}

}