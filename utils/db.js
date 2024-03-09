import mongoose from "mongoose";
export default function connectDatabase() {
  mongoose
    .connect(process.env.DB)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => console.log(err));
}
