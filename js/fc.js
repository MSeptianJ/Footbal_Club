document.addEventListener("DOMContentLoaded", () => {
    let urlParams = new URLSearchParams(window.location.search);
    let isFromBookmark = urlParams.has("bookmarked");

    const bookmarkBtn = document.getElementById("bookmark-btn");

    if (isFromBookmark) {
        bookmarkBtn.style.display = "none";
        getBookmarkTeamListById();
    } else {
        let item = getTeamListById();

        bookmarkBtn.onclick = () => {
            item.then (bookmark => {

                dbAdd(bookmark)
                    .then( () =>{
                        bookmarkBtn.innerHTML = `
                            <i class="material-icons">bookmark</i>
                        `;
                        bookmarkBtn.classList.add("red");
                    });
            })
        }

    }
})