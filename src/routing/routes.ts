enum WebPaths {
  SignIn = "/sign-in",
  AuthPath = "/auth",

  Home = "/",
}

const loginPath = `${WebPaths.AuthPath}${WebPaths.SignIn}`;

export { WebPaths, loginPath };
