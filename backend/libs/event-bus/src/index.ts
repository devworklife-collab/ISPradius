import { EventEmitter } from "events";
import Redis, { Redis as RedisClient } from "ioredis";

export enum EventType {
  InvoiceCreated = "InvoiceCreated",
  PaymentReceived = "PaymentReceived",
  UserSuspended = "UserSuspended",
  TicketOpened = "TicketOpened",
  DeviceOffline = "DeviceOffline"
}

export interface BaseEvent<T = any> {
  type: EventType;
  payload: T;
  timestamp: string;
}

export interface EventBusOptions {
  redisUrl?: string;
  channel?: string;
}

export class EventBus {
  private emitter = new EventEmitter();
  private redisPub?: RedisClient;
  private redisSub?: RedisClient;
  private channel: string;

  constructor(options: EventBusOptions = {}) {
    this.channel = options.channel ?? "ispradius:events";

    if (options.redisUrl) {
      this.redisPub = new Redis(options.redisUrl);
      this.redisSub = new Redis(options.redisUrl);
      this.redisSub.subscribe(this.channel, (err) => {
        if (err) {
          console.error("[EventBus] Redis subscribe error", err);
          return;
        }
      });

      this.redisSub.on("message", (_, message) => {
        try {
          const event = JSON.parse(message) as BaseEvent;
          this.emitter.emit(event.type, event);
        } catch (err) {
          console.error("[EventBus] Failed to parse event", err);
        }
      });
    }
  }

  publish<T>(event: BaseEvent<T>) {
    this.emitter.emit(event.type, event);

    if (this.redisPub) {
      this.redisPub.publish(this.channel, JSON.stringify(event)).catch((err) => {
        console.error("[EventBus] Redis publish error", err);
      });
    }
  }

  subscribe<T>(type: EventType, handler: (event: BaseEvent<T>) => void) {
    this.emitter.on(type, handler as any);
  }

  unsubscribe<T>(type: EventType, handler: (event: BaseEvent<T>) => void) {
    this.emitter.off(type, handler as any);
  }
}

export const defaultEventBus = new EventBus();
