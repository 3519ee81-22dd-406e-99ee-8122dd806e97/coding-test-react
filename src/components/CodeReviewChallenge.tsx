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
  /*
    1. any[] => UserData[] 로 타입명시. 
      현재는 any 타입으로 사용함으로써 어떤 타입이 들어와도 에러 처리가 나지 않습니다. 따라서 추후 유지보수할 때 어떤 값이 들어오는지 예측할 수 없습니다.
      어떤 타입이든 들어올 수 있는 any보다 확실하게 들어오는 데이터 타입을 명시하는 것이 유지보수 측면에서 좋습니다.
  */
  const [users, setUsers] = useState<any[]>([]); // state 1
  const [filter, setFilter] = useState(""); // state 2
  const [loading, setLoading] = useState(true); // state 3
  const [showAdminsOnly, setShowAdminsOnly] = useState(false); // state 4

  // 데이터 로딩
  useEffect(() => {
    /*
      2. Data Fetching 이 실패했을 때의 로직이 없습니다.
      현재 로직은 fetching 이 실패했을 때를 가정하고있지 않기 때문에 실패하더라도 사용자는 알 수 없습니다. 
      따라서 사용자에게 명확하게 상태를 명시하기 위해 error 상태를 관리함과 동시에 fetching 시 실패 시나리오에 대한 로직을 추가하는 것이 좋아보입니다.
    */
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  /*
    3. user Data의 양이 커지게 되면 계산의 cost가 높아질 수 있습니다.
    현재는 데이터 양이 적어 큰 문제가 없겠지만, 미래를 생각했을 때
    useMemo를 통해 연산된 값을 저장하는 것이 좋아보입니다.
  */
  // 필터링 로직
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
        {/*
          4. 현재 사용자가 타이핑하여 값이 바뀔 때마다 setFilter를 동작시키고 있습니다.
            앞서 구현한 문제의 debounce를 사용하여 유예시간을 주는 것이 좋아보입니다.
            필터링 로직이 복잡해질수록, 데이터가 많아질수록 사용하는 리소스가 커지기 때문에
            사용자 입력에 즉각 반응할 필요가 없는 input인 이상 debouncing을 적용하는 것이 좋아보입니다.
        */}
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

      {/*
        5. UIUX적인 측면에서의 개선안입니다.
        현재는 로딩중에는 단순 텍스트로 이를 사용자에게 표현합니다만, 로딩이 완료되면 기존 레이아웃과 완전히 다르기 때문에 화면 레이아웃이 달라지는 문제가 있습니다.
        또 단순 로딩중 텍스트 보다는 로딩이 되고 있다는 명확한 UI적 처리를 해두는 것이 좋아보입니다.
        따라서 skeleton UI를 도입하여 자연스러운 UIUX 경험을 주는 것이 좋아보입니다.
        또 가능하다면 React의 suspense를 도입하여 구현하는 것이 삼항연산자를 쓰는것보다 직관적으로 알기 쉬워보입니다.
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
