interface IAppState {
  role?: string;
  showBackdrop: boolean;
  isAuth: boolean;
  token: string | null;
  userId: string | null;
  authLoading: boolean;
  error: Error | null;
}

export default IAppState;
