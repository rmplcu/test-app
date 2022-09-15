import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetCurrentUser = createParamDecorator(
    (data: string | undefined,
    context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        if(!data) return request.user;
        return request.user['data'];
    }
)

export const GetCurrentUserId = createParamDecorator((data: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    return request.user['sub']
})

export const GetCurrentUserRefreshToken = createParamDecorator((data: undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user['refresh_token'];
})