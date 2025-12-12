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
  return new Promise(resolve => {
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
  const [users, setUsers] = useState<any[]>([]); // state 1
  // [1번] useState<any[]> 사용은 타입 안정성을 깨뜨립니다.
  // UserData[] 형태로 명확히 지정하여, 오류를 사전에 방지할 수 있습니다.

  const [filter, setFilter] = useState(''); // state 2
  const [loading, setLoading] = useState(true); // state 3
  const [showAdminsOnly, setShowAdminsOnly] = useState(false); // state 4

  // 데이터 로딩
  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);
  // [2번] 에러 처리가 없습니다.
  // 비동기 호출 중 컴포넌트가 언마운트 setState 호출로 경고 발생 가능성이 있습니다.
  // isMounted 플래그 사용을 권장드립니다.

    // 필터링 로직
  const filteredUsers = users.filter(user => {
      const nameMatches = user.name.includes(filter);
      const emailMatches = user.email.includes(filter);
      const adminMatches = !showAdminsOnly || user.isAdmin;
      return (nameMatches || emailMatches) && adminMatches;
    });
    // [3번] filter 함수 내부는 렌더링마다 실행되므로 비용이 발생합니다.
    // 데이터가 많아질 시 성능 저하 가능성이 있습니다.
    // useMemo를 이용하여 메모이제이션하는 것을 추천합니다.

  return (
    <div className={styles.container}>
      <h2>과제 5: 코드 리뷰하기</h2>
      <p className={styles.description}>
        이 파일(`CodeReviewChallenge.tsx`)의 코드에 대한 리뷰를 주석으로 작성해주세요.
      </p>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="이름으로 검색..."
          onChange={e => setFilter(e.target.value)}
          className={styles.input}
        />
        {/*
          [4번] onChange에서 debounce/throttle 없이 즉시 state가 업데이트됩니다.
          이로 인해 사용자가 빠르게 입력을 할 시 불필요한 렌더링이 반복됩니다.
          debounce 함수를 적용하는 것을 권장드립니다.
        */}

        <label>
          <input
            type="checkbox"
            checked={showAdminsOnly}
            onChange={e => setShowAdminsOnly(e.target.checked)}
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
            {filteredUsers.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                {/* 역할(Role) 표시 */}
                <td style={{ color: u.isAdmin ? 'blue' : 'black' }}>
                  {u.isAdmin ? 'Admin' : 'User'}
                </td>
              </tr>
            ))}
            {/*
              [5번] 필터 결과가 0개일 때 사용자에게 결과 없음 표시 같은 후처리가 없습니다.
              filterdUsers.length === 0일 때 '결과 없음' 표시하는 것을 추천드립니다.
            */}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;