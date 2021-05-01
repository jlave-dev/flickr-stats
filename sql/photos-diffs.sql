SELECT
sampled_date,
total_photos,
total_photos - LAG(total_photos) OVER (ORDER BY sampled_date) AS views_difference
FROM 
(
	SELECT
	DATE(sampled) as sampled_date,
	COUNT(*) as total_photos
	FROM photo_samples
	GROUP BY sampled_date
	ORDER BY sampled_date DESC
) AS x
ORDER BY sampled_date DESC