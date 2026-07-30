import mongoose from 'mongoose';
import 'dotenv/config';

async function checkUser() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is missing');
  
  await mongoose.connect(uri);
  
  const db = mongoose.connection.db;
  if (!db) return;
  
  const users = await db.collection('users').find({ email: 'istiakadil8@gmail.com' }).toArray();
  const travelers = await db.collection('travelers').find({ 'user': { $in: users.map(u => u._id) } }).toArray();
  
  console.log('--- USERS ---');
  console.log(users);
  console.log('--- TRAVELERS ---');
  console.log(travelers);
  
  process.exit(0);
}

checkUser().catch(console.error);
