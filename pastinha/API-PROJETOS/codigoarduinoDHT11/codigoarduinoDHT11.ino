#include "DHT.h"
#define dht_type DHT11 //define qual o tipo de sensor DHTxx que se está utilizando

/* Configurações iniciais sobre os sensores
DHT11, LM35, LDR5 e TCRT5000 */

int dht_pin = A1;
DHT dht_1 = DHT(dht_pin, dht_type); //pode-se configurar diversos sensores DHTxx

/*int lm35_pin = A0, leitura_lm35 = 0;*/
float temperatura;
int ldr_pin = A5, leitura_ldr = 0;
int switch_pin = 7;


void setup() {
Serial.begin(9600);
dht_1.begin();
pinMode(switch_pin, INPUT);
}

void loop(){

/* Bloco do DHT11 */
float umidade = dht_1.readHumidity();
float umidProj = umidade * 0.23337223 + 60.6419585;
float umidProj2 = umidProj + 2;
float umidProj3 = umidProj + 4;
float umidProj4 = umidProj + 6;
float umidProj5 = umidProj + 8;

float temperatura = dht_1.readTemperature();
float tempProj = temperatura*0.44843049 + 11.9282513;
float tempProj2 = tempProj + 2;
float tempProj3 = tempProj + 4;
float tempProj4 = tempProj + 6;
float tempProj5 = tempProj + 8;



if (isnan(temperatura) or isnan(umidade)) {
Serial.println("Erro ao ler o DHT");
}
else {
Serial.print(tempProj);
Serial.print(";");
Serial.print(tempProj2);
Serial.print(";");
Serial.print(tempProj3);
Serial.print(";");
Serial.print(tempProj4);
Serial.print(";");
Serial.print(tempProj5);
Serial.print(";");
Serial.print(umidProj);
Serial.print(";");
Serial.print(umidProj2);
Serial.print(";");
Serial.print(umidProj3);
Serial.print(";");
Serial.print(umidProj4);
Serial.print(";");
Serial.print(umidProj5);
Serial.println(";");
}


/* Bloco do LM35 
leitura_lm35 = analogRead(lm35_pin);
temperatura = leitura_lm35 * (5.0/1023) * 100;
Serial.print(temperatura);
Serial.print(";");*/


/* Bloco do LDR5 
leitura_ldr = analogRead(ldr_pin);
Serial.print(leitura_ldr);
Serial.print(";");*/


/* Bloco do TCRT5000 
if(digitalRead(switch_pin) == LOW){
Serial.println(1);
}
else {
Serial.println(0);
}*/

delay(2000);
}
