const addDemoHeaders = (req, res, next) => {
    res.setHeader('X-Demo-Page', 'true');
    res.setHeader('X-Middleware-demo', 'This is a middleware demo header');

    next();
};

export { addDemoHeaders };