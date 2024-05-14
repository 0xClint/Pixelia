import { NearestFilter, TextureLoader } from "three";
import grass1 from "./grass1.png";
import grass2 from "./grass2.png";
import grass3 from "./grass3.png";
import grass4 from "./grass4.png";
import grass5 from "./grass5.png";
import grass6 from "./grass6.png";
import flower1 from "./flower1.png";
import flower2 from "./flower2.png";
import flower3 from "./flower3.png";
import flower4 from "./flower4.png";
import flower5 from "./flower5.png";
import flower6 from "./flower6.png";

const grass1Texture = new TextureLoader().load(grass1);
const grass2Texture = new TextureLoader().load(grass2);
const grass3Texture = new TextureLoader().load(grass3);
const grass4Texture = new TextureLoader().load(grass4);
const grass5Texture = new TextureLoader().load(grass5);
const grass6Texture = new TextureLoader().load(grass6);
const flower1Texture = new TextureLoader().load(flower1);
const flower2Texture = new TextureLoader().load(flower2);
const flower3Texture = new TextureLoader().load(flower3);
const flower4Texture = new TextureLoader().load(flower4);
const flower5Texture = new TextureLoader().load(flower5);
const flower6Texture = new TextureLoader().load(flower6);

grass1Texture.magFilter = NearestFilter;
grass2Texture.magFilter = NearestFilter;
grass3Texture.magFilter = NearestFilter;
grass4Texture.magFilter = NearestFilter;
grass5Texture.magFilter = NearestFilter;
grass6Texture.magFilter = NearestFilter;
flower1Texture.magFilter = NearestFilter;
flower2Texture.magFilter = NearestFilter;
flower3Texture.magFilter = NearestFilter;
flower4Texture.magFilter = NearestFilter;
flower5Texture.magFilter = NearestFilter;
flower6Texture.magFilter = NearestFilter;

export {
  grass1Texture,
  grass2Texture,
  grass3Texture,
  grass4Texture,
  grass5Texture,
  grass6Texture,
  flower1Texture,
  flower2Texture,
  flower3Texture,
  flower4Texture,
  flower5Texture,
  flower6Texture,

};
