import {Conta} from "./Conta"

export class contaPoupanca extends Conta{
    private _aniversario: number;


	constructor(numero: number, 
                agencia: number, 
                tipo: number, 
                titular: string, 
                saldo: number, 
                aniversario: number) {

        super(numero, agencia, tipo, titular, saldo);
		this._aniversario = aniversario;
	}

	public get aniversario(): number {
		return this._aniversario;
	}

	public set aniversario(value: number) {
		this._aniversario = value;
	}

    //visualizar
    public visualizar(){
        super.visualizar();
        console.log(`Conta Poupanca: ${this._aniversario}`)
    }

}