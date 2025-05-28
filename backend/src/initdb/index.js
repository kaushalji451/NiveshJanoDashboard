const initdata = require("./data");
const dotenv = require("dotenv")
const {CandidateModel} = require("../models/candidates");
dotenv.config();

const main = require("./connectDb");
main();

const initDb = async () => {
    let data = await CandidateModel.insertMany(initdata);
console.log("data was initilize",data);
};
initDb();
