// não altere!
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');
const sql = require('mssql');

// não altere!
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// configure a linha abaixo caso queira que os dados capturados sejam inseridos no banco de dados.
// false -> nao insere
// true -> insere
const HABILITAR_OPERACAO_INSERIR = false;

// altere o valor da variável AMBIENTE para o valor desejado:
// API conectada ao banco de dados remoto, SQL Server -> 'producao'
// API conectada ao banco de dados local, MySQL Workbench - 'desenvolvimento'
const AMBIENTE = 'desenvolvimento';

const serial = async (
    valoresDht11TempProj,
    valoresDht11TempProj2,
    valoresDht11TempProj3,
    valoresDh11TempProj4,
    valoresDh11TempProj5,
    valoresDht11UmidProj,
    valoresDht11UmidProj2,
    valoresDht11UmidProj3,
    valoresDh11UmidProj4,
    valoresDh11UmidProj5

) => {
    let poolBancoDados = ''

    if (AMBIENTE == 'producao') {
        poolBancoDados = mysql.createPool(
            {
                // altere!
                // CREDENCIAIS DO BANCO LOCAL - MYSQL WORKBENCH
                host: 'localhost',
                user: 'insertGrupo05',
                password: 'insert',
                database: 'sprint3'
            }
        ).promise();
    } else if (AMBIENTE == 'producao') {
        console.log('Projeto rodando inserindo dados em nuvem. Configure as credenciais abaixo.');
    } else {
        throw new Error('Ambiente não configurado. Verifique o arquivo "main.js" e tente novamente.');
    }


    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        //console.log(data);
        const valores = data.split(';');
        const TempProj = parseFloat(valores[0]);
        const TempProj2 = parseFloat(valores[1]);
        const TempProj3 = parseFloat(valores[2]);
        const TempProj4 = parseFloat(valores[3]);
        const TempProj5 = parseInt(valores[4]);
        const UmidProj = parseFloat(valores[5]);
        const UmidProj2 = parseFloat(valores[6]);
        const UmidProj3 = parseFloat(valores[7]);
        const UmidProj4 = parseFloat(valores[8]);
        const UmidProj5 = parseInt(valores[9]);

        valoresDht11TempProj.push(TempProj);
        valoresDht11TempProj2.push(TempProj2);
        valoresDht11TempProj3.push(TempProj3);
        valoresDh11TempProj4.push(TempProj4);
        valoresDh11TempProj5.push(TempProj5);
        valoresDht11UmidProj.push(UmidProj);
        valoresDht11UmidProj2.push(UmidProj2);
        valoresDht11UmidProj3.push(UmidProj3);
        valoresDh11UmidProj4.push(UmidProj4);
        valoresDh11UmidProj5.push(UmidProj5);

        if (HABILITAR_OPERACAO_INSERIR) {
            if (AMBIENTE == 'producao') {
                // altere!
                // Este insert irá inserir os dados na tabela "medida"
                // -> altere nome da tabela e colunas se necessário
                // Este insert irá inserir dados de fk_aquario id=1 (fixo no comando do insert abaixo)
                // >> Importante! você deve ter o aquario de id 1 cadastrado.
                sqlquery = `INSERT INTO dadoSensor (dht11_umidade, dht11_temperatura, luminosidade, lm35_temperatura, chave, momento, fk_aquario) VALUES (${dht11Umidade}, ${dht11Temperatura}, ${luminosidade}, ${lm35Temperatura}, ${chave}, CURRENT_TIMESTAMP, 1)`;

                // CREDENCIAIS DO BANCO REMOTO - SQL SERVER
                // Importante! você deve ter criado o usuário abaixo com os comandos presentes no arquivo
                // "script-criacao-usuario-sqlserver.sql", presente neste diretório.
                const connStr = "Server=servidor-acquatec.database.windows.net;Database=bd-acquatec;User Id=usuarioParaAPIArduino_datawriter;Password=#Gf_senhaParaAPI;";

                function inserirComando(conn, sqlquery) {
                    conn.query(sqlquery);
                    console.log("valores inseridos no banco: ", dht11Umidade + ", " + dht11Temperatura + ", " + luminosidade + ", " + lm35Temperatura + ", " + chave)
                }

                sql.connect(connStr)
                    .then(conn => inserirComando(conn, sqlquery))
                    .catch(err => console.log("erro! " + err));

            } else if (AMBIENTE == 'desenvolvimento') {

                // altere!
                // Este insert irá inserir os dados na tabela "medida"
                // -> altere nome da tabela e colunas se necessário
                // Este insert irá inserir dados de fk_aquario id=1 (fixo no comando do insert abaixo)
                // >> você deve ter o aquario de id 1 cadastrado.
                await poolBancoDados.execute(
                    'INSERT INTO dadoSensor (temperatura, temperatura2, temperatura3, temperatura4, temperatura5, umidade, umidade2, umidade3, umidade4, umidade5) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        TempProj,
                        TempProj2,
                        TempProj3,
                        TempProj4,
                        TempProj5,
                        UmidProj,
                        UmidProj2,
                        UmidProj3,
                        UmidProj4,
                        UmidProj5
                    ]
                );
                console.log("valores inseridos no banco: ", dht11Umidade + ", " + dht11Temperatura + ", " + luminosidade + ", " + lm35Temperatura + ", " + chave)

            } else {
                throw new Error('Ambiente não configurado. Verifique o arquivo "main.js" e tente novamente.');
            }
        }
    });
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}


// não altere!
const servidor = (
    valoresDht11TempProj,
    valoresDht11TempProj2,
    valoresDht11TempProj3,
    valoresDh11TempProj4,
    valoresDh11TempProj5,
    valoresDht11UmidProj,
    valoresDht11UmidProj2,
    valoresDht11UmidProj3,
    valoresDh11UmidProj4,
    valoresDh11UmidProj5
) => {
    const app = express();
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });
    app.get('/sensores/TempProj', (_, response) => {
        return response.json(valoresDht11TempProj);
    });
    app.get('/sensores/TempProj2', (_, response) => {
        return response.json(valoresDht11TempProj2);
    });
    app.get('/sensores/TempProj3', (_, response) => {
        return response.json(valoresDht11TempProj3);
    });
    app.get('/sensores/TempProj4', (_, response) => {
        return response.json(valoresDh11TempProj4);
    });
    app.get('/sensores/TempProj5', (_, response) => {
        return response.json(valoresDh11TempProj5);
    });
    app.get('/sensores/UmidProj', (_, response) => {
        return response.json(valoresDht11UmidProj);
    });
    app.get('/sensores/UmidProj2', (_, response) => {
        return response.json(valoresDht11UmidProj2);
    });
    app.get('/sensores/UmidProj3', (_, response) => {
        return response.json(valoresDht11UmidProj3);
    });
    app.get('/sensores/UmidProj4', (_, response) => {
        return response.json(valoresDh11UmidProj4);
    });
    app.get('/sensores/UmidProj5', (_, response) => {
        return response.json(valoresDh11UmidProj5);
    });
}

(async () => {
    const valoresDht11TempProj = [];
    const valoresDht11TempProj2 = [];
    const valoresDht11TempProj3 = [];
    const valoresDht11TempProj4 = [];
    const valoresDht11TempProj5 = [];
    const valoresDht11UmidProj = [];
    const valoresDht11UmidProj2 = [];
    const valoresDht11UmidProj3 = [];
    const valoresDht11UmidProj4 = [];
    const valoresDht11UmidProj5 = [];

    await serial(
        valoresDht11TempProj,
        valoresDht11TempProj2,
        valoresDht11TempProj3,
        valoresDht11TempProj4,
        valoresDht11TempProj5,
        valoresDht11UmidProj,
        valoresDht11UmidProj2, 
        valoresDht11UmidProj3,
        valoresDht11UmidProj4, 
        valoresDht11UmidProj5 
    );
    servidor(
        valoresDht11TempProj,
        valoresDht11TempProj2,
        valoresDht11TempProj3,
        valoresDht11TempProj4,
        valoresDht11TempProj5,
        valoresDht11UmidProj,
        valoresDht11UmidProj2, 
        valoresDht11UmidProj3,
        valoresDht11UmidProj4, 
        valoresDht11UmidProj5 
    );
})();
