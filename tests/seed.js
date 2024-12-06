import { check } from 'k6';
import http from 'k6/http';
import { generateSetup } from "../util/setup.js";

export default function () {
generateSetup(10,1);
}
