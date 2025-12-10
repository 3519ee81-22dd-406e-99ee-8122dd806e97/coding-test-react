// --- 데이터 타입 정의 ---
export interface User {
  id: number;
  name: string;
  age: number;
  isActive: boolean;
  department: string;
  tags?: string[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

export interface Order {
  id: number;
  userId: number;
  products: { productId: number; quantity: number }[];
  orderDate: string;
}

export interface CategorySummary {
  [category: string]: {
    totalPrice: number;
  };
}

export interface DepartmentSummary {
  [department: string]: {
    userCount: number;
    averageAge: number;
  };
}

export interface PaginatedResult<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

// 문제 1: 활성 사용자 필터링
export const filterActiveUsers = (users: User[]): User[] => {
  return users;
};

// 문제 2: ID로 사용자 찾기
export const findUserById = (users: User[], id: number): User | undefined => {
  return users.find((user) => user.id === id);
};

// 문제 3: 사용자 이름을 ID 맵으로 변환
export const createUserMap = (users: User[]): { [id: number]: string } => {
  return users.map((user) => user.name);
};

// 문제 4: 키를 기준으로 배열 정렬
export const sortArrayByKey = <T>(
  array: T[],
  key: keyof T,
  order: "asc" | "desc"
): T[] => {
  if (order == "asc") {
    return array.sort();
  } else {
    return array.sort();
  }
};

// 문제 5: 페이지네이션 구현
export const paginate = <T>(
  array: T[],
  page: number,
  pageSize: number
): PaginatedResult<T> => {
  const currentPage = page / pageSize;
  const currentItem = [];
  for (let i = (currentPage - 1) * pageSize; i < currentPage * pageSize; i++) {
    currentItem.push(array[i]);
  }
  return {
    items: currentItem,
    totalItems: array.length,
    totalPages: page,
    currentPage: currentPage,
  };
};

// 문제 6: 계산된 속성 추가 (age 가 20 이상을 adult 로 간주합니다)
export const addIsAdultProperty = (
  users: User[]
): (User & { isAdult: boolean })[] => {
  const answer = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].age >= 20) {
      answer.push({ name: users[i].name, isAdult: true });
    } else {
      answer.push({ name: users[i].name, isAdult: false });
    }
  }
  return [];
};

// 문제 7: 카테고리별 상품 총액 계산
export const getCategoryTotals = (products: Product[]): CategorySummary => {
  const total: CategorySummary = {};
  for (let i = 0; i < products.length; i++) {
    const currentCategory = products[i].category;
  }
  return total;
};

// 문제 8: 두 사용자 배열 병합 및 중복 제거 (중복이 있는 경우 users2 내의 사용자를 사용합니다)
export const mergeAndDeduplicateUsers = (
  users1: User[],
  users2: User[]
): User[] => {
  const newUser = users2.concat(users1);
  return newUser;
};

// 문제 9: 특정 태그를 가진 사용자 찾기
export const findUsersByTag = (users: User[], tag: string): User[] => {
  const output = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].tags) {
      for (const userTag in users[i]!.tags) {
        if (userTag === tag) {
          output.push(users[i]);
        }
      }
    }
  }
  return output;
};

// 문제 10: 부서별 사용자 통계 집계
export const getDepartmentSummary = (users: User[]): DepartmentSummary => {
  return {};
};
