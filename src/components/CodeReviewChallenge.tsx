import React, { useEffect, useState } from 'react';
import styles from './CodeReviewChallenge.module.css';

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
// 사용자 목록이 많아질 때를 대비하여 페이지네이션을 적용하거나 가상화를 도입합니다.
// 사용자가 많을 때 이를 전부 요청하면 네트워크 요청에 지연이 발생할 수 있으니 cursor 기반의 무한 스크롤을 도입하도로 합니다.
// 또한 가상화도 함께 도입하면 리렌더링 성능도 함께 개선될 수 있습니다.
const fetchUsers = (): Promise<UserData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: '김철수', email: 'chulsoo@example.com', isAdmin: false },
        { id: 2, name: '이영희', email: 'younghee@example.com', isAdmin: true },
        { id: 3, name: '스티브', email: 'steve@example.com', isAdmin: false },
        { id: 4, name: '관리자', email: 'admin@example.com', isAdmin: true },
        { id: 5, name: 'Steve Jobs', email: 'sj@apple.com', isAdmin: false },
        { id: 6, name: 'Apple Mint', email: 'mint@gmail.com', isAdmin: false },
      ]);
    }, 500);
  });
};

// 전반적으로 역할 분리가 돼있지 않습니다. type, 데이터 페칭, 검색 후 필터 기능과 같은 타입 정의나 비즈니스 로직은 컴포넌트 파일로부터 분리돼야 합니다.

const UserList = () => {
  const [users, setUsers] = useState<any[]>([]); // state 1
  const [filter, setFilter] = useState(''); // state 2
  const [loading, setLoading] = useState(true); // state 3
  const [showAdminsOnly, setShowAdminsOnly] = useState(false); // state 4

  // 데이터 로딩
  // catch문과 finally문이 없습니다. 에러 발생 가능성을 염두하여 위에서는 const [isError, setIsError] 상태를 정의하고
  // 해당 상태를 이용하여 에러 여부를 판단하도록 하며 finally 문으로 setLoading 상태 변화 위치를 옮깁니다.
  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  // 필터링 로직
  // 디바운스를 적용합니다. 검색 즉시 매번 사용자를 필터링한다면 리렌더링 관점에서 성능 문제가 발생합니다.
  // 때문에 사용자가 입력 중일 때는 필터링하지 않고, 사용자의 입력이 멈춘 후 일정 시간이 지났을 때 사용자를 화면에 출력하도록
  // 디바운싱 기법을 활용하여 리렌더링 성능을 최적화합니다.
  // 하지만 관리자만 보기 버튼을 클릭했을 때는 즉시 렌더링되는 것이 좋기 때문에 함수를 분리하거나 기획자와의 설계를 통해
  // 관리자만 보기 버튼의 반응 지연 여부에 대해 논의하는 방법도 있을 것입니다.
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
            {/* 메모이제이션을 이용하여 목록 렌더링 성능을 개선합니다.
            이를 위해서는 map 내부의 <tr> 이하의 요소를 UserItem과 같은 컴포넌트로 분리하고
            해당 컴포넌트에 React.memo를 적용하도록 합니다.*/}
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                {/* 역할(Role) 표시 */}
                <td style={{ color: u.isAdmin ? 'blue' : 'black' }}>
                  {u.isAdmin ? 'Admin' : 'User'}
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
