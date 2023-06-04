const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include:[Product]
  }).then(data => {
    res.json(data)
  })
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const data = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    if(!data) {
      res.status(404).json({ message: "Tag with given ID not found!"})
    }
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const data = await Tag.create(req.body)
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update({
        tag_name: req.body.tag_name,
    }, {
        where: {
            id: req.params.id
        },
    });

    res.status(200).json(updateTag);
} catch (err) {
    res.status(500).json(err);
}
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const data = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if(!data) {
      res.status(404).json({ message: "Tag with given ID not found!!"})
    }
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;