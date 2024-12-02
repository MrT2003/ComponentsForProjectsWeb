//error handling middleware
export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    console.log(`${statusCode} Error: Route ${req.originalUrl} not found`);
    res.json({
        messageee: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};