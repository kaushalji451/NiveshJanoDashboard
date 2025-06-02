const express = require("express");
const candidatesRoute = express.Router();
const connectDb = require("../initdb/connectDb");
const { CandidateModel } = require("../models/candidates");
const dotenv = require("dotenv");
connectDb();

// const multer = require("multer");
// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

// // Cloudinary config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// // Multer Cloudinary Storage
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "uploads", // optional folder in Cloudinary
//     allowed_formats: ["jpg", "jpeg", "png"],
//   },
// });
// const upload = multer({ storage: storage });
// dotenv.config();

candidatesRoute.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      position,
      appliedOn,
      gte,
      lte,
    } = req.query;

    const filters = {};

    if (position) {
      filters.position = position;
    }

    if (appliedOn) {
      const start = new Date(appliedOn);
      start.setHours(0, 0, 0, 0);
      const end = new Date(appliedOn);
      end.setHours(23, 59, 59, 999);

      filters.appliedOn = { $gte: start, $lte: end };
    }

    if (gte || lte) {
      filters.aiRating = {};
      if (gte) filters.aiRating.$gte = Number(gte);
      if (lte) filters.aiRating.$lte = Number(lte);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [data, total] = await Promise.all([
      CandidateModel.find(filters)
        .sort({ appliedOn: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate("score"),
      CandidateModel.countDocuments(filters),
    ]);

    res.status(200).json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data,
    });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

candidatesRoute.get('/status/:status', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const filters = { status: req.params.status };

    const [data, total] = await Promise.all([
      CandidateModel.find(filters)
        .sort({ appliedOn: -1 })
        .skip(skip)
        .limit(limit)
        .populate("score"),
      CandidateModel.countDocuments(filters),
    ]);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      data,
    });
  } catch (error) {
    console.error("Error fetching candidates by status:", error);
    res.status(500).json({ error: 'Server error' });
  }
});

candidatesRoute.get('/status-counts', async (req, res) => {
  try {
    const result = await CandidateModel.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const counts = result.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    res.json(counts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch status counts" });
  }
});


candidatesRoute.get("/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    let data = await CandidateModel.findById(id).populate("score");
    if (data != null) {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: "No user found" });
  }
});


candidatesRoute.put("/:id", async (req, res) => {
  let { id } = req.params;
  let { status,tag,name,email } = req.body;
  try {
    let data = await CandidateModel.findByIdAndUpdate(id, {
      name,
      email,
      tag,
      status
    });
    if (data != null) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "No user found" });
    }
  } catch (error) {
    console.error("Error updating candidate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

candidatesRoute.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let data = await CandidateModel.findByIdAndDelete(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "No user found" });
    }
  } catch (error) {
    console.error("Error deleting candidate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

candidatesRoute.patch("/bulk-update", async (req, res) => {
  const { ids, status } = req.body;
  try {
    const result = await CandidateModel.updateMany(
      { _id: { $in: ids } },
      { $set: { status: status } }
    );
    res.status(200).json({ message: "Bulk update successful", result });
  } catch (error) {
    console.error("Error in bulk update:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = candidatesRoute;
module.exports = candidatesRoute;

