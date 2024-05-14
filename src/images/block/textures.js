import { NearestFilter, RepeatWrapping, TextureLoader } from "three";
import {
  diamond_block,
  glass,
  grass_block_side,
  grass_block_top,
  oak_log_top,
  oak_log,
  quartz,
  stone,
  leaves,
  wood, grass_block_top1
} from "./images";

const diamond_block_texture = new TextureLoader().load(diamond_block);
const glass_texture = new TextureLoader().load(glass);
const grass_block_side_texture = new TextureLoader().load(grass_block_side);
const grass_block_top_texture = new TextureLoader().load(grass_block_top);
const oak_log_top_texture = new TextureLoader().load(oak_log_top);
const oak_log_texture = new TextureLoader().load(oak_log);
const quartz_texture = new TextureLoader().load(quartz);
const stone_texture = new TextureLoader().load(stone);
const leaves_texture = new TextureLoader().load(leaves);
const wood_texture = new TextureLoader().load(wood);
const groundTexture = new TextureLoader().load(grass_block_top1);

diamond_block_texture.magFilter = NearestFilter;
glass_texture.magFilter = NearestFilter;
grass_block_side_texture.magFilter = NearestFilter;
grass_block_top_texture.magFilter = NearestFilter;
oak_log_top_texture.magFilter = NearestFilter;
oak_log_texture.magFilter = NearestFilter;
quartz_texture.magFilter = NearestFilter;
stone_texture.magFilter = NearestFilter;
leaves_texture.magFilter = NearestFilter;
wood_texture.magFilter = NearestFilter;
groundTexture.magFilter = NearestFilter;
groundTexture.wrapS = RepeatWrapping;
groundTexture.wrapT = RepeatWrapping;
groundTexture.repeat.set(100, 100);

export {
  diamond_block_texture,
  glass_texture,
  grass_block_side_texture,
  grass_block_top_texture,
  oak_log_top_texture,
  oak_log_texture,
  quartz_texture,
  stone_texture,
  leaves_texture,
  groundTexture,
  wood_texture,
};
