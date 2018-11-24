import * as jwt from "express-jwt";

// A-ha! So this is where the AUTH_SHARED_SECRET from .env is used!
export const authorize = jwt({
        secret: process.env.AUTH_SHARED_SECRET || "cd0684e6eb1bf07861da6292e872c1f673d012a51cf2b265",
    })
;
