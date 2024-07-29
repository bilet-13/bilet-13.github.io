function navigateTo(page) {
    window.location.href = page;
}

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("projects.html")) {
        fetchGitHubRepos();
    }
});

function fetchGitHubRepos() {
    fetch("https://api.github.com/users/YOUR_GITHUB_USERNAME/repos")
        .then(response => response.json())
        .then(data => {
            const reposDiv = document.getElementById("github-repos");
            data.forEach(repo => {
                const repoElement = document.createElement("p");
                repoElement.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
                reposDiv.appendChild(repoElement);
            });
        })
        .catch(error => console.error('Error fetching GitHub repos:', error));
}
