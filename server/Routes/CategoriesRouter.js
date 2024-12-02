import express from "express";
import { getCategories, createCategory, getYear, createYear, getCountries, createCountry } from "../Controllers/CategoryController.js";
import { protect, admin } from '../middlewares/Auth.js';
import { get } from "mongoose";

const router = express.Router();

router.get("/genres", getCategories);
router.post("/genres", protect, admin, createCategory);
router.get("/years", getYear);
router.post("/years", protect, admin, createYear);
router.get("/countries", getCountries);
router.post("/countries", protect, admin, createCountry);
export default router;