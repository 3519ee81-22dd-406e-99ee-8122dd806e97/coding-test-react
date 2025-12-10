import React, { useEffect, useState } from "react";
import styles from "./CodeReviewChallenge.module.css";
import Controls from "./codeReviewChallenge/Controls";
import Table from "./codeReviewChallenge/Table";

/**
 * ## 과제 5: 코드 리뷰
 *
 * 아래 `UserList`는 사용자 목록을 렌더링합니다. 정상 동작하지만 개선 여지가 있습니다.
 *
 * ### 요구사항:
 * 1. 코드(JSX 포함)를 읽고 잠재적인 문제점이나 개선점을 찾아보세요.
 * 2. 발견한 내용에 대해, 해당 코드 라인 근처에 주석을 사용하여 코드 리뷰를 작성해주세요.
 *    - 무엇이 문제인지, 왜 문제인지, 어떻게 개선할지 제시해주세요.
 * 3. 최소 3가지 이상의 유의미한 코드 리뷰를 작성해야 합니다.
 *
 * ### 선택사항:
 * - 코드 리뷰 작성을 넘어, 실제로 코드를 개선하여 리팩토링을 진행해보세요.
 * - (주의: 이 과제는 코드 리뷰 능력을 중점적으로 보기 때문에, 리뷰 작성 없이 리팩토링만 진행하면 안 됩니다.)
 */

type UserData = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

// 가짜 API 호출 함수
const fetchUsers = (): Promise<UserData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "김철수", email: "chulsoo@example.com", isAdmin: false },
        { id: 2, name: "이영희", email: "younghee@example.com", isAdmin: true },
        { id: 3, name: "스티브", email: "steve@example.com", isAdmin: false },
        { id: 4, name: "관리자", email: "admin@example.com", isAdmin: true },
        { id: 5, name: "Steve Jobs", email: "sj@apple.com", isAdmin: false },
        { id: 6, name: "Apple Mint", email: "mint@gmail.com", isAdmin: false },
      ]);
    }, 500);
  });
};

const UserList = () => {
  // 상단에 userData에 대한 타입이 있기 때문에 any 타입을 UserData 타입으로 변경하는 게 좋아보입니다.
  const [users, setUsers] = useState<UserData[]>([]); // state 1
  // filter라는 변수명보다 keyword라는 변수명으로 조금 더 직관적인 변수명을 사용하는 게 좋다고 생각합니다.
  const [keyword, setKeyword] = useState(""); // state 2
  const [loading, setLoading] = useState(true); // state 3
  const [showAdminsOnly, setShowAdminsOnly] = useState(false); // state 4

  // 데이터 로딩
  // 비동기 요청의 에러 처리 코드가 없어 요청 실패시 서비스가 정상적으로 작동하지 않을 위험이 있다고 생각합니다.
  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  // 필터링 로직
  // 필터링 로직에서 검색을 담당하는 로직과 관리자만 보기 기능을 분리하여 함수 하나의 하나의 기능을 담당하는 게 좋다고 생각합니다.
  const filteredUsers = users.filter((user) => {
    const nameMatches = user.name.includes(keyword);
    const emailMatches = user.email.includes(keyword);
    const adminMatches = !showAdminsOnly || user.isAdmin;
    return (nameMatches || emailMatches) && adminMatches;
  });

  return (
    <div className={styles.container}>
      <h2>과제 5: 코드 리뷰하기</h2>
      <p className={styles.description}>
        이 파일(`CodeReviewChallenge.tsx`)의 코드에 대한 리뷰를 주석으로
        작성해주세요.
      </p>
      {/* 71번 줄부터 87번 줄, table 태그의 코드를 작은 단위의 컴포넌트로 분리하여 해당 페이지는 로직을 담당하는 컴포넌트로 남겨두고 
        작은 단위로 분리한 컴포넌트는 UI만을 담당하는 컴포넌트로 레이어를 분리하면 좋을 거 같습니다.
      */}
      <Controls
        setKeyword={setKeyword}
        setShowAdminsOnly={setShowAdminsOnly}
        showAdminsOnly={showAdminsOnly}
      />

      {loading ? <p>로딩 중...</p> : <Table filteredUsers={filteredUsers} />}
    </div>
  );
};

export default UserList;
