import { Publisher } from './pub-sub';

export type ModelStatusType = 'pending' | 'available' | 'failure';

export class ModelStatus {
  private state: ModelStatusType = 'pending';
  private publisher: Publisher;

  constructor(publisher: Publisher) {
    this.publisher = publisher;
  }
  // states in which model can be in
  // 1. pending
  // 2. available
  // 3. failure

  setModelStatus(modelStatus: ModelStatusType): void {
    this.state = modelStatus;
    this.publisher.updateSubscribers();
  }

  getModelStatus() {
    return this.state;
  }
}
