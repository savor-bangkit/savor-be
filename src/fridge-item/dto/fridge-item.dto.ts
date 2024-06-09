import { FridgeItem } from '../fridge-item.entity';

export class FridgeItemDTO {
  id: string;
  userId: string;
  category: string;
  createdAt: string;
  daysCountExpire: number;

  constructor(fridgeItem: FridgeItem) {
    this.id = fridgeItem.id;
    this.userId = fridgeItem.userId;
    this.category = fridgeItem.category;
    this.createdAt =
      fridgeItem.createdAt instanceof Date
        ? fridgeItem.createdAt.toISOString()
        : this.formatCreatedAtTimestamp(fridgeItem.createdAt);
    this.daysCountExpire = fridgeItem.daysCountExpire;
  }

  private formatCreatedAtTimestamp(createdAt: {
    _seconds: number;
    _nanoseconds: number;
  }): string {
    const date = new Date(
      createdAt._seconds * 1000 + createdAt._nanoseconds / 1000000,
    );
    return date.toISOString();
  }
}
