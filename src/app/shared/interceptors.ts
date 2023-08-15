import { HttpHandlerFn, HttpRequest } from "@angular/common/http";

export const loggerInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  console.log(`Request : ${req.url}`)
  return next(req);
}
