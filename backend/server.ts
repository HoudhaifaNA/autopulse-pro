import app from "./app";

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});

export default server;
