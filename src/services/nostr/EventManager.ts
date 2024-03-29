import {
  relayInit,
  generatePrivateKey,
  getPublicKey,
  getEventHash,
  signEvent,
} from "nostr-tools";

import { getEvents } from "@services/nostr/EventManager/getEvents";
import { getEvent } from "@services/nostr/EventManager/getEvent";
import { getAllEvents } from "@services/nostr/EventManager/getAllEvents";

import { IdentityService } from "@services/nostr/IdentityService";

import "websocket-polyfill";

export class EventManager {
  private static instance: EventManager;

  constructor() {
    this.identityService = IdentityService.getInstance();
    this.pubKeys = this.identityService.getPubkeys();
    this.relay = relayInit("wss://relay.damus.io");

    this.connect();
  }

  public static getInstance(): EventManager {
    if (!this.instance) {
      this.instance = new EventManager();
    }
    return this.instance;
  }

  async connect() {
    this.relay.on("connect", () => {
      console.log(`connected to ${this.relay.url}`);
    });
    this.relay.on("error", () => {
      console.log(`failed to connect to ${this.relay.url}`);
    });

    await this.relay.connect();
  }

  async getAllEvents() {
    const events = await getAllEvents(this.relay, this.pubKeys);
    return events;
  }

  async getEvents() {
    const events = await getEvents(this.relay, this.pubKeys);
    return events;
  }

  async getEvent(id) {
    const events = await getEvent(this.relay, id);
    return events;
  }

  async getQuote(eventId) {
    const event = this.getEvent(eventId);
    return event;
  }
}
