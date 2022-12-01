    function voltar(){
        location.reload()
    }
    function calcular() { 
        var faturamento = Number(input_faturamento.value) 
        var hectares = Number(input_hec.value)
        var prejuizo = Number(input_prejuizo.value)
        var receita_perda = (hectares * faturamento) - prejuizo
        var receita = (hectares * faturamento)
        var porcentagem_perda = (prejuizo * 100) / receita
        var help = prejuizo * 0.70
        var valor_final = receita - help

        if (faturamento == 0 || hectares == 0 || prejuizo == 0 ) {

            alerta.innerHTML = 'Favor preencher todos os campos'

        } else {

        calculadora.innerHTML = `
        <div class="div-calc">
        <h4>Resultado</h4><br>
        <u>
            <li>Seu faturamento: ${receita.toLocaleString(
                "pt-BR", {
                    style: "currency", 
                    currency: "BRL", 
                    maximumFractionDigits: 2}
                )} por safra</li><br>

            <li>Sua Perda: ${prejuizo.toLocaleString(
                "pt-BR", {
                    style: "currency", 
                    currency: "BRL", 
                    maximumFractionDigits: 2}
                )} por safra</li><br>

            <li>Sua Receita final: ${receita_perda.toLocaleString(
                "pt-BR", {
                    style: "currency", 
                    currency: "BRL", 
                    maximumFractionDigits: 2}
                )}</li><br>

            <li>Você perdeu aproximadamente ${porcentagem_perda.toLocaleString(
                "pt-BR", {
                    style: "currency", 
                    currency: "BRL", 
                    maximumFractionDigits: 2}
                )} %.
            </li>
        </u>
        </div>

        <div class="div-calc">
        <u>
        <h4>Com SoyTech</h4><br>
            <li>A partir de resultados registrados com a utilização do produto SoyTech, sua receita com prejuizo reduzido em 30% resultou em 
            ${valor_final.toLocaleString( "pt-BR", {
                    style: "currency", 
                    currency: "BRL", 
                    maximumFractionDigits: 2}
                )} </li><br>
        </u>
        </div>

        <button class="botao-funcao" onclick="voltar()">
        Novo calculo
        </button>
        `
        }
}