const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://raflyafrzl:12345@cluster0.bmw38zc.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);
