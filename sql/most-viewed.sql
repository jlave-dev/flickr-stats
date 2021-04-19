SELECT *
FROM
(
	SELECT
	DISTINCT ON (photo_samples.photo_id) photo_id,
	title,
	views,
	faves,
	comments,
	url_sq
	FROM photo_samples
	JOIN photos ON photos.id = photo_samples.photo_id
	ORDER BY photo_id, sampled DESC
) AS samples
ORDER BY views DESC
