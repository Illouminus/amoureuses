const { Carte, Category } = require('../../db/models');
const CarteMNG = require('../../models/Carte');
const CategoryMNG = require('../../models/Category');

// const initialValues = async (req, res) => {
//   const findResulutCategory = await Category.findAll();
//   const findResultCarte = await Carte.findAll();
//   res.send([findResulutCategory, findResultCarte]);
// };
const initialValues = async (req, res) => {
  const findResulutCategory = await CategoryMNG.find({});
  const findResultCarte = await CarteMNG.find({});
  res.send([findResulutCategory, findResultCarte]);
};
// const addArticle = async (req, res) => {
//   const {
//     category, name, description, price, origin,
//   } = req.body;
//   const uperName = name.charAt(0).toUpperCase() + name.slice(1);
//   const uperCategory = category.charAt(0).toUpperCase() + category.slice(1);
//   const id = req.body.id ? req.body.id : 0;
//   try {
//     const writeType = await Category.findOrCreate({
//       where: { name: uperCategory },
//       raw: true,
//     });
//     const findMenuItem = await Carte.findOne({ where: id });
//     let article;
//     if (!findMenuItem) {
//       const createArticle = await Carte.create({
//         name: uperName, description, price, origin, category_id: writeType[0].id,
//       });
//       article = await Carte.findByPk(createArticle.id);
//     } else {
//       const updateArticle = await Carte.update(
//         {
//           name: uperName, description, price, origin, category_id: writeType[0].id,
//         },
//         {
//           where: { id },
//         },
//       );
//       article = await Carte.findByPk(id);
//     }
//     res.send({ menu: article, category: writeType });
//   } catch (error) {
//     console.log(error);
//   }
// };



// const addArticle = async (req, res) => {
//   const {
//     category, name, description, price, origin,
//   } = req.body;
//   const uperName = name.charAt(0).toUpperCase() + name.slice(1);
//   const uperCategory = category.charAt(0).toUpperCase() + category.slice(1);
//
//   try {
//     // Find or create the category
//     let categoryDoc = await CategoryMNG.findOne({ name: uperCategory });
//     if (!categoryDoc) {
//       categoryDoc = new CategoryMNG({ name: uperCategory });
//       await categoryDoc.save();
//     }
//
//     // Find the carte document by id if it exists, or create a new one
//     let carteDoc;
//     if (req.body.id) {
//       carteDoc = await CarteMNG.findById(req.body.id);
//     } else {
//       carteDoc = new CarteMNG();
//     }
//
//     // Update the carte document
//     carteDoc.name = uperName;
//     carteDoc.description = description;
//     carteDoc.price = price;
//     carteDoc.origin = origin;
//     carteDoc.category = categoryDoc._id;
//     await carteDoc.save();
//     console.log({ menu: carteDoc, category: categoryDoc });
//     res.send({ menu: carteDoc, category: categoryDoc });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const deleteArticle = async (req, res) => {
//   const { id } = req.body;
//   console.log(id);
//   try {
//     const findItem = await Carte.destroy({
//       where: { id },
//     });
//     res.send({ findItem });
//   } catch (error) {
//     console.log(error);
//   }
// };

const addArticle = async (req, res) => {
  console.log(req.body);
  const {
    category, name, description, price, origin
  } = req.body;
  console.log(req.body)
  const uperName = name.charAt(0).toUpperCase() + name.slice(1);
  const uperCategory = category.charAt(0).toUpperCase() + category.slice(1);

  try {
    // Find or create the category
    let categoryDoc = await CategoryMNG.findOne({ name: uperCategory });
    if (!categoryDoc) {
      categoryDoc = new CategoryMNG({ name: uperCategory });
      await categoryDoc.save();
    }

    // Find the carte document by id if it exists, or create a new one
    let carteDoc;
    if (req.body.id) {
      carteDoc = await CarteMNG.findById(req.body.id);
      if (!carteDoc) {
        carteDoc = new CarteMNG();
      }
    } else {
      carteDoc = new CarteMNG();
    }

    // Update the carte document
    carteDoc.name = uperName;
    carteDoc.description = description;
    carteDoc.price = price;
    carteDoc.origin = origin;
    carteDoc.category = categoryDoc._id;
    await carteDoc.save();
    console.log({ menu: carteDoc, category: categoryDoc });
    res.send({ menu: carteDoc, category: categoryDoc });
  } catch (error) {
    console.log(error);
  }
};


const deleteArticle = async (req, res) => {
  const { id } = req.body;
  try {
    const findItem = await CarteMNG.deleteOne({ _id: id });
    res.send({ findItem });
  } catch (error) {
    console.log(error);
  }
};
// const deleteCat = async (req, res) => {
//   const { idCategory } = req.body;
//   try {
//     const findItem = await Category.destroy({
//       where: { id: idCategory },
//     });
//     res.send({ findItem });
//   } catch (error) {
//     console.log(error);
//   }
// };
const deleteCat = async (req, res) => {
  const { id } = req.body;
  console.log('ID CATEGORY', id);
  try {
    const findItem = await CategoryMNG.deleteOne({ _id: id });
    res.send({ findItem });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addArticle, initialValues, deleteArticle, deleteCat,
};
