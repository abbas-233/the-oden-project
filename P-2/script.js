// ===== Dashboard Core Module =====
const Dashboard = (() => {
  // State Management
  let state = {
    projects: [],
    announcements: [],
    trending: [],
    user: null,
    notifications: [],
    searchQuery: '',
    activeTab: 'home'
  };

  // DOM Cache
  const DOM = {
    projectGrid: document.querySelector('.project-grid'),
    announcementContainer: document.querySelector('.announcement-card'),
    trendingList: document.querySelector('.trending-list'),
    searchInput: document.querySelector('#searchInput'),
    headerActions: document.querySelector('.header-actions'),
    navLinks: document.querySelectorAll('.nav-link')
  };

  // ===== API Service =====
  const API = {
    async fetchData(endpoint) {
      try {
        const response = await fetch(`/api/${endpoint}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        this.showError(error);
        return null;
      }
    },

    async postData(endpoint, data) {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
      return this.fetchData(endpoint, options);
    }
  };

  // ===== Template Engine =====
  const Templates = {
    projectCard(project) {
      return `
        <article class="project-card" data-id="${project.id}">
          <div class="card-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
          </div>
          <div class="card-actions">
            <button class="icon-btn" aria-label="Favorite" data-action="favorite">
              <span class="material-icons">${project.isFavorite ? 'star' : 'star_border'}</span>
            </button>
            <button class="icon-btn" aria-label="View" data-action="view">
              <span class="material-icons">visibility</span>
            </button>
            <button class="icon-btn" aria-label="Share" data-action="share">
              <span class="material-icons">share</span>
            </button>
          </div>
        </article>
      `;
    },

    announcementItem(announcement) {
      return `
        <article class="announcement-item">
          <h4>${announcement.title}</h4>
          <p>${announcement.content}</p>
          <time datetime="${announcement.date}">${new Date(announcement.date).toLocaleDateString()}</time>
        </article>
      `;
    }
  };

  // ===== State Management System =====
  const StateManager = {
    updateState(newState) {
      state = { ...state, ...newState };
      this.notifyStateChange();
    },

    notifyStateChange() {
      Renderer.updateProjects();
      Renderer.updateAnnouncements();
      Renderer.updateTrending();
    }
  };

  // ===== Rendering System =====
  const Renderer = {
    updateProjects() {
      const filteredProjects = state.projects.filter(project =>
        project.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
      
      DOM.projectGrid.innerHTML = filteredProjects
        .map(Templates.projectCard)
        .join('');
    },

    updateAnnouncements() {
      DOM.announcementContainer.innerHTML = state.announcements
        .map(Templates.announcementItem)
        .join('<hr class="divider">');
    },

    updateTrending() {
      DOM.trendingList.innerHTML = state.trending
        .map(user => `
          <article class="trending-item">
            <img src="${user.avatar}" alt="${user.handle}" class="avatar-sm">
            <div class="user-info">
              <h4>${user.handle}</h4>
              <p>${user.bio}</p>
            </div>
          </article>
        `).join('');
    }
  };

  // ===== Event Handlers =====
  const Handlers = {
    handleSearch: debounce(async (e) => {
      const query = e.target.value;
      StateManager.updateState({ searchQuery: query });
    }, 300),

    handleProjectAction(e) {
      const card = e.target.closest('.project-card');
      if (!card) return;

      const projectId = card.dataset.id;
      const action = e.target.closest('[data-action]')?.dataset.action;

      switch(action) {
        case 'favorite':
          StateManager.updateState({
            projects: state.projects.map(proj =>
              proj.id === projectId 
                ? { ...proj, isFavorite: !proj.isFavorite }
                : proj
            )
          });
          break;
        
        case 'share':
          this.showShareDialog(projectId);
          break;
      }
    },

    handleNavClick(e) {
      e.preventDefault();
      const tab = e.currentTarget.dataset.tab;
      StateManager.updateState({ activeTab: tab });
      this.updateActiveNav(tab);
    }
  };

  // ===== Real-Time System =====
  const RealTime = {
    initSSE() {
      const eventSource = new EventSource('/api/updates');
      
      eventSource.addEventListener('projectUpdate', (e) => {
        const updatedProject = JSON.parse(e.data);
        StateManager.updateState({
          projects: state.projects.map(proj =>
            proj.id === updatedProject.id ? updatedProject : proj
          )
        });
      });

      eventSource.addEventListener('announcement', (e) => {
        const newAnnouncement = JSON.parse(e.data);
        StateManager.updateState({
          announcements: [newAnnouncement, ...state.announcements]
        });
      });
    }
  };

  // ===== Initialization =====
  const init = async () => {
    // Load initial data
    const [projects, announcements, trending] = await Promise.all([
      API.fetchData('projects'),
      API.fetchData('announcements'),
      API.fetchData('trending')
    ]);

    StateManager.updateState({ projects, announcements, trending });

    // Event Listeners
    DOM.searchInput.addEventListener('input', Handlers.handleSearch);
    DOM.projectGrid.addEventListener('click', Handlers.handleProjectAction);
    DOM.navLinks.forEach(link => 
      link.addEventListener('click', Handlers.handleNavClick)
    );

    // Real-Time Features
    RealTime.initSSE();
    this.initServiceWorker();
  };

  // ===== Progressive Web App Features =====
  const initServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW registered:', reg))
        .catch(err => console.log('SW registration failed:', err));
    }
  };

  // Public API
  return { init };
})();

// ===== Startup Sequence =====
document.addEventListener('DOMContentLoaded', () => {
  Dashboard.init();
  
  // Performance Monitoring
  const perfObserver = new PerformanceObserver(list => {
    const longTasks = list.getEntries().filter(entry => entry.duration > 50);
    if (longTasks.length > 0) console.warn('Long tasks detected:', longTasks);
  });
  perfObserver.observe({ entryTypes: ['longtask'] });
});

// ===== Utility Functions =====
function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

function createNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('hide');
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}