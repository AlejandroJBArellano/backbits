import { NextFunction, Request, Response } from "express";
import { appCheck } from "firebase-admin";

const verifyAppCheckToken = async (appCheckToken: string) => {
    if (!appCheckToken) {
        return null;
    }
    try {
        return appCheck().verifyToken(appCheckToken);
    } catch (err) {
        return null;
    }
};

export const appCheckVerification = async (req: Request, res: Response, next: NextFunction) => {
    const appCheckClaims = await verifyAppCheckToken(req.header("X-Firebase-AppCheck") || '')

    console.log("appCheckToken", appCheckClaims?.token)

    if(!appCheckClaims){
        res.status(401)
        return next("Unauthorized")
    }
    next()
}
