declare type Todo = {
  value: string;
  readonly id: number; // 一意であるはずの識別子が書き換えられてはならないため
  checked: boolean;
  removed: boolean;
};