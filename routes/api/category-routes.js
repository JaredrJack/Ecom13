const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include:[Product]
  }).then(data => {
    res.json(data)
  })
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const allcategoryData = await Category.findByPk(req.params.id,{
       include: [{ model: Product}],
    });
    res.status(200).json(allcategoryData);

    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/',async (req, res) => {
  // create a new category
  try {
    const createnewCategory = await Category.create(req.body);
    res.status(200).json(createnewCategory);
  } catch (err) {
    res.status(400).json(err);
  };
});


router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    const data = await Category.update( {
      category_name: req.body.category_name
    }, {
      where: {
      id: req.params.id
    }})
    if(!data) {
      res.status(404).json({ message: "Category not found!"})
    }
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const data = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if(!data) {
      res.status(404).json({ message: "Category with given ID not found!"})
      return
    }
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});


module.exports = router;