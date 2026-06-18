import { getProvinces, getDistricts, getSubdistricts } from './app/utils/thaiAddress.js';

console.time('Load Provinces');
const p = getProvinces();
console.timeEnd('Load Provinces');
console.log('Provinces:', p.length);

console.time('Load Districts');
const d = getDistricts('กรุงเทพมหานคร');
console.timeEnd('Load Districts');
console.log('Districts:', d.length);

console.time('Load Subdistricts');
const s = getSubdistricts('กรุงเทพมหานคร', 'เขตพระนคร');
console.timeEnd('Load Subdistricts');
console.log('Subdistricts:', s.length);
