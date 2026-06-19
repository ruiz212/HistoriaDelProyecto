

document.addEventListener('DOMContentLoaded', () => {
  // --- Intersection Observer for Animations ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.fade-in-up, .card, .feature-item, .pricing-card, .stat-card');
  
  animatedElements.forEach(el => {
    // Si no tiene la clase fade-in-up, se la añadimos para el efecto
    if (!el.classList.contains('fade-in-up')) {
      el.classList.add('fade-in-up');
    }
    observer.observe(el);
  });

  // Trigger initial visibility for elements in viewport right away (like hero)
  setTimeout(() => {
    const heroElements = document.querySelectorAll('.hero .fade-in-up');
    heroElements.forEach(el => el.classList.add('visible'));
  }, 100);

  // --- Financial Chart Setup ---
  const ctx = document.getElementById('financialChart');
  
  if (ctx) {
    // Data extracted from the Implementation Plan and User's Document
    const labels = ['Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5', 'Mes 6'];
    const ingresos = [11985, 12408, 12831, 22090, 22795, 23500];
    const costosVariablesYFijos = [11080, 11080, 11080, 18080, 18080, 18080];
    const flujosNetos = [905, 1328, 1751, 4010, 4715, 5420];

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Ingresos Totales (ITO)',
            data: ingresos,
            borderColor: '#66fcf1', // primary color
            backgroundColor: 'rgba(102, 252, 241, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          },
          {
            label: 'Costos (CVT + CFT)',
            data: costosVariablesYFijos,
            borderColor: '#ff6b6b', // red for costs
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderDash: [5, 5],
            tension: 0.4
          },
          {
            label: 'Flujo Neto',
            data: flujosNetos,
            type: 'bar',
            backgroundColor: '#4CAF50', // green for profit
            borderRadius: 5,
            barThickness: 10
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#c5c6c7',
              font: {
                family: "'Inter', sans-serif",
                size: 14
              }
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(5, 6, 8, 0.9)',
            titleColor: '#fff',
            bodyColor: '#c5c6c7',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            },
            ticks: {
              color: '#c5c6c7',
              callback: function(value) {
                return 'C$ ' + value;
              }
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            },
            ticks: {
              color: '#c5c6c7'
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    });
  }
});
