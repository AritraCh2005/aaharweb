// import mongoose from "mongoose";
// import { authOptions } from "../auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import { User } from "../../../app/models/User";
// import { UserInfo } from "../../../app/models/UserInfo";

// export async function PUT(req) {
//   // mongoose.connect(process.env.MONGO_URL);
//   // const data = await req.json();
//   // const { name, image, ...otherUserInfo } = data;

//   // const session = await getServerSession(authOptions);
//   // const email = session.user.email;

//   // await User.updateOne({ email }, { name, image });
//   // await UserInfo.findOneAndUpdate({ email }, otherUserInfo, { upsert: true });
//   // const updatedUser = await User.findOne({ email }).lean();
//   // const updatedUserInfo = await UserInfo.findOne({ email }).lean();

//   // return new Response(true);

//   mongoose.connect(process.env.MONGO_URL);
//   const data = await req.json();
//   const { _id,name, image, ...otherUserInfo } = data;

//   let filter={};
//   if(_id){
//     filter={_id};
//   }else{
//     const session = await getServerSession(authOptions);
//     const email = session.user.email;
//     filter={email};
//   }

//   const user=await User.findOne(filter);
//   await User.updateOne( filter , { name, image });
//   await UserInfo.findOneAndUpdate({ email:user.email }, otherUserInfo, { upsert: true });

//   return Response.json(true);


// }

// export async function GET(req) {
//   mongoose.connect(process.env.MONGO_URL);

//   const url = new URL(req.url);
//   const _id = url.searchParams.get("_id");

//   let filterUser={}

//   if (_id) {
//     filterUser = { _id };
//   } else {
//     const session = await getServerSession(authOptions);
//     const email = session?.user?.email;
    
//     if (!email) {
//       return Response.json({});
//     }
//     filterUser={email};
  
    
//   }
//   const user = await User.findOne(filterUser).lean();
//   const userInfo = await UserInfo.findOne({ email:user.email }).lean();
//   return Response.json({ ...user, ...userInfo });
// }


import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "../../../app/models/User";
import { UserInfo } from "../../../app/models/UserInfo";

let isConnected = false;

async function connectDB() {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
  }
}

export async function PUT(req) {
  await connectDB();
  const data = await req.json();
  const { _id, name, image, ...otherUserInfo } = data;

  const filter = _id
    ? { _id }
    : { email: (await getServerSession(authOptions)).user.email };

  const user = await User.findOne(filter);
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
  }

  await User.updateOne(filter, { name, image });
  await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, { upsert: true });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function GET(req) {
  await connectDB();
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  const filter = _id
    ? { _id }
    : { email: (await getServerSession(authOptions))?.user?.email };

  const user = await User.findOne(filter).lean();
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
  }

  const userInfo = await UserInfo.findOne({ email: user.email }).lean();
  return new Response(JSON.stringify({ ...user, ...userInfo }), { status: 200 });
}
