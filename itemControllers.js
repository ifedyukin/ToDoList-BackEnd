const ItemModel = require('./itemModel');

const createEvent = async (req, res, next) => {
  const { value } = req.body;
  let item;
  try {
    item = await ItemModel.create({ value });
  } catch ({ message }) {
    return next({
      status: 400,
      message,
    });
  }
  return res.json(item);
};

const getItems = async (req, res) => {
  const { search } = req.query;
  const { filter } = req.params;
  const query = {};

  switch (filter) {
    case 'active':
      query.isCompleted = false;
      break;
    case 'completed':
      query.isCompleted = true;
      break;
    case 'all':
    default:
      break;
  }

  if (search) {
    query.value = new RegExp(search, 'ig');
  }

  const items = await ItemModel.find(query);
  res.json(items);
};

const completeAll = async (req, res, next) => {
  let items;
  try {
    const isUpdated = await ItemModel.updateMany({}, { isCompleted: true });
    if (isUpdated) {
      items = await ItemModel.find({});
    }
  } catch ({ message }) {
    return next({
      status: 400,
      message,
    });
  }
  return res.json(items);
};

const removeCompleted = async (req, res, next) => {
  let items;
  try {
    const isRemoved = await ItemModel.remove({ isCompleted: true });
    if (isRemoved) {
      items = await ItemModel.find({});
    }
  } catch ({ message }) {
    return next({
      status: 400,
      message,
    });
  }
  return res.json(items);
};

const deleteItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    return ItemModel.remove({ _id: id }).then(() => res.json(true));
  } catch ({ message }) {
    return next({
      status: 400,
      message,
    });
  }
};

const changeItem = async (req, res, next) => {
  const { id } = req.params;
  const { _id, ...itemData } = req.body;

  let item;
  try {
    item = await ItemModel.findOne({ _id: id });
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }

  if (!item) {
    return next({
      status: 404,
      message: 'Item not found!',
    });
  }

  try {
    const isUpdated = await ItemModel.findOneAndUpdate({ _id: id }, {
      ...item.toObject(),
      ...itemData,
    });
    if (isUpdated) {
      item = await ItemModel.findOne({ _id: id });
    }
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }

  return res.json(item);
};

module.exports = {
  getItems,
  deleteItem,
  changeItem,
  createEvent,
  completeAll,
  removeCompleted,
};
