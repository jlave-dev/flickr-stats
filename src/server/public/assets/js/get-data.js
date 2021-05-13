/* globals Chart */
async function getData(userId) {
    const res = await fetch(`/api/users/${userId}/stats`);
    const data = await res.json();
    if (data) {
        window._userStats = data.filter((sample) => sample.views > 0);
    }
}

function hydrateTotals() {
    const userStats = window._userStats;
    const mostRecent = userStats[0];
    const nextRecent = userStats[1];
    const labels = ['views', 'photos', 'followers'];
    const totals = {};
    const diffs = {};

    for (let label of labels) {
        totals[label] = mostRecent[label];
        diffs[label] = mostRecent[label] - nextRecent[label];

        const total = document.getElementById(`total-${label}`);
        const diff = document.getElementById(`total-${label}-diff`);
        const target = document.getElementById(`target-${label}`);
        const progressBar = document.getElementById(`progress-${label}`);

        const numericTarget = parseInt(target.innerText.replaceAll(',', ''), 10);
        const progressPercent = (totals[label] / numericTarget) * 100;

        total.innerText = totals[label].toLocaleString();
        diff.innerText = (diffs[label] >= 0 ? '+' : '') + diffs[label].toLocaleString();
        progressBar.style = `width:${progressPercent}%;height:6px;`;
    }
}

function plotTotals() {
    const data = window._userStats.slice(0, 7);
    const weeklyChart = new Chart(document.getElementById('weekly-chart'), {
        type: 'line',
        data: {
            // labels: data.map((sample) => sample.sampled),
            datasets: [
                {
                    label: 'Total views',
                    borderColor: '#1de9b6ff',
                    backgroundColor: '#1de9b600',
                    data: data.map((sample) => ({ t: sample.sampled.slice(0, 10), y: sample.views })),
                    tension: 0.25,
                },
            ],
        },
        options: {
            legend: {
                display: false,
            },
            scales: {
                xAxes: [
                    {
                        type: 'time',
                        time: {
                            unit: 'day',
                        },
                    },
                ],
            },
            responsive: true,
        },
    });
}

(async () => {
    await getData('187126842@N07');
    hydrateTotals();
    plotTotals();
})();
