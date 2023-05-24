import { APP_INITIALIZER } from '@angular/core';
import { FlowchartFacade } from './flowchart.facade';

// Como todos os dados são estáticos, não há necessidade
// inscrever-se em nenhum observable no initializer.
export const flowchartInitializer = () => () => {};

export const flowchartInitializerProvider = {
  provide: APP_INITIALIZER,
  useFactory: flowchartInitializer,
  multi: true,
  deps: [FlowchartFacade],
};
