// app.js : 영화 배열을 다루는 함수 6개 / 민윤희 / 11주차
// average : 영화 배열 ⇒ 평균 평점(숫자)

const average = list => {
    let sum = 0;
    for (const m of list) {
        sum += m.rating;
    }
    return sum / list.length;
}
console.log("평균:", average(movies));

const best = list => {
    let top = list[0];
    for (const m of list) {
        if (m.rating > top.rating) {
            top = m;
        }
    }
    return top;
}
console.log("최고:", best(movies).title);

const filterByRating = (list, min) => list.filter(m => m.rating >= min);
console.log("8점 이상:", filterByRating(movies, 8).length + "편");

const sortByRating = list => [...list].sort((a, b) => b.rating - a.rating);
const sorted = sortByRating(movies);
console.log("정렬 1위:", sorted[0].title, "\n원본 1번:", movies[0].title);

const yearsSince = dateStr => new Date().getFullYear() - new Date(dateStr).getFullYear();
console.log(yearsSince(movies[1].date) + "년 전 개봉");

const posterUrl = (path, size) => "https://image.tmdb.org/t/p/" + size + path;
console.log(posterUrl(movies[0].poster, "w342"));



// renderCards : 영화 배열 ⇒ 보드에 카드 생성 (반환값 없음)
function renderCards(list) {
    const board = document.querySelector(".board");
    board.innerHTML = "";
    for (const m of list) {
        const card = document.createElement("article");
        card.className = "card";
        if (m.rating >= 8) { card.classList.add("hot"); }
        card.innerHTML = `
 <img class="poster" src="${posterUrl(m.poster, "w342")}" alt="${m.title} 포스터"> 
 <span class="badge">${m.rating}</span>
 <div class="info">
    <h2>${m.title}</h2>
    <p class="year">${m.year}</p>
 </div>`;
        board.appendChild(card);
        document.querySelector("#count").textContent = list.length + "편";
    }
}
renderCards(movies);

