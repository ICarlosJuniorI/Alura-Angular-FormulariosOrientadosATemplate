import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[maiorIdadeValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MaiorIdadeDirective,
      multi: true,
    },
  ],
})
export class MaiorIdadeDirective implements Validator {
  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    // Pega a data de nascimento informada
    const dataNascimento = control.value;
    // Pega o ano de nascimento
    const anoNascimento = new Date(dataNascimento).getFullYear();
    // Calcula o ano em que o usuário deveria ter 18 anos (considerando 18 anos a mais)
    const anoNascMais18 = anoNascimento + 18;
    // Pega o ano atual
    const anoAtual = new Date().getFullYear();

    // Verifica se a pessoa é maior de idade
    const maiorIdade = anoNascMais18 <= anoAtual;

    return maiorIdade ? null : { maiorIdadeValidator: true };
  }
}
