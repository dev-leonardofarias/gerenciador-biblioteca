let arrayAlunos = []
let id = 1;
let arrayAluno = localStorage.getItem('arrayAluno')

function salvar(){
    let aluno = lerDados();
        if(validaCampos(aluno) == true){
            adicionar(aluno);
        }
        listaTabela();
        cancelar();
}
function listaTabela(){
    //vai listar todos os itens da array e inserir na tabela de forma dinamica 
    let tbody = document.getElementById('tbody');
    
    tbody.innerText = '';

    for(let i = 0; i < arrayAlunos.length; i++){
        
        let tr = tbody.insertRow();

        let td_nome = tr.insertCell();
        let td_tel = tr.insertCell();
        let td_turma = tr.insertCell();
        let td_livro = tr.insertCell();
        let td_devolucao = tr.insertCell();
        let td_situação = tr.insertCell();
        let td_acao = tr.insertCell();

        //A PARTIR DAQUI EU COMEÇEI A FORMATAR A DATA! MEU IRMÂO NÂO ESQUECE DESSA DESGRAÇA FORAM 3Hrs PRA DESCOBRIR
        
        const formatador = Intl.DateTimeFormat("pt-BR", {
            dateStyle: "short"
        })

        var str = arrayAlunos[i].devolucao;
        var dataPronta = str.split("-"); //DIVIDI EM ARRAY UMA STRING QUE ESTÁ ESCRITA DIRETO!

        let dataFormatada = new Date(dataPronta)
        
        //TERMINEI AQUI! SIMPLES? SIM, FACIL DE DESCOBRIR? NÃO!

        //AGORA VAMO FAZER OS CALCULOS DE DIFERENÇA DE DATA PARA A SITUAÇÃO MUDAR DE ACORDO COM A DATA

        let dataAtual = new Date()

        let diferençaEmTempo = dataFormatada - dataAtual
        let TempoEmUmDia = 1000 * 60 * 60 * 24;
        let diferençaEmDias = Math.ceil(diferençaEmTempo / TempoEmUmDia);

        //ISSO! CONSEGUI A VARIAVEL DIFERENÇA EM DIAS FUNCIONA E FAZ OQ DIZ SEU NOME!

        td_nome.innerText = arrayAlunos[i].nome;
        td_tel.innerText = arrayAlunos[i].tel;
        td_turma.innerText = arrayAlunos[i].turma;
        td_livro.innerText = arrayAlunos[i].livro;
        td_devolucao.innerText = formatador.format(dataFormatada);

        //AQUI EU COMEÇO A MINHA CONDIÇÃO PARA A SITUAÇÃO MUDAR DE ACORDO COM A DATA
        
        let situação = document.createElement('div')
        let textSituacao = document.createElement('h1')
       
        let acoes = document.createElement('div')
       
        let excluir = document.createElement('a')
        let textExcluir = document.createElement('h1')

        situação.classList.add('situacao')
        acoes.classList.add('acoes')
        excluir.classList.add('excluir')

        excluir.appendChild(textExcluir)
        acoes.appendChild(excluir)
        td_acao.appendChild(acoes)

        situação.appendChild(textSituacao)
        td_situação.appendChild(situação)

        excluir.setAttribute("onclick", "excluir("+ arrayAlunos[i].id +")")

        
        textExcluir.innerHTML = 'Excluir';
        
        if(diferençaEmDias < 1){

            textSituacao.innerText = 'Pendente';

        } else{
   
            textSituacao.innerText = 'Em uso';
            situação.style.backgroundColor = '#008041';

        }

    }
}
function lerDados(){
    let aluno = {}

    aluno.id = id;
    aluno.nome = document.getElementById('nomeAluno').value;
    aluno.tel = document.getElementById('telefoneAluno').value;
    aluno.turma = document.getElementById('turmaAluno').value;
    aluno.livro = document.getElementById('livroAluno').value;
    aluno.devolucao = document.getElementById('devolucaoAluno').value;
    
    return aluno
}
function adicionar(aluno) {
    //adiciona os itens que estão na variavel aluno na Array
    arrayAlunos.push(aluno)
    id++;
    adicionarLocalStorage()
}
function validaCampos(aluno){
    let msg = '';

    if(aluno.nome == ''){
        msg += 'nome faltando \n';
    }
    if(aluno.tel == ''){
        msg += 'Telefone faltando \n';
    }
    if(aluno.turma == ''){
        msg += 'Turma faltando \n';
    }
    if(aluno.livro == ''){
        msg += 'Livro faltando \n';
    }
    if(aluno.devolucao == ''){
        msg += 'Data de devolução faltando \n';
    }
    if(msg != ''){
        alert(msg);
        return false;
    }
    return true;
}
function cancelar(){
    //Limpa os dados depois de clicar em salvar
    document.getElementById('nomeAluno').value = ''
    document.getElementById('telefoneAluno').value = ''
    document.getElementById('turmaAluno').value = ''
    document.getElementById('livroAluno').value = ''
    document.getElementById('devolucaoAluno').value = '';
}
function excluir(id){
    let confimar = window.confirm('Você realmente deseja excluir?')
    if(confimar){
    let tbody = document.getElementById('tbody');

    for(let i = 0; i < arrayAlunos.length; i++){
        if(arrayAlunos[i].id == id){
            arrayAlunos.splice(i, 1)
            tbody.deleteRow(i)
        }
    }
} 
}
function adicionarLocalStorage(){
    localStorage.setItem('arrayAluno', arrayAlunos)
    return arrayAlunos
}
