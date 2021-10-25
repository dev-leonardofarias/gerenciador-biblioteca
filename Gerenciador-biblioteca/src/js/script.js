class Aluno{

    constructor(){
        //Array com os dados do aluno
        this.arrayAlunos = []

    }

    salvar(){
        //Função que ativada ao clicar
        let aluno = this.lerDados();
        if(this.validaCampos(aluno) == true){
            this.adicionar(aluno);
        }
        this.listaTabela();
        this.cancelar();
    }
    listaTabela(){
        //vai listar todos os itens da array e inserir na tabela de forma dinamica 
        let tbody = document.getElementById('tbody');
        
        tbody.innerText = '';

        for(let i = 0; i < this.arrayAlunos.length; i++){
            
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

            var str = this.arrayAlunos[i].devolucao;
            var dataPronta = str.split("-"); //DIVIDI EM ARRAY UMA STRING QUE ESTÁ ESCRITA DIRETO!

            let dataFormatada = new Date(dataPronta)
            
            //TERMINEI AQUI! SIMPLES? SIM, FACIL DE DESCOBRIR? NÃO!

            //AGORA VAMO FAZER OS CALCULOS DE DIFERENÇA DE DATA PARA A SITUAÇÃO MUDAR DE ACORDO COM A DATA

            let dataAtual = new Date()

            let diferençaEmTempo = dataFormatada - dataAtual
            let TempoEmUmDia = 1000 * 60 * 60 * 24;
            let diferençaEmDias = Math.ceil(diferençaEmTempo / TempoEmUmDia);

            //ISSO! CONSEGUI A VARIAVEL DIFERENÇA EM DIAS FUNCIONA E FAZ OQ DIZ SEU NOME!

            td_nome.innerText = this.arrayAlunos[i].nome;
            td_tel.innerText = this.arrayAlunos[i].tel;
            td_turma.innerText = this.arrayAlunos[i].turma;
            td_livro.innerText = this.arrayAlunos[i].livro;
            td_devolucao.innerText = formatador.format(dataFormatada);

            //AQUI EU COMEÇO A MINHA CONDIÇÃO PARA A SITUAÇÃO MUDAR DE ACORDO COM A DATA
            
            let situação = document.createElement('div')
            let textSituacao = document.createElement('h1')
            situação.classList.add('situacao')
            situação.appendChild(textSituacao)
            td_situação.appendChild(situação)
            
            if(diferençaEmDias < 1){
                
                textSituacao.innerText = 'Pendente';

            } else{
       
                textSituacao.innerText = 'Em uso';
                situação.style.backgroundColor = '#008041';
    
            }

        }
    }
    adicionar(aluno){
        //adiciona os itens que estão na variavel aluno na Array
        this.arrayAlunos.push(aluno)
    }
    lerDados(){
        let aluno = {}

        aluno.nome = document.getElementById('nomeAluno').value;
        aluno.tel = document.getElementById('telefoneAluno').value;
        aluno.turma = document.getElementById('turmaAluno').value;
        aluno.livro = document.getElementById('livroAluno').value;
        aluno.devolucao = document.getElementById('devolucaoAluno').value;
        
        console.log(aluno.devolucao)

        return aluno
    }
    validaCampos(aluno){
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
    cancelar(){
        //Limpa os dados depois de clicar em salvar
        document.getElementById('nomeAluno').value = ''
        document.getElementById('telefoneAluno').value = ''
        document.getElementById('turmaAluno').value = ''
        document.getElementById('livroAluno').value = ''
        document.getElementById('devolucaoAluno').value = '';
    }
}

function FormataStringData(data) {
    var dia  = data.split("/")[0];
    var mes  = data.split("/")[1];
    var ano  = data.split("/")[2];
  
    return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  }
  
var aluno = new Aluno();