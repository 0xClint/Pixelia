import { nanoid } from "nanoid";
import fs from "fs";

const generate = (arg) => {
  let data = [];
  // let arg = [
  //   [1, 1],
  //   [10, 10],
  //   [26, 26],
  //   [30, 30],
  //   [40, 40],
  //   [-25, -25],
  //   [-30, -30],
  // ];
  let t = arg.length;

  while (t--) {
    let ox = arg[t][0];
    let oz = arg[t][1];

    for (let i = 0; i <= 3; i++) {
      data.push({
        key: nanoid(),
        pos: [ox, i, oz],
        texture: "log",
      });
    }
    let ex = 3;
    let ez = 3;
    for (let y = 4; y < 10; y++) {
      for (let x = ox - ex + 1; x < ox + ex; x++) {
        for (let z = oz - ez + 1; z < oz + ez; z++) {
          data.push({
            key: nanoid(),
            pos: [x, y, z],
            texture: "leaves",
          });
        }
      }
      ex = ex - 1 / 2;
      ez = ez - 1 / 2;
    }
    console.log(data);
  }

  const jsonString = JSON.stringify(data, null, 2);
  const filePath = "data.json";
  fs.writeFile(filePath, jsonString, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("JSON data saved to", filePath);
    }
  });
};
// generate();

const randomcor = (numCoordinates, gap) => {
  const coordinates = [];
  const gridSize = 25; // Represents the grid size of -25 to 25

  if (numCoordinates <= 1) {
    console.error("Number of coordinates must be greater than 1.");
    return coordinates;
  }

  if (gap <= 0) {
    console.error("Gap must be a positive number.");
    return coordinates;
  }

  for (let i = 0; i < numCoordinates; i++) {
    const x = -gridSize + i * gap;

    if (x > gridSize) {
      console.warn("Generated coordinates exceed the grid range.");
      break;
    }

    for (let j = 0; j < numCoordinates; j++) {
      const y = -gridSize + j * gap;

      if (y > gridSize) {
        console.warn("Generated coordinates exceed the grid range.");
        break;
      }

      coordinates.push([x, y]);
    }
  }
  console.log(coordinates);

  return coordinates;
};

const getflowers = (numCoordinates) => {
  const coordinates = [];
  const gridSize = 25;

  function getRandomCoordinate(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  for (let i = 0; i < numCoordinates; i++) {
    const x = getRandomCoordinate(-gridSize, gridSize);
    const z = getRandomCoordinate(-gridSize, gridSize);
    coordinates.push({
      key: nanoid(),
      pos: [x, 0, z],
      texture: (Math.random() * 5).toFixed(),
    });
  }
  console.log(coordinates);

  const jsonString = JSON.stringify(coordinates, null, 2);
  const filePath = "data.json";
  fs.writeFile(filePath, jsonString, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("JSON data saved to", filePath);
    }
  });
};

async function main() {
  // const args = await randomcor(5, 20);
  // generate(args);

  getflowers(25);
}
main();
