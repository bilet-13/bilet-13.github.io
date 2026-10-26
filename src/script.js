// Repositories to show, in the order they should appear. Star count is not a
// useful signal at this scale, so the list is curated rather than filtered.
const FEATURED_REPOS = [
    "flash_sale_system",
    "Chainguard-mini_chainctl",
    "chatRoom",
    "ApplyPilot",
    "No_code_DNN"
];

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("projects.html")) {
        fetchGitHubRepos();
    }
});

function fetchGitHubRepos() {
    // per_page=100 so every repo comes back; the default 30 was cutting the list off
    fetch("https://api.github.com/users/bilet-13/repos?per_page=100&sort=updated")
        .then(response => response.json())
        .then(data => {
            const reposDiv = document.getElementById("github-repos");
            const byName = new Map(data.map(repo => [repo.name, repo]));

            const repos = FEATURED_REPOS
                .map(name => byName.get(name))
                .filter(Boolean);

            repos.forEach(repo => {
                const repoElement = document.createElement("div");
                repoElement.classList.add("repo-block");
                repoElement.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>
                                          <p class="repo-description">${repo.description || 'No description available.'}</p>
                                          <div class="repo-meta">
                                              <span><i class="fas fa-circle"></i> ${repo.language || 'N/A'}</span>
                                          </div>`;
                reposDiv.appendChild(repoElement);
            });
        })
        .catch(error => console.error('Error fetching GitHub repos:', error));
}
