import "./connections/db.js";
import app from "./src/app.js";
import { CONSTANT } from "./utils/constants.js";

app.listen(CONSTANT.SERVER.PORT, () => {
  console.log("Server is running on port 3000");
});
