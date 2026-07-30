const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function checkUser() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is missing');
  
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  
  const userCount = await db.collection('users').countDocuments();
  const travelerCount = await db.collection('travelers').countDocuments();
  
  const users = await db.collection('users').find({ email: 'istiakadil8@gmail.com' }).toArray();
  const travelers = await db.collection('travelers').find({ 'user': { $in: users.map(u => u._id) } }).toArray();
  
  console.log(`--- DATABASE: ${db.databaseName} ---`);
  console.log(`Total Users in DB: ${userCount}`);
  console.log(`Total Travelers in DB: ${travelerCount}`);
  console.log('--- YOUR USER ---');
  console.log(users);
  console.log('--- YOUR TRAVELER ---');
  console.log(travelers);
  
  process.exit(0);
}
checkUser().catch(console.error);
