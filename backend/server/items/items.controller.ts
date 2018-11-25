import * as express from "express";
import {authorize} from "../config";

const router = express.Router();

router.route("/").get(authorize, async (request, response) => {
    const tDevices: App.IDevice[] = [];
    tDevices.push({
        id: "dev1",
        host: "1.2.3.4",
        login: null,
        password: null,
        ver: 3,
        token: "abcde",
    });
    return response.status(200).json(tDevices);
});

export default router;
