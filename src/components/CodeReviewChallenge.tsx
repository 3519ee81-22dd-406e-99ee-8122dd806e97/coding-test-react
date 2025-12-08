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

const UserList = () => {
  // 코드리뷰 1번
  // users 상태에 대한 타입이 명시되어있지 않으므로 추후 비동기 데이터 타입이 바뀔때 유지보수가 힘들 수 있습니다.
  // 데이터 타입을 명시하게 된다면, 바뀐 API 스펙에 따라 빠르게 변경점을 찾을 수 있어 유지보수에 유리합니다.
  const [users, setUsers] = useState<UserData[]>([]); // state 1
  const [filter, setFilter] = useState(''); // state 2
  const [loading, setLoading] = useState(true); // state 3
  const [showAdminsOnly, setShowAdminsOnly] = useState(false); // state 4

  // 코드리뷰 4번
  // 해당 비동기를 받아와 state에 저장하는 useEffect 코드는 hooks로 분리하는 것이 좋아보입니다.
  // 비즈니스 로직과 UI 로직을 나누게 되었을때, 각 컴포넌트에서는 원하는 책임을 바로 확인할 수 있어 유지보수에 유리합니다.

  // 데이터 로딩
  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

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
        <input
          type="text"
          placeholder="이름으로 검색..."
          // 코드리뷰 2번
          // onChange로 value에 대한 입력값 상태를 변경할때 한 번 입력시 마다 리렌더링되는 모습을 개발자 도구에서 볼 수 있었습니다.
          // 이를 개선하기 위해서 input을 제어 컴포넌트에서 비제어 컴포넌트로 바꾸는 것이 성능 향상에 큰 도움을 줄 수 있을것 같습니다.
          // 비제어 컴포넌트를 사용하는 라이브러리로는 React Hook Form 과 같은 폼 라이브러리가 있으며, 이를 이용해 다양한 상태 값도 편하게 관리할 수 있다는 이점이 있습니다.
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
        // 코드리뷰 3번
        // 로딩 중 이라고 텍스트로 띄우는 것도 좋지만, 자연스러운 사용자 경험(UX) 개선을 위해서는 스켈레톤 UI를 도입하는 것이 좋아보입니다.
        // MUI를 활용해 스켈레톤 UI를 가볍게 구현할 수 있으며, 이는 단순한 텍스트보다 로딩이라는 시각적인 정보를 처리하기에 알맞다고 생각합니다.
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
