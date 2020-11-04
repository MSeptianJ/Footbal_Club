let base_Url = "https://api.football-data.org/v2/";
let id_league = "2014";
let headers = {
    "X-Auth-Token": "0150e3eee5954aeabf847f9ca34f91f3"
};

// Fetch ingredients
// =================
const status = response => {
    if (response.status !== 200) {
        console.log(`Error : ${response.status}`)
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

const json = response => {
    return response.json();
}

const error = error => {
    console.log(`Error : ${error}`);
}
// =================

// Gif loading img
const loading = document.getElementById("loading_gif");


// API functions
// =============
// for index.html
const getTeamList = () => {
    loading.setAttribute("class", "hide");

    if ("caches" in window) {
        caches
            .match(`${base_Url}competitions/${id_league}/teams`)
            .then(response => {
                if (response) {
                    response.json().then(data => {
                        let teamList = "";
                        data.teams.forEach(team => {
                            if (team !== null) {
                                teamList += `
                                    <div class="col s12 m6">
                                        <div class="card horizontal card-home no-padding">
                                            <div class="card-image img-home col s5">
                                                <a href="../fc.html?id=${team.id}">
                                                    <img src="${team.crestUrl.replace(/^http:\/\//i, "https://")}" class="responsive-img">
                                                </a>
                                            </div>
                                            <div class="card-stacked home-description center-align">
                                                <div class="home-title no-padding">
                                                    <h3 class="">${team.name}</h3>
                                                </div>
                                                <div class="card-content left-align">
                                                    <p class="">Venue : ${team.venue}</p>
                                                    <p class="">Founded : ${team.founded}</p>
                                                </div>
                                                <div class="card-action no-padding home-email">
                                                    <a href="../fc.html?id=${team.id}" class="blue-text">
                                                        See More
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }
                        });
                        document.getElementById("FC_list").innerHTML = teamList;
                    });
                }
            });
    }


    fetch(`${base_Url}competitions/${id_league}/teams`, {headers})
        .then(status)
        .then(json)
        .then(data => {
            let teamList = "";

            data.teams.forEach(team => {
                teamList += `
                    <div class="col s12 m6">
                        <div class="card horizontal card-home no-padding">
                            <div class="card-image img-home col s5">
                                <a href="../fc.html?id=${team.id}">
                                    <img src="${team.crestUrl.replace(/^http:\/\//i, "https://")}" class="responsive-img">
                                </a>
                            </div>
                            <div class="card-stacked home-description center-align">
                                <div class="home-title no-padding">
                                    <h3 class="">${team.name}</h3>
                                </div>
                                <div class="card-content left-align">
                                    <p class="">Venue : ${team.venue}</p>
                                    <p class="">Founded : ${team.founded}</p>
                                </div>
                                <div class="card-action no-padding home-email">
                                    <a href="../fc.html?id=${team.id}" class="blue-text">
                                        See More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            document.getElementById("FC_list").innerHTML = teamList;
        })
        .catch(error);
}


// for fc.html
const getTeamListById = () => {
    return new Promise( (resolve, reject) => {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");

        loading.setAttribute("class", "hide");

        if ("caches" in window) {
            caches.match(`${base_Url}teams/${idParam}`)
                .then(response => {
                    if (response) {
                        response.json().then(data => {
                            document.getElementById("body-content").innerHTML = `
                                <div class=" light-blue lighten-3 card col s12 background">
                                    <h2 class="center-align">${data.name}</h2>
                                    
                                    <div class="col s12 m4 l5 center-align fc-img">
                                        <img src="${data.crestUrl.replace(/^http:\/\//i, "https://")}" alt="Logo Club" class="center-block responsive-img z-depth-2">
                                    </div>                    
                                                                        
                                    <div class="col s12 m8 l7 fc-detail">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>Name :</th>    
                                                    <td>${data.name}</td>
                                                </tr>
                                                <tr>
                                                    <th>Short Name :</th>
                                                    <td>${data.shortName}</td>
                                                </tr>
                                                <tr>
                                                    <th>Address :</th>
                                                    <td>${data.address}</td>
                                                </tr>
                                                <tr>
                                                    <th>Email :</th>
                                                    <td>${data.email}</td>
                                                </tr>
                                                <tr>
                                                    <th>Country :</th>
                                                    <td>${data.area.name}</td>
                                                </tr>
                                                <tr>
                                                    <th>Venue :</th>
                                                    <td>${data.venue}</td>
                                                </tr>
                                                <tr>
                                                    <th>Founded :</th>
                                                    <td>${data.founded}</td>
                                                </tr>
                                                <tr>
                                                    <th>Website :</th>
                                                    <td>${data.website}</td>
                                                </tr>
                                                <tr>
                                                    <th>Phone Number :</th>
                                                    <td>${data.phone}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                    <div class="col s12">
                                        <h3>Member</h3>
                                        <table class="responsive-table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Date of Birth</th>
                                                    <th>Birth Place</th>
                                                    <th>Position</th>
                                                    <th>Role</th>
                                                </tr>
                                            </thead>
                                            
                                            <tbody>
                                                ${data.squad.map(squad => {
                                                    return `
                                                        <tr>
                                                            <td>${squad.name}</td>
                                                            <td>${squad.dateOfBirth.substring(0, 10)}</td>
                                                            <td>${squad.countryOfBirth}</td>
                                                            <td>${squad.position}</td>
                                                            <td>${squad.role}</td>
                                                        </tr>
                                                    `
                                                    }).join("")}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>                          
                            `;
                            resolve(data);
                            dbCheck(data.id)
                                .then(dbData => {
                                    if (dbData.id === data.id) {
                                        const bookmarkBtn = document.getElementById("bookmark-btn");
                                        bookmarkBtn.innerHTML = `
                                            <i class="material-icons">bookmark</i>
                                        `;
                                        bookmarkBtn.classList.add("red");
                                    }
                                })
                        });
                    }
                });
        }

        fetch(`${base_Url}teams/${idParam}`, {headers})
            .then(status)
            .then(json)
            .then(data => {
                document.getElementById("body-content").innerHTML = `
                    <div class=" light-blue lighten-3 card col s12 background">
                        <h2 class="center-align">${data.name}</h2>
                        
                        <div class="col s12 m4 l5 center-align fc-img">
                            <img src="${data.crestUrl.replace(/^http:\/\//i, "https://")}" alt="Logo Club" class="center-block responsive-img z-depth-2">
                        </div>                    
                                                            
                        <div class="col s12 m8 l7 fc-detail">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Name :</th>    
                                        <td>${data.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Short Name :</th>
                                        <td>${data.shortName}</td>
                                    </tr>
                                    <tr>
                                        <th>Address :</th>
                                        <td>${data.address}</td>
                                    </tr>
                                    <tr>
                                        <th>Email :</th>
                                        <td>${data.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Country :</th>
                                        <td>${data.area.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Venue :</th>
                                        <td>${data.venue}</td>
                                    </tr>
                                    <tr>
                                        <th>Founded :</th>
                                        <td>${data.founded}</td>
                                    </tr>
                                    <tr>
                                        <th>Website :</th>
                                        <td>${data.website}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone Number :</th>
                                        <td>${data.phone}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="col s12">
                            <h3>Member</h3>
                            <table class="responsive-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Date of Birth</th>
                                        <th>Birth Place</th>
                                        <th>Position</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    ${data.squad.map(squad => {
                                        return `
                                            <tr>
                                                <td>${squad.name}</td>
                                                <td>${squad.dateOfBirth.substring(0, 10)}</td>
                                                <td>${squad.countryOfBirth}</td>
                                                <td>${squad.position}</td>
                                                <td>${squad.role}</td>
                                            </tr>
                                        `
                                        }).join("")}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
                resolve(data);
                dbCheck(data.id)
                    .then(dbData => {
                        if (dbData.id === data.id) {
                            const bookmarkBtn = document.getElementById("bookmark-btn");
                            bookmarkBtn.innerHTML = `
                                            <i class="material-icons">bookmark</i>
                                        `;
                            bookmarkBtn.classList.add("red");
                        }
                    })
            });
    });
}

// for standing.html
const getStandings = () => {
    loading.setAttribute("class", "hide");

    if ("caches" in window) {
        caches
            .match(`${base_Url}competitions/${id_league}/standings?standingType=HOME`)
            .then(response => {
                if (response) {
                    response.json().then(data => {
                        let standingList = "";
                        data.standings.forEach(team => {
                            if (team !== null) {
                                standingList += `
                                     <div class="col s12">
                                        <table class="responsive-table">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Team</th>
                                                    <th>Won</th>
                                                    <th>Draw</th>
                                                    <th>Lost</th>
                                                    <th>Points</th>
                                                </tr>
                                            </thead>
                                            
                                            <tbody>
                                                ${data.standings.map(standing => {
                                                        return standing.table.map(res => {
                                                            return `
                                                        <tr>
                                                            <td class="standings-logo"><img src="${res.team.crestUrl}" alt="logo Club" class="responsive-img"></td>
                                                            <td>${res.team.name}</td>
                                                            <td>${res.won}</td>
                                                            <td>${res.draw}</td>
                                                            <td>${res.lost}</td>
                                                            <td>${res.points}</td>
                                                        </tr>
                                                    `
                                                        }).join("")
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>
                                `;
                            }
                        });
                        document.getElementById("standings").innerHTML = standingList;
                    });
                }
            });
    }


    fetch(`${base_Url}competitions/${id_league}/standings?standingType=HOME`, {headers})
        .then(status)
        .then(json)
        .then(data => {
            document.getElementById("standings").innerHTML = `
                <div class="col s12">
                    <table class="responsive-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Team</th>
                                <th>Won</th>
                                <th>Draw</th>
                                <th>Lost</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            ${data.standings.map(standing => {
                                return standing.table.map(res => {
                                    return `
                                        <tr>
                                            <td class="standings-logo"><img src="${res.team.crestUrl}" alt="logo Club" class="responsive-img"></td>
                                            <td>${res.team.name}</td>
                                            <td>${res.won}</td>
                                            <td>${res.draw}</td>
                                            <td>${res.lost}</td>
                                            <td>${res.points}</td>
                                        </tr>
                                    `
                                    }).join("")
                                })}
                        </tbody>
                    </table>
                </div>
            `;
        })
        .catch(error);
}

// for bookmark.html
const getBookmarkTeamList = () => {
    dbGetAll()
        .then(dbData => {
            let teamList = "";
            dbData.forEach(db => {
                teamList += `
                    <div class="col s12">
                        <div class="card horizontal card-home no-padding">
                            <div class="card-image img-home col s5">
                                <a href="../fc.html?id=${db.id}&bookmarked=true">
                                    <img src="${db.crestUrl.replace(/^http:\/\//i, "https://")}" class="responsive-img">
                                </a>
                            </div>
                            <div class="card-stacked home-description center-align">
                                <div class="home-title no-padding">
                                    <h3 class="">${db.name}</h3>
                                </div>
                                <div class="card-content left-align">
                                    <p class="">Venue : ${db.venue}</p>
                                    <p class="">Founded : ${db.founded}</p>
                                </div>
                                <div class="card-action no-padding home-email">
                                    <a href="../fc.html?id=${db.id}&bookmarked=true" class="blue-text">
                                        See More
                                    </a>
                                    <button class="btn red waves-effect waves-light lighten-1 bookmark-delete delete-btn" id="${db.id}">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            document.getElementById("bookmark").innerHTML = teamList;

            let deleteBtn = document.querySelectorAll(".delete-btn");
            for (let button of deleteBtn) {
                button.addEventListener("click", event => {
                    let id = event.target.id;
                    dbDelete(id)
                        .then( () => {
                            getBookmarkTeamList()
                        } )
                })
            }
        })
}

// for fc.html?id=
const getBookmarkTeamListById = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    dbGet(idParam)
        .then(dbData => {
            if (dbData !== null) {
                document.getElementById("body-content").innerHTML = `
                    <div class=" light-blue lighten-3 card col s12 background">
                        <h2 class="center-align">${dbData.name}</h2>
                        
                        <div class="col s12 m4 l5 center-align fc-img">
                            <img src="${dbData.crestUrl.replace(/^http:\/\//i, "https://")}" alt="Logo Club" class="center-block responsive-img z-depth-2">
                        </div>                    
                                                            
                        <div class="col s12 m8 l7 fc-detail">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Name :</th>    
                                        <td>${dbData.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Short Name :</th>
                                        <td>${dbData.shortName}</td>
                                    </tr>
                                    <tr>
                                        <th>Address :</th>
                                        <td>${dbData.address}</td>
                                    </tr>
                                    <tr>
                                        <th>Email :</th>
                                        <td>${dbData.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Country :</th>
                                        <td>${dbData.area.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Venue :</th>
                                        <td>${dbData.venue}</td>
                                    </tr>
                                    <tr>
                                        <th>Founded :</th>
                                        <td>${dbData.founded}</td>
                                    </tr>
                                    <tr>
                                        <th>Website :</th>
                                        <td>${dbData.website}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone Number :</th>
                                        <td>${dbData.phone}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="col s12">
                            <h3>Member</h3>
                            <table class="responsive-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Date of Birth</th>
                                        <th>Birth Place</th>
                                        <th>Position</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    ${dbData.squad.map(squad => {
                                        return `
                                            <tr>
                                                <td>${squad.name}</td>
                                                <td>${squad.dateOfBirth.substring(0, 10)}</td>
                                                <td>${squad.countryOfBirth}</td>
                                                <td>${squad.position}</td>
                                                <td>${squad.role}</td>
                                            </tr>
                                        `
                                        }).join("")}
                                </tbody>
                            </table>
                        </div>
                    </div>                          
                `;
            }
        })
}
// =============