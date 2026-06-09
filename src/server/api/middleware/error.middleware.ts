import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import logger from '../config/logger';

export class ValidationError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.warn('Validation error', error.errors);
        res.status(400).json({
          error: 'Validation failed',
          details: error.errors,
        });
      } else {
        next(error);
      }
    }
  };
};

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Request error', error);

  if (error instanceof ValidationError) {
    res.status(error.statusCode).json({
      error: error.message,
    });
  } else if (error instanceof z.ZodError) {
    res.status(400).json({
      error: 'Validation failed',
      details: error.errors,
    });
  } else {
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
};

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
