export interface VerifyItem {
  email: string;
  code: string;
  category_id: string;
}

export type CheckEmailResponse = {
  exists: boolean;
  message?: string;
  user?: any;
};
