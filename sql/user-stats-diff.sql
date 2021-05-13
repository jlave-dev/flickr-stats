SELECT
sampled_date,
total_views,
total_views - LAG(total_views) OVER (ORDER BY sampled_date) AS views_difference
FROM 
(
	SELECT
	DATE(sampled) as sampled_date,
	SUM(views) as total_views
	FROM photo_samples
	GROUP BY sampled_date
	ORDER BY sampled_date DESC
) AS x
ORDER BY sampled_date DESC