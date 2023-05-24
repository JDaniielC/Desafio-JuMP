import { DurationTimeBySecondsPipe } from './duration-time-by-seconds.pipe';

describe('DurationTimeBySecondsPipe', () => {
  it('create an instance', () => {
    const pipe = new DurationTimeBySecondsPipe();
    expect(pipe).toBeTruthy();
  });
});
