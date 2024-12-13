import readlinesync = require("readline-sync");
import {colors} from './src/util/Colors';
//import { Conta } from "./src/model/Conta";
import { contaCorrente } from "./src/model/ContaCorrente";
import { contaPoupanca } from "./src/model/ContaPoupanca";

export function main() {
  let opcao: number;
  
  //Contas Correntes
  const cc1 = new contaCorrente(3, 789, 1, "Andressa", 100000, 1000);
  cc1.visualizar();

  const cc2 = new contaCorrente(4, 456, 1, "Beatriz", 5000000, 50000);
  cc2.visualizar();

  //saque na conta corrente
  cc1.sacar(100500);
  cc1.visualizar();

  //deposito na conta corrente
  cc1.depositar(2000);
  cc1.visualizar();

  console.log(" ");

  //conta Poupanca
  const cp1 = new contaPoupanca(5, 799, 2, "Ana", 900000, 12);
  cp1.visualizar();

  const cp2 = new contaPoupanca(6, 654, 2, "Carlos", 300000, 26);
  cp1.visualizar();

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
        keyPress()
        break;
      case 2:
        console.log(colors.fg.whitestrong,"\n\nListar todas as Contas\n\n", colors.reset);
        keyPress()
        break;
      case 3:
        console.log(colors.fg.whitestrong,"\n\nConsultar Dados da Conta - Por Numero\n\n", colors.reset);
        keyPress()
        break;
      case 4:
        console.log(colors.fg.whitestrong,"\n\nAtualizar Dados da Conta\n\n", colors.reset);
        keyPress()
        break;
      case 5:
        console.log(colors.fg.whitestrong,"\n\nApagar uma Conta\n\n", colors.reset);
        keyPress()
        break;
      case 6:
        console.log(colors.fg.whitestrong,"\n\nSaque\n\n", colors.reset);
        keyPress()
        break;
      case 7:
        console.log(colors.fg.whitestrong,"\n\nDeposito\n\n", colors.reset);
        keyPress()
        break;
      case 8:
        console.log(colors.fg.whitestrong,"\n\nTransferencia Entre Contas\n\n", colors.reset);
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