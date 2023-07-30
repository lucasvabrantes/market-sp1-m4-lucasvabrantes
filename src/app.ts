import express, { Application, json } from "express";
import logics from "./logics";
import { ensureIdExists, verifyEqualNameExists } from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/products", verifyEqualNameExists, logics.registerProduct);
app.get("/products", logics.readAllProducts);

app.use("/products/:id", ensureIdExists);

app.get("/products/:id", logics.readProductById);
app.patch("/products/:id", verifyEqualNameExists, logics.updateProduct);
app.delete("/products/:id", logics.deleteProduct);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
