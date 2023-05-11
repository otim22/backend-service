class Messages {
    ok = (): string => "Ok";
    success = (): string => "Success";
    welcomeMessage = (): string => "Welcome to Home Page";
    pageNotFound = (): string => "Page Not Found";
    created = (): string => "Created";
    updated = (): string => "Updated";
    deleted = (): string => "Deleted";
    error = (): string => "Error";
    loginMessage = (): string => "Invalid Credentials";
    unauthorizedMessage = (): string => "Unauthorized access";
    registerMessage = (): string => "User Exists";
    notFound = (): string => "Not found";
}
  
export default Messages;