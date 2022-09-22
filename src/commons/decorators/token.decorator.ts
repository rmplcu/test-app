import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetToken = createParamDecorator((data: undefined, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return req.get('authorization').replace('Bearer', '').trim();
})