import { GuestLoginRequest, LoginRequest, SignupRequest } from "./types";

export const login = async (data: LoginRequest) => {
  const response = await fetch("/api/users/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (response.ok) {
    return result;
  }

  if (response.status === 401) {
    throw Error("아이디 혹은 비밀번호가 잘못되었습니다. 다시 입력해주세요.");
  } else {
    throw Error("오류가 발생했습니다. 다시 시도해주세요.");
  }
};

export const signup = async (data: SignupRequest) => {
  const response = await fetch("/api/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  let resultMessage = result.data.message;
  if (response.ok) {
    return resultMessage;
  }

  if (response.status === 400 || response.status === 409) {
    resultMessage = resultMessage.message;
    throw Error(resultMessage);
  } else {
    resultMessage = resultMessage.message;
    throw Error(resultMessage);
  }
};

export const guestlogin = async (data: GuestLoginRequest) => {
  const response = await fetch("/api/users/guestsignin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  let resultMessage = result.data.message;
  if (response.ok) {
    return resultMessage;
  }

  if (response.status === 409) {
    resultMessage = resultMessage.message;
    throw Error(resultMessage);
  } else {
    resultMessage = resultMessage.message;
    throw Error(resultMessage);
  }
};
