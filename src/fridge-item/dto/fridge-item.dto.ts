export class FridgeItemDTO {
  id: string;
  userId: string;
  category: string;
  createdAt: string;
  daysCountExpire: number;
  countDownDays: number;

  constructor(fridgeItem) {
    this.id = fridgeItem.id;
    this.userId = fridgeItem.userId;
    this.category = fridgeItem.category;
    this.createdAt =
      fridgeItem.createdAt instanceof Date
        ? fridgeItem.createdAt.toISOString()
        : this.formatCreatedAtTimestamp(fridgeItem.createdAt);
    this.daysCountExpire = fridgeItem.daysCountExpire;
    this.countDownDays = this.calculateCountDownDays();
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

  private calculateCountDownDays(): number {
    const createdAtDate = new Date(this.createdAt);
    const expirationDate = new Date(
      createdAtDate.getTime() + this.daysCountExpire * 24 * 60 * 60 * 1000,
    );
    const now = new Date();
    const timeDiff = expirationDate.getTime() - now.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  }
}
