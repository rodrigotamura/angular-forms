import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form){
    console.log(form.value);
  }

}
