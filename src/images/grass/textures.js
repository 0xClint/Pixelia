import { NearestFilter, TextureLoader } from "three";
import grass0 from "./grass0.png";
import grass1 from "./grass1.png";
import grass2 from "./grass2.png";
import grass3 from "./grass3.png";
import grass4 from "./grass4.png";
import grass5 from "./grass5.png";

const grass0Texture = new TextureLoader().load(grass0);
const grass1Texture = new TextureLoader().load(grass1);
const grass2Texture = new TextureLoader().load(grass2);
const grass3Texture = new TextureLoader().load(grass3);
const grass4Texture = new TextureLoader().load(grass4);
const grass5Texture = new TextureLoader().load(grass5);

grass0Texture.magFilter = NearestFilter;
grass1Texture.magFilter = NearestFilter;
grass2Texture.magFilter = NearestFilter;
grass3Texture.magFilter = NearestFilter;
grass4Texture.magFilter = NearestFilter;
grass5Texture.magFilter = NearestFilter;

export {
  grass0Texture,
  grass1Texture,
  grass2Texture,
  grass3Texture,
  grass4Texture,
  grass5Texture,
};
