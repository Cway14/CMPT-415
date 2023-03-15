const errorMap = {
  "Firebase: Error (auth/email-already-in-use).": "Email already in use",
};

export function getUserFriendlyError(message) {
  return errorMap[message] || message;
}
