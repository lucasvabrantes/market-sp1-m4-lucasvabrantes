import { NextFunction, Request, Response } from "express";
import { market } from "./database";
import { Product } from "./interfaces";

export const ensureIdExists = (
    req: Request,
    res: Response,
    next: NextFunction
): void | Response => {
    const productIndex = market.findIndex(
        (product: Product): boolean => product.id === Number(req.params.id)
    );

    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found." });
    }

    res.locals.productIndex = productIndex;
    return next();
};

export const verifyEqualNameExists = (
    req: Request,
    res: Response,
    next: NextFunction
): void | Response => {
    const productNameExists: boolean = market.some(
        (product) => product.name === req.body.name
    );

    if (productNameExists) {
        return res.status(409).json({ message: "Product already registered." });
    }

    return next();
};
