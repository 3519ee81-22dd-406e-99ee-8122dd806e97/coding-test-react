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
  if (!users || users.length === 0) {
    return [];
  }

  return users.filter((user) => user.isActive);
};

// 문제 2: ID로 사용자 찾기
export const findUserById = (users: User[], id: number): User | undefined => {
  if (!users || users.length === 0) {
    return undefined;
  }

  return users.find((user) => user.id === id);
};

// 문제 3: 사용자 이름을 ID 맵으로 변환
export const createUserMap = (users: User[]): { [id: number]: string } => {
  return users.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {} as { [id: number]: string });
};

// 문제 4: 키를 기준으로 배열 정렬
export const sortArrayByKey = <T>(
  array: T[],
  key: keyof T,
  order: "asc" | "desc"
): T[] => {
  const sorted = [...array];

  sorted.sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (valueA < valueB) {
      return order === "asc" ? -1 : 1;
    } else if (valueA > valueB) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });
  return sorted;
};

// 문제 5: 페이지네이션 구현
export const paginate = <T>(
  array: T[],
  page: number,
  pageSize: number
): PaginatedResult<T> => {
  if (!array || array.length === 0) {
    return { items: [], totalItems: 0, totalPages: 0, currentPage: page };
  }

  const totalItems = array.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const items = array.slice(startIndex, endIndex);

  return { items, totalItems, totalPages, currentPage: page };
};

// 문제 6: 계산된 속성 추가 (age 가 20 이상을 adult 로 간주합니다)
export const addIsAdultProperty = (
  users: User[]
): (User & { isAdult: boolean })[] => {
  return users.map((user) => ({ ...user, isAdult: user.age >= 20 }));
};

// 문제 7: 카테고리별 상품 총액 계산
export const getCategoryTotals = (products: Product[]): CategorySummary => {
  return products.reduce((acc, product) => {
    const category = product.category;

    if (!acc[category]) {
      acc[category] = { totalPrice: 0 };
    }

    acc[category].totalPrice += product.price;
    return acc;
  }, {} as CategorySummary);
};

// 문제 8: 두 사용자 배열 병합 및 중복 제거 (중복이 있는 경우 users2 내의 사용자를 사용합니다)
export const mergeAndDeduplicateUsers = (
  users1: User[],
  users2: User[]
): User[] => {
  const users2Ids = new Set(users2.map((user) => user.id));

  const uniqueUsers1 = users1.filter((user) => !users2Ids.has(user.id));

  return [...uniqueUsers1, ...users2];
};

// 문제 9: 특정 태그를 가진 사용자 찾기
export const findUsersByTag = (users: User[], tag: string): User[] => {
  if (!users || users.length === 0 || !tag) {
    return [];
  }

  return users.filter((user) => user.tags?.includes(tag));
};

// 문제 10: 부서별 사용자 통계 집계
export const getDepartmentSummary = (users: User[]): DepartmentSummary => {
  const intermediate = users.reduce((acc, user) => {
    const dept = user.department;

    if (!acc[dept]) {
      acc[dept] = {
        userCount: 0,
        totalAge: 0,
      };
    }

    acc[dept].userCount += 1;
    acc[dept].totalAge += user.age;

    return acc;
  }, {} as Record<string, { userCount: number; totalAge: number }>);

  const result: DepartmentSummary = {};

  Object.entries(intermediate).forEach(([dept, { userCount, totalAge }]) => {
    result[dept] = {
      userCount,
      averageAge: totalAge / userCount,
    };
  });

  return result;
};
