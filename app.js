// app.js : 영화 배열을 다루는 함수들 / 민윤희 / 11주차

const average = list => {
    let sum = 0;
    for (const m of list) {
        sum += m.rating;
    }
    return sum / list.length;
}

const best = list => {
    let top = list[0];
    for (const m of list) {
        if (m.rating > top.rating) {
            top = m;
        }
    }
    return top;
}

const filterByRating = (list, min) => list.filter(m => m.rating >= min);

// [라] 가져온 코드
function sortBy(list, key, desc) {
    const copy = [...list];
    copy.sort((a, b) => {
        if (typeof a[key] === "string") return a[key].localeCompare(b[key]);
        return a[key] - b[key];
    });
    if (desc) copy.reverse();
    return copy;
}


const yearsSince = dateStr => new Date().getFullYear() - new Date(dateStr).getFullYear();

const posterUrl = (path, size) => "https://image.tmdb.org/t/p/" + size + path;

// 영화 배열 ⇒ 보드에 카드 생성 (반환값 없음)
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
    }
    
    // 반복문이 끝난 뒤에 개수를 한 번만 업데이트
    document.querySelector("#count").textContent = list.length + "편";
}


// 선택 상자 값으로 정렬해서 다시 그리기 (반환값 없음) 
function applySort() {
    const key = document.getElementById("sort").value;
    renderCards(sortBy(movies, key, key !== "title"));
}



// 초기 로딩 시 기본 정렬(평점순) 적용 (6단계)
applySort();