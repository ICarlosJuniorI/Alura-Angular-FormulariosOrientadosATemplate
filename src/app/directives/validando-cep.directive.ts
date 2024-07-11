import { Directive } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ConsultaCepService } from '../service/consulta-cep.service';

@Directive({
  selector: '[validadorCep]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ValidandoCepDirective,
      multi: true,
    },
  ],
})
export class ValidandoCepDirective implements AsyncValidator {
  constructor(private consultaCepService: ConsultaCepService) {}
  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    // Pega o CEP informado
    const cep = control.value;

    // Busca o CEP
    return this.consultaCepService
      .getConsultaCep(cep)
      .pipe(
        map((resultado: any) =>
          resultado.erro ? { validadorCep: true } : null
        )
      );
  }
}
