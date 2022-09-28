const SPECIES = [
    { eng: "alligator", kor: "악어" },
    { eng: "anteater", kor: "개미핥기" },
    { eng: "bear", kor: "곰" },
    { eng: "bird", kor: "새" },
    { eng: "bull", kor: "물소" },
    { eng: "cat", kor: "고양이" },
    { eng: "cub", kor: "아기곰" },
    { eng: "chicken", kor: "닭" },
    { eng: "cow", kor: "소" },
    { eng: "deer", kor: "사슴" },
    { eng: "dog", kor: "개" },
    { eng: "duck", kor: "오리" },
    { eng: "eagle", kor: "독수리" },
    { eng: "elephant", kor: "코끼리" },
    { eng: "frog", kor: "개구리" },
    { eng: "goat", kor: "염소" },
    { eng: "gorilla", kor: "고릴라" },
    { eng: "hamster", kor: "햄스터" },
    { eng: "hippo", kor: "하마" },
    { eng: "horse", kor: "말" },
    { eng: "koala", kor: "코알라" },
    { eng: "kangaroo", kor: "캥거루" },
    { eng: "lion", kor: "사자" },
    { eng: "monkey", kor: "원숭이" },
    { eng: "mouse", kor: "쥐" },
    { eng: "octopus", kor: "문어" },
    { eng: "ostrich", kor: "타조" },
    { eng: "penguin", kor: "펭귄" },
    { eng: "pig", kor: "돼지" },
    { eng: "rabbit", kor: "토끼" },
    { eng: "rhino", kor: "코뿔소" },
    { eng: "sheep", kor: "양" },
    { eng: "squirrel", kor: "다람쥐" },
    { eng: "tiger", kor: "호랑이" },
    { eng: "wolf", kor: "늑대" },
];

const PERSONALITY = [
    { eng: "lazy", kor: "먹보" },
    { eng: "jock", kor: "운동광" },
    { eng: "cranky", kor: "느끼함" },
    { eng: "smug", kor: "아이돌" },
    { eng: "normal", kor: "친절함" },
    { eng: "peppy", kor: "단순활발" },
    { eng: "snooty", kor: "무뚝뚝" },
    { eng: "sisterly", kor: "성숙함" }
];

export const getSpecies = (species: string) => {
    const findSpecie = SPECIES.find((item) => item.eng === species.toLowerCase());
    if (findSpecie) {
        return findSpecie.kor;
    } else {
        return null;
    }
}

export const getPersonality = (personality: string) => {
    const findPersonality = PERSONALITY.find((item) => item.eng === personality.toLowerCase());
    if (findPersonality) {
        return findPersonality.kor;
    } else {
        return null;
    }
}