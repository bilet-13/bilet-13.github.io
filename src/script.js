function navigateTo(page) {
    window.location.href = page;
}

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("projects.html")) {
        fetchGitHubRepos();
    }
});

function fetchGitHubRepos() {
    fetch("https://api.github.com/users/bilet-13/repos")
        .then(response => response.json())
        .then(data => {
            const reposDiv = document.getElementById("github-repos");

            // Filter repos with more than 0 stars and sort them by stars in descending order
            const filteredRepos = data.filter(repo => repo.stargazers_count > 0)
                                    .sort((a, b) => b.stargazers_count - a.stargazers_count);

            filteredRepos.forEach(repo => {
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
