//Fælles defination af errortyper

export type AppErrorType =
  | "network"
  | "server"
  | "notFound"
  | "unknown";

export interface AppError {
  type: AppErrorType;
  title: string;
  message: string;
  retryable: boolean;
}
