// POST /api/jobs/import-linkedin
router.post('/import-linkedin', async (req, res) => {
  const { url } = req.body;

  // TODO: Implement real LinkedIn scraping here.
  // For now, return dummy data if URL looks like LinkedIn job URL

  if (!url || !url.includes('linkedin.com/jobs/view')) {
    return res.status(400).json({ error: 'Invalid LinkedIn job URL' });
  }

  // Dummy response
  const jobData = {
    title: 'Senior React Developer',
    company: 'Meta',
    location: 'Remote',
    description: 'Build and maintain web applications using React and Redux.',
    experienceRequired: '3+ years',
    applicationCap: 50,
  };

  res.json(jobData);
});
