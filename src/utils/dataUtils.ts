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
  return users.filter((user) => user.isActive);
};

// 문제 2: ID로 사용자 찾기
export const findUserById = (users: User[], id: number): User | undefined => {
  return users.find((user) => user.id === id);
};

// 문제 3: 사용자 이름을 ID 맵으로 변환
export const createUserMap = (users: User[]): { [id: number]: string } => {
  return Object.fromEntries(users.map((user) => [user.id, user.name]));
};

// 문제 4: 키를 기준으로 배열 정렬
export const sortArrayByKey = <T>(
  array: T[],
  key: keyof T,
  order: "asc" | "desc"
): T[] => {
  if (order === "asc") {
    return array.sort((a, b) => a[key] - b[key]);
  } else {
    return array.sort((a, b) => b[key] - a[key]);
  }
};

// 문제 5: 페이지네이션 구현
export const paginate = <T>(
  array: T[],
  page: number,
  pageSize: number
): PaginatedResult<T> => {
  return { items: [], totalItems: 0, totalPages: 0, currentPage: page };
};

// 문제 6: 계산된 속성 추가 (age 가 20 이상을 adult 로 간주합니다)
export const addIsAdultProperty = (
  users: User[]
): (User & { isAdult: boolean })[] => {
  return users.map((user) => {
    const newObject = {
      ...user,
      isAdult: user.age >= 20 ? true : false,
    };
    return newObject;
  });
};

// 문제 7: 카테고리별 상품 총액 계산
export const getCategoryTotals = (products: Product[]): CategorySummary => {
  const result = products.map((product) => {
    const { category, price } = product;
    return [category, { totalPrice: price }];
  });

  return Object.fromEntries(result);
};

// 문제 8: 두 사용자 배열 병합 및 중복 제거 (중복이 있는 경우 users2 내의 사용자를 사용합니다)
export const mergeAndDeduplicateUsers = (
  users1: User[],
  users2: User[]
): User[] => {
  return [];
};

// 문제 9: 특정 태그를 가진 사용자 찾기
export const findUsersByTag = (users: User[], tag: string): User[] => {
  return users.filter((user) => user.tags?.includes(tag));
};

// 문제 10: 부서별 사용자 통계 집계

export const getDepartmentSummary = (users: User[]): DepartmentSummary => {
  const map = users.map((user) => {
    return [user.department, [1, user.age]];
  });
  const result = map.reduce((acc, item) => {
    const [department, [count, age]] = item;
    if (!acc[department]) {
      acc[department] = {
        userCount: count,
        averageAge: age,
      };
    } else {
      acc[department] = {
        userCount: acc[department].userCount + 1,
        averageAge: acc[department].averageAge / acc[department].userCount + 1,
      };
    }
    return acc;
  }, {} as DepartmentSummary);

  return result;
};
