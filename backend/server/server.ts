import app from "./app";

const url = process.env.MONGODB_URI || "mongodb://192.168.1.12:27017/test_database";
const port = process.env.PORT || 9000;

(async () => {
    // Connect to the database
    // const client = await mongoose.connect(url, {useNewUrlParser: true});
    // Populate database with sample data if it's empty
    // await populateDatabase();
    // Start express App2
    app.listen(port);
    console.log(`App listening on port ${port}...`);
})();
