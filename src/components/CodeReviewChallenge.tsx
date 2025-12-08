import { useEffect, useState } from "react";
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
  /**
   * any라는 타입은 항상 지양해야 한다고 알고 있습니다.
   * 프로젝트의 안정성을 위해서 any 타입말고 구체적인 타입으로 변경하는 것이 더 나을 듯합니다.
   */
  const [users, setUsers] = useState<any[]>([]); // state 1
  const [filter, setFilter] = useState(""); // state 2
  const [loading, setLoading] = useState(true); // state 3
  const [showAdminsOnly, setShowAdminsOnly] = useState(false); // state 4

  // 데이터 로딩
  /**
   * fetch
   *
   *
   */
  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  // 필터링 로직
  /**
   *  필터링 로직이 너무 많은 역할을 하고 있습니다.
   *  현재 여기에서는, 이름, 이메일, 관리자 3가지의 일을 하고 있습니다.
   *  함수는 단일책임원칙으로 하여 하나의 함수는 하나의 역할만을 하고 있는 것이 더 나을 듯합니다.
   *  예를 들어, 이름 filtering, email filtering, admin filtering 역할로 나누는 것입니다.
   *
   *
   */
  const filteredUsers = users.filter((user) => {
    const nameMatches = user.name.includes(filter);
    const emailMatches = user.email.includes(filter);
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

      {/* 3항 연산자는 가독성이 떨어져서 안 사용하는 편히 좋을 것 같습니다.
      로딩 컴퍼넌트를 별도로 만들어서 사용하는 것이 코드의 가독성 면이나 추후 컴퍼넌트의 유지보수성에서 더 좋지 않을까 생각이 듭니다.
     
     */}

      {loading ? (
        <p>로딩 중...</p>
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
            {/* 
             css의 인라인 스타일은 리액트로써는 매번 렌더링이 되는 조건입니다. 인라인 스타일은 같은 스타일이라도 리액트가 caching을 안한다고 알고 있습니다. 
             따라서, 간단한 스타일 일지라도 module로 따로 만들어서 , user, admin 을 role-card를 만드는 것이 더 나을 듯 합니다.
            
            */}
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                {/* 역할(Role) 표시 */}
                <td style={{ color: u.isAdmin ? "blue" : "black" }}>
                  {u.isAdmin ? "Admin" : "User"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
