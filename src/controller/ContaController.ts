import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";

export class ContaController implements ContaRepository {
  //Coleção Array que vai armazenar os Objetos contas
  private listaContas = new Array<Conta>();

  //controlar os Números das Contas
  public numero: number = 0;

  procurarPorTitular(titular: string): void {

    //filtragem dos dados
    let buscaPorTitular = this.listaContas.filter( conta =>
        conta.titular.toUpperCase().includes(titular.toUpperCase())
    )

    //listagem dos dados
    buscaPorTitular.forEach(conta => conta.visualizar());
  }

  procurarPorNumero(numero: number): void {
    const buscaConta = this.buscarNoArray(numero);

    if (buscaConta !== null) buscaConta.visualizar();
    else console.log(`\nConta não encontrada!`);
  }

  listarTodas(): void {
    for (let conta of this.listaContas) {
      conta.visualizar();
    }
  }

  cadastrar(conta: Conta): void {
    this.listaContas.push(conta);
    console.log("A Conta foi Cadastrada com Sucesso!");
  }

  atualizar(conta: Conta): void {
    const buscaConta = this.buscarNoArray(conta.numero);
    console.log("A conta foi atualizada com sucesso!");

    if (buscaConta !== null) {
      this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
    } else {
      console.log(`\nConta não encontrada!`);
    }
  }

  deletar(numero: number): void {
    const buscaConta = this.buscarNoArray(numero);

    if (buscaConta !== null) {
      this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
      console.log("A conta foi deletada com sucesso!");
    } else {
      console.log(`\nConta não encontrada!`);
    }
  }

  sacar(numero: number, valor: number): void {
    const buscaConta = this.buscarNoArray(numero);

    if (buscaConta !== null) {
      if (buscaConta.sacar(valor) === true)
        console.log("O saque foi efetuado com sucesso");
    } else console.log("\n Conta não encontrada");
  }

  depositar(numero: number, valor: number): void {
    const buscaConta = this.buscarNoArray(numero);

    if (buscaConta !== null) {
      buscaConta.depositar(valor);
      console.log("O deposito foi efetuado com sucesso");
    } else console.log("\n Conta não encontrada");
  }

  transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
    const contaOrigem = this.buscarNoArray(numeroOrigem);
    const contaDestino = this.buscarNoArray(numeroDestino);

    if (contaOrigem !== null && contaDestino !== null) {
      if (contaOrigem.sacar(valor) === true) {
        contaDestino.depositar(valor);
        console.log("A transferencia foi efetuada com sucesso");
      } else
        console.log(
          `\nConta de origem e ou conta de destino não foi encontrda!`
        );
    }
  }

  //Métodos Auxiliares

  public gerarNumero(): number {
    return ++this.numero;
  }

  public buscarNoArray(numero: number): Conta | null {
    for (let conta of this.listaContas) {
      if (conta.numero === numero) return conta;
    }

    return null;
  }
}
