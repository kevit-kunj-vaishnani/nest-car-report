/* eslint-disable prettier/prettier */
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto:any){}
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        
        
        // this is running before the handler [ - before return ]

        return handler.handle().pipe (
            map((data: any) => {               
                // this is running before response is sent out  [ - in return ]

                return plainToInstance(this.dto, data,  {
                    excludeExtraneousValues: true,                  // this is to specify that this will only return property which is @Expose() in user.dto in postman response.
                })
            })
        )
    }
}

// written in book refer that