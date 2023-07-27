const frame = document.querySelector('section');
const lists = document.querySelectorAll('article');

const audio = frame.querySelectorAll("audio");
const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");

const deg = 45;   //각각의 article이 45도씩 회전 각도
const len = lists.length - 1; //article 요소의 갯수 리스트라 한개 뺌
let i = 0;  //article 요소의 인덱스
let num = 0; 
let active = 0;

function activation(index, lists){
    for( let el of lists){
        el.classList.remove("on");
    }
    lists[index].classList.add("on");
}

//article 요소의 개수만큼 반복
for (let el of lists) {
    let pic = el.querySelector('.pic');
    el.style.transform = `rotate(${deg * i}deg) translateY(-100vh)`;
    pic.style.backgroundImage = `url(./img/member${i + 1}.jpg)`;
    i++;
    //article 요소의 재생, 정지, 처음으로 버튼 변수 선언
    let play = el.querySelector('.play');
    let pause = el.querySelector('.pause');
    let load = el.querySelector('.load');
    //play버튼 클릭 시, 
    play.addEventListener("click", e => {
        //play버튼이 속한 article 요소의 클래스에 on 추가
        let isActive = e.currentTarget.closest("article").classList.contains("on");
        if (isActive) {
            e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
                //play버튼이 속한 article 요소의 audio 요소 재생
            e.currentTarget.closest("article").querySelector("audio").play();
        }
    });
    //pause버튼 클릭 시
    pause.addEventListener("click", e => {
        let isActive = e.currentTarget.closest("article").classList.contains("on");
        //클래스on 제거
        if (isActive) {
            e.currentTarget.closest("article").querySelector(".pic").classList.remove("on");
            e.currentTarget.closest("article").querySelector("audio").pause();
        }
    });
    //load버튼 클릭 시
    load.addEventListener("click", e => {
        let isActive = e.currentTarget.closest("article").classList.contains("on");
        if (isActive) {
            e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
            e.currentTarget.closest("article").querySelector("audio").load();
            e.currentTarget.closest("article").querySelector("audio").play();
        }
    });
}

//모든 오디오 요소를 반복하면서 정지시키고 .pic 요소의 모션을 중지해서 초기화하는 함수
function initMusic(){
    for( let el of audio ){
        el.pause();
        el.load();
        el.closest("article").querySelector(".pic").classList.remove("on");
    }
}

//prev 버튼 클릭 시
prev.addEventListener("click", ()=>{
    //음악 초기화 함수 실행
    initMusic();

    //num값을 증가시키며 frame 45도 만큼 증가시키며 시계 방향으로 계속 회전
    num++;  
    frame.style.transform = `rotate(${deg* num}deg)`;    

    (active == 0 ) ? active = len : active--;
    activation(active, lists);    
});

//next 버튼 클릭시
next.addEventListener("click", ()=>{
    //음악 초기화 함수 실행
    initMusic();

    //num값을 감소시키며 frame을 45도 만큼 감소시키며 반시계 방향으로 회전
    num--;   
    frame.style.transform = `rotate(${deg* num}deg)`;   

    (active == len ) ? active = 0 : active++; 
    activation(active, lists);
});





