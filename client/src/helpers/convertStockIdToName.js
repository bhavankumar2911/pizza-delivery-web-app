import inventory from "../inventory.json";

export default (category, id) => {
  let name;
  inventory[category].forEach((item) => {
    if (item.id == id) name = item.item;
  });
  return name;
};
