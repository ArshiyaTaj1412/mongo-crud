const mongoose = require("mongoose");
mongoose

  .connect(
    "mongodb://mongo:onhhKAVlpbjxFgEfCmNoUHMDpdOOadgQ@mongodb.railway.internal:27017",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected to railway"))
  .catch((err) => console.error("couldn't connect to the mongodB...", err));

const userSchema = new mongoose.Schema({
  name: String,
  id: Number,
  assets: [String],
  date: { type: Date, default: Date.now },
  isActive: Boolean,
});

//compile schema to model --> which gives us class by which we will be creating a object
const User = mongoose.model("User", userSchema);

//CREATE
async function createUser() {
  //obj creation
  const user = new User({
    name: "abc",
    id: 456,
    assets: ["laptop", "mobile", "keyboard", "mouse"],
    isActive: true,
  });

  const result = await user.save(); //save
  console.log(result);
}

//DELETE
async function getUsers() {
  const users = await User.find().limit(10).sort({ name: 1 }).countDocuments();
  console.log(users);
}

//UPDATE
async function updateUsers(id) {
  //query first --> findById()->update->save

  const user = await User.findById(id);
  if (!user) return;
  user.isActive = true;
  user.name = "arshiya";
  //   user.set({
  //     isActive: true,
  //     name: "arshiya",
  //   });

  const result = await user.save();
  console.log(result);
}
async function updateUsers1(id) {
  //update first --> update directly--> get updated doc

  const result = await User.updateMany(
    { _id: id },
    {
      $set: {
        name: "abc",
        isActive: false,
      },
    }
  );

  const result1 = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        name: "jack",
        isActive: true,
      },
    },
    { new: true }
  );

  console.log(result1);
}

//DELETE
async function removeUsers(id) {
  const result = await User.deleteOne({ _id: id });
  console.log(result);

  const user = await User.findByIdAndDelete(id);
  console.log(user);
}

createUser();
getUsers();
updateUsers("68a6bfc92ac372f18f8ba321");
updateUsers1("68a6bfc92ac372f18f8ba321");
removeUsers("68a6bfc92ac372f18f8ba321");

//comparsion queries -->eq nq gt gte lt lte in nin
//logical queries --> or and
//regular expression-->
//  const users = await User.find({ name: /.*a.*/i })
//.find({ name: /.*a.*/i })
//.find({ name: "abc" })
//  .find({ id: { $gt: 123, $lte: 123 } })
// .find()
// .or([{ name: "xyz" }, { isActive: true }])
// .and([{ name: "abc" }, { id: 456 }])
