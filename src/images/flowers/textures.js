import { NearestFilter, TextureLoader } from "three";
import flower1 from "./flower1.png";
import flower2 from "./flower2.png";
import flower3 from "./flower3.png";
import flower4 from "./flower4.png";
import flower5 from "./flower5.png";
import flower6 from "./flower6.png";

const flower1Texture = new TextureLoader().load(flower1);
const flower2Texture = new TextureLoader().load(flower2);
const flower3Texture = new TextureLoader().load(flower3);
const flower4Texture = new TextureLoader().load(flower4);
const flower5Texture = new TextureLoader().load(flower5);
const flower6Texture = new TextureLoader().load(flower6);

flower1Texture.magFilter = NearestFilter;
flower2Texture.magFilter = NearestFilter;
flower3Texture.magFilter = NearestFilter;
flower4Texture.magFilter = NearestFilter;
flower5Texture.magFilter = NearestFilter;
flower6Texture.magFilter = NearestFilter;

export {
  flower1Texture,
  flower2Texture,
  flower3Texture,
  flower4Texture,
  flower5Texture,
  flower6Texture,
};
