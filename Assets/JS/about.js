// Animated Counters for Stats Section
document.addEventListener("DOMContentLoaded", () => {
    const statCards = document.querySelectorAll(".stat-card h3");

    const animateCounters = () => {
        statCards.forEach((counter) => {
            const target = +counter.getAttribute("data-target");
            let count = 0;
            const speed = target / 50; // Controls animation duration

            const updateCount = () => {
                count += Math.ceil(speed);
                if (count < target) {
                    counter.innerText = count.toLocaleString() + (target === 99 ? "%" : "+");
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target.toLocaleString() + (target === 99 ? "%" : "+");
                }
            };

            updateCount();
        });
    };

    animateCounters();
});