import { Inject, Injectable } from '@nestjs/common';
import { CreateFridgeItemDto } from './dto/create-fridge-item.dto';
import { firestore } from 'firebase-admin';
import { REQUEST } from '@nestjs/core';
import { FridgeItem } from './fridge-item.entity';
import DocumentSnapshot = firestore.DocumentSnapshot;
import QuerySnapshot = firestore.QuerySnapshot;
import { FridgeItemDTO } from './dto/fridge-item.dto';

@Injectable()
export class FridgeItemService {
  private collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(@Inject(REQUEST) private readonly request: { user: any }) {
    this.collection = firestore().collection('fridge-items');
  }

  private getExpiryDays(category: string): number {
    const expiryMap = {
      APPLE: 7,
      BANANA: 3,
      FISH: 4,
      EGG: 21,
      CUCUMBER: 7,
      SPINACH: 6,
      CHICKEN: 2,
    };
    return expiryMap[category.toUpperCase()] || 0;
  }

  async create(createFridgeItemDto: CreateFridgeItemDto) {
    const userId = this.request.user.uid;
    const createdAt = new Date();
    const daysCountExpire = this.getExpiryDays(createFridgeItemDto.category);

    const fridgeItem: Omit<FridgeItem, 'id'> = {
      ...createFridgeItemDto,
      userId,
      createdAt,
      daysCountExpire,
    };

    return this.collection.add(fridgeItem).then((doc) => {
      const addedItem = {
        id: doc.id,
        ...fridgeItem,
      };
      return new FridgeItemDTO(addedItem);
    });
  }

  getAll() {
    return this.collection
      .where('userId', '==', this.request.user.uid)
      .get()
      .then((querySnapshot: QuerySnapshot<FridgeItem>) => {
        if (querySnapshot.empty) {
          return [];
        }

        const fridgeItems: FridgeItemDTO[] = [];
        for (const doc of querySnapshot.docs) {
          const fridgeItem = doc.data();
          fridgeItem.id = doc.id;
          const transformedItem = new FridgeItemDTO(fridgeItem);
          fridgeItems.push(transformedItem);
        }

        return fridgeItems;
      });
  }

  getById(id: string) {
    return this.collection
      .doc(id)
      .get()
      .then((docSnapshot: DocumentSnapshot<FridgeItem>) => {
        if (!docSnapshot.exists) {
          throw new Error('FridgeItem not found');
        }

        const fridgeItem = docSnapshot.data() as FridgeItem;
        fridgeItem.id = docSnapshot.id;
        return new FridgeItemDTO(fridgeItem);
      });
  }

  async delete(id: string) {
    await this.collection.doc(id).delete();
  }
}
