import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: 'rodrigo',
    email: 'rodrigo@tamura.com.br',
  }

  constructor(private http: Http) { }

  ngOnInit() {
  }

  onSubmit(form){
    console.log(form);

    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
      .map(res => res)//Mapeando resposta que vem do servidor;
      .subscribe(dados => console.log(dados));
  }

  verificaValidTouched(campo){
    return !campo.valid && campo.touched
  }

  aplicaCssErro(campo){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(cep, form){
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

     //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {

        this.resetaDadosForm(form);

        this.http.get(`//viacep.com.br/ws/${cep}/json/`)
          .map(dados => dados.json())
          .subscribe(dados => this.populandoFormDados(dados, form));

      }
    }

  }

  populandoFormDados(dados, formulario){
    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf 
      }
    })
  }

  resetaDadosForm(formulario){
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null 
      }
    })
  }

}
