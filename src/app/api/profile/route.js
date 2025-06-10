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


// import mongoose from "mongoose";
// import { authOptions } from "../auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import { User } from "../../../app/models/User";
// import { UserInfo } from "../../../app/models/UserInfo";

// let isConnected = false;

// async function connectDB() {
//   if (!isConnected) {
//     await mongoose.connect(process.env.MONGO_URL);
//     isConnected = true;
//   }
// }

// export async function PUT(req) {
//   await connectDB();
//   const data = await req.json();
//   const { _id, name, image, ...otherUserInfo } = data;

//   const filter = _id
//     ? { _id }
//     : { email: (await getServerSession(authOptions)).user.email };

//   const user = await User.findOne(filter);
//   if (!user) {
//     return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
//   }

//   await User.updateOne(filter, { name, image });
//   await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, { upsert: true });

//   return new Response(JSON.stringify({ success: true }), { status: 200 });
// }

// export async function GET(req) {
//   await connectDB();
//   const url = new URL(req.url);
//   const _id = url.searchParams.get("_id");

//   const filter = _id
//     ? { _id }
//     : { email: (await getServerSession(authOptions))?.user?.email };

//   const user = await User.findOne(filter).lean();
//   if (!user) {
//     return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
//   }

//   const userInfo = await UserInfo.findOne({ email: user.email }).lean();
//   return new Response(JSON.stringify({ ...user, ...userInfo }), { status: 200 });
// }
import mongoose from "mongoose"
import { authOptions } from "../auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { User } from "../../../app/models/User"
import { UserInfo } from "../../../app/models/UserInfo"

let isConnected = false

async function connectDB() {
  if (!isConnected && process.env.MONGO_URL) {
    try {
      await mongoose.connect(process.env.MONGO_URL)
      isConnected = true
      console.log("✅ Database connected successfully")
    } catch (error) {
      console.error("❌ Database connection error:", error)
      throw new Error("Database connection failed")
    }
  } else if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL environment variable is not set")
  }
}

export async function GET(req) {
  console.log("🔍 GET /api/profile - Starting request")

  try {
    // Check environment variables
    if (!process.env.MONGO_URL) {
      console.error("❌ MONGO_URL not found in environment variables")
      return new Response(JSON.stringify({ error: "Database configuration missing" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Connect to database
    console.log("🔌 Connecting to database...")
    await connectDB()

    // Get URL parameters
    const url = new URL(req.url)
    const _id = url.searchParams.get("_id")
    console.log("📋 Request params - _id:", _id)

    let filter = {}

    if (_id) {
      filter = { _id }
      console.log("🎯 Using _id filter:", filter)
    } else {
      // Get session
      console.log("🔐 Getting session...")
      const session = await getServerSession(authOptions)
      console.log("👤 Session data:", session ? "Session found" : "No session")

      if (!session?.user?.email) {
        console.error("❌ No valid session or email found")
        return new Response(JSON.stringify({ error: "Unauthorized - Please log in again" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        })
      }

      filter = { email: session.user.email }
      console.log("📧 Using email filter:", session.user.email)
    }

    // Find user
    console.log("👤 Finding user with filter:", filter)
    const user = await User.findOne(filter).lean()

    if (!user) {
      console.error("❌ User not found with filter:", filter)
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.log("✅ User found:", user.email)

    // Find user info
    console.log("📄 Finding user info for email:", user.email)
    const userInfo = await UserInfo.findOne({ email: user.email }).lean()
    console.log("📄 User info found:", userInfo ? "Yes" : "No")

    const result = { ...user, ...userInfo }
    console.log("✅ GET /api/profile - Success")

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("❌ GET /api/profile error:", error)
    console.error("Error stack:", error.stack)

    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

export async function PUT(req) {
  console.log("🔍 PUT /api/profile - Starting request")

  try {
    await connectDB()

    const data = await req.json()
    console.log("📝 Request data keys:", Object.keys(data))

    const { _id, name, image, ...otherUserInfo } = data

    let filter = {}

    if (_id) {
      filter = { _id }
      console.log("🎯 Using _id filter for update:", filter)
    } else {
      const session = await getServerSession(authOptions)
      if (!session?.user?.email) {
        console.error("❌ No valid session for PUT request")
        return new Response(JSON.stringify({ error: "Unauthorized - Please log in again" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        })
      }
      filter = { email: session.user.email }
      console.log("📧 Using email filter for update:", session.user.email)
    }

    const user = await User.findOne(filter)
    if (!user) {
      console.error("❌ User not found for update with filter:", filter)
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.log("✅ Updating user:", user.email)
    await User.updateOne(filter, { name, image })
    await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, { upsert: true })

    console.log("✅ PUT /api/profile - Success")
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("❌ PUT /api/profile error:", error)
    console.error("Error stack:", error.stack)

    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
