class Messages {
    ok = (): string => "Ok";
    success = (): string => "Success";
    welcomeMessage = (): string => "Welcome to Home Page";
    pageNotFound = (): string => "Page Not Found";
    created = (): string => "Created";
    updated = (): string => "Updated";
    deleted = (): string => "Deleted";
    error = (): string => "Error";
    validationError = (): string => "Error Validation";
    loginMessage = (): string => "Invalid Credentials";
    unauthorizedMessage = (): string => "Unauthorized Access";
    registerMessage = (): string => "User Exists";
    notFound = (): string => "Not Found";
}
  
export default Messages;