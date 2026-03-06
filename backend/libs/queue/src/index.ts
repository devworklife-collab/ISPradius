import { Queue, QueueScheduler, Worker, Job } from "bullmq";

export interface QueueConfig {
  name: string;
  redisUrl: string;
}

export class QueueManager {
  readonly queue: Queue;
  readonly scheduler: QueueScheduler;
  readonly worker?: Worker;

  constructor(config: QueueConfig) {
    this.queue = new Queue(config.name, { connection: { url: config.redisUrl } });
    this.scheduler = new QueueScheduler(config.name, { connection: { url: config.redisUrl } });
  }

  async addJob(name: string, data: any, opts?: any) {
    return this.queue.add(name, data, opts);
  }

  createWorker(processor: (job: Job) => Promise<any>) {
    this.worker = new Worker(this.queue.name, processor, {
      connection: { url: (this.queue as any).client.options.url }
    });
    return this.worker;
  }
}
