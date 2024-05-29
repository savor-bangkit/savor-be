import { Inject, Injectable } from '@nestjs/common';
import { CreateFridgeItemDto } from './create-fridge-item.dto';
import { UpdateFridgeItemDto } from './update-fridge-item.dto';
import { firestore } from 'firebase-admin';
import { REQUEST } from '@nestjs/core';
import { FridgeItem } from './fridge-item.entity';
import DocumentSnapshot = firestore.DocumentSnapshot;
import QuerySnapshot = firestore.QuerySnapshot;

@Injectable()
export class FridgeItemService {
  private collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(@Inject(REQUEST) private readonly request: { user: any }) {
    this.collection = firestore().collection('fridge-items');
  }

  async create(createFridgeItemDto: CreateFridgeItemDto) {
    const userId = this.request.user.uid;
    const fridgeItem: Omit<FridgeItem, 'id'> = {
      ...createFridgeItemDto,
      userId,
    };

    return this.collection.add(fridgeItem).then((doc) => {
      return { id: doc.id, ...fridgeItem };
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

        const fridgeItems: FridgeItem[] = [];
        for (const doc of querySnapshot.docs) {
          fridgeItems.push(this.transformFridgeItem(doc));
        }

        return fridgeItems;
      });
  }

  getById(id: string) {
    return this.collection
      .doc(id)
      .get()
      .then((querySnapshot: DocumentSnapshot<FridgeItem>) => {
        return this.transformFridgeItem(querySnapshot);
      });
  }

  async update(id: string, updateFridgeItemDto: UpdateFridgeItemDto) {
    const updateData: { [key: string]: any } = { ...updateFridgeItemDto };
    await this.collection.doc(id).update(updateData);
  }

  async delete(id: string) {
    await this.collection.doc(id).delete();
  }

  private transformFridgeItem(querySnapshot: DocumentSnapshot<FridgeItem>) {
    if (!querySnapshot.exists) {
      throw new Error(`No fridge item found with the given id`);
    }

    const fridgeItem = querySnapshot.data();
    const userId = this.request.user.uid;

    if (fridgeItem.userId !== userId) {
      throw new Error(`No fridge item found with the given id`);
    }

    return {
      id: querySnapshot.id,
      ...fridgeItem,
    };
  }
}
