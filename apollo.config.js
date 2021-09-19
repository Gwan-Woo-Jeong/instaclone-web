// 1. 아폴로에게 백엔드가 있다고 알려줌 -> 아폴로가 백엔드를 가져감


  // graphql API가 가진 타입을 기반으로 파일들의 타입스크립트 정의를 자동적으로 만듦
  // gql 태그를 사용할 때만
module.exports = {
    client: {
        includes: ["./src/**/*.{tsx,ts}"],
        tagName: "gql",
        service: {
            name: "instaclone-backend",
            url: "http://localhost:4000/graphql",
        },
    }
};

// gql 코드의 위치에 대한 패턴
// src 내 tsx나 ts로 끝나는 모든 파일의 코드에서 찾아라
// tsx에 있는 모든 gql 태그를 찾음 -> 이를 위한 타입스크립트를 생성
// 서비스 이름
// 백엔드의 URL

/*
    설정파일이나 아폴로 코드 생성의 이점 :
    아폴로가 리액트 컴포넌트로 가서 query와 mutation을 찾고
    무엇을 썼든 아폴로가 인터페이스를 생성.
*/