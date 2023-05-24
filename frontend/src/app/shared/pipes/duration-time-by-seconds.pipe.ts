import { Pipe, PipeTransform } from '@angular/core';
import { intervalToDuration, Duration } from 'date-fns';

@Pipe({
  name: 'durationTimeBySeconds',
})
export class DurationTimeBySecondsPipe implements PipeTransform {
  private durationToString(time: Duration): string {
    const { years, months, days, hours, minutes } = time;
    let returnString = '';
    if (years) {
      returnString += `${years} anos `;
    }
    if (months) {
      returnString += `${months} meses `;
    }
    if ((!years || !months) && days) {
      returnString += `${days} dias `;
    }
    if (
      (!years || !months) &&
      (!months || !days) &&
      (!years || !days) &&
      hours
    ) {
      returnString += `${hours} horas `;
    }
    if (
      (!years || !months) &&
      (!months || !days) &&
      (!years || !days) &&
      (!years || !hours) &&
      (!months || !hours) &&
      (!days || !hours) &&
      minutes
    ) {
      returnString += `${minutes} minutos`;
    }

    return returnString;
  }

  transform(value: number, ...args: unknown[]): unknown {
    if (!value) return 'Sem duração';
    if (value < 60) return `${value} segundos`;
    const time: Duration = intervalToDuration({ start: 0, end: value * 1000 });
    return this.durationToString(time);
  }
}
