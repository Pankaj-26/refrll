exports.claimJob = async (req, res) => {
  try {
    // These come from the URL: ?title=…&url=…
    console.log('Incoming claim-job payload:', req.query);

    // For now, just echo them back so you can inspect in the browser/network tab
    return res.json({
      success: true,
      received: req.query
    });

    // Later you’d replace that with your real logic:
    // const { title, url } = req.query;
    // create or link a Job document, etc.

  } catch (err) {
    console.error('claimJob error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};