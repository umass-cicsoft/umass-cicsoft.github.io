
fetch('./assets/json/board_members.json')
    .then(response => response.json())
    .then(data => {
        const div = document.getElementsByClassName("team-members")[0];
        div.innerHTML = data.map(member_info => `
            <div class="card text-white bg-transparent border-0 m-2 p-3 rounded-3" style="width: 21rem">
                <picture>
                    <img src="${member_info.img}" class="card-img-top rounded-circle" alt="${member_info.name}" />
                </picture>
                <div class="card-body text-center">
                    <h4 class="card-title">${member_info.name}</h4>
                    <h5 class="card-text">${member_info.role}</h5>
                    <a href="https://www.linkedin.com/in/${member_info.socials.linkedin}" target="_blank"><img class="team-social-icon" src="./assets/svg/LinkedIn.svg" alt="LinkedIn" /></a>
                    <a href="https://github.com/${member_info.socials.github}" target="_blank"><img class="team-social-icon" src="./assets/svg/GitHub.svg" alt="GitHub" /></a>
                </div>
            </div>`).join('');
    })
    .catch(error => console.error('Error fetching JSON:', error));
