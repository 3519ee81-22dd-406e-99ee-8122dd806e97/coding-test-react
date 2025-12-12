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

// 사용자 목록 구성성
type UserData = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

// 가짜 API 호출 함수 (사용자들 정보 호출)
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
  const [users, setUsers] = useState<UserData[]>([]); // state 1   - any는 타입으로 사용 안 된다고 알고 있는데다, 사용자들의 정보들을 호출해야 하니 fetchUsers 안에 UserData[]와 연동된 resolve 데이터들을 호출하여 불러들이기 위해 UserData[]로 변경함.   any에서 UserData[]으로 수정
  const [filter, setFilter] = useState(''); // state 2    - 특정 정보에 대한 필터링하기 위해 필요한 상태
  const [loading, setLoading] = useState(false); // state 3  - 데이터 로딩에 필요한 상태 선언. true로 해 놓으면 렌더링 시, 로딩 중으로 표시될 수 있으니, 시작부터 false로 해야 불필요한 로딩이 안 걸림. 그래서 true에서 false로 변경 
  const [showAdminsOnly, setShowAdminsOnly] = useState(true); // state 4  - useState의 값을 'false'로 한 걸 봐서 사용 안 하겠다고 선언한 걸로 보일 수도 있다. 사용해야 하니 useState의 값을 true로 변경하는 게 좋다. false에서 true로 변경경

  // 사용자의 정보들을 불러들이도록 데이터 로딩
  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  // 필터링 로직
  const filteredUsers = users.filter(user => {
    const nameMatches = user.name.includes(filter);   // 사용자의 이름이 포함되었는지 여부 확인
    const emailMatches = user.email.includes(filter);   // 사용자의 이메일이 포함되었는지 여부 확인
    const adminMatches = !showAdminsOnly || user.isAdmin;   // 사용자의 관리자계정이 존재하는지 여부 확인
    return (nameMatches || emailMatches) && adminMatches;   // 결과 출력
  });

  return (
    <div className={styles.container}>
      <h2>과제 5: 코드 리뷰하기</h2>
      <p className={styles.description}>
        이 파일(`CodeReviewChallenge.tsx`)의 코드에 대한 리뷰를 주석으로 작성해주세요.
      </p>

      <div className={styles.controls}>
        <input    // 입력한 값이 찾으려는 데이터와 일치한지 확인하고 일치할 경우, 필터링 기능이 작동되도록 구현
          type="text"   
          placeholder="이름으로 검색..."
          onChange={e => setFilter(e.target.value)}   // 필터링 기능 작동
          className={styles.input}
        />
        <label>
          <input  // 관리자만 볼 수 있도록 구현
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
            {filteredUsers.map(u => (   // 필터링된 유저들을 나열
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