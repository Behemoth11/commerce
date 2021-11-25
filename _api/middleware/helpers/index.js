
export const createHandler = (...args) => {
  const current_middleware = args.shift();

  if (args.length == 0)
    return async (req, res) => {
      await current_middleware(req, res);
    };

  return async (req, res) => {
    await current_middleware(req, res, createHandler(...args));
  };
};

export const createCustomMiddlewareChain = (...args) => {
  return handler => createHandler(...args, handler)
}