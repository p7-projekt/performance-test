import { check } from 'k6';
import http from 'k6/http';
import { generateSetup } from "../util/setup.js";

export default function () {
console.log(JSON.stringify(generateSetup(200,2)));
}
