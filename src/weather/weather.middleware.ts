import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class WeatherMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { lat, long, date } = req.query;
    if (lat && long && date) {
      const parsedDate = Date.parse(req.query.date.toString());
      if (!isNaN(+lat) && !isNaN(+long) && !isNaN(parsedDate)) {
        const currentDate = new Date();
        const dateLimit = new Date(
          currentDate.setDate(currentDate.getDate() + 7),
        );
        if (
          parsedDate >= new Date().getTime() &&
          parsedDate <= dateLimit.getTime()
        ) {
          next();
        } else {
          res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: 'Date must be within next 7 days.' });
        }
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Invalid parameter value.' });
      }
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Please send latitude, longitude and Date in the request.',
      });
    }
  }
}
