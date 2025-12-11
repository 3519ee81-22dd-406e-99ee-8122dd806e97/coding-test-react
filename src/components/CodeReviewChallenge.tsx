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
  // [코드 리뷰 1] 타입 안정성 문제
  // 문제: any 타입을 사용하여 타입 안정성이 저하됩니다.
  // 이유: any 타입은 TypeScript의 타입 체크를 우회하여 런타임 에러 가능성을 높입니다.
  // 개선: UserData[] 타입을 명시하여 타입 안정성을 확보해야 합니다.
  // 예: const [users, setUsers] = useState<UserData[]>([]);
  const [users, setUsers] = useState<any[]>([]); // state 1
  const [filter, setFilter] = useState(''); // state 2
  const [loading, setLoading] = useState(true); // state 3
  const [showAdminsOnly, setShowAdminsOnly] = useState(false); // state 4

  // 데이터 로딩
  // [코드 리뷰 2] 에러 처리 부재
  // 문제: fetchUsers에서 에러가 발생할 경우 처리하지 않아 앱이 불안정할 수 있습니다.
  // 이유: 네트워크 오류나 API 실패 시 사용자에게 피드백이 없고, loading 상태가 영구적으로 true로 남을 수 있습니다.
  // 개선: try-catch 또는 .catch()를 사용하여 에러를 처리하고, 에러 상태를 추가해야 합니다.
  // 예: fetchUsers().then(...).catch(error => { setError(error); setLoading(false); });
  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  // [코드 리뷰 3] 성능 최적화 부재
  // 문제: 필터링 로직이 매 렌더링마다 실행되어 불필요한 연산이 발생합니다.
  // 이유: users나 filter, showAdminsOnly가 변경되지 않아도 컴포넌트가 리렌더링될 때마다 필터링이 재실행됩니다.
  // 개선: useMemo를 사용하여 users, filter, showAdminsOnly가 변경될 때만 필터링을 수행하도록 최적화해야 합니다.
  // 예: const filteredUsers = useMemo(() => users.filter(...), [users, filter, showAdminsOnly]);
  // 필터링 로직
  const filteredUsers = users.filter(user => {
    const nameMatches = user.name.includes(filter);
    const emailMatches = user.email.includes(filter);
    const adminMatches = !showAdminsOnly || user.isAdmin;
    return (nameMatches || emailMatches) && adminMatches;
  });

  return (
    <div className={styles.container}>
      <h2>과제 5: 코드 리뷰하기</h2>
      <p className={styles.description}>
        이 파일(`CodeReviewChallenge.tsx`)의 코드에 대한 리뷰를 주석으로 작성해주세요.
      </p>

      <div className={styles.controls}>
        {/* [코드 리뷰 4] 제어 컴포넌트 패턴 미준수 */}
        {/* 문제: input의 value 속성이 없어 비제어 컴포넌트로 동작합니다. */}
        {/* 이유: React의 제어 컴포넌트 패턴을 따르지 않으면 상태와 UI가 불일치할 수 있습니다. */}
        {/* 개선: value={filter} 속성을 추가하여 제어 컴포넌트로 만들어야 합니다. */}
        <input
          type="text"
          placeholder="이름으로 검색..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className={styles.input}
        />
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
            {/* [코드 리뷰 5] 변수명 가독성 및 인라인 스타일 사용 */}
            {/* 문제 1: 변수명 'u'가 너무 짧아 가독성이 떨어집니다. */}
            {/* 문제 2: 인라인 스타일을 사용하여 CSS 모듈의 일관성이 깨집니다. */}
            {/* 이유: 짧은 변수명은 코드 이해를 어렵게 하고, 인라인 스타일은 유지보수와 재사용성을 저하시킵니다. */}
            {/* 개선: 변수명을 'user'로 변경하고, CSS 모듈에 스타일을 정의하여 className으로 적용해야 합니다. */}
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {/* 역할(Role) 표시 */}
                <td className={user.isAdmin ? styles.adminRole : styles.userRole}>
                  {user.isAdmin ? 'Admin' : 'User'}
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