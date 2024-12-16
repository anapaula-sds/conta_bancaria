import readlinesync = require("readline-sync");
import {colors} from './src/util/Colors';
//import { Conta } from "./src/model/Conta";
import { ContaCorrente } from "./src/model/ContaCorrente";
import { ContaPoupanca } from "./src/model/ContaPoupanca";
import { ContaController } from "./src/controller/ContaController";
import { read, realpath } from "fs";

export function main() {
  let opcao, numero, agencia, tipo, saldo, limite, aniversario, numeroDestino, valor: number;
  let titular: string;
  const tipoContas = ['Conta Corrente', 'Conta Poupanca'];

  //Criando objeto da Classe ContaController
  const contas = new ContaController();
  
  //Novas Instâncias da Classe ContaCorrente (Objetos)
  contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 1234, 1, 'Amanda Magro', 1000000.00, 100000.00));
  contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 4578, 1, 'João da Silva', 1000.00, 100.00));

  // Novas Instâncias da Classe ContaPoupança (Objetos)
  contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5789, 2, "Geana Almeida", 10000, 10));
  contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5698, 2, "Jean Lima", 15000, 15));

  while (true) {
    console.log(colors.bg.black, colors.fg.yellow,"***********************************************");
    console.log("                                               ");
    console.log("             Banco Cripto Money                ");
    console.log("                                               ");
    console.log("***********************************************");
    console.log("                                               ");
    console.log("           1 - Criar Conta                     ");
    console.log("           2 - Listar todas as Conta           ");
    console.log("           3 - Buscar Conta por Numero         ");
    console.log("           4 - Atualizar Dados da Conta        ");
    console.log("           5 - Apagar Conta                    ");
    console.log("           6 - Sacar                           ");
    console.log("           7 - Depositar                       ");
    console.log("           8 - Transferir Valores entre Conta  ");
    console.log("           9 - Sair                            ");
    console.log("                                               ");
    console.log("***********************************************");
    console.log("                                               ",colors.reset);

    console.log("Entre com a opcao desejada: ");
    opcao = readlinesync.questionInt("");

    if (opcao == 9) {
      console.log(colors.fg.greenstrong,"\nBanco Cripto Money - O futuro do seu Dinheiro comeca aqui");
      sobre();
      console.log(colors.reset, "")
      process.exit(0);
    }

    switch (opcao) {
      case 1:
        console.log(colors.fg.whitestrong,"\n\nCriar Conta\n\n", colors.reset);

        console.log("Digite o Número da Agencia: ");
        agencia = readlinesync.questionInt('');
        
        console.log("Digite o Nome do Titular: ");
        titular = readlinesync.question('');

        console.log("Escolha o Tipo da Conta: ")
        tipo = readlinesync.keyInSelect(tipoContas, "", {cancel: false}) + 1;

        console.log("Digite o Saldo da Conta: ");
        saldo = readlinesync.questionFloat('');

        switch(tipo){
          case 1:
            console.log("Digite o Limite da Conta: ");
            limite = readlinesync.questionFloat('');
            contas.cadastrar(new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular, saldo, limite));
          break;
          case 2:
            console.log("Digite o Dia do Aniversario da Poupanca: ");
            aniversario = readlinesync.questionInt('');
            contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), agencia, tipo, titular, saldo, aniversario));
          break;
        }
      
        keyPress()
        break;
      case 2:
        console.log(colors.fg.whitestrong,"\n\nListar todas as Contas\n\n", colors.reset);
        contas.listarTodas();
        keyPress()
        break;
      case 3:
        console.log(colors.fg.whitestrong,"\n\nConsultar Dados da Conta - Por Numero\n\n", colors.reset);

        console.log("Digite o Número da conta: ")
          numero = readlinesync.questionInt('');
          contas.procurarPorNumero(numero);
        
        keyPress()
        break;
      case 4:
        console.log(colors.fg.whitestrong,"\n\nAtualizar Dados da Conta\n\n", colors.reset);

        console.log("Digite o Número da conta: ")
        numero = readlinesync.questionInt('');

        let conta = contas.buscarNoArray(numero);

        if (conta !== null){

        console.log("Digite o Novo Número da Agencia: ");
        agencia = readlinesync.questionInt('');
        
        console.log("Digite o Novo Nome do Titular: ");
        titular = readlinesync.question('');

        console.log("Digite o Novo  Saldo da Conta: ");
        saldo = readlinesync.questionFloat('');

        tipo = conta.tipo;

        switch(tipo){
          case 1:
            console.log("Digite o Novo Limite da Conta: ");
            limite = readlinesync.questionFloat('');
            contas.atualizar(new ContaCorrente(numero, agencia, tipo, titular, saldo, limite));
          break;
          case 2:
            console.log("Digite o Novo Dia do Aniversario da Poupanca: ");
            aniversario = readlinesync.questionInt('');
            contas.atualizar(new ContaPoupanca(numero, agencia, tipo, titular, saldo, aniversario));
          break;
        }
      }else{
        console.log("Conta não encontrada!")
      }

        keyPress()
        break;
      case 5:
        console.log(colors.fg.whitestrong,"\n\nApagar uma Conta\n\n", colors.reset);

        console.log("Digite o Número da conta: ")
        numero = readlinesync.questionInt('');
        contas.deletar(numero);

        keyPress()
        break;
      case 6:
        console.log(colors.fg.whitestrong,"\n\nSaque\n\n", colors.reset);

        console.log("Digite o Número da conta: ")
        numero = readlinesync.questionInt('');

        console.log("Digite o valor da saque: ")
        valor = readlinesync.questionInt('');
        contas.sacar(numero, valor);

        keyPress()
        break;
      case 7:
        console.log(colors.fg.whitestrong,"\n\nDeposito\n\n", colors.reset);

        console.log("Digite o Número da conta: ")
        numero = readlinesync.questionInt('');

        console.log("Digite o valor de deposito: ")
        valor = readlinesync.questionInt('');
        contas.depositar(numero, valor);


        keyPress()
        break;
      case 8:
        console.log(colors.fg.whitestrong,"\n\nTransferencia Entre Contas\n\n", colors.reset);
        
        console.log("Digite o numero da conta de origem: ");
        numero = readlinesync.questionInt('');

        console.log("Digite o numero da conta destino: ");
        numeroDestino = readlinesync.questionInt('');

        console.log("Digite o valor da transferencia: "); 
        valor  = readlinesync.questionFloat('');

        contas.transferir(numero, numeroDestino, valor);
        
        keyPress()
        break;
      default:
        console.log(colors.fg.whitestrong,"\n\nOpcao Invalida!\n\n", colors.reset);
        keyPress()
        break;
    }
  }
}


export function sobre():void{
    console.log("***********************************************");
    console.log("Projeto Desenvolvido por: ");
    console.log("Ana Paula Santana - anapaula-sds@hotmail.com");
    console.log("https://github.com/anapaula-sds/");
    console.log("***********************************************");
}

function keyPress(): void{
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar ...")
    readlinesync.prompt();
}

main();