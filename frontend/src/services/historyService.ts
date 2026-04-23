import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import { PredictionHistory } from '@/types/auth';

export class HistoryService {
  static async create(entry: Omit<PredictionHistory, '_id' | 'createdAt'>) {
    const { db } = await connectToDatabase();
    const collection = db.collection<PredictionHistory>('history');

    const doc: Omit<PredictionHistory, '_id'> = {
      ...entry,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(doc as any);
    return { ...doc, _id: result.insertedId.toString() };
  }

  static async listByUser(userId: string, limit = 20) {
    const { db } = await connectToDatabase();
    const collection = db.collection<PredictionHistory>('history');

    const items = await collection
      .find({ userId } as any)
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    return items.map((x: any) => ({ ...x, _id: x._id?.toString?.() ?? x._id }));
  }
}
