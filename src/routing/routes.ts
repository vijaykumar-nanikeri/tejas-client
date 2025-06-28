enum WebPaths {
  SignIn = "/sign-in",
  AuthPath = "/auth",

  Home = "/",
  Petition = "/petition",
}

const loginPath = `${WebPaths.AuthPath}${WebPaths.SignIn}`;

export { WebPaths, loginPath };
