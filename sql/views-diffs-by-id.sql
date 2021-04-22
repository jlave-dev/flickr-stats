SELECT
photo_id,
sampled_date,
total_views,
total_views - LAG(total_views) OVER (ORDER BY sampled_date) AS views_difference
FROM 
(
	SELECT
	DATE(sampled) as sampled_date,
	SUM(views) as total_views,
    photo_id
	FROM photo_samples
    WHERE photo_id = '51124616241'
	GROUP BY sampled_date
	ORDER BY sampled_date DESC
) AS x
ORDER BY sampled_date DESC