import React, { useEffect, useState, useMemo } from "react";
import styles from "./CodeReviewChallenge.module.css";

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
  // 문제점: users 상태의 타입이 any[]로 지정되어 있습니다.
  // TypeScript를 사용하는 만큼, any 타입 사용을 가능한 지양하고,
  // 타입을 정확하게 명시하여 타입 안정성을 확보하고 에러 가능성을 낮추는 게 좋아보입니다.
  // 개선 방안: UserData[]로 타입을 명시합니다.
  const [users, setUsers] = useState<UserData[]>([]); // state 1
  const [filter, setFilter] = useState(""); // state 2
  const [loading, setLoading] = useState(true); // state 3
  const [showAdminsOnly, setShowAdminsOnly] = useState(false); // state 4

  // 데이터 로딩
  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  // 문제점: 필터링이 렌더링될 때마다 실행되어 users, filter, showAdminsOnly가
  // 불필요하게 계산이 반복되고 있어 최적화가 필요해보입니다.
  // 데이터가 많아질수록 성능 저하가 심해집니다
  // 개선 방안: useMemo를 사용하여 의존성이 변할 때만 재계산 되도록 수정합니다.
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const nameMatches = user.name.includes(filter);
      const emailMatches = user.email.includes(filter);
      const adminMatches = !showAdminsOnly || user.isAdmin;
      return (nameMatches || emailMatches) && adminMatches;
    });
  }, [users, filter, showAdminsOnly]);

  return (
    <div className={styles.container}>
      <h2>과제 5: 코드 리뷰하기</h2>
      <p className={styles.description}>
        이 파일(`CodeReviewChallenge.tsx`)의 코드에 대한 리뷰를 주석으로
        작성해주세요.
      </p>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="이름으로 검색..."
          onChange={(e) => setFilter(e.target.value)}
          className={styles.input}
        />
        <label>
          <input
            type="checkbox"
            checked={showAdminsOnly}
            onChange={(e) => setShowAdminsOnly(e.target.checked)}
          />
          관리자만 보기
        </label>
      </div>

      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          {/* 문제점: 검색 결과가 없으면 화면이 공백이 되어 사용자가 진행 상황을 알 수 없습니다. */}
          {/* 개선 방안: "검색 결과가 없습니다." 메시지를 추가하여 상황을 명확히 전달해줍니다. */}
          {filteredUsers.length === 0 ? (
            <p className={styles.emptyState}>검색 결과가 없습니다.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>이메일</th>
                  <th>역할</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    {/* 역할(Role) 표시 */}
                    {/* 문제점: style 객체로 color를 직접 정의하고 있습니다. */}
                    {/* 이렇게 하면 매 렌더링마다 새로운 style 객체가 생성되어 성능이 낭비됩니다. */}
                    {/* 개선 방안: CSS 모듈에 별도로 정의하여 className 속성을 사용해 정의해줍니다. */}
                    <td
                      className={u.isAdmin ? styles.roleAdmin : styles.roleUser}
                    >
                      {u.isAdmin ? "Admin" : "User"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default UserList;
