create database soytech;
use soytech;

-- tables 
create table endereco(
idEndereco int primary key auto_increment,
CEP char(8),
logradouro varchar(45),
numero varchar (6),
complemento varchar (45) default 'Sem complemento',
cidade varchar(45),
estado varchar(45),
UF char(2)
);

create table fazenda (
idFazenda int primary key auto_increment,
nome varchar(45),
nomeFantasia varchar(80),
CNPJ varchar(14),
fkEndereco int,
foreign key (fKEndereco)
references endereco(idEndereco)
);

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(100),
email varchar(80),
senha varchar(25),
cnpj  varchar(14),
telefonefixo varchar(20),
telefoneCelular varchar(20),
fkFazenda int,
foreign key (fKFazenda)
 references Fazenda (idFazenda)
);

create table hectare(
idHectare int auto_increment,
tamanhoHec decimal(6,1),
qtdSensorHec varchar(45),
fkFazenda int,
foreign key(fkFazenda) 
references fazenda(idFazenda),
primary key (idHectare,fkFazenda)
); 

create table dadosKpi(
idKpi int primary key auto_increment,
minTemp varchar(45),
maxTemp varchar(45),
minUmi varchar(45),
maxUmi varchar(45)
);

create table sensor (
idSensor int auto_increment,
tipo char(10),
setor char(2),
fkHectare int,
foreign key(fkHectare)
references sensor(idSensor),
primary key (idSensor,fkHectare),
fkDadosKpi int,
foreign key(fkDadosKpi) 
references dadosKpi(idKpi)
);

create table dadosSensor (
idDados int primary key auto_increment,
temperatura decimal(3,1),
umidade decimal(3,1),
dataHora datetime,
fkSensor int,
foreign key (fKSensor)
references sensor(idSensor)
); 

insert into fazenda values
(null, 'Pedaço de céu', 'Boa Vista', '10.210.520/000', '1' ),
(null, 'Encanto', 'Bom Retiro', '45.301.096/000', '2'),
(null, 'Doce Lar', 'Duartina', '70.064.979/000', '3'),
(null, 'Templo', 'Laila', '71.505.461/000', '4');

insert into endereco values 
(null, '09901890', 'Rua Coxipó', '70', 'Lote 1','Salvador', 'Bahia', 'BA'),
(null, '08970123', 'Rua Alameira Francisco', '60', 'Lote 2', 'São Paulo','São Paulo','SP'),
(null, '05021897', 'Rua João Navarro Botelho', '478', default,'Florianópolis', 'Santa Catarina', 'SC'),
(null, '09987676', 'Rua Jaguare', '97', default, 'Campo Grande', 'Mato Grosso do Sul', 'MS');

insert into hectare(idHectare, tamanhoHec, qtdSensorHec, fkFazenda) values
(null, 22, 1, 5),
(null, 50, 2, 6),
(null, 15, 2, 7),
(null, 31, 1, 8);

insert into sensor(idSensor, tipo, setor, fkHectare) values
(null, 'DHT11', 1, 1), 
(null, 'DHT11', 2, 2),
(null, 'DHT11', 1, 3),
(null, 'DHT11', 2, 4);

insert into dadosKpi values 
(null, '20', '30', '13', '14'),
(null, '20', '30', '13', '14'),
(null, '20', '30', '13', '14'),
(null, '20', '30', '13', '14');
    
select * from usuario;
select * from fazenda;
select * from enderecoFazenda;
select * from sensor;
select * from dadosSensor;
select * from feedback;
select * from hectare;

select * from endereco join fazenda
on fKEndereco = idEndereco;

select * from sensor join dadosSensor
on fkSensor = idSensor
where tipo = 'DHT11';

