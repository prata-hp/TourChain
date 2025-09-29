function validate(schema) {
  return async (req, res, next) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      req.body = parsed.body ?? req.body;
      req.params = parsed.params ?? req.params;
      req.query = parsed.query ?? req.query;
      next();
    } catch (err) {
      return res.status(400).json({ error: 'Validation failed', details: err.errors ?? String(err) });
    }
  };
}

module.exports = validate;
