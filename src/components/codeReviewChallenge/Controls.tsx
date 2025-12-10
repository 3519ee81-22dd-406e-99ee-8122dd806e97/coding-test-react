import styles from "../CodeReviewChallenge.module.css";

type ControlPorps = {
  setKeyword: (e: any) => void;
  setShowAdminsOnly: (e: any) => void;
  showAdminsOnly: boolean;
};

const Controls = ({
  setKeyword,
  setShowAdminsOnly,
  showAdminsOnly,
}: ControlPorps) => {
  return (
    <div className={styles.controls}>
      <input
        type="text"
        placeholder="이름으로 검색..."
        onChange={(e) => setKeyword(e.target.value)}
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
  );
};

export default Controls;
