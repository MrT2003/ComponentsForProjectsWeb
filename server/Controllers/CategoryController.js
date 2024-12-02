import asyncHandler from "express-async-handler";
import { Year, Category, Country }  from "../Models/CategoriesModel.js";

export const getCategories = asyncHandler(async (req, res) => {

    const categories = await Category.find({});
    if (!categories || categories.length === 0) {
        res.status(404).json({ message: "No categories found" });
    } else {
        res.json(categories);
    }
});

export const createCategory = asyncHandler(async (req, res) => {
    const { _id, name, slug } = req.body;

    const categoryExists = await Category.findOne({ slug });
    if (categoryExists) {
        res.status(400).json({ message: "Category already exists"});
    } else {
        const newCategory = await Category.create({ _id, name, slug });
        res.status(201).json(newCategory);
    }
});

export const getYear = asyncHandler(async (req, res) => {
    const years = await Year.find({});
    if (!years || years.length === 0) {
        res.status(404).json({ message: "No years found" });
    } else {
        res.json(years);
    }
});

export const createYear = asyncHandler(async (req, res) => {
    const { _id, year } = req.body;

    const yearExists = await Year.findOne({ year });
    if (yearExists) {
        res.status(400).json({ message: "Year already exists"});
    } else {
        const newYear = await Year.create({ _id, year });
        res.status(201).json(newYear);
    }
});

export const getCountries = asyncHandler(async (req, res) => {
    const countries = await Country.find({});
    if (!countries || countries.length === 0) {
        res.status(404).json({ message: "No countries found" });
    } else {
        res.json(countries);
    }
});

export const createCountry = asyncHandler(async (req, res) => {
    const { _id, name, slug } = req.body;

    const countryExists = await Country.findOne({slug});

    if (countryExists) {
        res.status(400).json({ message: "Country already exists"});
    } else {
        const newCountry = await Country.create({ _id, name, slug });
        res.status(201).json(newCountry);
    }
});