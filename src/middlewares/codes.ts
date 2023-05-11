class Codes {
    ok = (): number => 200;
    created = (): number => 201;
    conflict = (): number => 409;
    error = (): number => 400;
    unauthorizedError = (): number => 401;
    notFound = (): number => 404;
}
  
export default Codes;