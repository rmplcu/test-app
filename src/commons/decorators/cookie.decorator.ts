import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Cookie = createParamDecorator((data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.cookies;
    
    return request.cookies[data];
})