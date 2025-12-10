import styles from "../CodeReviewChallenge.module.css";

type UserData = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

const Table = ({ filteredUsers }: { filteredUsers: UserData[] }) => {
  return (
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
  );
};

export default Table;
