
export const createHandler = (...args) => {
  const current_middleware = args.shift();

  if (args.length == 0)
    return (req, res) => {
      current_middleware(req, res);
    };

  return (req, res) => {
    current_middleware(req, res, createHandler(...args));
  };
};

export const createCustomMiddlewareChain = (...args) => {
  return handler => createHandler(...args, handler)
}